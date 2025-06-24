
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Sparkles, Users, Target, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back to Home */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <span className="text-3xl font-bold gradient-text">SocialCoach AI</span>
          </div>
          <h1 className="text-4xl font-bold">About SocialCoach AI</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering creators and entrepreneurs to build profitable social media empires with AI-powered coaching and proven strategies.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              We believe every creator deserves access to world-class social media coaching. SocialCoach AI democratizes expert knowledge, 
              providing personalized strategies, real-time insights, and proven frameworks to help you build an authentic, profitable online presence 
              across all major platforms.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>AI-Powered Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our advanced AI coach learns from your unique style, audience, and goals to provide personalized recommendations 
                that evolve with your growth journey.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Proven Strategies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Access battle-tested frameworks and templates used by successful creators who've built million-follower audiences 
                and six-figure businesses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Platform Expertise</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Master all major platforms with specialized strategies for YouTube, Instagram, TikTok, LinkedIn, Twitter, 
                and emerging social networks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Continuous Innovation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Stay ahead of algorithm changes and platform updates with real-time strategy adjustments and 
                cutting-edge growth techniques.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/auth/signup">
            <Button size="lg">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
