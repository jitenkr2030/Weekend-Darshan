import { PrismaClient } from '@prisma/client'
import { db } from '@/lib/db'
import { getUpcomingWeekends, generateWeekendTourDates, getTourPricing, formatWeekendDate } from '@/lib/weekend-tours'

async function generateWeekendTours() {
  console.log('🗓️  Generating automatic weekend tours...')
  
  try {
    console.log('✅ Using shared database connection')
    
    // Get existing temples and routes
    const temples = await db.temple.findMany({ where: { isActive: true } })
    const routes = await db.route.findMany({ where: { isActive: true } })
    
    if (temples.length === 0 || routes.length === 0) {
      throw new Error('No active temples or routes found. Please run the main seed first.')
    }
    
    console.log(`📊 Found ${temples.length} temples and ${routes.length} routes`)
    
    // Clear existing trips to avoid duplicates
    console.log('🗑️  Clearing existing trips...')
    await db.booking.deleteMany()
    await db.payment.deleteMany()
    await db.trip.deleteMany()
    
    // Get upcoming weekends for the next 12 weeks
    const upcomingWeekends = getUpcomingWeekends(new Date(), 12)
    console.log(`📅 Generating tours for ${upcomingWeekends.length} upcoming weekends`)
    
    // Define tour configurations
    const tourConfigs = [
      {
        type: 'rajasthan',
        templeName: 'Khatu Shyam ji',
        routeIndex: 0,
        title: '🔱 Premium Combo - Khatu Shyam ji + Salasar Balaji + Mandawa',
        description: 'Experience the divine blessings of Khatu Shyam ji and Salasar Balaji with a cultural visit to Mandawa',
        busType: 'Premium AC Sleeper',
        departureTime: '22:00',
        returnTime: '05:30',
        totalSeats: 45
      },
      {
        type: 'braj',
        templeName: 'Krishna Janmabhoomi',
        routeIndex: 1,
        title: '🕉️ Braj Yatra Special - Mathura + Vrindavan + Agra (Taj Mahal)',
        description: 'Experience the divine land of Krishna and visit the magnificent Taj Mahal',
        busType: 'Luxury AC Semi-Sleeper',
        departureTime: '22:00',
        returnTime: '05:30',
        totalSeats: 45
      },
      {
        type: 'ganga',
        templeName: 'Har Ki Pauri',
        routeIndex: 2,
        title: '🌊 Ganga Yatra - Haridwar + Rishikesh + Neelkanth Mahadev',
        description: 'Sacred journey to the banks of holy Ganga and spiritual centers in the Himalayas',
        busType: 'Deluxe AC Push-Back',
        departureTime: '22:00',
        returnTime: '06:00',
        totalSeats: 45
      },
      {
        type: 'vaishno',
        templeName: 'Vaishno Devi',
        routeIndex: 3,
        title: '🔯 Vaishno Devi Express - Katra Weekend Special',
        description: 'Divine journey to the holy cave shrine of Mata Vaishno Devi',
        busType: 'Premium AC Volvo Sleeper',
        departureTime: '16:00', // Earlier departure for longer journey
        returnTime: '06:00',
        totalSeats: 40
      }
    ]
    
    let totalTripsCreated = 0
    
    // Generate trips for each weekend and tour type
    for (const weekend of upcomingWeekends) {
      const { departureDate, returnDate } = generateWeekendTourDates(weekend.date)
      const weekendLabel = weekend.occasion || `Weekend ${formatWeekendDate(weekend.date)}`
      
      console.log(`\n🎯 Creating trips for: ${weekendLabel}`)
      
      for (const config of tourConfigs) {
        // Find matching temple and route
        const temple = temples.find(t => t.name.includes(config.templeName.split(' ')[0]))
        const route = routes[config.routeIndex]
        
        if (!temple || !route) {
          console.warn(`⚠️  Skipping ${config.type} - missing temple or route`)
          continue
        }
        
        // Get dynamic pricing
        const pricing = getTourPricing(config.type, weekend)
        
        // Create trip with dynamic data
        const trip = await db.trip.create({
          data: {
            routeId: route.id,
            templeId: temple.id,
            title: weekend.occasion 
              ? `${config.title} - ${weekend.occasion}`
              : config.title,
            description: config.description + (
              weekend.occasion 
                ? `\n\n🎉 Special ${weekend.occasion} tour with enhanced experience!`
                : ''
            ),
            departureDate,
            returnDate,
            departureTime: config.departureTime,
            returnTime: config.returnTime,
            totalSeats: config.totalSeats,
            availableSeats: config.totalSeats,
            pricePerSeat: pricing.basePrice,
            advancePrice: pricing.advancePrice,
            busType: config.busType,
            boardingPoints: JSON.stringify([
              'Kashmiri Gate - 9:30 PM',
              'Rohini - 9:00 PM', 
              'Gurgaon - 9:45 PM'
            ]),
            inclusions: JSON.stringify(getInclusions(config.type)),
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
        
        totalTripsCreated++
        
        // Log pricing info if it's a special weekend
        if (weekend.occasion) {
          console.log(`  💰 ${config.type}: ₹${pricing.basePrice} (${Math.round(pricing.demandMultiplier * 100)}% of regular price)`)
        } else {
          console.log(`  ✅ ${config.type}: ₹${pricing.basePrice}`)
        }
      }
    }
    
    console.log(`\n🎉 Successfully generated ${totalTripsCreated} weekend tours!`)
    console.log(`📊 Tours span ${upcomingWeekends.length} weekends`)
    console.log(`🗓️  First tour: ${upcomingWeekends[0].date.toLocaleDateString('en-IN')}`)
    console.log(`🗓️  Last tour: ${upcomingWeekends[upcomingWeekends.length - 1].date.toLocaleDateString('en-IN')}`)
    
    return {
      success: true,
      tripsCreated: totalTripsCreated,
      weekendsCovered: upcomingWeekends.length,
      dateRange: {
        from: upcomingWeekends[0].date,
        to: upcomingWeekends[upcomingWeekends.length - 1].date
      }
    }
    
  } catch (error) {
    console.error('❌ Error generating weekend tours:', error)
    throw error
  }
}

function getInclusions(tourType: string): string[] {
  const baseInclusions = [
    'Premium AC Bus Transportation',
    'Morning Tea & Breakfast',
    'Experienced Tour Guide',
    'Travel Insurance',
    'Driver Allowances & Toll Taxes'
  ]
  
  const specificInclusions = {
    rajasthan: ['Mandawa Heritage Walk'],
    braj: ['Taj Mahal Entry Ticket'],
    ganga: ['Ganga Aarti at Har Ki Pauri'],
    vaishno: ['Helicopter Tickets (if available)']
  }
  
  return [...baseInclusions, ...(specificInclusions[tourType as keyof typeof specificInclusions] || [])]
}

// Run if called directly
if (require.main === module) {
  generateWeekendTours()
    .then(result => {
      console.log('\n✨ Weekend tour generation completed successfully!')
      process.exit(0)
    })
    .catch(error => {
      console.error('\n💥 Weekend tour generation failed:', error)
      process.exit(1)
    })
}

export default generateWeekendTours