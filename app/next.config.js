
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingRoot: undefined,
  },
  images: {
    domains: ['localhost', 'strategixapp.com'],
    unoptimized: false,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  // Optimize for production deployment
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Handle legacy peer deps in production
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
