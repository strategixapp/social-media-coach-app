
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Log the event for debugging
    await prisma.stripeEvent.create({
      data: {
        stripeEventId: event.id,
        eventType: event.type,
        data: event.data as any,
        processed: false
      }
    })

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription)
        break
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
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
      data: { processed: true }
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  if (!userId) return

  const planType = session.metadata?.planType

  if (planType === 'lifetime') {
    // Handle lifetime purchase
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: 'LIFETIME',
        subscriptionStatus: 'ACTIVE',
        subscriptionStartDate: new Date(),
        subscriptionEndDate: null, // Lifetime has no end date
        stripeCustomerId: session.customer as string,
        paymentStatus: 'SUCCEEDED',
        lastPaymentDate: new Date()
      }
    })

    // Record the payment
    await prisma.payment.create({
      data: {
        userId,
        stripePaymentId: session.payment_intent as string,
        amount: session.amount_total || 49700,
        currency: session.currency || 'usd',
        status: 'SUCCEEDED',
        description: 'Lifetime Access Purchase',
        metadata: { planType: 'lifetime' }
      }
    })
  } else if (planType === 'monthly') {
    // Handle monthly subscription
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: 'PRO',
        subscriptionStatus: 'ACTIVE',
        subscriptionStartDate: new Date(),
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.subscription as string,
        billingCycle: 'MONTHLY',
        paymentStatus: 'SUCCEEDED'
      }
    })
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  if (!userId) return

  const status = subscription.status === 'active' ? 'ACTIVE' : 
                subscription.status === 'canceled' ? 'CANCELED' : 'EXPIRED'

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: status,
      stripeSubscriptionId: subscription.id,
      subscriptionStartDate: new Date((subscription as any).current_period_start * 1000),
      subscriptionEndDate: new Date((subscription as any).current_period_end * 1000),
      nextBillingDate: new Date((subscription as any).current_period_end * 1000)
    }
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  if (!userId) return

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: 'CANCELED',
      subscriptionCanceledAt: new Date()
    }
  })
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId }
  })

  if (!user) return

  const paymentId = String((invoice as any).payment_intent || invoice.id)
  
  await prisma.payment.create({
    data: {
      userId: user.id,
      stripePaymentId: paymentId,
      amount: (invoice as any).amount_paid || 0,
      currency: invoice.currency || 'usd',
      status: 'SUCCEEDED',
      subscriptionId: (invoice as any).subscription as string,
      invoiceId: invoice.id,
      description: (invoice as any).description || 'Subscription payment'
    }
  })

  await prisma.user.update({
    where: { id: user.id },
    data: {
      paymentStatus: 'SUCCEEDED',
      lastPaymentDate: new Date(),
      failedPaymentCount: 0
    }
  })
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId }
  })

  if (!user) return

  const paymentId = String((invoice as any).payment_intent || invoice.id)

  await prisma.payment.create({
    data: {
      userId: user.id,
      stripePaymentId: paymentId,
      amount: (invoice as any).amount_due || 0,
      currency: invoice.currency || 'usd',
      status: 'FAILED',
      subscriptionId: (invoice as any).subscription as string,
      invoiceId: invoice.id,
      description: (invoice as any).description || 'Failed subscription payment'
    }
  })

  await prisma.user.update({
    where: { id: user.id },
    data: {
      paymentStatus: 'FAILED',
      failedPaymentCount: { increment: 1 }
    }
  })
}
