import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// In a real application, you would use an SMS service like Twilio, AWS SNS, etc.
// For demo purposes, we'll simulate OTP sending
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const sendOTP = async (mobile: string, otp: string) => {
  // Simulate OTP sending - in production, integrate with SMS service
  console.log(`OTP for ${mobile}: ${otp}`)
  
  // For demo, return success immediately
  // In production, you would:
  // await twilioClient.messages.create({
  //   body: `Your WeekendDarshan OTP is: ${otp}`,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: `+91${mobile}`
  // })
  
  return { success: true, message: 'OTP sent successfully' }
}

export async function POST(request: NextRequest) {
  try {
    const { mobile } = await request.json()

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, error: 'Valid 10-digit mobile number is required' },
        { status: 400 }
      )
    }

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Store or update user with OTP
    const user = await db.user.upsert({
      where: { mobile },
      update: {
        otp,
        otpExpiresAt: expiresAt,
        isVerified: false
      },
      create: {
        mobile,
        otp,
        otpExpiresAt: expiresAt,
        isVerified: false
      }
    })

    // Send OTP
    const otpResult = await sendOTP(mobile, otp)

    if (!otpResult.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to send OTP' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      // For demo purposes, include OTP in response (remove in production)
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    })

  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}