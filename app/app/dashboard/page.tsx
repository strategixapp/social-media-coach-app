
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import { TrialStatusBanner } from '@/components/trial/trial-status-banner'
import { PaymentStatusHandler } from '@/components/payment/payment-status-handler'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  // Fetch user data with trial information
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! }
  })

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <TrialStatusBanner user={user} />
        <DashboardContent />
      </div>
      <PaymentStatusHandler />
    </DashboardLayout>
  )
}
