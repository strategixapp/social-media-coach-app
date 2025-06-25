
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planType } = await request.json()
    
    if (!['monthly', 'lifetime'].includes(planType)) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 })
    }

    // Get or create Stripe customer
    let customer = await stripe.customers.list({
      email: session.user.email,
      limit: 1
    })

    let customerId: string
    if (customer.data.length === 0) {
      const newCustomer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name || undefined,
        metadata: {
          userId: session.user.id
        }
      })
      customerId = newCustomer.id
    } else {
      customerId = customer.data[0].id
    }

    // Update user with Stripe customer ID
    await prisma.user.update({
      where: { id: session.user.id },
      data: { stripeCustomerId: customerId }
    })

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    if (planType === 'monthly') {
      // Create subscription checkout for monthly plan
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'price_1RdhTXRU5yI2YQbKJREpNOUt', // Monthly price ID
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${baseUrl}/dashboard?success=true&plan=monthly`,
        cancel_url: `${baseUrl}/pricing?canceled=true`,
        subscription_data: {
          trial_period_days: 7,
          metadata: {
            userId: session.user.id,
            planType: 'monthly'
          }
        },
        metadata: {
          userId: session.user.id,
          planType: 'monthly'
        }
      })

      return NextResponse.json({ url: checkoutSession.url })
    } else {
      // Create one-time payment checkout for lifetime plan
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Strategix Coach - Lifetime Access',
                description: 'One-time payment for lifetime access to all features',
              },
              unit_amount: 49700, // $497.00
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${baseUrl}/dashboard?success=true&plan=lifetime`,
        cancel_url: `${baseUrl}/pricing?canceled=true`,
        metadata: {
          userId: session.user.id,
          planType: 'lifetime'
        }
      })

      return NextResponse.json({ url: checkoutSession.url })
    }
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
