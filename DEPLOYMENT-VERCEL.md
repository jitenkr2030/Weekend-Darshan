# Vercel Deployment Guide for WeekendDarshan

## Project Information
- **Project Name**: weekend-tour
- **Project ID**: prj_ESFVQBdz2ZXOgeuAj2wfJJ7ZMSAl
- **Framework**: Next.js 16 with App Router
- **Build Tool**: Bun

## Environment Variables Setup

### Required Environment Variables (Set in Vercel Dashboard)

1. **DATABASE_URL**
   ```
   file:./dev.db
   ```

2. **NEXTAUTH_URL**
   ```
   https://weekend-tour.vercel.app
   ```

3. **NEXTAUTH_SECRET**
   ```
   Generate a secure random string: openssl rand -base64 32
   ```

4. **JWT_SECRET**
   ```
   Generate a secure random string: openssl rand -base64 32
   ```

### Optional Environment Variables

5. **RAZORPAY_KEY_ID** (for payments)
6. **RAZORPAY_KEY_SECRET** (for payments)

## Deployment Steps

### Method 1: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link to existing project
vercel link

# Deploy to production
vercel --prod
```

### Method 2: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select project: `weekend-tour`
3. Go to Settings → Environment Variables
4. Add all required environment variables
5. Go to Deployments → Redeploy

## Database Setup

The application uses SQLite with Prisma ORM. The database will be automatically created on first deployment.

### Seed Database (Optional)

After deployment, you can seed the database with sample data:

```bash
# Call the seed endpoint
curl -X POST https://weekend-tour.vercel.app/api/seed \
     -H "Content-Type: application/json"
```

## Build Configuration

The `vercel.json` file is configured with:

- **Build Command**: `prisma generate && bun run build`
- **Install Command**: `bun install && prisma generate`
- **Output Directory**: `.next`
- **Framework**: Next.js
- **Region**: Hong Kong (hnd1)
- **Function Timeout**: 30s for API routes

## Performance Optimizations

- **Edge Runtime**: API routes optimized for edge
- **Caching Headers**: Proper cache control for API routes
- **Image Optimization**: Next.js Image component used
- **Bundle Optimization**: Tree-shaking and code splitting

## Monitoring and Analytics

After deployment:

1. **Vercel Analytics**: Built-in performance monitoring
2. **Speed Insights**: Core Web Vitals tracking
3. **Logs**: Real-time error tracking
4. **Function Logs**: API route performance

## Troubleshooting

### Common Issues and Solutions

1. **Build Error: DATABASE_URL not found**
   - Ensure DATABASE_URL is set in Vercel environment variables

2. **Prisma Client Error**
   - The build command includes `prisma generate`
   - Ensure Prisma schema is valid

3. **Authentication Issues**
   - Check NEXTAUTH_URL matches your deployment URL
   - Ensure NEXTAUTH_SECRET is set

4. **API Timeouts**
   - Function timeout is set to 30s
   - Optimize database queries for better performance

### Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Database schema is up to date
- [ ] Build succeeds locally
- [ ] API routes work correctly
- [ ] Authentication flow works
- [ ] Images and assets load properly
- [ ] Responsive design works on mobile
- [ ] Performance scores are acceptable

## Post-Deployment

1. **Test All Features**
   - Homepage loads correctly
   - Tour browsing works
   - Login/Signup functions
   - Booking flow works
   - Admin panel accessible

2. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor Core Web Vitals
   - Track error rates

3. **Set Up Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records

## Support

For deployment issues:
- Check Vercel deployment logs
- Review environment variables
- Verify build configuration
- Contact Vercel support if needed