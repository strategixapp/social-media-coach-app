
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { 
  Crown, 
  Calendar, 
  CreditCard, 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Loader2
} from 'lucide-react'
import { format } from 'date-fns'

interface SubscriptionInfo {
  subscriptionTier: string
  subscriptionStatus: string
  subscriptionStartDate?: string
  subscriptionEndDate?: string
  nextBillingDate?: string
  isTrialActive: boolean
  trialEndDate?: string
  stripeCustomerId?: string
  stripeSubscriptionId?: string
}

export function SubscriptionManagement() {
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSubscriptionInfo()
  }, [])

  const fetchSubscriptionInfo = async () => {
    try {
      const response = await fetch('/api/subscription/status')
      if (response.ok) {
        const data = await response.json()
        setSubscriptionInfo(data)
      }
    } catch (error) {
      console.error('Error fetching subscription info:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will still have access until the end of your billing period.')) {
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Subscription Cancelled',
          description: 'Your subscription has been cancelled and will end at the current billing period.',
        })
        fetchSubscriptionInfo()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to cancel subscription',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReactivateSubscription = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch('/api/subscription/reactivate', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Subscription Reactivated',
          description: 'Your subscription has been reactivated successfully.',
        })
        fetchSubscriptionInfo()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to reactivate subscription',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCustomerPortal = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch('/api/stripe/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          returnUrl: window.location.href,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        window.location.href = data.url
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to open customer portal',
        variant: 'destructive',
      })
      setIsProcessing(false)
    }
  }

  const getStatusBadge = (status: string, isTrialActive: boolean) => {
    if (isTrialActive) {
      return <Badge variant="outline" className="text-blue-600 border-blue-600">Trial Active</Badge>
    }

    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-600">Active</Badge>
      case 'CANCELED':
        return <Badge variant="destructive">Cancelled</Badge>
      case 'EXPIRED':
        return <Badge variant="secondary">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTierDisplay = (tier: string) => {
    switch (tier) {
      case 'PRO':
        return 'Pro Plan'
      case 'ENTERPRISE':
        return 'Enterprise Plan'
      case 'LIFETIME':
        return 'Lifetime Access'
      case 'TRIAL':
        return '7-Day Trial'
      default:
        return tier
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!subscriptionInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Unable to load subscription information.</p>
        </CardContent>
      </Card>
    )
  }

  const { 
    subscriptionTier, 
    subscriptionStatus, 
    subscriptionEndDate, 
    nextBillingDate,
    isTrialActive,
    trialEndDate,
    stripeSubscriptionId 
  } = subscriptionInfo

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
          <CardDescription>Manage your subscription and billing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">{getTierDisplay(subscriptionTier)}</span>
                {getStatusBadge(subscriptionStatus, isTrialActive)}
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                {isTrialActive && trialEndDate && (
                  <p className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Trial ends: {format(new Date(trialEndDate), 'PPP')}</span>
                  </p>
                )}
                {nextBillingDate && !isTrialActive && (
                  <p className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Next billing: {format(new Date(nextBillingDate), 'PPP')}</span>
                  </p>
                )}
                {subscriptionStatus === 'CANCELED' && subscriptionEndDate && (
                  <p className="flex items-center space-x-2 text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Access ends: {format(new Date(subscriptionEndDate), 'PPP')}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              {stripeSubscriptionId && (
                <Button 
                  variant="outline" 
                  onClick={handleCustomerPortal}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ExternalLink className="mr-2 h-4 w-4" />
                  )}
                  Manage Billing
                </Button>
              )}
              {subscriptionStatus === 'ACTIVE' && subscriptionTier !== 'LIFETIME' && (
                <Button 
                  variant="outline" 
                  onClick={handleCancelSubscription}
                  disabled={isProcessing}
                >
                  Cancel Plan
                </Button>
              )}
              {subscriptionStatus === 'CANCELED' && (
                <Button 
                  onClick={handleReactivateSubscription}
                  disabled={isProcessing}
                >
                  Reactivate
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trial Warning */}
      {isTrialActive && trialEndDate && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              <span>Trial Ending Soon</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-4">
              Your 7-day trial ends on {format(new Date(trialEndDate), 'PPP')}. 
              Upgrade now to continue enjoying unlimited access to our AI coaching platform.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Payment Status */}
      {subscriptionStatus === 'ACTIVE' && !isTrialActive && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>All payments up to date</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
