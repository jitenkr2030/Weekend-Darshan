'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/auth-context'
import { toast } from '@/hooks/use-toast'
import { Loader2, Smartphone, ArrowLeft, CheckCircle } from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'register'
}

export function LoginModal({ isOpen, onClose, defaultTab = 'login' }: LoginModalProps) {
  const { sendOTP, login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [demoOTP, setDemoOTP] = useState<string>('')
  const [showOTPInput, setShowOTPInput] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSendOTP = async () => {
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      toast({
        title: 'Invalid Mobile',
        description: 'Please enter a valid 10-digit mobile number',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await sendOTP(mobile)
      if (result.success) {
        setShowOTPInput(true)
        toast({
          title: 'OTP Sent',
          description: 'OTP has been sent to your mobile number',
        })
        if (result.demoOTP) {
          setDemoOTP(result.demoOTP)
          toast({
            title: 'Demo OTP',
            description: `For demo: ${result.demoOTP}`,
          })
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to send OTP',
          variant: 'destructive'
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send OTP',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a valid 6-digit OTP',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)
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
          title: 'Login Failed',
          description: result.error || 'Invalid OTP',
          variant: 'destructive'
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Login failed',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setMobile('')
    setOtp('')
    setShowOTPInput(false)
    setDemoOTP('')
    setName('')
    setEmail('')
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
              <Smartphone className="h-6 w-6 text-orange-600" />
              <span className="text-xl font-bold">Login to WeekendDarshan</span>
            </div>
            <p className="text-sm text-gray-600 font-normal">
              Enter your mobile number to continue
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!showOTPInput ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                  className="text-center text-lg"
                />
              </div>
              
              <Button 
                onClick={handleSendOTP}
                disabled={isLoading || mobile.length !== 10}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>

              <div className="text-center text-sm text-gray-500">
                We'll send a 6-digit verification code
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    OTP sent to +91-{mobile}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg"
                  autoFocus
                />
              </div>

              {demoOTP && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 text-center">
                    <strong>Demo OTP:</strong> {demoOTP}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowOTPInput(false)}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleVerifyOTP}
                  disabled={isLoading || otp.length !== 6}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>
              </div>

              <Button 
                variant="ghost" 
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full text-sm"
              >
                Resend OTP
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}