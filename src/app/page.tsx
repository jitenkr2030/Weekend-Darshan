'use client'

import { useState, useEffect } from 'react'
import { Trip } from '@/types'
import { TripCard } from '@/components/trip-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Filter, Calendar, MapPin, Bus, Users, Star, Phone, User, LogOut, Clock, Shield, Check, AlertCircle, MessageCircle, Gift, Zap } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/auth-context'
import { MobileNavigation } from '@/components/mobile-navigation'
import { PWAInstallBanner } from '@/components/pwa-install-banner'
import { LoginModal } from '@/components/auth/login-modal'
import { WhatsAppButton } from '@/components/whatsapp-button'

// Progress component
const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
)

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
        if (data.message === 'Database ready, needs seeding') {
          const seedResponse = await fetch('/api/seed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          })
          
          if (seedResponse.ok) {
            const retryResponse = await fetch('/api/trips')
            const retryData = await retryResponse.json()
            if (retryData.success) {
              setTrips(retryData.data)
            }
          }
        } else {
          setTrips(data.data)
        }
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

  // Get first few trips for display
  const displayTrips = filteredTrips.slice(0, 8)
  const availableSeats = displayTrips.reduce((sum, trip) => sum + trip.availableSeats, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileNavigation />
            <Bus className="h-6 w-6 text-orange-600" />
            <h1 className="text-lg sm:text-xl font-bold text-orange-600">WeekendDarshan</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <a href="#" className="text-sm font-medium hover:text-orange-600 transition-colors">Home</a>
            <a href="/rajasthan-tour" className="text-sm font-medium hover:text-orange-600 transition-colors">Rajasthan</a>
            <a href="/braj-yatra" className="text-sm font-medium hover:text-orange-600 transition-colors">Braj Yatra</a>
            <a href="/ganga-yatra" className="text-sm font-medium hover:text-orange-600 transition-colors">Ganga Yatra</a>
            <a href="/vaishno-devi" className="text-sm font-medium hover:text-orange-600 transition-colors">Vaishno Devi</a>
            <a href="/my-bookings" className="text-sm font-medium hover:text-orange-600 transition-colors">My Bookings</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Phone className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">+91-8700189551</span>
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
              <Button size="sm" onClick={() => setIsAuthModalOpen(true)} className="hidden sm:flex">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 py-12 sm:py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-6 sm:mb-8">
            <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 sm:px-4 py-2">
              🚀 Premium Weekend Tours
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              WeekendDarshan
              <span className="block text-yellow-200 text-xl sm:text-2xl md:text-3xl mt-2">Your Spiritual Journey, Simplified</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed">
              Weekend Temple Tours from Delhi — Travel Saturday Night, Return Monday Morning<br/>
              <span className="text-yellow-200 font-semibold">Experience divine darshan without taking leave from work.</span><br/>
              Comfortable buses, planned itineraries, and smooth darshan flow — all handled for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <Zap className="h-5 w-5 mr-2" />
                Book in 2 minutes. Travel this weekend.
              </Button>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="text-lg font-semibold">Call / WhatsApp: +91-8700189551</span>
              </div>
            </div>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-6 py-3 rounded-full">
              View This Weekend Tours
            </Button>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="bg-red-50 border-y border-red-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span className="font-bold text-lg">🔥 Limited Seats – Most trips sell out by Friday evening</span>
            <span className="text-sm text-red-600">({availableSeats} seats left across all tours)</span>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">🔱 Featured Weekend Tours</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Perfect weekend getaways for spiritual seekers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Rajasthan Tour */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                <Badge className="bg-white/20 text-white mb-3 inline-block">🔱 Rajasthan Premium Combo</Badge>
                <h3 className="text-2xl font-bold mb-2">Khatu Shyam Ji Temple + Salasar Balaji Temple + Mandawa</h3>
                <p className="text-white/90">Powerful temple blessings + heritage Shekhawati experience</p>
                
                <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
                  <div className="text-center">
                    <Clock className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">31–32 Hours</div>
                    <div className="text-white/80">Total</div>
                  </div>
                  <div className="text-center">
                    <Bus className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">Premium AC</div>
                    <div className="text-white/80">Push-Back</div>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">3 Sacred</div>
                    <div className="text-white/80">Destinations</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">💰 ₹2,000 – All Inclusive</div>
                    <div className="text-sm text-gray-500">Travel + Darshan + Food + T-Shirt + Insurance</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Sat 10:00 PM</div>
                    <div className="text-sm text-gray-600">Mon 5:30 AM</div>
                  </div>
                </div>
                
                <a href="/rajasthan-tour">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors">
                    Explore Rajasthan Tour
                  </Button>
                </a>
              </div>
            </div>

            {/* Braj Yatra Tour */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                <Badge className="bg-white/20 text-white mb-3 inline-block">🕉️ Braj Yatra Special</Badge>
                <h3 className="text-2xl font-bold mb-2">Mathura + Vrindavan + Taj Mahal</h3>
                <p className="text-white/90">Krishna bhakti + world heritage experience</p>
                
                <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
                  <div className="text-center">
                    <Clock className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">31–32 Hours</div>
                    <div className="text-white/80">Total</div>
                  </div>
                  <div className="text-center">
                    <Bus className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">Luxury AC</div>
                    <div className="text-white/80">Semi-Sleeper</div>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">6 Divine</div>
                    <div className="text-white/80">Heritage Sites</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">💰 ₹1,800 – All Inclusive</div>
                    <div className="text-sm text-gray-500">Travel + Darshan + Food + T-Shirt + Insurance</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Sat 10:00 PM</div>
                    <div className="text-sm text-gray-600">Mon 5:30 AM</div>
                  </div>
                </div>
                
                <a href="/braj-yatra">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors">
                    Explore Braj Yatra
                  </Button>
                </a>
              </div>
            </div>

            {/* Ganga Yatra Tour */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <Badge className="bg-white/20 text-white mb-3 inline-block">🌊 Ganga Yatra</Badge>
                <h3 className="text-2xl font-bold mb-2">Har Ki Pauri + Rishikesh + Neelkanth Mahadev Temple</h3>
                <p className="text-white/90">Ganga darshan + peaceful Himalayan spiritual energy</p>
                
                <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
                  <div className="text-center">
                    <Clock className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">32–34 Hours</div>
                    <div className="text-white/80">Total</div>
                  </div>
                  <div className="text-center">
                    <Bus className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">Deluxe AC</div>
                    <div className="text-white/80">Push-Back</div>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">5 Spiritual</div>
                    <div className="text-white/80">Locations</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">💰 ₹2,100 – All Inclusive</div>
                    <div className="text-sm text-gray-500">Travel + Darshan + Food + T-Shirt + Insurance</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Sat 10:00 PM</div>
                    <div className="text-sm text-gray-600">Mon 6:00 AM</div>
                  </div>
                </div>
                
                <a href="/ganga-yatra">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                    Explore Ganga Yatra
                  </Button>
                </a>
              </div>
            </div>

            {/* Vaishno Devi Tour */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6 text-white">
                <Badge className="bg-white/20 text-white mb-3 inline-block">🔯 Vaishno Devi Express (Premium)</Badge>
                <h3 className="text-2xl font-bold mb-2">Vaishno Devi Temple – Katra Weekend Experience</h3>
                <p className="text-white/90">Mata ka bulawa — express darshan with comfort</p>
                
                <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
                  <div className="text-center">
                    <Clock className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">38–40 Hours</div>
                    <div className="text-white/80">Total</div>
                  </div>
                  <div className="text-center">
                    <Bus className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">Premium Volvo</div>
                    <div className="text-white/80">Sleeper</div>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-bold">2 Divine</div>
                    <div className="text-white/80">Destinations</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-pink-600">💰 ₹3,500 – All Inclusive</div>
                    <div className="text-sm text-gray-500">Travel + Darshan + Food + T-Shirt + Insurance</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Sat 4:00 PM</div>
                    <div className="text-sm text-gray-600">Mon 6:00 AM</div>
                  </div>
                </div>
                
                <a href="/vaishno-devi">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-colors">
                    Explore Vaishno Devi Tour
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">⭐ Why People Choose WeekendDarshan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Built by devotees, for devotees</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Perfect Timing</h3>
              <p className="text-gray-600">Travel weekend only — reach office Monday morning</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Bus className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Comfortable & Safe</h3>
              <p className="text-gray-600">Verified buses + trained drivers + clean seating</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Darshan-Focused</h3>
              <p className="text-gray-600">Timings designed for maximum darshan success</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Group Friendly</h3>
              <p className="text-gray-600">Special pricing for families & groups</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 italic">
              👨‍💼 "Built by a devotee who travelled these routes himself and solved every problem."
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">🌟 What Makes WeekendDarshan Special</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We don't just take you to temples... we take care of your entire spiritual journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Bus className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Comfortable Travel</h3>
              <p className="text-gray-600">Premium AC buses with experienced drivers and clean seating</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Guaranteed Darshan</h3>
              <p className="text-gray-600">Optimized timings and planned flow for maximum darshan success</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Food Included</h3>
              <p className="text-gray-600">Hygienic meals at clean stops during the journey</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Safety Covered</h3>
              <p className="text-gray-600">Travel insurance and emergency support throughout the journey</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Rewards for Every Trip</h3>
              <p className="text-gray-600">Loyalty points, discounts, and exclusive member benefits</p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Community Experience</h3>
              <p className="text-gray-600">Join fellow devotees and make your spiritual journey memorable</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
              <div className="bg-orange-100 rounded-full p-2">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">🎯 Built by Devotees, For Devotees</div>
                <div className="text-sm text-gray-600">"Built by a devotee who personally travelled these routes and removed every pain point."</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Availability */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">🎉 This Weekend's Tours (Live Availability)</h2>
            <div className="flex items-center justify-center gap-2 text-red-600 mb-6">
              <AlertCircle className="h-5 w-5" />
              <span className="font-semibold">🔥 Almost Full - Limited seats remaining!</span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayTrips.map((trip) => (
                <div key={trip.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={trip.availableSeats < 10 ? "destructive" : "secondary"}>
                        {trip.availableSeats < 10 ? "Almost Full" : "Available"}
                      </Badge>
                      <span className="text-sm text-gray-500">{trip.availableSeats} seats left</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{trip.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-orange-600">₹{trip.pricePerSeat}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(trip.departureDate).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <Button 
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                      onClick={() => window.location.href = `/book/${trip.id}`}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Simple Booking Process */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">💳 Simple Booking Process</h2>
            <p className="text-lg text-gray-600">Book your spiritual journey in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Select Your Tour</h3>
              <p className="text-gray-600">Choose from multiple weekend options</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Choose Seats</h3>
              <p className="text-gray-600">Select number of passengers</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Pay Small Advance</h3>
              <p className="text-gray-600">Secure payment with multiple options</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Get Ticket</h3>
              <p className="text-gray-600">WhatsApp ticket + boarding details</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
              <Check className="h-5 w-5" />
              <span className="font-semibold">Digital ticket + QR code provided</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">🔐 Trust & Safety Section</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">100% Verified Buses</h3>
                <p className="text-gray-600">All buses are verified and regularly inspected</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Experienced Drivers</h3>
                <p className="text-gray-600">Professional drivers with route experience</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Emergency Support</h3>
                <p className="text-gray-600">24/7 support during your journey</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Transparent Pricing</h3>
                <p className="text-gray-600">No hidden costs - what you see is what you pay</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Female Traveler Safety</h3>
                <p className="text-gray-600">Special arrangements for female passengers</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">COVID Safety Measures</h3>
                <p className="text-gray-600">All safety protocols followed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strong CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">🙏 Plan Your Darshan This Weekend</h2>
          <p className="text-xl mb-8 text-orange-100">Seats fill fast every week.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Book Now & Confirm Your Seat
            </Button>
            <div className="flex items-center gap-2">
              <Phone className="h-6 w-6" />
              <span className="text-xl font-semibold">📞 Call / WhatsApp: +91-8700189551</span>
            </div>
          </div>

          {/* First-time offer */}
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full">
            <Gift className="h-5 w-5" />
            <span className="font-bold">🎯 First-time offer: Flat ₹200 OFF - Use code: DARSHAN200</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bus className="h-6 w-6 text-orange-500" />
                <h3 className="text-xl font-bold">WeekendDarshan</h3>
              </div>
              <p className="text-gray-400">Making weekend temple darshan comfortable & accessible</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Popular Destinations</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/rajasthan-tour" className="hover:text-orange-400">Khatu Shyam Ji</a></li>
                <li><a href="/rajasthan-tour" className="hover:text-orange-400">Salasar Balaji</a></li>
                <li><a href="/braj-yatra" className="hover:text-orange-400">Mathura & Vrindavan</a></li>
                <li><a href="/ganga-yatra" className="hover:text-orange-400">Haridwar & Rishikesh</a></li>
                <li><a href="/vaishno-devi" className="hover:text-orange-400">Vaishno Devi (Katra)</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 Phone / WhatsApp: +91-8700189551</li>
                <li>📧 Email: info@weekenddarshan.com</li>
                <li>🕐 24/7 Customer Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/my-bookings" className="hover:text-orange-400">My Bookings</a></li>
                <li><a href="#" className="hover:text-orange-400">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WeekendDarshan. All rights reserved.</p>
            <p>Built with ❤️ for devotees by devotees</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <LoginModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      )}

      {/* PWA Install Banner */}
      <PWAInstallBanner />
    </div>
  )
}