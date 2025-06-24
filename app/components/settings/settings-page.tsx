
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Settings, 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Smartphone,
  Mail,
  Globe,
  Crown,
  Check,
  X
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { SubscriptionManagement } from '@/components/payment/subscription-management'

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      'Basic AI coach access',
      'Limited daily queries (10/day)',
      '3 platform strategies',
      'Essential templates',
      'Community access',
      'Email support'
    ],
    limitations: [
      'Limited AI conversations',
      'Basic analytics only',
      'No premium content'
    ],
    current: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: 'per month',
    features: [
      'Unlimited AI coaching',
      'All 10+ platform strategies',
      'Advanced analytics & insights',
      '500+ premium templates',
      'Content calendar & planning',
      'Monetization strategies',
      'Goal tracking & progress',
      'Priority support',
      'Advanced AI features'
    ],
    limitations: [],
    current: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    features: [
      'Everything in Pro',
      'Multi-user access (5 seats)',
      'White-label options',
      'Custom integrations',
      'Advanced team analytics',
      'Dedicated account manager',
      'Custom training sessions',
      'API access',
      'Priority development requests'
    ],
    limitations: [],
    current: false
  }
]

const notificationSettings = [
  {
    id: 'ai_insights',
    title: 'AI Insights & Recommendations',
    description: 'Get notified when AI coach has new insights for you',
    enabled: true,
    channels: ['email', 'push']
  },
  {
    id: 'content_reminders',
    title: 'Content Reminders',
    description: 'Reminders for scheduled posts and content creation',
    enabled: true,
    channels: ['email', 'push']
  },
  {
    id: 'growth_milestones',
    title: 'Growth Milestones',
    description: 'Celebrate when you hit follower and engagement goals',
    enabled: true,
    channels: ['email', 'push']
  },
  {
    id: 'trending_alerts',
    title: 'Trending Content Alerts',
    description: 'Be first to know about trending topics in your niche',
    enabled: false,
    channels: ['push']
  },
  {
    id: 'weekly_reports',
    title: 'Weekly Performance Reports',
    description: 'Summary of your social media performance',
    enabled: true,
    channels: ['email']
  }
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      })
    }, 1000)
  }

  const handleNotificationToggle = (settingId: string) => {
    toast({
      title: 'Setting Updated',
      description: 'Notification preference has been updated.',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <Settings className="h-8 w-8 text-primary" />
          <span>Settings</span>
        </h1>
        <p className="text-muted-foreground">
          Manage your account, subscription, and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      defaultValue={session?.user?.name || ''}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={session?.user?.email || ''}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      defaultValue="UTC-8 (Pacific Time)"
                      placeholder="Select timezone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input
                      id="language"
                      defaultValue="English"
                      placeholder="Select language"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us about yourself and your goals"
                    defaultValue="Entrepreneur building a personal brand through social media. Passionate about productivity, business growth, and helping others achieve their dreams."
                  />
                </div>

                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media Goals</CardTitle>
                <CardDescription>Help us personalize your coaching experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary_goal">Primary Goal</Label>
                    <Input
                      id="primary_goal"
                      defaultValue="Build personal brand"
                      placeholder="e.g., Grow followers, Increase engagement"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target_platforms">Target Platforms</Label>
                    <Input
                      id="target_platforms"
                      defaultValue="Instagram, YouTube, LinkedIn"
                      placeholder="e.g., Instagram, TikTok, YouTube"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="niche">Niche/Industry</Label>
                    <Input
                      id="niche"
                      defaultValue="Business & Entrepreneurship"
                      placeholder="e.g., Fitness, Tech, Lifestyle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Input
                      id="experience"
                      defaultValue="Intermediate"
                      placeholder="Beginner, Intermediate, Advanced"
                    />
                  </div>
                </div>

                <Button variant="outline">
                  Update Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'subscription' && (
          <SubscriptionManagement />
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how and when you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="flex items-start justify-between p-4 rounded-lg border">
                    <div className="space-y-1 flex-1">
                      <h4 className="font-medium">{setting.title}</h4>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {setting.channels.map((channel) => (
                          <Badge key={channel} variant="outline" className="text-xs">
                            {channel === 'email' ? (
                              <>
                                <Mail className="mr-1 h-3 w-3" />
                                Email
                              </>
                            ) : (
                              <>
                                <Smartphone className="mr-1 h-3 w-3" />
                                Push
                              </>
                            )}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant={setting.enabled ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleNotificationToggle(setting.id)}
                    >
                      {setting.enabled ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                    </div>
                  </div>
                  <Badge>Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Browser and mobile app</p>
                    </div>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
                <CardDescription>Keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password</Label>
                  <Input
                    id="current_password"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>

                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Not enabled</p>
                  </div>
                  <Button variant="outline">
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your active sessions across devices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { device: 'Chrome on MacBook Pro', location: 'San Francisco, CA', current: true, lastActive: 'Active now' },
                  { device: 'Safari on iPhone', location: 'San Francisco, CA', current: false, lastActive: '2 hours ago' },
                  { device: 'Chrome on Windows', location: 'New York, NY', current: false, lastActive: '1 day ago' },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{session.device}</p>
                        {session.current && <Badge variant="outline">Current</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{session.location} • {session.lastActive}</p>
                    </div>
                    {!session.current && (
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  )
}
