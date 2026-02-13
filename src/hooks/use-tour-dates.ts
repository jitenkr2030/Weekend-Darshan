import { useState, useEffect } from 'react'

export interface TourDate {
  id: string
  departureDate: string
  availableSeats: number
  pricePerSeat: number
  title: string
}

export function useTourDates(tourType: 'rajasthan' | 'braj' | 'ganga' | 'vaishno') {
  const [selectedDate, setSelectedDate] = useState('')
  const [availableDates, setAvailableDates] = useState<TourDate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTourDates = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/trips')
        const result = await response.json()
        
        let filteredTours: any[] = []
        
        switch (tourType) {
          case 'rajasthan':
            filteredTours = result.data.filter((trip: any) => 
              trip.title.includes('Premium Combo') && 
              trip.title.includes('Khatu Shyam')
            )
            break
          case 'braj':
            filteredTours = result.data.filter((trip: any) => 
              trip.title.includes('Braj Yatra') || 
              (trip.title.includes('Mathura') && trip.title.includes('Vrindavan'))
            )
            break
          case 'ganga':
            filteredTours = result.data.filter((trip: any) => 
              trip.title.includes('Ganga Yatra') || 
              (trip.title.includes('Haridwar') && trip.title.includes('Rishikesh'))
            )
            break
          case 'vaishno':
            filteredTours = result.data.filter((trip: any) => 
              trip.title.includes('Vaishno Devi') || 
              trip.title.includes('Katra')
            )
            break
        }
        
        // Sort by date
        filteredTours.sort((a: any, b: any) => 
          new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime()
        )
        
        setAvailableDates(filteredTours)
        
        // Set the first tour as default
        if (filteredTours.length > 0) {
          setSelectedDate(filteredTours[0].id)
        }
        
      } catch (error) {
        console.error('Error fetching tour dates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTourDates()
  }, [tourType])

  const selectedTour = availableDates.find(tour => tour.id === selectedDate)

  return {
    selectedDate,
    setSelectedDate,
    availableDates,
    selectedTour,
    loading
  }
}