
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { stripePromise } from '@/lib/stripe-client'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

interface CheckoutButtonProps {
  priceId: string
  planName: string
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export function CheckoutButton({ 
  priceId, 
  planName, 
  disabled = false, 
  className = '', 
  children 
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const handleCheckout = async () => {
    if (!session) {
      router.push('/auth/login')
      return
    }

    setIsLoading(true)

    try {
      // Create checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/dashboard?payment=success&plan=${planName}`,
          cancelUrl: `${window.location.origin}/dashboard?payment=cancelled`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: 'Payment Error',
        description: error instanceof Error ? error.message : 'Failed to start checkout process',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={disabled || isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        children || `Upgrade to ${planName}`
      )}
    </Button>
  )
}
