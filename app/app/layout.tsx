
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from '@/components/session-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SocialCoach AI - Premium Social Media Growth Platform',
  description: 'Transform your social media presence with AI-powered coaching across all platforms. Get personalized strategies, content creation tools, and monetization guidance.',
  keywords: 'social media coach, AI coaching, content creation, social media growth, monetization, YouTube, TikTok, Instagram',
  authors: [{ name: 'SocialCoach AI' }],
  openGraph: {
    title: 'SocialCoach AI - Premium Social Media Growth Platform',
    description: 'Transform your social media presence with AI-powered coaching across all platforms.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SocialCoach AI - Premium Social Media Growth Platform',
    description: 'Transform your social media presence with AI-powered coaching across all platforms.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
