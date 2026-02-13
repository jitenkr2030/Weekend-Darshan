'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Trip } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Bus, 
  IndianRupee, 
  Star,
  Phone,
  ArrowLeft,
  Shield,
  RefreshCw,
  Info
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { format } from 'date-fns'

export default function TripDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchTrip(params.id as string)
    }
  }, [params.id])

  const fetchTrip = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/trips/${id}`)
      const data = await response.json()
      
      if (data.success) {
        setTrip(data.data)
      } else {
        throw new Error(data.error || 'Failed to fetch trip')
      }
    } catch (error) {
      console.error('Error fetching trip:', error)
      toast({
        title: 'Error',
        description: 'Failed to load trip details. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBookNow = () => {
    if (!trip) return
    
    router.push(`/book/${trip.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip Not Found</h1>
            <p className="text-gray-600 mb-6">The trip you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const boardingPoints = JSON.parse(trip.boardingPoints || '[]').map((point: any) => 
      typeof point === 'string' ? point : point.name || `${point.name}, ${point.address}`
    )
  const inclusions = JSON.parse(trip.inclusions || '[]')
  const exclusions = JSON.parse(trip.exclusions || '[]')
  const cancellationPolicy = JSON.parse(trip.cancellationPolicy || '{}')

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
            <div className="flex items-center gap-2">
              <Bus className="h-6 w-6 text-orange-600" />
              <h1 className="text-xl font-bold text-orange-600">WeekendDarshan</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              +91-8700189551
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Trip Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-green-600">
                  {trip.availableSeats > 0 ? 'Available' : 'Sold Out'}
                </Badge>
                <Badge variant="outline">{trip.busType}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{trip.route.origin} → {trip.route.destination}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-orange-500" />
                  <span>{trip.temple.name}, {trip.temple.city}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 mb-2">
                <IndianRupee className="h-5 w-5 text-green-600" />
                <span className="text-3xl font-bold text-green-600">
                  {trip.pricePerSeat.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">per seat</p>
              <Button 
                size="lg"
                onClick={handleBookNow}
                disabled={trip.availableSeats === 0}
                className="w-full md:w-auto"
              >
                {trip.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
              </Button>
            </div>
          </div>

          {/* Trip Description */}
          <p className="text-lg text-gray-700 leading-relaxed">
            {trip.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date & Time Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Travel Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">Departure</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{format(new Date(trip.departureDate), 'EEEE, MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{trip.departureTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-red-600">Return</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{format(new Date(trip.returnDate), 'EEEE, MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{trip.returnTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {trip.route.duration && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Bus className="h-4 w-4" />
                      <span>Approx. {trip.route.duration} hours journey each way</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Boarding Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Boarding Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {boardingPoints.map((point: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {inclusions.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                
                {exclusions.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <h4 className="font-semibold mb-3 text-red-600">Not Included</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {exclusions.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Cancellation Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(cancellationPolicy).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium capitalize">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span className="text-sm text-gray-600">{value as string}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trip Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trip Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bus Type</span>
                  <Badge variant="outline">{trip.busType}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Seats</span>
                  <span className="font-medium">{trip.totalSeats}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Available Seats</span>
                  <span className="font-medium text-green-600">{trip.availableSeats}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Filled Seats</span>
                  <span className="font-medium">{trip.totalSeats - trip.availableSeats}</span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price per seat</span>
                    <span className="font-semibold">₹{trip.pricePerSeat.toLocaleString('en-IN')}</span>
                  </div>
                  
                  {trip.advancePrice && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Advance booking</span>
                      <span className="font-semibold text-green-600">₹{trip.advancePrice.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Temple Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-500" />
                  {trip.temple.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trip.temple.description && (
                  <p className="text-sm text-gray-600">{trip.temple.description}</p>
                )}
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{trip.temple.city}, {trip.temple.state}</span>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600 mb-2">
                    {trip.emergencyContact || '+91-8700189551'}
                  </p>
                  <p className="text-sm text-gray-600">24/7 Support Available</p>
                </div>
              </CardContent>
            </Card>

            {/* Book Now CTA */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-orange-600">
                      ₹{trip.pricePerSeat.toLocaleString('en-IN')}
                    </div>
                    <p className="text-sm text-gray-600">per seat</p>
                  </div>
                  
                  <Button 
                    size="lg"
                    onClick={handleBookNow}
                    disabled={trip.availableSeats === 0}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    {trip.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                  </Button>
                  
                  <p className="text-xs text-gray-500">
                    <Info className="h-3 w-3 inline mr-1" />
                    {trip.availableSeats <= 5 ? `Only ${trip.availableSeats} seats left!` : 'Secure booking with advance payment'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}