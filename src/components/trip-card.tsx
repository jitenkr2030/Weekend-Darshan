'use client'

import { Trip } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Users, IndianRupee, Star } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

interface TripCardProps {
  trip: Trip
  onBookNow?: (trip: Trip) => void
}

export function TripCard({ trip, onBookNow }: TripCardProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEE, MMM d, yyyy')
  }

  const formatTime = (time: string) => {
    return time
  }

  const getSeatStatus = () => {
    const filledPercentage = ((trip.totalSeats - trip.availableSeats) / trip.totalSeats) * 100
    
    if (filledPercentage >= 90) return { status: 'Filling Fast', color: 'destructive' }
    if (filledPercentage >= 70) return { status: 'Limited Seats', color: 'secondary' }
    return { status: 'Available', color: 'default' }
  }

  const seatStatus = getSeatStatus()

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            <Link 
              href={`/trip/${trip.id}`}
              className="hover:text-orange-600 transition-colors"
            >
              {trip.title}
            </Link>
          </CardTitle>
          <Badge variant={seatStatus.color as any} className="ml-2 shrink-0">
            {seatStatus.status}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{trip.route.origin} → {trip.route.destination}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">Departure</div>
              <div className="text-muted-foreground">{formatDate(trip.departureDate)}</div>
              <div className="text-muted-foreground">{formatTime(trip.departureTime)}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">Return</div>
              <div className="text-muted-foreground">{formatDate(trip.returnDate)}</div>
              <div className="text-muted-foreground">{formatTime(trip.returnTime)}</div>
            </div>
          </div>
        </div>

        {/* Trip Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {trip.description}
        </p>

        {/* Bus Type and Duration */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{trip.busType}</Badge>
            {trip.route.duration && (
              <span className="text-muted-foreground">
                {trip.route.duration} hrs journey
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {trip.availableSeats}/{trip.totalSeats} seats
            </span>
          </div>
        </div>

        {/* Temple Info */}
        <div className="flex items-center gap-2 text-sm">
          <Star className="h-4 w-4 text-orange-500" />
          <span className="font-medium">{trip.temple.name}</span>
          <span className="text-muted-foreground">• {trip.temple.city}</span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <div className="flex items-center gap-1">
              <IndianRupee className="h-4 w-4" />
              <span className="text-xl font-bold text-green-600">
                {trip.pricePerSeat.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-muted-foreground">per seat</span>
            </div>
            {trip.advancePrice && (
              <div className="text-xs text-muted-foreground">
                Advance: ₹{trip.advancePrice.toLocaleString('en-IN')}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Link href={`/trip/${trip.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            <Link href={`/book/${trip.id}`}>
              <Button 
                disabled={trip.availableSeats === 0}
                size="sm"
              >
                {trip.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}