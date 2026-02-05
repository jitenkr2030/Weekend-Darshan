"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, Star, Check, X, AlertCircle, Bus, Utensils, Camera, Shield, Phone, Info } from "lucide-react";
import Link from "next/link";

export default function RajasthanTourPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [tourData, setTourData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch('/api/trips');
        const data = await response.json();
        const rajasthanTour = data.trips.find((trip: any) => 
          trip.title.includes('Rajasthan Special') || 
          trip.title.includes('Khatu Shyam')
        );
        setTourData(rajasthanTour);
      } catch (error) {
        console.error('Error fetching tour data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
  }, []);

  const handleBookNow = () => {
    if (!selectedDate) {
      alert("Please select a travel date");
      return;
    }
    // Navigate to booking page with selected data
    window.location.href = `/booking?tourId=${tourData?.id}&date=${selectedDate}&passengers=${passengers}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tour information...</p>
        </div>
      </div>
    );
  }

  if (!tourData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Tour information not available</p>
          <Link href="/" className="text-orange-600 hover:text-orange-700 mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <span className="text-4xl">🔱</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Rajasthan Special
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Khatu Shyam Ji + Salasar Balaji + Mandawa Heritage
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>31-32 Hours</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>3 Sacred Destinations</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <Bus className="w-4 h-4" />
                <span>Premium AC Bus</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>45 Seats</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {["overview", "itinerary", "inclusions", "booking"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-orange-600 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Tour Highlights */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Tour Highlights</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 rounded-lg p-2 mt-1">
                        <span className="text-xl">🛕</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Khatu Shyam Ji</h3>
                        <p className="text-sm text-gray-600">Ancient temple of Lord Krishna's devotee Barbarik</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 rounded-lg p-2 mt-1">
                        <span className="text-xl">🕉️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Salasar Balaji</h3>
                        <p className="text-sm text-gray-600">Famous Hanuman temple with miraculous powers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 rounded-lg p-2 mt-1">
                        <span className="text-xl">🏛️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Mandawa Heritage</h3>
                        <p className="text-sm text-gray-600">Beautiful frescoes and Rajasthani architecture</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 rounded-lg p-2 mt-1">
                        <span className="text-xl">🍽️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Rajasthani Cuisine</h3>
                        <p className="text-sm text-gray-600">Authentic local meals included</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose This Tour */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Choose This Tour?</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Perfect Weekend Plan</h3>
                        <p className="text-sm text-gray-600">No leave required - Saturday night to Monday morning</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Spiritual Powerhouses</h3>
                        <p className="text-sm text-gray-600">Three most powerful spiritual destinations in Rajasthan</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Comfortable Travel</h3>
                        <p className="text-sm text-gray-600">Premium AC buses with experienced drivers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Expert Guidance</h3>
                        <p className="text-sm text-gray-600">Professional tour coordinator throughout the journey</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-amber-900">Important Information</h3>
                      <ul className="text-sm text-amber-800 mt-2 space-y-1">
                        <li>• Carry valid ID proof for temple entry</li>
                        <li>• Dress modestly for temple visits</li>
                        <li>• Morning darshan recommended for peaceful experience</li>
                        <li>• Photography restrictions may apply in some temples</li>
                        <li>• Carry minimal luggage for convenience</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-orange-600">₹2,000</div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Travel Date
                      </label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Choose a date</option>
                        {tourData?.dates?.map((date: any) => (
                          <option key={date.id} value={date.id}>
                            {new Date(date.date).toLocaleDateString('en-IN', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short'
                            })} - {date.availableSeats} seats available
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Passengers
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setPassengers(Math.max(1, passengers - 1))}
                          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-semibold">{passengers}</span>
                        <button
                          onClick={() => setPassengers(Math.min(6, passengers + 1))}
                          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleBookNow}
                      className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                    >
                      Book Now
                    </button>

                    <div className="text-xs text-gray-500 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Shield className="w-3 h-3" />
                        <span>Secure Booking</span>
                      </div>
                      <div>Free cancellation up to 24 hours before departure</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Tour Includes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Premium AC Bus Travel</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Dinner & Breakfast</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Temple Darshan Assistance</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Tour Coordinator</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Itinerary Tab */}
        {activeTab === "itinerary" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Detailed Itinerary</h2>
              
              <div className="space-y-8">
                {/* Day 1 - Saturday Night */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-200 ml-4"></div>
                  
                  <div className="relative flex items-start gap-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold z-10">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Saturday Night - Departure</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>10:00 PM - Departure from Delhi</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>Pickup: Kashmiri Gate / Noida / Faridabad</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bus className="w-4 h-4" />
                            <span>Overnight journey in premium AC bus</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 2 - Sunday Morning */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-200 ml-4"></div>
                  
                  <div className="relative flex items-start gap-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold z-10">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Sunday Early Morning - Khatu Shyam Ji</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>3:00 AM - 6:00 AM - Temple Darshan</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>Khatu Shyam Ji Temple, Rajasthan</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            <span>Early morning darshan for peaceful experience</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 2 - Sunday Morning Salasar */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-200 ml-4"></div>
                  
                  <div className="relative flex items-start gap-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold z-10">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Sunday Morning - Salasar Balaji</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>9:00 AM - 12:00 PM - Temple Visit</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>Salasar Dham, Rajasthan</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Utensils className="w-4 h-4" />
                            <span>Breakfast at local restaurant</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 2 - Sunday Afternoon */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-200 ml-4"></div>
                  
                  <div className="relative flex items-start gap-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold z-10">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Sunday Afternoon - Mandawa</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>2:00 PM - 5:00 PM - Heritage Tour</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>Mandawa, Shekhawati Region</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            <span>Beautiful frescoes and havelis</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Utensils className="w-4 h-4" />
                            <span>Lunch at heritage hotel</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 2 - Return Journey */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-200 ml-4"></div>
                  
                  <div className="relative flex items-start gap-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold z-10">
                      5
                    </div>
                    <div className="flex-1">
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Sunday Night - Return Journey</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>8:00 PM - Departure from Mandawa</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bus className="w-4 h-4" />
                            <span>Overnight journey back to Delhi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 3 - Monday Arrival */}
                <div className="relative">
                  <div className="relative flex items-start gap-4">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold z-10">
                      ✓
                    </div>
                    <div className="flex-1">
                      <div className="bg-green-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Monday Morning - Arrival</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>5:00 AM - 6:00 AM - Arrival in Delhi</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>Drop at same pickup points</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inclusions Tab */}
        {activeTab === "inclusions" && (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* What's Included */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">What's Included</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Premium AC Bus Travel</h4>
                      <p className="text-sm text-gray-600">Comfortable push-back seats with experienced drivers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Meals</h4>
                      <p className="text-sm text-gray-600">Dinner, breakfast, and lunch at quality restaurants</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Temple Darshan</h4>
                      <p className="text-sm text-gray-600">Priority darshan assistance at all temples</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Tour Coordinator</h4>
                      <p className="text-sm text-gray-600">Professional guide throughout the journey</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Travel Insurance</h4>
                      <p className="text-sm text-gray-600">Comprehensive travel coverage</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Not Included */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">What's Not Included</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Personal Expenses</h4>
                      <p className="text-sm text-gray-600">Shopping, additional snacks, and personal items</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Special Puja</h4>
                      <p className="text-sm text-gray-600">Any special puja or ritual charges</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Donations</h4>
                      <p className="text-sm text-gray-600">Temple donations or offerings</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Photography Fees</h4>
                      <p className="text-sm text-gray-600">Camera charges at heritage sites</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Medical Expenses</h4>
                      <p className="text-sm text-gray-600">Personal medical requirements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Things to Carry */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Things to Carry</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Valid ID proof (Aadhar/Voter/Passport)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Comfortable walking shoes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Light woolen clothes (for early morning)</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Personal medication</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Mobile phone with power bank</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Water bottle and light snacks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Tab */}
        {activeTab === "booking" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Book Your Rajasthan Special Tour</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Booking Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Travel Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Choose a date</option>
                      {tourData?.dates?.map((date: any) => (
                        <option key={date.id} value={date.id}>
                          {new Date(date.date).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })} - {date.availableSeats} seats available
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Passengers
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-lg font-semibold"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center">
                        <div className="text-2xl font-bold text-gray-900">{passengers}</div>
                        <div className="text-sm text-gray-500">Passengers</div>
                      </div>
                      <button
                        onClick={() => setPassengers(Math.min(6, passengers + 1))}
                        className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-lg font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Price Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price per person</span>
                        <span className="font-medium">₹2,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Number of passengers</span>
                        <span className="font-medium">× {passengers}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="font-semibold text-gray-900">Total Amount</span>
                        <span className="font-bold text-orange-600 text-xl">₹{2000 * passengers}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBookNow}
                    className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-lg"
                  >
                    Proceed to Booking
                  </button>

                  <div className="text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="w-4 h-4" />
                      <span>100% Secure Booking</span>
                    </div>
                    <div>Free cancellation up to 24 hours before departure</div>
                  </div>
                </div>

                {/* Booking Information */}
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Booking Information</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Confirmation will be sent via email and SMS</li>
                      <li>• Carry original ID proof during travel</li>
                      <li>• Reporting time 30 minutes before departure</li>
                      <li>• Pickup details will be shared after booking</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">Payment Options</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Credit/Debit Cards</li>
                      <li>• UPI Payments</li>
                      <li>• Net Banking</li>
                      <li>• Wallet Payments</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h3 className="font-semibold text-amber-900 mb-2">Need Help?</h3>
                    <div className="flex items-center gap-2 text-sm text-amber-800">
                      <Phone className="w-4 h-4" />
                      <span>Call us: +91 98765 43210</span>
                    </div>
                    <div className="text-sm text-amber-800 mt-1">
                      Email: support@weekenddarshan.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}