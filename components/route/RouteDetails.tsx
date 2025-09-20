"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Share, AlertTriangle, TrendingUp, Navigation } from "lucide-react"
import type { Route as RouteType, Stop } from "@/lib/map/utils"

interface RouteDetailsProps {
  routeId?: string
}

interface RouteStop extends Stop {
  eta?: {
    inMinRange: [number, number]
    confidence: number
  }
}

export function RouteDetails({ routeId = "route-1" }: RouteDetailsProps) {
  const [route, setRoute] = useState<RouteType | null>(null)
  const [direction, setDirection] = useState<"forward" | "reverse">("forward")
  const [stops, setStops] = useState<RouteStop[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (routeId) {
      fetchRouteDetails()
    }
  }, [routeId, direction])

  const fetchRouteDetails = async () => {
    setLoading(true)
    try {
      // Mock route data
      const mockRoute: RouteType = {
        id: routeId,
        name: "Route 1",
        color: "#84cc16",
        direction: direction === "forward" ? "ISBT to Elante" : "Elante to ISBT",
        polyline: {
          type: "LineString",
          coordinates: [
            [76.76, 30.76],
            [76.78, 30.75],
            [76.8, 30.74],
          ],
        },
        stops: [],
      }

      const mockStops: RouteStop[] =
        direction === "forward"
          ? [
              {
                id: "stop-1",
                name: "ISBT-17",
                code: "ISB001",
                location: { lat: 30.76, lng: 76.76 },
                address: "Inter State Bus Terminal",
                accessible: true,
                eta: { inMinRange: [2, 4], confidence: 0.9 },
              },
              {
                id: "stop-2",
                name: "Sector 17 Plaza",
                code: "S17001",
                location: { lat: 30.75, lng: 76.78 },
                address: "Shopping Center",
                accessible: true,
                eta: { inMinRange: [8, 12], confidence: 0.8 },
              },
              {
                id: "stop-3",
                name: "Elante Mall",
                code: "ELT001",
                location: { lat: 30.74, lng: 76.8 },
                address: "Industrial Area Phase I",
                accessible: false,
                eta: { inMinRange: [15, 18], confidence: 0.7 },
              },
            ]
          : [
              {
                id: "stop-3",
                name: "Elante Mall",
                code: "ELT001",
                location: { lat: 30.74, lng: 76.8 },
                address: "Industrial Area Phase I",
                accessible: false,
                eta: { inMinRange: [3, 6], confidence: 0.8 },
              },
              {
                id: "stop-2",
                name: "Sector 17 Plaza",
                code: "S17001",
                location: { lat: 30.75, lng: 76.78 },
                address: "Shopping Center",
                accessible: true,
                eta: { inMinRange: [10, 14], confidence: 0.7 },
              },
              {
                id: "stop-1",
                name: "ISBT-17",
                code: "ISB001",
                location: { lat: 30.76, lng: 76.76 },
                address: "Inter State Bus Terminal",
                accessible: true,
                eta: { inMinRange: [18, 22], confidence: 0.9 },
              },
            ]

      setRoute(mockRoute)
      setStops(mockStops)
    } catch (error) {
      console.error("Failed to fetch route details:", error)
    } finally {
      setLoading(false)
    }
  }

  const getETAColor = (eta: RouteStop["eta"]) => {
    if (!eta) return "bg-gray-400/20 text-gray-400"
    const avgTime = (eta.inMinRange[0] + eta.inMinRange[1]) / 2
    if (avgTime <= 5) return "bg-green-400/20 text-green-400"
    if (avgTime <= 15) return "bg-yellow-400/20 text-yellow-400"
    return "bg-red-400/20 text-red-400"
  }

  const shareRoute = () => {
    if (navigator.share) {
      navigator.share({
        title: `${route?.name} - OnTimeBharat`,
        text: `Check live updates for ${route?.name} (${route?.direction})`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // Could show a toast notification here
    }
  }

  if (!route) return null

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }} />
            {route.name}
          </CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={shareRoute}>
              <Share className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline">
              <AlertTriangle className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Direction Selector */}
        <div className="flex rounded-lg bg-gray-900 p-1">
          <button
            onClick={() => setDirection("forward")}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              direction === "forward" ? "bg-lime-400 text-gray-900" : "text-gray-400 hover:text-white"
            }`}
          >
            <Navigation className="h-3 w-3 mr-1 inline" />
            Forward
          </button>
          <button
            onClick={() => setDirection("reverse")}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              direction === "reverse" ? "bg-lime-400 text-gray-900" : "text-gray-400 hover:text-white"
            }`}
          >
            <Navigation className="h-3 w-3 mr-1 inline rotate-180" />
            Reverse
          </button>
        </div>

        {/* Route Direction */}
        <div className="text-center">
          <p className="text-sm text-gray-400">{route.direction}</p>
        </div>

        {/* Stop Sequence */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Stops & ETAs</h4>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {stops.map((stop, index) => (
                <div key={stop.id} className="flex items-center gap-3 p-2 bg-gray-900/50 rounded">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    {index < stops.length - 1 && <div className="w-0.5 h-8 bg-gray-600 mt-1"></div>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white text-sm">{stop.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {stop.code}
                      </Badge>
                      {stop.accessible && (
                        <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">
                          ♿
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{stop.address}</p>
                  </div>

                  <div className="text-right">
                    {stop.eta ? (
                      <Badge className={`${getETAColor(stop.eta)} border-0 text-xs`}>
                        {stop.eta.inMinRange[0]}-{stop.eta.inMinRange[1]}m
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs text-gray-400">
                        --
                      </Badge>
                    )}
                    {stop.eta && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-8 bg-gray-700 rounded-full h-1">
                          <div
                            className="bg-lime-400 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${stop.eta.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{Math.round(stop.eta.confidence * 100)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Performance Chart Placeholder */}
        <div className="pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Schedule vs Live</span>
            <TrendingUp className="h-3 w-3 text-green-400" />
          </div>
          <div className="h-8 bg-gray-900 rounded flex items-end gap-1 px-2">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="flex-1 bg-lime-400 rounded-t" style={{ height: `${20 + Math.random() * 60}%` }} />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Last 12 hours performance</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-gray-700">
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <MapPin className="h-3 w-3 mr-1" />
            View on Map
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Report Issue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
