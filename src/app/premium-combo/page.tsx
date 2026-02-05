'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  Star,
  CheckCircle,
  Bus,
  Coffee,
  Camera,
  Shield,
  Heart,
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
  IndianRupee
} from 'lucide-react'
import Link from 'next/link'

interface Trip {
  id: string
  title: string
  description: string
  departureDate: string
  returnDate: string
  departureTime: string
  returnTime: string
  totalSeats: number
  availableSeats: number
  pricePerSeat: number
  advancePrice: number
  busType: string
  boardingPoints: string
  inclusions: string
  exclusions: string
  status: string
}

export default function PremiumComboLanding() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const response = await fetch('/api/trips')
      if (response.ok) {
        const result = await response.json()
        // Handle the API response structure
        const tripsData = result.data || result || []
        setTrips(Array.isArray(tripsData) ? tripsData : [])
      }
    } catch (error) {
      console.error('Error fetching trips:', error)
      setTrips([]) // Ensure trips is always an array
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString('en-IN', options)
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getDaysUntil = (dateString: string) => {
    const tripDate = new Date(dateString)
    const today = new Date()
    const diffTime = tripDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const itinerary = [
    {
      day: 'Saturday Night',
      time: '10:00 PM',
      title: '🚌 Departure from Delhi',
      description: 'Pickup points: Kashmiri Gate / Rohini / Gurgaon. Bhajan + overnight travel.',
      highlight: 'Comfortable overnight journey'
    },
    {
      day: 'Sunday Early Morning',
      time: '4:30 AM - 5:00 AM',
      title: '🌅 Arrival at Khatu Shyam ji',
      description: '5:00–9:00 AM - Darshan, Freshen-up, Tea / breakfast. Peak darshan time coverage.',
      highlight: 'Early morning darshan - best time!'
    },
    {
      day: 'Sunday Late Morning',
      time: '9:30 AM',
      title: '🙏 Travel to Salasar Balaji',
      description: '12:00–2:00 PM - Darshan and Lunch break. Both temples in same belt for smooth travel.',
      highlight: 'Two powerful temples in one day'
    },
    {
      day: 'Sunday Evening',
      time: '3:00 PM',
      title: '🏰 Mandawa Heritage Experience',
      description: '3:30–6:30 PM - Mandawa Fort visit, Local market, Tea & rest. Relaxing for elders & families.',
      highlight: 'Cultural heritage experience'
    },
    {
      day: 'Sunday Night',
      time: '7:00 PM',
      title: '🌙 Return Journey',
      description: 'Comfortable return journey with memories.',
      highlight: 'Overnight travel back home'
    },
    {
      day: 'Monday Early Morning',
      time: '5:00 AM - 6:00 AM',
      title: '🏠 Arrival in Delhi',
      description: 'Reach Delhi in time for office. Office-friendly timing.',
      highlight: 'Back to work on Monday!'
    }
  ]

  const inclusions = [
    { icon: Bus, text: 'Premium AC Bus Travel' },
    { icon: Coffee, text: 'Complimentary Tea & Breakfast' },
    { icon: Users, text: 'Experienced Driver & Guide' },
    { icon: Heart, text: 'Darshan Assistance' },
    { icon: Camera, text: 'Mandawa Heritage Walk' },
    { icon: Shield, text: 'Travel Insurance' },
    { icon: Phone, text: 'Emergency Support' },
    { icon: Sparkles, text: 'Premium Experience' }
  ]

  const whyChooseUs = [
    {
      icon: Clock,
      title: 'Jaldi Darshan',
      description: 'Early morning visit avoids rush and crowds'
    },
    {
      icon: IndianRupee,
      title: 'Cost Saving',
      description: 'No hotel stay = more savings for you'
    },
    {
      icon: Heart,
      title: 'Perfect Mix',
      description: 'Bhakti + Culture in one journey'
    },
    {
      icon: Calendar,
      title: 'Sunday Utilized',
      description: 'Full Sunday utilization, Monday office not missed'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Premium Combo Tour...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-2">
              🔱 PREMIUM COMBO TOUR
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Khatu Shyam ji + Salasar Balaji + Mandawa
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Experience the perfect blend of spirituality and culture
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="h-5 w-5" />
                <span>31-32 Hours</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="h-5 w-5" />
                <span>Delhi → Delhi</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="h-5 w-5" />
                <span>Premium AC Bus</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8">
                Book Now - ₹2,000
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Upcoming Dates */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            🗓️ Upcoming Tour Dates
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading upcoming tour dates...</p>
            </div>
          ) : trips.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No upcoming tours found</h3>
              <p className="text-gray-600 mb-6">We're currently updating our tour schedule. Please check back soon!</p>
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us for Custom Tours
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => {
                const daysUntil = getDaysUntil(trip.departureDate)
                const isAvailable = trip.availableSeats > 0
                
                return (
                <Card key={trip.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {formatDate(trip.departureDate)}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatTime(trip.departureTime)} - {formatTime(trip.returnTime)}
                        </p>
                      </div>
                      <Badge variant={isAvailable ? "default" : "secondary"}>
                        {isAvailable ? `${trip.availableSeats} seats` : "Sold Out"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Price per person:</span>
                        <span className="font-bold text-lg">₹{trip.pricePerSeat}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Advance:</span>
                        <span className="text-green-600 font-semibold">₹{trip.advancePrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Available seats:</span>
                        <span className="font-semibold">{trip.availableSeats}/{trip.totalSeats}</span>
                      </div>
                      {daysUntil > 0 && (
                        <div className="text-center">
                          <Badge variant="outline" className="w-full">
                            {daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days to go`}
                          </Badge>
                        </div>
                      )}
                      <Link href={`/booking/${trip.id}`}>
                        <Button 
                          className="w-full mt-4" 
                          disabled={!isAvailable}
                        >
                          {isAvailable ? 'Book Now' : 'Sold Out'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
            </div>
          )}
        </div>
      </section>

      {/* Detailed Itinerary */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            ⏰ Detailed Itinerary
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {itinerary.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{item.description}</p>
                      <Badge variant="secondary" className="bg-orange-50 text-orange-700">
                        {item.highlight}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            🎯 Why You'll Love This Tour
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {inclusions.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <span className="text-red-600">✕</span>
                  What's Not Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✕</span>
                    <span className="text-sm">Lunch & Dinner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✕</span>
                    <span className="text-sm">Personal Shopping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✕</span>
                    <span className="text-sm">Temple Donations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">✕</span>
                    <span className="text-sm">Any other personal expenses</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-yellow-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for the Ultimate Weekend Experience?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join us on this spiritual and cultural journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8">
              <Phone className="mr-2 h-5 w-5" />
              Call: +91-9876543210
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}