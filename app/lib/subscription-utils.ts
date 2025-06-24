
import { prisma } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import type { User, SubscriptionTier, SubscriptionStatus } from '@prisma/client'

export async function syncUserWithStripeSubscription(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        stripeCustomerId: true, 
        stripeSubscriptionId: true,
        subscriptionTier: true,
        subscriptionStatus: true,
      },
    })

    if (!user?.stripeSubscriptionId) {
      return null
    }

    const subscription = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId,
      { expand: ['items.data.price.product'] }
    )

    // Determine subscription tier from Stripe price
    const priceId = subscription.items.data[0]?.price.id
    let tier: SubscriptionTier = 'TRIAL'
    
    if (priceId?.includes('pro')) {
      tier = 'PRO'
    } else if (priceId?.includes('enterprise')) {
      tier = 'ENTERPRISE' 
    } else if (priceId?.includes('lifetime')) {
      tier = 'LIFETIME'
    }

    // Determine subscription status
    let status: SubscriptionStatus = 'TRIAL'
    switch (subscription.status) {
      case 'active':
        status = 'ACTIVE'
        break
      case 'trialing':
        status = 'TRIAL'
        break
      case 'canceled':
      case 'unpaid':
      case 'past_due':
        status = 'CANCELED'
        break
      default:
        status = 'EXPIRED'
    }

    // Update user with Stripe data
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: tier,
        subscriptionStatus: status,
        subscriptionStartDate: new Date(subscription.start_date * 1000),
        subscriptionEndDate: (subscription as any).current_period_end 
          ? new Date((subscription as any).current_period_end * 1000) 
          : null,
        nextBillingDate: (subscription as any).current_period_end
          ? new Date((subscription as any).current_period_end * 1000)
          : null,
        subscriptionCancelAt: (subscription as any).cancel_at
          ? new Date((subscription as any).cancel_at * 1000)
          : null,
        subscriptionCanceledAt: (subscription as any).canceled_at
          ? new Date((subscription as any).canceled_at * 1000)
          : null,
        isTrialActive: subscription.status === 'trialing',
      },
    })

    return updatedUser
  } catch (error) {
    console.error('Error syncing user with Stripe subscription:', error)
    return null
  }
}

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        subscriptionStatus: true, 
        subscriptionTier: true,
        isTrialActive: true,
        trialEndDate: true,
      },
    })

    if (!user) return false

    // Check if user has active paid subscription
    if (user.subscriptionStatus === 'ACTIVE' && 
        ['PRO', 'ENTERPRISE', 'LIFETIME'].includes(user.subscriptionTier)) {
      return true
    }

    // Check if user has active trial
    if (user.isTrialActive && user.trialEndDate && user.trialEndDate > new Date()) {
      return true
    }

    return false
  } catch (error) {
    console.error('Error checking subscription status:', error)
    return false
  }
}

export async function getUserSubscriptionInfo(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
        subscriptionStartDate: true,
        subscriptionEndDate: true,
        nextBillingDate: true,
        isTrialActive: true,
        trialEndDate: true,
        trialUsageCount: true,
        dailyUsageCount: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
      },
    })
  } catch (error) {
    console.error('Error getting user subscription info:', error)
    return null
  }
}

export async function cancelSubscription(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeSubscriptionId: true },
    })

    if (!user?.stripeSubscriptionId) {
      throw new Error('No active subscription found')
    }

    // Cancel at period end in Stripe
    await stripe.subscriptions.update(user.stripeSubscriptionId, {
      cancel_at_period_end: true,
    })

    // Sync with our database
    await syncUserWithStripeSubscription(userId)

    return true
  } catch (error) {
    console.error('Error canceling subscription:', error)
    return false
  }
}

export async function reactivateSubscription(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeSubscriptionId: true },
    })

    if (!user?.stripeSubscriptionId) {
      throw new Error('No subscription found')
    }

    // Reactivate subscription in Stripe
    await stripe.subscriptions.update(user.stripeSubscriptionId, {
      cancel_at_period_end: false,
    })

    // Sync with our database
    await syncUserWithStripeSubscription(userId)

    return true
  } catch (error) {
    console.error('Error reactivating subscription:', error)
    return false
  }
}
