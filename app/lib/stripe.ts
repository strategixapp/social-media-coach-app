
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
  typescript: true,
})

// Stripe product and price configurations
export const STRIPE_CONFIG = {
  products: {
    pro: {
      name: 'Social Media Coach Pro',
      description: 'Complete social media coaching with unlimited AI access',
    },
    enterprise: {
      name: 'Social Media Coach Enterprise', 
      description: 'Advanced features for teams and agencies',
    },
    lifetime: {
      name: 'Social Media Coach Lifetime',
      description: 'One-time payment for permanent Pro access',
    },
  },
  prices: {
    pro_monthly: {
      amount: 1999, // $19.99 in cents
      currency: 'usd',
      interval: 'month',
      trial_period_days: 7,
    },
    pro_yearly: {
      amount: 19999, // $199.99 in cents (save ~$40)
      currency: 'usd', 
      interval: 'year',
      trial_period_days: 7,
    },
    enterprise_monthly: {
      amount: 9900, // $99 in cents
      currency: 'usd',
      interval: 'month',
      trial_period_days: 7,
    },
    enterprise_yearly: {
      amount: 99900, // $999 in cents (save ~$200)
      currency: 'usd',
      interval: 'year',
      trial_period_days: 7,
    },
    lifetime: {
      amount: 39700, // $397 in cents
      currency: 'usd',
      // No recurring interval for one-time payment
    },
  },
}

// Helper function to get or create Stripe customer
export async function getOrCreateStripeCustomer(user: {
  id: string
  email: string
  name?: string | null
  stripeCustomerId?: string | null
}) {
  if (user.stripeCustomerId) {
    try {
      const customer = await stripe.customers.retrieve(user.stripeCustomerId)
      if (!customer.deleted) {
        return customer as Stripe.Customer
      }
    } catch (error) {
      console.error('Error retrieving Stripe customer:', error)
    }
  }

  // Create new customer
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name || undefined,
    metadata: {
      userId: user.id,
    },
  })

  return customer
}

// Helper function to create checkout session
export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  trialFromPlan = false,
  metadata = {},
}: {
  customerId: string
  priceId: string
  successUrl: string
  cancelUrl: string
  trialFromPlan?: boolean
  metadata?: Record<string, string>
}) {
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: priceId === 'lifetime' ? 'payment' : 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
    allow_promotion_codes: true,
  }

  // Add trial configuration for subscriptions
  if (sessionParams.mode === 'subscription' && trialFromPlan) {
    sessionParams.subscription_data = {
      trial_period_days: 7,
      metadata,
    }
  }

  return await stripe.checkout.sessions.create(sessionParams)
}

// Helper function to format price for display
export function formatPrice(amountInCents: number, currency = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100)
}

// Helper function to get plan details
export function getPlanDetails(priceId: string) {
  const plans = {
    pro_monthly: {
      name: 'Pro Monthly',
      price: '$19.99',
      interval: 'month',
      trial: true,
    },
    pro_yearly: {
      name: 'Pro Yearly', 
      price: '$199.99',
      interval: 'year',
      trial: true,
    },
    enterprise_monthly: {
      name: 'Enterprise Monthly',
      price: '$99.00',
      interval: 'month', 
      trial: true,
    },
    enterprise_yearly: {
      name: 'Enterprise Yearly',
      price: '$999.00',
      interval: 'year',
      trial: true,
    },
    lifetime: {
      name: 'Lifetime Access',
      price: '$397.00',
      interval: 'lifetime',
      trial: false,
    },
  }

  return plans[priceId as keyof typeof plans] || null
}
