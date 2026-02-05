import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret-key'
)

// Helper function to get user from token
const getUserFromToken = async (request: NextRequest) => {
  const token = request.cookies.get('auth-token')?.value
  if (!token) return null
  
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const notifications = await db.notification.findMany({
      where: {
        userId: user.userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })

    return NextResponse.json({
      success: true,
      data: notifications
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { userId, tripId, bookingId, type, title, message, channels } = await request.json()

    if (!type || !title || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const notification = await db.notification.create({
      data: {
        userId: userId || null,
        tripId: tripId || null,
        bookingId: bookingId || null,
        type,
        title,
        message,
        channels: JSON.stringify(channels || ['PUSH']),
        status: 'PENDING'
      }
    })

    // In production, this would trigger actual notification sending
    // For demo, we'll just mark as sent
    await db.notification.update({
      where: { id: notification.id },
      data: {
        status: 'SENT',
        sentAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      data: notification
    })
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create notification' },
      { status: 500 }
    )
  }
}