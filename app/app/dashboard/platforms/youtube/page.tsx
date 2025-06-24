
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { YouTubePlatform } from '@/components/platforms/youtube-platform'

export default async function YouTubePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <DashboardLayout>
      <YouTubePlatform />
    </DashboardLayout>
  )
}
