
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, MessageCircle, Video, Mail } from 'lucide-react'

export default function HelpPage() {
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
          <h1 className="text-4xl font-bold">Help Center</h1>
          <p className="text-xl text-muted-foreground">
            Get the support you need to succeed with SocialCoach AI
          </p>
        </div>

        {/* Help Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Knowledge Base</span>
              </CardTitle>
              <CardDescription>
                Browse our comprehensive guides and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Find step-by-step instructions, best practices, and answers to common questions.
              </p>
              <Button variant="outline" className="w-full">
                Browse Articles
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-primary" />
                <span>Video Tutorials</span>
              </CardTitle>
              <CardDescription>
                Watch detailed walkthroughs and demonstrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn through visual guides covering all platform features and strategies.
              </p>
              <Button variant="outline" className="w-full">
                Watch Videos
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span>Live Chat</span>
              </CardTitle>
              <CardDescription>
                Get instant help from our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Available 24/7 for Pro and Enterprise users, business hours for Free users.
              </p>
              <Button variant="outline" className="w-full">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Email Support</span>
              </CardTitle>
              <CardDescription>
                Send us detailed questions or feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Perfect for complex issues or when you need detailed explanations.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">How does the AI coaching work?</h4>
              <p className="text-sm text-muted-foreground">
                Our AI coach analyzes your goals, current performance, and target platforms to provide personalized strategies and recommendations. It learns from your progress and adapts suggestions over time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Can I switch between subscription plans?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades or at the next billing cycle for downgrades.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">What platforms do you support?</h4>
              <p className="text-sm text-muted-foreground">
                We support 10+ major platforms including YouTube, Instagram, TikTok, LinkedIn, Twitter, Facebook, Pinterest, and more. Each platform has specialized strategies and tools.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Is there a mobile app?</h4>
              <p className="text-sm text-muted-foreground">
                Our web application is fully mobile-responsive and works great on all devices. We're also developing native mobile apps coming soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
