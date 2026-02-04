import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
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
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trips' },
      { status: 500 }
    )
  }
}