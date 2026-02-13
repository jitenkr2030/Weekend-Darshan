import { NextRequest, NextResponse } from 'next/server'
import { db, initializeDatabase } from '@/lib/db'
import { hash } from 'bcryptjs'
import generateWeekendTours from '../../../../seed-weekend-tours'

export async function POST(request: NextRequest) {
  try {
    console.log('Starting database seeding...')
    
    // Initialize database first
    const initResult = await initializeDatabase()
    
    if (!initResult.initialized) {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to initialize database',
        details: initResult.error ? String(initResult.error) : 'Unknown error'
      }, { status: 500 })
    }

    console.log('Database initialized, proceeding with seeding...')

    // Clear existing data
    await db.booking.deleteMany()
    await db.payment.deleteMany()
    await db.notification.deleteMany()
    await db.trip.deleteMany()
    await db.user.deleteMany()
    await db.route.deleteMany()
    await db.temple.deleteMany()
    await db.setting.deleteMany()

    console.log('Cleared existing data, creating new data...')

    // Create temples for all tour types
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

    const krishnaJanmabhoomi = await db.temple.create({
      data: {
        name: 'Krishna Janmabhoomi',
        description: 'Birth place of Lord Krishna in Mathura',
        city: 'Mathura',
        state: 'Uttar Pradesh',
        image: '/images/temples/krishna-janmabhoomi.jpg',
        isActive: true
      }
    })

    const bankeBihari = await db.temple.create({
      data: {
        name: 'Banke Bihari Temple',
        description: 'Most revered Krishna temple in Vrindavan',
        city: 'Vrindavan',
        state: 'Uttar Pradesh',
        image: '/images/temples/banke-bihari.jpg',
        isActive: true
      }
    })

    const tajMahal = await db.temple.create({
      data: {
        name: 'Taj Mahal',
        description: 'Wonder of the world in Agra',
        city: 'Agra',
        state: 'Uttar Pradesh',
        image: '/images/temples/taj-mahal.jpg',
        isActive: true
      }
    })

    const haridwarGanga = await db.temple.create({
      data: {
        name: 'Har Ki Pauri',
        description: 'Sacred ghat on the banks of Ganga River in Haridwar',
        city: 'Haridwar',
        state: 'Uttarakhand',
        image: '/images/temples/haridwar-ganga.jpg',
        isActive: true
      }
    })

    const mansaDevi = await db.temple.create({
      data: {
        name: 'Mansa Devi Temple',
        description: 'Ancient temple dedicated to Goddess Mansa Devi in Haridwar',
        city: 'Haridwar',
        state: 'Uttarakhand',
        image: '/images/temples/mansa-devi.jpg',
        isActive: true
      }
    })

    const vaishnoDevi = await db.temple.create({
      data: {
        name: 'Vaishno Devi',
        description: 'Sacred cave shrine of Goddess Vaishno Devi in Katra',
        city: 'Katra',
        state: 'Jammu & Kashmir',
        image: '/images/temples/vaishno-devi.jpg',
        isActive: true
      }
    })

    // Create routes for different tour types
    const rajasthanRoute = await db.route.create({
      data: {
        origin: 'Delhi',
        destination: 'Delhi',
        distance: 600,
        duration: 31.5,
        isActive: true
      }
    })

    const brajYatraRoute = await db.route.create({
      data: {
        origin: 'Delhi',
        destination: 'Delhi',
        distance: 500,
        duration: 31,
        isActive: true
      }
    })

    const gangaYatraRoute = await db.route.create({
      data: {
        origin: 'Delhi',
        destination: 'Delhi',
        distance: 450,
        duration: 33,
        isActive: true
      }
    })

    const vaishnoDeviRoute = await db.route.create({
      data: {
        origin: 'Delhi',
        destination: 'Delhi',
        distance: 650,
        duration: 39,
        isActive: true
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
          value: '+91-8700189551',
          description: 'Contact phone number'
        },
        {
          key: 'contact_email',
          value: 'info@weekenddarshan.com',
          description: 'Contact email address'
        }
      ]
    })

    // Generate dynamic weekend tours
    console.log('🔄 Generating dynamic weekend tours...')
    const weekendResult = await generateWeekendTours()

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully with dynamic weekend tours',
      data: {
        temples: 8,
        routes: 4,
        users: 1,
        settings: 3,
        weekendTours: weekendResult?.tripsCreated || 0,
        weekendsCovered: weekendResult?.weekendsCovered || 0,
        dateRange: weekendResult?.dateRange || null
      }
    })

  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ 
      success: false, 
      error: (error as Error).message 
    }, { status: 500 })
  }
}