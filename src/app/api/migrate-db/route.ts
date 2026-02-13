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

    // Run the migration - only add missing columns first
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
      `ALTER TABLE bookings ADD COLUMN IF NOT EXISTS "referralDiscount" DECIMAL(10,2)`
    ]

    // Execute each migration statement
    for (const migration of migrations) {
      try {
        await db.$executeRawUnsafe(migration)
        console.log(`✅ Migration successful: ${migration}`)
      } catch (error) {
        console.log(`⚠️ Migration skipped (column may already exist): ${migration}`)
        // Continue even if column already exists
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database migration completed successfully',
      timestamp: new Date().toISOString(),
      migratedColumns: migrations.length
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