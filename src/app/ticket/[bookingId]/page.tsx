'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Bus, 
  IndianRupee, 
  Star,
  Phone,
  Download,
  Share2,
  CheckCircle
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { format } from 'date-fns'

export default function TicketPage() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.bookingId) {
      fetchBooking(params.bookingId as string)
    }
  }, [params.bookingId])

  const fetchBooking = async (bookingId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/bookings/${bookingId}`)
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
        description: 'Failed to load ticket details. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadTicket = () => {
    // TODO: Implement PDF download
    toast({
      title: 'Download Started',
      description: 'Your ticket is being downloaded...',
    })
  }

  const handleShareTicket = () => {
    // TODO: Implement sharing functionality
    toast({
      title: 'Share Link Copied',
      description: 'Ticket link copied to clipboard!',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-96 w-full rounded-lg" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ticket Not Found</h1>
            <p className="text-gray-600 mb-6">The ticket you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const passengers = JSON.parse(booking.passengerDetails || '[]')
  const boardingPoints = JSON.parse(booking.trip.boardingPoints || '[]').map((point: any) => 
      typeof point === 'string' ? point : point.name || `${point.name}, ${point.address}`
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold">Your Ticket</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">Booking Confirmed</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success Message */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                <h2 className="text-2xl font-bold text-green-800">Booking Confirmed!</h2>
                <p className="text-green-700">
                  Your spiritual journey has been successfully booked. Have a blessed darshan!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Main Ticket */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{booking.trip.title}</CardTitle>
                  <div className="flex items-center gap-2 text-orange-100">
                    <MapPin className="h-4 w-4" />
                    <span>{booking.trip.route.origin} → {booking.trip.route.destination}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-orange-100">Booking ID</div>
                  <div className="text-xl font-bold">{booking.bookingId}</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Trip Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <Calendar className="h-5 w-5" />
                    Departure
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">
                      {format(new Date(booking.trip.departureDate), 'EEEE, MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{booking.trip.departureTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-red-600 font-semibold">
                    <Calendar className="h-5 w-5" />
                    Return
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">
                      {format(new Date(booking.trip.returnDate), 'EEEE, MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{booking.trip.returnTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Passenger Details */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Passengers ({booking.passengerCount})
                </h3>
                <div className="space-y-2">
                  {passengers.map((passenger: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">{passenger.name}</span>
                        <span className="text-gray-600 ml-2">
                          ({passenger.age}y, {passenger.gender})
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Seat</div>
                        <div className="font-semibold">S{index + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Boarding & Bus Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Boarding Point</h4>
                  <p className="text-gray-700">{boardingPoints[0] || 'To be confirmed'}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Bus Type</h4>
                  <Badge variant="outline">{booking.trip.busType}</Badge>
                </div>
              </div>

              <Separator />

              {/* Temple Info */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-500" />
                  Temple Information
                </h4>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="font-medium text-orange-900">{booking.trip.temple.name}</div>
                  <div className="text-orange-700 text-sm mt-1">
                    {booking.trip.temple.city}, {booking.trip.temple.state}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Summary */}
              <div>
                <h4 className="font-semibold mb-3">Payment Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-semibold">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  {booking.advanceAmount && (
                    <div className="flex justify-between">
                      <span>Advance Paid:</span>
                      <span className="font-semibold text-green-600">
                        ₹{booking.advanceAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Payment Status:</span>
                    <Badge 
                      variant={booking.paymentStatus === 'FULL_PAID' ? 'default' : 'secondary'}
                    >
                      {booking.paymentStatus.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  Emergency Contact
                </h4>
                <div className="text-blue-900 font-medium">
                  {booking.trip.emergencyContact || '+91-8700189551'}
                </div>
                <p className="text-blue-700 text-sm mt-1">
                  Call us for any assistance during your journey
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleDownloadTicket}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleShareTicket}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Ticket
            </Button>
          </div>

          {/* Important Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Important Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700 space-y-1">
                <p>• Please arrive at the boarding point 15 minutes before departure</p>
                <p>• Carry valid ID proof for all passengers</p>
                <p>• Follow temple dress code and guidelines</p>
                <p>• Keep this ticket handy for boarding and darshan</p>
                <p>• In case of any issues, call our emergency helpline</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}