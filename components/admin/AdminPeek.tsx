"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Download, AlertTriangle, CheckCircle, XCircle, TrendingUp } from "lucide-react"

interface FleetSummary {
  totalBuses: number
  activeBuses: number
  delayedBuses: number
  missedTrips: number
  serviceReliability: number
  recentActivities: Array<{
    id: string
    type: "alert" | "maintenance" | "route_change"
    message: string
    timestamp: Date
  }>
}

export function AdminPeek() {
  const [fleetData, setFleetData] = useState<FleetSummary | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchFleetSummary()
  }, [])

  const fetchFleetSummary = async () => {
    setLoading(true)
    try {
      // Mock admin data
      const mockData: FleetSummary = {
        totalBuses: 280,
        activeBuses: 247,
        delayedBuses: 23,
        missedTrips: 5,
        serviceReliability: 87,
        recentActivities: [
          {
            id: "1",
            type: "alert",
            message: "Route 2 experiencing delays due to traffic",
            timestamp: new Date(Date.now() - 300000), // 5 minutes ago
          },
          {
            id: "2",
            type: "maintenance",
            message: "Bus CHD-045 scheduled for maintenance",
            timestamp: new Date(Date.now() - 900000), // 15 minutes ago
          },
          {
            id: "3",
            type: "route_change",
            message: "Temporary stop added to Route 5",
            timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
          },
        ],
      }
      setFleetData(mockData)
    } catch (error) {
      console.error("Failed to fetch fleet summary:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = () => {
    // Mock export functionality
    const data = {
      timestamp: new Date().toISOString(),
      fleetSummary: fleetData,
      exportType: "admin_summary",
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `fleet-summary-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getActivityIcon = (type: FleetSummary["recentActivities"][0]["type"]) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-3 w-3 text-orange-400" />
      case "maintenance":
        return <XCircle className="h-3 w-3 text-red-400" />
      case "route_change":
        return <CheckCircle className="h-3 w-3 text-blue-400" />
    }
  }

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 90) return "text-green-400"
    if (reliability >= 75) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Shield className="h-4 w-4 text-purple-400" />
          Admin Overview
          <Badge variant="outline" className="text-xs text-purple-400 border-purple-400">
            Admin
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : fleetData ? (
          <div className="space-y-4">
            {/* Fleet Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Total Fleet</span>
                  <span className="text-sm font-medium text-white">{fleetData.totalBuses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Active</span>
                  <span className="text-sm font-medium text-green-400">{fleetData.activeBuses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Delayed</span>
                  <span className="text-sm font-medium text-orange-400">{fleetData.delayedBuses}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Missed Trips</span>
                  <span className="text-sm font-medium text-red-400">{fleetData.missedTrips}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Reliability</span>
                  <span className={`text-sm font-medium ${getReliabilityColor(fleetData.serviceReliability)}`}>
                    {fleetData.serviceReliability}%
                  </span>
                </div>
              </div>
            </div>

            {/* Service Reliability Donut */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Service Reliability</span>
                <TrendingUp className="h-3 w-3 text-green-400" />
              </div>
              <Progress value={fleetData.serviceReliability} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-300">Recent Activities</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {fleetData.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-2 p-2 bg-gray-900/50 rounded text-xs">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-white truncate">{activity.message}</p>
                      <p className="text-gray-400">{activity.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-gray-700">
              <Button size="sm" variant="outline" onClick={exportData} className="flex-1 bg-transparent">
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
              <Button size="sm" variant="outline" onClick={fetchFleetSummary} className="flex-1 bg-transparent">
                <TrendingUp className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <Shield className="h-8 w-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Admin data unavailable</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
