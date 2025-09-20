"use client"

import { useState, useEffect, useCallback } from "react"
import { Bus, RefreshCw, MapPin, Download, ChevronUp, ChevronDown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BusData {
  id: string
  route: string
  routeName: string
  speed: number
  delay: number
  occupancy: number
  status: "Moving" | "Stopped" | "Delayed" | "Offline"
  statusColor: string
  dotColor: string
  lastUpdate: number
  nextStop: string
}

const initialBusData: BusData[] = [
  {
    id: "CHD-002",
    route: "R1",
    routeName: "Sector 17 → Elante Mall",
    speed: 0,
    delay: 2,
    occupancy: 40,
    status: "Stopped",
    statusColor: "yellow",
    dotColor: "#F59E0B",
    lastUpdate: Date.now(),
    nextStop: "Sector 17 Plaza",
  },
  {
    id: "CHD-001",
    route: "R1",
    routeName: "Sector 17 → Elante Mall",
    speed: 28,
    delay: 4,
    occupancy: 70,
    status: "Moving",
    statusColor: "green",
    dotColor: "#10B981",
    lastUpdate: Date.now(),
    nextStop: "Tribune Chowk",
  },
  {
    id: "CHD-003",
    route: "R2",
    routeName: "Rock Garden → PGI Hospital",
    speed: 15,
    delay: 8,
    occupancy: 90,
    status: "Delayed",
    statusColor: "orange",
    dotColor: "#F97316",
    lastUpdate: Date.now(),
    nextStop: "Sector 22 Market",
  },
  {
    id: "CHD-004",
    route: "R3",
    routeName: "Sukhna Lake → University",
    speed: 32,
    delay: -1,
    occupancy: 55,
    status: "Moving",
    statusColor: "green",
    dotColor: "#10B981",
    lastUpdate: Date.now(),
    nextStop: "Rose Garden",
  },
]

type SortField = "id" | "route" | "speed" | "delay" | "occupancy" | "status"
type SortDirection = "asc" | "desc"

export function LiveBuses() {
  const [busData, setBusData] = useState<BusData[]>(initialBusData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [sortField, setSortField] = useState<SortField>("id")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [selectedBus, setSelectedBus] = useState<string | null>(null)

  // Simulate realistic bus data updates
  const simulateSpeed = (currentSpeed: number, status: string): number => {
    if (status === "Stopped") return 0
    const variation = (Math.random() - 0.5) * 10
    const newSpeed = Math.max(0, Math.min(45, currentSpeed + variation))
    return Math.round(newSpeed)
  }

  const simulateDelay = (currentDelay: number): number => {
    const variation = (Math.random() - 0.5) * 2
    return Math.round(currentDelay + variation)
  }

  const simulateOccupancy = (currentOccupancy: number): number => {
    const variation = (Math.random() - 0.5) * 10
    return Math.max(0, Math.min(100, Math.round(currentOccupancy + variation)))
  }

  const determineStatus = (speed: number, delay: number): BusData["status"] => {
    if (speed === 0) return "Stopped"
    if (delay > 5) return "Delayed"
    return "Moving"
  }

  const getStatusColor = (status: string): { statusColor: string; dotColor: string } => {
    switch (status) {
      case "Moving":
        return { statusColor: "green", dotColor: "#10B981" }
      case "Stopped":
        return { statusColor: "yellow", dotColor: "#F59E0B" }
      case "Delayed":
        return { statusColor: "orange", dotColor: "#F97316" }
      case "Offline":
        return { statusColor: "red", dotColor: "#EF4444" }
      default:
        return { statusColor: "gray", dotColor: "#6B7280" }
    }
  }

  const updateBusData = useCallback(() => {
    setBusData((prevData) =>
      prevData.map((bus) => {
        const newSpeed = simulateSpeed(bus.speed, bus.status)
        const newDelay = simulateDelay(bus.delay)
        const newOccupancy = simulateOccupancy(bus.occupancy)
        const newStatus = determineStatus(newSpeed, newDelay)
        const colors = getStatusColor(newStatus)

        return {
          ...bus,
          speed: newSpeed,
          delay: newDelay,
          occupancy: newOccupancy,
          status: newStatus,
          statusColor: colors.statusColor,
          dotColor: colors.dotColor,
          lastUpdate: Date.now(),
        }
      }),
    )
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    updateBusData()
    setIsRefreshing(false)
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedBusData = [...busData].sort((a, b) => {
    let aValue: any = a[sortField]
    let bValue: any = b[sortField]

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const activeBusCount = busData.filter((bus) => bus.status !== "Offline").length

  const getDelayColor = (delay: number): string => {
    if (delay < 0) return "text-green-400"
    if (delay <= 3) return "text-yellow-400"
    if (delay <= 7) return "text-orange-400"
    return "text-red-400"
  }

  const getStatusBadgeColor = (status: string): string => {
    switch (status) {
      case "Moving":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Stopped":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Delayed":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "Offline":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
  }

  // Auto-update every 5 seconds
  useEffect(() => {
    const interval = setInterval(updateBusData, 5000)
    return () => clearInterval(interval)
  }, [updateBusData])

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Bus className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Live Buses</h2>
            <Badge variant="secondary" className="mt-1 bg-blue-500/20 text-blue-400 border-blue-500/30">
              {activeBusCount} active
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-gray-600 hover:bg-gray-700 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700 bg-transparent">
            <MapPin className="w-4 h-4 mr-2" />
            Track All
          </Button>
          <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th
                className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  Bus ID
                  <SortIcon field="id" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("route")}
              >
                <div className="flex items-center">
                  Route
                  <SortIcon field="route" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("speed")}
              >
                <div className="flex items-center">
                  Speed
                  <SortIcon field="speed" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("delay")}
              >
                <div className="flex items-center">
                  Delay
                  <SortIcon field="delay" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("occupancy")}
              >
                <div className="flex items-center">
                  Occupancy
                  <SortIcon field="occupancy" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBusData.map((bus) => (
              <tr
                key={bus.id}
                className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors cursor-pointer ${
                  selectedBus === bus.id ? "bg-gray-700/50" : ""
                }`}
                onClick={() => setSelectedBus(selectedBus === bus.id ? null : bus.id)}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: bus.dotColor }} />
                    <div>
                      <div className="text-white font-medium">{bus.id}</div>
                      <div className="text-xs text-gray-400">{bus.nextStop}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-1">
                      {bus.route}
                    </Badge>
                    <div className="text-xs text-gray-400">{bus.routeName}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-white font-medium">{bus.speed} km/h</div>
                </td>
                <td className="py-4 px-4">
                  <div className={`font-medium ${getDelayColor(bus.delay)}`}>
                    {bus.delay > 0 ? "+" : ""}
                    {bus.delay} min
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-white font-medium">{bus.occupancy}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge className={getStatusBadgeColor(bus.status)}>{bus.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expanded Row Details */}
      {selectedBus && (
        <div className="mt-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
          {(() => {
            const bus = busData.find((b) => b.id === selectedBus)
            if (!bus) return null

            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Bus Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Update:</span>
                      <span className="text-white">{new Date(bus.lastUpdate).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Stop:</span>
                      <span className="text-white">{bus.nextStop}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Performance</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Speed:</span>
                      <span className="text-white">{bus.speed} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Schedule Status:</span>
                      <span className={getDelayColor(bus.delay)}>
                        {bus.delay > 0
                          ? `${bus.delay} min late`
                          : bus.delay < 0
                            ? `${Math.abs(bus.delay)} min early`
                            : "On time"}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Passenger Info</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Occupancy:</span>
                      <span className="text-white">{bus.occupancy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capacity:</span>
                      <span className="text-white">~{Math.round(bus.occupancy * 0.6)} passengers</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
