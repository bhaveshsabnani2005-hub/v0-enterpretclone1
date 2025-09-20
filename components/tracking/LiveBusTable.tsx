"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bus, Users, Zap, Eye } from "lucide-react"
import { api } from "@/lib/api/client"
import { type BusLocation, getBusStatusColor, formatDelay, getOccupancyLevel } from "@/lib/map/utils"

interface LiveBusTableProps {
  onBusSelect?: (bus: BusLocation) => void
  selectedBusId?: string
}

export function LiveBusTable({ onBusSelect, selectedBusId }: LiveBusTableProps) {
  const [buses, setBuses] = useState<BusLocation[]>([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState<"route" | "delay" | "speed" | "occupancy">("route")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    fetchLiveBuses()

    // Set up real-time updates
    const interval = setInterval(fetchLiveBuses, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchLiveBuses = async () => {
    setLoading(true)
    try {
      const busData = await api.getLiveBuses()
      setBuses(busData)
    } catch (error) {
      console.error("Failed to fetch live buses:", error)
    } finally {
      setLoading(false)
    }
  }

  const sortBuses = (buses: BusLocation[]) => {
    return [...buses].sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "route":
          aValue = a.routeId
          bValue = b.routeId
          break
        case "delay":
          aValue = a.delay
          bValue = b.delay
          break
        case "speed":
          aValue = a.speed
          bValue = b.speed
          break
        case "occupancy":
          aValue = a.occupancy
          bValue = b.occupancy
          break
        default:
          return 0
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const getStatusColor = (status: BusLocation["status"]) => {
    switch (status) {
      case "moving":
        return "bg-teal-400/20 text-teal-400 border-teal-400/30"
      case "stopped":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
      case "delayed":
        return "bg-orange-400/20 text-orange-400 border-orange-400/30"
      case "out-of-service":
        return "bg-red-400/20 text-red-400 border-red-400/30"
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30"
    }
  }

  const getOccupancyColor = (occupancy: number) => {
    const level = getOccupancyLevel(occupancy)
    switch (level) {
      case "low":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "high":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const sortedBuses = sortBuses(buses)

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Bus className="h-4 w-4 text-lime-400" />
          Live Buses
          <Badge variant="outline" className="text-xs">
            {buses.length} active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && buses.length === 0 ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-2 pb-2 border-b border-gray-700 text-xs text-gray-400">
              <button onClick={() => handleSort("route")} className="text-left hover:text-white transition-colors">
                Bus ID {sortBy === "route" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <span>Route</span>
              <button onClick={() => handleSort("speed")} className="text-left hover:text-white transition-colors">
                Speed {sortBy === "speed" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button onClick={() => handleSort("delay")} className="text-left hover:text-white transition-colors">
                Delay {sortBy === "delay" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button onClick={() => handleSort("occupancy")} className="text-left hover:text-white transition-colors">
                Occupancy {sortBy === "occupancy" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <span>Status</span>
            </div>

            {/* Table Rows */}
            <div className="max-h-64 overflow-y-auto space-y-1">
              {sortedBuses.map((bus) => (
                <div
                  key={bus.id}
                  onClick={() => onBusSelect?.(bus)}
                  className={`grid grid-cols-6 gap-2 p-2 rounded cursor-pointer transition-colors hover:bg-gray-700 ${
                    selectedBusId === bus.id ? "bg-gray-700 ring-1 ring-lime-400" : "bg-gray-900/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getBusStatusColor(bus.status) }} />
                    <span className="text-sm font-medium text-white">{bus.id}</span>
                  </div>

                  <Badge variant="outline" className="text-xs w-fit">
                    {bus.routeId ? bus.routeId.replace("route-", "R") : "N/A"}
                  </Badge>

                  <span className="text-sm text-white">{bus.speed} km/h</span>

                  <span className={`text-sm ${bus.delay > 5 ? "text-orange-400" : "text-green-400"}`}>
                    {formatDelay(bus.delay * 60)}
                  </span>

                  <div className="flex items-center gap-1">
                    <Users className={`h-3 w-3 ${getOccupancyColor(bus.occupancy)}`} />
                    <span className={`text-sm ${getOccupancyColor(bus.occupancy)}`}>
                      {Math.round(bus.occupancy * 100)}%
                    </span>
                  </div>

                  <Badge className={`${getStatusColor(bus.status)} border text-xs capitalize`}>
                    {bus.status ? bus.status.replace("-", " ") : "unknown"}
                  </Badge>
                </div>
              ))}
            </div>

            {buses.length === 0 && !loading && (
              <div className="text-center py-8">
                <Bus className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No buses currently active</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-700">
          <Button size="sm" variant="outline" onClick={fetchLiveBuses} disabled={loading}>
            <Zap className="h-3 w-3 mr-1" />
            Refresh
          </Button>
          <Button size="sm" variant="outline">
            <Eye className="h-3 w-3 mr-1" />
            Track All
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
