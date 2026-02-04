import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tripId, passengerCount, passengerDetails, totalAmount, advanceAmount, boardingPoint } = body

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
        userId: 'guest-user', // TODO: Replace with actual user ID after auth
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
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')

    let whereClause: any = {}
    if (userId) whereClause.userId = userId
    if (status) whereClause.bookingStatus = status

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