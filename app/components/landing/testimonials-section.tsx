
'use client'

import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Lifestyle Creator',
    platform: 'Instagram & TikTok',
    followers: '2.3M',
    growth: '+400% in 6 months',
    content: "SocialCoach AI completely transformed my content strategy. The personalized coaching helped me find my unique voice and the monetization guidance turned my passion into a $50K/month business.",
    avatar: "https://i.pinimg.com/originals/8d/27/e4/8d27e40a2d206ded926a3711bc904241.jpg"
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Business Coach',
    platform: 'LinkedIn & YouTube',
    followers: '850K',
    growth: '+250% engagement',
    content: "The platform-specific strategies are incredible. My LinkedIn engagement skyrocketed and YouTube channel finally took off. The AI coach feels like having a personal mentor available 24/7.",
    avatar: "https://i.pinimg.com/originals/e3/7e/0e/e37e0e25686c2139b281a57a5b4906f2.jpg"
  },
  {
    name: 'Emma Thompson',
    role: 'Fashion Brand Owner',
    platform: 'Instagram & Pinterest',
    followers: '1.8M',
    growth: '+180% sales',
    content: "As a small business owner, I struggled with social media marketing. SocialCoach AI's templates and strategies helped me create content that actually converts. My sales have tripled!",
    avatar: "https://i.pinimg.com/736x/d6/f9/91/d6f991fa9de5196eeaaa492470a6c8b2.jpg"
  },
  {
    name: 'David Park',
    role: 'Tech Content Creator',
    platform: 'YouTube & Twitter',
    followers: '750K',
    growth: '+320% subscribers',
    content: "The content planning and trend analysis features are game-changing. I went from struggling to hit 10K views to consistently getting 100K+ views per video. Best investment I've made.",
    avatar: "https://i.pinimg.com/originals/07/44/76/074476f844838fb2487a9d7b4d08a904.jpg"
  },
  {
    name: 'Lisa Johnson',
    role: 'Fitness Influencer',
    platform: 'TikTok & Instagram',
    followers: '3.2M',
    growth: '+500% in 8 months',
    content: "The AI coaching adapts to my style perfectly. It helped me find viral content angles I never would have thought of. My follower count exploded and brand deals started pouring in.",
    avatar: "https://i.pinimg.com/originals/8d/28/a8/8d28a85f433283c2ffbd8a05bf27ac42.jpg"
  },
  {
    name: 'Alex Kim',
    role: 'Digital Marketing Agency',
    platform: 'Multi-platform',
    followers: '2M+ managed',
    growth: '+300% client results',
    content: "Managing multiple client accounts was overwhelming until we found SocialCoach AI. The team features and white-label options have streamlined our entire workflow.",
    avatar: "https://i.pinimg.com/originals/c1/e7/ae/c1e7ae7e59640015fedeb160b86cdf4f.jpg"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Trusted by Top
            <span className="gradient-text block">Creators Worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful creators who've transformed their social media presence 
            and built profitable businesses with SocialCoach AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 bg-card rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="h-8 w-8 text-muted-foreground/20 absolute -top-2 -left-2" />
                  <p className="text-sm leading-relaxed pl-6">{testimonial.content}</p>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {testimonial.platform}
                      </span>
                      <span className="text-xs text-accent font-medium">
                        {testimonial.growth}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">$2M+</div>
              <div className="text-sm text-muted-foreground">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
