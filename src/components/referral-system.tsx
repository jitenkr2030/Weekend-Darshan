'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, Gift, Users, Share2, Copy, TrendingUp, MessageCircle, Star } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { toast } from '@/hooks/use-toast'

interface ReferralStats {
  referralCode: string
  totalReferrals: number
  totalEarnings: number
  pendingRewards: number
  successfulReferrals: number
}

export function ReferralSystem() {
  const { user } = useAuth()
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    referralCode: '',
    totalReferrals: 0,
    totalEarnings: 0,
    pendingRewards: 0,
    successfulReferrals: 0
  })
  const [referralEmail, setReferralEmail] = useState('')
  const [copied, setCopied] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Generate referral code on component mount
  useEffect(() => {
    if (user) {
      const code = `WKD${user.mobile?.slice(-4) || Math.random().toString(36).substr(2, 6).toUpperCase()}`
      setReferralStats(prev => ({
        ...prev,
        referralCode: code
      }))
    }
  }, [user])

  const copyReferralCode = async () => {
    try {
      const referralLink = `https://weekenddarshan.com?ref=${referralStats.referralCode}`
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      toast({
        title: "Referral Link Copied!",
        description: "Share this link with your friends and family",
      })
      setTimeout(() => setCopied(false), 3000)
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please try copying manually",
        variant: "destructive"
      })
    }
  }

  const shareReferral = async (platform: 'whatsapp' | 'facebook' | 'twitter' | 'email') => {
    const referralLink = `https://weekenddarshan.com?ref=${referralStats.referralCode}`
    const message = `🕉️ Join me on a spiritual weekend journey with WeekendDarshan!\n\nGet ₹100 OFF your first trip with my referral code: ${referralStats.referralCode}\n\nBook now: ${referralLink}`
    
    let url = ''
    
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(message)}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
        break
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(referralLink)}`
        break
      case 'email':
        url = `mailto:?subject=${encodeURIComponent('Join WeekendDarshan - Spiritual Weekend Tours')}&body=${encodeURIComponent(message)}`
        break
    }
    
    window.open(url, '_blank')
  }

  const sendReferralEmail = () => {
    if (!referralEmail) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive"
      })
      return
    }
    
    // Here you would integrate with your email service
    toast({
      title: "Invitation Sent!",
      description: `Referral invitation sent to ${referralEmail}`,
    })
    setReferralEmail('')
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const referralBenefits = [
    {
      title: "For You (Referrer)",
      benefits: [
        "₹150-₹300 for every successful referral",
        "Bonus points for each referral",
        "Special referral rewards at 5+ referrals",
        "Priority customer support"
      ],
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "For Your Friend (Referred)",
      benefits: [
        "₹100 OFF on their first booking",
        "Welcome gift package",
        "Loyalty points bonus",
        "Personal trip assistance"
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ]

  const howItWorks = [
    {
      step: 1,
      title: "Share Your Code",
      description: "Copy your unique referral code and share with friends",
      icon: <Share2 className="h-5 w-5" />
    },
    {
      step: 2,
      title: "Friend Books",
      description: "Your friend uses your code and gets ₹100 OFF their first trip",
      icon: <Users className="h-5 w-5" />
    },
    {
      step: 3,
      title: "You Earn Rewards",
      description: "Get ₹150-₹300 when their booking is confirmed",
      icon: <Gift className="h-5 w-5" />
    }
  ]

  return (
    <div className="space-y-6">
      {/* Referral Stats Overview */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              🤝 Your Referral Program
            </CardTitle>
            <Badge className="bg-green-500 text-white">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{referralStats.referralCode}</div>
              <div className="text-sm text-gray-500">Your Code</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{referralStats.totalReferrals}</div>
              <div className="text-sm text-gray-500">Total Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹{referralStats.totalEarnings}</div>
              <div className="text-sm text-gray-500">Total Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{referralStats.pendingRewards}</div>
              <div className="text-sm text-gray-500">Pending Rewards</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Your Code */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">📱 Share Your Referral Code</CardTitle>
          <p className="text-gray-600">Earn rewards by inviting friends and family to WeekendDarshan</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">Your Referral Code</div>
                <div className="text-2xl font-bold text-orange-600">{referralStats.referralCode}</div>
              </div>
              <Button
                onClick={copyReferralCode}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
            </div>
            <div className="text-xs text-gray-500">
              💡 Your friends will get ₹100 OFF when they use this code
            </div>
          </div>

          {/* Share Options */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Share via:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => shareReferral('whatsapp')}
                className="bg-green-500 hover:bg-green-600 text-white"
                variant="default"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={() => shareReferral('facebook')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                variant="default"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                onClick={() => shareReferral('twitter')}
                className="bg-sky-500 hover:bg-sky-600 text-white"
                variant="default"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                onClick={() => shareReferral('email')}
                variant="outline"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          {/* Email Referral */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Or send via email:</h4>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter friend's email"
                value={referralEmail}
                onChange={(e) => setReferralEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={sendReferralEmail} disabled={!referralEmail}>
                Send Invite
              </Button>
            </div>
            {showSuccess && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Invitation sent successfully!</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Referral Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {referralBenefits.map((benefit, index) => (
          <Card key={index} className={benefit.bgColor}>
            <CardHeader>
              <CardTitle className={`text-lg ${benefit.color}`}>{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {benefit.benefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">🔄 How It Works</CardTitle>
          <p className="text-gray-600">Simple 3-step process to earn rewards</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Step {step.step}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            🌟 Success Stories
          </CardTitle>
          <p className="text-gray-600">See how others are earning with our referral program</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Rajesh Kumar</div>
                  <div className="text-sm text-gray-500">12 Referrals • ₹3,600 Earned</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                "I referred my office colleagues and earned enough for a free trip! WeekendDarshan's referral program is amazing."
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Priya Sharma</div>
                  <div className="text-sm text-gray-500">8 Referrals • ₹2,400 Earned</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                "Sharing my referral code on WhatsApp helped me earn rewards quickly. My friends loved the discount too!"
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-purple-600" />
              <h4 className="font-semibold text-purple-800">Start Referring Today!</h4>
            </div>
            <p className="text-purple-700 text-sm mb-3">
              Join hundreds of devotees earning rewards by sharing WeekendDarshan with their friends and family.
            </p>
            <div className="text-xs text-purple-600">
              💡 Tip: Share your referral code in family WhatsApp groups and temple communities for better results!
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">📋 Referral Program Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Referral rewards are credited when the referred person completes their first paid booking</p>
            <p>• The referred person must use your unique referral code at the time of booking</p>
            <p>• Referral rewards are typically processed within 24-48 hours after the referred booking</p>
            <p>• WeekendDarshan reserves the right to modify or terminate the referral program at any time</p>
            <p>• Referral codes cannot be combined with other promotional offers unless explicitly stated</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}