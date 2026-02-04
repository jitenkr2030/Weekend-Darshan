'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  ArrowLeft, 
  IndianRupee, 
  CreditCard, 
  Smartphone,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [booking, setBooking] = useState<any>(null)
  const [paymentType, setPaymentType] = useState<'ADVANCE' | 'FULL'>('ADVANCE')
  const [paymentMethod, setPaymentMethod] = useState('UPI')

  const amount = searchParams.get('amount')
  const bookingId = searchParams.get('bookingId')

  useEffect(() => {
    if (bookingId) {
      fetchBooking(bookingId as string)
    }
  }, [bookingId])

  const fetchBooking = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/bookings/${id}`)
      const data = await response.json()
      
      if (data.success) {
        setBooking(data.data)
      } else {
        throw new Error(data.error || 'Failed to fetch booking')
      }
    } catch (error) {
      console.error('Error fetching booking:', error)
      toast({
        title: 'Error',
        description: 'Failed to load booking details. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!booking) return

    try {
      setProcessing(true)

      // For demo purposes, we'll simulate a successful payment
      // In production, this would integrate with Razorpay or other payment gateway
      
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate payment processing

      const paymentData = {
        bookingId: booking.id,
        amount: paymentType === 'ADVANCE' ? booking.advanceAmount : booking.totalAmount,
        type: paymentType,
        paymentMethod,
        status: 'SUCCESS',
        gatewayId: 'demo_payment_' + Date.now(),
        gatewayOrderId: 'demo_order_' + Date.now()
      }

      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: 'Payment Successful!',
          description: 'Your booking has been confirmed. Redirecting to your ticket...',
        })
        
        // Redirect to ticket page
        setTimeout(() => {
          router.push(`/ticket/${booking.bookingId}`)
        }, 2000)
      } else {
        throw new Error(data.error || 'Payment failed')
      }
    } catch (error) {
      console.error('Error processing payment:', error)
      toast({
        title: 'Payment Failed',
        description: 'Failed to process payment. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
            <p className="text-gray-600 mb-6">The booking you're trying to pay for doesn't exist.</p>
            <Button onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const paymentAmount = paymentType === 'ADVANCE' ? booking.advanceAmount : booking.totalAmount

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold">Secure Payment</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{booking.trip.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {booking.trip.route.origin} → {booking.trip.route.destination}
                  </p>
                  <p className="text-sm text-gray-600">
                    Booking ID: {booking.bookingId}
                  </p>
                </div>
                <Badge variant="outline">{booking.trip.busType}</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Departure:</span>
                  <div className="font-medium">{booking.trip.departureDate}</div>
                </div>
                <div>
                  <span className="text-gray-600">Passengers:</span>
                  <div className="font-medium">{booking.passengerCount}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Type Selection */}
          {booking.advanceAmount && booking.advanceAmount < booking.totalAmount && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Option</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentType}
                  onValueChange={(value: 'ADVANCE' | 'FULL') => setPaymentType(value)}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="ADVANCE" id="advance" />
                      <div>
                        <Label htmlFor="advance" className="font-medium">
                          Advance Payment
                        </Label>
                        <p className="text-sm text-gray-600">
                          Pay advance now, remaining before travel
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-orange-600">
                        ₹{booking.advanceAmount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-gray-500">
                        ₹{(booking.totalAmount - booking.advanceAmount).toLocaleString('en-IN')} later
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="FULL" id="full" />
                      <div>
                        <Label htmlFor="full" className="font-medium">
                          Full Payment
                        </Label>
                        <p className="text-sm text-gray-600">
                          Pay complete amount now
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        ₹{booking.totalAmount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-green-600">
                        Save ₹{(booking.totalAmount - booking.advanceAmount).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="UPI" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="h-5 w-5" />
                    <span>UPI (Google Pay, PhonePe, Paytm)</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="CARD" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-5 w-5" />
                    <span>Credit/Debit Card</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Payment Type:</span>
                  <span className="font-medium">
                    {paymentType === 'ADVANCE' ? 'Advance Payment' : 'Full Payment'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">
                    {paymentMethod === 'UPI' ? 'UPI' : 'Credit/Debit Card'}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Booking Amount:</span>
                  <span>₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                {paymentType === 'ADVANCE' && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Remaining Amount:</span>
                    <span>₹{(booking.totalAmount - booking.advanceAmount).toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Payable:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{paymentAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
                onClick={handlePayment}
                disabled={processing}
              >
                {processing ? 'Processing...' : `Pay ₹${paymentAmount.toLocaleString('en-IN')}`}
              </Button>

              <div className="flex items-center gap-2 text-xs text-gray-500 text-center">
                <AlertCircle className="h-3 w-3" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}