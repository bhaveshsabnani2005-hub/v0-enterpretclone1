"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Bus, Clock, Users, Map } from "lucide-react"

export default function LiveTrackingSection() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  const busData = [
    {
      number: "12",
      arrivalTime: 5,
      destination: "Railway Station",
      crowdLevel: "free",
      color: "bg-blue-500",
    },
    {
      number: "21",
      arrivalTime: 12,
      destination: "Central Market",
      crowdLevel: "moderate",
      color: "bg-green-500",
    },
    {
      number: "45",
      arrivalTime: 18,
      destination: "Airport Terminal",
      crowdLevel: "full",
      color: "bg-purple-500",
    },
  ]

  const getCrowdInfo = (level: string) => {
    switch (level) {
      case "free":
        return { color: "text-green-400", bg: "bg-green-400/20", text: "Seats FREE", icon: "🟢" }
      case "moderate":
        return { color: "text-yellow-400", bg: "bg-yellow-400/20", text: "Moderate Crowd", icon: "🟡" }
      case "full":
        return { color: "text-red-400", bg: "bg-red-400/20", text: "Full", icon: "🔴" }
      default:
        return { color: "text-gray-400", bg: "bg-gray-400/20", text: "Unknown", icon: "⚪" }
    }
  }

  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Description */}
          <div className="space-y-6 animate-in slide-in-from-left-6 duration-700">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">See Your Bus in Real-Time</h2>
              <p className="text-xl text-gray-300 mb-8 text-pretty">Live arrivals, next buses, and crowd updates.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 animate-in slide-in-from-left-4 duration-700 delay-200 hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Quick Arrival Times</h3>
                  <p className="text-gray-300">
                    Instantly see upcoming buses with exact arrival times. No more waiting blindly at the bus stop!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-in slide-in-from-left-4 duration-700 delay-300 hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Map className="w-6 h-6 text-green-400 hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Map View</h3>
                  <p className="text-gray-300">
                    Switch to visual map mode to track buses live with colored markers showing their real-time location.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-in slide-in-from-left-4 duration-700 delay-400 hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-purple-400 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Crowd Information</h3>
                  <p className="text-gray-300">
                    See how full each bus is with simple color indicators. Know if you'll get a seat before the bus
                    arrives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Live tracking interface */}
          <div className="space-y-6 animate-in slide-in-from-right-6 duration-700 delay-200">
            {/* View toggle */}
            <div className="flex gap-3">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className="flex-1 hover:scale-105 transition-all duration-200"
              >
                <Clock className="w-4 h-4 mr-2" />
                List View
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                onClick={() => setViewMode("map")}
                className="flex-1 hover:scale-105 transition-all duration-200"
              >
                <Map className="w-4 h-4 mr-2" />
                Map View
              </Button>
            </div>

            {viewMode === "list" ? (
              /* List View */
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 animate-in fade-in duration-500">
                  <MapPin className="w-5 h-5 text-blue-400 animate-bounce" />
                  <span className="text-gray-300">Market Road Stop</span>
                </div>

                {busData.map((bus, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-gray-600 hover:shadow-lg hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 ${bus.color} rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300`}
                        >
                          <Bus className="w-4 h-4 text-white animate-pulse" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">Bus {bus.number}</span>
                            <span className="text-2xl font-bold text-blue-400 animate-pulse">
                              {bus.arrivalTime} mins
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">to {bus.destination}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm animate-bounce">{getCrowdInfo(bus.crowdLevel).icon}</span>
                      <span className={`text-sm ${getCrowdInfo(bus.crowdLevel).color}`}>
                        {getCrowdInfo(bus.crowdLevel).text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Map View */
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 min-h-[400px] relative hover:shadow-lg transition-shadow duration-300">
                <div className="text-center text-gray-400 mb-4 animate-in fade-in duration-500">
                  <Map className="w-8 h-8 mx-auto mb-2 hover:rotate-12 transition-transform duration-300" />
                  <p>Live Bus Tracking Map</p>
                </div>

                {/* Simplified map representation */}
                <div className="relative h-64 bg-gray-800 rounded-lg overflow-hidden">
                  {/* Route lines */}
                  <div className="absolute inset-4">
                    <div className="w-full h-1 bg-gray-600 absolute top-1/4 animate-pulse"></div>
                    <div className="w-full h-1 bg-gray-600 absolute top-2/4 animate-pulse"></div>
                    <div className="w-full h-1 bg-gray-600 absolute top-3/4 animate-pulse"></div>
                  </div>

                  {/* Bus markers */}
                  <div className="absolute top-1/4 left-1/4 transform -translate-y-1/2 animate-in zoom-in duration-500">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-xs text-white absolute -top-6 -left-2">Bus 12</span>
                  </div>
                  <div className="absolute top-2/4 left-2/3 transform -translate-y-1/2 animate-in zoom-in duration-500 delay-200">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-xs text-white absolute -top-6 -left-2">Bus 21</span>
                  </div>
                  <div className="absolute top-3/4 left-1/2 transform -translate-y-1/2 animate-in zoom-in duration-500 delay-300">
                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-xs text-white absolute -top-6 -left-2">Bus 45</span>
                  </div>

                  {/* Your location */}
                  <div className="absolute top-1/4 left-3/4 transform -translate-y-1/2 animate-in zoom-in duration-500 delay-100">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                    <span className="text-xs text-white absolute -top-6 -left-4">You are here</span>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-400 text-center animate-in fade-in duration-700 delay-500">
                  Colored markers show live bus positions on their routes
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
