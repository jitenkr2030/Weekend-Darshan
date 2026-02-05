import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check admin session
    const session = request.cookies.get('admin-session')?.value
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }

    const bookings = await db.booking.findMany({
      include: {
        trip: {
          include: {
            route: true,
            temple: true
          }
        },
        user: {
          select: {
            id: true,
            mobile: true,
            name: true,
            email: true
          }
        },
        payments: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: bookings
    })

  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}