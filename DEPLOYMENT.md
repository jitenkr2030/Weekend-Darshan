# WeekendDarshan - Deployment Guide

## Environment Variables Configuration

### For Vercel Deployment:

1. **Go to your Vercel Project Settings**
2. **Navigate to Environment Variables**
3. **Add the following variables:**

#### Required Variables:
```
DATABASE_URL=file:./db/custom.db
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secure-secret-key-here
```

#### Optional Variables (for production):
```
RAZORPAY_KEY_ID=your-razorpay-production-key
RAZORPAY_KEY_SECRET=your-razorpay-production-secret
```

### For Other Platforms (Railway, Render, etc.):

Use the same environment variables as above.

## Database Configuration

### Option 1: SQLite (Default - Good for Development/Small Scale)
```
DATABASE_URL=file:./db/custom.db
```

### Option 2: PostgreSQL (Recommended for Production)
```
DATABASE_URL=postgresql://username:password@host:port/database
```

## Deployment Steps

### 1. Push Latest Changes
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### 2. Configure Environment Variables
- Add all required environment variables to your deployment platform
- Make sure `DATABASE_URL` is set correctly

### 3. Deploy
- Connect your repository to the deployment platform
- Trigger a new deployment
- Monitor the build process

## Troubleshooting

### Error: "Environment Variable DATABASE_URL references Secret database_url, which does not exist"
**Solution:** 
- Go to your deployment platform's dashboard
- Add `DATABASE_URL` as an environment variable (not as a secret reference)
- Use the direct value: `file:./db/custom.db` or your PostgreSQL connection string

### Error: "Prisma schema not found"
**Solution:**
- Ensure `prisma generate` runs during build
- The `vercel-build` script in package.json handles this

### Error: "Database connection failed"
**Solution:**
- Verify DATABASE_URL is correctly set
- For production, consider using PostgreSQL instead of SQLite
- Ensure database is accessible from your deployment environment

## Production Considerations

1. **Database:** Use PostgreSQL for better performance and reliability
2. **Environment:** Use strong, unique secrets
3. **Domain:** Configure custom domain if needed
4. **Monitoring:** Set up error monitoring and logging
5. **Backups:** Regular database backups (if using external database)

## Current Configuration

The project is configured with:
- ✅ Vercel-compatible build scripts
- ✅ Environment variable templates
- ✅ Prisma client generation
- ✅ Standalone build output
- ✅ Production-ready Next.js configuration