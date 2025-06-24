
'use client'

import { Brain, BarChart3, Calendar, DollarSign, Users, Lightbulb, Target, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Coaching',
    description: 'Get personalized strategies and insights from our advanced AI coach that learns your unique style and goals.',
    color: 'text-primary'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track your growth across all platforms with detailed metrics, trend analysis, and performance insights.',
    color: 'text-accent'
  },
  {
    icon: Calendar,
    title: 'Content Planning',
    description: 'Never run out of ideas with our AI-generated content calendar and trending topic suggestions.',
    color: 'text-blue-500'
  },
  {
    icon: DollarSign,
    title: 'Monetization Guide',
    description: 'Discover and implement proven revenue streams tailored to your audience and platform focus.',
    color: 'text-green-500'
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'Learn strategies to build engaged communities and turn followers into loyal customers.',
    color: 'text-purple-500'
  },
  {
    icon: Lightbulb,
    title: 'Creative Templates',
    description: 'Access 500+ proven templates for posts, videos, stories, and campaigns across all platforms.',
    color: 'text-orange-500'
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set SMART goals and track your progress with automated milestone celebrations and adjustments.',
    color: 'text-red-500'
  },
  {
    icon: Rocket,
    title: 'Growth Acceleration',
    description: 'Implement proven strategies that have helped creators achieve 300%+ growth in 90 days.',
    color: 'text-indigo-500'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything You Need to
            <span className="gradient-text block">Dominate Social Media</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered content creation to advanced analytics and monetization strategies - 
            our platform provides all the tools successful creators use.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group p-6 bg-card rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <div className={`p-3 bg-muted rounded-lg w-fit group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
