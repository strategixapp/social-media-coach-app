
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PaymentSuccess } from './payment-success'
import { useToast } from '@/hooks/use-toast'

export function PaymentStatusHandler() {
  const [showSuccess, setShowSuccess] = useState(false)
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const payment = searchParams.get('payment')
    const plan = searchParams.get('plan')

    if (payment === 'success') {
      setShowSuccess(true)
      // Clear URL parameters
      const url = new URL(window.location.href)
      url.searchParams.delete('payment')
      url.searchParams.delete('plan')
      window.history.replaceState({}, '', url.toString())
    } else if (payment === 'cancelled') {
      toast({
        title: 'Payment Cancelled',
        description: 'Your payment was cancelled. You can try again anytime.',
        variant: 'destructive',
      })
      // Clear URL parameters
      const url = new URL(window.location.href)
      url.searchParams.delete('payment')
      window.history.replaceState({}, '', url.toString())
    }
  }, [searchParams, toast])

  if (showSuccess) {
    return <PaymentSuccess onClose={() => setShowSuccess(false)} />
  }

  return null
}
