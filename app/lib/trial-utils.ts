
import { User } from '@prisma/client'

export interface TrialStatus {
  isActive: boolean
  daysRemaining: number
  hoursRemaining: number
  hasExpired: boolean
  canUseFeature: boolean
  usageCount: number
  dailyUsageCount: number
  maxDailyUsage: number
}

export function getTrialStatus(user: User): TrialStatus {
  const now = new Date()
  const trialEndDate = user.trialEndDate ? new Date(user.trialEndDate) : null
  const trialStartDate = user.trialStartDate ? new Date(user.trialStartDate) : null
  
  if (!trialEndDate || !trialStartDate) {
    return {
      isActive: false,
      daysRemaining: 0,
      hoursRemaining: 0,
      hasExpired: true,
      canUseFeature: user.subscriptionTier === 'PRO' || user.subscriptionTier === 'ENTERPRISE',
      usageCount: user.trialUsageCount || 0,
      dailyUsageCount: user.dailyUsageCount || 0,
      maxDailyUsage: 15
    }
  }

  const hasExpired = now > trialEndDate
  const timeRemaining = trialEndDate.getTime() - now.getTime()
  const daysRemaining = Math.max(0, Math.ceil(timeRemaining / (1000 * 60 * 60 * 24)))
  const hoursRemaining = Math.max(0, Math.ceil(timeRemaining / (1000 * 60 * 60)))
  
  const isActive = user.isTrialActive && !hasExpired && user.subscriptionTier === 'TRIAL'
  const canUseFeature = isActive || user.subscriptionTier === 'PRO' || user.subscriptionTier === 'ENTERPRISE'
  
  return {
    isActive,
    daysRemaining,
    hoursRemaining,
    hasExpired,
    canUseFeature,
    usageCount: user.trialUsageCount || 0,
    dailyUsageCount: user.dailyUsageCount || 0,
    maxDailyUsage: 15
  }
}

export function shouldResetDailyUsage(user: User): boolean {
  if (!user.dailyUsageResetDate) return true
  
  const now = new Date()
  const resetDate = new Date(user.dailyUsageResetDate)
  const daysSinceReset = Math.floor((now.getTime() - resetDate.getTime()) / (1000 * 60 * 60 * 24))
  
  return daysSinceReset >= 1
}

export function formatTrialTimeRemaining(daysRemaining: number, hoursRemaining: number): string {
  if (daysRemaining > 0) {
    return `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`
  } else if (hoursRemaining > 0) {
    return `${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} remaining`
  } else {
    return 'Trial expired'
  }
}

export function getTrialProgressPercentage(user: User): number {
  if (!user.trialStartDate || !user.trialEndDate) return 0
  
  const now = new Date()
  const startDate = new Date(user.trialStartDate)
  const endDate = new Date(user.trialEndDate)
  
  const totalDuration = endDate.getTime() - startDate.getTime()
  const elapsed = now.getTime() - startDate.getTime()
  
  return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
}
