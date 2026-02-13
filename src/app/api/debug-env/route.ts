import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check what environment variables are available
    const envStatus = {
      // Standard DATABASE_URL
      DATABASE_URL: process.env.DATABASE_URL ? '✓ Set' : '✗ Not set',
      
      // Neon-specific variables
      NEON__DATABASE_URL: process.env.NEON__DATABASE_URL ? '✓ Set' : '✗ Not set',
      NEON__POSTGRES_URL_NON_POOLING: process.env.NEON__POSTGRES_URL_NON_POOLING ? '✓ Set' : '✗ Not set',
      NEON__POSTGRES_PASSWORD: process.env.NEON__POSTGRES_PASSWORD ? '✓ Set (hidden)' : '✗ Not set',
      NEON__PGHOST: process.env.NEON__PGHOST ? '✓ Set (hidden)' : '✗ Not set',
      NEON__POSTGRES_USER: process.env.NEON__POSTGRES_USER || '✗ Not set (using default)',
      NEON__POSTGRES_DATABASE: process.env.NEON__POSTGRES_DATABASE || '✗ Not set (using default)',
      NEON_PROJECT_ID: process.env.NEON_PROJECT_ID ? '✓ Set (hidden)' : '✗ Not set',
      
      // Standard Vercel Postgres variables
      POSTGRES_URL: process.env.POSTGRES_URL ? '✓ Set' : '✗ Not set',
      POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING ? '✓ Set' : '✗ Not set',
      POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL ? '✓ Set' : '✗ Not set',
      
      // App settings
      NODE_ENV: process.env.NODE_ENV || 'Not set',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || '✗ Not set',
      
      // Constructed URL for testing
      constructedUrl: null as string | null
    }

    // Try to construct the URL the same way db.ts does
    const databaseUrl = process.env.DATABASE_URL
    if (databaseUrl && (databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://'))) {
      envStatus.constructedUrl = databaseUrl.substring(0, 50) + '...'
    } else if (process.env.NEON__POSTGRES_URL_NON_POOLING) {
      envStatus.constructedUrl = process.env.NEON__POSTGRES_URL_NON_POOLING.substring(0, 50) + '...'
    } else if (process.env.NEON__POSTGRES_PASSWORD && process.env.NEON__PGHOST) {
      const user = process.env.NEON__POSTGRES_USER || 'neondb_owner'
      const database = process.env.NEON__POSTGRES_DATABASE || 'neondb'
      envStatus.constructedUrl = `postgresql://${user}:[PASSWORD]@${process.env.NEON__PGHOST}:5432/${database}?sslmode=require`
    } else if (process.env.POSTGRES_URL_NON_POOLING) {
      envStatus.constructedUrl = process.env.POSTGRES_URL_NON_POOLING.substring(0, 50) + '...'
    }

    return NextResponse.json({
      success: true,
      data: envStatus,
      message: 'Use this info to verify your environment variables are set correctly'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to check environment', details: (error as Error).message },
      { status: 500 }
    )
  }
}
