# Database Setup and Seeding Guide

## 🚨 Issue Identified

Your application is showing "No upcoming tours found" because:
1. The `DATABASE_URL` is pointing to SQLite instead of Neon PostgreSQL
2. The database tables exist but are empty (no tour data)
3. The database needs to be seeded with tour information

## ✅ Solution: Update DATABASE_URL and Seed Data

### Step 1: Update DATABASE_URL in Vercel

You need to replace the current `DATABASE_URL` with your Neon PostgreSQL URL.

From your Neon environment variables, use this one:
```
STORAGE_POSTGRES_URL
```

**Go to Vercel Dashboard → weekend-tour → Settings → Environment Variables**

**Update DATABASE_URL:**
- **Name**: `DATABASE_URL`
- **Value**: Use your `STORAGE_POSTGRES_URL` from Neon
- **Environment**: Production, Preview, Development

**Your Neon URL should look like:**
```
postgresql://username:password@host:port/database?sslmode=require
```

### Step 2: Push Database Schema

Since you already have Neon environment variables, the schema might already be created. But let's ensure it's properly set up.

The application will automatically handle schema when deployed.

### Step 3: Seed the Database

Once the DATABASE_URL is updated, you need to seed the database with tour data.

#### Option 1: Use the Seed API Endpoint (Easiest)

After deployment with correct DATABASE_URL:

1. **Visit your deployed app**: `https://weekend-tour.vercel.app`
2. **Make a POST request to seed endpoint**:
   ```bash
   curl -X POST https://weekend-tour.vercel.app/api/seed
   ```

#### Option 2: Use Vercel CLI for Local Seeding

```bash
# Set your Neon DATABASE_URL locally
export DATABASE_URL="your-neon-postgres-url-here"

# Run the seed script
bun run seed-simple
```

### Step 4: Verify the Data

After seeding, you should see:
- ✅ 14 temples (Khatu Shyam, Salasar Balaji, etc.)
- ✅ 4 routes (Delhi round trips)
- ✅ 4 upcoming trips with dates and prices
- ✅ 3 users (admin + 2 test users)
- ✅ Sample bookings and settings

## 🎯 Expected Results After Fix

Your homepage should show:

### 📅 Upcoming Tour Dates
- **🔱 Premium Combo: Khatu Shyam ji + Salasar Balaji + Mandawa**
  - Date: Feb 8-10, 2025
  - Price: ₹2,000 per person
  - Seats: 28 available

- **🕉️ Braj Yatra: Mathura + Vrindavan + Agra**
  - Date: Feb 8-10, 2025
  - Price: ₹1,800 per person
  - Seats: 32 available

- **🌊 Ganga Yatra: Haridwar + Rishikesh + Neelkanth**
  - Date: Feb 8-10, 2025
  - Price: ₹2,100 per person
  - Seats: 28 available

- **🔯 Vaishno Devi Express: Katra**
  - Date: Feb 8-10, 2025
  - Price: ₹3,500 per person
  - Seats: 22 available

## 🔧 Complete Environment Variables List

Update these in Vercel Dashboard:

| Variable | Value | Source |
|----------|-------|--------|
| `DATABASE_URL` | Your `STORAGE_POSTGRES_URL` from Neon | Neon Dashboard |
| `NEXTAUTH_URL` | `https://weekend-tour.vercel.app` | - |
| `NEXTAUTH_SECRET` | Generate secure random string | - |
| `JWT_SECRET` | Generate another secure random string | - |

## 🚀 Quick Fix Steps

1. **Go to Vercel Dashboard** → weekend-tour → Settings → Environment Variables
2. **Update DATABASE_URL** with your Neon PostgreSQL URL
3. **Redeploy the application**
4. **Seed the data**: `POST https://weekend-tour.vercel.app/api/seed`
5. **Refresh your application** - tours should now be visible!

## 📊 Troubleshooting

### If tours still don't appear:
1. **Check Vercel Function Logs** for any database errors
2. **Verify DATABASE_URL** is correctly set to Neon
3. **Try seeding again** using the API endpoint
4. **Check if tables were created** in Neon dashboard

### If database connection fails:
1. **Verify Neon database is active**
2. **Check connection string format**
3. **Ensure SSL is enabled** (add `?sslmode=require` if needed)

---

## 🎉 After Fix

Your WeekendDarshan application will display:
- ✅ Upcoming tour dates with real data
- ✅ Tour packages with prices and availability
- ✅ Working booking system
- ✅ Complete temple and route information

**The "No upcoming tours found" issue will be completely resolved!** 🚀