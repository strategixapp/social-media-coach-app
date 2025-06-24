
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@socialcoach.ai' },
    update: {},
    create: {
      email: 'demo@socialcoach.ai',
      name: 'Demo User',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeMe2AOZyOCxZieFa', // demo123
      subscriptionTier: 'PRO',
      subscriptionStatus: 'ACTIVE',
      onboardingCompleted: true,
      assessmentCompleted: true,
      experienceLevel: 'INTERMEDIATE',
      businessType: 'PERSONAL_BRAND',
      primaryGoals: ['Build personal brand', 'Increase followers', 'Monetize content'],
      targetPlatforms: ['YouTube', 'Instagram', 'LinkedIn', 'TikTok'],
      currentFollowers: {
        youtube: 12000,
        instagram: 17800,
        tiktok: 12000,
        linkedin: 6400,
        twitter: 14000
      },
      monthlyBudget: 500.0,
      timeAvailable: 20,
      coachingStyle: 'Strategic and Data-Driven',
      preferredTone: 'Professional yet approachable',
      brandVoice: 'Inspiring and educational',
      contentPillars: ['Business Tips', 'Productivity', 'Personal Development', 'Success Stories']
    }
  })

  console.log('Demo user created:', demoUser.email)

  // Create platform strategies
  const platforms = [
    {
      platform: 'YouTube',
      title: 'YouTube Growth Strategy',
      description: 'Master long-form content, SEO optimization, and monetization',
      content: 'Complete guide to YouTube success including channel optimization, content strategy, SEO, and monetization.',
      tactics: [
        'Optimize channel banner and description',
        'Create compelling thumbnails',
        'Use keyword-rich titles',
        'Post consistently on schedule',
        'Engage with comments quickly',
        'Create playlists for binge-watching',
        'Use end screens and cards effectively',
        'Collaborate with other creators'
      ],
      metrics: [
        'Subscriber growth rate',
        'Average view duration',
        'Click-through rate',
        'Engagement rate',
        'Revenue per 1000 views'
      ],
      tools: [
        'YouTube Studio',
        'TubeBuddy',
        'VidIQ',
        'Canva for thumbnails',
        'Google Trends'
      ]
    },
    {
      platform: 'Instagram',
      title: 'Instagram Engagement Strategy',
      description: 'Build aesthetic feeds, viral Reels, and engaged communities',
      content: 'Comprehensive Instagram growth strategy covering feed aesthetics, Reels, Stories, and monetization.',
      tactics: [
        'Maintain consistent visual brand',
        'Post high-quality images and videos',
        'Use relevant hashtags strategically',
        'Create engaging Reels with trending audio',
        'Post Stories daily with interactive elements',
        'Collaborate with other creators',
        'Use Instagram Shopping features',
        'Respond to comments and DMs promptly'
      ],
      metrics: [
        'Follower growth rate',
        'Engagement rate',
        'Story completion rate',
        'Reel views and shares',
        'Profile visits'
      ],
      tools: [
        'Instagram Creator Studio',
        'Later',
        'Canva',
        'VSCO',
        'Hashtag research tools'
      ]
    },
    {
      platform: 'TikTok',
      title: 'TikTok Viral Strategy',
      description: 'Create viral content and master the TikTok algorithm',
      content: 'Master TikTok\'s algorithm and create content that goes viral consistently.',
      tactics: [
        'Hook viewers in first 3 seconds',
        'Use trending sounds and hashtags',
        'Post at optimal times',
        'Create series content',
        'Jump on trends quickly',
        'Use captions and text overlays',
        'Engage with trends in your niche',
        'Cross-promote on other platforms'
      ],
      metrics: [
        'View count',
        'Completion rate',
        'Share rate',
        'Comment rate',
        'Follower growth'
      ],
      tools: [
        'TikTok Creator Center',
        'CapCut',
        'Trending hashtag tools',
        'TikTok Analytics'
      ]
    }
  ]

  for (const platformData of platforms) {
    await prisma.platformStrategy.upsert({
      where: { platform: platformData.platform },
      update: platformData,
      create: platformData
    })
  }

  console.log('Platform strategies created')

  // Create sample progress metrics
  const progressMetrics = [
    { platform: 'YouTube', metricType: 'subscribers', value: 12000, previousValue: 11500 },
    { platform: 'YouTube', metricType: 'views', value: 2100000, previousValue: 1950000 },
    { platform: 'Instagram', metricType: 'followers', value: 17800, previousValue: 16900 },
    { platform: 'Instagram', metricType: 'engagement_rate', value: 8.4, previousValue: 7.2 },
    { platform: 'TikTok', metricType: 'followers', value: 12000, previousValue: 9800 },
    { platform: 'TikTok', metricType: 'views', value: 1800000, previousValue: 1200000 },
    { platform: 'LinkedIn', metricType: 'followers', value: 6400, previousValue: 5800 },
    { platform: 'Twitter', metricType: 'followers', value: 14000, previousValue: 13200 }
  ]

  for (const metric of progressMetrics) {
    const changePercent = ((metric.value - (metric.previousValue || 0)) / (metric.previousValue || 1)) * 100
    await prisma.progressMetric.create({
      data: {
        userId: demoUser.id,
        platform: metric.platform,
        metricType: metric.metricType,
        value: metric.value,
        previousValue: metric.previousValue,
        changePercent: changePercent
      }
    })
  }

  console.log('Progress metrics created')

  // Create sample goals
  const goals = [
    {
      goalType: 'Follower Growth',
      target: 25000,
      current: 17800,
      platform: 'Instagram',
      description: 'Reach 25K Instagram followers by end of Q1',
      status: 'IN_PROGRESS' as const,
      deadline: new Date('2024-03-31')
    },
    {
      goalType: 'Subscriber Growth',
      target: 20000,
      current: 12000,
      platform: 'YouTube',
      description: 'Grow YouTube channel to 20K subscribers',
      status: 'IN_PROGRESS' as const,
      deadline: new Date('2024-06-30')
    },
    {
      goalType: 'Revenue',
      target: 10000,
      current: 5440,
      platform: null,
      description: 'Achieve $10K monthly revenue across all platforms',
      status: 'IN_PROGRESS' as const,
      deadline: new Date('2024-12-31')
    }
  ]

  for (const goal of goals) {
    await prisma.goalProgress.create({
      data: {
        userId: demoUser.id,
        ...goal
      }
    })
  }

  console.log('Goals created')

  // Create content templates
  const templates = [
    {
      title: 'How-To Video Script Template',
      description: 'Perfect structure for educational YouTube videos',
      platform: 'YouTube',
      category: 'Education',
      content: `# How-To Video Script Template

## Hook (0-15 seconds)
- Start with a compelling question or statement
- Preview the main benefit/outcome
- "By the end of this video, you'll know how to..."

## Introduction (15-30 seconds)
- Brief personal introduction
- Why you're qualified to teach this
- What viewers will learn

## Main Content (30 seconds - 8 minutes)
### Step 1: [Action]
- Clear explanation
- Visual demonstration
- Pro tip or warning

### Step 2: [Action]
- Clear explanation
- Visual demonstration
- Pro tip or warning

### Step 3: [Action]
- Clear explanation
- Visual demonstration
- Pro tip or warning

## Conclusion (Last 30 seconds)
- Recap main points
- Call-to-action (subscribe, like, comment)
- Next video preview
- End screen with suggested videos

## Variables:
- {topic}: Main topic of the video
- {steps}: Number of steps in the process
- {benefit}: Main benefit for the viewer
- {cta}: Specific call-to-action`,
      isPublic: true,
      usageCount: 247
    },
    {
      title: 'Instagram Reel Hook Template',
      description: 'Attention-grabbing openings for viral Reels',
      platform: 'Instagram',
      category: 'Hooks',
      content: `# Instagram Reel Hook Templates

## Pattern 1: Question Hook
"Did you know [surprising fact]?"
"What if I told you [unexpected claim]?"
"Why do [common situation]?"

## Pattern 2: Contradiction Hook
"Everyone says [common belief], but here's the truth..."
"Stop doing [common practice]. Here's what to do instead..."

## Pattern 3: Curiosity Hook
"The secret that [target audience] don't want you to know..."
"I tried [trending thing] for 30 days. Here's what happened..."

## Pattern 4: Direct Address
"If you're [target audience] struggling with [problem]..."
"[Target audience], stop what you're doing and watch this..."

## Pattern 5: Transformation Hook
"From [before state] to [after state] in [timeframe]"
"How I went from [starting point] to [end point]"

## Variables:
- {target_audience}: Who you're speaking to
- {problem}: Main problem you're solving
- {solution}: Your solution or method
- {timeframe}: How long the transformation took`,
      isPublic: true,
      usageCount: 389
    }
  ]

  for (const template of templates) {
    await prisma.contentTemplate.create({
      data: {
        userId: demoUser.id,
        ...template
      }
    })
  }

  console.log('Content templates created')

  // Create sample assessment answers
  const assessmentQuestions = [
    { questionId: 'experience_level', answer: 'Intermediate', score: 3, category: 'Experience' },
    { questionId: 'primary_goal', answer: 'Build personal brand', score: 5, category: 'Goals' },
    { questionId: 'target_platforms', answer: 'YouTube, Instagram, LinkedIn', score: 4, category: 'Platforms' },
    { questionId: 'content_frequency', answer: '3-5 times per week', score: 4, category: 'Content' },
    { questionId: 'monetization_interest', answer: 'Very interested', score: 5, category: 'Monetization' },
    { questionId: 'time_availability', answer: '2-3 hours per day', score: 4, category: 'Time' },
    { questionId: 'budget_range', answer: '$200-500 per month', score: 3, category: 'Budget' },
    { questionId: 'biggest_challenge', answer: 'Creating consistent content', score: 3, category: 'Challenges' }
  ]

  for (const answer of assessmentQuestions) {
    await prisma.assessmentAnswer.create({
      data: {
        userId: demoUser.id,
        ...answer
      }
    })
  }

  console.log('Assessment answers created')

  // Create trending topics
  const trendingTopics = [
    {
      platform: 'YouTube',
      trendType: 'topic',
      content: 'AI Productivity Tools',
      score: 95.5,
      category: 'Technology',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    },
    {
      platform: 'Instagram',
      trendType: 'hashtag',
      content: '#ProductivityHacks',
      score: 88.2,
      category: 'Lifestyle',
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
    },
    {
      platform: 'TikTok',
      trendType: 'audio',
      content: 'Motivational Background Music',
      score: 92.1,
      category: 'Audio',
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    }
  ]

  for (const trend of trendingTopics) {
    await prisma.trendAnalysis.create({
      data: trend
    })
  }

  console.log('Trending topics created')

  console.log('Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
