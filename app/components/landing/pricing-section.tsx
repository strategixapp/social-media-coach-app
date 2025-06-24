
'use client'

import { Button } from '@/components/ui/button'
import { Check, Crown, Zap, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckoutButton } from '@/components/payment/checkout-button'

const plans = [
  {
    name: '7-Day Trial',
    price: 'Free',
    period: 'for 7 days',
    description: 'Experience the full power of our AI coaching platform',
    features: [
      'Full AI coach access',
      'Limited daily queries (15/day)',
      'All platform strategies',
      'Premium templates access',
      'Analytics dashboard',
      'Goal tracking',
      'Content planning tools',
      'Email support'
    ],
    limitations: [
      'Trial expires in 7 days',
      'Limited daily usage',
      'Upgrade required for continued access'
    ],
    cta: 'Start Free Trial',
    href: '/auth/signup',
    priceId: null,
    popular: false,
    icon: Zap,
    badge: 'No Credit Card Required'
  },
  {
    name: 'Pro',
    price: '$19.99',
    period: 'per month',
    description: 'Complete social media coaching for serious creators',
    features: [
      'Unlimited AI coaching',
      'All 10+ platform strategies',
      'Advanced analytics & insights',
      '500+ premium templates',
      'Content calendar & planning',
      'Monetization strategies',
      'Goal tracking & progress',
      'Priority support',
      'Advanced AI features',
      'No daily limits'
    ],
    limitations: [],
    cta: 'Upgrade to Pro',
    href: '/auth/signup?plan=pro',
    priceId: 'pro_monthly',
    popular: true,
    icon: Crown,
    savings: 'Save $9/month vs old pricing'
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For teams, agencies, and high-volume creators',
    features: [
      'Everything in Pro',
      'Multi-user access (5 seats)',
      'White-label options',
      'Custom integrations',
      'Advanced team analytics',
      'Dedicated account manager',
      'Custom training sessions',
      'API access',
      'Priority development requests'
    ],
    limitations: [],
    cta: 'Get Enterprise',
    href: '/contact',
    priceId: 'enterprise_monthly',
    popular: false,
    icon: Star
  }
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Start Your
            <span className="gradient-text block">7-Day Free Trial</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the full power of our AI coaching platform with a risk-free trial. 
            No credit card required to start your journey to social media success.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative p-8 bg-card rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 ${
                plan.popular ? 'border-primary shadow-primary/20 scale-105' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Header */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {plan.badge && (
                    <p className="text-sm text-accent font-medium">{plan.badge}</p>
                  )}
                  {plan.savings && (
                    <p className="text-sm text-green-600 font-medium">{plan.savings}</p>
                  )}
                  {plan.name === '7-Day Trial' && (
                    <p className="text-sm text-muted-foreground">Then $19.99/month</p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                    What's included
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                {plan.priceId ? (
                  <CheckoutButton
                    priceId={plan.priceId}
                    planName={plan.name}
                    className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                  >
                    {plan.cta}
                  </CheckoutButton>
                ) : (
                  <Link href={plan.href} className="block">
                    <Button 
                      className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Options */}
        <motion.div 
          className="text-center mt-12 space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="p-6 bg-card rounded-xl border">
            <h3 className="text-xl font-bold mb-2">🎯 Lifetime Access</h3>
            <p className="text-muted-foreground mb-4">
              One-time payment of <span className="font-bold text-foreground">$397</span> for permanent Pro access
              <span className="block text-sm text-green-600">Save over $100 vs. yearly subscription!</span>
            </p>
            <CheckoutButton
              priceId="lifetime"
              planName="Lifetime"
              className="variant-outline"
            >
              Get Lifetime Access
            </CheckoutButton>
          </div>
          
          <p className="text-sm text-muted-foreground">
            7-day free trial • 30-day money-back guarantee • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}
