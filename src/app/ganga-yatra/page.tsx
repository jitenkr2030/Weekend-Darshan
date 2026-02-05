'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Check, AlertCircle, ArrowRight, Heart, Sparkles, Utensils, Bus, Shield, Mountain, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function GangaYatraPage() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [passengers, setPassengers] = useState(1);

  const tourHighlights = [
    "Har Ki Pauri - Sacred Ganga ghat with evening aarti",
    "Laxman Jhula - Iconic suspension bridge in Rishikesh",
    "Ram Jhula - Another historic bridge with temples",
    "Parmarth Niketan - Largest ashram in Rishikesh",
    "Neelkanth Mahadev Temple - Abode of Lord Shiva in Himalayas",
    "Ganga Snan - Holy dip in the sacred river (optional)"
  ];

  const inclusions = [
    "Deluxe AC Push-Back Bus Travel",
    "Complimentary Dinner & Tea",
    "Professional Tour Guide",
    "All Temple Darshan Assistance",
    "Lunch at Premium Restaurant in Rishikesh",
    "Neelkanth Temple Entry Fees",
    "Travel Insurance",
    "24/7 Emergency Support"
  ];

  const exclusions = [
    "Personal expenses",
    "Additional meals not mentioned",
    "Camera fees at temples",
    "Tips and gratuities",
    "Ropeway charges (if applicable)"
  ];

  const itinerary = [
    {
      time: "10:00 PM",
      title: "Departure from Delhi",
      description: "Pickup from Kashmiri Gate, Noida, Ghaziabad",
      icon: Bus,
      day: "Saturday"
    },
    {
      time: "5:00-5:30 AM",
      title: "Arrival at Haridwar",
      description: "Fresh morning arrival at the holy city",
      icon: MapPin,
      day: "Sunday"
    },
    {
      time: "5:30-7:30 AM",
      title: "Har Ki Pauri Darshan",
      description: "Morning Ganga Snan (optional), Har Ki Pauri, peaceful morning prayers",
      icon: Waves,
      day: "Sunday"
    },
    {
      time: "9:00 AM - 12:30 PM",
      title: "Rishikesh Sightseeing",
      description: "Laxman Jhula, Ram Jhula, Parmarth Niketan Ashram exploration",
      icon: Heart,
      day: "Sunday"
    },
    {
      time: "1:00-2:00 PM",
      title: "Lunch Break",
      description: "Delicious lunch at premium restaurant in Rishikesh",
      icon: Utensils,
      day: "Sunday"
    },
    {
      time: "2:00-3:30 PM",
      title: "Drive to Neelkanth",
      description: "Scenic 1.5 hour drive through Himalayan foothills",
      icon: Mountain,
      day: "Sunday"
    },
    {
      time: "3:30-6:30 PM",
      title: "Neelkanth Mahadev Temple",
      description: "Darshan, evening aarti, beautiful mountain sunset views",
      icon: Sparkles,
      day: "Sunday"
    },
    {
      time: "7:00 PM",
      title: "Return Journey",
      description: "Start return journey to Delhi",
      icon: Bus,
      day: "Sunday"
    },
    {
      time: "5:00-6:00 AM",
      title: "Arrival in Delhi",
      description: "Back home with divine blessings",
      icon: MapPin,
      day: "Monday"
    }
  ];

  const upcomingDates = [
    { id: '1', date: '2024-02-03', day: 'Saturday', price: 2100, available: 38, status: 'available' },
    { id: '2', date: '2024-02-10', day: 'Saturday', price: 2100, available: 25, status: 'available' },
    { id: '3', date: '2024-02-17', day: 'Saturday', price: 2100, available: 12, status: 'limited' },
    { id: '4', date: '2024-02-24', day: 'Saturday', price: 2100, available: 41, status: 'available' },
    { id: '5', date: '2024-03-02', day: 'Saturday', price: 2200, available: 6, status: 'limited' }
  ];

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
              Haridwar + Rishikesh + Neelkanth
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Ganga Darshan + Spiritual Calm • Complete Weekend Experience
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                <span>32-34 Hours</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                <span>Saturday 10PM - Monday 6AM</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                <span>45 Seats</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-8">
              ₹2,100 <span className="text-lg font-normal text-white/80">per person</span>
            </div>
            <Link href="/#tours">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                Book Now - Limited Seats
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
                    <AlertCircle className="w-5 h-5 text-blue-500" />
                    Tour Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Bus Type</span>
                    <Badge>Deluxe AC Push-Back</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Duration</span>
                    <Badge>32-34 Hours</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Meals</span>
                    <Badge>Lunch Included</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Guide</span>
                    <Badge>Professional Guide</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-blue-600" />
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
                  {upcomingDates.map((date) => (
                    <div
                      key={date.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedDate === date.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
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
                          <div className="text-sm text-gray-600">{date.day} Departure</div>
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
                          ₹{upcomingDates.find(d => d.id === selectedDate)?.price || 0 * passengers}
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