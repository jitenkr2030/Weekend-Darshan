import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns'

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

    // Fetch all data
    const [bookings, trips, allTimeBookings, allTimeTrips] = await Promise.all([
      // Bookings in date range
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
      }),
      
      // Trips in date range
      db.trip.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        },
        include: {
          route: true,
          temple: true
        }
      }),

      // All time bookings for growth calculation
      db.booking.findMany({
        include: {
          payments: true
        }
      }),

      // All time trips
      db.trip.count()
    ])

    // Calculate overview metrics
    const totalRevenue = bookings
      .filter(b => b.paymentStatus === 'FULL_PAID')
      .reduce((sum, b) => sum + b.totalAmount, 0)

    const totalBookings = bookings.length
    const totalTrips = trips.length
    const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0

    // Calculate occupancy rate
    const totalSeats = trips.reduce((sum, trip) => sum + trip.totalSeats, 0)
    const bookedSeats = trips.reduce((sum, trip) => sum + (trip.totalSeats - trip.availableSeats), 0)
    const occupancyRate = totalSeats > 0 ? Math.round((bookedSeats / totalSeats) * 100) : 0

    // Calculate growth rate (compare with previous period)
    const previousStartDate = subDays(startDate, (endDate.getTime() - startDate.getTime()))
    const previousBookings = allTimeBookings.filter(b => 
      b.createdAt >= previousStartDate && b.createdAt < startDate
    )
    const previousRevenue = previousBookings
      .filter(b => b.paymentStatus === 'FULL_PAID')
      .reduce((sum, b) => sum + b.totalAmount, 0)
    
    const growthRate = previousRevenue > 0 
      ? Math.round(((totalRevenue - previousRevenue) / previousRevenue) * 100)
      : 0

    // Monthly revenue data
    const monthlyRevenueMap = new Map<string, { revenue: number; bookings: number }>()
    
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(endDate, i))
      const monthEnd = endOfMonth(subMonths(endDate, i))
      const monthKey = format(monthStart, 'MMM yyyy')
      
      const monthBookings = allTimeBookings.filter(b => 
        b.createdAt >= monthStart && b.createdAt <= monthEnd
      )
      
      const monthRevenue = monthBookings
        .filter(b => b.paymentStatus === 'FULL_PAID')
        .reduce((sum, b) => sum + b.totalAmount, 0)
      
      monthlyRevenueMap.set(monthKey, {
        revenue: monthRevenue,
        bookings: monthBookings.length
      })
    }

    const monthlyRevenue = Array.from(monthlyRevenueMap.entries()).map(([month, data]) => ({
      month,
      revenue: data.revenue,
      bookings: data.bookings
    }))

    // Route performance
    const routePerformanceMap = new Map<string, { bookings: number; revenue: number; totalSeats: number; bookedSeats: number }>()
    
    trips.forEach(trip => {
      const routeKey = `${trip.route.origin} → ${trip.route.destination}`
      const current = routePerformanceMap.get(routeKey) || { bookings: 0, revenue: 0, totalSeats: 0, bookedSeats: 0 }
      
      const tripBookings = bookings.filter(b => b.tripId === trip.id)
      const tripRevenue = tripBookings
        .filter(b => b.paymentStatus === 'FULL_PAID')
        .reduce((sum, b) => sum + b.totalAmount, 0)
      
      routePerformanceMap.set(routeKey, {
        bookings: current.bookings + tripBookings.length,
        revenue: current.revenue + tripRevenue,
        totalSeats: current.totalSeats + trip.totalSeats,
        bookedSeats: current.bookedSeats + (trip.totalSeats - trip.availableSeats)
      })
    })

    const routePerformance = Array.from(routePerformanceMap.entries()).map(([route, data]) => ({
      route,
      bookings: data.bookings,
      revenue: data.revenue,
      occupancyRate: data.totalSeats > 0 ? Math.round((data.bookedSeats / data.totalSeats) * 100) : 0
    }))

    // Temple performance
    const templePerformanceMap = new Map<string, { bookings: number; revenue: number }>()
    
    trips.forEach(trip => {
      const current = templePerformanceMap.get(trip.temple.name) || { bookings: 0, revenue: 0 }
      
      const tripBookings = bookings.filter(b => b.tripId === trip.id)
      const tripRevenue = tripBookings
        .filter(b => b.paymentStatus === 'FULL_PAID')
        .reduce((sum, b) => sum + b.totalAmount, 0)
      
      templePerformanceMap.set(trip.temple.name, {
        bookings: current.bookings + tripBookings.length,
        revenue: current.revenue + tripRevenue
      })
    })

    const templePerformance = Array.from(templePerformanceMap.entries()).map(([temple, data]) => ({
      temple,
      bookings: data.bookings,
      revenue: data.revenue
    }))

    // Recent trends (last 14 days)
    const recentTrends: any[] = []
    for (let i = 13; i >= 0; i--) {
      const date = subDays(endDate, i)
      const dateStart = new Date(date.setHours(0, 0, 0, 0))
      const dateEnd = new Date(date.setHours(23, 59, 59, 999))
      
      const dayBookings = bookings.filter(b => 
        b.createdAt >= dateStart && b.createdAt <= dateEnd
      )
      
      const dayRevenue = dayBookings
        .filter(b => b.paymentStatus === 'FULL_PAID')
        .reduce((sum, b) => sum + b.totalAmount, 0)
      
      recentTrends.push({
        date: dateStart.toISOString(),
        bookings: dayBookings.length,
        revenue: dayRevenue
      })
    }

    const reportData = {
      overview: {
        totalRevenue,
        totalBookings,
        totalTrips,
        averageBookingValue,
        occupancyRate,
        growthRate
      },
      monthlyRevenue,
      routePerformance,
      templePerformance,
      recentTrends
    }

    return NextResponse.json({
      success: true,
      data: reportData
    })

  } catch (error) {
    console.error('Error generating reports:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate reports' },
      { status: 500 }
    )
  }
}