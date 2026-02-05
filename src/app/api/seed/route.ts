import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hash } from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // Check if this is a secure request (in production, you'd want to add authentication)
    if (process.env.NODE_ENV === 'production') {
      const authHeader = request.headers.get('authorization')
      if (authHeader !== `Bearer ${process.env.SEED_API_KEY}`) {
        return NextResponse.json({ 
          success: false, 
          error: 'Unauthorized' 
        }, { status: 401 })
      }
    }

    // Clear existing data
    await db.booking.deleteMany()
    await db.payment.deleteMany()
    await db.notification.deleteMany()
    await db.trip.deleteMany()
    await db.user.deleteMany()
    await db.route.deleteMany()
    await db.temple.deleteMany()
    await db.setting.deleteMany()

    // Create temples
    const khatuShyam = await db.temple.create({
      data: {
        name: 'Khatu Shyam ji',
        description: 'Famous temple of Lord Khatu Shyam ji in Rajasthan',
        city: 'Khatu',
        state: 'Rajasthan',
        image: '/images/temples/khatu-shyam.jpg',
        isActive: true
      }
    })

    const salasarBalaji = await db.temple.create({
      data: {
        name: 'Salasar Balaji',
        description: 'Sacred temple of Lord Hanuman in Salasar',
        city: 'Salasar',
        state: 'Rajasthan',
        image: '/images/temples/salasar-balaji.jpg',
        isActive: true
      }
    })

    // Create route
    const route = await db.route.create({
      data: {
        origin: 'Delhi',
        destination: 'Delhi',
        distance: 600,
        duration: 31.5,
        isActive: true
      }
    })

    // Create premium combo trips with upcoming dates
    const upcomingDates = [
      '2026-02-07', '2026-02-14', '2026-02-21', 
      '2026-02-28', '2026-03-07', '2026-03-14'
    ]

    for (const date of upcomingDates) {
      const departureDate = new Date(date)
      departureDate.setHours(22, 0, 0, 0) // 10:00 PM
      
      const returnDate = new Date(date)
      returnDate.setDate(returnDate.getDate() + 2) // Monday
      returnDate.setHours(5, 30, 0, 0) // 5:30 AM

      await db.trip.create({
        data: {
          routeId: route.id,
          templeId: khatuShyam.id,
          title: '🔱 Premium Combo - Khatu Shyam ji + Salasar Balaji + Mandawa',
          description: 'Experience the divine blessings of Khatu Shyam ji and Salasar Balaji with a cultural visit to Mandawa',
          departureDate,
          returnDate,
          departureTime: '22:00',
          returnTime: '05:30',
          totalSeats: 45,
          availableSeats: 45,
          pricePerSeat: 2000,
          advancePrice: 500,
          busType: 'Premium AC Sleeper',
          boardingPoints: JSON.stringify([
            'Kashmiri Gate - 9:30 PM',
            'Rohini - 9:00 PM', 
            'Gurgaon - 9:45 PM'
          ]),
          inclusions: JSON.stringify([
            'Premium AC Bus Transportation',
            'Morning Tea & Breakfast',
            'Experienced Tour Guide',
            'Travel Insurance',
            'Mandawa Heritage Walk',
            'Driver Allowances & Toll Taxes'
          ]),
          exclusions: JSON.stringify([
            'Lunch & Dinner',
            'Personal Expenses',
            'Temple Donations',
            'Photography Charges',
            'Any other items not mentioned'
          ]),
          cancellationPolicy: JSON.stringify([
            '25% cancellation charges up to 7 days before departure',
            '50% cancellation charges 3-6 days before departure', 
            '75% cancellation charges 1-2 days before departure',
            'No refund within 24 hours of departure'
          ]),
          emergencyContact: '+91-9876543210',
          isActive: true,
          status: 'UPCOMING'
        }
      })
    }

    // Create admin user
    const hashedPassword = await hash('admin123', 12)
    await db.user.create({
      data: {
        mobile: '9876543210',
        email: 'admin@weekenddarshan.com',
        name: 'Admin User',
        isAdmin: true,
        isVerified: true
      }
    })

    // Create some settings
    await db.setting.createMany({
      data: [
        {
          key: 'app_name',
          value: 'WeekendDarshan',
          description: 'Application name'
        },
        {
          key: 'contact_phone',
          value: '+91-9876543210',
          description: 'Contact phone number'
        },
        {
          key: 'contact_email',
          value: 'info@weekenddarshan.com',
          description: 'Contact email address'
        }
      ]
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully with premium combo tours',
      data: {
        trips: upcomingDates.length,
        temples: 2,
        routes: 1,
        users: 1
      }
    })

  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}