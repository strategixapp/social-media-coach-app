
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { MonetizationHub } from '@/components/monetization/monetization-hub'

export default async function MonetizationPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <DashboardLayout>
      <MonetizationHub />
    </DashboardLayout>
  )
}
