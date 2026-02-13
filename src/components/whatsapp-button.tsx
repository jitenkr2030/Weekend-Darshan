'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, X, Phone, Send } from 'lucide-react'

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export function WhatsAppButton({ 
  phoneNumber = "+918700189551", 
  message = "Hi, I'm interested in WeekendDarshan tours. Can you help me with booking?" 
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messageText, setMessageText] = useState(message)

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(messageText)
    window.open(`https://wa.me/${phoneNumber.replace(/[^\d+]/g, '')}?text=${encodedMessage}`, '_blank')
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="bg-green-500 rounded-full p-2">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">WhatsApp Support</h3>
                  <p className="text-sm text-gray-600">Get instant help 24/7</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="mb-4">
                <p className="text-gray-700 mb-2">
                  Hello! 👋 How can we help you today?
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Tour information and availability</p>
                  <p>• Booking assistance</p>
                  <p>• Special group discounts</p>
                  <p>• Custom tour planning</p>
                </div>
              </div>

              {/* Message Input */}
              <div className="mb-4">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessageText("Hi, I want to know about this weekend's tours")}
                  className="text-xs"
                >
                  Tour Info
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessageText("I need help with booking. Can you assist me?")}
                  className="text-xs"
                >
                  Booking Help
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessageText("Do you offer group discounts? We are [number] people.")}
                  className="text-xs"
                >
                  Group Discount
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessageText("I want to plan a custom tour. Is this possible?")}
                  className="text-xs"
                >
                  Custom Tour
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleWhatsAppClick}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send on WhatsApp
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>

              {/* Alternative Contact */}
              <div className="mt-4 pt-4 border-t text-center">
                <p className="text-sm text-gray-600 mb-2">Or call us directly:</p>
                <a
                  href={`tel:${phoneNumber.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700"
                >
                  <Phone className="h-4 w-4" />
                  <span className="font-semibold">{phoneNumber}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}