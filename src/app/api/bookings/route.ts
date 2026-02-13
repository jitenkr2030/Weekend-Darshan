import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret-key'
)

// Helper function to get user from token
const getUserFromToken = async (request: NextRequest) => {
  const token = request.cookies.get('auth-token')?.value
  if (!token) return null
  
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tripId, passengerCount, passengerDetails, totalAmount, advanceAmount, boardingPoint } = body

    // Get authenticated user
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Validate required fields
    if (!tripId || !passengerCount || !passengerDetails || !totalAmount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if trip exists and has available seats
    const trip = await db.trip.findUnique({
      where: { id: tripId, isActive: true }
    })

    if (!trip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found' },
        { status: 404 }
      )
    }

    if (trip.availableSeats < passengerCount) {
      return NextResponse.json(
        { success: false, error: 'Not enough seats available' },
        { status: 400 }
      )
    }

    // Generate booking ID
    const bookingCount = await db.booking.count()
    const bookingId = `WKD-${new Date().getFullYear()}-${String(bookingCount + 1).padStart(3, '0')}`

    // Create booking
    const booking = await db.booking.create({
      data: {
        bookingId,
        userId: user.id as string,
        tripId,
        passengerCount,
        passengerDetails,
        totalAmount,
        advanceAmount: advanceAmount || null,
        paymentStatus: advanceAmount ? 'ADVANCE_PAID' : 'PENDING',
        bookingStatus: 'CONFIRMED',
        seats: JSON.stringify(Array.from({ length: passengerCount }, (_, i) => `S${i + 1}`)),
        specialRequests: `Boarding: ${boardingPoint}`
      },
      include: {
        trip: {
          include: {
            route: true,
            temple: true
          }
        }
      }
    })

    // Update available seats
    await db.trip.update({
      where: { id: tripId },
      data: {
        availableSeats: trip.availableSeats - passengerCount,
        status: trip.availableSeats - passengerCount === 0 ? 'FULL' : 'UPCOMING'
      }
    })

    // Create payment record if advance amount
    if (advanceAmount && advanceAmount > 0) {
      await db.payment.create({
        data: {
          bookingId: booking.id,
          amount: advanceAmount,
          type: 'ADVANCE',
          status: 'PENDING',
          paymentMethod: 'UPI'
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        booking: {
          id: booking.id,
          bookingId: booking.bookingId,
          totalAmount: booking.totalAmount,
          advanceAmount: booking.advanceAmount,
          paymentStatus: booking.paymentStatus
        },
        trip: booking.trip
      }
    })

  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let whereClause: any = {
      userId: user.id as string
    }
    
    if (status) {
      whereClause.bookingStatus = status
    }

    const bookings = await db.booking.findMany({
      where: whereClause,
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
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}