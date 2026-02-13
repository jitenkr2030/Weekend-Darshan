import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed for Weekend Darshan Demo Data...')
  
  try {
    // Test database connection first
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Clear existing data
    console.log('🗑️ Clearing existing data...')
    await prisma.payment.deleteMany()
    await prisma.notification.deleteMany()
    await prisma.booking.deleteMany()
    await prisma.trip.deleteMany()
    await prisma.temple.deleteMany()
    await prisma.route.deleteMany()
    await prisma.user.deleteMany()
    await prisma.setting.deleteMany()
    
    console.log('🗑️ Cleared existing data')

    // Create admin user
    console.log('👤 Creating users...')
    const adminUser = await prisma.user.create({
      data: {
        mobile: '9876543210',
        email: 'admin@weekenddarshan.com',
        name: 'Admin User',
        isAdmin: true,
        isVerified: true,
      },
    })

    const testUser1 = await prisma.user.create({
      data: {
        mobile: '9876543211',
        email: 'user1@example.com',
        name: 'Rahul Sharma',
        isVerified: true,
      },
    })

    const testUser2 = await prisma.user.create({
      data: {
        mobile: '9876543212',
        email: 'user2@example.com',
        name: 'Priya Patel',
        isVerified: true,
      },
    })

    console.log('✅ Created 3 users')

    // Create temples
    console.log('🛕 Creating temples...')
    const temples = [
      {
        name: 'Khatu Shyam Ji',
        description: 'Famous temple of Lord Krishna in the form of Khatu Shyam Ji, known for granting devotees\' wishes',
        city: 'Khatu',
        state: 'Rajasthan',
        image: '/images/temples/khatu-shyam.jpg',
      },
      {
        name: 'Salasar Balaji',
        description: 'Sacred temple of Lord Hanuman known for fulfilling wishes and removing obstacles',
        city: 'Salasar',
        state: 'Rajasthan',
        image: '/images/temples/salasar-balaji.jpg',
      },
      {
        name: 'Mandawa Fort',
        description: 'Heritage fort showcasing beautiful frescoes and Rajasthani architecture',
        city: 'Mandawa',
        state: 'Rajasthan',
        image: '/images/temples/mandawa-fort.jpg',
      },
      {
        name: 'Shri Krishna Janmabhoomi Temple',
        description: 'Birthplace of Lord Krishna, one of the most sacred pilgrimage sites for Hindus',
        city: 'Mathura',
        state: 'Uttar Pradesh',
        image: '/images/temples/krishna-janmabhoomi.jpg',
      },
      {
        name: 'Banke Bihari Ji Temple',
        description: 'Ancient temple dedicated to Lord Krishna in his Banke Bihari form with enchanting idol',
        city: 'Vrindavan',
        state: 'Uttar Pradesh',
        image: '/images/temples/banke-bihari.jpg',
      },
      {
        name: 'ISKCON Temple Vrindavan',
        description: 'Beautiful Krishna temple built by ISKCON, known for its spiritual atmosphere and devotees',
        city: 'Vrindavan',
        state: 'Uttar Pradesh',
        image: '/images/temples/iskcon-vrindavan.jpg',
      },
      {
        name: 'Prem Mandir',
        description: 'Stunning white marble temple dedicated to Radha-Krishna, illuminated beautifully at night',
        city: 'Vrindavan',
        state: 'Uttar Pradesh',
        image: '/images/temples/prem-mandir.jpg',
      },
      {
        name: 'Taj Mahal',
        description: 'One of the Seven Wonders of the World, a symbol of eternal love and Mughal architecture',
        city: 'Agra',
        state: 'Uttar Pradesh',
        image: '/images/temples/taj-mahal.jpg',
      },
      {
        name: 'Har Ki Pauri',
        description: 'Sacred ghat on the banks of Ganga River, famous for evening Ganga Aarti in Haridwar',
        city: 'Haridwar',
        state: 'Uttarakhand',
        image: '/images/temples/har-ki-pauri.jpg',
      },
      {
        name: 'Laxman Jhula',
        description: 'Iconic suspension bridge over Ganga River, connecting important ashrams in Rishikesh',
        city: 'Rishikesh',
        state: 'Uttarakhand',
        image: '/images/temples/laxman-jhula.jpg',
      },
      {
        name: 'Ram Jhula',
        description: 'Famous suspension bridge over Ganga River, connecting Swarg Ashram with Geeta Bhawan',
        city: 'Rishikesh',
        state: 'Uttarakhand',
        image: '/images/temples/ram-jhula.jpg',
      },
      {
        name: 'Neelkanth Mahadev Temple',
        description: 'Ancient Shiva temple nestled in mountains, believed to be where Shiva drank the poison',
        city: 'Near Rishikesh',
        state: 'Uttarakhand',
        image: '/images/temples/neelkanth-mahadev.jpg',
      },
      {
        name: 'Vaishno Devi Temple',
        description: 'Sacred cave temple dedicated to Mata Vaishno Devi, one of the most revered Shakti Peeths',
        city: 'Katra',
        state: 'Jammu & Kashmir',
        image: '/images/temples/vaishno-devi.jpg',
      },
      {
        name: 'Banganga',
        description: 'Sacred water body at the starting point of Vaishno Devi Yatra, believed to have holy water',
        city: 'Katra',
        state: 'Jammu & Kashmir',
        image: '/images/temples/banganga.jpg',
      },
    ]

    const createdTemples: any[] = []
    for (const temple of temples) {
      const created = await prisma.temple.create({
        data: { ...temple, isActive: true },
      })
      createdTemples.push(created)
    }
    
    console.log(`✅ Created ${createdTemples.length} temples`)

    // Create routes
    console.log('🛣️ Creating routes...')
    const routes = [
      {
        origin: 'Delhi',
        destination: 'Delhi (Round Trip)',
        distance: 750,
        duration: 32,
      },
      {
        origin: 'Delhi',
        destination: 'Delhi (Round Trip)',
        distance: 450,
        duration: 31,
      },
      {
        origin: 'Delhi',
        destination: 'Delhi (Round Trip)',
        distance: 550,
        duration: 34,
      },
      {
        origin: 'Delhi',
        destination: 'Delhi (Round Trip)',
        distance: 650,
        duration: 38,
      },
    ]

    const createdRoutes: any[] = []
    for (const route of routes) {
      const created = await prisma.route.create({
        data: { ...route, isActive: true },
      })
      createdRoutes.push(created)
    }
    
    console.log(`✅ Created ${createdRoutes.length} routes`)

    // Create trips
    console.log('🚌 Creating trips...')
    const trips = [
      {
        routeId: createdRoutes[0].id,
        templeId: createdTemples[0].id,
        title: '🔱 Premium Combo: Khatu Shyam ji + Salasar Balaji + Mandawa',
        description: 'Experience the perfect blend of spirituality and culture with our premium weekend tour.',
        departureDate: new Date('2025-02-08T22:00:00Z'),
        returnDate: new Date('2025-02-10T05:30:00Z'),
        departureTime: '22:00',
        returnTime: '05:30',
        totalSeats: 45,
        availableSeats: 28,
        pricePerSeat: 2000,
        advancePrice: 500,
        busType: 'Premium AC Push-Back',
        status: 'UPCOMING',
      },
      {
        routeId: createdRoutes[1].id,
        templeId: createdTemples[3].id,
        title: '🕉️ Braj Yatra: Mathura + Vrindavan + Agra – Complete Weekend Experience',
        description: 'Embark on a divine journey through the sacred land of Lord Krishna.',
        departureDate: new Date('2025-02-08T22:00:00Z'),
        returnDate: new Date('2025-02-10T05:30:00Z'),
        departureTime: '22:00',
        returnTime: '05:30',
        totalSeats: 50,
        availableSeats: 32,
        pricePerSeat: 1800,
        advancePrice: 400,
        busType: 'Luxury AC Semi-Sleeper',
        status: 'UPCOMING',
      },
      {
        routeId: createdRoutes[2].id,
        templeId: createdTemples[8].id,
        title: '🌊 Ganga Yatra: Haridwar + Rishikesh + Neelkanth – Complete Spiritual Experience',
        description: 'Experience the divine Ganga darshan and spiritual calm in one perfect weekend.',
        departureDate: new Date('2025-02-08T22:00:00Z'),
        returnDate: new Date('2025-02-10T06:00:00Z'),
        departureTime: '22:00',
        returnTime: '06:00',
        totalSeats: 45,
        availableSeats: 28,
        pricePerSeat: 2100,
        advancePrice: 500,
        busType: 'Deluxe AC Push-Back',
        status: 'UPCOMING',
      },
      {
        routeId: createdRoutes[3].id,
        templeId: createdTemples[12].id,
        title: '🔯 Vaishno Devi Express: Katra – Weekend Mini Experience',
        description: 'Mata Ka Bulawa - Experience the divine blessing of Mata Vaishno Devi in one perfect weekend.',
        departureDate: new Date('2025-02-08T16:00:00Z'),
        returnDate: new Date('2025-02-10T06:00:00Z'),
        departureTime: '16:00',
        returnTime: '06:00',
        totalSeats: 40,
        availableSeats: 22,
        pricePerSeat: 3500,
        advancePrice: 1000,
        busType: 'Premium AC Volvo Sleeper',
        status: 'UPCOMING',
      },
    ]

    const boardingPoints = JSON.stringify([
      { name: 'Kashmiri Gate', address: 'Near ISBT, Delhi', time: '10:00 PM' },
      { name: 'Rohini West', address: 'Sector 10, Rohini, Delhi', time: '10:30 PM' },
      { name: 'Gurgaon', address: 'Sector 56, Gurgaon', time: '11:00 PM' },
    ])

    const inclusions = JSON.stringify([
      'Premium AC Bus Travel',
      'Complimentary Tea & Breakfast',
      'Experienced Driver & Guide',
      'Darshan Assistance',
      'Travel Insurance',
      'Emergency Support',
    ])

    const exclusions = JSON.stringify([
      'Lunch & Dinner',
      'Personal Shopping',
      'Temple Donations',
      'Any other personal expenses',
    ])

    const cancellationPolicy = JSON.stringify({
      'before_48_hours': 'Full refund except ₹100 processing fee',
      'before_24_hours': '50% refund',
      'less_than_24_hours': 'No refund',
      'no_show': 'No refund',
    })

    for (const trip of trips) {
      await prisma.trip.create({
        data: {
          ...trip,
          boardingPoints,
          inclusions,
          exclusions,
          cancellationPolicy,
          emergencyContact: '+91-9876543210',
          isActive: true,
        },
      })
    }
    
    console.log(`✅ Created ${trips.length} main trips`)

    // Create sample bookings
    console.log('📝 Creating bookings...')
    const sampleTrips = await prisma.trip.findMany({ take: 2 })
    
    for (let i = 0; i < sampleTrips.length; i++) {
      const trip = sampleTrips[i]
      const user = i === 0 ? testUser1 : testUser2
      
      await prisma.booking.create({
        data: {
          userId: user.id,
          tripId: trip.id,
          bookingId: `WKD-2025-${String(i + 1).padStart(3, '0')}`,
          passengerCount: 2,
          passengerDetails: JSON.stringify([
            { name: user.name, age: 28, gender: 'Male', mobile: user.mobile },
            { name: 'Companion', age: 26, gender: 'Female', mobile: '9876543299' },
          ]),
          totalAmount: trip.pricePerSeat * 2,
          advanceAmount: (trip.advancePrice || trip.pricePerSeat * 0.5) * 2,
          paymentStatus: 'ADVANCE_PAID',
          bookingStatus: 'CONFIRMED',
          seats: JSON.stringify([`A${i + 1}`, `A${i + 2}`]),
          qrCode: `QR-WKD-2025-${String(i + 1).padStart(3, '0')}`,
        },
      })
    }
    
    console.log('✅ Created 2 sample bookings')

    // Create settings
    console.log('⚙️ Creating settings...')
    await prisma.setting.createMany({
      data: [
        { key: 'CONTACT_PHONE', value: '+91-9876543210', description: 'Main contact phone number' },
        { key: 'CONTACT_EMAIL', value: 'info@weekenddarshan.com', description: 'Main contact email' },
        { key: 'WHATSAPP_NUMBER', value: '+91-9876543210', description: 'WhatsApp support number' },
        { key: 'COMPANY_NAME', value: 'Weekend Darshan', description: 'Company name' },
        { key: 'WEBSITE_URL', value: 'https://weekend-darshan.vercel.app', description: 'Website URL' },
      ],
    })
    
    console.log('✅ Created 5 settings')

    // Create notifications
    console.log('📬 Creating notifications...')
    await prisma.notification.createMany({
      data: [
        {
          userId: testUser1.id,
          type: 'BOOKING_CONFIRMED',
          title: 'Booking Confirmed',
          message: 'Your trip to Khatu Shyam ji has been confirmed. Happy journey!',
          channels: JSON.stringify(['EMAIL', 'WHATSAPP']),
          status: 'SENT',
          sentAt: new Date(),
        },
        {
          userId: testUser2.id,
          type: 'TRIP_REMINDER',
          title: 'Trip Reminder',
          message: 'Your Braj Yatra trip starts tomorrow. Please be ready at the boarding point on time.',
          channels: JSON.stringify(['SMS', 'WHATSAPP']),
          status: 'PENDING',
        },
      ],
    })
    
    console.log('✅ Created 2 notifications')

    // Final summary
    const summary = {
      temples: await prisma.temple.count(),
      routes: await prisma.route.count(),
      trips: await prisma.trip.count(),
      users: await prisma.user.count(),
      bookings: await prisma.booking.count(),
      settings: await prisma.setting.count(),
      notifications: await prisma.notification.count(),
    }

    console.log('🎉 Demo data seeded successfully!')
    console.log('📊 Summary:')
    console.log(`  - ${summary.temples} temples`)
    console.log(`  - ${summary.routes} routes`)
    console.log(`  - ${summary.trips} trips`)
    console.log(`  - ${summary.users} users`)
    console.log(`  - ${summary.bookings} bookings`)
    console.log(`  - ${summary.settings} settings`)
    console.log(`  - ${summary.notifications} notifications`)

  } catch (error) {
    console.error('❌ Error seeding data:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('connection')) {
        console.log('💡 Solution: Check your DATABASE_URL in .env file')
      } else if (error.message.includes('authentication')) {
        console.log('💡 Solution: Check your Neon database credentials')
      } else if (error.message.includes('does not exist')) {
        console.log('💡 Solution: Run "npm run db:push" first to create tables')
      }
    }
    
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })