import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const mobile = searchParams.get('mobile')

    if (!mobile) {
      return NextResponse.json(
        { success: false, error: 'Mobile number is required' },
        { status: 400 }
      )
    }

    // For demo purposes, we'll return all bookings since we don't have user authentication yet
    // In production, this would search by user's mobile number
    const bookings = await db.booking.findMany({
      where: {
        // TODO: Add user mobile number relation when auth is implemented
        // For now, return all bookings as demo
      },
      include: {
        trip: {
          include: {
            route: true,
            temple: true
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
    console.error('Error searching bookings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to search bookings' },
      { status: 500 }
    )
  }
}