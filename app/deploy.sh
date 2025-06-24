
#!/bin/bash

# Social Media Coach App - Deployment Script
# This script helps prepare your app for deployment

echo "🚀 Preparing Social Media Coach App for Deployment..."
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the app directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi

echo "🔨 Building production version..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

echo "🔍 Generating Prisma client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Error: Prisma generation failed"
    exit 1
fi

echo "✅ App is ready for deployment!"
echo ""
echo "📋 Next Steps:"
echo "1. Follow the instructions in README_DEPLOY.md"
echo "2. Set up your database on Railway"
echo "3. Deploy to Vercel"
echo "4. Configure your domain strategixapp.com"
echo ""
echo "🎯 Your app will be live at: https://strategixapp.com"
echo "💰 Pricing: 7-day free trial, then $19.99/month"
