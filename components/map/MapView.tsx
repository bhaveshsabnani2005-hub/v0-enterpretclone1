"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Layers, Navigation, MapPin, Bus, Zap, X } from "lucide-react"

interface MapViewProps {
  className?: string
  demoMode?: boolean
  isPlaying?: boolean
  demoTime?: number
  onBusSelect?: (bus: BusLocation) => void
}

export interface BusLocation {
  id: string
  routeId: string
  lat: number
  lng: number
  speed: number
  passengers: number
  status: string
  direction: number
}

interface BusData {
  busId: string
  routeName: string
  currentLocation: string
  status: string
  crowdLevel: {
    occupancy: string
    passengers: number
    totalSeats: number
    crowdStatus: string
    waitTime: string
  }
  nextStops: string[]
  eta: {
    nextStop: string
    finalDestination: string
  }
  driver: {
    name: string
    rating: number
    busNumber: string
  }
}

interface RouteStop {
  name: string
  lat: number
  lng: number
  current?: boolean
}

interface RouteData {
  name: string
  color: string
  stops: RouteStop[]
}

export function MapView({ className, demoMode = false, isPlaying = true, demoTime = 0, onBusSelect }: MapViewProps) {
  const [showLayers, setShowLayers] = useState(false)
  const [activeLayers, setActiveLayers] = useState({
    routes: true,
    stops: true,
    traffic: false,
    occupancy: false,
    weather: false,
  })

  const [isDemoActive, setIsDemoActive] = useState(false)
  const [demoData, setDemoData] = useState<{
    busData: BusData
    routeData: RouteData
    center: { lat: number; lng: number }
  } | null>(null)
  const [showBusPopup, setShowBusPopup] = useState(false)

  const [demoBuses, setDemoBuses] = useState<BusLocation[]>([
    {
      id: "CHD-001",
      routeId: "Route 1",
      lat: 30.7333,
      lng: 76.7794,
      speed: 28,
      passengers: 32,
      status: "moving",
      direction: 45,
    },
    {
      id: "CHD-002",
      routeId: "Route 2",
      lat: 30.74,
      lng: 76.785,
      speed: 0,
      passengers: 18,
      status: "stopped",
      direction: 90,
    },
    {
      id: "CHD-003",
      routeId: "Route 3",
      lat: 30.728,
      lng: 76.772,
      speed: 35,
      passengers: 41,
      status: "moving",
      direction: 180,
    },
    {
      id: "CHD-004",
      routeId: "Route 4",
      lat: 30.745,
      lng: 76.79,
      speed: 22,
      passengers: 25,
      status: "moving",
      direction: 270,
    },
    {
      id: "CHD-005",
      routeId: "Route 5",
      lat: 30.72,
      lng: 76.765,
      speed: 0,
      passengers: 8,
      status: "delayed",
      direction: 0,
    },
  ])

  const demoRoutes = [
    { id: "Route 1", name: "Sector 17 ↔ Elante Mall", color: "#3b82f6", buses: 3 },
    { id: "Route 2", name: "Railway Station ↔ Airport", color: "#10b981", buses: 2 },
    { id: "Route 3", name: "ISBT ↔ Panchkula", color: "#8b5cf6", buses: 4 },
    { id: "Route 4", name: "Mohali ↔ Chandigarh", color: "#f59e0b", buses: 2 },
    { id: "Route 5", name: "University ↔ City Center", color: "#ec4899", buses: 1 },
  ]

  useEffect(() => {
    if (demoMode && isPlaying) {
      const interval = setInterval(() => {
        setDemoBuses((prevBuses) =>
          prevBuses.map((bus) => ({
            ...bus,
            // Simulate movement
            lat: bus.lat + Math.sin(demoTime / 10 + bus.direction) * 0.001,
            lng: bus.lng + Math.cos(demoTime / 10 + bus.direction) * 0.001,
            speed: bus.status === "stopped" ? 0 : Math.max(15, bus.speed + Math.sin(demoTime / 5) * 5),
            passengers: Math.max(5, Math.min(45, bus.passengers + Math.floor(Math.sin(demoTime / 8) * 3))),
          })),
        )
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [demoMode, isPlaying, demoTime])

  useEffect(() => {
    const handleSector17Demo = (event: CustomEvent) => {
      console.log("[v0] Received Sector 17 demo event", event.detail)
      setDemoData({
        busData: event.detail.busData,
        routeData: event.detail.routeData,
        center: event.detail.center,
      })
      setIsDemoActive(true)

      // Auto-show bus popup after animation
      setTimeout(() => {
        setShowBusPopup(true)
      }, 2000)
    }

    window.addEventListener("sector17Demo", handleSector17Demo as EventListener)
    return () => {
      window.removeEventListener("sector17Demo", handleSector17Demo as EventListener)
    }
  }, [])

  const sampleRoutes = [
    {
      name: "Route 1",
      color: "#84cc16",
      stops: ["ISBT-17", "Sector 17 Plaza", "Elante Mall"],
    },
  ]

  const sampleBuses = [
    {
      id: "CHD-001",
      route: "Route 1",
      status: "moving",
      speed: 28,
      delay: 4,
      occupancy: 0.7,
    },
    {
      id: "CHD-002",
      route: "Route 1",
      status: "stopped",
      speed: 0,
      delay: 2,
      occupancy: 0.4,
    },
  ]

  const toggleLayer = (layerName: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layerName]: !prev[layerName],
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "moving":
        return "bg-teal-500"
      case "stopped":
        return "bg-yellow-500"
      case "delayed":
        return "bg-orange-500"
      default:
        return "bg-red-500"
    }
  }

  const closeDemoMode = () => {
    setIsDemoActive(false)
    setDemoData(null)
    setShowBusPopup(false)
  }

  const handleBusClick = (bus: BusLocation) => {
    if (onBusSelect) {
      onBusSelect(bus)
    }
  }

  return (
    <Card className={`bg-gray-800 border-gray-700 relative overflow-hidden ${className}`}>
      {isDemoActive && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            Live Demo: Sector 17 → Elante Mall
            <button onClick={closeDemoMode} className="ml-2 hover:bg-blue-700 rounded-full p-1">
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {demoMode && !isDemoActive && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-lime-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Interactive Demo Mode - {isPlaying ? "Playing" : "Paused"}
          </div>
        </div>
      )}

      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowLayers(!showLayers)}
          className="bg-gray-900/80 backdrop-blur-sm border-gray-600 text-white hover:bg-gray-800"
        >
          <Layers className="h-4 w-4 mr-2" />
          Layers
        </Button>

        {showLayers && (
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 border border-gray-600">
            <div className="space-y-2">
              {Object.entries(activeLayers).map(([key, active]) => (
                <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleLayer(key as keyof typeof activeLayers)}
                    className="rounded"
                  />
                  <span className="capitalize text-white">{key}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 border border-gray-600">
          <div className="flex items-center gap-4 text-xs text-white">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-teal-500"></div>
              <span>Moving</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Stopped</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>Delayed</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Out of Service</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 border border-gray-600">
          <div className="grid grid-cols-3 gap-4 text-xs text-white">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Bus className="h-4 w-4 text-lime-400" />
              </div>
              <div className="font-bold text-lime-400">{demoMode ? demoBuses.length : 247}</div>
              <div className="text-gray-400">Buses Live</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Zap className="h-4 w-4 text-yellow-400" />
              </div>
              <div className="font-bold text-yellow-400">3.2m</div>
              <div className="text-gray-400">Avg Delay</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Navigation className="h-4 w-4 text-green-400" />
              </div>
              <div className="font-bold text-green-400">87%</div>
              <div className="text-gray-400">On-Time</div>
            </div>
          </div>
        </div>
      </div>

      {showBusPopup && demoData && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-white">{demoData.busData.busId}</span>
              </div>
              <button onClick={() => setShowBusPopup(false)} className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <div className="text-blue-400 font-medium">{demoData.busData.routeName}</div>
                <div className="text-gray-400">{demoData.busData.currentLocation}</div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-0">{demoData.busData.status}</Badge>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-0">
                  {demoData.busData.crowdLevel.occupancy}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-gray-400">Passengers</div>
                  <div className="text-white font-medium">
                    {demoData.busData.crowdLevel.passengers}/{demoData.busData.crowdLevel.totalSeats}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Wait Time</div>
                  <div className="text-white font-medium">{demoData.busData.crowdLevel.waitTime}</div>
                </div>
              </div>

              <div>
                <div className="text-gray-400 mb-1">Next Stops</div>
                <div className="text-white text-xs">{demoData.busData.nextStops.join(" → ")}</div>
              </div>

              <div className="flex justify-between text-xs pt-2 border-t border-gray-700">
                <div>
                  <div className="text-gray-400">Driver</div>
                  <div className="text-white">{demoData.busData.driver.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400">Rating</div>
                  <div className="text-yellow-400">★ {demoData.busData.driver.rating}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-full bg-gray-900 rounded-lg flex flex-col items-center justify-center border border-gray-700 min-h-96 p-6">
        {demoMode ? (
          <div className="w-full h-full relative">
            {/* Demo Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
              {/* Route Lines */}
              {demoRoutes.map((route, index) => (
                <svg key={route.id} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  <path
                    d={`M ${50 + index * 80} 50 Q ${200 + index * 50} ${150 + index * 30} ${350 + index * 40} ${250 + index * 20}`}
                    stroke={route.color}
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                </svg>
              ))}

              {/* Interactive Buses */}
              {demoBuses.map((bus, index) => (
                <div
                  key={bus.id}
                  className="absolute cursor-pointer hover:scale-125 transition-all duration-200"
                  style={{
                    left: `${20 + (index * 15) + Math.sin(demoTime / 10 + index) * 10}%`,
                    top: `${30 + (index * 12) + Math.cos(demoTime / 8 + index) * 8}%`,
                    zIndex: 10,
                  }}
                  onClick={() => handleBusClick(bus)}
                >
                  <div
                    className={`w-6 h-6 rounded-full ${getStatusColor(bus.status)} border-2 border-white shadow-lg flex items-center justify-center animate-pulse`}
                  >
                    <Bus className="h-3 w-3 text-white" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-1 py-0.5 rounded text-xs whitespace-nowrap">
                    {bus.id}
                  </div>
                  {bus.status === "moving" && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  )}
                </div>
              ))}

              {/* Route Legend */}
              <div className="absolute bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-600">
                <h4 className="text-white text-sm font-semibold mb-2">Active Routes</h4>
                <div className="space-y-1">
                  {demoRoutes.slice(0, 3).map((route) => (
                    <div key={route.id} className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }}></div>
                      <span className="text-white">{route.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : isDemoActive && demoData ? (
          <div className="w-full max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="text-center mb-6">
              <Badge variant="outline" className="text-blue-400 border-blue-400 mb-2">
                Sector 17, Chandigarh • 30.7333°N, 76.7794°E
              </Badge>
              <p className="text-gray-400">Live Demo - Interactive Bus Tracking</p>
            </div>

            {/* Animated Route Visualization */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: demoData.routeData.color }}></div>
                <h3 className="text-white font-semibold">{demoData.routeData.name}</h3>
              </div>

              <div className="space-y-3">
                {demoData.routeData.stops.map((stop, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 animate-in slide-in-from-left-4"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full ${stop.current ? "bg-green-500 animate-pulse" : "bg-blue-400"} ${stop.current ? "ring-4 ring-green-500/30" : ""}`}
                      >
                        {stop.current && <div className="w-full h-full flex items-center justify-center">🚌</div>}
                      </div>
                      {index < demoData.routeData.stops.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-600 mt-1"></div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${stop.current ? "text-green-400 font-bold" : "text-white"}`}>
                          {stop.name}
                        </span>
                        {stop.current && (
                          <Badge className="bg-green-500/20 text-green-400 border-0 text-xs animate-pulse">
                            LIVE BUS HERE
                          </Badge>
                        )}
                      </div>
                      {stop.current && (
                        <div className="text-xs text-gray-400 mt-1">
                          Click bus for details • ETA to next: {demoData.busData.eta.nextStop}
                        </div>
                      )}
                    </div>

                    <div className="text-right text-xs text-gray-400">Stop {index + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Bus Animation */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="relative cursor-pointer hover:scale-110 transition-transform duration-200"
                    onClick={() => setShowBusPopup(true)}
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse border-4 border-white shadow-lg flex items-center justify-center">
                      🚌
                    </div>
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      {demoData.busData.busId}
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-medium">Live Bus Tracking</div>
                    <div className="text-gray-400 text-sm">Click bus icon for details</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-green-400 font-bold">{demoData.busData.crowdLevel.occupancy}</div>
                  <div className="text-gray-400 text-xs">Occupancy</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mb-6">
            <MapPin className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">Transit Map View</p>
            <Badge variant="outline" className="text-lime-400 border-lime-400">
              Chandigarh • 30.75°N, 76.78°E
            </Badge>
          </div>
        )}

        {/* Mock route visualization for non-demo mode */}
        {!isDemoActive && !demoMode && (
          <div className="w-full max-w-md space-y-4">
            {activeLayers.routes && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Active Routes</h3>
                {sampleRoutes.map((route, index) => (
                  <div key={index} className="flex items-center gap-3 mb-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: route.color }}></div>
                    <span className="text-white text-sm">{route.name}</span>
                    <span className="text-gray-400 text-xs">{route.stops.length} stops</span>
                  </div>
                ))}
              </div>
            )}

            {activeLayers.stops && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Live Buses</h3>
                {sampleBuses.map((bus) => (
                  <div key={bus.id} className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(bus.status)}`}></div>
                      <span className="text-white text-sm">{bus.id}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">{bus.speed} km/h</div>
                      <div className="text-xs text-gray-500">+{bus.delay}m</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}

export default MapView
