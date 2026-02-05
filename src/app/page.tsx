'use client'

import { useState, useEffect } from 'react'
import { Trip } from '@/types'
import { TripCard } from '@/components/trip-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Filter, Calendar, MapPin, Bus, Users, Star, Phone, User, LogOut } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/auth-context'
import { LoginModal } from '@/components/auth/login-modal'

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    fetchTrips()
  }, [])

  const handleLogout = async () => {
    await logout()
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
    })
  }

  const fetchTrips = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/trips')
      const data = await response.json()
      
      if (data.success) {
        setTrips(data.data)
      } else {
        throw new Error(data.error || 'Failed to fetch trips')
      }
    } catch (error) {
      console.error('Error fetching trips:', error)
      toast({
        title: 'Error',
        description: 'Failed to load trips. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.route.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.temple.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const thisWeekendTrips = filteredTrips.filter(trip => {
    const tripDate = new Date(trip.departureDate)
    const today = new Date()
    const thisSaturday = new Date(today)
    thisSaturday.setDate(today.getDate() + (6 - today.getDay()) + (today.getDay() > 6 ? 7 : 0))
    const thisSunday = new Date(thisSaturday)
    thisSunday.setDate(thisSaturday.getDate() + 1)
    
    return tripDate >= thisSaturday && tripDate <= thisSunday
  })

  const upcomingTrips = filteredTrips.filter(trip => {
    const tripDate = new Date(trip.departureDate)
    const today = new Date()
    const thisSaturday = new Date(today)
    thisSaturday.setDate(today.getDate() + (6 - today.getDay()) + (today.getDay() > 6 ? 7 : 0))
    const thisSunday = new Date(thisSaturday)
    thisSunday.setDate(thisSaturday.getDate() + 1)
    
    return !(tripDate >= thisSaturday && tripDate <= thisSunday)
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bus className="h-6 w-6 text-orange-600" />
            <h1 className="text-xl font-bold text-orange-600">WeekendDarshan</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-orange-600 transition-colors">Home</a>
            <a href="/rajasthan-tour" className="text-sm font-medium hover:text-orange-600 transition-colors">Rajasthan</a>
            <a href="/braj-yatra" className="text-sm font-medium hover:text-orange-600 transition-colors">Braj Yatra</a>
            <a href="/ganga-yatra" className="text-sm font-medium hover:text-orange-600 transition-colors">Ganga Yatra</a>
            <a href="/vaishno-devi" className="text-sm font-medium hover:text-orange-600 transition-colors">Vaishno Devi</a>
            <a href="/my-bookings" className="text-sm font-medium hover:text-orange-600 transition-colors">My Bookings</a>
            <a href="#" className="text-sm font-medium hover:text-orange-600 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              +91-9876543210
            </Button>
            
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:block">
                  {user.name || user.mobile}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => setIsAuthModalOpen(true)}>
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section - Dual Tours */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 py-12 md:py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-sm px-4 py-2">
              🚌 WEEKEND SPIRITUAL TOURS
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              WeekendDarshan
              <span className="block text-yellow-200">Your Spiritual Journey, Simplified</span>
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-10">
              Choose from our exclusive weekend tours - experience divine blessings and cultural heritage 
              with comfortable travel, expert guidance, and perfect timing for working professionals.
            </p>
          </div>

          {/* Tour Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Rajasthan Tour */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="mb-4">
                <Badge className="bg-orange-500 text-white mb-3">🔱 RAJASTHAN SPECIAL</Badge>
                <h2 className="text-2xl font-bold mb-2">Khatu Shyam + Salasar Balaji + Mandawa</h2>
                <p className="text-white/80 text-sm">Powerful temples + heritage town experience</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">31-32</div>
                  <div className="text-sm text-white/80">Hours Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹2,000</div>
                  <div className="text-sm text-white/80">Per Person</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-6 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Sat 10:00 PM - Mon 5:30 AM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Bus className="h-4 w-4" />
                  <span>Premium AC Push-Back</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>3 Sacred Destinations</span>
                </div>
              </div>
              
              <a href="/rajasthan-tour">
                <Button className="w-full bg-white text-orange-600 hover:bg-orange-50 font-semibold">
                  Explore Rajasthan Tour
                </Button>
              </a>
            </div>

            {/* Braj Yatra Tour */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="mb-4">
                <Badge className="bg-purple-500 text-white mb-3">🕉️ BRAJ YATRA</Badge>
                <h2 className="text-2xl font-bold mb-2">Mathura + Vrindavan + Agra</h2>
                <p className="text-white/80 text-sm">Krishna's land + Taj Mahal experience</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">31-32</div>
                  <div className="text-sm text-white/80">Hours Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹1,800</div>
                  <div className="text-sm text-white/80">Per Person</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-6 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Sat 10:00 PM - Mon 5:30 AM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Bus className="h-4 w-4" />
                  <span>Luxury AC Semi-Sleeper</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>6 Divine & Heritage Sites</span>
                </div>
              </div>
              
              <Button className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold">
                Explore Braj Yatra
              </Button>
            </div>

            {/* Ganga Yatra Tour */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="mb-4">
                <Badge className="bg-blue-500 text-white mb-3">🌊 GANGA YATRA</Badge>
                <h2 className="text-2xl font-bold mb-2">Haridwar + Rishikesh + Neelkanth</h2>
                <p className="text-white/80 text-sm">Ganga darshan + spiritual calm experience</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">32-34</div>
                  <div className="text-sm text-white/80">Hours Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹2,100</div>
                  <div className="text-sm text-white/80">Per Person</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-6 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Sat 10:00 PM - Mon 6:00 AM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Bus className="h-4 w-4" />
                  <span>Deluxe AC Push-Back</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>5 Sacred & Spiritual Sites</span>
                </div>
              </div>
              
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                Explore Ganga Yatra
              </Button>
            </div>

            {/* Vaishno Devi Tour */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="mb-4">
                <Badge className="bg-pink-500 text-white mb-3">🔯 VAISHNO DEVI EXPRESS</Badge>
                <h2 className="text-2xl font-bold mb-2">Katra – Weekend Mini Experience</h2>
                <p className="text-white/80 text-sm">Mata Ka Bulawa - Shakti darshan</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">38-40</div>
                  <div className="text-sm text-white/80">Hours Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹3,500</div>
                  <div className="text-sm text-white/80">Per Person</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-6 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Sat 4:00 PM - Mon 6:00 AM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Bus className="h-4 w-4" />
                  <span>Premium AC Volvo Sleeper</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>2 Divine Destinations</span>
                </div>
              </div>
              
              <Button className="w-full bg-white text-pink-600 hover:bg-pink-50 font-semibold">
                Explore Vaishno Devi
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8">
              <Phone className="mr-2 h-5 w-5" />
              Call: +91-9876543210
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Why Choose WeekendDarshan?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">Perfect Timing</h3>
              <p className="text-sm text-gray-600">Weekend trips, back by Monday morning</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bus className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">Comfort Travel</h3>
              <p className="text-sm text-gray-600">AC buses with professional drivers</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">Multiple Tours</h3>
              <p className="text-sm text-gray-600">Rajasthan & Braj Yatra options</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">Divine Experience</h3>
              <p className="text-sm text-gray-600">Spiritual destinations with expert guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* This Weekend Trips */}
      {thisWeekendTrips.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 This Weekend's Tours</h2>
                <p className="text-gray-600">Join us for this weekend's exclusive spiritual journeys</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {thisWeekendTrips.length} tours available
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              ) : (
                thisWeekendTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Trips */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">📅 Upcoming Tour Dates</h2>
              <p className="text-gray-600">Plan your spiritual journey in advance</p>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : upcomingTrips.length > 0 ? (
              upcomingTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No upcoming tours found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bus className="h-6 w-6 text-orange-400" />
                <h3 className="text-lg font-bold">WeekendDarshan</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Making weekend temple darshan comfortable and accessible for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Rajasthan & Braj</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>🔱 Khatu Shyam ji</li>
                <li>🔱 Salasar Balaji</li>
                <li>🕉️ Mathura Temples</li>
                <li>🕉️ Taj Mahal</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ganga & Vaishno</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>🌊 Har Ki Pauri</li>
                <li>🌊 Neelkanth Mahadev</li>
                <li>🔯 Vaishno Devi</li>
                <li>🔯 Katra Yatra</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Phone: +91-9876543210</li>
                <li>WhatsApp: +91-9876543210</li>
                <li>Email: info@weekenddarshan.com</li>
                <li>24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 WeekendDarshan. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <LoginModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  )
}