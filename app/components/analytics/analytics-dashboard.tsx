
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle,
  Share,
  DollarSign,
  Calendar,
  Target,
  Filter
} from 'lucide-react'
import { motion } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const timeRanges = [
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: '90d', label: '90 Days' },
  { id: '1y', label: '1 Year' },
]

const platforms = [
  { id: 'all', label: 'All Platforms' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'twitter', label: 'Twitter' },
]

// Sample data - in a real app, this would come from your database
const followerGrowthData = [
  { date: '2024-01-01', youtube: 10000, instagram: 15000, tiktok: 8000, linkedin: 5000, twitter: 12000 },
  { date: '2024-01-08', youtube: 10200, instagram: 15300, tiktok: 8500, linkedin: 5100, twitter: 12200 },
  { date: '2024-01-15', youtube: 10500, instagram: 15800, tiktok: 9200, linkedin: 5300, twitter: 12500 },
  { date: '2024-01-22', youtube: 10800, instagram: 16200, tiktok: 9800, linkedin: 5500, twitter: 12800 },
  { date: '2024-01-29', youtube: 11200, instagram: 16800, tiktok: 10500, linkedin: 5800, twitter: 13200 },
  { date: '2024-02-05', youtube: 11600, instagram: 17200, tiktok: 11200, linkedin: 6100, twitter: 13600 },
  { date: '2024-02-12', youtube: 12000, instagram: 17800, tiktok: 12000, linkedin: 6400, twitter: 14000 },
]

const engagementData = [
  { date: '2024-01-01', likes: 1200, comments: 150, shares: 89, saves: 230 },
  { date: '2024-01-08', likes: 1350, comments: 180, shares: 95, saves: 260 },
  { date: '2024-01-15', likes: 1450, comments: 200, shares: 110, saves: 290 },
  { date: '2024-01-22', likes: 1600, comments: 220, shares: 125, saves: 320 },
  { date: '2024-01-29', likes: 1750, comments: 240, shares: 140, saves: 350 },
  { date: '2024-02-05', likes: 1900, comments: 260, shares: 155, saves: 380 },
  { date: '2024-02-12', likes: 2100, comments: 280, shares: 170, saves: 420 },
]

const revenueData = [
  { month: 'Jan', adsense: 480, sponsorships: 1200, products: 800, memberships: 300 },
  { month: 'Feb', adsense: 520, sponsorships: 1400, products: 950, memberships: 350 },
  { month: 'Mar', adsense: 580, sponsorships: 1600, products: 1100, memberships: 400 },
  { month: 'Apr', adsense: 640, sponsorships: 1800, products: 1250, memberships: 450 },
  { month: 'May', adsense: 700, sponsorships: 2000, products: 1400, memberships: 500 },
  { month: 'Jun', adsense: 760, sponsorships: 2200, products: 1550, memberships: 550 },
]

const platformDistribution = [
  { name: 'YouTube', value: 12000, color: '#FF0000' },
  { name: 'Instagram', value: 17800, color: '#E4405F' },
  { name: 'TikTok', value: 12000, color: '#000000' },
  { name: 'LinkedIn', value: 6400, color: '#0077B5' },
  { name: 'Twitter', value: 14000, color: '#1DA1F2' },
]

const topContent = [
  {
    title: 'How I Built My First Million Dollar Business',
    platform: 'YouTube',
    views: '2.4M',
    engagement: '8.2%',
    revenue: '$4,200',
    type: 'Video'
  },
  {
    title: '10 Productivity Tips That Changed My Life',
    platform: 'Instagram',
    views: '450K',
    engagement: '12.1%',
    revenue: '$1,800',
    type: 'Reel'
  },
  {
    title: 'Day in the Life of an Entrepreneur',
    platform: 'TikTok',
    views: '1.8M',
    engagement: '15.3%',
    revenue: '$2,100',
    type: 'Video'
  },
  {
    title: 'The Future of AI in Business',
    platform: 'LinkedIn',
    views: '120K',
    engagement: '6.8%',
    revenue: '$900',
    type: 'Article'
  },
]

const metrics = [
  {
    title: 'Total Followers',
    value: '62.2K',
    change: '+15.2%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Total Views',
    value: '4.8M',
    change: '+23.1%',
    trend: 'up',
    icon: Eye,
    color: 'text-green-600'
  },
  {
    title: 'Engagement Rate',
    value: '9.7%',
    change: '+2.4%',
    trend: 'up',
    icon: Heart,
    color: 'text-red-600'
  },
  {
    title: 'Monthly Revenue',
    value: '$5,860',
    change: '+18.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600'
  },
]

export function AnalyticsDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span>Analytics</span>
          </h1>
          <p className="text-muted-foreground">
            Track your growth across all platforms and optimize your strategy
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-3">
          <div className="flex rounded-lg border">
            {timeRanges.map((range) => (
              <Button
                key={range.id}
                variant={selectedTimeRange === range.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedTimeRange(range.id)}
                className="rounded-none first:rounded-l-lg last:rounded-r-lg"
              >
                {range.label}
              </Button>
            ))}
          </div>
          
          <div className="flex rounded-lg border">
            {platforms.map((platform) => (
              <Button
                key={platform.id}
                variant={selectedPlatform === platform.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPlatform(platform.id)}
                className="rounded-none first:rounded-l-lg last:rounded-r-lg"
              >
                {platform.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Follower Growth Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Follower Growth</CardTitle>
            <CardDescription>Track your audience growth across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={followerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line type="monotone" dataKey="youtube" stroke="#FF0000" strokeWidth={2} />
                  <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} />
                  <Line type="monotone" dataKey="tiktok" stroke="#000000" strokeWidth={2} />
                  <Line type="monotone" dataKey="linkedin" stroke="#0077B5" strokeWidth={2} />
                  <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Engagement Metrics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
            <CardDescription>Monitor how your audience interacts with your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Area type="monotone" dataKey="likes" stackId="1" stroke="#60B5FF" fill="#60B5FF" />
                  <Area type="monotone" dataKey="comments" stackId="1" stroke="#FF9149" fill="#FF9149" />
                  <Area type="monotone" dataKey="shares" stackId="1" stroke="#FF9898" fill="#FF9898" />
                  <Area type="monotone" dataKey="saves" stackId="1" stroke="#80D8C3" fill="#80D8C3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>Follower breakdown by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${(entry.value / 1000)}K`}
                  >
                    {platformDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>Track your monetization performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="adsense" stackId="a" fill="#60B5FF" />
                  <Bar dataKey="sponsorships" stackId="a" fill="#FF9149" />
                  <Bar dataKey="products" stackId="a" fill="#80D8C3" />
                  <Bar dataKey="memberships" stackId="a" fill="#A19AD3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Content */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>Your best content from the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topContent.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-1 flex-1">
                  <h4 className="font-medium text-sm truncate">{content.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {content.platform}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {content.type}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{content.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{content.engagement}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{content.revenue}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Content Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
