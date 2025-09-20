"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapView } from "@/components/map/MapView"
import { ArrowLeft, Bus, Users, Clock, MapPin, Play, Pause, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"
import type { BusLocation } from "@/lib/map/utils"

export default function LiveMapPage() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null)
  const [liveTime, setLiveTime] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setLiveTime((prev) => (prev + 1) % 300) // 5 minute loop
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const handleBusSelect = (bus: BusLocation) => {
    setSelectedBus(bus)
  }

  const resetView = () => {
    setLiveTime(0)
    setSelectedBus(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-bold text-lime-400">Live Bus Tracking - Chandigarh</h1>
              <Badge variant="outline" className="text-lime-400 border-lime-400">
                Live Tracking
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsPlaying(!isPlaying)}
                className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900"
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={resetView}
                className="border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Bus className="h-4 w-4 text-lime-400" />
              <span className="text-sm text-gray-400">Active Buses:</span>
              <span className="text-sm font-semibold text-white">12</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-400">Routes:</span>
              <span className="text-sm font-semibold text-white">5</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-400" />
              <span className="text-sm text-gray-400">Passengers:</span>
              <span className="text-sm font-semibold text-white">247</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-400">Live Time:</span>
              <span className="text-sm font-semibold text-white">
                {Math.floor(liveTime / 60)}:{(liveTime % 60).toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <main className="flex-1">
        <div className="grid lg:grid-cols-4 h-[calc(100vh-140px)]">
          {/* Full Map */}
          <div className="lg:col-span-3 relative">
            <MapView
              className="h-full w-full"
              liveMode={true}
              isPlaying={isPlaying}
              liveTime={liveTime}
              onBusSelect={handleBusSelect}
            />
          </div>

          {/* Side Panel */}
          <div className="bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Selected Bus Info */}
              {selectedBus ? (
                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-lime-400">Selected Bus</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Bus ID:</span>
                      <span className="text-sm font-semibold">{selectedBus.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Route:</span>
                      <span className="text-sm font-semibold">{selectedBus.routeId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Passengers:</span>
                      <span className="text-sm font-semibold">{selectedBus.passengers}/45</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Speed:</span>
                      <span className="text-sm font-semibold">{selectedBus.speed} km/h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Status:</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        On Time
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-400 text-center">Click on a bus to view details</p>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-lime-400">Active Routes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { id: "Route 1", name: "Sector 17 ↔ Elante Mall", buses: 3, color: "bg-blue-500" },
                    { id: "Route 2", name: "Railway Station ↔ Airport", buses: 2, color: "bg-green-500" },
                    { id: "Route 3", name: "ISBT ↔ Panchkula", buses: 4, color: "bg-purple-500" },
                    { id: "Route 4", name: "Mohali ↔ Chandigarh", buses: 2, color: "bg-orange-500" },
                    { id: "Route 5", name: "University ↔ City Center", buses: 1, color: "bg-pink-500" },
                  ].map((route) => (
                    <div key={route.id} className="flex items-center gap-3 p-2 rounded bg-gray-800">
                      <div className={`w-3 h-3 rounded-full ${route.color}`} />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-white">{route.name}</p>
                        <p className="text-xs text-gray-400">{route.buses} buses active</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-lime-400">Live Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>• Real-time bus movement tracking</p>
                    <p>• Interactive bus selection</p>
                    <p>• Multiple route visualization</p>
                    <p>• Live passenger count updates</p>
                    <p>• Route optimization display</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
