import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Check if this is an admin request (you might want to add proper authentication)
    const authHeader = request.headers.get('authorization')
    
    // For now, we'll allow the migration (remove this in production)
    // if (authHeader !== 'Bearer YOUR_ADMIN_TOKEN') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // Run the migration - split into separate statements
    const migrations = [
      // Add new columns to trips table
      `ALTER TABLE trips ADD COLUMN IF NOT EXISTS "packageId" TEXT`,
      `ALTER TABLE trips ADD COLUMN IF NOT EXISTS "includesTShirt" BOOLEAN DEFAULT false`,
      `ALTER TABLE trips ADD COLUMN IF NOT EXISTS "includesInsurance" BOOLEAN DEFAULT false`,
      `ALTER TABLE trips ADD COLUMN IF NOT EXISTS "includesMeals" BOOLEAN DEFAULT false`,

      // Add new columns to users table
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS "loyaltyLevel" TEXT DEFAULT 'BRONZE'`,
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS "totalTrips" INTEGER DEFAULT 0`,
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS "loyaltyPoints" INTEGER DEFAULT 0`,
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS "referralCode" TEXT`,
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS "referredBy" TEXT`,
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS "referralCount" INTEGER DEFAULT 0`,
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS "referralEarnings" DECIMAL(10,2) DEFAULT 0.00`,

      // Add new columns to bookings table
      `ALTER TABLE bookings ADD COLUMN IF NOT EXISTS "packageId" TEXT`,
      `ALTER TABLE bookings ADD COLUMN IF NOT EXISTS "tShirtSize" TEXT`,
      `ALTER TABLE bookings ADD COLUMN IF NOT EXISTS "tShirtOrdered" BOOLEAN DEFAULT false`,
      `ALTER TABLE bookings ADD COLUMN IF NOT EXISTS "insuranceId" TEXT`,
      `ALTER TABLE bookings ADD COLUMN IF NOT EXISTS "hasInsurance" BOOLEAN DEFAULT false`,
      `ALTER TABLE bookings ADD COLUMN IF NOT EXISTS "referralCode" TEXT`,
      `ALTER TABLE bookings ADD COLUMN IF NOT EXISTS "referralDiscount" DECIMAL(10,2)`,

      // Create new tables
      `CREATE TABLE IF NOT EXISTS "loyalty_rewards" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "level" TEXT NOT NULL,
        "tripId" TEXT,
        "rewardType" TEXT NOT NULL,
        "rewardValue" DECIMAL(10,2) NOT NULL,
        "description" TEXT,
        "isUsed" BOOLEAN NOT NULL DEFAULT false,
        "usedAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "loyalty_rewards_pkey" PRIMARY KEY ("id")
      )`,

      `CREATE TABLE IF NOT EXISTS "referral_rewards" (
        "id" TEXT NOT NULL,
        "referrerId" TEXT NOT NULL,
        "referredId" TEXT NOT NULL,
        "bookingId" TEXT NOT NULL,
        "referrerAmount" DECIMAL(10,2) NOT NULL,
        "referredAmount" DECIMAL(10,2) NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'PENDING',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "paidAt" TIMESTAMP(3),
        CONSTRAINT "referral_rewards_pkey" PRIMARY KEY ("id")
      )`,

      `CREATE TABLE IF NOT EXISTS "customer_packages" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "basePrice" DECIMAL(10,2) NOT NULL,
        "packagePrice" DECIMAL(10,2) NOT NULL,
        "savings" DECIMAL(10,2) NOT NULL,
        "features" TEXT,
        "includesTShirt" BOOLEAN NOT NULL DEFAULT false,
        "includesInsurance" BOOLEAN NOT NULL DEFAULT false,
        "includesMeals" BOOLEAN NOT NULL DEFAULT false,
        "includesLoyalty" BOOLEAN NOT NULL DEFAULT true,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "customer_packages_pkey" PRIMARY KEY ("id")
      )`,

      `CREATE TABLE IF NOT EXISTS "tshirt_orders" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "bookingId" TEXT NOT NULL,
        "size" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'PENDING',
        "deliveredAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "tshirt_orders_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "tshirt_orders_bookingId_key" UNIQUE ("bookingId")
      )`,

      `CREATE TABLE IF NOT EXISTS "insurance_coverage" (
        "id" TEXT NOT NULL,
        "bookingId" TEXT NOT NULL,
        "provider" TEXT NOT NULL,
        "policyNumber" TEXT,
        "coverageType" TEXT NOT NULL,
        "coverageAmount" DECIMAL(10,2) NOT NULL,
        "premium" DECIMAL(10,2) NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'ACTIVE',
        "startDate" TIMESTAMP(3) NOT NULL,
        "endDate" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "insurance_coverage_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "insurance_coverage_bookingId_key" UNIQUE ("bookingId")
      )`,

      // Create indexes
      `CREATE INDEX IF NOT EXISTS "idx_trips_packageId" ON "trips"("packageId")`,
      `CREATE INDEX IF NOT EXISTS "idx_users_loyaltyLevel" ON "users"("loyaltyLevel")`,
      `CREATE INDEX IF NOT EXISTS "idx_users_referralCode" ON "users"("referralCode")`,
      `CREATE INDEX IF NOT EXISTS "idx_bookings_packageId" ON "bookings"("packageId")`,
      `CREATE INDEX IF NOT EXISTS "idx_bookings_referralCode" ON "bookings"("referralCode")`,
      `CREATE INDEX IF NOT EXISTS "idx_loyalty_rewards_userId" ON "loyalty_rewards"("userId")`,
      `CREATE INDEX IF NOT EXISTS "idx_referral_rewards_referrerId" ON "referral_rewards"("referrerId")`,
      `CREATE INDEX IF NOT EXISTS "idx_referral_rewards_referredId" ON "referral_rewards"("referredId")`
    ]

    // Execute each migration statement
    for (const migration of migrations) {
      await db.$executeRawUnsafe(migration)
    }

    return NextResponse.json({
      success: true,
      message: 'Database migration completed successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({
      success: false,
      error: 'Migration failed',
      details: (error as Error).message
    }, { status: 500 })
  }
}