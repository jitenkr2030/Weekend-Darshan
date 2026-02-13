#!/bin/bash

# Vercel Deployment Script for WeekendDarshan
# Project: weekend-tour (prj_ESFVQBdz2ZXOgeuAj2wfJJ7ZMSAl)

echo "🚀 Starting Vercel Deployment for WeekendDarshan"
echo "Project: weekend-tour"
echo "Project ID: prj_ESFVQBdz2ZXOgeuAj2wfJJ7ZMSAl"
echo ""

# Check if project is ready for deployment
echo "✅ Checking project readiness..."

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json not found"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    exit 1
fi

# Check if next.config.ts exists
if [ ! -f "next.config.ts" ]; then
    echo "❌ Error: next.config.ts not found"
    exit 1
fi

echo "✅ All required files found"

# Build the project locally to test
echo "🔨 Building project locally..."
bun run build

if [ $? -eq 0 ]; then
    echo "✅ Local build successful"
else
    echo "❌ Local build failed"
    exit 1
fi

echo ""
echo "📋 Deployment Instructions:"
echo ""
echo "Since we cannot install Vercel CLI in this environment, please follow these steps:"
echo ""
echo "1️⃣ Install Vercel CLI on your local machine:"
echo "   npm i -g vercel"
echo ""
echo "2️⃣ Login to Vercel:"
echo "   vercel login"
echo ""
echo "3️⃣ Link to your existing project:"
echo "   cd /path/to/your/project"
echo "   vercel link"
echo "   (Select 'weekend-tour' when prompted)"
echo ""
echo "4️⃣ Set up environment variables in Vercel Dashboard:"
echo "   Go to: https://vercel.com/...iten-kumars-projects/weekend-tour/settings/environment-variables"
echo ""
echo "   Required variables:"
echo "   - DATABASE_URL: file:./db/custom.db"
echo "   - NEXTAUTH_URL: https://weekend-tour.vercel.app"
echo "   - NEXTAUTH_SECRET: $(openssl rand -base64 32)"
echo "   - JWT_SECRET: $(openssl rand -base64 32)"
echo ""
echo "5️⃣ Deploy to production:"
echo "   vercel --prod"
echo ""
echo "🎯 Your deployment URL will be:"
echo "   https://weekend-tour.vercel.app"
echo ""
echo "📊 Project Dashboard:"
echo "   https://vercel.com/...iten-kumars-projects/weekend-tour"
echo ""
echo "✨ Alternative: GitHub Integration"
echo "   1. Connect your repository to Vercel"
echo "   2. Vercel will auto-deploy on push to main branch"
echo "   3. Build settings are pre-configured in vercel.json"
echo ""
echo "🔧 After Deployment:"
echo "   - Test all features at https://weekend-tour.vercel.app"
echo "   - Check Vercel Analytics for performance"
echo "   - Monitor Function Logs for any issues"
echo "   - Seed database if needed: POST /api/seed"
echo ""

echo "🎉 Deployment configuration is ready!"
echo "Your project is fully configured for Vercel deployment."