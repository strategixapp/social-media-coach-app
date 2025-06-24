
'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  Menu, 
  X, 
  BarChart3, 
  Brain, 
  Calendar, 
  DollarSign, 
  Users, 
  Settings, 
  LogOut,
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
  Facebook
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'AI Coach', href: '/dashboard/coach', icon: Brain },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Content', href: '/dashboard/content', icon: Calendar },
  { name: 'Monetization', href: '/dashboard/monetization', icon: DollarSign },
  { name: 'Community', href: '/dashboard/community', icon: Users },
]

const platformItems = [
  { name: 'YouTube', href: '/dashboard/platforms/youtube', icon: Youtube, color: 'text-red-500' },
  { name: 'Instagram', href: '/dashboard/platforms/instagram', icon: Instagram, color: 'text-pink-500' },
  { name: 'Twitter', href: '/dashboard/platforms/twitter', icon: Twitter, color: 'text-blue-400' },
  { name: 'LinkedIn', href: '/dashboard/platforms/linkedin', icon: Linkedin, color: 'text-blue-600' },
  { name: 'Facebook', href: '/dashboard/platforms/facebook', icon: Facebook, color: 'text-blue-500' },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold gradient-text">SocialCoach AI</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {/* Main Navigation */}
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                >
                  <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Platforms Section */}
            <div className="pt-6">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Platforms
              </h3>
              <div className="space-y-1">
                {platformItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image || ''} />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {session?.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="h-8 w-8"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
