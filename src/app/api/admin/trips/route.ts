import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Check admin session (simplified for demo)
    const session = request.cookies.get('admin-session')?.value
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }

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

    // Validate required fields
    if (!title || !routeId || !templeId || !departureDate || !returnDate || !departureTime || !returnTime || !totalSeats || !pricePerSeat) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if route and temple exist
    const route = await db.route.findUnique({
      where: { id: routeId }
    })

    if (!route) {
      return NextResponse.json(
        { success: false, error: 'Route not found' },
        { status: 404 }
      )
    }

    const temple = await db.temple.findUnique({
      where: { id: templeId }
    })

    if (!temple) {
      return NextResponse.json(
        { success: false, error: 'Temple not found' },
        { status: 404 }
      )
    }

    // Create trip
    const trip = await db.trip.create({
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
        availableSeats: totalSeats,
        pricePerSeat,
        advancePrice: advancePrice || null,
        busType,
        status: 'UPCOMING',
        isActive: true,
        inclusions: JSON.stringify([
          'AC Bus Travel',
          'Driver & Fuel Charges',
          'Toll & Parking',
          'Darshan Assistance'
        ]),
        exclusions: JSON.stringify([
          'Meals',
          'Personal Expenses',
          'Temple Donations',
          'Travel Insurance'
        ]),
        boardingPoints: JSON.stringify([
          'Connaught Place, Delhi - 6:00 PM',
          'RK Puram, Delhi - 6:30 PM',
          'Gurgaon - 7:00 PM'
        ])
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
    console.error('Error creating trip:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create trip' },
      { status: 500 }
    )
  }
}

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

    const trips = await db.trip.findMany({
      include: {
        route: true,
        temple: true
      },
      orderBy: {
        departureDate: 'desc'
      }
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