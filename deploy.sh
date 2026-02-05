#!/bin/bash

# Vercel Deployment Script for WeekendDarshan

echo "🚀 Starting WeekendDarshan Deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Build the application
echo "🔨 Building Next.js Application..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment Complete!"
echo "📝 Don't forget to set up environment variables in Vercel dashboard:"
echo "   - DATABASE_URL"
echo "   - NEXTAUTH_URL"
echo "   - NEXTAUTH_SECRET"
echo "   - JWT_SECRET"
echo "   - RAZORPAY_KEY_ID"
echo "   - RAZORPAY_KEY_SECRET"