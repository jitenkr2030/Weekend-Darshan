import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin session
    const session = request.cookies.get('admin-session')?.value
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }

    const tripId = params.id
    const body = await request.json()
    const { 
      title, 
      description, 
      routeId, 
      templeId, 
      departureDate, 
      returnDate, 
      departureTime, 
      returnTime, 
      totalSeats, 
      pricePerSeat, 
      advancePrice, 
      busType 
    } = body

    // Check if trip exists
    const existingTrip = await db.trip.findUnique({
      where: { id: tripId }
    })

    if (!existingTrip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found' },
        { status: 404 }
      )
    }

    // Calculate new available seats if total seats changed
    let availableSeats = existingTrip.availableSeats
    if (totalSeats !== existingTrip.totalSeats) {
      const bookedSeats = existingTrip.totalSeats - existingTrip.availableSeats
      availableSeats = Math.max(0, totalSeats - bookedSeats)
    }

    // Update trip
    const trip = await db.trip.update({
      where: { id: tripId },
      data: {
        title,
        description,
        routeId,
        templeId,
        departureDate: new Date(departureDate),
        returnDate: new Date(returnDate),
        departureTime,
        returnTime,
        totalSeats,
        availableSeats,
        pricePerSeat,
        advancePrice: advancePrice || null,
        busType,
        status: availableSeats === 0 ? 'FULL' : 'UPCOMING'
      },
      include: {
        route: true,
        temple: true
      }
    })

    return NextResponse.json({
      success: true,
      data: trip
    })

  } catch (error) {
    console.error('Error updating trip:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update trip' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin session
    const session = request.cookies.get('admin-session')?.value
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }

    const tripId = params.id

    // Check if trip exists
    const trip = await db.trip.findUnique({
      where: { id: tripId },
      include: {
        bookings: true
      }
    })

    if (!trip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found' },
        { status: 404 }
      )
    }

    // Check if trip has bookings
    if (trip.bookings.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete trip with existing bookings' },
        { status: 400 }
      )
    }

    // Delete trip
    await db.trip.delete({
      where: { id: tripId }
    })

    return NextResponse.json({
      success: true,
      message: 'Trip deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting trip:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete trip' },
      { status: 500 }
    )
  }
}