'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Gift, Shield, TShirt, Users, Star, Clock, Bus, MapPin } from 'lucide-react'
import { Trip } from '@/types'

interface CustomerPackageProps {
  trip: Trip
  onPackageSelect?: (packageType: string) => void
}

interface PackageFeature {
  icon: React.ReactNode
  title: string
  description: string
  included: boolean
}

export function CustomerPackage({ trip, onPackageSelect }: CustomerPackageProps) {
  const [selectedPackage, setSelectedPackage] = useState('standard')
  const [showDetails, setShowDetails] = useState(false)

  const packages = {
    standard: {
      name: 'Standard Yatri',
      price: trip.pricePerSeat,
      originalPrice: trip.pricePerSeat,
      savings: 0,
      badge: 'Basic Package',
      badgeColor: 'bg-gray-100 text-gray-800',
      features: [
        { icon: <Bus className="h-5 w-5" />, title: 'Comfortable AC Bus', description: 'Premium AC transportation', included: true },
        { icon: <Clock className="h-5 w-5" />, title: 'Planned Darshan', description: 'Optimized temple visit timing', included: true },
        { icon: <Users className="h-5 w-5" />, title: 'Trip Captain', description: 'Dedicated support person', included: true },
        { icon: <Clock className="h-5 w-5" />, title: 'Weekend Timing', description: 'Sat Night → Mon Morning', included: true },
        { icon: <TShirt className="h-5 w-5" />, title: 'Branded T-Shirt', description: '"WeekendDarshan Yatri" T-Shirt', included: false },
        { icon: <Shield className="h-5 w-5" />, title: 'Travel Insurance', description: 'Yatra Suraksha Kavach coverage', included: false },
        { icon: <MapPin className="h-5 w-5" />, title: 'Meals Included', description: '1 Lunch + 1 Dinner', included: false }
      ]
    },
    premium: {
      name: 'Premium Devotee',
      price: trip.pricePerSeat + 400,
      originalPrice: trip.pricePerSeat + 700,
      savings: 300,
      badge: 'Most Popular',
      badgeColor: 'bg-orange-100 text-orange-800',
      features: [
        { icon: <Bus className="h-5 w-5" />, title: 'Comfortable AC Bus', description: 'Premium AC transportation', included: true },
        { icon: <Clock className="h-5 w-5" />, title: 'Planned Darshan', description: 'Optimized temple visit timing', included: true },
        { icon: <Users className="h-5 w-5" />, title: 'Trip Captain', description: 'Dedicated support person', included: true },
        { icon: <Clock className="h-5 w-5" />, title: 'Weekend Timing', description: 'Sat Night → Mon Morning', included: true },
        { icon: <TShirt className="h-5 w-5" />, title: 'Branded T-Shirt', description: '"WeekendDarshan Yatri" T-Shirt', included: true },
        { icon: <Shield className="h-5 w-5" />, title: 'Travel Insurance', description: 'Yatra Suraksha Kavach coverage', included: true },
        { icon: <MapPin className="h-5 w-5" />, title: 'Meals Included', description: '1 Lunch + 1 Dinner', included: true }
      ]
    },
    vip: {
      name: 'VIP Yatri',
      price: trip.pricePerSeat + 800,
      originalPrice: trip.pricePerSeat + 1200,
      savings: 400,
      badge: 'VIP Experience',
      badgeColor: 'bg-purple-100 text-purple-800',
      features: [
        { icon: <Bus className="h-5 w-5" />, title: 'Comfortable AC Bus', description: 'Premium AC transportation', included: true },
        { icon: <Clock className="h-5 w-5" />, title: 'Planned Darshan', description: 'Optimized temple visit timing', included: true },
        { icon: <Users className="h-5 w-5" />, title: 'Trip Captain', description: 'Dedicated support person', included: true },
        { icon: <Clock className="h-5 w-5" />, title: 'Weekend Timing', description: 'Sat Night → Mon Morning', included: true },
        { icon: <TShirt className="h-5 w-5" />, title: 'Branded T-Shirt', description: '"WeekendDarshan Yatri" T-Shirt', included: true },
        { icon: <Shield className="h-5 w-5" />, title: 'Travel Insurance', description: 'Yatra Suraksha Kavach coverage', included: true },
        { icon: <MapPin className="h-5 w-5" />, title: 'Meals Included', description: '1 Lunch + 1 Dinner', included: true },
        { icon: <Star className="h-5 w-5" />, title: 'VIP Boarding', description: 'Priority boarding + special seating', included: true },
        { icon: <Gift className="h-5 w-5" />, title: 'Prasad Kit', description: 'Special prasad package', included: true }
      ]
    }
  }

  const currentPackage = packages[selectedPackage as keyof typeof packages]

  return (
    <div className="space-y-6">
      {/* Package Selection */}
      <div className="flex flex-col space-y-4">
        <h3 className="text-xl font-bold text-gray-900">🎁 Choose Your Yatri Package</h3>
        <p className="text-gray-600">Enhance your spiritual journey with exclusive benefits</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(packages).map(([key, pkg]) => (
            <Card 
              key={key}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedPackage === key ? 'ring-2 ring-orange-500 shadow-lg' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedPackage(key)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <Badge className={pkg.badgeColor}>{pkg.badge}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">₹{pkg.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{pkg.originalPrice}</span>
                  </div>
                  {pkg.savings > 0 && (
                    <div className="text-sm text-green-600 font-semibold">
                      Save ₹{pkg.savings}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {pkg.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`flex-shrink-0 ${feature.included ? 'text-green-600' : 'text-gray-400'}`}>
                        {feature.included ? <Check className="h-4 w-4" /> : <div className="h-4 w-4 border border-gray-300 rounded" />}
                      </div>
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Selected Package Details */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-900">
              🎁 {currentPackage.name} - What You Get
            </CardTitle>
            <Badge className={currentPackage.badgeColor}>{currentPackage.badge}</Badge>
          </div>
          <p className="text-gray-600">Clear package with no hidden costs</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Core Travel Experience */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <div className="bg-orange-100 rounded-full p-1">
                <Bus className="h-4 w-4 text-orange-600" />
              </div>
              🧳 Core Travel Experience
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentPackage.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full ${
                    feature.included ? 'bg-green-100' : 'bg-gray-100'
                  } flex items-center justify-center`}>
                    {feature.included ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <div className="h-3 w-3 bg-gray-300 rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className={`font-medium ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                      {feature.title}
                    </div>
                    <div className={`text-sm ${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Benefits */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <div className="bg-purple-100 rounded-full p-1">
                <Gift className="h-4 w-4 text-purple-600" />
              </div>
              🎉 Additional Benefits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentPackage.features.slice(4).map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full ${
                    feature.included ? 'bg-green-100' : 'bg-gray-100'
                  } flex items-center justify-center`}>
                    {feature.included ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <div className="h-3 w-3 bg-gray-300 rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className={`font-medium ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                      {feature.title}
                    </div>
                    <div className={`text-sm ${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-800">Amazing Value!</h4>
            </div>
            <p className="text-green-700 text-sm mb-3">
              You're getting ₹{currentPackage.originalPrice}+ value for just ₹{currentPackage.price}
            </p>
            <div className="text-xs text-green-600">
              👉 This includes travel, darshan planning, meals, T-shirt, insurance, and loyalty rewards
            </div>
          </div>

          {/* Trust Line */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800">🎯 Built by Devotees, For Devotees</h4>
            </div>
            <p className="text-blue-700 text-sm">
              "Built by a devotee who personally travelled these routes and removed every pain point."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold"
          onClick={() => onPackageSelect?.(selectedPackage)}
        >
          Continue with {currentPackage.name} - ₹{currentPackage.price}
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide' : 'Show'} Detailed Comparison
        </Button>
      </div>

      {/* Detailed Comparison (Toggle) */}
      {showDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Package Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Feature</th>
                    {Object.entries(packages).map(([key, pkg]) => (
                      <th key={key} className="text-center p-3 font-semibold">
                        {pkg.name}
                        <div className="text-xs text-gray-500 font-normal">₹{pkg.price}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {packages.standard.features.map((feature, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {feature.icon}
                          <div>
                            <div className="font-medium">{feature.title}</div>
                            <div className="text-sm text-gray-500">{feature.description}</div>
                          </div>
                        </div>
                      </td>
                      {Object.entries(packages).map(([key, pkg]) => (
                        <td key={key} className="text-center p-3">
                          {pkg.features[index].included ? (
                            <Check className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <div className="h-5 w-5 border border-gray-300 rounded-full mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}