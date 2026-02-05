'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  ArrowLeft, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Bus,
  BarChart3,
  PieChart,
  Activity,
  RefreshCw
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns'
import Link from 'next/link'

interface ReportData {
  overview: {
    totalRevenue: number
    totalBookings: number
    totalTrips: number
    averageBookingValue: number
    occupancyRate: number
    growthRate: number
  }
  monthlyRevenue: Array<{
    month: string
    revenue: number
    bookings: number
  }>
  routePerformance: Array<{
    route: string
    bookings: number
    revenue: number
    occupancyRate: number
  }>
  templePerformance: Array<{
    temple: string
    bookings: number
    revenue: number
  }>
  recentTrends: Array<{
    date: string
    bookings: number
    revenue: number
  }>
}

export default function AdminReportsPage() {
  const router = useRouter()
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30days')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem('adminSession')
    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchReportData()
  }, [timeRange])

  const fetchReportData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/reports?timeRange=${timeRange}`)
      const data = await response.json()
      
      if (data.success) {
        setReportData(data.data)
      } else {
        throw new Error(data.error || 'Failed to fetch report data')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load reports',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const exportReport = async (type: string) => {
    try {
      const response = await fetch(`/api/admin/reports/export?type=${type}&timeRange=${timeRange}`)
      const data = await response.json()
      
      if (data.success) {
        // Create and download CSV
        const csvContent = data.csv
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${type}-report-${format(new Date(), 'yyyy-MM-dd')}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
        
        toast({
          title: 'Success',
          description: `${type} report exported successfully`,
        })
      } else {
        throw new Error(data.error || 'Failed to export report')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export report',
        variant: 'destructive'
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500">No report data available</p>
          </div>
        </div>
      </div>
    )
  }

  const { overview, monthlyRevenue, routePerformance, templePerformance, recentTrends } = reportData

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Reports & Analytics</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={fetchReportData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{overview.totalRevenue.toLocaleString('en-IN')}
                  </p>
                  <div className={`flex items-center justify-center text-xs mt-1 ${
                    overview.growthRate >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {overview.growthRate >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(overview.growthRate)}%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-blue-600">{overview.totalBookings}</p>
                  <p className="text-xs text-gray-500 mt-1">All time</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Total Trips</p>
                  <p className="text-2xl font-bold text-purple-600">{overview.totalTrips}</p>
                  <p className="text-xs text-gray-500 mt-1">Organized</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Avg Booking Value</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ₹{Math.round(overview.averageBookingValue).toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Per booking</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-teal-600">{overview.occupancyRate}%</p>
                  <p className="text-xs text-gray-500 mt-1">Average</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                  <p className={`text-2xl font-bold ${
                    overview.growthRate >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {overview.growthRate >= 0 ? '+' : ''}{overview.growthRate}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">vs last period</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => exportReport('revenue')}>
                  <Download className="h-4 w-4 mr-2" />
                  Revenue Report
                </Button>
                <Button variant="outline" onClick={() => exportReport('bookings')}>
                  <Download className="h-4 w-4 mr-2" />
                  Bookings Report
                </Button>
                <Button variant="outline" onClick={() => exportReport('trips')}>
                  <Download className="h-4 w-4 mr-2" />
                  Trips Report
                </Button>
                <Button variant="outline" onClick={() => exportReport('customers')}>
                  <Download className="h-4 w-4 mr-2" />
                  Customers Report
                </Button>
                <Button variant="outline" onClick={() => exportReport('performance')}>
                  <Download className="h-4 w-4 mr-2" />
                  Performance Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analytics */}
          <Tabs defaultValue="revenue" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
              <TabsTrigger value="routes">Route Performance</TabsTrigger>
              <TabsTrigger value="temples">Temple Analytics</TabsTrigger>
              <TabsTrigger value="trends">Recent Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue & Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyRevenue.map((month, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{month.month}</p>
                          <p className="text-sm text-gray-600">{month.bookings} bookings</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ₹{month.revenue.toLocaleString('en-IN')}
                          </p>
                          <p className="text-sm text-gray-600">
                            Avg: ₹{month.bookings > 0 ? Math.round(month.revenue / month.bookings).toLocaleString('en-IN') : 0}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="routes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Route Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {routePerformance.map((route, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{route.route}</p>
                          <p className="text-sm text-gray-600">{route.bookings} bookings</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ₹{route.revenue.toLocaleString('en-IN')}
                          </p>
                          <p className="text-sm text-gray-600">
                            Occupancy: {route.occupancyRate}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="temples" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Temple Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {templePerformance.map((temple, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{temple.temple}</p>
                          <p className="text-sm text-gray-600">{temple.bookings} bookings</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ₹{temple.revenue.toLocaleString('en-IN')}
                          </p>
                          <p className="text-sm text-gray-600">
                            Avg: ₹{temple.bookings > 0 ? Math.round(temple.revenue / temple.bookings).toLocaleString('en-IN') : 0}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTrends.map((trend, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{format(new Date(trend.date), 'MMM d, yyyy')}</p>
                          <p className="text-sm text-gray-600">{trend.bookings} bookings</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ₹{trend.revenue.toLocaleString('en-IN')}
                          </p>
                          <p className="text-sm text-gray-600">
                            Daily avg: ₹{trend.bookings > 0 ? Math.round(trend.revenue / trend.bookings).toLocaleString('en-IN') : 0}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}