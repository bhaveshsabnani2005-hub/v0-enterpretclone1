"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star, StarOff, Armchair as Wheelchair, Zap } from "lucide-react"
import { api } from "@/lib/api/client"
import type { ETA } from "@/lib/map/utils"
import { usePreferences } from "@/store/preferences"

interface ETAPanelProps {
  selectedStopId?: string
}

export function ETAPanel({ selectedStopId = "stop-1" }: ETAPanelProps) {
  const [eta, setEta] = useState<ETA | null>(null)
  const [loading, setLoading] = useState(false)
  const { favoriteStops, addFavoriteStop, removeFavoriteStop } = usePreferences()

  const isFavorite = favoriteStops.includes(selectedStopId)

  useEffect(() => {
    if (selectedStopId) {
      fetchETA()
    }
  }, [selectedStopId])

  const fetchETA = async () => {
    setLoading(true)
    try {
      const etaData = await api.getStopETAs(selectedStopId)
      setEta(etaData)
    } catch (error) {
      console.error("Failed to fetch ETA:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteStop(selectedStopId)
    } else {
      addFavoriteStop(selectedStopId)
    }
  }

  const getOccupancyColor = (tag: string) => {
    switch (tag) {
      case "low":
        return "bg-green-400/20 text-green-400"
      case "medium":
        return "bg-yellow-400/20 text-yellow-400"
      case "high":
        return "bg-red-400/20 text-red-400"
      default:
        return "bg-gray-400/20 text-gray-400"
    }
  }

  const getOccupancyDots = (tag: string) => {
    const count = tag === "low" ? 1 : tag === "medium" ? 2 : 3
    return Array.from({ length: 3 }, (_, i) => (
      <div key={i} className={`w-2 h-2 rounded-full ${i < count ? "bg-current" : "bg-gray-600"}`} />
    ))
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Clock className="h-4 w-4 text-lime-400" />
            Stop Details
          </CardTitle>
          <Button size="sm" variant="ghost" onClick={toggleFavorite} className="h-8 w-8 p-0">
            {isFavorite ? (
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
            ) : (
              <StarOff className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stop Info */}
          <div>
            <h3 className="font-semibold text-white">Sector 17 Plaza</h3>
            <p className="text-sm text-gray-400">Code: S17001</p>
            <p className="text-xs text-gray-500">Sector 17 Plaza, Chandigarh</p>
            <div className="flex items-center gap-2 mt-1">
              <Wheelchair className="h-3 w-3 text-blue-400" />
              <span className="text-xs text-blue-400">Wheelchair Accessible</span>
            </div>
          </div>

          {/* Next Arrivals */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Next Arrivals</h4>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-12 bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : eta && eta.arrivals && eta.arrivals.length > 0 ? (
              <div className="space-y-3">
                {eta.arrivals.map((arrival, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-900/50 rounded">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">Route 1</span>
                        <Badge variant="outline" className="text-xs">
                          ISBT
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-1">{getOccupancyDots(arrival.occupancyTag)}</div>
                        <span className="text-xs text-gray-400 capitalize">{arrival.occupancyTag} occupancy</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getOccupancyColor(arrival.occupancyTag)} border-0`}>
                        {arrival.inMinRange[0]}-{arrival.inMinRange[1]} min
                      </Badge>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-full bg-gray-700 rounded-full h-1">
                          <div
                            className="bg-lime-400 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${arrival.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{Math.round(arrival.confidence * 100)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Clock className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No arrival data available</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-gray-700">
            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
              <Zap className="h-3 w-3 mr-1" />
              Live View
            </Button>
            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
