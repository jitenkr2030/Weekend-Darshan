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
  IndianRupee,
  Temple,
  Mountain,
  Water,
  Crown
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
  const [selectedTour, setSelectedTour] = useState<string>('all')

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const response = await fetch('/api/trips')
      if (response.ok) {
        const result = await response.json()
        const tripsData = result.data || result || []
        setTrips(Array.isArray(tripsData) ? tripsData : [])
      }
    } catch (error) {
      console.error('Error fetching trips:', error)
      setTrips([])
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

  const tourPackages = [
    {
      id: 'rajasthan',
      name: 'Rajasthan Special',
      subtitle: 'Khatu Shyam + Salasar Balaji + Mandawa',
      price: 2000,
      duration: '31-32 Hours',
      icon: '🔱',
      color: 'orange',
      description: 'Experience the perfect blend of spirituality and culture',
      highlights: [
        'Early morning darshan - best time!',
        'Two powerful temples in one day',
        'Cultural heritage experience',
        'Comfortable overnight journey'
      ],
      itinerary: [
        { time: '10:00 PM', title: '🚌 Departure from Delhi', desc: 'Pickup points: Kashmiri Gate / Rohini / Gurgaon' },
        { time: '4:30 AM', title: '🌅 Arrival at Khatu Shyam ji', desc: '5:00–9:00 AM - Darshan, Freshen-up, Tea / breakfast' },
        { time: '9:30 AM', title: '🙏 Travel to Salasar Balaji', desc: '12:00–2:00 PM - Darshan and Lunch break' },
        { time: '3:00 PM', title: '🏰 Mandawa Heritage Experience', desc: '3:30–6:30 PM - Mandawa Fort visit, Local market' },
        { time: '7:00 PM', title: '🌙 Return Journey', desc: 'Comfortable return journey with memories' },
        { time: '5:00 AM', title: '🏠 Arrival in Delhi', desc: 'Reach Delhi in time for office' }
      ]
    },
    {
      id: 'braj',
      name: 'Braj Yatra',
      subtitle: 'Mathura + Vrindavan + Agra',
      price: 1800,
      duration: '31-32 Hours',
      icon: '🕉️',
      color: 'purple',
      description: 'Divine Krishna land with magnificent Taj Mahal',
      highlights: [
        'Krishna Janmabhoomi darshan',
        'Banke Bihari & ISKCON temples',
        'Taj Mahal sunset view',
        'Heritage walk in Agra'
      ],
      itinerary: [
        { time: '10:00 PM', title: '🚌 Departure from Delhi', desc: 'Pickup points: Kashmiri Gate / Noida / Faridabad' },
        { time: '2:30 AM', title: '🌅 Arrival at Mathura', desc: '2:30–6:00 AM - Krishna Janmabhoomi, Vishram Ghat' },
        { time: '6:30 AM', title: '🕉️ Vrindavan Temples', desc: '6:30–11:30 AM - Banke Bihari, ISKCON, Prem Mandir' },
        { time: '1:00 PM', title: '🍽️ Lunch', desc: '12:00–1:00 PM - Lunch at premium restaurant' },
        { time: '3:00 PM', title: '🌄 Agra Heritage', desc: '3:30–7:00 PM - Taj Mahal, Agra Fort, local market' },
        { time: '8:00 PM', title: '🌙 Return Journey', desc: '8:00 PM departure, arrive Delhi 5:00-6:00 AM' }
      ]
    },
    {
      id: 'ganga',
      name: 'Ganga Yatra',
      subtitle: 'Haridwar + Rishikesh + Neelkanth',
      price: 2100,
      duration: '32-34 Hours',
      icon: '🌊',
      color: 'blue',
      description: 'Ganga Darshan + Spiritual Calm in Himalayan foothills',
      highlights: [
        'Har Ki Pauri morning aarti',
        'Laxman & Ram Jhula bridges',
        'Neelkanth Mahadev temple',
        'Himalayan mountain views'
      ],
      itinerary: [
        { time: '10:00 PM', title: '🚌 Departure from Delhi', desc: 'Pickup points: Kashmiri Gate / Noida / Ghaziabad' },
        { time: '5:00 AM', title: '🌅 Haridwar Darshan', desc: '5:30–7:30 AM - Har Ki Pauri, Ganga Snan, Tea break' },
        { time: '9:00 AM', title: '🛕 Rishikesh Temples', desc: '9:00 AM–12:30 PM - Laxman Jhula, Ram Jhula, Parmarth Niketan' },
        { time: '1:00 PM', title: '🍽️ Lunch', desc: '1:00–2:00 PM - Lunch at fixed restaurant' },
        { time: '3:30 PM', title: '🌄 Neelkanth Mahadev', desc: '3:30–6:30 PM - Temple darshan, evening aarti, sunset views' },
        { time: '7:00 PM', title: '🌙 Return Journey', desc: '7:00 PM departure, arrive Delhi 5:00-6:00 AM' }
      ]
    },
    {
      id: 'vaishno',
      name: 'Vaishno Devi Express',
      subtitle: 'Katra – Weekend Mini Experience',
      price: 3500,
      duration: '38-40 Hours',
      icon: '🔯',
      color: 'pink',
      description: 'Mata Ka Bulawa – Weekend Express Darshan',
      highlights: [
        'Premium AC Volvo Sleeper',
        'Complete yatra assistance',
        'Safe daylight darshan timing',
        'Emotional spiritual journey'
      ],
      itinerary: [
        { time: '4:00 PM', title: '🚌 Departure from Delhi', desc: 'Early evening departure for safe darshan timing' },
        { time: '6:00 AM', title: '🌅 Arrival in Katra', desc: '6:00–7:00 AM - Freshen up, breakfast (self-paid)' },
        { time: '8:00 AM', title: '🚶‍♂️ Start Yatra', desc: '8:00–9:00 AM - Start from Banganga (on foot/pony/palki)' },
        { time: '4:00 PM', title: '🙏 Darshan Window', desc: '4:00–8:00 PM - Darshan (crowd dependent)' },
        { time: '10:30 PM', title: '🌙 Return Journey', desc: '10:30–11:30 PM - Departure from Katra' },
        { time: '5:00 AM', title: '🏠 Arrival in Delhi', desc: '5:00–7:00 AM - Arrival in Delhi' }
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      orange: {
        bg: 'from-orange-600 via-orange-500 to-yellow-500',
        light: 'from-orange-50 via-white to-yellow-50',
        badge: 'bg-orange-100 text-orange-700',
        button: 'bg-orange-600 hover:bg-orange-700',
        text: 'text-orange-600'
      },
      purple: {
        bg: 'from-purple-600 via-purple-500 to-pink-500',
        light: 'from-purple-50 via-white to-pink-50',
        badge: 'bg-purple-100 text-purple-700',
        button: 'bg-purple-600 hover:bg-purple-700',
        text: 'text-purple-600'
      },
      blue: {
        bg: 'from-blue-600 via-blue-500 to-cyan-500',
        light: 'from-blue-50 via-white to-cyan-50',
        badge: 'bg-blue-100 text-blue-700',
        button: 'bg-blue-600 hover:bg-blue-700',
        text: 'text-blue-600'
      },
      pink: {
        bg: 'from-pink-600 via-pink-500 to-rose-500',
        light: 'from-pink-50 via-white to-rose-50',
        badge: 'bg-pink-100 text-pink-700',
        button: 'bg-pink-600 hover:bg-pink-700',
        text: 'text-pink-600'
      }
    }
    return colors[color as keyof typeof colors] || colors.orange
  }

  const filteredTrips = selectedTour === 'all' 
    ? trips 
    : trips.filter(trip => trip.title.toLowerCase().includes(selectedTour))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Premium Combo Tours...</p>
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
              ⭐ PREMIUM COMBO TOURS
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Complete Weekend Spiritual Experience
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Choose from our carefully curated weekend pilgrimage tours
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="h-5 w-5" />
                <span>Weekend Tours</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="h-5 w-5" />
                <span>Multiple Destinations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="h-5 w-5" />
                <span>Premium AC Buses</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8">
                Explore Tours
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

      {/* Tour Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedTour === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedTour('all')}
              className="px-6"
            >
              All Tours
            </Button>
            {tourPackages.map((tour) => (
              <Button
                key={tour.id}
                variant={selectedTour === tour.id ? 'default' : 'outline'}
                onClick={() => setSelectedTour(tour.id)}
                className="px-6"
              >
                {tour.icon} {tour.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Packages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            🎯 Choose Your Spiritual Journey
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {tourPackages.map((tour) => {
              const colors = getColorClasses(tour.color)
              return (
                <Card key={tour.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${colors.bg}`}></div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{tour.icon}</span>
                        <div>
                          <CardTitle className="text-xl">{tour.name}</CardTitle>
                          <p className="text-sm text-gray-600">{tour.subtitle}</p>
                        </div>
                      </div>
                      <Badge className={`${colors.badge} font-bold`}>
                        ₹{tour.price}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{tour.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">AC Bus</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/book/${tour.id}`} className="flex-1">
                        <Button className={`w-full ${colors.button} text-white`}>
                          Book Now
                        </Button>
                      </Link>
                      <Link href={`/${tour.id}-tour`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Dates */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            🗓️ Upcoming Tour Dates
          </h2>
          
          {filteredTrips.length === 0 ? (
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
              {filteredTrips.map((trip) => {
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
                      <Link href={`/book/${trip.id}`}>
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

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            🎯 Why Choose WeekendDarshan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: 'No Leave Required',
                description: 'Perfect weekend trips that don\'t affect your work schedule'
              },
              {
                icon: IndianRupee,
                title: 'Best Prices',
                description: 'Affordable packages with premium comfort and service'
              },
              {
                icon: Heart,
                title: 'Spiritual Focus',
                description: 'Well-planned darshan timing for the best experience'
              },
              {
                icon: Shield,
                title: 'Safe Travel',
                description: 'Experienced drivers and well-maintained buses'
              }
            ].map((item, index) => (
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

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            💬 What Our Devotees Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ramesh Kumar",
                tour: "Rajasthan Special",
                text: "Amazing experience! Early morning darshan was so peaceful. Well-organized trip.",
                rating: 5
              },
              {
                name: "Priya Sharma",
                tour: "Braj Yatra",
                text: "The combination of Krishna temples and Taj Mahal was perfect. Guide was very knowledgeable.",
                rating: 5
              },
              {
                name: "Amit Singh",
                tour: "Ganga Yatra",
                text: "Har Ki Pauri aarti was divine. Neelkanth temple views were breathtaking.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.tour}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for Your Spiritual Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Book your weekend darshan tour today and experience the divine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8">
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +91 98765 43210
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}