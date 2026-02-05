import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret-key'
)

export async function POST(request: NextRequest) {
  try {
    const { mobile, otp } = await request.json()

    if (!mobile || !otp) {
      return NextResponse.json(
        { success: false, error: 'Mobile number and OTP required' },
        { status: 400 }
      )
    }

    // Get stored OTP
    global.otpStore = global.otpStore || new Map()
    const storedOTPData = global.otpStore.get(mobile)

    if (!storedOTPData) {
      return NextResponse.json(
        { success: false, error: 'OTP not found or expired' },
        { status: 400 }
      )
    }

    // Check if OTP is expired
    if (new Date() > storedOTPData.expiry) {
      global.otpStore.delete(mobile)
      return NextResponse.json(
        { success: false, error: 'OTP expired' },
        { status: 400 }
      )
    }

    // Verify OTP
    if (storedOTPData.otp !== otp) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    // Find or create user
    let user = await db.user.findUnique({
      where: { mobile }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Mark user as verified
    user = await db.user.update({
      where: { id: user.id },
      data: { isVerified: true }
    })

    // Clear OTP
    global.otpStore.delete(mobile)

    // Generate JWT token
    const token = await new SignJWT({
      userId: user.id,
      mobile: user.mobile,
      isAdmin: user.isAdmin
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET)

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        mobile: user.mobile,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
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