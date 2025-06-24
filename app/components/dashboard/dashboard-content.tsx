
'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  Brain, 
  Calendar,
  Target,
  Zap,
  ArrowRight,
  Play
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const quickActions = [
  {
    title: 'Start AI Coaching Session',
    description: 'Get personalized guidance for your content strategy',
    icon: Brain,
    href: '/dashboard/coach',
    color: 'bg-primary/10 text-primary'
  },
  {
    title: 'Plan Content',
    description: 'Create your content calendar for the week',
    icon: Calendar,
    href: '/dashboard/content',
    color: 'bg-accent/10 text-accent'
  },
  {
    title: 'Check Analytics',
    description: 'Review your growth metrics and performance',
    icon: BarChart3,
    href: '/dashboard/analytics',
    color: 'bg-blue-500/10 text-blue-600'
  },
  {
    title: 'Explore Monetization',
    description: 'Discover new revenue opportunities',
    icon: DollarSign,
    href: '/dashboard/monetization',
    color: 'bg-green-500/10 text-green-600'
  }
]

const stats = [
  {
    title: 'Total Followers',
    value: '47.2K',
    change: '+12.5%',
    trend: 'up',
    icon: Users
  },
  {
    title: 'Engagement Rate',
    value: '8.4%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp
  },
  {
    title: 'Monthly Revenue',
    value: '$3,240',
    change: '+18.2%',
    trend: 'up',
    icon: DollarSign
  },
  {
    title: 'Content Score',
    value: '9.2/10',
    change: '+0.8',
    trend: 'up',
    icon: Target
  }
]

const recentAchievements = [
  {
    title: 'First Viral Video',
    description: 'Your TikTok video reached 100K+ views',
    date: '2 days ago',
    badge: 'TikTok'
  },
  {
    title: 'Monetization Milestone',
    description: 'Earned $1000+ in a single month',
    date: '1 week ago',
    badge: 'Revenue'
  },
  {
    title: 'Community Builder',
    description: 'Reached 50K total followers',
    date: '2 weeks ago',
    badge: 'Growth'
  }
]

const platformHighlights = [
  {
    platform: 'YouTube',
    metric: '12.4K subscribers',
    growth: '+15%',
    action: 'Upload new video'
  },
  {
    platform: 'Instagram',
    metric: '18.7K followers',
    growth: '+8%',
    action: 'Create Reel'
  },
  {
    platform: 'TikTok',
    metric: '25.1K followers',
    growth: '+22%',
    action: 'Jump on trend'
  }
]

export function DashboardContent() {
  const { data: session } = useSession()

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'Creator'}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Here's what's happening with your social media empire today.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {quickActions.map((action, index) => (
          <Link key={action.title} href={action.href}>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className={`p-3 rounded-lg w-fit ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>

      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <span className="text-sm text-accent">{stat.change}</span>
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Platform Highlights */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Platform Highlights</CardTitle>
              <CardDescription>Your top performing platforms this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {platformHighlights.map((platform) => (
                <div key={platform.platform} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <h4 className="font-semibold">{platform.platform}</h4>
                    <p className="text-sm text-muted-foreground">{platform.metric}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-accent" />
                      <span className="text-sm text-accent">{platform.growth}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {platform.action}
                  </Button>
                </div>
              ))}
              
              <Link href="/dashboard/analytics">
                <Button variant="outline" className="w-full mt-4">
                  View Detailed Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-accent" />
                <span>Recent Wins</span>
              </CardTitle>
              <CardDescription>Celebrate your achievements!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.badge}
                    </Badge>
                  </div>
                  {index < recentAchievements.length - 1 && <div className="border-b" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Coach CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Ready for your next breakthrough?</h3>
                <p className="text-muted-foreground">
                  Chat with your AI coach to get personalized strategies and overcome any challenges.
                </p>
              </div>
              <div className="flex space-x-3">
                <Link href="/dashboard/coach">
                  <Button>
                    <Brain className="mr-2 h-4 w-4" />
                    Start Coaching
                  </Button>
                </Link>
                <Button variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Tutorial
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
