
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap } from 'lucide-react'
import { PRICING_PLANS, STRIPE_CONFIG } from '@/lib/stripe-config'

interface PricingPlansProps {
  onSelectPlan?: (planType: 'monthly' | 'lifetime') => void
}

export default function PricingPlans({ onSelectPlan }: PricingPlansProps) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSelectPlan = async (planType: 'monthly' | 'lifetime') => {
    if (!session) {
      window.location.href = '/auth/login'
      return
    }

    setLoading(planType)
    
    try {
      if (onSelectPlan) {
        onSelectPlan(planType)
      } else {
        // Default behavior - redirect to checkout
        const response = await fetch('/api/stripe/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planType })
        })

        const { url } = await response.json()
        if (url) {
          window.location.href = url
        }
      }
    } catch (error) {
      console.error('Error selecting plan:', error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Monthly Plan */}
      <Card className="relative">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            <CardTitle>{PRICING_PLANS.monthly.name}</CardTitle>
          </div>
          <CardDescription>Perfect for getting started</CardDescription>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{PRICING_PLANS.monthly.price}</span>
            <span className="text-gray-600">/month</span>
          </div>
          <Badge variant="secondary" className="w-fit">7-day free trial</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3">
            {PRICING_PLANS.monthly.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            onClick={() => handleSelectPlan('monthly')}
            disabled={loading === 'monthly'}
            className="w-full"
          >
            {loading === 'monthly' ? 'Processing...' : 'Start Free Trial'}
          </Button>
        </CardContent>
      </Card>

      {/* Lifetime Plan */}
      <Card className="relative border-2 border-yellow-400">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-yellow-400 text-black font-semibold px-3 py-1">
            BEST VALUE
          </Badge>
        </div>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-600" />
            <CardTitle>{PRICING_PLANS.lifetime.name}</CardTitle>
          </div>
          <CardDescription>One-time payment, lifetime access</CardDescription>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{PRICING_PLANS.lifetime.price}</span>
            <span className="text-gray-600">one-time</span>
          </div>
          <div className="text-sm text-green-600 font-medium">
            Save $240+ per year vs monthly
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3">
            {PRICING_PLANS.lifetime.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            onClick={() => handleSelectPlan('lifetime')}
            disabled={loading === 'lifetime'}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            {loading === 'lifetime' ? 'Processing...' : 'Get Lifetime Access'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
