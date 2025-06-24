
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getTrialStatus, shouldResetDailyUsage } from '@/lib/trial-utils'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { message, conversationHistory, userTier, isTrialUser } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get user profile for personalization
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        assessmentAnswers: true,
        progressMetrics: true,
        goalProgress: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Handle trial usage tracking
    const trialStatus = getTrialStatus(user)
    
    if (trialStatus.isActive) {
      // Check if trial has expired
      if (trialStatus.hasExpired) {
        return NextResponse.json(
          { error: 'Trial expired. Please upgrade to continue.' },
          { status: 403 }
        )
      }

      // Reset daily usage if needed
      if (shouldResetDailyUsage(user)) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            dailyUsageCount: 0,
            dailyUsageResetDate: new Date()
          }
        })
        // Update local user object
        user.dailyUsageCount = 0
      }

      // Check daily usage limit
      if (user.dailyUsageCount >= 15) {
        return NextResponse.json(
          { error: 'Daily usage limit reached. Upgrade to Pro for unlimited access.' },
          { status: 429 }
        )
      }

      // Increment usage count
      await prisma.user.update({
        where: { id: user.id },
        data: {
          dailyUsageCount: user.dailyUsageCount + 1,
          trialUsageCount: (user.trialUsageCount || 0) + 1
        }
      })
    }

    // Build context for the AI coach
    const userContext = {
      experienceLevel: user?.experienceLevel || 'BEGINNER',
      targetPlatforms: user?.targetPlatforms || [],
      businessType: user?.businessType || 'PERSONAL_BRAND',
      primaryGoals: user?.primaryGoals || [],
      currentFollowers: user?.currentFollowers || {},
      recentProgress: user?.progressMetrics?.slice(-5) || [],
      activeGoals: user?.goalProgress?.filter(g => g.status === 'IN_PROGRESS') || []
    }

    // Prepare conversation history for context
    const contextMessages = conversationHistory?.map((msg: any) => ({
      role: msg.role,
      content: msg.content
    })) || []

    // Create AI coaching prompt
    const systemPrompt = `You are an expert AI Social Media Coach with deep knowledge across all major platforms (YouTube, TikTok, Instagram, LinkedIn, Twitter, Facebook, Pinterest, Snapchat, etc.). Your role is to provide personalized, actionable advice to help users grow their social media presence and monetize their content.

USER CONTEXT:
- Experience Level: ${userContext.experienceLevel}
- Target Platforms: ${userContext.targetPlatforms.join(', ') || 'Not specified'}
- Business Type: ${userContext.businessType}
- Primary Goals: ${userContext.primaryGoals.join(', ') || 'Not specified'}
- Current Followers: ${JSON.stringify(userContext.currentFollowers)}

COACHING GUIDELINES:
1. Be encouraging, supportive, and motivational
2. Provide specific, actionable advice tailored to their platforms and goals
3. Reference current trends and best practices
4. Suggest concrete next steps they can implement immediately
5. Ask clarifying questions when needed to provide better guidance
6. Offer multiple strategies and let them choose what fits best
7. Include relevant metrics and growth targets when applicable

RESPONSE FORMAT:
- Keep responses conversational and engaging
- Use emojis sparingly but effectively
- Break down complex strategies into digestible steps
- Always end with a clear call-to-action or next step

Remember: You're not just providing information, you're coaching them toward success. Be their biggest supporter and strategic advisor.`

    // Call LLM API
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...contextMessages,
          { role: 'user', content: message }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get AI response')
    }

    const aiResponse = await response.json()
    const assistantMessage = aiResponse.choices[0]?.message?.content

    if (!assistantMessage) {
      throw new Error('No response from AI')
    }

    // Generate relevant suggestions based on the conversation
    const suggestions = generateSuggestions(message, userContext)

    // Save conversation to database
    try {
      const chatSession = await prisma.chatSession.create({
        data: {
          userId: session.user.id,
          title: message.substring(0, 50) + '...',
          messages: {
            create: [
              {
                role: 'USER',
                content: message
              },
              {
                role: 'ASSISTANT',
                content: assistantMessage
              }
            ]
          }
        }
      })
    } catch (dbError) {
      console.error('Failed to save conversation:', dbError)
      // Continue without saving - don't block the response
    }

    return NextResponse.json({
      response: assistantMessage,
      suggestions
    })

  } catch (error) {
    console.error('Coach chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    )
  }
}

function generateSuggestions(message: string, userContext: any): string[] {
  const messageLower = message.toLowerCase()
  const suggestions: string[] = []

  // Content-related suggestions
  if (messageLower.includes('content') || messageLower.includes('post')) {
    suggestions.push('Content calendar for next week')
    suggestions.push('Trending topics in my niche')
    suggestions.push('Content repurposing strategies')
  }

  // Growth-related suggestions
  if (messageLower.includes('grow') || messageLower.includes('follower')) {
    suggestions.push('Platform-specific growth tactics')
    suggestions.push('Engagement optimization tips')
    suggestions.push('Hashtag strategy review')
  }

  // Monetization suggestions
  if (messageLower.includes('money') || messageLower.includes('monetiz')) {
    suggestions.push('Revenue stream analysis')
    suggestions.push('Brand partnership opportunities')
    suggestions.push('Product creation ideas')
  }

  // Analytics suggestions
  if (messageLower.includes('analytic') || messageLower.includes('metric')) {
    suggestions.push('Key metrics to track')
    suggestions.push('Performance improvement plan')
    suggestions.push('Competitor analysis')
  }

  // Default suggestions if none match
  if (suggestions.length === 0) {
    suggestions.push(
      'Weekly content strategy',
      'Platform optimization tips',
      'Audience engagement ideas',
      'Growth goal setting'
    )
  }

  return suggestions.slice(0, 4) // Limit to 4 suggestions
}
