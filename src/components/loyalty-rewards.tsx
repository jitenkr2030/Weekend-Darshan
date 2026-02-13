'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Check, Star, Gift, Crown, Trophy, Users, Clock, MapPin } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

interface LoyaltyLevel {
  level: 'BRONZE' | 'SILVER' | 'GOLD'
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
  requiredTrips: number
  benefits: string[]
  discount: number
  nextLevelProgress?: number
}

export function LoyaltyRewards() {
  const { user } = useAuth()
  const [userLevel, setUserLevel] = useState<'BRONZE' | 'SILVER' | 'GOLD'>('BRONZE')
  const [totalTrips, setTotalTrips] = useState(0)
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [showRewards, setShowRewards] = useState(false)

  const loyaltyLevels: LoyaltyLevel[] = [
    {
      level: 'BRONZE',
      name: 'Bronze Yatri',
      icon: <Trophy className="h-6 w-6" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      requiredTrips: 0,
      benefits: [
        '₹100 discount on next trip',
        'Priority customer support',
        'Loyalty points earning'
      ],
      discount: 100
    },
    {
      level: 'SILVER',
      name: 'Silver Yatri',
      icon: <Star className="h-6 w-6" />,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      requiredTrips: 3,
      benefits: [
        '₹200 discount on every trip',
        'Priority seat selection',
        'Special boarding privileges',
        'Free prasad kit',
        'Dedicated trip captain'
      ],
      discount: 200
    },
    {
      level: 'GOLD',
      name: 'Gold Yatri',
      icon: <Crown className="h-6 w-6" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      requiredTrips: 5,
      benefits: [
        '₹300 discount on every trip',
        'VIP boarding experience',
        'Free prasad kit + special gifts',
        'Complimentary meal upgrades',
        'Personal trip coordinator',
        'Annual special event invitation'
      ],
      discount: 300
    }
  ]

  const currentLevel = loyaltyLevels.find(level => level.level === userLevel) || loyaltyLevels[0]
  const nextLevel = loyaltyLevels.find(level => level.requiredTrips > totalTrips)
  const progressToNext = nextLevel ? ((totalTrips - currentLevel.requiredTrips) / (nextLevel.requiredTrips - currentLevel.requiredTrips)) * 100 : 100

  const availableRewards = [
    {
      id: 'discount_next',
      title: 'Trip Discount',
      description: `₹${currentLevel.discount} off your next booking`,
      icon: <Gift className="h-5 w-5" />,
      type: 'DISCOUNT',
      value: currentLevel.discount,
      canRedeem: totalTrips > 0
    },
    {
      id: 'priority_boarding',
      title: 'Priority Boarding',
      description: 'Skip the queue with priority boarding',
      icon: <Users className="h-5 w-5" />,
      type: 'PRIVILEGE',
      value: null,
      canRedeem: userLevel !== 'BRONZE'
    },
    {
      id: 'free_prasad',
      title: 'Free Prasad Kit',
      description: 'Special prasad package from temples',
      icon: <Gift className="h-5 w-5" />,
      type: 'PHYSICAL',
      value: null,
      canRedeem: userLevel === 'GOLD'
    },
    {
      id: 'vip_experience',
      title: 'VIP Experience',
      description: 'Enhanced travel experience with special perks',
      icon: <Crown className="h-5 w-5" />,
      type: 'EXPERIENCE',
      value: null,
      canRedeem: userLevel === 'GOLD'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Current Level Status */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              🎖️ Your Loyalty Status
            </CardTitle>
            <Badge className={`${currentLevel.bgColor} ${currentLevel.color} border-0`}>
              {currentLevel.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${currentLevel.bgColor}`}>
              {currentLevel.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{currentLevel.name}</h3>
              <p className="text-gray-600">
                {totalTrips} trips completed • {loyaltyPoints} loyalty points
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">₹{currentLevel.discount}</div>
              <div className="text-sm text-gray-500">Discount per trip</div>
            </div>
          </div>

          {/* Progress to Next Level */}
          {nextLevel && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress to {nextLevel.name}
                </span>
                <span className="text-sm text-gray-500">
                  {totalTrips}/{nextLevel.requiredTrips} trips
                </span>
              </div>
              <Progress value={progressToNext} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {nextLevel.requiredTrips - totalTrips} more trips to unlock {nextLevel.name}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loyalty Levels Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">🏆 Loyalty Levels & Benefits</CardTitle>
          <p className="text-gray-600">Unlock better rewards as you travel with us</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loyaltyLevels.map((level, index) => (
              <Card 
                key={level.level}
                className={`relative ${level.level === userLevel ? 'ring-2 ring-orange-500' : ''} ${
                  index === 0 ? 'md:col-span-1' : ''
                }`}
              >
                {level.level === userLevel && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-orange-500 text-white">Current</Badge>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-center mb-2">
                    <div className={`p-3 rounded-full ${level.bgColor}`}>
                      {level.icon}
                    </div>
                  </div>
                  <CardTitle className="text-center text-lg">{level.name}</CardTitle>
                  <div className="text-center text-sm text-gray-500">
                    {level.requiredTrips === 0 ? 'Start Here' : `${level.requiredTrips}+ trips`}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold text-orange-600">₹{level.discount}</div>
                    <div className="text-sm text-gray-500">Discount per trip</div>
                  </div>
                  <div className="space-y-2">
                    {level.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                    {level.benefits.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{level.benefits.length - 3} more benefits
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-900">🎁 Your Available Rewards</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowRewards(!showRewards)}
            >
              {showRewards ? 'Hide' : 'Show'} All Rewards
            </Button>
          </div>
          <p className="text-gray-600">Redeem your points and unlock exclusive benefits</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableRewards.slice(0, showRewards ? availableRewards.length : 2).map((reward) => (
              <div 
                key={reward.id}
                className={`p-4 border rounded-lg ${
                  reward.canRedeem 
                    ? 'border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer' 
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    reward.canRedeem ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{reward.title}</h4>
                    <p className="text-sm text-gray-600">{reward.description}</p>
                    {reward.value && (
                      <div className="mt-1">
                        <span className="text-sm font-medium text-green-600">
                          Value: ₹{reward.value}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <Button 
                    size="sm" 
                    className="w-full"
                    variant={reward.canRedeem ? "default" : "outline"}
                    disabled={!reward.canRedeem}
                  >
                    {reward.canRedeem ? 'Redeem Reward' : `Unlock at ${loyaltyLevels.find(l => l.requiredTrips > (totalTrips || 0))?.name || 'Silver'}`}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Program Benefits */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-600" />
            Why Join Our Loyalty Program?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🎯 For Devotees Like You</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>Save money on every spiritual journey</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>Get priority treatment at temples</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>Join a community of fellow devotees</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🎉 Exclusive Perks</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>Special discounts and offers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>Free merchandise and prasad kits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>VIP experiences and privileges</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-purple-600" />
              <h4 className="font-semibold text-purple-800">Start Earning Today!</h4>
            </div>
            <p className="text-purple-700 text-sm mb-3">
              Every trip with WeekendDarshan earns you points and brings you closer to amazing rewards.
            </p>
            <div className="text-xs text-purple-600">
              💡 Pro tip: Book during special periods to earn bonus points and level up faster!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}