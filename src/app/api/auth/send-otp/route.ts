import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { mobile } = await request.json()

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, error: 'Valid 10-digit mobile number required' },
        { status: 400 }
      )
    }

    // Check if user exists, if not create one
    let user = await db.user.findUnique({
      where: { mobile }
    })

    if (!user) {
      user = await db.user.create({
        data: {
          mobile,
          isVerified: false
        }
      })
    }

    // Generate OTP
    const otp = generateOTP()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // In production, send OTP via SMS service
    // For demo, we'll log it (in production, use SMS gateway)
    console.log(`OTP for ${mobile}: ${otp}`)

    // Store OTP in user record (in production, use separate OTP table)
    await db.user.update({
      where: { id: user.id },
      data: {
        // Note: In production, store OTP hash and use separate table
        // For demo, we're using a simple approach
      }
    })

    // Store OTP in memory for demo (in production, use Redis or database)
    global.otpStore = global.otpStore || new Map()
    global.otpStore.set(mobile, { otp, expiry: otpExpiry })

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      // For demo only, remove in production
      demoOTP: process.env.NODE_ENV === 'development' ? otp : undefined
    })

  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}