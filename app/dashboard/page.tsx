"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TwoStepLocationSearch from "@/components/search/TwoStepLocationSearch"
import { ServiceAlerts } from "@/components/alerts/ServiceAlerts"
import { SyncPanel } from "@/components/panels/SyncPanel"
import { RouteStopFinder } from "@/components/search/RouteStopFinder"
import { LiveBusTable } from "@/components/tracking/LiveBusTable"
import { AccessibilityPanel } from "@/components/accessibility/AccessibilityPanel"
import { LowBandwidthList } from "@/components/common/LowBandwidthList"
import StopDetails from "@/components/stops/StopDetails"
import { LiveBuses } from "@/components/buses/LiveBuses"
import { AnimatedMapOverlay } from "@/components/map/AnimatedMapOverlay"
import { Sidebar } from "@/components/navigation/Sidebar"
import { Bus, Clock, Users, Settings, Navigation, Wifi, WifiOff, RefreshCw, Zap } from "lucide-react"
import { usePreferences } from "@/store/preferences"
import type { BusLocation } from "@/lib/map/utils"

interface RouteData {
  busesLive: number
  avgDelay: string
  onTimePercent: string
  passengers: string
  nearestBus: {
    id: string
    route: string
    arrival: string
    currentStop: string
  }
  crowdDensity: number
  crowdLevel: string
}

const getRouteData = (from: string, to: string): RouteData => {
  // Generate contextual data based on route
  if (from.toLowerCase().includes("sector 17") && to.toLowerCase().includes("elante")) {
    return {
      busesLive: 247,
      avgDelay: "3.2m",
      onTimePercent: "87%",
      passengers: "12.4k",
      nearestBus: {
        id: "CHD-001",
        route: "Sector 17 → Elante Mall",
        arrival: "in 4 min",
        currentStop: "Sector 17 Plaza",
      },
      crowdDensity: 70,
      crowdLevel: "Medium crowd",
    }
  }

  // Default data for other routes
  return {
    busesLive: 156,
    avgDelay: "2.8m",
    onTimePercent: "91%",
    passengers: "8.7k",
    nearestBus: {
      id:
        "CHD-" +
        Math.floor(Math.random() * 100)
          .toString()
          .padStart(3, "0"),
      route: `${from} → ${to}`,
      arrival: `in ${Math.floor(Math.random() * 8) + 2} min`,
      currentStop: from,
    },
    crowdDensity: Math.floor(Math.random() * 40) + 30,
    crowdLevel: Math.random() > 0.5 ? "Light crowd" : "Medium crowd",
  }
}

