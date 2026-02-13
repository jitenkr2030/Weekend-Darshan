# Vercel Environment Variables Setup Guide

## 🚨 Issue Fixed

The error `Environment Variable "DATABASE_URL" references Secret "database_url", which does not exist` has been resolved by removing the secret reference from `vercel.json`.

## ✅ Current vercel.json (Fixed)

```json
{
  "name": "weekend-tour",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

**Key Change**: Removed the `build.env` section that was referencing non-existent secrets.

## 🔧 How to Set Up Environment Variables in Vercel

### Step 1: Go to Vercel Project Settings

1. **Navigate to your Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: "weekend-tour"
3. **Go to Settings**: Click the "Settings" tab
4. **Select "Environment Variables"**: From the left sidebar

### Step 2: Add Required Environment Variables

Add each of the following variables:

#### 1. DATABASE_URL
- **Name**: `DATABASE_URL`
- **Value**: `file:./db/custom.db`
- **Environment**: Production, Preview, Development (check all)

#### 2. NEXTAUTH_URL
- **Name**: `NEXTAUTH_URL`
- **Value**: `https://weekend-tour.vercel.app`
- **Environment**: Production, Preview, Development

#### 3. NEXTAUTH_SECRET
- **Name**: `NEXTAUTH_SECRET`
- **Value**: Generate a secure random string
- **How to generate**: Use `openssl rand -base64 32` or visit https://generate-secret.vercel.app/
- **Environment**: Production, Preview, Development

#### 4. JWT_SECRET
- **Name**: `JWT_SECRET`
- **Value**: Generate another secure random string (different from NEXTAUTH_SECRET)
- **How to generate**: Use `openssl rand -base64 32` or visit https://generate-secret.vercel.app/
- **Environment**: Production, Preview, Development

#### 5. RAZORPAY_KEY_ID (Optional - for payments)
- **Name**: `RAZORPAY_KEY_ID`
- **Value**: Your Razorpay Key ID from Razorpay Dashboard
- **Environment**: Production, Preview, Development

#### 6. RAZORPAY_KEY_SECRET (Optional - for payments)
- **Name**: `RAZORPAY_KEY_SECRET`
- **Value**: Your Razorpay Secret Key from Razorpay Dashboard
- **Environment**: Production, Preview, Development

### Step 3: Save and Deploy

1. **Click "Save"** after adding each variable
2. **Redeploy your application**: 
   - Go to the "Deployments" tab
   - Click "Redeploy" or create a new deployment
   - Use the latest commit from GitHub

## 🎯 Quick Setup Values

For immediate testing, you can use these values:

```
DATABASE_URL: file:./db/custom.db
NEXTAUTH_URL: https://weekend-tour.vercel.app
NEXTAUTH_SECRET: your-secret-key-here-change-this
JWT_SECRET: your-jwt-secret-here-change-this
```

**⚠️ Important**: Change the secret values before production deployment!

## 🔍 Verification

After setting up environment variables:

1. **Check deployment logs** to ensure no missing variable errors
2. **Test the application** at your Vercel URL
3. **Verify database connection** works
4. **Test authentication** if implemented

## 🚀 Alternative: Using Vercel CLI

```bash
# Set environment variables via CLI
vercel env add DATABASE_URL
# Choose Production, Preview, Development
# Enter: file:./db/custom.db

vercel env add NEXTAUTH_URL
# Enter: https://weekend-tour.vercel.app

vercel env add NEXTAUTH_SECRET
# Enter your generated secret

vercel env add JWT_SECRET
# Enter your generated JWT secret
```

## 📋 Complete Environment Variables List

| Variable | Value | Required | Notes |
|----------|-------|----------|-------|
| `DATABASE_URL` | `file:./db/custom.db` | ✅ Yes | SQLite database path |
| `NEXTAUTH_URL` | `https://weekend-tour.vercel.app` | ✅ Yes | Your Vercel domain |
| `NEXTAUTH_SECRET` | Random 32-char string | ✅ Yes | Auth encryption |
| `JWT_SECRET` | Random 32-char string | ✅ Yes | JWT token signing |
| `RAZORPAY_KEY_ID` | From Razorpay Dashboard | ❌ No | Payment integration |
| `RAZORPAY_KEY_SECRET` | From Razorpay Dashboard | ❌ No | Payment integration |

---

## ✅ Next Steps

1. **Add the environment variables** in Vercel Dashboard
2. **Redeploy your application**
3. **Test all functionality** at your deployed URL

Your WeekendDarshan application should now deploy successfully! 🎉