
import { stripe } from '@/lib/stripe'

async function setupStripeProducts() {
  try {
    console.log('Setting up Stripe products and prices...')

    // Create Pro Product
    const proProduct = await stripe.products.create({
      name: 'Social Media Coach Pro',
      description: 'Complete social media coaching with unlimited AI access',
      metadata: {
        tier: 'pro',
      },
    })

    // Create Pro Monthly Price
    const proMonthlyPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 1999, // $19.99
      currency: 'usd',
      recurring: { interval: 'month' },
      metadata: {
        tier: 'pro',
        interval: 'monthly',
      },
    })

    // Create Pro Yearly Price
    const proYearlyPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 19999, // $199.99 (save ~$40)
      currency: 'usd',
      recurring: { interval: 'year' },
      metadata: {
        tier: 'pro',
        interval: 'yearly',
      },
    })

    // Create Enterprise Product
    const enterpriseProduct = await stripe.products.create({
      name: 'Social Media Coach Enterprise',
      description: 'Advanced features for teams and agencies',
      metadata: {
        tier: 'enterprise',
      },
    })

    // Create Enterprise Monthly Price
    const enterpriseMonthlyPrice = await stripe.prices.create({
      product: enterpriseProduct.id,
      unit_amount: 9900, // $99.00
      currency: 'usd',
      recurring: { interval: 'month' },
      metadata: {
        tier: 'enterprise',
        interval: 'monthly',
      },
    })

    // Create Enterprise Yearly Price
    const enterpriseYearlyPrice = await stripe.prices.create({
      product: enterpriseProduct.id,
      unit_amount: 99900, // $999.00 (save ~$200)
      currency: 'usd',
      recurring: { interval: 'year' },
      metadata: {
        tier: 'enterprise',
        interval: 'yearly',
      },
    })

    // Create Lifetime Product
    const lifetimeProduct = await stripe.products.create({
      name: 'Social Media Coach Lifetime',
      description: 'One-time payment for permanent Pro access',
      metadata: {
        tier: 'lifetime',
      },
    })

    // Create Lifetime Price
    const lifetimePrice = await stripe.prices.create({
      product: lifetimeProduct.id,
      unit_amount: 39700, // $397.00
      currency: 'usd',
      metadata: {
        tier: 'lifetime',
      },
    })

    console.log('Products and prices created successfully!')
    console.log('\nAdd these price IDs to your stripe.ts config:')
    console.log(`pro_monthly: ${proMonthlyPrice.id}`)
    console.log(`pro_yearly: ${proYearlyPrice.id}`)
    console.log(`enterprise_monthly: ${enterpriseMonthlyPrice.id}`)
    console.log(`enterprise_yearly: ${enterpriseYearlyPrice.id}`)
    console.log(`lifetime: ${lifetimePrice.id}`)

  } catch (error) {
    console.error('Error setting up Stripe products:', error)
  }
}

// Run if this file is executed directly
if (require.main === module) {
  setupStripeProducts()
}

export { setupStripeProducts }
