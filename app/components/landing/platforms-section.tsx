
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const platforms = [
  {
    name: 'YouTube',
    description: 'Master long-form content, SEO optimization, and monetization strategies',
    color: 'bg-red-500',
    features: ['Channel optimization', 'Video SEO', 'Monetization', 'Analytics']
  },
  {
    name: 'TikTok',
    description: 'Create viral content with trending audio and hashtag strategies',
    color: 'bg-black',
    features: ['Viral tactics', 'Trend analysis', 'Algorithm mastery', 'Creator fund']
  },
  {
    name: 'Instagram',
    description: 'Build aesthetic feeds, engaging Reels, and convert followers to customers',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    features: ['Reels strategy', 'Story optimization', 'Shopping integration', 'Aesthetics']
  },
  {
    name: 'LinkedIn',
    description: 'Establish thought leadership and build professional networks',
    color: 'bg-blue-600',
    features: ['Professional branding', 'Networking', 'B2B strategies', 'Content marketing']
  },
  {
    name: 'Twitter/X',
    description: 'Master real-time engagement and build influential communities',
    color: 'bg-black',
    features: ['Thread mastery', 'Community building', 'Real-time engagement', 'Thought leadership']
  },
  {
    name: 'Facebook',
    description: 'Leverage groups, pages, and advertising for business growth',
    color: 'bg-blue-500',
    features: ['Group management', 'Page optimization', 'Ads strategy', 'Community building']
  },
  {
    name: 'Pinterest',
    description: 'Drive traffic and sales with optimized pins and boards',
    color: 'bg-red-600',
    features: ['Pin optimization', 'SEO strategy', 'Traffic generation', 'E-commerce integration']
  },
  {
    name: 'Snapchat',
    description: 'Engage younger audiences with creative AR and video content',
    color: 'bg-yellow-400',
    features: ['AR filters', 'Snap ads', 'Story creation', 'Spotlight optimization']
  }
]

export function PlatformsSection() {
  return (
    <section id="platforms" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Master Every Platform
            <span className="gradient-text block">With Expert Strategies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get platform-specific coaching and strategies tailored to each social media channel's 
            unique algorithm, audience, and monetization opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              className="group p-6 bg-card rounded-xl border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                {/* Platform Icon */}
                <div className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform`}>
                  {platform.name.charAt(0)}
                </div>
                
                {/* Platform Info */}
                <div>
                  <h3 className="font-bold text-lg mb-2">{platform.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{platform.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {platform.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Platforms Badge */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full">
            <span className="text-sm font-medium">+ More platforms added regularly</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
