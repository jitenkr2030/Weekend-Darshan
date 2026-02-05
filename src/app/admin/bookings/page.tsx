'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  ArrowLeft, 
  Search, 
  Download, 
  Eye, 
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Phone,
  Mail,
  Check,
  X,
  RefreshCw,
  Filter
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import Link from 'next/link'

interface Booking {
  id: string
  bookingId: string
  passengerCount: number
  passengerDetails: any
  totalAmount: number
  advanceAmount?: number
  paymentStatus: string
  bookingStatus: string
  seats: string
  specialRequests: string
  createdAt: string
  trip: {
    id: string
    title: string
    departureDate: string
    route: {
      origin: string
      destination: string
    }
    temple: {
      name: string
    }
  }
  user?: {
    id: string
    mobile: string
    name?: string
    email?: string
  }
  payments: any[]
}

export default function AdminBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem('adminSession')
    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchBookings()
  }, [])

  useEffect(() => {
    filterBookings()
  }, [bookings, searchQuery, statusFilter, paymentFilter])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/bookings')
      const data = await response.json()
      
      if (data.success) {
        setBookings(data.data)
      } else {
        throw new Error(data.error || 'Failed to fetch bookings')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch bookings',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const filterBookings = () => {
    let filtered = bookings

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.user?.mobile?.includes(searchQuery) ||
        booking.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.trip.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by booking status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.bookingStatus === statusFilter)
    }

    // Filter by payment status
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(booking => booking.paymentStatus === paymentFilter)
    }

    setFilteredBookings(filtered)
  }

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/cancel`, {
        method: 'POST'
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Booking cancelled successfully',
        })
        fetchBookings()
      } else {
        throw new Error(data.error || 'Failed to cancel booking')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to cancel booking',
        variant: 'destructive'
      })
    }
  }

  const handleConfirmPayment = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/confirm-payment`, {
        method: 'POST'
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Payment confirmed successfully',
        })
        fetchBookings()
      } else {
        throw new Error(data.error || 'Failed to confirm payment')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to confirm payment',
        variant: 'destructive'
      })
    }
  }

  const exportToCSV = () => {
    const headers = [
      'Booking ID',
      'Customer Name',
      'Mobile',
      'Trip',
      'Departure Date',
      'Passengers',
      'Total Amount',
      'Payment Status',
      'Booking Status',
      'Created Date'
    ]

    const csvData = filteredBookings.map(booking => [
      booking.bookingId,
      booking.user?.name || 'N/A',
      booking.user?.mobile || 'N/A',
      booking.trip.title,
      format(new Date(booking.trip.departureDate), 'MMM d, yyyy'),
      booking.passengerCount,
      booking.totalAmount,
      booking.paymentStatus.replace('_', ' '),
      booking.bookingStatus,
      format(new Date(booking.createdAt), 'MMM d, yyyy')
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bookings-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'default'
      case 'CANCELLED': return 'destructive'
      case 'COMPLETED': return 'secondary'
      case 'PENDING': return 'outline'
      default: return 'default'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'FULL_PAID': return 'default'
      case 'ADVANCE_PAID': return 'secondary'
      case 'PENDING': return 'outline'
      case 'REFUNDED': return 'destructive'
      default: return 'outline'
    }
  }

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.bookingStatus === 'CONFIRMED').length,
    cancelled: bookings.filter(b => b.bookingStatus === 'CANCELLED').length,
    completed: bookings.filter(b => b.bookingStatus === 'COMPLETED').length,
    totalRevenue: bookings
      .filter(b => b.paymentStatus === 'FULL_PAID')
      .reduce((sum, b) => sum + b.totalAmount, 0),
    pendingPayment: bookings.filter(b => b.paymentStatus === 'PENDING').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
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
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Booking Management</h1>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={fetchBookings}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Pending Payment</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingPayment}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{stats.totalRevenue.toLocaleString('en-IN')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by booking ID, mobile, name, or trip..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Booking Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Payment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="FULL_PAID">Full Paid</SelectItem>
                    <SelectItem value="ADVANCE_PAID">Advance Paid</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="REFUNDED">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{booking.bookingId}</h4>
                          <Badge variant={getStatusColor(booking.bookingStatus)}>
                            {booking.bookingStatus}
                          </Badge>
                          <Badge variant={getPaymentStatusColor(booking.paymentStatus)}>
                            {booking.paymentStatus.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-600">Customer</p>
                            <p className="font-semibold">{booking.user?.name || 'N/A'}</p>
                            <p className="text-gray-600">{booking.user?.mobile || 'N/A'}</p>
                            {booking.user?.email && (
                              <p className="text-gray-600">{booking.user.email}</p>
                            )}
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-600">Trip Details</p>
                            <p className="font-semibold">{booking.trip.title}</p>
                            <p className="text-gray-600 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {booking.trip.route.origin} → {booking.trip.route.destination}
                            </p>
                            <p className="text-gray-600 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(booking.trip.departureDate), 'MMM d, yyyy')}
                            </p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-600">Booking Info</p>
                            <p className="text-gray-600 flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {booking.passengerCount} passengers
                            </p>
                            <p className="text-gray-600">Seats: {booking.seats}</p>
                            <p className="text-gray-600">
                              Booked: {format(new Date(booking.createdAt), 'MMM d, yyyy')}
                            </p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-600">Payment</p>
                            <p className="font-semibold text-green-600">
                              Total: ₹{booking.totalAmount.toLocaleString('en-IN')}
                            </p>
                            {booking.advanceAmount && (
                              <p className="text-orange-600">
                                Advance: ₹{booking.advanceAmount.toLocaleString('en-IN')}
                              </p>
                            )}
                            <p className="text-gray-600">
                              Balance: ₹{(booking.totalAmount - (booking.advanceAmount || 0)).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="text-sm text-gray-600">
                        {booking.specialRequests && (
                          <p>Special: {booking.specialRequests}</p>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {booking.paymentStatus === 'PENDING' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleConfirmPayment(booking.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Confirm Payment
                          </Button>
                        )}
                        
                        {booking.bookingStatus === 'CONFIRMED' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        )}
                        
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredBookings.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No bookings found matching your criteria</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}