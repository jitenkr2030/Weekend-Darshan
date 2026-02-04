import { db } from './src/lib/db'

async function seed() {
  try {
    // Create temples
    const khatuShyam = await db.temple.create({
      data: {
        name: 'Khatu Shyam Ji',
        description: 'Famous temple of Lord Khatu Shyam in Rajasthan',
        city: 'Khatu',
        state: 'Rajasthan',
        image: '/temples/khatu-shyam.jpg'
      }
    })

    const salasar = await db.temple.create({
      data: {
        name: 'Salasar Balaji',
        description: 'Sacred temple of Lord Hanuman in Rajasthan',
        city: 'Salasar',
        state: 'Rajasthan',
        image: '/temples/salasar-balaji.jpg'
      }
    })

    // Create routes
    const delhiKhatu = await db.route.create({
      data: {
        origin: 'Delhi',
        destination: 'Khatu Shyam Ji',
        distance: 280,
        duration: 6
      }
    })

    const delhiSalasar = await db.route.create({
      data: {
        origin: 'Delhi',
        destination: 'Salasar Balaji',
        distance: 320,
        duration: 7
      }
    })

    // Create sample trips
    const thisWeekend = new Date()
    thisWeekend.setDate(thisWeekend.getDate() + (6 - thisWeekend.getDay()) + 7) // Next Saturday
    
    const nextWeekend = new Date(thisWeekend)
    nextWeekend.setDate(nextWeekend.getDate() + 7)

    // Khatu Shyam trips
    await db.trip.create({
      data: {
        routeId: delhiKhatu.id,
        templeId: khatuShyam.id,
        title: 'Weekend Khatu Shyam Darshan',
        description: 'Divine weekend trip to Khatu Shyam Ji temple with comfortable bus travel and darshan assistance.',
        departureDate: thisWeekend,
        returnDate: new Date(thisWeekend.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days later
        departureTime: '20:00',
        returnTime: '22:00',
        totalSeats: 45,
        availableSeats: 38,
        pricePerSeat: 2100,
        advancePrice: 500,
        busType: 'AC Deluxe',
        boardingPoints: JSON.stringify([
          'Kashmiri Gate - 8:00 PM',
          'Rajouri Garden - 8:30 PM',
          'Gurgaon - 9:00 PM'
        ]),
        inclusions: JSON.stringify([
          'AC Bus Travel',
          'Darshan Assistance',
          'Morning Tea & Snacks',
          'Driver Allowance'
        ]),
        exclusions: JSON.stringify([
          'Temple Donations',
          'Personal Expenses',
          'Meals not mentioned'
        ]),
        cancellationPolicy: JSON.stringify({
          'before_7_days': '10% deduction',
          'before_3_days': '25% deduction',
          'before_1_day': '50% deduction',
          'same_day': 'No refund'
        }),
        emergencyContact: '+91-9876543210'
      }
    })

    await db.trip.create({
      data: {
        routeId: delhiKhatu.id,
        templeId: khatuShyam.id,
        title: 'Weekend Khatu Shyam Darshan',
        description: 'Divine weekend trip to Khatu Shyam Ji temple with comfortable bus travel and darshan assistance.',
        departureDate: nextWeekend,
        returnDate: new Date(nextWeekend.getTime() + 2 * 24 * 60 * 60 * 1000),
        departureTime: '20:00',
        returnTime: '22:00',
        totalSeats: 45,
        availableSeats: 42,
        pricePerSeat: 2100,
        advancePrice: 500,
        busType: 'AC Deluxe',
        boardingPoints: JSON.stringify([
          'Kashmiri Gate - 8:00 PM',
          'Rajouri Garden - 8:30 PM',
          'Gurgaon - 9:00 PM'
        ]),
        inclusions: JSON.stringify([
          'AC Bus Travel',
          'Darshan Assistance',
          'Morning Tea & Snacks',
          'Driver Allowance'
        ]),
        exclusions: JSON.stringify([
          'Temple Donations',
          'Personal Expenses',
          'Meals not mentioned'
        ]),
        cancellationPolicy: JSON.stringify({
          'before_7_days': '10% deduction',
          'before_3_days': '25% deduction',
          'before_1_day': '50% deduction',
          'same_day': 'No refund'
        }),
        emergencyContact: '+91-9876543210'
      }
    })

    // Salasar Balaji trip
    await db.trip.create({
      data: {
        routeId: delhiSalasar.id,
        templeId: salasar.id,
        title: 'Weekend Salasar Balaji Darshan',
        description: 'Spiritual weekend journey to Salasar Balaji temple with comfortable travel arrangements.',
        departureDate: thisWeekend,
        returnDate: new Date(thisWeekend.getTime() + 2 * 24 * 60 * 60 * 1000),
        departureTime: '21:00',
        returnTime: '23:00',
        totalSeats: 40,
        availableSeats: 35,
        pricePerSeat: 2300,
        advancePrice: 600,
        busType: 'AC Semi-Sleeper',
        boardingPoints: JSON.stringify([
          'Kashmiri Gate - 9:00 PM',
          'Rajouri Garden - 9:30 PM',
          'Gurgaon - 10:00 PM'
        ]),
        inclusions: JSON.stringify([
          'AC Semi-Sleeper Bus',
          'Priest Assistance',
          'Morning Breakfast',
          'Bottled Water'
        ]),
        exclusions: JSON.stringify([
          'Temple Special Entry',
          'Personal Shopping',
          'Lunch & Dinner'
        ]),
        cancellationPolicy: JSON.stringify({
          'before_7_days': '10% deduction',
          'before_3_days': '25% deduction',
          'before_1_day': '50% deduction',
          'same_day': 'No refund'
        }),
        emergencyContact: '+91-9876543210'
      }
    })

    console.log('✅ Seed data created successfully!')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    throw error
  }
}

seed()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })