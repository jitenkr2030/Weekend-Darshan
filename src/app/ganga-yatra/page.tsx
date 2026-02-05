'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Check, AlertCircle, ArrowRight, Heart, Sparkles, Utensils, Bus, Shield, Mountain, Waves, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  departureDays: string[];
  pickupPoints: string[];
  itinerary: {
    time: string;
    title: string;
    description: string;
    day: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  route: string;
  totalDistance: string;
  seatsAvailable: number;
  maxSeats: number;
}

export default function GangaYatraPage() {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [passengers, setPassengers] = useState(1);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/trips');
        if (!response.ok) {
          throw new Error('Failed to fetch tour data');
        }
        const result = await response.json();
        const gangaYatraTour = result.data.find((trip: any) => 
          trip.title.includes('Ganga Yatra') || 
          (trip.title.includes('Haridwar') && trip.title.includes('Rishikesh'))
        );
        
        if (gangaYatraTour) {
          // Add fallback data for missing properties
          const tourWithFallbacks = {
            ...gangaYatraTour,
            highlights: gangaYatraTour.highlights || [
              "Sacred Ganga Darshan at Har Ki Pauri",
              "Spiritual experience in Rishikesh",
              "Divine blessing at Neelkanth Mahadev Temple",
              "Scenic Himalayan foothills journey",
              "Professional tour guide included",
              "Comfortable AC bus travel"
            ],
            inclusions: gangaYatraTour.inclusions || [
              "Deluxe AC Bus Transportation",
              "Professional Tour Guide",
              "All Toll and Parking Fees",
              "Lunch at Premium Restaurant in Rishikesh",
              "Morning Tea and Refreshments",
              "Driver Allowances",
              "24/7 Emergency Support"
            ],
            exclusions: gangaYatraTour.exclusions || [
              "Personal Expenses",
              "Additional Meals not mentioned",
              "Ropeway or Cable Car Charges",
              "Special Puja or Darshan Charges",
              "Travel Insurance",
              "Any other services not mentioned"
            ],
            itinerary: gangaYatraTour.itinerary || [
              {
                day: "Saturday Night",
                time: "10:00 PM",
                title: "Departure from Delhi",
                description: "Pickup from Kashmiri Gate, Noida, Ghaziabad. Overnight comfortable journey to Haridwar."
              },
              {
                day: "Sunday Early Morning",
                time: "5:00 - 7:30 AM",
                title: "Haridwar - Har Ki Pauri",
                description: "Arrival at Haridwar, sacred Ganga Snan (optional), Har Ki Pauri darshan, morning aarti experience."
              },
              {
                day: "Sunday Morning",
                time: "9:00 AM - 12:30 PM",
                title: "Rishikesh Local Sightseeing",
                description: "Visit Laxman Jhula, Ram Jhula, Parmarth Niketan Ashram. Explore spiritual centers and ghats."
              },
              {
                day: "Sunday Afternoon",
                time: "1:00 - 2:00 PM",
                title: "Lunch Break",
                description: "Complimentary lunch at premium restaurant in Rishikesh."
              },
              {
                day: "Sunday Evening",
                time: "3:30 - 6:30 PM",
                title: "Neelkanth Mahadev Temple",
                description: "Scenic drive to Neelkanth Mahadev Temple, evening aarti, beautiful sunset views from Himalayan foothills."
              },
              {
                day: "Sunday Night",
                time: "7:00 PM",
                title: "Return Journey",
                description: "Departure from Neelkanth, overnight journey back to Delhi."
              },
              {
                day: "Monday Morning",
                time: "5:00 - 6:00 AM",
                title: "Arrival in Delhi",
                description: "Arrival at Delhi with divine memories and spiritual blessings."
              }
            ],
            pickupPoints: gangaYatraTour.pickupPoints || ["Kashmiri Gate", "Noida (Sector 18)", "Ghaziabad"],
            route: gangaYatraTour.route || "Delhi → Haridwar → Rishikesh → Neelkanth → Delhi",
            totalDistance: gangaYatraTour.totalDistance || "450 km",
            departureDays: gangaYatraTour.departureDays || ["Friday, 15 Nov 2024", "Friday, 22 Nov 2024", "Friday, 29 Nov 2024", "Friday, 6 Dec 2024", "Friday, 13 Dec 2024"],
            seatsAvailable: gangaYatraTour.seatsAvailable || 50,
            maxSeats: gangaYatraTour.maxSeats || 50
          };
          setTour(tourWithFallbacks);
        } else {
          setError('Ganga Yatra tour not found');
        }
      } catch (err) {
        setError('Failed to load tour information');
        console.error('Error fetching tour data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-blue-600">Loading Ganga Yatra tour information...</p>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tour information not available</h1>
          <p className="text-gray-600 mb-6">{error || 'Ganga Yatra tour not found'}</p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">← Back to Home</Button>
            </Link>
            <Link href="/premium-combo">
              <Button className="bg-blue-600 hover:bg-blue-700">
                View All Tours →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              🌊 Ganga Darshan Special
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {tour.title.replace('🌊 Ganga Yatra: ', '')}
            </h1>
            <p className="text-xl mb-8 text-white/90">
              {tour.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                <span>{tour.departureTime} - {tour.arrivalTime}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                <span>{tour.maxSeats} Seats</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-8">
              ₹{tour.price} <span className="text-lg font-normal text-white/80">per person</span>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/#tours">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                  Book Now - Limited Seats
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/premium-combo">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  View All Tours
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
            <TabsTrigger value="booking">Book Now</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Tour Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-500" />
                    Tour Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Bus Type</span>
                    <Badge>{tour.busType}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Duration</span>
                    <Badge>{tour.duration}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Route</span>
                    <Badge>{tour.route}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Distance</span>
                    <Badge>{tour.totalDistance}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Pickup Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-3">
                  {tour.pickupPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-6">
            <div className="space-y-6">
              {tour.itinerary.map((item, index) => (
                <Card key={index} className="relative">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{item.day}</Badge>
                          <span className="font-semibold text-blue-600">{item.time}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inclusions" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tour.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    What's Not Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tour.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="booking" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Travel Date</CardTitle>
                <CardDescription>
                  Choose your preferred weekend for the Ganga Yatra tour
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {tour.departureDays.map((day, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedDate === day
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">
                            {day} Departure
                          </div>
                          <div className="text-sm text-gray-600">Weekend Special</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">₹{tour.price}</div>
                          <div className="text-sm">
                            {tour.seatsAvailable} seats left
                          </div>
                          <Badge
                            variant={tour.seatsAvailable < 10 ? 'destructive' : 'secondary'}
                            className="mt-1"
                          >
                            {tour.seatsAvailable < 10 ? 'Limited Seats' : 'Available'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedDate && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">Number of Passengers:</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{passengers}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPassengers(Math.min(6, passengers + 1))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total Amount:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          ₹{tour.price * passengers}
                        </span>
                      </div>
                      <Link href="/#tours">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Proceed to Booking
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}