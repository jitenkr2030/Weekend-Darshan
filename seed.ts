import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed for Weekend Darshan Demo Data...')

  // Clear existing data
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
  const adminUser = await prisma.user.create({
    data: {
      mobile: '9876543210',
      email: 'admin@weekenddarshan.com',
      name: 'Admin User',
      isAdmin: true,
      isVerified: true,
    },
  })

  // Create test users
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

  // Create temples for Rajasthan tour
  const khatuShyam = await prisma.temple.create({
    data: {
      name: 'Khatu Shyam Ji',
      description: 'Famous temple of Lord Krishna in the form of Khatu Shyam Ji, known for granting devotees\' wishes',
      city: 'Khatu',
      state: 'Rajasthan',
      image: '/images/temples/khatu-shyam.jpg',
      isActive: true,
    },
  })

  const salasarBalaji = await prisma.temple.create({
    data: {
      name: 'Salasar Balaji',
      description: 'Sacred temple of Lord Hanuman known for fulfilling wishes and removing obstacles',
      city: 'Salasar',
      state: 'Rajasthan',
      image: '/images/temples/salasar-balaji.jpg',
      isActive: true,
    },
  })

  const mandawaFort = await prisma.temple.create({
    data: {
      name: 'Mandawa Fort',
      description: 'Heritage fort showcasing beautiful frescoes and Rajasthani architecture',
      city: 'Mandawa',
      state: 'Rajasthan',
      image: '/images/temples/mandawa-fort.jpg',
      isActive: true,
    },
  })

  // Create temples for Braj Yatra tour
  const krishnaJanmabhoomi = await prisma.temple.create({
    data: {
      name: 'Shri Krishna Janmabhoomi Temple',
      description: 'Birthplace of Lord Krishna, one of the most sacred pilgrimage sites for Hindus',
      city: 'Mathura',
      state: 'Uttar Pradesh',
      image: '/images/temples/krishna-janmabhoomi.jpg',
      isActive: true,
    },
  })

  const bankeBihari = await prisma.temple.create({
    data: {
      name: 'Banke Bihari Ji Temple',
      description: 'Ancient temple dedicated to Lord Krishna in his Banke Bihari form with enchanting idol',
      city: 'Vrindavan',
      state: 'Uttar Pradesh',
      image: '/images/temples/banke-bihari.jpg',
      isActive: true,
    },
  })

  const iskconVrindavan = await prisma.temple.create({
    data: {
      name: 'ISKCON Temple Vrindavan',
      description: 'Beautiful Krishna temple built by ISKCON, known for its spiritual atmosphere and devotees',
      city: 'Vrindavan',
      state: 'Uttar Pradesh',
      image: '/images/temples/iskcon-vrindavan.jpg',
      isActive: true,
    },
  })

  const premMandir = await prisma.temple.create({
    data: {
      name: 'Prem Mandir',
      description: 'Stunning white marble temple dedicated to Radha-Krishna, illuminated beautifully at night',
      city: 'Vrindavan',
      state: 'Uttar Pradesh',
      image: '/images/temples/prem-mandir.jpg',
      isActive: true,
    },
  })

  const tajMahal = await prisma.temple.create({
    data: {
      name: 'Taj Mahal',
      description: 'One of the Seven Wonders of the World, a symbol of eternal love and Mughal architecture',
      city: 'Agra',
      state: 'Uttar Pradesh',
      image: '/images/temples/taj-mahal.jpg',
      isActive: true,
    },
  })

  // Create temples for Ganga Yatra tour
  const harKiPauri = await prisma.temple.create({
    data: {
      name: 'Har Ki Pauri',
      description: 'Sacred ghat on the banks of Ganga River, famous for evening Ganga Aarti in Haridwar',
      city: 'Haridwar',
      state: 'Uttarakhand',
      image: '/images/temples/har-ki-pauri.jpg',
      isActive: true,
    },
  })

  const laxmanJhula = await prisma.temple.create({
    data: {
      name: 'Laxman Jhula',
      description: 'Iconic suspension bridge over Ganga River, connecting important ashrams in Rishikesh',
      city: 'Rishikesh',
      state: 'Uttarakhand',
      image: '/images/temples/laxman-jhula.jpg',
      isActive: true,
    },
  })

  const ramJhula = await prisma.temple.create({
    data: {
      name: 'Ram Jhula',
      description: 'Famous suspension bridge over Ganga River, connecting Swarg Ashram with Geeta Bhawan',
      city: 'Rishikesh',
      state: 'Uttarakhand',
      image: '/images/temples/ram-jhula.jpg',
      isActive: true,
    },
  })

  const neelkanthMahadev = await prisma.temple.create({
    data: {
      name: 'Neelkanth Mahadev Temple',
      description: 'Ancient Shiva temple nestled in mountains, believed to be where Shiva drank the poison',
      city: 'Near Rishikesh',
      state: 'Uttarakhand',
      image: '/images/temples/neelkanth-mahadev.jpg',
      isActive: true,
    },
  })

  // Create temples for Vaishno Devi tour
  const vaishnoDevi = await prisma.temple.create({
    data: {
      name: 'Vaishno Devi Temple',
      description: 'Sacred cave temple dedicated to Mata Vaishno Devi, one of the most revered Shakti Peeths',
      city: 'Katra',
      state: 'Jammu & Kashmir',
      image: '/images/temples/vaishno-devi.jpg',
      isActive: true,
    },
  })

  const banganga = await prisma.temple.create({
    data: {
      name: 'Banganga',
      description: 'Sacred water body at the starting point of Vaishno Devi Yatra, believed to have holy water',
      city: 'Katra',
      state: 'Jammu & Kashmir',
      image: '/images/temples/banganga.jpg',
      isActive: true,
    },
  })

  // Create routes
  const rajasthanRoute = await prisma.route.create({
    data: {
      origin: 'Delhi',
      destination: 'Delhi (Round Trip)',
      distance: 750,
      duration: 32,
      isActive: true,
    },
  })

  const brajYatraRoute = await prisma.route.create({
    data: {
      origin: 'Delhi',
      destination: 'Delhi (Round Trip)',
      distance: 450,
      duration: 31,
      isActive: true,
    },
  })

  const gangaYatraRoute = await prisma.route.create({
    data: {
      origin: 'Delhi',
      destination: 'Delhi (Round Trip)',
      distance: 550,
      duration: 34,
      isActive: true,
    },
  })

  const vaishnoDeviRoute = await prisma.route.create({
    data: {
      origin: 'Delhi',
      destination: 'Delhi (Round Trip)',
      distance: 650,
      duration: 38,
      isActive: true,
    },
  })

  // Create sample trips with current dates (2025)
  const trips = [
    {
      routeId: rajasthanRoute.id,
      templeId: khatuShyam.id,
      title: '🔱 Premium Combo: Khatu Shyam ji + Salasar Balaji + Mandawa',
      description: 'Experience the perfect blend of spirituality and culture with our premium weekend tour. Visit two powerful temples and explore the heritage town of Mandawa in one comprehensive journey.',
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
      routeId: brajYatraRoute.id,
      templeId: krishnaJanmabhoomi.id,
      title: '🕉️ Braj Yatra: Mathura + Vrindavan + Agra – Complete Weekend Experience',
      description: 'Embark on a divine journey through the sacred land of Lord Krishna. Visit Krishna\'s birthplace, experience the spiritual atmosphere of Vrindavan, and witness the magnificent Taj Mahal in one perfect weekend.',
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
      routeId: gangaYatraRoute.id,
      templeId: harKiPauri.id,
      title: '🌊 Ganga Yatra: Haridwar + Rishikesh + Neelkanth – Complete Spiritual Experience',
      description: 'Experience the divine Ganga darshan and spiritual calm in one perfect weekend. Visit sacred ghats, ancient ashrams, and the mighty Neelkanth Mahadev temple in the Himalayan foothills.',
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
      routeId: vaishnoDeviRoute.id,
      templeId: vaishnoDevi.id,
      title: '🔯 Vaishno Devi Express: Katra – Weekend Mini Experience',
      description: 'Mata Ka Bulawa - Experience the divine blessing of Mata Vaishno Devi in one perfect weekend. Premium AC Volvo journey with complete yatra assistance and spiritual fulfillment.',
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

  // Common boarding points
  const boardingPoints = JSON.stringify([
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
  ])

  // Common inclusions
  const inclusions = JSON.stringify([
    'Premium AC Bus Travel',
    'Complimentary Tea & Breakfast',
    'Experienced Driver & Guide',
    'Darshan Assistance',
    'Travel Insurance',
    'Emergency Support'
  ])

  // Common exclusions
  const exclusions = JSON.stringify([
    'Lunch & Dinner',
    'Personal Shopping',
    'Temple Donations',
    'Any other personal expenses'
  ])

  // Common cancellation policy
  const cancellationPolicy = JSON.stringify({
    'before_48_hours': 'Full refund except ₹100 processing fee',
    'before_24_hours': '50% refund',
    'less_than_24_hours': 'No refund',
    'no_show': 'No refund'
  })

  // Create trips
  for (const tripData of trips) {
    await prisma.trip.create({
      data: {
        ...tripData,
        boardingPoints,
        inclusions,
        exclusions,
        cancellationPolicy,
        emergencyContact: '+91-9876543210',
        isActive: true,
      },
    })
  }

  // Create additional future dates
  const futureDates = [
    '2025-02-15T22:00:00Z', // Next Saturday
    '2025-02-22T22:00:00Z', // Following Saturday
    '2025-03-01T22:00:00Z', // Next month
  ]

  for (const date of futureDates) {
    const departureDate = new Date(date)
    const returnDate = new Date(departureDate)
    returnDate.setDate(returnDate.getDate() + 2)
    returnDate.setHours(5, 30, 0, 0)

    // Create additional trips for each date
    for (const tripData of trips.slice(0, 2)) { // Only create for first 2 tours
      await prisma.trip.create({
        data: {
          routeId: tripData.routeId,
          templeId: tripData.templeId,
          title: tripData.title,
          description: tripData.description,
          departureDate,
          returnDate,
          departureTime: tripData.departureTime,
          returnTime: tripData.returnTime,
          totalSeats: tripData.totalSeats,
          availableSeats: Math.floor(tripData.totalSeats * 0.7), // 70% available
          pricePerSeat: tripData.pricePerSeat,
          advancePrice: tripData.advancePrice,
          busType: tripData.busType,
          boardingPoints,
          inclusions,
          exclusions,
          cancellationPolicy,
          emergencyContact: '+91-9876543210',
          isActive: true,
          status: 'UPCOMING',
        },
      })
    }
  }

  // Create sample bookings
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
          { name: 'Companion', age: 26, gender: 'Female', mobile: '9876543299' }
        ]),
        totalAmount: trip.pricePerSeat * 2,
        advanceAmount: trip.advancePrice * 2,
        paymentStatus: 'ADVANCE_PAID',
        bookingStatus: 'CONFIRMED',
        seats: JSON.stringify([`A${i + 1}`, `A${i + 2}`]),
        qrCode: `QR-WKD-2025-${String(i + 1).padStart(3, '0')}`,
      },
    })
  }

  // Create settings
  await prisma.setting.createMany({
    data: [
      {
        key: 'CONTACT_PHONE',
        value: '+91-9876543210',
        description: 'Main contact phone number'
      },
      {
        key: 'CONTACT_EMAIL',
        value: 'info@weekenddarshan.com',
        description: 'Main contact email'
      },
      {
        key: 'WHATSAPP_NUMBER',
        value: '+91-9876543210',
        description: 'WhatsApp support number'
      },
      {
        key: 'COMPANY_NAME',
        value: 'Weekend Darshan',
        description: 'Company name'
      },
      {
        key: 'WEBSITE_URL',
        value: 'https://weekend-darshan.vercel.app',
        description: 'Website URL'
      }
    ]
  })

  console.log('✅ Demo data seeded successfully!')
  console.log(`📊 Created:
  - ${await prisma.temple.count()} temples
  - ${await prisma.route.count()} routes
  - ${await prisma.trip.count()} trips
  - ${await prisma.user.count()} users
  - ${await prisma.booking.count()} bookings
  - ${await prisma.setting.count()} settings`)

  // Create sample notifications
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
      }
    ]
  })

  console.log('📬 Created sample notifications')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })