
'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { User } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  Send, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Target, 
  Lightbulb,
  BarChart3,
  Calendar,
  DollarSign,
  Mic,
  MicOff,
  Crown,
  Clock,
  Lock
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { getTrialStatus, formatTrialTimeRemaining } from '@/lib/trial-utils'
import { UpgradeModal } from '@/components/trial/upgrade-modal'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
}

const quickPrompts = [
  {
    text: "How can I grow my YouTube channel?",
    category: "Growth",
    icon: TrendingUp
  },
  {
    text: "Create a content calendar for this week",
    category: "Planning",
    icon: Calendar
  },
  {
    text: "Monetization strategies for my niche",
    category: "Revenue",
    icon: DollarSign
  },
  {
    text: "Analyze my latest post performance",
    category: "Analytics",
    icon: BarChart3
  },
  {
    text: "Trending hashtags for my content",
    category: "Trends",
    icon: Sparkles
  },
  {
    text: "Help me define my target audience",
    category: "Strategy",
    icon: Target
  }
]

interface AICoachInterfaceProps {
  user: User
}

export function AICoachInterface({ user }: AICoachInterfaceProps) {
  const trialStatus = getTrialStatus(user)
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: trialStatus.isActive 
        ? `Hi there! I'm your AI Social Media Coach. You're currently on a ${formatTrialTimeRemaining(trialStatus.daysRemaining, trialStatus.hoursRemaining)} trial with ${trialStatus.maxDailyUsage - trialStatus.dailyUsageCount} queries remaining today. I'm here to help you grow your social media presence, create engaging content, and monetize your audience. What would you like to work on today?`
        : "Hi there! I'm your AI Social Media Coach. I'm here to help you grow your social media presence, create engaging content, and monetize your audience. What would you like to work on today?",
      timestamp: new Date(),
      suggestions: [
        "Content strategy for next week",
        "Platform-specific growth tips",
        "Monetization opportunities",
        "Trending topics in my niche"
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeModalTrigger, setUpgradeModalTrigger] = useState<'usage_limit' | 'feature_access' | 'trial_ending'>('feature_access')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message?: string) => {
    const messageText = message || input.trim()
    if (!messageText || isLoading) return

    // Check trial restrictions
    if (trialStatus.isActive) {
      if (trialStatus.hasExpired) {
        setUpgradeModalTrigger('trial_ending')
        setShowUpgradeModal(true)
        return
      }
      
      if (trialStatus.dailyUsageCount >= trialStatus.maxDailyUsage) {
        setUpgradeModalTrigger('usage_limit')
        setShowUpgradeModal(true)
        toast({
          title: 'Daily Limit Reached',
          description: `You've reached your daily limit of ${trialStatus.maxDailyUsage} queries. Upgrade to Pro for unlimited access.`,
          variant: 'destructive',
        })
        return
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages.slice(-5), // Send last 5 messages for context
          userTier: user.subscriptionTier,
          isTrialUser: trialStatus.isActive
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()

      // Show upgrade prompt if approaching limits
      if (trialStatus.isActive) {
        const remainingQueries = trialStatus.maxDailyUsage - (trialStatus.dailyUsageCount + 1)
        if (remainingQueries === 2) {
          toast({
            title: 'Trial Usage Notice',
            description: `${remainingQueries} queries remaining today. Upgrade to Pro for unlimited access.`,
          })
        }
        
        if (trialStatus.daysRemaining <= 1 && Math.random() < 0.3) {
          setUpgradeModalTrigger('trial_ending')
          setShowUpgradeModal(true)
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        suggestions: data.suggestions
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleListening = () => {
    // Voice input functionality would be implemented here
    setIsListening(!isListening)
    toast({
      title: 'Voice Input',
      description: isListening ? 'Voice input stopped' : 'Voice input started',
    })
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span>AI Coach</span>
          </h1>
          <p className="text-muted-foreground">
            Your personal social media growth mentor
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {trialStatus.isActive && (
            <div className="flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-lg px-3 py-2">
              <Clock className="h-4 w-4 text-accent" />
              <div className="text-sm">
                <div className="font-semibold">Trial: {formatTrialTimeRemaining(trialStatus.daysRemaining, trialStatus.hoursRemaining)}</div>
                <div className="text-xs text-muted-foreground">
                  {trialStatus.maxDailyUsage - trialStatus.dailyUsageCount} queries left today
                </div>
              </div>
            </div>
          )}
          <Badge variant="secondary" className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Online</span>
          </Badge>
        </div>
      </div>

      {/* Trial Usage Progress */}
      {trialStatus.isActive && (
        <motion.div 
          className="bg-card border rounded-lg p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Daily Usage</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {trialStatus.dailyUsageCount}/{trialStatus.maxDailyUsage}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setUpgradeModalTrigger('feature_access')
                  setShowUpgradeModal(true)
                }}
                className="flex items-center space-x-1"
              >
                <Crown className="h-3 w-3" />
                <span>Upgrade</span>
              </Button>
            </div>
          </div>
          <Progress 
            value={(trialStatus.dailyUsageCount / trialStatus.maxDailyUsage) * 100} 
            className="h-2"
          />
        </motion.div>
      )}

      {/* Quick Prompts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {quickPrompts.map((prompt, index) => (
          <motion.button
            key={prompt.text}
            onClick={() => handleSendMessage(prompt.text)}
            className="p-3 bg-card rounded-lg border hover:bg-muted transition-colors text-left group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            disabled={isLoading}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <prompt.icon className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary">{prompt.category}</span>
              </div>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {prompt.text}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 p-0">
          <div className="h-full overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-3 max-w-4xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Avatar className="h-8 w-8">
                      {message.role === 'user' ? (
                        <>
                          <AvatarImage src={session?.user?.image || ''} />
                          <AvatarFallback>
                            {session?.user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback className="bg-primary/10">
                          <Brain className="h-4 w-4 text-primary" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className={`space-y-2 ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className={`p-3 rounded-lg max-w-2xl ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      
                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Suggestions:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendMessage(suggestion)}
                                disabled={isLoading}
                                className="text-xs"
                              >
                                <Lightbulb className="h-3 w-3 mr-1" />
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10">
                      <Brain className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Input Area */}
      <div className="space-y-2">
        {trialStatus.isActive && trialStatus.dailyUsageCount >= trialStatus.maxDailyUsage && (
          <motion.div 
            className="bg-muted border border-accent/20 rounded-lg p-3 flex items-center justify-between"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Daily limit reached. Upgrade for unlimited access.</span>
            </div>
            <Button 
              size="sm" 
              onClick={() => {
                setUpgradeModalTrigger('usage_limit')
                setShowUpgradeModal(true)
              }}
            >
              <Crown className="h-3 w-3 mr-1" />
              Upgrade Now
            </Button>
          </motion.div>
        )}
        
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                trialStatus.isActive && trialStatus.dailyUsageCount >= trialStatus.maxDailyUsage
                  ? "Upgrade to continue chatting..."
                  : "Ask me anything about social media growth..."
              }
              disabled={isLoading || (trialStatus.isActive && trialStatus.dailyUsageCount >= trialStatus.maxDailyUsage)}
              className="pr-12"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={toggleListening}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 ${
                isListening ? 'text-red-500' : 'text-muted-foreground'
              }`}
              disabled={trialStatus.isActive && trialStatus.dailyUsageCount >= trialStatus.maxDailyUsage}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          <Button 
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading || (trialStatus.isActive && trialStatus.dailyUsageCount >= trialStatus.maxDailyUsage)}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        user={user}
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        trigger={upgradeModalTrigger}
      />
    </div>
  )
}
