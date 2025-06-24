
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Briefcase, 
  BookOpen,
  Star,
  Calendar,
  Target,
  ArrowRight,
  ExternalLink,
  Plus,
  Gift,
  CreditCard,
  BarChart3
} from 'lucide-react'
import { motion } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const revenueStreams = [
  {
    id: 'adsense',
    title: 'Platform Ad Revenue',
    description: 'Earnings from YouTube AdSense, Instagram Reels Play, TikTok Creator Fund',
    currentRevenue: '$840',
    monthlyGrowth: '+12%',
    status: 'Active',
    potential: 'High',
    setup: 85,
    platforms: ['YouTube', 'Instagram', 'TikTok'],
    icon: DollarSign,
    color: 'bg-green-500'
  },
  {
    id: 'sponsorships',
    title: 'Brand Sponsorships',
    description: 'Paid partnerships and sponsored content deals',
    currentRevenue: '$2,400',
    monthlyGrowth: '+28%',
    status: 'Active',
    potential: 'Very High',
    setup: 70,
    platforms: ['All Platforms'],
    icon: Briefcase,
    color: 'bg-blue-500'
  },
  {
    id: 'products',
    title: 'Digital Products',
    description: 'Online courses, ebooks, templates, and digital downloads',
    currentRevenue: '$1,200',
    monthlyGrowth: '+45%',
    status: 'Growing',
    potential: 'Very High',
    setup: 60,
    platforms: ['Website', 'Social Media'],
    icon: BookOpen,
    color: 'bg-purple-500'
  },
  {
    id: 'affiliate',
    title: 'Affiliate Marketing',
    description: 'Commission from promoting other products and services',
    currentRevenue: '$680',
    monthlyGrowth: '+18%',
    status: 'Active',
    potential: 'Medium',
    setup: 90,
    platforms: ['All Platforms'],
    icon: Star,
    color: 'bg-orange-500'
  },
  {
    id: 'memberships',
    title: 'Memberships & Subscriptions',
    description: 'Recurring revenue from exclusive content and communities',
    currentRevenue: '$320',
    monthlyGrowth: '+8%',
    status: 'Started',
    potential: 'High',
    setup: 40,
    platforms: ['YouTube', 'Patreon'],
    icon: Users,
    color: 'bg-pink-500'
  },
  {
    id: 'services',
    title: 'Consulting & Services',
    description: 'One-on-one coaching, consulting, and done-for-you services',
    currentRevenue: '$0',
    monthlyGrowth: '0%',
    status: 'Planned',
    potential: 'Very High',
    setup: 15,
    platforms: ['LinkedIn', 'Website'],
    icon: Target,
    color: 'bg-gray-500'
  }
]

const monthlyRevenueData = [
  { month: 'Jul', total: 3200, adsense: 600, sponsorships: 1500, products: 800, affiliate: 300 },
  { month: 'Aug', total: 3600, adsense: 650, sponsorships: 1700, products: 900, affiliate: 350 },
  { month: 'Sep', total: 4100, adsense: 700, sponsorships: 1900, products: 1000, affiliate: 500 },
  { month: 'Oct', total: 4800, adsense: 750, sponsorships: 2200, products: 1200, affiliate: 650 },
  { month: 'Nov', total: 5200, adsense: 800, sponsorships: 2400, products: 1300, affiliate: 700 },
  { month: 'Dec', total: 5440, adsense: 840, sponsorships: 2400, products: 1200, affiliate: 680 },
]

const revenueDistribution = [
  { name: 'Sponsorships', value: 2400, color: '#60B5FF' },
  { name: 'Digital Products', value: 1200, color: '#A19AD3' },
  { name: 'Ad Revenue', value: 840, color: '#80D8C3' },
  { name: 'Affiliate', value: 680, color: '#FF9149' },
  { name: 'Memberships', value: 320, color: '#FF90BB' },
]

const opportunityCards = [
  {
    title: 'Launch Online Course',
    description: 'Create a comprehensive course in your expertise area',
    potential: '$5,000-15,000/month',
    effort: 'High',
    timeline: '6-8 weeks',
    icon: BookOpen,
    status: 'Ready'
  },
  {
    title: 'Membership Community',
    description: 'Build a paid community with exclusive content',
    potential: '$2,000-8,000/month',
    effort: 'Medium',
    timeline: '4-6 weeks',
    icon: Users,
    status: 'Ready'
  },
  {
    title: 'Coaching Program',
    description: 'Offer 1-on-1 or group coaching sessions',
    potential: '$3,000-12,000/month',
    effort: 'Medium',
    timeline: '2-3 weeks',
    icon: Target,
    status: 'Ready'
  },
  {
    title: 'Physical Products',
    description: 'Launch branded merchandise or products',
    potential: '$1,000-5,000/month',
    effort: 'High',
    timeline: '8-12 weeks',
    icon: ShoppingBag,
    status: 'Future'
  }
]

