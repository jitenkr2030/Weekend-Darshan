import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { format, subDays, subMonths } from 'date-fns'

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

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'revenue'
    const timeRange = searchParams.get('timeRange') || '30days'

    // Calculate date range
    const endDate = new Date()
    let startDate: Date

    switch (timeRange) {
      case '7days':
        startDate = subDays(endDate, 7)
        break
      case '30days':
        startDate = subDays(endDate, 30)
        break
      case '90days':
        startDate = subDays(endDate, 90)
        break
      case '6months':
        startDate = subMonths(endDate, 6)
        break
      case '1year':
        startDate = subMonths(endDate, 12)
        break
      default:
        startDate = subDays(endDate, 30)
    }

    let csvContent = ''
    let filename = ''

    switch (type) {
      case 'revenue':
        csvContent = await generateRevenueReport(startDate, endDate)
        filename = 'revenue-report'
        break
      
      case 'bookings':
        csvContent = await generateBookingsReport(startDate, endDate)
        filename = 'bookings-report'
        break
      
      case 'trips':
        csvContent = await generateTripsReport(startDate, endDate)
        filename = 'trips-report'
        break
      
      case 'customers':
        csvContent = await generateCustomersReport(startDate, endDate)
        filename = 'customers-report'
        break
      
      case 'performance':
        csvContent = await generatePerformanceReport(startDate, endDate)
        filename = 'performance-report'
        break
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid report type' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      csv: csvContent,
      filename: `${filename}-${format(new Date(), 'yyyy-MM-dd')}.csv`
    })

  } catch (error) {
    console.error('Error exporting report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to export report' },
      { status: 500 }
    )
  }
}

async function generateRevenueReport(startDate: Date, endDate: Date): Promise<string> {
  const bookings = await db.booking.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      trip: {
        include: {
          route: true,
          temple: true
        }
      },
      user: {
        select: {
          mobile: true,
          name: true
        }
      },
      payments: true
    }
  })

  const headers = [
    'Booking ID',
    'Date',
    'Customer Name',
    'Mobile',
    'Trip',
    'Route',
    'Temple',
    'Passengers',
    'Total Amount',
    'Advance Amount',
    'Balance',
    'Payment Status',
    'Booking Status'
  ]

  const rows = bookings.map(booking => [
    booking.bookingId,
    format(new Date(booking.createdAt), 'yyyy-MM-dd'),
    booking.user?.name || 'N/A',
    booking.user?.mobile || 'N/A',
    booking.trip.title,
    `${booking.trip.route.origin} → ${booking.trip.route.destination}`,
    booking.trip.temple.name,
    booking.passengerCount.toString(),
    booking.totalAmount.toString(),
    (booking.advanceAmount || 0).toString(),
    (booking.totalAmount - (booking.advanceAmount || 0)).toString(),
    booking.paymentStatus.replace('_', ' '),
    booking.bookingStatus
  ])

  return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
}

async function generateBookingsReport(startDate: Date, endDate: Date): Promise<string> {
  const bookings = await db.booking.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      trip: {
        include: {
          route: true,
          temple: true
        }
      },
      user: {
        select: {
          mobile: true,
          name: true,
          email: true
        }
      },
      payments: true
    }
  })

  const headers = [
    'Booking ID',
    'Booking Date',
    'Trip Date',
    'Customer Name',
    'Mobile',
    'Email',
    'Trip Title',
    'Route',
    'Temple',
    'Passenger Count',
    'Passenger Details',
    'Total Amount',
    'Payment Status',
    'Booking Status',
    'Special Requests'
  ]

  const rows = bookings.map(booking => {
    const passengerDetails = JSON.parse(booking.passengerDetails as string)
    const passengerNames = passengerDetails.map((p: any) => p.name).join(', ')
    
    return [
      booking.bookingId,
      format(new Date(booking.createdAt), 'yyyy-MM-dd HH:mm'),
      format(new Date(booking.trip.departureDate), 'yyyy-MM-dd'),
      booking.user?.name || 'N/A',
      booking.user?.mobile || 'N/A',
      booking.user?.email || 'N/A',
      booking.trip.title,
      `${booking.trip.route.origin} → ${booking.trip.route.destination}`,
      booking.trip.temple.name,
      booking.passengerCount.toString(),
      passengerNames,
      booking.totalAmount.toString(),
      booking.paymentStatus.replace('_', ' '),
      booking.bookingStatus,
      booking.specialRequests || ''
    ]
  })

  return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
}

