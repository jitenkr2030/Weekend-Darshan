# Weekend Darshan Setup Guide

## 🚨 CRITICAL: Vercel Deployment Fix

**If you're seeing "URL must start with the protocol postgresql://" error, see [VERCEL-SETUP.md](./VERCEL-SETUP.md) for immediate fix.**

## 🚀 Quick Setup

### 1. Local Development Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database Configuration - Neon PostgreSQL
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_NEON_PASSWORD@YOUR_ACTUAL_NEON_HOST:5432/neondb?sslmode=require"
NEON__POSTGRES_URL_NON_POOLING="postgresql://postgres:YOUR_ACTUAL_NEON_PASSWORD@YOUR_ACTUAL_NEON_HOST:5432/neondb?sslmode=require"

# Authentication
NEXTAUTH_SECRET="YOUR_ACTUAL_NEXTAUTH_SECRET"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="YOUR_ACTUAL_JWT_SECRET"

# Neon Database Environment Variables
NEON__POSTGRES_PASSWORD="YOUR_ACTUAL_NEON_PASSWORD"
NEON__PGHOST="YOUR_ACTUAL_NEON_HOST"
```

### 2. Vercel Production Environment Variables

**IMPORTANT**: In Vercel, your `DATABASE_URL` MUST start with `postgresql://`

```bash
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:5432/neondb?sslmode=require"
```

See [VERCEL-SETUP.md](./VERCEL-SETUP.md) for detailed Vercel configuration.

### 3. Database Setup

```bash
# Generate Prisma client
bun run db:generate

# Push database schema to Neon
bun run db:push

# (Optional) Seed database with sample data
bun run db:seed
```

### 4. Start the Application

```bash
bun run dev
```

## 🔧 Issues Fixed

1. **Database Configuration**: Changed from SQLite to PostgreSQL (Neon)
2. **Prisma Schema**: Updated datasource provider to `postgresql`
3. **Database Library**: Enhanced with multiple URL format support
4. **Environment Variables**: Added robust validation and fallbacks
5. **Error Handling**: Better error messages with solutions

## 🐛 Troubleshooting

### Error: "URL must start with the protocol postgresql://"
**Solution**: Your DATABASE_URL in Vercel is malformed. See [VERCEL-SETUP.md](./VERCEL-SETUP.md)

### Error: "table main.trips does not exist"
**Solution**: Run `bun run db:push` to create the database tables.

### Error: 401 Unauthorized on /api/auth/me
**Solution**: This is expected behavior when not logged in.

## 📁 Project Structure

- `/src/app/api/` - API routes
- `/src/components/` - React components
- `/src/lib/db.ts` - Enhanced database configuration with URL validation
- `/prisma/schema.prisma` - Database schema
- `/seed.ts` - Database seeding script
- `/VERCEL-SETUP.md` - Vercel-specific setup guide

## 🎯 Next Steps

1. **For Local Development**: Set up `.env.local` and run `bun run dev`
2. **For Vercel Deployment**: Follow [VERCEL-SETUP.md](./VERCEL-SETUP.md) carefully
3. **Database Setup**: Run migrations and seed data as needed

## 📞 Support

- **Vercel Issues**: Check [VERCEL-SETUP.md](./VERCEL-SETUP.md)
- **Local Development**: Verify `.env.local` configuration
- **Database Issues**: Ensure Neon database is active and accessible