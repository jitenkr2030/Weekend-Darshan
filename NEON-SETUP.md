# 🚨 Neon Database Setup Required

Your Neon database is empty because you haven't pushed the schema and seeded it with data yet. Follow these steps:

## 📋 Step 1: Get Your Actual Neon Credentials

Go to your **Vercel Dashboard** → **Settings** → **Environment Variables** and copy these values:

- `NEON__POSTGRES_PASSWORD` - Your actual Neon password
- `NEON__PGHOST` - Your actual Neon host
- `NEXTAUTH_SECRET` - Your actual secret
- `JWT_SECRET` - Your actual secret

## 🔧 Step 2: Update Your .env.local File

Replace the placeholder values in `.env.local` with your actual credentials:

```bash
# BEFORE (placeholders):
DATABASE_URL="postgresql://postgres:NEON__POSTGRES_PASSWORD@NEON__PGHOST:5432/neondb?sslmode=require"

# AFTER (actual values):
DATABASE_URL="postgresql://postgres:your_real_password@your_real_host.neon.tech:5432/neondb?sslmode=require"
```

## 🗄️ Step 3: Push Database Schema to Neon

```bash
# This creates all the tables in your Neon database
bun run db:push
```

## 🌱 Step 4: Seed Demo Data to Neon

```bash
# This adds all the demo data to your Neon database
bun run db:seed
```

## ✅ Step 5: Verify Tables in Neon

After completing the steps above:

1. Go to your **Neon Dashboard**
2. Navigate to **Database Studio**
3. You should now see all tables:
   - users
   - temples
   - routes
   - trips
   - bookings
   - payments
   - notifications
   - settings

## 🚨 Common Issues & Solutions

### Issue: "URL must start with postgresql://"
**Solution**: Make sure your DATABASE_URL starts with `postgresql://` not `postgres://`

### Issue: "Authentication failed"
**Solution**: Double-check your NEON__POSTGRES_PASSWORD and NEON__PGHOST values

### Issue: "Database does not exist"
**Solution**: Make sure you're using the correct database name (usually `neondb`)

## 🎯 Quick Setup Script

Run this script for interactive setup:

```bash
chmod +x setup-neon.sh
./setup-neon.sh
```

## 📊 Expected Results

After successful setup, your Neon database will contain:

- **14 temples** across different regions
- **4 routes** with distances and durations
- **10 trips** with various dates and prices
- **3 users** (admin + test users)
- **2 sample bookings**
- **5 application settings**

## 🔄 For Vercel Deployment

Make sure your Vercel environment variables match your local `.env.local`:

1. Go to Vercel → Settings → Environment Variables
2. Update `DATABASE_URL` with the same format as your local file
3. Redeploy your application
4. The deployed app will use the same Neon database

## 🆘 Still Having Issues?

1. **Check Neon Dashboard**: Ensure your database is active
2. **Verify Credentials**: Copy-paste values directly from Vercel
3. **Check Connection**: Try connecting with a database tool first
4. **Contact Support**: If issues persist, check Neon status page

---

**⚠️ Important**: Your current `.env.local` has placeholder values. You MUST replace them with actual values from your Vercel dashboard for the database connection to work.