
import { prisma } from '@/lib/db'
import { User } from '@prisma/client'

// Admin email addresses - these users will have admin privileges
const ADMIN_EMAILS = [
  'admin@strategixapp.com',
  'support@strategixapp.com',
  'owner@strategixapp.com'
]

export async function isAdmin(email: string): Promise<boolean> {
  return ADMIN_EMAILS.includes(email.toLowerCase())
}

export async function isUserAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true }
  })
  
  if (!user?.email) return false
  return isAdmin(user.email)
}

export async function requireAdmin(userId: string): Promise<void> {
  const isAdminUser = await isUserAdmin(userId)
  if (!isAdminUser) {
    throw new Error('Admin access required')
  }
}

export async function getAdminStats() {
  const [
    totalUsers,
    activeSubscriptions,
    trialUsers,
    lifetimeUsers,
    totalRevenue,
    recentSignups
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: { subscriptionStatus: 'ACTIVE' }
    }),
    prisma.user.count({
      where: { subscriptionStatus: 'TRIAL' }
    }),
    prisma.user.count({
      where: { subscriptionTier: 'LIFETIME' }
    }),
    prisma.payment.aggregate({
      where: { status: 'SUCCEEDED' },
      _sum: { amount: true }
    }),
    prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        createdAt: true
      }
    })
  ])

  return {
    totalUsers,
    activeSubscriptions,
    trialUsers,
    lifetimeUsers,
    totalRevenue: totalRevenue._sum.amount || 0,
    recentSignups
  }
}
