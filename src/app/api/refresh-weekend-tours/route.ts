import { NextRequest, NextResponse } from 'next/server'
import generateWeekendTours from '../../../../seed-weekend-tours'

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Refreshing upcoming weekend tours...')
    
    // Generate new weekend tours
    const result = await generateWeekendTours()
    
    if (!result) {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to generate weekend tours' 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Weekend tours refreshed successfully',
      data: {
        tripsCreated: result.tripsCreated,
        weekendsCovered: result.weekendsCovered,
        dateRange: {
          from: result.dateRange.from.toISOString(),
          to: result.dateRange.to.toISOString()
        },
        refreshedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error refreshing weekend tours:', error)
    return NextResponse.json({ 
      success: false, 
      error: (error as Error).message 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return information about the weekend tour system
    return NextResponse.json({ 
      success: true, 
      message: 'Weekend tour refresh endpoint',
      usage: {
        post: 'Refresh all upcoming weekend tours for the next 12 weeks',
        features: [
          'Automatically detects upcoming weekends',
          'Special pricing for holiday weekends',
          'Dynamic tour generation based on demand',
          'Supports all tour types (Rajasthan, Braj, Ganga, Vaishno Devi)'
        ],
        note: 'This will clear existing trips and generate new ones'
      }
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: (error as Error).message 
    }, { status: 500 })
  }
}