const brandDeals = [
  {
    brand: 'TechCorp Solutions',
    value: '$3,500',
    status: 'Negotiating',
    type: 'Sponsored Video',
    deadline: '2024-02-15'
  },
  {
    brand: 'Wellness Brand',
    value: '$2,200',
    status: 'Approved',
    type: 'Instagram Posts',
    deadline: '2024-02-10'
  },
  {
    brand: 'SaaS Platform',
    value: '$1,800',
    status: 'Pending',
    type: 'Review Video',
    deadline: '2024-02-20'
  }
]

export function MonetizationHub() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'streams', label: 'Revenue Streams', icon: DollarSign },
    { id: 'opportunities', label: 'Opportunities', icon: TrendingUp },
    { id: 'deals', label: 'Brand Deals', icon: Briefcase },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500'
      case 'Growing': return 'bg-blue-500'
      case 'Started': return 'bg-yellow-500'
      case 'Planned': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const totalRevenue = revenueStreams.reduce((sum, stream) => {
    return sum + parseInt(stream.currentRevenue.replace('$', '').replace(',', ''))
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-green-600" />
            <span>Monetization Hub</span>
          </h1>
          <p className="text-muted-foreground">
            Track and optimize your revenue streams across all platforms
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Revenue Stream
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-sm text-green-500">+22.8%</span>
                </div>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Streams</p>
                <p className="text-2xl font-bold">4</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-sm text-muted-foreground">of 6 total</span>
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Best Performing</p>
                <p className="text-lg font-bold">Sponsorships</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-sm text-green-500">$2,400/mo</span>
                </div>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
                <p className="text-2xl font-bold">+22.8%</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-sm text-muted-foreground">Last 30 days</span>
                </div>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue growth over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" stroke="#60B5FF" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Distribution</CardTitle>
                  <CardDescription>Breakdown of income sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={(entry) => `${entry.name}: $${entry.value}`}
                        >
                          {revenueDistribution.map((entry, index) => (
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

            {/* Monthly Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown by Stream</CardTitle>
                <CardDescription>Track performance of each revenue stream</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="sponsorships" stackId="a" fill="#60B5FF" />
                      <Bar dataKey="products" stackId="a" fill="#A19AD3" />
                      <Bar dataKey="adsense" stackId="a" fill="#80D8C3" />
                      <Bar dataKey="affiliate" stackId="a" fill="#FF9149" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'streams' && (
          <div className="grid gap-6">
            {revenueStreams.map((stream, index) => (
              <Card key={stream.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2">
                        <stream.icon className="h-5 w-5 text-primary" />
                        <span>{stream.title}</span>
                      </CardTitle>
                      <CardDescription>{stream.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(stream.status)}`}></div>
                      <Badge variant="outline">{stream.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Current Revenue</h4>
                      <p className="text-2xl font-bold text-green-600">{stream.currentRevenue}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-sm text-green-500">{stream.monthlyGrowth}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Setup Progress</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{stream.setup}%</span>
                          <Badge variant={stream.setup >= 80 ? 'default' : 'secondary'}>
                            {stream.setup >= 80 ? 'Complete' : 'In Progress'}
                          </Badge>
                        </div>
                        <Progress value={stream.setup} />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Platforms</h4>
                      <div className="flex flex-wrap gap-1">
                        {stream.platforms.map((platform, platformIndex) => (
                          <Badge key={platformIndex} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-2">
                        <Badge variant={stream.potential === 'Very High' ? 'default' : 'secondary'}>
                          {stream.potential} Potential
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end">
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                        <Button className="w-full">
                          Optimize
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="grid md:grid-cols-2 gap-6">
            {opportunityCards.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2">
                        <opportunity.icon className="h-5 w-5 text-primary" />
                        <span>{opportunity.title}</span>
                      </CardTitle>
                      <CardDescription>{opportunity.description}</CardDescription>
                    </div>
                    <Badge variant={opportunity.status === 'Ready' ? 'default' : 'secondary'}>
                      {opportunity.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Potential:</span>
                        <p className="font-medium text-green-600">{opportunity.potential}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Effort:</span>
                        <p className="font-medium">{opportunity.effort}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline:</span>
                        <p className="font-medium">{opportunity.timeline}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Brand Deals</CardTitle>
                    <CardDescription>Manage your current sponsorship opportunities</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Deal
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {brandDeals.map((deal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-1">
                      <h4 className="font-medium">{deal.brand}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{deal.type}</Badge>
                        <Badge variant={deal.status === 'Approved' ? 'default' : 'secondary'}>
                          {deal.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Deadline: {new Date(deal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-lg font-bold text-green-600">{deal.value}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Details</Button>
                        <Button size="sm">Manage</Button>
                      </div>
                    </div>
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
