
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: January 15, 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>By accessing and using SocialCoach AI, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use License</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>Permission is granted to temporarily access SocialCoach AI for personal, non-commercial transitory viewing only. This includes the license to:</p>
              <ul>
                <li>Access our AI coaching services</li>
                <li>Use our templates and content creation tools</li>
                <li>Participate in our community features</li>
                <li>Access analytics and progress tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>You may not use our service:</p>
              <ul>
                <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To transmit or procure the sending of any advertising or promotional material</li>
                <li>To impersonate or attempt to impersonate the company, an employee, another user, or any other person or entity</li>
                <li>To reverse engineer, decompile, or attempt to extract the source code of our AI models</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>Our subscription services are provided on the following terms:</p>
              <ul>
                <li>Subscriptions are billed monthly or annually in advance</li>
                <li>You may cancel your subscription at any time</li>
                <li>Refunds are provided within 30 days of initial purchase</li>
                <li>Access to premium features ends immediately upon cancellation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>The information on this platform is provided on an 'as is' basis. To the fullest extent permitted by law, this company:</p>
              <ul>
                <li>Excludes all representations and warranties relating to this website and its contents</li>
                <li>Does not guarantee specific results from using our coaching services</li>
                <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Questions about the Terms of Service should be sent to us at:</p>
              <p className="text-primary">legal@socialcoach.ai</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
