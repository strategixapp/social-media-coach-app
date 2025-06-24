
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { SettingsPage as SettingsContent } from '@/components/settings/settings-page'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <DashboardLayout>
      <SettingsContent />
    </DashboardLayout>
  )
}
