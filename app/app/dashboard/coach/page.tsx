
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { AICoachInterface } from '@/components/coach/ai-coach-interface'
import { TrialStatusBanner } from '@/components/trial/trial-status-banner'

export default async function CoachPage() {
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
        <AICoachInterface user={user} />
      </div>
    </DashboardLayout>
  )
}
