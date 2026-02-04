export interface Trip {
  id: string
  routeId: string
  templeId: string
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
  boardingPoints: string
  inclusions?: string
  exclusions?: string
  cancellationPolicy?: string
  emergencyContact?: string
  isActive: boolean
  status: string
  createdAt: string
  updatedAt: string
  route: {
    id: string
    origin: string
    destination: string
    distance?: number
    duration?: number
  }
  temple: {
    id: string
    name: string
    description?: string
    city: string
    state: string
    image?: string
  }
  _count: {
    bookings: number
  }
}

export interface Passenger {
  name: string
  age: number
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  isSeniorCitizen?: boolean
  isLadies?: boolean
}

export interface Booking {
  id: string
  userId: string
  tripId: string
  bookingId: string
  passengerCount: number
  passengerDetails: string
  totalAmount: number
  advanceAmount?: number
  paymentStatus: string
  paymentId?: string
  bookingStatus: string
  seats: string
  qrCode?: string
  specialRequests?: string
  createdAt: string
  updatedAt: string
}