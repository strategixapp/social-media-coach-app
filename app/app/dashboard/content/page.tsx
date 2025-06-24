
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { ContentHub } from '@/components/content/content-hub'

export default async function ContentPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <DashboardLayout>
      <ContentHub />
    </DashboardLayout>
  )
}
