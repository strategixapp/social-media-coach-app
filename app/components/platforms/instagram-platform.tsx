
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  Eye, 
  Users, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Target,
  Lightbulb,
  BarChart3,
  Camera,
  Video,
  Hash,
  Palette
} from 'lucide-react'
import { motion } from 'framer-motion'

const strategies = [
  {
    title: 'Feed Aesthetics',
    description: 'Create a cohesive, visually appealing Instagram feed',
    icon: Palette,
    status: 'In Progress',
    progress: 60,
    tasks: [
      'Define brand color palette and fonts',
      'Create content templates for consistency',
      'Plan feed layout with strategic post placement',
      'Develop visual storytelling guidelines'
    ]
  },
  {
    title: 'Reels Mastery',
    description: 'Dominate Instagram Reels for maximum reach',
    icon: Video,
    status: 'Active',
    progress: 80,
    tasks: [
      'Use trending audio and music',
      'Create hook-heavy openings (first 3 seconds)',
      'Add captions and text overlays',
      'Post consistently during peak hours'
    ]
  },
  {
    title: 'Stories Engagement',
    description: 'Boost daily engagement through Instagram Stories',
    icon: Camera,
    status: 'Growing',
    progress: 45,
    tasks: [
      'Use interactive stickers (polls, questions, quizzes)',
      'Share behind-the-scenes content daily',
      'Create story highlights for evergreen content',
      'Cross-promote with other creators'
    ]
  },
  {
    title: 'Hashtag Strategy',
    description: 'Optimize hashtag usage for discoverability',
    icon: Hash,
    status: 'Active',
    progress: 90,
    tasks: [
      'Research niche-specific hashtags',
      'Mix popular and niche hashtags (30/20/10 rule)',
      'Create branded hashtags for campaigns',
      'Rotate hashtag sets to avoid shadowbanning'
    ]
  }
]

const metrics = [
  { label: 'Followers', value: '17.8K', change: '+8%', icon: Users },
  { label: 'Avg. Likes', value: '1,240', change: '+15%', icon: Heart },
  { label: 'Story Views', value: '8.2K', change: '+12%', icon: Eye },
  { label: 'Monthly Reach', value: '45.6K', change: '+25%', icon: TrendingUp },
]

const contentIdeas = [
  { title: 'Day in the Life Reel', category: 'Lifestyle', trend: 'High', format: 'Reel' },
  { title: 'Before & After Transformation', category: 'Education', trend: 'High', format: 'Carousel' },
  { title: 'Quick Tips Carousel Post', category: 'Tips', trend: 'Medium', format: 'Carousel' },
  { title: 'Behind the Scenes Stories', category: 'Personal', trend: 'Medium', format: 'Stories' },
  { title: 'User-Generated Content Feature', category: 'Community', trend: 'High', format: 'Post' },
  { title: 'Trending Audio Challenge', category: 'Entertainment', trend: 'High', format: 'Reel' },
]

const hashtagSets = [
  {
    name: 'Main Niche Set',
    hashtags: ['#entrepreneur', '#businesstips', '#productivity', '#success', '#mindset', '#hustle', '#motivation', '#businessowner', '#startup', '#leadership'],
    performance: 'High',
    reach: '25K-50K'
  },
  {
    name: 'Lifestyle Set',
    hashtags: ['#lifestyle', '#dailylife', '#inspiration', '#selfcare', '#balance', '#wellness', '#morningroutine', '#goals', '#positivity', '#growth'],
    performance: 'Medium',
    reach: '10K-25K'
  },
  {
    name: 'Niche Specific',
    hashtags: ['#socialmediamarketing', '#contentcreator', '#digitalmarketing', '#onlinebusiness', '#marketingtips', '#branding', '#smallbusiness', '#freelancer', '#consultant', '#coach'],
    performance: 'High',
    reach: '15K-35K'
  }
]

const engagementAnalytics = [
  { time: '6 AM', engagement: 12 },
  { time: '9 AM', engagement: 25 },
  { time: '12 PM', engagement: 45 },
  { time: '3 PM', engagement: 38 },
  { time: '6 PM', engagement: 72 },
  { time: '9 PM', engagement: 85 },
  { time: '12 AM', engagement: 28 },
]

const reelsPerformance = [
  {
    title: 'Morning Routine for Success',
    views: '124K',
    likes: '8.2K',
    comments: '267',
    shares: '1.1K',
    saves: '2.3K',
    trend: 'Viral'
  },
  {
    title: '5 Business Tips in 30 Seconds',
    views: '67K',
    likes: '4.1K',
    comments: '156',
    shares: '589',
    saves: '1.8K',
    trend: 'Good'
  },
  {
    title: 'Workspace Setup Tour',
    views: '89K',
    likes: '5.7K',
    comments: '203',
    shares: '743',
    saves: '2.1K',
    trend: 'Great'
  },
]

