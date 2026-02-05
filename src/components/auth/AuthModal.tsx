'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Phone, Mail, User, ArrowRight, RefreshCw } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'register'
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const { sendOTP, login, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab)
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [isSendingOTP, setIsSendingOTP] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [receivedOTP, setReceivedOTP] = useState('')

  const handleSendOTP = async () => {
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      toast({
        title: 'Invalid Mobile',
        description: 'Please enter a valid 10-digit mobile number',
        variant: 'destructive'
      })
      return
    }

    setIsSendingOTP(true)
    try {
      const result = await sendOTP(mobile)
      if (result.success) {
        setOtpSent(true)
        toast({
          title: 'OTP Sent',
          description: 'OTP has been sent to your mobile number',
        })
        
        // For demo purposes, show the OTP
        if (result.otp) {
          setReceivedOTP(result.otp)
        }
      } else {
        toast({
          title: 'Failed to Send OTP',
          description: result.error || 'Please try again',
          variant: 'destructive'
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send OTP. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSendingOTP(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast({
        title: 'OTP Required',
        description: 'Please enter the OTP sent to your mobile',
        variant: 'destructive'
      })
      return
    }

    setIsVerifying(true)
    try {
      const result = await login(mobile, otp)
      if (result.success) {
        toast({
          title: 'Login Successful',
          description: 'Welcome to WeekendDarshan!',
        })
        onClose()
        resetForm()
      } else {
        toast({
          title: 'Verification Failed',
          description: result.error || 'Invalid OTP. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify OTP. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const resetForm = () => {
    setMobile('')
    setOtp('')
    setName('')
    setEmail('')
    setOtpSent(false)
    setReceivedOTP('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-xl font-bold text-orange-600">WeekendDarshan</span>
            </div>
            <p className="text-sm text-gray-600">Login to book your spiritual journey</p>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-10"
                    maxLength={10}
                    disabled={otpSent}
                  />
                </div>
              </div>

              {!otpSent ? (
                <Button 
                  onClick={handleSendOTP} 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={isSendingOTP || !mobile || mobile.length !== 10}
                >
                  {isSendingOTP ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                    />
                    {receivedOTP && (
                      <p className="text-xs text-green-600 mt-1 text-center">
                        Demo OTP: {receivedOTP}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setOtpSent(false)}
                      className="flex-1"
                    >
                      Change Number
                    </Button>
                    <Button 
                      onClick={handleVerifyOTP}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                      disabled={isVerifying || !otp || otp.length !== 6}
                    >
                      {isVerifying ? 'Verifying...' : 'Verify & Login'}
                    </Button>
                  </div>

                  <Button 
                    variant="ghost" 
                    onClick={handleSendOTP}
                    disabled={isSendingOTP}
                    className="w-full text-sm"
                  >
                    {isSendingOTP ? 'Resending...' : 'Resend OTP'}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="reg-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="reg-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reg-email">Email (Optional)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reg-mobile">Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="reg-mobile"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-10"
                    maxLength={10}
                    disabled={otpSent}
                  />
                </div>
              </div>

              {!otpSent ? (
                <Button 
                  onClick={handleSendOTP} 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={isSendingOTP || !mobile || mobile.length !== 10 || !name}
                >
                  {isSendingOTP ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reg-otp">Enter OTP</Label>
                    <Input
                      id="reg-otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                    />
                    {receivedOTP && (
                      <p className="text-xs text-green-600 mt-1 text-center">
                        Demo OTP: {receivedOTP}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setOtpSent(false)}
                      className="flex-1"
                    >
                      Change Number
                    </Button>
                    <Button 
                      onClick={handleVerifyOTP}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                      disabled={isVerifying || !otp || otp.length !== 6}
                    >
                      {isVerifying ? 'Verifying...' : 'Verify & Register'}
                    </Button>
                  </div>

                  <Button 
                    variant="ghost" 
                    onClick={handleSendOTP}
                    disabled={isSendingOTP}
                    className="w-full text-sm"
                  >
                    {isSendingOTP ? 'Resending...' : 'Resend OTP'}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}