import { NextRequest, NextResponse } from 'next/server'
import { db, initializeDatabase, checkDatabase } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check if database is accessible
    const dbExists = await checkDatabase()
    
    if (!dbExists) {
      // Try to initialize database
      const initResult = await initializeDatabase()
      
      if (!initResult.initialized) {
        return NextResponse.json({
          success: false,
          error: 'Database initialization failed',
          details: initResult.error ? String(initResult.error) : 'Unknown error'
        }, { status: 500 })
      }
      
      // If database needs seeding, return empty array for now
      // The frontend will handle seeding
      if (initResult.needsSeed) {
        return NextResponse.json({
          success: true,
          data: [],
          message: 'Database ready, needs seeding'
        })
      }
    }
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'UPCOMING'
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const trips = await db.trip.findMany({
      where: {
        status: status,
        isActive: true,
        departureDate: {
          gte: new Date()
        }
      },
      include: {
        route: true,
        temple: true,
        _count: {
          select: {
            bookings: true
          }
        }
      },
      orderBy: {
        departureDate: 'asc'
      },
      take: limit
    })

    return NextResponse.json({
      success: true,
      data: trips
    })
  } catch (error) {
    console.error('Error fetching trips:', error)
    
    // If there's still a database error, try to seed the database
    if (error instanceof Error && error.message.includes('Unable to open the database file')) {
      try {
        // Initialize and seed database
        const initResult = await initializeDatabase()
        
        if (initResult.initialized && initResult.needsSeed) {
          // Return empty array - frontend can call seed API
          return NextResponse.json({
            success: true,
            data: [],
            message: 'Database initialized, ready for seeding'
          })
        }
      } catch (seedError) {
        console.error('Failed to initialize database:', seedError)
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch trips',
        details: (error as Error).message 
      },
      { status: 500 }
    )
  }
}