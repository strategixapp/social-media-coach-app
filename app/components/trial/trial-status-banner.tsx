
'use client'

import { User } from '@prisma/client'
import { getTrialStatus, formatTrialTimeRemaining } from '@/lib/trial-utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Clock, Zap, Crown } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface TrialStatusBannerProps {
  user: User
  variant?: 'banner' | 'card'
}

export function TrialStatusBanner({ user, variant = 'banner' }: TrialStatusBannerProps) {
  const trialStatus = getTrialStatus(user)
  
  if (!trialStatus.isActive) return null

  const progressPercentage = trialStatus.daysRemaining > 0 
    ? ((7 - trialStatus.daysRemaining) / 7) * 100 
    : 100

  if (variant === 'card') {
    return (
      <motion.div 
        className="bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 rounded-lg p-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-accent" />
            <h3 className="font-semibold">Free Trial Active</h3>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTrialTimeRemaining(trialStatus.daysRemaining, trialStatus.hoursRemaining)}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Daily usage: {trialStatus.dailyUsageCount}/{trialStatus.maxDailyUsage}
            </span>
            <Link href="/pricing">
              <Button size="sm" className="flex items-center space-x-1">
                <Crown className="h-4 w-4" />
                <span>Upgrade Now</span>
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="bg-gradient-to-r from-accent/10 to-primary/10 border-l-4 border-accent p-4 mb-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-accent/20 p-2 rounded-full">
            <Clock className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold">Trial Active</h4>
            <p className="text-sm text-muted-foreground">
              {formatTrialTimeRemaining(trialStatus.daysRemaining, trialStatus.hoursRemaining)} • 
              Daily usage: {trialStatus.dailyUsageCount}/{trialStatus.maxDailyUsage}
            </p>
          </div>
        </div>
        <Link href="/pricing">
          <Button className="flex items-center space-x-1">
            <Crown className="h-4 w-4" />
            <span>Upgrade to Pro</span>
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
