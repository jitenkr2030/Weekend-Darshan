import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed for Premium Combo Tour...')

  // Clear existing data
  await prisma.payment.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.trip.deleteMany()
  await prisma.temple.deleteMany()
  await prisma.route.deleteMany()
  await prisma.user.deleteMany()
  await prisma.setting.deleteMany()

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.create({
    data: {
      mobile: '9876543210',
      email: 'admin@weekenddarshan.com',
      name: 'Admin User',
      isAdmin: true,
      isVerified: true,
    },
  })

  // Create temples for the premium combo
  const khatuShyam = await prisma.temple.create({
    data: {
      name: 'Khatu Shyam Ji',
      description: 'Famous temple of Lord Krishna in the form of Khatu Shyam Ji',
      city: 'Khatu',
      state: 'Rajasthan',
      image: '/images/temples/khatu-shyam.jpg',
      isActive: true,
    },
  })

  const salasarBalaji = await prisma.temple.create({
    data: {
      name: 'Salasar Balaji',
      description: 'Sacred temple of Lord Hanuman known for fulfilling wishes',
      city: 'Salasar',
      state: 'Rajasthan',
      image: '/images/temples/salasar-balaji.jpg',
      isActive: true,
    },
  })

  // Create route for the premium combo
  const premiumRoute = await prisma.route.create({
    data: {
      origin: 'Delhi',
      destination: 'Delhi (Round Trip)',
      distance: 750,
      duration: 32,
      isActive: true,
    },
  })

  // Create the premium combo tour
  const premiumTrip = await prisma.trip.create({
    data: {
      routeId: premiumRoute.id,
      templeId: khatuShyam.id, // Primary temple
      title: '🔱 Premium Combo: Khatu Shyam ji + Salasar Balaji + Mandawa',
      description: 'Experience the perfect blend of spirituality and culture with our premium weekend tour. Visit two powerful temples and explore the heritage town of Mandawa in one comprehensive journey.',
      departureDate: new Date('2026-02-07T22:00:00Z'), // This Saturday 10:00 PM
      returnDate: new Date('2026-02-09T05:30:00Z'), // Monday 5:30 AM
      departureTime: '22:00',
      returnTime: '05:30',
      totalSeats: 45,
      availableSeats: 28,
      pricePerSeat: 2000,
      advancePrice: 500,
      busType: 'Premium AC Push-Back',
      boardingPoints: JSON.stringify([
        {
          name: 'Kashmiri Gate',
          address: 'Near ISBT, Delhi',
          time: '10:00 PM'
        },
        {
          name: 'Rohini West',
          address: 'Sector 10, Rohini, Delhi',
          time: '10:30 PM'
        },
        {
          name: 'Gurgaon',
          address: 'Sector 56, Gurgaon',
          time: '11:00 PM'
        }
      ]),
      inclusions: JSON.stringify([
        'Premium AC Bus Travel',
        'Complimentary Tea & Breakfast',
        'Experienced Driver & Guide',
        'Darshan Assistance',
        'Mandawa Heritage Walk',
        'Travel Insurance',
        'Emergency Support'
      ]),
      exclusions: JSON.stringify([
        'Lunch & Dinner',
        'Personal Shopping',
        'Temple Donations',
        'Any other personal expenses'
      ]),
      cancellationPolicy: JSON.stringify({
        'before_48_hours': 'Full refund except ₹100 processing fee',
        'before_24_hours': '50% refund',
        'less_than_24_hours': 'No refund',
        'no_show': 'No refund'
      }),
      emergencyContact: '+91-9876543210',
      isActive: true,
      status: 'UPCOMING',
    },
  })

  // Create additional dates for the premium tour
  const futureDates = [
    '2026-02-07T22:00:00Z', // This Saturday
    '2026-02-14T22:00:00Z', // Next Saturday
    '2026-02-21T22:00:00Z', // Following Saturday
    '2026-02-28T22:00:00Z', // End of month
    '2026-03-07T22:00:00Z', // Next month
  ]

  for (const date of futureDates) {
    const departureDate = new Date(date)
    const returnDate = new Date(departureDate)
    returnDate.setDate(returnDate.getDate() + 2) // Monday morning
    returnDate.setHours(5, 30, 0, 0)

    await prisma.trip.create({
      data: {
        routeId: premiumRoute.id,
        templeId: khatuShyam.id,
        title: '🔱 Premium Combo: Khatu Shyam ji + Salasar Balaji + Mandawa',
        description: premiumTrip.description,
        departureDate,
        returnDate,
        departureTime: '22:00',
        returnTime: '05:30',
        totalSeats: 45,
        availableSeats: Math.floor(Math.random() * 20) + 15,
        pricePerSeat: 2000,
        advancePrice: 500,
        busType: 'Premium AC Push-Back',
        boardingPoints: premiumTrip.boardingPoints,
        inclusions: premiumTrip.inclusions,
        exclusions: premiumTrip.exclusions,
        cancellationPolicy: premiumTrip.cancellationPolicy,
        emergencyContact: premiumTrip.emergencyContact,
        isActive: true,
        status: 'UPCOMING',
      },
    })
  }

  // Create sample users
  const sampleUsers = [
    { mobile: '9898989898', name: 'Rahul Sharma' },
    { mobile: '9876543211', name: 'Priya Patel' },
    { mobile: '9876543212', name: 'Amit Kumar' },
    { mobile: '9876543213', name: 'Sneha Reddy' },
    { mobile: '9876543214', name: 'Vikram Singh' },
  ]

  for (const userData of sampleUsers) {
    await prisma.user.create({
      data: {
        ...userData,
        isVerified: true,
      },
    })
  }

  // Create sample bookings for the premium tour
  const users = await prisma.user.findMany({ where: { isAdmin: false } })
  const trips = await prisma.trip.findMany({ take: 2 })

  for (let i = 0; i < 8; i++) {
    const user = users[i % users.length]
    const trip = trips[i % trips.length]
    const passengerCount = Math.floor(Math.random() * 3) + 1
    const passengers = Array.from({ length: passengerCount }, (_, idx) => ({
      name: `Passenger ${idx + 1}`,
      age: Math.floor(Math.random() * 30) + 20,
      gender: Math.random() > 0.5 ? 'MALE' : 'FEMALE',
    }))

    const totalAmount = trip.pricePerSeat * passengerCount
    const isAdvancePaid = Math.random() > 0.3
    const isFullyPaid = Math.random() > 0.6

    let paymentStatus = 'PENDING'
    let advanceAmount = 0

    if (isFullyPaid) {
      paymentStatus = 'FULL_PAID'
      advanceAmount = trip.advancePrice || 0
    } else if (isAdvancePaid) {
      paymentStatus = 'ADVANCE_PAID'
      advanceAmount = trip.advancePrice || 0
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        tripId: trip.id,
        bookingId: `WKD-2024-${String(i + 1).padStart(3, '0')}`,
        passengerCount,
        passengerDetails: JSON.stringify(passengers),
        totalAmount,
        advanceAmount,
        paymentStatus,
        bookingStatus: 'CONFIRMED',
        seats: JSON.stringify([i + 1, i + 2, i + 3].slice(0, passengerCount)),
        qrCode: `QR-WKD-2024-${String(i + 1).padStart(3, '0')}`,
      },
    })

    // Create payment records
    if (advanceAmount > 0) {
      await prisma.payment.create({
        data: {
          bookingId: booking.id,
          amount: advanceAmount,
          type: 'ADVANCE',
          status: 'SUCCESS',
          paymentMethod: 'UPI',
          gatewayId: `razorpay_adv_${i + 1}`,
        },
      })
    }

    if (isFullyPaid && totalAmount > advanceAmount) {
      await prisma.payment.create({
        data: {
          bookingId: booking.id,
          amount: totalAmount - advanceAmount,
          type: 'FULL',
          status: 'SUCCESS',
          paymentMethod: 'UPI',
          gatewayId: `razorpay_full_${i + 1}`,
        },
      })
    }
  }

  // Create settings
  await prisma.setting.createMany({
    data: [
      {
        key: 'app_name',
        value: 'WeekendDarshan - Premium Combo Tours',
        description: 'Application name',
      },
      {
        key: 'contact_phone',
        value: '+91-9876543210',
        description: 'Contact phone number',
      },
      {
        key: 'contact_email',
        value: 'info@weekenddarshan.com',
        description: 'Contact email address',
      },
      {
        key: 'whatsapp_number',
        value: '+91-9876543210',
        description: 'WhatsApp support number',
      },
      {
        key: 'company_address',
        value: 'Delhi, India',
        description: 'Company address',
      },
      {
        key: 'gst_number',
        value: '07AAAPL1234C1ZV',
        description: 'GST registration number',
      },
    ],
  })

  // Create notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: adminUser.id,
        type: 'SYSTEM',
        title: 'Premium Combo Tour Launched',
        message: 'The Khatu Shyam + Salasar + Mandawa premium combo tour is now live!',
        channels: JSON.stringify(['PUSH']),
        status: 'SENT',
        sentAt: new Date(),
      },
      {
        type: 'BOOKING_CONFIRMED',
        title: 'New Booking Received',
        message: 'A new booking has been confirmed for the Premium Combo tour',
        channels: JSON.stringify(['EMAIL', 'PUSH']),
        status: 'SENT',
        sentAt: new Date(),
      },
    ],
  })

  console.log('✅ Premium Combo Tour seed completed successfully!')
  console.log(`📊 Created: ${1} premium tour, ${2} temples, ${1} route, ${5} users, ${8} bookings`)
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })