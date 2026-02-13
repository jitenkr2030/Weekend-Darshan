'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Phone, User, LogOut, Bus } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { toast } from '@/hooks/use-toast'
import { LoginModal } from '@/components/auth/login-modal'

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
    })
    setIsOpen(false)
  }

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/rajasthan-tour', label: 'Rajasthan' },
    { href: '/braj-yatra', label: 'Braj Yatra' },
    { href: '/ganga-yatra', label: 'Ganga Yatra' },
    { href: '/vaishno-devi', label: 'Vaishno Devi' },
    { href: '/my-bookings', label: 'My Bookings' },
    { href: '#', label: 'Contact' },
  ]

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Bus className="h-6 w-6 text-orange-600" />
              <span className="text-orange-600 font-bold">WeekendDarshan</span>
            </SheetTitle>
          </SheetHeader>
          
          <nav className="mt-8 space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            {/* Contact Button */}
            <Button variant="outline" className="w-full justify-start">
              <Phone className="h-4 w-4 mr-2" />
              +91-9876543210
            </Button>
            
            {/* Auth Section */}
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name || user.mobile}
                  </p>
                  <p className="text-xs text-gray-500">Logged in</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                className="w-full"
                onClick={() => {
                  setIsAuthModalOpen(true)
                  setIsOpen(false)
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <LoginModal 
        open={isAuthModalOpen} 
        onOpenChange={setIsAuthModalOpen} 
      />
    </>
  )
}