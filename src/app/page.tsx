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
import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/auth/AuthModal'

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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-3 w-3 mr-1" />
              Trusted by 10,000+ Devotees
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Weekend Temple Darshan
              <span className="block text-orange-600">Made Easy</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Book comfortable weekend trips to Khatu Shyam, Salasar Balaji and more. 
              AC buses, darshan assistance, and transparent pricing.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search destinations, temples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base"
            />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2" size="sm">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">Weekend Trips</h3>
              <p className="text-sm text-gray-600">Every weekend departure</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bus className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">AC Buses</h3>
              <p className="text-sm text-gray-600">Comfortable travel</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">Group Darshan</h3>
              <p className="text-sm text-gray-600">Special assistance</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">Multiple Pickup</h3>
              <p className="text-sm text-gray-600">Convenient locations</p>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">This Weekend</h2>
                <p className="text-gray-600">Join us for this weekend's spiritual journey</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {thisWeekendTrips.length} trips available
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Trips</h2>
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
                <p className="text-gray-500">No upcoming trips found</p>
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
              <h4 className="font-semibold mb-4">Popular Routes</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Delhi to Khatu Shyam</li>
                <li>Delhi to Salasar Balaji</li>
                <li>Delhi to Vaishno Devi</li>
                <li>Delhi to Ajmer</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Booking Policy</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
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
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  )
}