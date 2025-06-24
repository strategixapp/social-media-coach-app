
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Youtube, 
  Play, 
  Eye, 
  ThumbsUp, 
  Users, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Target,
  Lightbulb,
  BarChart3,
  Search,
  Video,
  Hash
} from 'lucide-react'
import { motion } from 'framer-motion'

const strategies = [
  {
    title: 'Channel Optimization',
    description: 'Optimize your channel for maximum discoverability',
    icon: Target,
    status: 'In Progress',
    progress: 75,
    tasks: [
      'Update channel banner with consistent branding',
      'Write compelling channel description with keywords',
      'Create channel trailer for new visitors',
      'Organize videos into themed playlists'
    ]
  },
  {
    title: 'Content Strategy',
    description: 'Develop a consistent content calendar and format',
    icon: Calendar,
    status: 'Pending',
    progress: 25,
    tasks: [
      'Define 3-5 content pillars for your niche',
      'Plan video series for subscriber retention',
      'Create content calendar for next 30 days',
      'Develop signature intro/outro for brand recognition'
    ]
  },
  {
    title: 'SEO Optimization',
    description: 'Master YouTube SEO for better video rankings',
    icon: Search,
    status: 'Not Started',
    progress: 0,
    tasks: [
      'Research high-volume, low-competition keywords',
      'Optimize video titles for click-through rates',
      'Write detailed descriptions with timestamps',
      'Use tags strategically for topic association'
    ]
  },
  {
    title: 'Audience Engagement',
    description: 'Build a loyal community through interaction',
    icon: Users,
    status: 'In Progress',
    progress: 60,
    tasks: [
      'Respond to comments within 2 hours',
      'Create community posts weekly',
      'Host live streams monthly',
      'Ask questions to encourage engagement'
    ]
  }
]

const metrics = [
  { label: 'Subscribers', value: '12.4K', change: '+15%', icon: Users },
  { label: 'Total Views', value: '2.1M', change: '+22%', icon: Eye },
  { label: 'Avg. Watch Time', value: '4:32', change: '+8%', icon: Play },
  { label: 'Monthly Revenue', value: '$1,240', change: '+35%', icon: DollarSign },
]

const contentIdeas = [
  { title: 'How to Start [Your Niche] in 2025', category: 'Tutorial', trend: 'High' },
  { title: 'My [Niche] Mistakes & How to Avoid Them', category: 'Story', trend: 'Medium' },
  { title: '5 Tools Every [Professional] Needs', category: 'List', trend: 'High' },
  { title: 'Day in the Life of a [Your Role]', category: 'Vlog', trend: 'Medium' },
  { title: 'Reacting to [Trending Topic]', category: 'Reaction', trend: 'High' },
  { title: '[Niche] Beginner vs Expert', category: 'Comparison', trend: 'Medium' },
]

const monetizationOptions = [
  {
    title: 'YouTube Partner Program',
    description: 'AdSense revenue from video ads',
    potential: '$500-2,000/month',
    requirements: '1K subscribers, 4K watch hours',
    status: 'Active'
  },
  {
    title: 'Brand Sponsorships',
    description: 'Paid partnerships with relevant brands',
    potential: '$1,000-5,000/video',
    requirements: '10K+ engaged subscribers',
    status: 'Available'
  },
  {
    title: 'Channel Memberships',
    description: 'Monthly subscriptions for exclusive content',
    potential: '$200-1,000/month',
    requirements: '1K subscribers, community features',
    status: 'Ready'
  },
  {
    title: 'Digital Products',
    description: 'Sell courses, ebooks, or templates',
    potential: '$2,000-10,000/month',
    requirements: 'Established authority in niche',
    status: 'Planned'
  }
]

export function YouTubePlatform() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'strategy', label: 'Strategy', icon: Target },
    { id: 'content', label: 'Content Ideas', icon: Lightbulb },
    { id: 'monetization', label: 'Monetization', icon: DollarSign },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Youtube className="h-8 w-8 text-red-500" />
            <span>YouTube Strategy</span>
          </h1>
          <p className="text-muted-foreground">
            Master long-form content and build a sustainable YouTube business
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Video className="mr-2 h-4 w-4" />
            Upload Video
          </Button>
          <Button>
            <Play className="mr-2 h-4 w-4" />
            Start Live Stream
          </Button>
        </div>
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
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric) => (
                <Card key={metric.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-sm text-green-500">{metric.change}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <metric.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Channel Health Score */}
            <Card>
              <CardHeader>
                <CardTitle>Channel Health Score</CardTitle>
                <CardDescription>
                  Overall assessment of your YouTube channel optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Overall Score</span>
                    <span className="text-2xl font-bold text-primary">78/100</span>
                  </div>
                  <Progress value={78} className="h-3" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">SEO Optimization</div>
                      <div className="text-muted-foreground">85/100</div>
                    </div>
                    <div>
                      <div className="font-medium">Content Quality</div>
                      <div className="text-muted-foreground">82/100</div>
                    </div>
                    <div>
                      <div className="font-medium">Engagement Rate</div>
                      <div className="text-muted-foreground">76/100</div>
                    </div>
                    <div>
                      <div className="font-medium">Upload Consistency</div>
                      <div className="text-muted-foreground">68/100</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="grid gap-6">
            {strategies.map((strategy, index) => (
              <Card key={strategy.title}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2">
                        <strategy.icon className="h-5 w-5 text-primary" />
                        <span>{strategy.title}</span>
                      </CardTitle>
                      <CardDescription>{strategy.description}</CardDescription>
                    </div>
                    <Badge variant={strategy.status === 'In Progress' ? 'default' : 'secondary'}>
                      {strategy.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{strategy.progress}%</span>
                      </div>
                      <Progress value={strategy.progress} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Action Items:</h4>
                      <ul className="space-y-1">
                        {strategy.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center space-x-2 text-sm">
                            <div className={`w-2 h-2 rounded-full ${
                              taskIndex < strategy.progress / 25 ? 'bg-green-500' : 'bg-muted'
                            }`} />
                            <span className={taskIndex < strategy.progress / 25 ? 'line-through text-muted-foreground' : ''}>
                              {task}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Detailed Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trending Content Ideas</CardTitle>
                <CardDescription>
                  AI-generated content ideas based on current trends and your niche
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentIdeas.map((idea, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <h4 className="font-medium">{idea.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {idea.category}
                          </Badge>
                          <Badge variant={idea.trend === 'High' ? 'default' : 'secondary'} className="text-xs">
                            {idea.trend} Trend
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Create Script
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Generate More Ideas
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'monetization' && (
          <div className="space-y-6">
            <div className="grid gap-4">
              {monetizationOptions.map((option, index) => (
                <Card key={option.title}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{option.title}</CardTitle>
                        <CardDescription>{option.description}</CardDescription>
                      </div>
                      <Badge variant={option.status === 'Active' ? 'default' : 'secondary'}>
                        {option.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Potential Revenue:</span>
                        <span className="font-medium text-green-600">{option.potential}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Requirements: </span>
                        <span>{option.requirements}</span>
                      </div>
                      <Button 
                        variant={option.status === 'Active' ? 'default' : 'outline'} 
                        className="w-full"
                      >
                        {option.status === 'Active' ? 'Manage' : option.status === 'Available' ? 'Apply Now' : 'Learn More'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