export function InstagramPlatform() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'strategy', label: 'Strategy', icon: Target },
    { id: 'content', label: 'Content Ideas', icon: Lightbulb },
    { id: 'hashtags', label: 'Hashtags', icon: Hash },
    { id: 'reels', label: 'Reels Analytics', icon: Video },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Instagram className="h-8 w-8 text-pink-500" />
            <span>Instagram Strategy</span>
          </h1>
          <p className="text-muted-foreground">
            Build an aesthetic feed, create viral Reels, and engage your community
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Camera className="mr-2 h-4 w-4" />
            Create Story
          </Button>
          <Button>
            <Video className="mr-2 h-4 w-4" />
            Make Reel
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

            {/* Engagement Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Best Posting Times</CardTitle>
                <CardDescription>
                  When your audience is most active (based on last 30 days)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {engagementAnalytics.map((time, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-muted-foreground mb-2">{time.time}</div>
                      <div className="h-20 bg-muted rounded flex items-end justify-center">
                        <div 
                          className="bg-primary rounded-t w-full transition-all"
                          style={{ height: `${(time.engagement / 85) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-medium mt-1">{time.engagement}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <strong>Optimal posting times:</strong> 6-9 PM (highest engagement) and 12-3 PM (secondary peak)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Camera className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Create Story</h3>
                  <p className="text-sm text-muted-foreground">Share behind-the-scenes content</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Video className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Make Reel</h3>
                  <p className="text-sm text-muted-foreground">Create viral short-form content</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Palette className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Design Post</h3>
                  <p className="text-sm text-muted-foreground">Create aesthetic feed content</p>
                </CardContent>
              </Card>
            </div>
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
                    <Badge variant={strategy.status === 'Active' ? 'default' : 'secondary'}>
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
                      View Strategy Guide
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
                <CardTitle>Content Ideas for Instagram</CardTitle>
                <CardDescription>
                  Curated content ideas optimized for Instagram's algorithm
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
                            {idea.format}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {idea.category}
                          </Badge>
                          <Badge variant={idea.trend === 'High' ? 'default' : 'secondary'} className="text-xs">
                            {idea.trend} Trend
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Create Now
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

        {activeTab === 'hashtags' && (
          <div className="space-y-6">
            <div className="grid gap-6">
              {hashtagSets.map((set, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle>{set.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant={set.performance === 'High' ? 'default' : 'secondary'}>
                            {set.performance} Performance
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Reach: {set.reach}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Copy Set
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {set.hashtags.map((hashtag, hashtagIndex) => (
                          <span key={hashtagIndex} className="inline-flex items-center space-x-1 text-sm bg-muted px-2 py-1 rounded">
                            <Hash className="h-3 w-3" />
                            <span>{hashtag.replace('#', '')}</span>
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit Set
                        </Button>
                        <Button variant="outline" size="sm">
                          Analyze Performance
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Hashtag Research Tools</CardTitle>
                <CardDescription>Discover new hashtags for your niche</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <Hash className="mr-2 h-4 w-4" />
                  Research New Hashtags
                </Button>
                <Button variant="outline" className="w-full">
                  Analyze Competitors' Hashtags
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'reels' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Reels</CardTitle>
                <CardDescription>Your best performing Reels from the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reelsPerformance.map((reel, index) => (
                  <div key={index} className="p-4 rounded-lg border space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{reel.title}</h4>
                        <Badge variant={reel.trend === 'Viral' ? 'default' : 'secondary'} className="mt-1">
                          {reel.trend}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        View Reel
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div className="text-center">
                        <Eye className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <div className="font-medium">{reel.views}</div>
                        <div className="text-muted-foreground text-xs">Views</div>
                      </div>
                      <div className="text-center">
                        <Heart className="h-4 w-4 mx-auto mb-1 text-red-500" />
                        <div className="font-medium">{reel.likes}</div>
                        <div className="text-muted-foreground text-xs">Likes</div>
                      </div>
                      <div className="text-center">
                        <MessageCircle className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                        <div className="font-medium">{reel.comments}</div>
                        <div className="text-muted-foreground text-xs">Comments</div>
                      </div>
                      <div className="text-center">
                        <Share className="h-4 w-4 mx-auto mb-1 text-green-500" />
                        <div className="font-medium">{reel.shares}</div>
                        <div className="text-muted-foreground text-xs">Shares</div>
                      </div>
                      <div className="text-center">
                        <Bookmark className="h-4 w-4 mx-auto mb-1 text-yellow-500" />
                        <div className="font-medium">{reel.saves}</div>
                        <div className="text-muted-foreground text-xs">Saves</div>
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
