import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookingId, amount, type, paymentMethod, status, gatewayId, gatewayOrderId } = body

    // Validate required fields
    if (!bookingId || !amount || !type || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if booking exists
    const booking = await db.booking.findUnique({
      where: { id: bookingId }
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Create payment record
    const payment = await db.payment.create({
      data: {
        bookingId,
        amount,
        type,
        status,
        paymentMethod,
        gatewayId,
        gatewayOrderId
      }
    })

    // Update booking payment status
    let newPaymentStatus = booking.paymentStatus
    if (status === 'SUCCESS') {
      if (type === 'FULL') {
        newPaymentStatus = 'FULL_PAID'
      } else if (type === 'ADVANCE') {
        newPaymentStatus = 'ADVANCE_PAID'
      }
    }

    await db.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: newPaymentStatus,
        paymentId: gatewayId
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        payment: {
          id: payment.id,
          amount: payment.amount,
          type: payment.type,
          status: payment.status
        },
        bookingPaymentStatus: newPaymentStatus
      }
    })

  } catch (error) {
    console.error('Error processing payment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process payment' },
      { status: 500 }
    )
  }
}