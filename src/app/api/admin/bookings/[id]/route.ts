import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin session
    const session = request.cookies.get('admin-session')?.value
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }

    const bookingId = params.id
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'cancel') {
      return await handleCancelBooking(bookingId)
    } else if (action === 'confirm-payment') {
      return await handleConfirmPayment(bookingId)
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Error handling booking action:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process booking action' },
      { status: 500 }
    )
  }
}

async function handleCancelBooking(bookingId: string) {
  try {
    // Get booking with trip details
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        trip: true
      }
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    if (booking.bookingStatus === 'CANCELLED') {
      return NextResponse.json(
        { success: false, error: 'Booking already cancelled' },
        { status: 400 }
      )
    }

    if (booking.bookingStatus === 'COMPLETED') {
      return NextResponse.json(
        { success: false, error: 'Cannot cancel completed booking' },
        { status: 400 }
      )
    }

    // Update booking status
    const updatedBooking = await db.booking.update({
      where: { id: bookingId },
      data: {
        bookingStatus: 'CANCELLED'
      }
    })

    // Restore available seats
    await db.trip.update({
      where: { id: booking.tripId },
      data: {
        availableSeats: booking.trip.availableSeats + booking.passengerCount,
        status: 'UPCOMING'
      }
    })

    // Process refund if payment was made
    if (booking.paymentStatus !== 'PENDING') {
      await db.payment.create({
        data: {
          bookingId: booking.id,
          amount: booking.totalAmount,
          type: 'REFUND',
          status: 'PROCESSING',
          paymentMethod: 'BANK_TRANSFER'
        }
      })

      // Update payment status
      await db.booking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: 'REFUNDED'
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: updatedBooking
    })

  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to cancel booking' },
      { status: 500 }
    )
  }
}

async function handleConfirmPayment(bookingId: string) {
  try {
    const booking = await db.booking.findUnique({
      where: { id: bookingId }
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    if (booking.paymentStatus === 'FULL_PAID') {
      return NextResponse.json(
        { success: false, error: 'Payment already confirmed' },
        { status: 400 }
      )
    }

    // Update payment status
    const updatedBooking = await db.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: 'FULL_PAID'
      }
    })

    // Create payment record
    await db.payment.create({
      data: {
        bookingId: booking.id,
        amount: booking.totalAmount - (booking.advanceAmount || 0),
        type: 'FULL_PAYMENT',
        status: 'COMPLETED',
        paymentMethod: 'CASH'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Payment confirmed successfully',
      data: updatedBooking
    })

  } catch (error) {
    console.error('Error confirming payment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to confirm payment' },
      { status: 500 }
    )
  }
}