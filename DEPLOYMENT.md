# 🚀 Vercel Deployment Guide for WeekendDarshan

This guide will help you deploy the WeekendDarshan platform to Vercel with proper database configuration.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Environment Variables**: Have your secrets ready

## 🔧 Step 1: Set Up Environment Variables in Vercel

Go to your Vercel dashboard → Project Settings → Environment Variables and add:

### Required Variables
```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secure-secret-key-here"
JWT_SECRET="your-jwt-secret-here"
```

### Optional Variables (for full functionality)
```bash
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="your-twilio-phone-number"
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@weekenddarshan.com"
```

## 🗄️ Step 2: Database Setup for Production

### Option A: Use Vercel Postgres (Recommended)
1. In Vercel dashboard, go to Storage → Create Database
2. Select Postgres
3. Update your `DATABASE_URL` with the provided connection string
4. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Option B: Use SQLite with Vercel KV (Current Setup)
1. Keep the current SQLite setup
2. Use `DATABASE_URL="file:./dev.db"`
3. Note: SQLite will be reset on each deployment

## 🏗️ Step 3: Deploy to Vercel

### Option A: Through Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option B: Through GitHub Integration
1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on push to main branch
3. Configure build settings:
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

## 🔍 Step 4: Verify Deployment

1. **Check Build Logs**: Ensure no errors during build
2. **Test API Endpoints**: Visit `/api/trips` to test database connection
3. **Test Frontend**: Verify the application loads properly
4. **Test Booking Flow**: Complete a test booking

## 🛠️ Step 5: Database Seeding (Important!)

Since SQLite is used, you need to seed the database after deployment:

### Option A: Automatic Seeding
Create a new API endpoint `/api/seed`:
```typescript
// src/app/api/seed/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { seedData } from '@/seed'

export async function POST(request: NextRequest) {
  try {
    await seedData()
    return NextResponse.json({ success: true, message: 'Database seeded successfully' })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
```

### Option B: Manual Seeding
1. Access your Vercel project logs
2. Find the function URL and call the seed endpoint
3. Or use Vercel CLI to run commands

## 🐛 Common Issues & Solutions

### Issue 1: DATABASE_URL not found
**Solution**: Ensure `DATABASE_URL` is set in Vercel environment variables

### Issue 2: Prisma Client Initialization Error
**Solution**: Add `postinstall` script to package.json:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Issue 3: Database connection timeout
**Solution**: For SQLite, ensure the database file is created:
```typescript
// In your API routes, add:
import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'

const prisma = new PrismaClient()

// Ensure database exists
if (process.env.NODE_ENV === 'production') {
  exec('touch ./dev.db')
}
```

### Issue 4: Build fails on Prisma generate
**Solution**: Update vercel.json:
```json
{
  "build": {
    "env": {
      "PRISMA_GENERATE_DATAPROXY": "true"
    }
  }
}
```

## 📊 Monitoring & Maintenance

### Check Application Health
- Visit `/api/trips` - Should return trip data
- Visit `/api/health` - Create a health check endpoint
- Monitor Vercel function logs

### Database Backups
- For SQLite: Download database file regularly
- For Postgres: Use Vercel's automatic backups

## 🚀 Production Optimizations

### 1. Enable Caching
```typescript
// In API routes, add caching headers
export async function GET() {
  const data = await db.trip.findMany()
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
    }
  })
}
```

### 2. Optimize Images
```typescript
import Image from 'next/image'

// Use Next.js Image component for all images
<Image src="/logo.svg" alt="WeekendDarshan" width={120} height={40} />
```

### 3. Enable Analytics
Add Google Analytics or Vercel Analytics to track performance

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check this guide for common solutions

## 🎉 Success!

Once deployed, your WeekendDarshan platform will be available at:
- **Main Site**: `https://your-domain.vercel.app`
- **Admin Panel**: `https://your-domain.vercel.app/admin/login`

Your platform is now live and ready to accept bookings! 🚌✨