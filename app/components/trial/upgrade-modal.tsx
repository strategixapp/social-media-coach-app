
'use client'

import { useState } from 'react'
import { User } from '@prisma/client'
import { getTrialStatus, formatTrialTimeRemaining } from '@/lib/trial-utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Crown, Clock, Check, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckoutButton } from '@/components/payment/checkout-button'

interface UpgradeModalProps {
  user: User
  isOpen: boolean
  onClose: () => void
  trigger?: 'usage_limit' | 'feature_access' | 'trial_ending'
}

export function UpgradeModal({ user, isOpen, onClose, trigger = 'feature_access' }: UpgradeModalProps) {
  const trialStatus = getTrialStatus(user)

  const getTriggerContent = () => {
    switch (trigger) {
      case 'usage_limit':
        return {
          title: 'Daily Limit Reached',
          description: 'You\'ve reached your daily usage limit for the trial. Upgrade to Pro for unlimited access.',
          icon: Zap
        }
      case 'trial_ending':
        return {
          title: 'Trial Ending Soon',
          description: `Your trial expires in ${formatTrialTimeRemaining(trialStatus.daysRemaining, trialStatus.hoursRemaining)}. Upgrade now to continue your growth journey.`,
          icon: Clock
        }
      default:
        return {
          title: 'Upgrade to Pro',
          description: 'This feature requires a Pro subscription. Upgrade now to unlock unlimited access.',
          icon: Crown
        }
    }
  }

  const content = getTriggerContent()
  const IconComponent = content.icon

  const proFeatures = [
    'Unlimited AI coaching conversations',
    'All platform strategies and templates',
    'Advanced analytics and insights',
    'Content calendar and planning tools',
    'Monetization strategies',
    'Priority support',
    'No daily usage limits'
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-full mb-4">
            <IconComponent className="h-8 w-8 text-accent" />
          </div>
          <DialogTitle className="text-center text-xl">{content.title}</DialogTitle>
          <DialogDescription className="text-center">
            {content.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pro Plan Highlight */}
          <motion.div 
            className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-accent" />
                <span className="font-semibold">Pro Plan</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">$19.99</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </div>
            <div className="text-sm text-green-600 font-medium mb-3">
              Save $9/month vs. old pricing!
            </div>
          </motion.div>

          {/* Features List */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">What you'll get:</h4>
            <div className="space-y-1">
              {proFeatures.slice(0, 4).map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
              <div className="text-xs text-muted-foreground mt-2">
                + {proFeatures.length - 4} more premium features
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <CheckoutButton
              priceId="pro_monthly"
              planName="Pro"
              className="w-full"
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Pro Now
            </CheckoutButton>
            
            <Button variant="outline" onClick={onClose} className="w-full">
              Continue Trial
            </Button>
          </div>

          <div className="text-xs text-center text-muted-foreground">
            30-day money-back guarantee • Cancel anytime
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
