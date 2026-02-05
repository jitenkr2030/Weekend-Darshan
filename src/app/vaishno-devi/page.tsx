'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Check, AlertCircle, ArrowRight, Heart, Sparkles, Utensils, Bus, Shield, Mountain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function VaishnoDeviPage() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [passengers, setPassengers] = useState(1);

  const tourHighlights = [
    "Mata Vaishno Devi Darshan - Lifetime spiritual experience",
    "Banganga - Holy starting point of the yatra",
    "Ardh Kuwari - Midway spiritual stop",
    "Bhairon Temple - Complete yatra experience",
    "Katra Market - Local shopping and prasad",
    "Scenic Himalayan views during journey"
  ];

  const inclusions = [
    "Premium AC Volvo Sleeper Bus",
    "Tour Coordinator Assistance",
    "Basic Help in Katra",
    "Emergency Support",
    "Travel Insurance",
    "24/7 Helpline Support"
  ];

  const exclusions = [
    "Yatra slip & battery car charges",
    "Pony / palki / helicopter charges",
    "Meals (optional add-on available)",
    "Personal expenses",
    "Special puja charges",
    "Camera fees"
  ];

  const importantInfo = [
    "Yatra registration is mandatory (online/offline)",
    "Senior citizens need medical clearance",
    "Not suitable for people with severe mobility issues",
    "Weather may impact timelines",
    "Darshan time is crowd-dependent",
    "Early morning departure ensures safe darshan timing"
  ];

  const itinerary = [
    {
      time: "4:00-5:00 PM",
      title: "Departure from Delhi",
      description: "Pickup from Kashmiri Gate, Rohini West, Gurgaon",
      icon: Bus,
      day: "Saturday"
    },
    {
      time: "6:00-7:00 AM",
      title: "Arrival in Katra",
      description: "Freshen up at dharamshala, breakfast (self-paid)",
      icon: MapPin,
      day: "Sunday"
    },
    {
      time: "8:00-9:00 AM",
      title: "Start Yatra from Banganga",
      description: "Begin the spiritual journey, options: on foot, pony, palki, or battery car",
      icon: Heart,
      day: "Sunday"
    },
    {
      time: "12:00-2:00 PM",
      title: "Ardh Kuwari & Midway",
      description: "Rest and spiritual stop at Ardh Kuwari cave",
      icon: Mountain,
      day: "Sunday"
    },
    {
      time: "4:00-8:00 PM",
      title: "Mata Vaishno Devi Darshan",
      description: "Divine darshan at the holy cave (timing depends on crowd & slot)",
      icon: Sparkles,
      day: "Sunday"
    },
    {
      time: "8:00-9:00 PM",
      title: "Bhairon Temple Visit",
      description: "Complete the yatra with Bhairon Baba darshan",
      icon: Star,
      day: "Sunday"
    },
    {
      time: "9:00-10:30 PM",
      title: "Return to Katra",
      description: "Rest, light meal, visit Katra market (if energy permits)",
      icon: Utensils,
      day: "Sunday"
    },
    {
      time: "10:30-11:30 PM",
      title: "Return Journey",
      description: "Departure from Katra for Delhi",
      icon: Bus,
      day: "Sunday"
    },
    {
      time: "5:00-7:00 AM",
      title: "Arrival in Delhi",
      description: "Back home with Mata's blessings",
      icon: MapPin,
      day: "Monday"
    }
  ];

  const upcomingDates = [
    { id: '1', date: '2024-02-03', day: 'Saturday', price: 3500, available: 28, status: 'available' },
    { id: '2', date: '2024-02-10', day: 'Saturday', price: 3500, available: 15, status: 'limited' },
    { id: '3', date: '2024-02-17', day: 'Saturday', price: 3500, available: 8, status: 'limited' },
    { id: '4', date: '2024-02-24', day: 'Saturday', price: 3500, available: 32, status: 'available' },
    { id: '5', date: '2024-03-02', day: 'Saturday', price: 3600, available: 5, status: 'limited' }
  ];

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
              Vaishno Devi Express
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Weekend Mini Experience • Katra – Complete Darshan Plan
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                <span>38-40 Hours</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                <span>Saturday 4PM - Monday 6AM</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                <span>40 Seats</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-8">
              ₹3,500 <span className="text-lg font-normal text-white/80">per person</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge className="bg-red-500 text-white">🔒 Limited Seats</Badge>
              <Badge className="bg-orange-500 text-white">⏳ Once or twice a month</Badge>
              <Badge className="bg-yellow-500 text-white">⭐ High success darshan plan</Badge>
            </div>
            <Link href="/#tours">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-white/90">
                Book Now - Premium Experience
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
                    {tourHighlights.map((highlight, index) => (
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
                    <Badge className="bg-pink-100 text-pink-700">Premium AC Volvo</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium">Duration</span>
                    <Badge className="bg-pink-100 text-pink-700">38-40 Hours</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium">Departure</span>
                    <Badge className="bg-pink-100 text-pink-700">4 PM (Safe Timing)</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium">Experience</span>
                    <Badge className="bg-pink-100 text-pink-700">Lifetime Spiritual</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

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
              {itinerary.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card key={index} className="relative">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-pink-600" />
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
                );
              })}
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
                    {inclusions.map((item, index) => (
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
                    {exclusions.map((item, index) => (
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
                  {importantInfo.map((info, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{info}</span>
                    </li>
                  ))}
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
                  {upcomingDates.map((date) => (
                    <div
                      key={date.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedDate === date.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                      onClick={() => setSelectedDate(date.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">
                            {new Date(date.date).toLocaleDateString('en-IN', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-sm text-gray-600">{date.day} Departure (4 PM)</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">₹{date.price}</div>
                          <div className="text-sm">
                            {date.available} seats left
                          </div>
                          <Badge
                            variant={date.status === 'limited' ? 'destructive' : 'secondary'}
                            className="mt-1"
                          >
                            {date.status === 'limited' ? 'Limited Seats' : 'Available'}
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
                          ₹{upcomingDates.find(d => d.id === selectedDate)?.price || 0 * passengers}
                        </span>
                      </div>
                      <Link href="/#tours">
                        <Button className="w-full bg-pink-600 hover:bg-pink-700">
                          Proceed to Booking - Premium Experience
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