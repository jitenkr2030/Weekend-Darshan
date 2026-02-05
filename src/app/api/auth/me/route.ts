import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = verify(token, JWT_SECRET) as any
    
    // Get user from database
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        mobile: true,
        name: true,
        email: true,
        isAdmin: true,
        isVerified: true,
        createdAt: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user
    })

  } catch (error) {
    console.error('Error getting user info:', error)
    return NextResponse.json(
      { success: false, error: 'Invalid token' },
      { status: 401 }
    )
  }
}