'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Bus, 
  Users, 
  IndianRupee, 
  Calendar,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  LogOut,
  MapPin
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [trips, setTrips] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalTrips: 0,
    totalBookings: 0,
    totalRevenue: 0,
    upcomingTrips: 0
  })

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem('adminSession')
    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch trips
      const tripsResponse = await fetch('/api/trips')
      const tripsData = await tripsResponse.json()
      if (tripsData.success) {
        setTrips(tripsData.data)
      }

      // Fetch bookings
      const bookingsResponse = await fetch('/api/bookings')
      const bookingsData = await bookingsResponse.json()
      if (bookingsData.success) {
        setBookings(bookingsData.data)
      }

      // Calculate stats
      if (tripsData.success && bookingsData.success) {
        const totalRevenue = bookingsData.data.reduce((sum: number, booking: any) => {
          return booking.paymentStatus === 'FULL_PAID' ? sum + booking.totalAmount : sum
        }, 0)

        const upcomingTrips = tripsData.data.filter((trip: any) => 
          new Date(trip.departureDate) > new Date()
        ).length

        setStats({
          totalTrips: tripsData.data.length,
          totalBookings: bookingsData.data.length,
          totalRevenue,
          upcomingTrips
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminSession')
    router.push('/admin/login')
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-96 w-full rounded-lg" />
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
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Site
            </Button>
            <div className="flex items-center gap-2">
              <Bus className="h-6 w-6 text-orange-600" />
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
          </div>
          
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Trips</p>
                    <p className="text-3xl font-bold">{stats.totalTrips}</p>
                  </div>
                  <Bus className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-3xl font-bold">{stats.totalBookings}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-3xl font-bold text-green-600">
                      ₹{stats.totalRevenue.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-3xl font-bold">{stats.upcomingTrips}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4">
            <Link href="/admin/trips/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Trip
              </Button>
            </Link>
            <Button variant="outline" onClick={fetchDashboardData}>
              Refresh Data
            </Button>
          </div>

          {/* Data Tables */}
          <Tabs defaultValue="trips" className="space-y-6">
            <TabsList>
              <TabsTrigger value="trips">Trips</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="trips" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trips.slice(0, 5).map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{trip.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(trip.departureDate), 'MMM d, yyyy')}</span>
                            <MapPin className="h-4 w-4 ml-2" />
                            <span>{trip.route.origin} → {trip.route.destination}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={trip.status === 'UPCOMING' ? 'default' : 'secondary'}>
                            {trip.status}
                          </Badge>
                          <div className="text-sm text-gray-600">
                            {trip.availableSeats}/{trip.totalSeats} seats
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{booking.bookingId}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Users className="h-4 w-4" />
                            <span>{booking.passengerCount} passengers</span>
                            <Calendar className="h-4 w-4 ml-2" />
                            <span>{format(new Date(booking.createdAt), 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={booking.bookingStatus === 'CONFIRMED' ? 'default' : 'secondary'}>
                            {booking.bookingStatus}
                          </Badge>
                          <Badge variant={booking.paymentStatus === 'FULL_PAID' ? 'default' : 'outline'}>
                            {booking.paymentStatus.replace('_', ' ')}
                          </Badge>
                          <div className="font-semibold text-green-600">
                            ₹{booking.totalAmount.toLocaleString('en-IN')}
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}