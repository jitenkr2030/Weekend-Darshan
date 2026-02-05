import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    const tripCount = await db.trip.count()
    const userCount = await db.user.count()
    
    // Check environment variables
    const requiredEnvVars = ['DATABASE_URL', 'NEXTAUTH_URL', 'JWT_SECRET']
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar])
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        trips: tripCount,
        users: userCount
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        missingEnvVars: missingEnvVars.length > 0 ? missingEnvVars : null
      },
      version: '1.0.0'
    }
    
    if (missingEnvVars.length > 0) {
      health.status = 'warning'
      return NextResponse.json(health, { status: 200 })
    }
    
    return NextResponse.json(health)
    
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      database: {
        connected: false
      }
    }, { status: 500 })
  }
}