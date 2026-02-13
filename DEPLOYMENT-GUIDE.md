# Vercel Deployment Guide for Weekend-Darshan

## ✅ Project Status: Ready for Deployment

Your project has been successfully:
- ✅ Cloned from https://github.com/jitenkr2030/Weekend-Darshan.git
- ✅ Dependencies installed (using bun)
- ✅ Vercel CLI installed globally
- ✅ Project configured with vercel.json

## 🚀 Deployment Steps

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI on your local machine:**
   ```bash
   npm i -g vercel
   # or
   bun add -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Navigate to your project directory:**
   ```bash
   cd /path/to/your/Weekend-Darshan
   ```

4. **Link to existing project or create new:**
   ```bash
   vercel link
   ```

5. **Set environment variables in Vercel Dashboard:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add these variables:
     ```
     DATABASE_URL=file:./db/custom.db
     NEXTAUTH_URL=https://your-project.vercel.app
     NEXTAUTH_SECRET=your-secret-key-here
     JWT_SECRET=your-jwt-secret-here
     RAZORPAY_KEY_ID=your-razorpay-key
     RAZORPAY_KEY_SECRET=your-razorpay-secret
     ```

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Option 2: Using GitHub Integration

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure environment variables** in Vercel dashboard (same as above)

4. **Deploy** - Vercel will automatically deploy on push

## 🔧 Project Configuration

Your project includes:
- `vercel.json` - Vercel configuration
- `next.config.ts` - Next.js configuration
- `package.json` - Dependencies and build scripts
- Prisma database setup
- Environment variables template (`.env.example`)

## 📊 Build Configuration

The project is configured to:
- Build using `vercel-build` script: `prisma generate && next build`
- API routes have 30s timeout
- Database uses SQLite for development
- Ready for PostgreSQL in production

## 🌐 After Deployment

1. **Test your application** at the provided Vercel URL
2. **Check Vercel Analytics** for performance monitoring
3. **Monitor Function Logs** for any API issues
4. **Seed database** if needed: `POST /api/seed`

## 🎯 Expected URLs

- **Production URL**: `https://your-project-name.vercel.app`
- **Dashboard**: `https://vercel.com/your-username/your-project-name`

## 🐛 Troubleshooting

If you encounter issues:
1. Check environment variables are correctly set
2. Verify build logs in Vercel dashboard
3. Ensure all dependencies are installed
4. Check API route timeouts if needed

## 📝 Notes

- The project uses Next.js 16 with App Router
- Database is configured for SQLite (development) and PostgreSQL (production)
- Authentication is set up with NextAuth.js
- Payment integration with Razorpay is configured
- The build process includes Prisma generation

---

**Your project is now ready for deployment! 🎉**