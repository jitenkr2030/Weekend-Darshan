'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Booking } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Calendar, 
  MapPin, 
  Users, 
  IndianRupee, 
  Star,
  Search,
  Eye,
  Download,
  Phone,
  Bus
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import Link from 'next/link'

export default function MyBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')

  useEffect(() => {
    // For demo purposes, we'll use a guest user ID
    // In production, this would come from authentication
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/bookings')
      const data = await response.json()
      
      if (data.success) {
        setBookings(data.data)
      } else {
        if (response.status === 401) {
          // User not authenticated, redirect to login
          toast({
            title: 'Login Required',
            description: 'Please login to view your bookings',
            variant: 'destructive'
          })
          router.push('/')
          return
        }
        throw new Error(data.error || 'Failed to fetch bookings')
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast({
        title: 'Error',
        description: 'Failed to load your bookings. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const searchBookings = async () => {
    if (!mobileNumber.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a mobile number',
        variant: 'destructive'
      })
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`/api/bookings/search?mobile=${mobileNumber}`)
      const data = await response.json()
      
      if (data.success) {
        setBookings(data.data)
      } else {
        throw new Error(data.error || 'No bookings found')
      }
    } catch (error) {
      console.error('Error searching bookings:', error)
      toast({
        title: 'No Bookings Found',
        description: 'No bookings found for this mobile number.',
        variant: 'destructive'
      })
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const filteredBookings = bookings.filter(booking => 
    booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (booking as any).trip?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (booking as any).trip?.route?.origin?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (booking as any).trip?.route?.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'default'
      case 'COMPLETED': return 'secondary'
      case 'CANCELLED': return 'destructive'
      default: return 'outline'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'FULL_PAID': return 'default'
      case 'ADVANCE_PAID': return 'secondary'
      case 'PENDING': return 'destructive'
      default: return 'outline'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-12 w-full max-w-md" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/')}
            >
              ← Back
            </Button>
            <div className="flex items-center gap-2">
              <Bus className="h-6 w-6 text-orange-600" />
              <h1 className="text-xl font-bold text-orange-600">WeekendDarshan</h1>
            </div>
          </div>
          
          <Button onClick={() => router.push('/')}>
            Book New Trip
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage your temple darshan bookings</p>
          </div>

          {/* Search by Mobile Number */}
          <Card>
            <CardHeader>
              <CardTitle>Find Your Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    type="tel"
                  />
                </div>
                <Button onClick={searchBookings}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Enter your mobile number to find all your bookings
              </p>
            </CardContent>
          </Card>

          {/* Search and Filter */}
          {bookings.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by booking ID, destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Bus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {mobileNumber ? 'No Bookings Found' : 'No Bookings Yet'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {mobileNumber 
                      ? 'No bookings found for this mobile number. Please check the number and try again.'
                      : 'You haven\'t made any bookings yet. Start your spiritual journey with us!'}
                  </p>
                  <Button onClick={() => router.push('/')}>
                    Browse Trips
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{(booking as any).trip?.title || 'Trip'}</CardTitle>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{(booking as any).trip?.route?.origin || 'Delhi'} → {(booking as any).trip?.route?.destination || 'Delhi'}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge variant={getStatusColor(booking.bookingStatus)}>
                          {booking.bookingStatus}
                        </Badge>
                        <div className="text-sm font-semibold">
                          {booking.bookingId}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Departure:</span>
                        <div className="font-medium">
                          {format(new Date((booking as any).trip?.departureDate || new Date()), 'MMM d, yyyy')}
                        </div>
                        <div className="text-gray-600">{(booking as any).trip?.departureTime || '10:00 PM'}</div>
                      </div>
                      
                      <div>
                        <span className="text-gray-600">Passengers:</span>
                        <div className="font-medium">{booking.passengerCount}</div>
                        <div className="text-gray-600">Seats booked</div>
                      </div>
                      
                      <div>
                        <span className="text-gray-600">Amount:</span>
                        <div className="font-semibold text-green-600">
                          ₹{booking.totalAmount.toLocaleString('en-IN')}
                        </div>
                        <Badge variant={getPaymentStatusColor(booking.paymentStatus)} className="text-xs">
                          {booking.paymentStatus.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 text-orange-500" />
                      <span>{(booking as any).trip?.temple?.name || 'Temple'}, {(booking as any).trip?.temple?.city || 'City'}</span>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Link href={`/ticket/${booking.bookingId}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Ticket
                        </Button>
                      </Link>
                      
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      
                      {booking.bookingStatus === 'CONFIRMED' && (
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Support
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}