
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Calendar, 
  Lightbulb, 
  FileText, 
  Video, 
  Image, 
  Hash, 
  TrendingUp,
  Clock,
  Plus,
  Search,
  Filter,
  Copy,
  Edit,
  Trash2,
  Play,
  Eye
} from 'lucide-react'
import { motion } from 'framer-motion'

const contentTypes = [
  { id: 'all', label: 'All Content', icon: FileText },
  { id: 'video', label: 'Videos', icon: Video },
  { id: 'image', label: 'Images', icon: Image },
  { id: 'text', label: 'Text Posts', icon: FileText },
  { id: 'templates', label: 'Templates', icon: Copy },
]

const platforms = [
  { id: 'all', label: 'All Platforms' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'twitter', label: 'Twitter' },
]

const contentIdeas = [
  {
    id: 1,
    title: '10 Productivity Hacks for Entrepreneurs',
    platform: 'YouTube',
    type: 'Video',
    status: 'Draft',
    trend: 'High',
    estimatedViews: '50K-100K',
    category: 'Business',
    createdAt: '2024-01-15',
    tags: ['productivity', 'business', 'entrepreneur']
  },
  {
    id: 2,
    title: 'Behind the Scenes: Creating Content',
    platform: 'Instagram',
    type: 'Reel',
    status: 'Scheduled',
    trend: 'Medium',
    estimatedViews: '10K-25K',
    category: 'Lifestyle',
    createdAt: '2024-01-14',
    tags: ['behind-the-scenes', 'content', 'process']
  },
  {
    id: 3,
    title: 'Quick Tips for Social Media Growth',
    platform: 'TikTok',
    type: 'Video',
    status: 'Published',
    trend: 'High',
    estimatedViews: '100K-250K',
    category: 'Education',
    createdAt: '2024-01-13',
    tags: ['tips', 'growth', 'social-media']
  },
  {
    id: 4,
    title: 'The Future of AI in Business',
    platform: 'LinkedIn',
    type: 'Article',
    status: 'Draft',
    trend: 'Medium',
    estimatedViews: '5K-15K',
    category: 'Technology',
    createdAt: '2024-01-12',
    tags: ['ai', 'business', 'future', 'technology']
  },
]

const templates = [
  {
    id: 1,
    title: 'How-to Video Script',
    description: 'Perfect structure for educational content',
    category: 'Video',
    platform: 'YouTube',
    uses: 247,
    rating: 4.8
  },
  {
    id: 2,
    title: 'Instagram Story Template',
    description: 'Engaging story layouts for maximum reach',
    category: 'Image',
    platform: 'Instagram',
    uses: 389,
    rating: 4.9
  },
  {
    id: 3,
    title: 'LinkedIn Post Formula',
    description: 'Professional post structure that drives engagement',
    category: 'Text',
    platform: 'LinkedIn',
    uses: 156,
    rating: 4.7
  },
  {
    id: 4,
    title: 'TikTok Hook Generator',
    description: 'Attention-grabbing openings for viral content',
    category: 'Video',
    platform: 'TikTok',
    uses: 512,
    rating: 4.9
  },
]

const trendingTopics = [
  { topic: 'AI Productivity Tools', trend: '+45%', category: 'Technology' },
  { topic: 'Sustainable Living', trend: '+32%', category: 'Lifestyle' },
  { topic: 'Remote Work Tips', trend: '+28%', category: 'Business' },
  { topic: 'Mental Health Awareness', trend: '+24%', category: 'Health' },
  { topic: 'Digital Marketing', trend: '+21%', category: 'Marketing' },
]

const upcomingPosts = [
  {
    title: 'Morning Routine for Success',
    platform: 'Instagram',
    scheduledFor: '2024-01-20 09:00',
    type: 'Reel'
  },
  {
    title: 'Weekly Business Update',
    platform: 'LinkedIn',
    scheduledFor: '2024-01-20 14:00',
    type: 'Post'
  },
  {
    title: 'Tutorial: Content Creation',
    platform: 'YouTube',
    scheduledFor: '2024-01-21 18:00',
    type: 'Video'
  },
]

export function ContentHub() {
  const [activeTab, setActiveTab] = useState('ideas')
  const [selectedContentType, setSelectedContentType] = useState('all')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'ideas', label: 'Content Ideas', icon: Lightbulb },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-500'
      case 'Scheduled': return 'bg-blue-500'
      case 'Draft': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'High': return 'text-green-600'
      case 'Medium': return 'text-yellow-600'
      case 'Low': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <span>Content Hub</span>
          </h1>
          <p className="text-muted-foreground">
            Plan, create, and manage your content across all platforms
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Content
        </Button>
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
        {activeTab === 'ideas' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search content ideas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex rounded-lg border">
                {contentTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedContentType === type.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedContentType(type.id)}
                    className="rounded-none first:rounded-l-lg last:rounded-r-lg"
                  >
                    <type.icon className="mr-1 h-3 w-3" />
                    {type.label}
                  </Button>
                ))}
              </div>

              <div className="flex rounded-lg border">
                {platforms.slice(0, 4).map((platform) => (
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

            {/* Content Ideas Grid */}
            <div className="grid gap-4">
              {contentIdeas.map((idea) => (
                <Card key={idea.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{idea.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{idea.platform}</Badge>
                            <Badge variant="secondary">{idea.type}</Badge>
                            <Badge variant="outline">{idea.category}</Badge>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(idea.status)}`}></div>
                            <span className="text-sm text-muted-foreground">{idea.status}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4" />
                            <span className={getTrendColor(idea.trend)}>{idea.trend} Trend</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{idea.estimatedViews} views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {idea.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center space-x-1 text-xs bg-muted px-2 py-1 rounded">
                              <Hash className="h-3 w-3" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        {idea.status === 'Draft' && (
                          <Button size="sm">
                            <Play className="mr-1 h-4 w-4" />
                            Publish
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Posts</CardTitle>
                <CardDescription>Your scheduled content for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingPosts.map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-1">
                      <h4 className="font-medium">{post.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{post.platform}</Badge>
                        <Badge variant="secondary">{post.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Scheduled for {new Date(post.scheduledFor).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Reschedule</Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View Full Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="grid md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{template.title}</span>
                    <Badge variant="outline">{template.platform}</Badge>
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Used {template.uses} times</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span>{template.rating}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Copy className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                      <Button variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'trending' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>Hot topics in your niche right now</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-1">
                      <h4 className="font-medium">{topic.topic}</h4>
                      <Badge variant="outline">{topic.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-medium">{topic.trend}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Last 7 days</p>
                      </div>
                      <Button size="sm">
                        Create Content
                      </Button>
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
