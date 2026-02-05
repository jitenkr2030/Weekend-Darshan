'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Check, AlertCircle, ArrowRight, Heart, Sparkles, Utensils, Bus, Shield, Mountain, Zap, Loader2 } from 'lucide-react';
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

export default function VaishnoDeviPage() {
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
        const vaishnoDeviTour = result.data.find((trip: any) => 
          trip.title.includes('Vaishno Devi') || 
          (trip.title.includes('Katra') && trip.title.includes('Express'))
        );
        
        if (vaishnoDeviTour) {
          // Add fallback data for missing properties
          const tourWithFallbacks = {
            ...vaishnoDeviTour,
            highlights: vaishnoDeviTour.highlights || [
              "Mata Vaishno Devi Darshan",
              "Premium AC Volvo Bus",
              "Professional Tour Coordinator",
              "Basic Assistance in Katra",
              "Emergency Support Available",
              "Lifetime Spiritual Experience"
            ],
            inclusions: vaishnoDeviTour.inclusions || [
              "AC Volvo / Sleeper Bus (Delhi ↔ Katra)",
              "Professional Tour Coordinator",
              "Basic Assistance in Katra",
              "Emergency Support",
              "Driver Allowances",
              "Toll & Parking"
            ],
            exclusions: vaishnoDeviTour.exclusions || [
              "Yatra Slip & Battery Car",
              "Pony / Palki / Helicopter",
              "Meals (optional add-on)",
              "Personal Expenses",
              "Travel Insurance",
              "Special Puja Charges"
            ],
            itinerary: vaishnoDeviTour.itinerary || [
              {
                day: "Saturday",
                time: "4:00 - 5:00 PM",
                title: "Departure from Delhi",
                description: "Early evening departure from Delhi for safe darshan timing. AC Volvo/sleeper bus journey."
              },
              {
                day: "Sunday Morning",
                time: "6:00 - 7:00 AM",
                title: "Arrival in Katra",
                description: "Arrival in Katra, freshen up at dharamshala/prepaid washrooms, breakfast (optional/self-paid)."
              },
              {
                day: "Sunday",
                time: "8:00 - 9:00 AM",
                title: "Start Yatra from Banganga",
                description: "Begin the holy yatra. Options: on foot, pony/palki (self-paid), or battery car (subject to availability)."
              },
              {
                day: "Sunday",
                time: "4:00 - 8:00 PM",
                title: "Darshan Window",
                description: "Mata Vaishno Devi darshan (timing depends on crowd & slot allocated)."
              },
              {
                day: "Sunday Night",
                time: "Post-Darshan",
                title: "Rest & Return to Katra",
                description: "Post-darshan rest, light meal/tea, visit Katra market (if energy permits)."
              },
              {
                day: "Sunday Late Night",
                time: "10:30 - 11:30 PM",
                title: "Return Journey",
                description: "Departure from Katra for Delhi."
              },
              {
                day: "Monday Morning",
                time: "5:00 - 7:00 AM",
                title: "Arrival in Delhi",
                description: "Arrival in Delhi with Mata's blessings."
              }
            ],
            pickupPoints: vaishnoDeviTour.pickupPoints || ["Kashmiri Gate", "Rohini West", "Gurgaon"],
            route: vaishnoDeviTour.route || "Delhi → Katra → Vaishno Devi → Katra → Delhi",
            totalDistance: vaishnoDeviTour.totalDistance || "650 km",
            departureDays: vaishnoDeviTour.departureDays || ["Friday, 15 Nov 2024", "Friday, 22 Nov 2024", "Friday, 29 Nov 2024", "Friday, 6 Dec 2024", "Friday, 13 Dec 2024"],
            seatsAvailable: vaishnoDeviTour.seatsAvailable || 40,
            maxSeats: vaishnoDeviTour.maxSeats || 40
          };
          setTour(tourWithFallbacks);
        } else {
          setError('Vaishno Devi tour not found');
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
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-pink-600 mx-auto mb-4" />
          <p className="text-pink-600">Loading Vaishno Devi tour information...</p>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tour information not available</h1>
          <p className="text-gray-600 mb-6">{error || 'Vaishno Devi tour not found'}</p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">← Back to Home</Button>
            </Link>
            <Link href="/premium-combo">
              <Button className="bg-pink-600 hover:bg-pink-700">
                View All Tours →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-600 to-rose-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              🔯 Mata Ka Bulawa
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {tour.title.replace('🔯 Vaishno Devi Express: ', '')}
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
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge className="bg-red-500 text-white">🔒 Limited Seats</Badge>
              <Badge className="bg-orange-500 text-white">⏳ Premium Experience</Badge>
              <Badge className="bg-yellow-500 text-white">⭐ High Success Darshan</Badge>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/#tours">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-white/90">
                  Book Now - Premium Experience
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
            <TabsTrigger value="important">Important</TabsTrigger>
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
                    <Zap className="w-5 h-5 text-orange-500" />
                    Premium Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium">Bus Type</span>
                    <Badge className="bg-pink-100 text-pink-700">{tour.busType}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium">Duration</span>
                    <Badge className="bg-pink-100 text-pink-700">{tour.duration}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium">Route</span>
                    <Badge className="bg-pink-100 text-pink-700">{tour.route}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium">Experience</span>
                    <Badge className="bg-pink-100 text-pink-700">Lifetime Spiritual</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-pink-600" />
                  Pickup Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-3">
                  {tour.pickupPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-pink-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-pink-600" />
                      <span className="text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <AlertCircle className="w-5 h-5" />
                  Why This Tour Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Business View:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited weekends = urgency</li>
                      <li>• Very high referral rate</li>
                      <li>• Repeat bookings for relatives</li>
                      <li>• Strong word-of-mouth</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Customer Benefits:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• No long leave required</li>
                      <li>• Avoids planning stress</li>
                      <li>• Group confidence & safety</li>
                      <li>• Trusted darshan flow</li>
                    </ul>
                  </div>
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
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-pink-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{item.day}</Badge>
                          <span className="font-semibold text-pink-600">{item.time}</span>
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

          <TabsContent value="important" className="space-y-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  Very Important Disclosures
                </CardTitle>
                <CardDescription>
                  Must be clear before booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Yatra registration is mandatory (online/offline)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Senior citizens need medical clearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Not suitable for people with severe mobility issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Weather may impact timelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Darshan time is crowd-dependent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Early evening departure ensures safe darshan timing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Travel Date</CardTitle>
                <CardDescription>
                  Limited weekend departures for Vaishno Devi Express
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {tour.departureDays.map((day, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedDate === day
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">
                            {day} Departure
                          </div>
                          <div className="text-sm text-gray-600">Premium Weekend Special</div>
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
                  <div className="mt-6 p-4 bg-pink-50 rounded-lg">
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
                        <span className="text-2xl font-bold text-pink-600">
                          ₹{tour.price * passengers}
                        </span>
                      </div>
                      <Link href="/#tours">
                        <Button className="w-full bg-pink-600 hover:bg-pink-700">
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