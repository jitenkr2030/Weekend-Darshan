import { db } from './src/lib/db'

async function testDatabase() {
  try {
    console.log('Testing database connection...')
    
    // Check trips
    const trips = await db.trip.findMany({
      include: {
        route: true,
        temple: true
      }
    })
    
    console.log(`Found ${trips.length} trips:`)
    trips.forEach((trip, index) => {
      console.log(`${index + 1}. ${trip.title} - ${trip.departureDate}`)
    })
    
    // Check users
    const users = await db.user.count()
    console.log(`\nFound ${users} users`)
    
    // Check temples
    const temples = await db.temple.count()
    console.log(`Found ${temples} temples`)
    
    // Check routes
    const routes = await db.route.count()
    console.log(`Found ${routes} routes`)
    
  } catch (error) {
    console.error('Database error:', error)
  }
}

testDatabase()
