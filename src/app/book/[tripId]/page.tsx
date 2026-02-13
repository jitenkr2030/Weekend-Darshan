'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Trip, Passenger } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  MapPin, 
  Bus, 
  IndianRupee, 
  Users,
  Plus,
  Trash2,
  Shield
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { format } from 'date-fns'

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [seatCount, setSeatCount] = useState(1)
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: '', age: 0, gender: 'MALE' }
  ])
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  useEffect(() => {
    if (params.tripId) {
      fetchTrip(params.tripId as string)
    }
  }, [params.tripId])

  useEffect(() => {
    // Update passengers array when seat count changes
    const currentCount = passengers.length
    if (currentCount < seatCount) {
      // Add passengers
      const newPassengers = [...passengers]
      for (let i = currentCount; i < seatCount; i++) {
        newPassengers.push({ name: '', age: 0, gender: 'MALE' })
      }
      setPassengers(newPassengers)
    } else if (currentCount > seatCount) {
      // Remove passengers
      setPassengers(passengers.slice(0, seatCount))
    }
  }, [seatCount])

  const fetchTrip = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/trips/${id}`)
      const data = await response.json()
      
      if (data.success) {
        setTrip(data.data)
        // Set default boarding point
        const boardingPoints = JSON.parse(data.data.boardingPoints || '[]').map((point: any) => 
          typeof point === 'string' ? point : point.name || `${point.name}, ${point.address}`
        )
        if (boardingPoints.length > 0) {
          setSelectedBoardingPoint(boardingPoints[0])
        }
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

  const updatePassenger = (index: number, field: keyof Passenger, value: any) => {
    const newPassengers = [...passengers]
    newPassengers[index] = { ...newPassengers[index], [field]: value }
    setPassengers(newPassengers)
  }

  const calculateTotal = () => {
    if (!trip) return 0
    return trip.pricePerSeat * seatCount
  }

  const calculateAdvance = () => {
    if (!trip || !trip.advancePrice) return 0
    return trip.advancePrice * seatCount
  }

  const validateForm = () => {
    if (!trip) return false
    
    // Check if all passengers have valid details
    for (const passenger of passengers) {
      if (!passenger.name.trim()) {
        toast({
          title: 'Validation Error',
          description: 'Please enter name for all passengers',
          variant: 'destructive'
        })
        return false
      }
      if (passenger.age < 1 || passenger.age > 120) {
        toast({
          title: 'Validation Error',
          description: 'Please enter valid age for all passengers',
          variant: 'destructive'
        })
        return false
      }
    }

    if (!selectedBoardingPoint) {
      toast({
        title: 'Validation Error',
        description: 'Please select a boarding point',
        variant: 'destructive'
      })
      return false
    }

    if (!acceptTerms) {
      toast({
        title: 'Validation Error',
        description: 'Please accept the terms and conditions',
        variant: 'destructive'
      })
      return false
    }

    return true
  }

  const handleBooking = async () => {
    if (!validateForm() || !trip) return

    try {
      setBookingLoading(true)

      const bookingData = {
        tripId: trip.id,
        passengerCount: seatCount,
        passengerDetails: JSON.stringify(passengers),
        totalAmount: calculateTotal(),
        advanceAmount: calculateAdvance(),
        boardingPoint: selectedBoardingPoint
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: 'Booking Created!',
          description: 'Your booking has been created. Redirecting to payment...',
        })
        
        // Redirect to payment page
        router.push(`/payment/${data.data.booking.bookingId}?bookingId=${data.data.booking.bookingId}&amount=${data.data.booking.advanceAmount || data.data.booking.totalAmount}`)
      } else {
        throw new Error(data.error || 'Failed to create booking')
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      toast({
        title: 'Booking Error',
        description: 'Failed to create booking. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
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
            <p className="text-gray-600 mb-6">The trip you're trying to book doesn't exist.</p>
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
  const maxSeats = Math.min(6, trip.availableSeats) // Max 6 seats per booking

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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{trip.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.route.origin} → {trip.route.destination}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{trip.busType}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Departure:</span>
                    <div className="font-medium">
                      {format(new Date(trip.departureDate), 'MMM d, yyyy')} at {trip.departureTime}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Return:</span>
                    <div className="font-medium">
                      {format(new Date(trip.returnDate), 'MMM d, yyyy')} at {trip.returnTime}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seat Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Select Seats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Number of Seats</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSeatCount(Math.max(1, seatCount - 1))}
                      disabled={seatCount <= 1}
                    >
                      -
                    </Button>
                    <span className="font-semibold text-lg w-8 text-center">{seatCount}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSeatCount(Math.min(maxSeats, seatCount + 1))}
                      disabled={seatCount >= maxSeats}
                    >
                      +
                    </Button>
                    <span className="text-sm text-gray-600">
                      {trip.availableSeats} seats available
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Passenger Details */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Passenger Details</Label>
                  {passengers.map((passenger, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Passenger {index + 1}</h4>
                        {seatCount > 1 && (
                          <Checkbox
                            checked={passenger.isLadies || false}
                            onCheckedChange={(checked) => 
                              updatePassenger(index, 'isLadies', checked)
                            }
                          >
                            Ladies Seat
                          </Checkbox>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Name *</Label>
                          <Input
                            value={passenger.name}
                            onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                            placeholder="Enter full name"
                          />
                        </div>
                        
                        <div>
                          <Label>Age *</Label>
                          <Input
                            type="number"
                            value={passenger.age || ''}
                            onChange={(e) => updatePassenger(index, 'age', parseInt(e.target.value) || 0)}
                            placeholder="Age"
                            min="1"
                            max="120"
                          />
                        </div>
                        
                        <div>
                          <Label>Gender *</Label>
                          <RadioGroup
                            value={passenger.gender}
                            onValueChange={(value) => updatePassenger(index, 'gender', value)}
                            className="flex gap-4 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="MALE" id={`male-${index}`} />
                              <Label htmlFor={`male-${index}`}>Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="FEMALE" id={`female-${index}`} />
                              <Label htmlFor={`female-${index}`}>Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="OTHER" id={`other-${index}`} />
                              <Label htmlFor={`other-${index}`}>Other</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      
                      <Checkbox
                        checked={passenger.isSeniorCitizen || false}
                        onCheckedChange={(checked) => 
                          updatePassenger(index, 'isSeniorCitizen', checked)
                        }
                      >
                        Senior Citizen (60+ years)
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Boarding Point */}
            <Card>
              <CardHeader>
                <CardTitle>Select Boarding Point</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedBoardingPoint}
                  onValueChange={setSelectedBoardingPoint}
                  className="space-y-3"
                >
                  {boardingPoints.map((point: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={point} id={`point-${index}`} />
                      <Label htmlFor={`point-${index}`} className="font-medium">
                        {point}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Terms and Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Please arrive at the boarding point 15 minutes before departure</p>
                  <p>• Carry valid ID proof for all passengers</p>
                  <p>• Follow temple dress code and guidelines</p>
                  <p>• Management is not responsible for loss of personal belongings</p>
                  <p>• Cancellation policy applies as per the trip details</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price per seat:</span>
                    <span>₹{trip.pricePerSeat.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of seats:</span>
                    <span>{seatCount}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-green-600">
                      ₹{calculateTotal().toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  {trip.advancePrice && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Advance per seat:</span>
                        <span>₹{trip.advancePrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total Advance:</span>
                        <span className="text-orange-600">
                          ₹{calculateAdvance().toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Remaining payment:</span>
                        <span>
                          ₹{(calculateTotal() - calculateAdvance()).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Trip:</span>
                    <span className="font-medium">{trip.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {format(new Date(trip.departureDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Boarding:</span>
                    <span className="font-medium text-xs">
                      {selectedBoardingPoint || 'Not selected'}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  size="lg"
                  onClick={handleBooking}
                  disabled={bookingLoading || !acceptTerms || !selectedBoardingPoint}
                >
                  {bookingLoading ? 'Processing...' : 'Proceed to Payment'}
                </Button>

                <p className="text-xs text-center text-gray-500">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Secure payment powered by Razorpay
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}