
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface PaymentSuccessProps {
  onClose?: () => void
}

export function PaymentSuccess({ onClose }: PaymentSuccessProps) {
  const [plan, setPlan] = useState<string>('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const planParam = searchParams.get('plan')
    if (planParam) {
      setPlan(planParam)
    }
  }, [searchParams])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mx-auto mb-4"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Welcome to {plan ? `${plan}` : 'your premium subscription'}! 
            </p>
            <p className="text-sm text-muted-foreground">
              You now have full access to all premium features including unlimited AI coaching, 
              advanced analytics, and premium templates.
            </p>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">What's New</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Unlimited AI coach conversations</li>
              <li>• Access to all platform strategies</li>
              <li>• Advanced analytics dashboard</li>
              <li>• 500+ premium content templates</li>
              <li>• Priority support</li>
            </ul>
          </div>

          <div className="flex space-x-2">
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
