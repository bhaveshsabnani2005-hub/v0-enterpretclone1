"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wifi, RefreshCw, MapPin, Clock } from "lucide-react"
import { usePreferences } from "@/store/preferences"

interface StopETA {
  stopId: string
  stopName: string
  stopCode: string
  routes: Array<{
    routeId: string
    routeName: string
    nextArrivals: string[]
  }>
}

export function LowBandwidthList() {
  const [stops, setStops] = useState<StopETA[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const { lowBandwidth } = usePreferences()

  useEffect(() => {
    if (lowBandwidth) {
      fetchStopsData()
    }
  }, [lowBandwidth])

  const fetchStopsData = async () => {
    setLoading(true)
    try {
      // Mock low-bandwidth data
      const mockStops: StopETA[] = [
        {
          stopId: "stop-1",
          stopName: "ISBT-17",
          stopCode: "ISB001",
          routes: [
            {
              routeId: "route-1",
              routeName: "Route 1",
              nextArrivals: ["2-4 min", "12-15 min", "25-28 min"],
            },
            {
              routeId: "route-3",
              routeName: "Route 3",
              nextArrivals: ["8-10 min", "20-22 min"],
            },
          ],
        },
        {
          stopId: "stop-2",
          stopName: "Sector 17 Plaza",
          stopCode: "S17001",
          routes: [
            {
              routeId: "route-1",
              routeName: "Route 1",
              nextArrivals: ["5-7 min", "18-20 min"],
            },
            {
              routeId: "route-2",
              routeName: "Route 2",
              nextArrivals: ["3-5 min", "15-17 min", "30-32 min"],
            },
          ],
        },
        {
          stopId: "stop-3",
          stopName: "Elante Mall",
          stopCode: "ELT001",
          routes: [
            {
              routeId: "route-1",
              routeName: "Route 1",
              nextArrivals: ["10-12 min", "25-27 min"],
            },
          ],
        },
      ]

      setStops(mockStops)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to fetch stops data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!lowBandwidth) {
    return null
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Wifi className="h-4 w-4 text-orange-400" />
            Low Bandwidth Mode
            <Badge variant="outline" className="text-xs text-orange-400 border-orange-400">
              Text Only
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400">
              {lastUpdated ? `Updated: ${lastUpdated.toLocaleTimeString()}` : "Not updated"}
            </div>
            <Button size="sm" variant="outline" onClick={fetchStopsData} disabled={loading}>
              <RefreshCw className={`h-3 w-3 mr-1 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stops & ETAs */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-400" />
            Stops & ETAs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-8 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {stops.map((stop) => (
                <div key={stop.stopId} className="border-b border-gray-700 pb-3 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-white text-sm">{stop.stopName}</h3>
                    <Badge variant="outline" className="text-xs">
                      {stop.stopCode}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {stop.routes.map((route) => (
                      <div key={route.routeId} className="bg-gray-900/50 rounded p-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-lime-400">{route.routeName}</span>
                          <Clock className="h-3 w-3 text-gray-400" />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {route.nextArrivals.map((arrival, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className={`text-xs ${
                                index === 0
                                  ? "text-green-400 border-green-400"
                                  : index === 1
                                    ? "text-yellow-400 border-yellow-400"
                                    : "text-gray-400 border-gray-400"
                              }`}
                            >
                              {arrival}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Route Status Summary */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-sm">Route Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Route 1 (ISBT-Elante)</span>
              <Badge className="bg-green-400/20 text-green-400 border-0 text-xs">On Time</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Route 2 (PGI-Sector 17)</span>
              <Badge className="bg-orange-400/20 text-orange-400 border-0 text-xs">Delayed</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Route 3 (University-Rock Garden)</span>
              <Badge className="bg-green-400/20 text-green-400 border-0 text-xs">On Time</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
