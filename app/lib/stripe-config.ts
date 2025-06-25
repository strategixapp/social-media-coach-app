
export const STRIPE_CONFIG = {
  // Monthly subscription
  MONTHLY_PRICE_ID: 'price_1RdhTXRU5yI2YQbKJREpNOUt',
  MONTHLY_PRODUCT_ID: 'prod_SYp7HULaSscznn',
  
  // Lifetime access
  LIFETIME_PRICE_ID: 'price_1RdhcDRU5yI2YQbKz9NNMvF1',
  LIFETIME_PRODUCT_ID: 'prod_SYp7HULaSscznn', // Same product, different price
  
  // Pricing
  MONTHLY_PRICE: 1999, // $19.99 in cents
  LIFETIME_PRICE: 49700, // $497.00 in cents
  
  // Trial
  TRIAL_DAYS: 7,
  
  // Webhooks
  WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
}

export const PRICING_PLANS = {
  monthly: {
    name: 'Monthly Pro',
    price: '$19.99',
    priceId: STRIPE_CONFIG.MONTHLY_PRICE_ID,
    interval: 'month',
    features: [
      'Unlimited AI coaching sessions',
      'Platform-specific strategies',
      'Content templates & ideas',
      'Performance analytics',
      'Priority support'
    ]
  },
  lifetime: {
    name: 'Lifetime Access',
    price: '$497',
    priceId: 'price_1RdhcDRU5yI2YQbKz9NNMvF1',
    interval: 'one-time',
    features: [
      'Everything in Monthly Pro',
      'Lifetime access - no recurring fees',
      'Future feature updates included',
      'VIP support',
      'Exclusive community access',
      'Advanced analytics dashboard'
    ]
  }
}
