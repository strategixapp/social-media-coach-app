
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { headers } from 'next/headers'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  const priceId = subscription.items.data[0]?.price.id

  try {
    // Find user by Stripe customer ID
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
    })

    if (!user) {
      console.error('User not found for customer:', customerId)
      return
    }

    // Determine subscription tier
    let tier: 'PRO' | 'ENTERPRISE' | 'LIFETIME' = 'PRO'
    if (priceId?.includes('enterprise')) {
      tier = 'ENTERPRISE'
    } else if (priceId?.includes('lifetime')) {
      tier = 'LIFETIME'
    }

    // Update user subscription
    await prisma.user.update({
      where: { id: user.id },
      data: {
        stripeSubscriptionId: subscription.id,
        stripePriceId: priceId,
        subscriptionTier: tier,
        subscriptionStatus: subscription.status === 'trialing' ? 'TRIAL' : 'ACTIVE',
        subscriptionStartDate: new Date(subscription.start_date * 1000),
        subscriptionEndDate: (subscription as any).current_period_end 
          ? new Date((subscription as any).current_period_end * 1000) 
          : null,
        nextBillingDate: (subscription as any).current_period_end
          ? new Date((subscription as any).current_period_end * 1000)
          : null,
        isTrialActive: subscription.status === 'trialing',
        paymentStatus: 'SUCCEEDED',
      },
    })

    console.log(`Subscription created for user ${user.id}:`, subscription.id)
  } catch (error) {
    console.error('Error handling subscription created:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  try {
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
    })

    if (!user) {
      console.error('User not found for customer:', customerId)
      return
    }

    let status: 'ACTIVE' | 'TRIAL' | 'CANCELED' | 'EXPIRED' = 'ACTIVE'
    switch (subscription.status) {
      case 'active':
        status = 'ACTIVE'
        break
      case 'trialing':
        status = 'TRIAL'
        break
      case 'canceled':
      case 'unpaid':
      case 'past_due':
        status = 'CANCELED'
        break
      default:
        status = 'EXPIRED'
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: status,
        subscriptionEndDate: (subscription as any).current_period_end 
          ? new Date((subscription as any).current_period_end * 1000) 
          : null,
        nextBillingDate: (subscription as any).current_period_end
          ? new Date((subscription as any).current_period_end * 1000)
          : null,
        subscriptionCancelAt: (subscription as any).cancel_at
          ? new Date((subscription as any).cancel_at * 1000)
          : null,
        subscriptionCanceledAt: (subscription as any).canceled_at
          ? new Date((subscription as any).canceled_at * 1000)
          : null,
        isTrialActive: subscription.status === 'trialing',
      },
    })

    console.log(`Subscription updated for user ${user.id}:`, subscription.status)
  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  const subscriptionId = ((invoice as any).subscription as string) || undefined

  try {
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
    })

    if (!user) {
      console.error('User not found for customer:', customerId)
      return
    }

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: user.id,
        stripePaymentId: ((invoice as any).payment_intent as string) || invoice.id || `invoice_${Date.now()}`,
        amount: invoice.amount_paid / 100, // Convert from cents
        currency: invoice.currency,
        status: 'SUCCEEDED',
        description: invoice.description || 'Subscription payment',
        subscriptionId: subscriptionId || undefined,
        metadata: {
          invoiceId: invoice.id,
          billingReason: invoice.billing_reason,
        },
      },
    })

    // Create invoice record
    await prisma.invoice.create({
      data: {
        userId: user.id,
        stripeInvoiceId: invoice.id || `invoice_${Date.now()}`,
        amountPaid: invoice.amount_paid / 100,
        amountDue: invoice.amount_due / 100,
        currency: invoice.currency,
        status: invoice.status || 'paid',
        subscriptionId: subscriptionId || undefined,
        paymentIntentId: ((invoice as any).payment_intent as string) || invoice.id || `invoice_${Date.now()}`,
        invoiceUrl: invoice.invoice_pdf || undefined,
        hostedInvoiceUrl: invoice.hosted_invoice_url || undefined,
        billingReason: invoice.billing_reason || undefined,
        periodStart: new Date((invoice.period_start || invoice.created) * 1000),
        periodEnd: new Date((invoice.period_end || invoice.created) * 1000),
      },
    })

    // Update user payment info
    await prisma.user.update({
      where: { id: user.id },
      data: {
        paymentStatus: 'SUCCEEDED',
        lastPaymentDate: new Date(),
        failedPaymentCount: 0,
      },
    })

    console.log(`Payment succeeded for user ${user.id}:`, invoice.amount_paid / 100)
  } catch (error) {
    console.error('Error handling payment succeeded:', error)
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  try {
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
    })

    if (!user) {
      console.error('User not found for customer:', customerId)
      return
    }

    // Update user payment status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        paymentStatus: 'FAILED',
        failedPaymentCount: { increment: 1 },
      },
    })

    console.log(`Payment failed for user ${user.id}`)
  } catch (error) {
    console.error('Error handling payment failed:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
      console.error('No stripe signature found')
      return NextResponse.json(
        { error: 'No stripe signature found' },
        { status: 400 }
      )
    }

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    // Store event for debugging and idempotency
    try {
      await prisma.stripeEvent.create({
        data: {
          stripeEventId: event.id,
          eventType: event.type,
          data: event.data as any,
          processed: false,
        },
      })
    } catch (error) {
      // Event already exists, skip processing
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        console.log(`Event ${event.id} already processed`)
        return NextResponse.json({ received: true })
      }
    }

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Mark event as processed
    await prisma.stripeEvent.update({
      where: { stripeEventId: event.id },
      data: { processed: true },
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
