'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Download, Smartphone } from 'lucide-react'

interface PWAInstallPrompt {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPrompt | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [isIOS] = useState(() => {
    if (typeof window === 'undefined') return false
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  })

  useEffect(() => {
    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as any)
      setShowBanner(true)
    }

    // Check if user already dismissed the banner
    const dismissed = localStorage.getItem('pwa-banner-dismissed')
    if (!dismissed) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  // Show banner for iOS users after a delay if not dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-banner-dismissed')
    if (isIOS && !dismissed) {
      setTimeout(() => setShowBanner(true), 3000)
    }
  }, [isIOS])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === 'accepted') {
          setShowBanner(false)
        }
      } catch (error) {
        console.error('Error installing PWA:', error)
      }
    }
  }

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem('pwa-banner-dismissed', 'true')
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-6 w-6 p-0"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="flex items-start gap-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Smartphone className="h-6 w-6 text-orange-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 mb-1">
              Install WeekendDarshan App
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              {isIOS 
                ? "Add to Home Screen for quick access to spiritual tours!"
                : "Install our app for the best experience and offline access!"
              }
            </p>
            
            {isIOS ? (
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <p className="font-medium mb-1">To install on iOS:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Tap Share button <span className="font-mono">⎋</span></li>
                  <li>Scroll and tap "Add to Home Screen"</li>
                  <li>Tap "Add" to confirm</li>
                </ol>
              </div>
            ) : (
              <Button 
                size="sm" 
                onClick={handleInstallClick}
                className="w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Install App
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}