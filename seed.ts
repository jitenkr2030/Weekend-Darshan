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
  
  console.log('🗑️ Cleared existing data')

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

  // Create temples for the premium combo tours
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

  // Create temples for the Braj Yatra tour
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
      description: 'Ancient temple dedicated to Lord Krishna in his Banke Bihari form',
      city: 'Vrindavan',
      state: 'Uttar Pradesh',
      image: '/images/temples/banke-bihari.jpg',
      isActive: true,
    },
  })

  const iskconVrindavan = await prisma.temple.create({
    data: {
      name: 'ISKCON Temple Vrindavan',
      description: 'Beautiful Krishna temple built by ISKCON, known for its spiritual atmosphere',
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

  const agraFort = await prisma.temple.create({
    data: {
      name: 'Agra Fort',
      description: 'UNESCO World Heritage Site, a historic fort showcasing Mughal architecture and Indian history',
      city: 'Agra',
      state: 'Uttar Pradesh',
      image: '/images/temples/agra-fort.jpg',
      isActive: true,
    },
  })

  // Create temples for the Ganga Yatra tour (Haridwar + Rishikesh + Neelkanth)
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

  const parmarthNiketan = await prisma.temple.create({
    data: {
      name: 'Parmarth Niketan Ashram',
      description: 'Largest ashram in Rishikesh, known for its spiritual teachings and Ganga Aarti',
      city: 'Rishikesh',
      state: 'Uttarakhand',
      image: '/images/temples/parmarth-niketan.jpg',
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

  // Create temples for the Vaishno Devi tour
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

  // Create routes for all four tours
  const premiumRoute = await prisma.route.create({
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

  // Create the premium combo tour (Rajasthan)
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

  // Create the Braj Yatra tour (Agra + Mathura + Vrindavan)
  const brajYatraTrip = await prisma.trip.create({
    data: {
      routeId: brajYatraRoute.id,
      templeId: krishnaJanmabhoomi.id, // Primary temple
      title: '🕉️ Braj Yatra: Mathura + Vrindavan + Agra – Complete Weekend Experience',
      description: 'Embark on a divine journey through the sacred land of Lord Krishna. Visit Krishna\'s birthplace, experience the spiritual atmosphere of Vrindavan, and witness the magnificent Taj Mahal in one perfect weekend.',
      departureDate: new Date('2026-02-07T22:00:00Z'), // This Saturday 10:00 PM
      returnDate: new Date('2026-02-09T05:30:00Z'), // Monday 5:30 AM
      departureTime: '22:00',
      returnTime: '05:30',
      totalSeats: 50,
      availableSeats: 32,
      pricePerSeat: 1800,
      advancePrice: 400,
      busType: 'Luxury AC Semi-Sleeper',
      boardingPoints: JSON.stringify([
        {
          name: 'Kashmiri Gate',
          address: 'Near ISBT, Delhi',
          time: '10:00 PM'
        },
        {
          name: 'Noida',
          address: 'Sector 18, Noida',
          time: '10:45 PM'
        },
        {
          name: 'Faridabad',
          address: 'Sector 37, Faridabad',
          time: '11:15 PM'
        }
      ]),
      inclusions: JSON.stringify([
        'Luxury AC Bus Travel',
        'Complimentary Dinner & Tea',
        'Professional Tour Guide',
        'All Temple Darshan Assistance',
        'Lunch at Premium Restaurant',
        'Monument Entry Fees (Taj Mahal)',
        'Travel Insurance',
        '24/7 Emergency Support'
      ]),
      exclusions: JSON.stringify([
        'Personal Shopping',
        'Camera Fees at Monuments',
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

  // Create the Ganga Yatra tour (Haridwar + Rishikesh + Neelkanth)
  const gangaYatraTrip = await prisma.trip.create({
    data: {
      routeId: gangaYatraRoute.id,
      templeId: harKiPauri.id, // Primary temple
      title: '🌊 Ganga Yatra: Haridwar + Rishikesh + Neelkanth – Complete Spiritual Experience',
      description: 'Experience the divine Ganga darshan and spiritual calm in one perfect weekend. Visit sacred ghats, ancient ashrams, and the mighty Neelkanth Mahadev temple in the Himalayan foothills.',
      departureDate: new Date('2026-02-07T22:00:00Z'), // This Saturday 10:00 PM
      returnDate: new Date('2026-02-09T06:00:00Z'), // Monday 6:00 AM
      departureTime: '22:00',
      returnTime: '06:00',
      totalSeats: 45,
      availableSeats: 28,
      pricePerSeat: 2100,
      advancePrice: 500,
      busType: 'Deluxe AC Push-Back',
      boardingPoints: JSON.stringify([
        {
          name: 'Kashmiri Gate',
          address: 'Near ISBT, Delhi',
          time: '10:00 PM'
        },
        {
          name: 'Noida',
          address: 'Sector 18, Noida',
          time: '10:45 PM'
        },
        {
          name: 'Ghaziabad',
          address: 'Near Collectorate, Ghaziabad',
          time: '11:15 PM'
        }
      ]),
      inclusions: JSON.stringify([
        'Deluxe AC Bus Travel',
        'Complimentary Tea & Breakfast',
        'Expert Tour Coordinator',
        'All Temple & Ashram Visits',
        'Lunch at Rishikesh Restaurant',
        'Evening Aarti at Har Ki Pauri',
        'Travel Insurance',
        '24/7 Emergency Support'
      ]),
      exclusions: JSON.stringify([
        'Personal Expenses',
        'Ropeway Charges (if applicable)',
        'Special Puja Fees',
        'Dinner (return journey)'
      ]),
      cancellationPolicy: JSON.stringify({
        'before_48_hours': 'Full refund except ₹150 processing fee',
        'before_24_hours': '50% refund',
        'less_than_24_hours': 'No refund',
        'no_show': 'No refund'
      }),
      emergencyContact: '+91-9876543210',
      isActive: true,
      status: 'UPCOMING',
    },
  })

  // Create the Vaishno Devi Mini Experience tour
  const vaishnoDeviTrip = await prisma.trip.create({
    data: {
      routeId: vaishnoDeviRoute.id,
      templeId: vaishnoDevi.id, // Primary temple
      title: '🔯 Vaishno Devi Express: Katra – Weekend Mini Experience',
      description: 'Mata Ka Bulawa - Experience the divine blessing of Mata Vaishno Devi in one perfect weekend. Premium AC Volvo journey with complete yatra assistance and spiritual fulfillment.',
      departureDate: new Date('2026-02-07T16:00:00Z'), // This Saturday 4:00 PM
      returnDate: new Date('2026-02-09T06:00:00Z'), // Monday 6:00 AM
      departureTime: '16:00',
      returnTime: '06:00',
      totalSeats: 40,
      availableSeats: 22,
      pricePerSeat: 3500,
      advancePrice: 1000,
      busType: 'Premium AC Volvo Sleeper',
      boardingPoints: JSON.stringify([
        {
          name: 'Kashmiri Gate',
          address: 'Near ISBT, Delhi',
          time: '4:00 PM'
        },
        {
          name: 'Rohini West',
          address: 'Sector 10, Rohini, Delhi',
          time: '4:30 PM'
        },
        {
          name: 'Gurgaon',
          address: 'Sector 56, Gurgaon',
          time: '5:00 PM'
        }
      ]),
      inclusions: JSON.stringify([
        'Premium AC Volvo Sleeper Bus',
        'Expert Tour Coordinator',
        'Basic Assistance in Katra',
        'Yatra Registration Help',
        'Emergency Support Vehicle',
        'Travel Insurance',
        '24/7 Helpline Support'
      ]),
      exclusions: JSON.stringify([
        'Yatra Slip & Battery Car',
        'Pony / Palki / Helicopter',
        'Meals (optional add-on)',
        'Personal Expenses',
        'Special Puja Charges'
      ]),
      cancellationPolicy: JSON.stringify({
        'before_72_hours': 'Full refund except ₹200 processing fee',
        'before_48_hours': '75% refund',
        'before_24_hours': '25% refund',
        'less_than_24_hours': 'No refund',
        'no_show': 'No refund'
      }),
      emergencyContact: '+91-9876543210',
      isActive: true,
      status: 'UPCOMING',
    },
  })

  // Create additional dates for all four tours
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

    // Create Premium Combo dates (Rajasthan)
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

    // Create Braj Yatra dates (Agra + Mathura + Vrindavan)
    await prisma.trip.create({
      data: {
        routeId: brajYatraRoute.id,
        templeId: krishnaJanmabhoomi.id,
        title: '🕉️ Braj Yatra: Mathura + Vrindavan + Agra – Complete Weekend Experience',
        description: brajYatraTrip.description,
        departureDate,
        returnDate,
        departureTime: '22:00',
        returnTime: '05:30',
        totalSeats: 50,
        availableSeats: Math.floor(Math.random() * 25) + 20,
        pricePerSeat: 1800,
        advancePrice: 400,
        busType: 'Luxury AC Semi-Sleeper',
        boardingPoints: brajYatraTrip.boardingPoints,
        inclusions: brajYatraTrip.inclusions,
        exclusions: brajYatraTrip.exclusions,
        cancellationPolicy: brajYatraTrip.cancellationPolicy,
        emergencyContact: brajYatraTrip.emergencyContact,
        isActive: true,
        status: 'UPCOMING',
      },
    })

    // Create Ganga Yatra dates (Haridwar + Rishikesh + Neelkanth)
    await prisma.trip.create({
      data: {
        routeId: gangaYatraRoute.id,
        templeId: harKiPauri.id,
        title: '🌊 Ganga Yatra: Haridwar + Rishikesh + Neelkanth – Complete Spiritual Experience',
        description: gangaYatraTrip.description,
        departureDate,
        returnDate: new Date(returnDate.getTime() + 30 * 60 * 1000), // 6:00 AM
        departureTime: '22:00',
        returnTime: '06:00',
        totalSeats: 45,
        availableSeats: Math.floor(Math.random() * 20) + 18,
        pricePerSeat: 2100,
        advancePrice: 500,
        busType: 'Deluxe AC Push-Back',
        boardingPoints: gangaYatraTrip.boardingPoints,
        inclusions: gangaYatraTrip.inclusions,
        exclusions: gangaYatraTrip.exclusions,
        cancellationPolicy: gangaYatraTrip.cancellationPolicy,
        emergencyContact: gangaYatraTrip.emergencyContact,
        isActive: true,
        status: 'UPCOMING',
      },
    })

    // Create Vaishno Devi dates (special timing - 4 PM departure)
    const vaishnoDepartureDate = new Date(date)
    vaishnoDepartureDate.setHours(16, 0, 0, 0) // 4:00 PM
    const vaishnoReturnDate = new Date(vaishnoDepartureDate)
    vaishnoReturnDate.setDate(vaishnoReturnDate.getDate() + 2) // Monday morning
    vaishnoReturnDate.setHours(6, 0, 0, 0) // 6:00 AM

    await prisma.trip.create({
      data: {
        routeId: vaishnoDeviRoute.id,
        templeId: vaishnoDevi.id,
        title: '🔯 Vaishno Devi Express: Katra – Weekend Mini Experience',
        description: vaishnoDeviTrip.description,
        departureDate: vaishnoDepartureDate,
        returnDate: vaishnoReturnDate,
        departureTime: '16:00',
        returnTime: '06:00',
        totalSeats: 40,
        availableSeats: Math.floor(Math.random() * 15) + 20,
        pricePerSeat: 3500,
        advancePrice: 1000,
        busType: 'Premium AC Volvo Sleeper',
        boardingPoints: vaishnoDeviTrip.boardingPoints,
        inclusions: vaishnoDeviTrip.inclusions,
        exclusions: vaishnoDeviTrip.exclusions,
        cancellationPolicy: vaishnoDeviTrip.cancellationPolicy,
        emergencyContact: vaishnoDeviTrip.emergencyContact,
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

  console.log('✅ All Four Tours seed completed successfully!')
  console.log(`📊 Created: ${20} tours (5 each), ${14} temples, ${4} routes, ${5} users, ${8} bookings`)
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })