
'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Star, Users, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Trust Badge */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
              <span>Trusted by 50K+ creators</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your
                <span className="gradient-text block">Social Media</span>
                Into Revenue
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Get personalized AI coaching across all platforms. Try our full platform free for 7 days, 
                then just $19.99/month. No credit card required to start!
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Platforms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">AI Coach</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Templates</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Start 7-Day Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto group">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                ✨ No credit card required • Full access • Cancel anytime
              </p>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Join 50,000+ creators</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Average 300% growth</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Hero Image/Demo */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://www.geckoboard.com/uploads/Social-media-overview-dashboard.png"
                alt="SocialCoach AI Dashboard"
                fill
                className="object-cover"
                priority
              />
              
              {/* Floating Cards */}
              <motion.div 
                className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm border rounded-lg p-3 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">AI Coaching Active</span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border rounded-lg p-3 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">+127% Growth</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
