import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const trip = await db.trip.findUnique({
      where: {
        id: id,
        isActive: true
      },
      include: {
        route: true,
        temple: true,
        _count: {
          select: {
            bookings: true
          }
        }
      }
    })

    if (!trip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: trip
    })
  } catch (error) {
    console.error('Error fetching trip:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trip' },
      { status: 500 }
    )
  }
}