async function generateTripsReport(startDate: Date, endDate: Date): Promise<string> {
  const trips = await db.trip.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      route: true,
      temple: true,
      bookings: {
        include: {
          payments: true
        }
      }
    }
  })

  const headers = [
    'Trip Title',
    'Route',
    'Temple',
    'Departure Date',
    'Return Date',
    'Bus Type',
    'Total Seats',
    'Available Seats',
    'Booked Seats',
    'Occupancy Rate',
    'Price per Seat',
    'Total Bookings',
    'Revenue',
    'Status'
  ]

  const rows = trips.map(trip => {
    const bookedSeats = trip.totalSeats - trip.availableSeats
    const occupancyRate = trip.totalSeats > 0 ? Math.round((bookedSeats / trip.totalSeats) * 100) : 0
    const revenue = trip.bookings
      .filter(b => b.paymentStatus === 'FULL_PAID')
      .reduce((sum, b) => sum + b.totalAmount, 0)

    return [
      trip.title,
      `${trip.route.origin} → ${trip.route.destination}`,
      trip.temple.name,
      format(new Date(trip.departureDate), 'yyyy-MM-dd'),
      format(new Date(trip.returnDate), 'yyyy-MM-dd'),
      trip.busType,
      trip.totalSeats.toString(),
      trip.availableSeats.toString(),
      bookedSeats.toString(),
      `${occupancyRate}%`,
      trip.pricePerSeat.toString(),
      trip.bookings.length.toString(),
      revenue.toString(),
      trip.status
    ]
  })

  return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
}

async function generateCustomersReport(startDate: Date, endDate: Date): Promise<string> {
  const bookings = await db.booking.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      user: {
        select: {
          id: true,
          mobile: true,
          name: true,
          email: true,
          createdAt: true
        }
      },
      trip: {
        include: {
          route: true,
          temple: true
        }
      },
      payments: true
    }
  })

  // Group by user
  const customerMap = new Map<string, any>()
  
  bookings.forEach(booking => {
    if (!booking.user) return
    
    const userId = booking.user.id
    const existing = customerMap.get(userId) || {
      name: booking.user.name || 'N/A',
      mobile: booking.user.mobile,
      email: booking.user.email || 'N/A',
      registeredDate: format(new Date(booking.user.createdAt), 'yyyy-MM-dd'),
      totalBookings: 0,
      totalSpent: 0,
      trips: []
    }
    
    existing.totalBookings++
    if (booking.paymentStatus === 'FULL_PAID') {
      existing.totalSpent += booking.totalAmount
    }
    existing.trips.push(booking.trip.title)
    
    customerMap.set(userId, existing)
  })

  const headers = [
    'Customer Name',
    'Mobile',
    'Email',
    'Registration Date',
    'Total Bookings',
    'Total Spent',
    'Average Booking Value',
    'Trips Taken'
  ]

  const rows = Array.from(customerMap.values()).map(customer => [
    customer.name,
    customer.mobile,
    customer.email,
    customer.registeredDate,
    customer.totalBookings.toString(),
    customer.totalSpent.toString(),
    customer.totalBookings > 0 ? Math.round(customer.totalSpent / customer.totalBookings).toString() : '0',
    [...new Set(customer.trips)].join('; ')
  ])

  return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
}

async function generatePerformanceReport(startDate: Date, endDate: Date): Promise<string> {
  const [trips, bookings] = await Promise.all([
    db.trip.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        route: true,
        temple: true,
        bookings: true
      }
    }),
    db.booking.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        trip: {
          include: {
            route: true,
            temple: true
          }
        },
        payments: true
      }
    })
  ])

  // Route performance
  const routeMap = new Map<string, any>()
  trips.forEach(trip => {
    const routeKey = `${trip.route.origin} → ${trip.route.destination}`
    const existing = routeMap.get(routeKey) || {
      route: routeKey,
      totalTrips: 0,
      totalBookings: 0,
      totalRevenue: 0,
      totalSeats: 0,
      bookedSeats: 0
    }
    
    existing.totalTrips++
    existing.totalBookings += trip.bookings.length
    existing.totalSeats += trip.totalSeats
    existing.bookedSeats += trip.totalSeats - trip.availableSeats
    
    const tripRevenue = trip.bookings
      .filter(b => b.paymentStatus === 'FULL_PAID')
      .reduce((sum, b) => sum + b.totalAmount, 0)
    existing.totalRevenue += tripRevenue
    
    routeMap.set(routeKey, existing)
  })

  const headers = [
    'Route',
    'Total Trips',
    'Total Bookings',
    'Total Revenue',
    'Average Bookings per Trip',
    'Average Revenue per Trip',
    'Total Seats',
    'Booked Seats',
    'Occupancy Rate'
  ]

  const rows = Array.from(routeMap.values()).map(route => [
    route.route,
    route.totalTrips.toString(),
    route.totalBookings.toString(),
    route.totalRevenue.toString(),
    route.totalTrips > 0 ? Math.round(route.totalBookings / route.totalTrips).toString() : '0',
    route.totalTrips > 0 ? Math.round(route.totalRevenue / route.totalTrips).toString() : '0',
    route.totalSeats.toString(),
    route.bookedSeats.toString(),
    route.totalSeats > 0 ? `${Math.round((route.bookedSeats / route.totalSeats) * 100)}%` : '0%'
  ])

  return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
}