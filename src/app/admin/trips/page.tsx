'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Bus,
  Save,
  X,
  Check
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { format } from 'date-fns'
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
  advancePrice?: number
  busType: string
  status: string
  route: {
    id: string
    origin: string
    destination: string
  }
  temple: {
    id: string
    name: string
    city: string
  }
}

export default function AdminTripsPage() {
  const router = useRouter()
  const [trips, setTrips] = useState<Trip[]>([])
  const [temples, setTemples] = useState<any[]>([])
  const [routes, setRoutes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    routeId: '',
    templeId: '',
    departureDate: '',
    returnDate: '',
    departureTime: '',
    returnTime: '',
    totalSeats: 45,
    pricePerSeat: 0,
    advancePrice: 0,
    busType: 'AC Deluxe'
  })

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem('adminSession')
    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchTrips()
    fetchTemples()
    fetchRoutes()
  }, [])

  const fetchTrips = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/trips')
      const data = await response.json()
      
      if (data.success) {
        setTrips(data.data)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch trips',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchTemples = async () => {
    try {
      const response = await fetch('/api/temples')
      const data = await response.json()
      
      if (data.success) {
        setTemples(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch temples:', error)
    }
  }

  const fetchRoutes = async () => {
    try {
      const response = await fetch('/api/routes')
      const data = await response.json()
      
      if (data.success) {
        setRoutes(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch routes:', error)
    }
  }

  const handleCreateTrip = async () => {
    try {
      const response = await fetch('/api/admin/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Trip created successfully',
        })
        setIsCreateModalOpen(false)
        resetForm()
        fetchTrips()
      } else {
        throw new Error(data.error || 'Failed to create trip')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create trip',
        variant: 'destructive'
      })
    }
  }

  const handleUpdateTrip = async () => {
    if (!editingTrip) return

    try {
      const response = await fetch(`/api/admin/trips/${editingTrip.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Trip updated successfully',
        })
        setEditingTrip(null)
        resetForm()
        fetchTrips()
      } else {
        throw new Error(data.error || 'Failed to update trip')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update trip',
        variant: 'destructive'
      })
    }
  }

  const handleDeleteTrip = async (tripId: string) => {
    if (!confirm('Are you sure you want to delete this trip?')) return

    try {
      const response = await fetch(`/api/admin/trips/${tripId}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Trip deleted successfully',
        })
        fetchTrips()
      } else {
        throw new Error(data.error || 'Failed to delete trip')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete trip',
        variant: 'destructive'
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      routeId: '',
      templeId: '',
      departureDate: '',
      returnDate: '',
      departureTime: '',
      returnTime: '',
      totalSeats: 45,
      pricePerSeat: 0,
      advancePrice: 0,
      busType: 'AC Deluxe'
    })
  }

  const openEditModal = (trip: Trip) => {
    setEditingTrip(trip)
    setFormData({
      title: trip.title,
      description: trip.description,
      routeId: trip.route.id,
      templeId: trip.temple.id,
      departureDate: trip.departureDate.split('T')[0],
      returnDate: trip.returnDate.split('T')[0],
      departureTime: trip.departureTime,
      returnTime: trip.returnTime,
      totalSeats: trip.totalSeats,
      pricePerSeat: trip.pricePerSeat,
      advancePrice: trip.advancePrice || 0,
      busType: trip.busType
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING': return 'default'
      case 'FULL': return 'secondary'
      case 'CANCELLED': return 'destructive'
      case 'COMPLETED': return 'outline'
      default: return 'default'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
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
            <h1 className="text-xl font-bold">Trip Management</h1>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Trip
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Trip</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Trip Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Weekend Khatu Shyam Darshan"
                    />
                  </div>
                  <div>
                    <Label htmlFor="busType">Bus Type</Label>
                    <Select value={formData.busType} onValueChange={(value) => setFormData({...formData, busType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AC Deluxe">AC Deluxe</SelectItem>
                        <SelectItem value="AC Semi-Sleeper">AC Semi-Sleeper</SelectItem>
                        <SelectItem value="Non-AC">Non-AC</SelectItem>
                        <SelectItem value="Volvo">Volvo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the trip..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="route">Route</Label>
                    <Select value={formData.routeId} onValueChange={(value) => setFormData({...formData, routeId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select route" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes.map((route) => (
                          <SelectItem key={route.id} value={route.id}>
                            {route.origin} → {route.destination}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="temple">Temple</Label>
                    <Select value={formData.templeId} onValueChange={(value) => setFormData({...formData, templeId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select temple" />
                      </SelectTrigger>
                      <SelectContent>
                        {temples.map((temple) => (
                          <SelectItem key={temple.id} value={temple.id}>
                            {temple.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departureDate">Departure Date</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="returnDate">Return Date</Label>
                    <Input
                      id="returnDate"
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departureTime">Departure Time</Label>
                    <Input
                      id="departureTime"
                      type="time"
                      value={formData.departureTime}
                      onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="returnTime">Return Time</Label>
                    <Input
                      id="returnTime"
                      type="time"
                      value={formData.returnTime}
                      onChange={(e) => setFormData({...formData, returnTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="totalSeats">Total Seats</Label>
                    <Input
                      id="totalSeats"
                      type="number"
                      value={formData.totalSeats}
                      onChange={(e) => setFormData({...formData, totalSeats: parseInt(e.target.value)})}
                      min="1"
                      max="60"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricePerSeat">Price per Seat</Label>
                    <Input
                      id="pricePerSeat"
                      type="number"
                      value={formData.pricePerSeat}
                      onChange={(e) => setFormData({...formData, pricePerSeat: parseFloat(e.target.value)})}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="advancePrice">Advance Price</Label>
                    <Input
                      id="advancePrice"
                      type="number"
                      value={formData.advancePrice}
                      onChange={(e) => setFormData({...formData, advancePrice: parseFloat(e.target.value)})}
                      min="0"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateTrip} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Create Trip
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Trips</p>
                    <p className="text-3xl font-bold">{trips.length}</p>
                  </div>
                  <Bus className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-3xl font-bold">
                      {trips.filter(t => t.status === 'UPCOMING').length}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Full</p>
                    <p className="text-3xl font-bold">
                      {trips.filter(t => t.status === 'FULL').length}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-3xl font-bold">
                      {trips.filter(t => t.status === 'COMPLETED').length}
                    </p>
                  </div>
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trips List */}
          <Card>
            <CardHeader>
              <CardTitle>All Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trips.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{trip.title}</h4>
                        <Badge variant={getStatusColor(trip.status)}>
                          {trip.status}
                        </Badge>
                        <Badge variant="outline">{trip.busType}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{trip.route.origin} → {trip.route.destination}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(trip.departureDate), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{trip.availableSeats}/{trip.totalSeats} seats</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-semibold text-green-600">
                          ₹{trip.pricePerSeat.toLocaleString('en-IN')}
                        </span>
                        {trip.advancePrice && (
                          <span className="text-orange-600">
                            Advance: ₹{trip.advancePrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-gray-600">
                          {trip.temple.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditModal(trip)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteTrip(trip.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingTrip} onOpenChange={() => setEditingTrip(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Trip</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Trip Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Weekend Khatu Shyam Darshan"
                />
              </div>
              <div>
                <Label htmlFor="edit-busType">Bus Type</Label>
                <Select value={formData.busType} onValueChange={(value) => setFormData({...formData, busType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC Deluxe">AC Deluxe</SelectItem>
                    <SelectItem value="AC Semi-Sleeper">AC Semi-Sleeper</SelectItem>
                    <SelectItem value="Non-AC">Non-AC</SelectItem>
                    <SelectItem value="Volvo">Volvo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the trip..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-route">Route</Label>
                <Select value={formData.routeId} onValueChange={(value) => setFormData({...formData, routeId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route) => (
                      <SelectItem key={route.id} value={route.id}>
                        {route.origin} → {route.destination}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-temple">Temple</Label>
                <Select value={formData.templeId} onValueChange={(value) => setFormData({...formData, templeId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select temple" />
                  </SelectTrigger>
                  <SelectContent>
                    {temples.map((temple) => (
                      <SelectItem key={temple.id} value={temple.id}>
                        {temple.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-departureDate">Departure Date</Label>
                <Input
                  id="edit-departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-returnDate">Return Date</Label>
                <Input
                  id="edit-returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-departureTime">Departure Time</Label>
                <Input
                  id="edit-departureTime"
                  type="time"
                  value={formData.departureTime}
                  onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-returnTime">Return Time</Label>
                <Input
                  id="edit-returnTime"
                  type="time"
                  value={formData.returnTime}
                  onChange={(e) => setFormData({...formData, returnTime: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-totalSeats">Total Seats</Label>
                <Input
                  id="edit-totalSeats"
                  type="number"
                  value={formData.totalSeats}
                  onChange={(e) => setFormData({...formData, totalSeats: parseInt(e.target.value)})}
                  min="1"
                  max="60"
                />
              </div>
              <div>
                <Label htmlFor="edit-pricePerSeat">Price per Seat</Label>
                <Input
                  id="edit-pricePerSeat"
                  type="number"
                  value={formData.pricePerSeat}
                  onChange={(e) => setFormData({...formData, pricePerSeat: parseFloat(e.target.value)})}
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="edit-advancePrice">Advance Price</Label>
                <Input
                  id="edit-advancePrice"
                  type="number"
                  value={formData.advancePrice}
                  onChange={(e) => setFormData({...formData, advancePrice: parseFloat(e.target.value)})}
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdateTrip} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Update Trip
              </Button>
              <Button variant="outline" onClick={() => setEditingTrip(null)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}