"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Clock, MapPin, Armchair as Wheelchair, Pin, PinOff, Share2, Eye, Copy, QrCode, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface BusArrival {
  id: number
  route: string
  badge: string
  arrivalTime: string
  arrivalMinutes: number
  occupancy: number
  occupancyLevel: string
  occupancyDots: boolean[]
  color: string
}

interface StopData {
  order: number
  stopName: string
  labelColor: string
  description: string
  stopCode: string
  location: string
}

interface StopDetailsProps {
  stopName?: string
  stopCode?: string
  location?: string
  isWheelchairAccessible?: boolean
}

const StopDetails: React.FC<StopDetailsProps> = ({
  stopName = "Sector 17",
  stopCode = "S17001",
  location = "Sector 17, Chandigarh",
  isWheelchairAccessible = true,
}) => {
  const [isPinned, setIsPinned] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showLiveView, setShowLiveView] = useState(false)

  const [stopData] = useState<StopData[]>([
    {
      order: 1,
      stopName: "Sector 17",
      labelColor: "Red",
      description: "Start / major bus stand",
      stopCode: "S17001",
      location: "Sector 17, Chandigarh",
    },
    {
      order: 2,
      stopName: "Tribune Chowk",
      labelColor: "Blue",
      description: "First intermediate stop",
      stopCode: "TC001",
      location: "Tribune Chowk, Chandigarh",
    },
    {
      order: 3,
      stopName: "Sector 22",
      labelColor: "Blue",
      description: "Second intermediate stop",
      stopCode: "S22001",
      location: "Sector 22, Chandigarh",
    },
    {
      order: 4,
      stopName: "Industrial Area",
      labelColor: "Blue",
      description: "Third intermediate stop",
      stopCode: "IA001",
      location: "Industrial Area, Chandigarh",
    },
    {
      order: 5,
      stopName: "Elante Mall",
      labelColor: "Purple",
      description: "Final endpoint",
      stopCode: "EM001",
      location: "Elante Mall, Chandigarh",
    },
  ])

  const [arrivals, setArrivals] = useState<BusArrival[]>([
    {
      id: 1,
      route: "Route 1",
      badge: "ISBT",
      arrivalTime: "2-4 min",
      arrivalMinutes: 3,
      occupancy: 90,
      occupancyLevel: "High Occupancy",
      occupancyDots: [true, true, true],
      color: "red",
    },
    {
      id: 2,
      route: "Route 1",
      badge: "ISBT",
      arrivalTime: "8-12 min",
      arrivalMinutes: 10,
      occupancy: 80,
      occupancyLevel: "Medium Occupancy",
      occupancyDots: [true, true, false],
      color: "yellow",
    },
    {
      id: 3,
      route: "Route 1",
      badge: "ISBT",
      arrivalTime: "15-18 min",
      arrivalMinutes: 16,
      occupancy: 70,
      occupancyLevel: "Low Occupancy",
      occupancyDots: [true, false, false],
      color: "green",
    },
  ])

  // Real-time countdown updates
  useEffect(() => {
    const interval = setInterval(() => {
      setArrivals((prev) => {
        const updated = prev
          .map((arrival) => {
            const newMinutes = Math.max(0, arrival.arrivalMinutes - 1)
            let newArrivalTime = arrival.arrivalTime

            if (newMinutes === 0) {
              newArrivalTime = "Arrived"
            } else if (newMinutes <= 5) {
              newArrivalTime = `${newMinutes} min`
            } else {
              newArrivalTime = `${newMinutes}-${newMinutes + 2} min`
            }

            return {
              ...arrival,
              arrivalMinutes: newMinutes,
              arrivalTime: newArrivalTime,
            }
          })
          .filter((arrival) => arrival.arrivalMinutes > 0)

        // Add new buses when needed
        if (updated.length < 3) {
          const newBus: BusArrival = {
            id: Date.now(),
            route: "Route 1",
            badge: "ISBT",
            arrivalTime: "20-25 min",
            arrivalMinutes: 22,
            occupancy: Math.floor(Math.random() * 40) + 40, // 40-80%
            occupancyLevel: "Medium Occupancy",
            occupancyDots: [true, true, false],
            color: "yellow",
          }
          updated.push(newBus)
        }

        return updated
      })
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Dynamic occupancy updates
  useEffect(() => {
    const occupancyInterval = setInterval(() => {
      setArrivals((prev) =>
        prev.map((arrival) => {
          const change = (Math.random() - 0.5) * 10 // ±5%
          const newOccupancy = Math.max(30, Math.min(100, arrival.occupancy + change))

          let occupancyLevel = "Low Occupancy"
          let occupancyDots = [true, false, false]
          let color = "green"

          if (newOccupancy > 70) {
            occupancyLevel = "High Occupancy"
            occupancyDots = [true, true, true]
            color = "red"
          } else if (newOccupancy > 40) {
            occupancyLevel = "Medium Occupancy"
            occupancyDots = [true, true, false]
            color = "yellow"
          }

          return {
            ...arrival,
            occupancy: Math.round(newOccupancy),
            occupancyLevel,
            occupancyDots,
            color,
          }
        }),
      )
    }, 30000) // Update every 30 seconds

    return () => clearInterval(occupancyInterval)
  }, [])

  const getOccupancyColor = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-500"
      case "yellow":
        return "bg-yellow-500"
      case "red":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getOccupancyTextColor = (color: string) => {
    switch (color) {
      case "green":
        return "text-green-400"
      case "yellow":
        return "text-yellow-400"
      case "red":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getLabelColorClass = (color: string) => {
    switch (color.toLowerCase()) {
      case "red":
        return "bg-red-600 text-white"
      case "blue":
        return "bg-blue-600 text-white"
      case "purple":
        return "bg-purple-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const handlePin = () => {
    setIsPinned(!isPinned)
    // Show notification (could be implemented with toast)
    console.log(isPinned ? "Stop removed from favorites" : "Stop saved to favorites")
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const handleLiveView = () => {
    setShowLiveView(true)
    setTimeout(() => setShowLiveView(false), 3000) // Hide after 3 seconds
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    console.log("Link copied to clipboard")
  }

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-semibold">Stop Details</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={handlePin} className="text-gray-400 hover:text-white">
            {isPinned ? <Pin className="h-4 w-4 fill-current" /> : <PinOff className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">{stopName}</h3>
          <p className="text-sm text-gray-400">Code: {stopCode}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          {isWheelchairAccessible && (
            <div className="flex items-center gap-2 text-sm text-green-400">
              <Wheelchair className="h-4 w-4" />
              <span>Wheelchair Accessible</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-semibold">Route Stops</h4>
          <div className="space-y-2">
            {stopData.map((stop) => (
              <div
                key={stop.order}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 font-mono w-4">{stop.order}</span>
                  <Badge className={getLabelColorClass(stop.labelColor)}>{stop.labelColor}</Badge>
                  <div>
                    <p className="font-medium">{stop.stopName}</p>
                    <p className="text-sm text-gray-400">{stop.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{stop.stopCode}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Next Arrivals</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLiveView}
              disabled={showLiveView}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Eye className="h-4 w-4 mr-1" />
              {showLiveView ? "Connecting..." : "Live View"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {arrivals.map((arrival) => (
            <Card key={arrival.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-blue-600 text-white">
                      {arrival.badge}
                    </Badge>
                    <div>
                      <p className="font-medium">{arrival.route}</p>
                      <p className="text-sm text-gray-400">to Elante Mall</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${arrival.arrivalTime === "Arrived" ? "text-green-400" : "text-white"}`}>
                      {arrival.arrivalTime}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${getOccupancyTextColor(arrival.color)}`}>{arrival.occupancyLevel}</span>
                    <div className="flex gap-1">
                      {arrival.occupancyDots.map((filled, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            filled ? getOccupancyColor(arrival.color) : "bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{arrival.occupancy}% full</span>
                </div>

                <div className="mt-2">
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-500 ${getOccupancyColor(arrival.color)}`}
                      style={{ width: `${arrival.occupancy}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="bg-gray-900 border-gray-700 w-80">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Share Stop</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Send to Mobile
                </Button>
                <Button variant="secondary" className="w-full" onClick={() => setShowShareModal(false)}>
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Live View Loading */}
        {showLiveView && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="bg-gray-900 border-gray-700 p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400"></div>
                <span>Connecting to live feed...</span>
              </div>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default StopDetails
