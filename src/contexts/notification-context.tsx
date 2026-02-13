'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface Notification {
  id: string
  userId?: string
  tripId?: string
  bookingId?: string
  type: string
  title: string
  message: string
  channels: string
  status: string
  sentAt?: string
  createdAt: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean
  fetchNotifications: () => Promise<void>
  markAsRead: (id: string) => void
  sendNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'status' | 'sentAt'>) => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/notifications')
      const data = await response.json()
      
      if (data.success) {
        setNotifications(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, status: 'READ' } : notif
      )
    )
  }

  const sendNotification = async (notification: Omit<Notification, 'id' | 'createdAt' | 'status' | 'sentAt'>) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      })

      const data = await response.json()
      
      if (data.success) {
        await fetchNotifications() // Refresh notifications
      }
    } catch (error) {
      console.error('Failed to send notification:', error)
    }
  }

  const unreadCount = notifications.filter(n => n.status !== 'READ').length

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      isLoading,
      fetchNotifications,
      markAsRead,
      sendNotification
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}