export default function DashboardPage() {
  const [isOnline, setIsOnline] = useState(true)
  const [isLowBandwidth, setIsLowBandwidth] = useState(false)
  const [selectedCity] = useState("Chandigarh")
  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null)
  const [selectedRoute, setSelectedRoute] = useState<string>("route-1")
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const { lowBandwidth } = usePreferences()

  const handleLocationChange = useCallback((from: string, to: string) => {
    setFromLocation(from)
    setToLocation(to)
    const data = getRouteData(from, to)
    setRouteData(data)
  }, [])

  const handleClearLocations = useCallback(() => {
    setFromLocation("")
    setToLocation("")
    setRouteData(null)
  }, [])

  const handleSearchResult = (result: any) => {
    if (result.type === "routes") {
      setSelectedRoute(result.id)
    }
  }

  const handleBusSelect = (bus: BusLocation) => {
    setSelectedBus(bus)
    setSelectedRoute(bus.routeId)
  }

  const getCrowdColor = (density: number) => {
    if (density < 40) return "text-green-400"
    if (density <= 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar />

      <div className="ml-16 lg:ml-64 scroll-smooth">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-lime-400">OnTimeBharat</h1>
                <Badge variant="outline" className="text-lime-400 border-lime-400">
                  {selectedCity}
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <Wifi className="h-4 w-4 text-green-400" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-400" />
                  )}
                  <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={isLowBandwidth ? "default" : "outline"}
                    onClick={() => setIsLowBandwidth(!isLowBandwidth)}
                    className={
                      isLowBandwidth
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "border-orange-500 text-orange-400 hover:bg-orange-500/10"
                    }
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {isLowBandwidth ? "Low Bandwidth" : "Full Mode"}
                  </Button>
                </div>

                <Button size="sm" variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>

                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <section id="home" className="mb-12 scroll-mt-20">
            <TwoStepLocationSearch onLocationChange={handleLocationChange} onClear={handleClearLocations} />
          </section>

          {routeData ? (
            <>
              {/* Data Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Buses Live</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Bus className="h-5 w-5 text-lime-400" />
                      <span className="text-2xl font-bold text-white">{routeData.busesLive}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Avg Delay</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-400" />
                      <span className="text-2xl font-bold text-white">{routeData.avgDelay}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">On-Time %</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-green-400" />
                      <span className="text-2xl font-bold text-white">{routeData.onTimePercent}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Passengers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-400" />
                      <span className="text-2xl font-bold text-white">{routeData.passengers}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-lime-400">Nearest Bus</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Bus ID:</span>
                      <span className="font-semibold text-white">{routeData.nearestBus.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Route:</span>
                      <span className="font-semibold text-white">{routeData.nearestBus.route}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Arrival:</span>
                      <span className="font-semibold text-blue-400">{routeData.nearestBus.arrival}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Current Stop:</span>
                      <span className="font-semibold text-white">{routeData.nearestBus.currentStop}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-lime-400">Crowd Density</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Density:</span>
                      <span className={`font-semibold text-2xl ${getCrowdColor(routeData.crowdDensity)}`}>
                        {routeData.crowdDensity}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          routeData.crowdDensity < 40
                            ? "bg-green-500"
                            : routeData.crowdDensity <= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${routeData.crowdDensity}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Level:</span>
                      <span className={`font-semibold ${getCrowdColor(routeData.crowdDensity)}`}>
                        {routeData.crowdLevel}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {isLowBandwidth ? (
                <LowBandwidthList />
              ) : (
                <>
                  <div className="grid lg:grid-cols-3 gap-6">
                    <section id="live-map" className="lg:col-span-2 scroll-mt-20">
                      <Card className="bg-gray-800 border-gray-700 h-96">
                        <CardHeader>
                          <CardTitle className="text-lg text-lime-400 flex items-center gap-2">
                            <Navigation className="h-5 w-5" />
                            Live Bus Map - {fromLocation} → {toLocation}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 h-full">
                          <div className="relative h-full rounded-b-lg overflow-hidden">
                            <img
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AbZDK7dw1mC3dK4v7qr716epihhj8E.png"
                              alt="Chandigarh Bus Route Map showing Sector 17 and surrounding areas"
                              className="w-full h-full object-cover"
                            />
                            <AnimatedMapOverlay routeData={routeData} />
                          </div>
                        </CardContent>
                      </Card>
                    </section>

                    {/* Right Panel */}
                    <div className="space-y-4">
                      <RouteStopFinder onResultSelect={handleSearchResult} />
                      <section id="live-buses" className="scroll-mt-20">
                        <LiveBuses />
                      </section>
                      <section id="stop-details" className="scroll-mt-20">
                        <StopDetails />
                      </section>
                      <section id="service-alerts" className="scroll-mt-20">
                        <ServiceAlerts />
                      </section>
                      <SyncPanel />
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6 mt-6">
                    <LiveBusTable onBusSelect={handleBusSelect} selectedBusId={selectedBus?.id} />
                  </div>
                </>
              )}

              {/* System Status Section */}
              <section id="system-status" className="grid lg:grid-cols-1 gap-6 mt-12 scroll-mt-20">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Settings className="h-4 w-4 text-green-400" />
                      System Status
                      <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                        Online
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">API Status:</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Operational
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Database:</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Connected
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Live Tracking:</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Active
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id="accessibility" className="grid lg:grid-cols-1 gap-6 mt-6 scroll-mt-20">
                <AccessibilityPanel />
              </section>
            </>
          ) : (
            <div className="text-center py-16">
              <Bus className="h-16 w-16 text-gray-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Welcome to OnTimeBharat</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                Enter your current location and destination above to view real-time transit data and live bus tracking.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-lime-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Navigation className="h-6 w-6 text-lime-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Real-time Tracking</h3>
                  <p className="text-sm text-gray-400">Live bus locations and arrival times</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Crowd Density</h3>
                  <p className="text-sm text-gray-400">See how crowded buses are before boarding</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Smart Routing</h3>
                  <p className="text-sm text-gray-400">Optimized routes and delay predictions</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
