import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sign } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const { mobile, otp } = await request.json()

    if (!mobile || !otp) {
      return NextResponse.json(
        { success: false, error: 'Mobile number and OTP are required' },
        { status: 400 }
      )
    }

    // Find user with valid OTP
    const user = await db.user.findFirst({
      where: {
        mobile,
        otp,
        otpExpiresAt: {
          gt: new Date()
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired OTP' },
        { status: 400 }
      )
    }

    // Mark user as verified and clear OTP
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        otp: null,
        otpExpiresAt: null
      }
    })

    // Generate JWT token
    const token = sign(
      { 
        userId: user.id, 
        mobile: user.mobile,
        isAdmin: user.isAdmin 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: updatedUser.id,
        mobile: updatedUser.mobile,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isVerified: updatedUser.isVerified
      }
    })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response

  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to verify OTP' },
      { status: 500 }
    )
  }
}