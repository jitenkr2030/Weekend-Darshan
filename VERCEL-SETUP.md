# Vercel Environment Variable Setup Guide

## 🚨 Critical Fix Required

Your application is failing because the `DATABASE_URL` in Vercel doesn't start with `postgresql://` or `postgres://` protocol.

## 🔧 Solution Options

### Option 1: Fix DATABASE_URL in Vercel (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Find the `DATABASE_URL` variable
4. **Update it to the proper format:**
   ```
   postgresql://postgres:YOUR_NEON_PASSWORD@YOUR_NEON_HOST:5432/neondb?sslmode=require
   ```

**Replace:**
- `YOUR_NEON_PASSWORD` with your actual Neon password
- `YOUR_NEON_HOST` with your actual Neon host

### Option 2: Use Individual Neon Variables (Already Supported)

The updated code now automatically constructs the DATABASE_URL from individual Neon variables:

```
NEON__POSTGRES_PASSWORD=your_password
NEON__POSTGRES_HOST=your_host  
NEON__POSTGRES_USER=postgres (default)
NEON__POSTGRES_DATABASE=neondb (default)
```

### Option 3: Use NEON__POSTGRES_URL_NON_POOLING

If you have this variable, make sure it's properly formatted:
```
postgresql://postgres:password@host:5432/neondb?sslmode=require
```

## 📋 Complete Vercel Environment Variables

Make sure you have these variables set in Vercel:

```bash
# Database (Choose ONE option)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:5432/neondb?sslmode=require"
# OR use individual variables:
NEON__POSTGRES_PASSWORD="YOUR_PASSWORD"
NEON__POSTGRES_HOST="YOUR_HOST"

# Authentication
NEXTAUTH_SECRET="YOUR_SECRET"
JWT_SECRET="YOUR_SECRET"
NEXTAUTH_URL="https://your-app.vercel.app"

# Optional: Direct database URL
NEON__POSTGRES_URL_NON_POOLING="postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:5432/neondb?sslmode=require"
```

## 🧪 Testing the Fix

After updating environment variables:

1. **Redeploy your application** in Vercel
2. **Check the logs** - the error should disappear
3. **Test the API endpoints:**
   - `/api/trips` should return data (or empty array if no data)
   - `/api/auth/me` should return 401 (expected when not logged in)

## 🔍 What the Fix Does

The updated database library now:

1. ✅ **Validates DATABASE_URL format** before using it
2. ✅ **Auto-constructs URL** from individual Neon variables
3. ✅ **Provides helpful error messages** with solutions
4. ✅ **Falls back gracefully** for development
5. ✅ **Supports multiple configuration methods**

## 🚀 Quick Fix Steps

1. **Update DATABASE_URL** in Vercel with proper `postgresql://` format
2. **Redeploy** the application
3. **Verify** the errors are gone

This should resolve the "URL must start with the protocol postgresql://" error!