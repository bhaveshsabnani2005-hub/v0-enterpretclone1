"use client"

import { useState } from "react"
import { X, AlertTriangle, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Alert {
  id: number
  priority: "high" | "medium" | "low"
  route: string
  message: string
  time: string
  active: boolean
}

const demoAlerts: Alert[] = [
  {
    id: 1,
    priority: "medium",
    route: "Route 2",
    message: "Route 2 delayed due to traffic congestion",
    time: "7:37:37 am - 8:37:37 am",
    active: true,
  },
  {
    id: 2,
    priority: "low",
    route: "Route 5",
    message: "New stop added on Route 5 - Sector 22",
    time: "7:37:37 am - 7:37:37 am",
    active: true,
  },
  {
    id: 3,
    priority: "high",
    route: "Route 1",
    message: "Service disruption on Route 1 - delays expected",
    time: "8:00:00 am - 10:00:00 am",
    active: true,
  },
]

const priorityColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
}

const priorityBadgeColors = {
  high: "bg-red-500 text-white",
  medium: "bg-orange-500 text-white",
  low: "bg-blue-500 text-white",
}

export function ServiceAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(demoAlerts)
  const [activeFilter, setActiveFilter] = useState<"all" | "high" | "medium" | "low">("all")

  const filteredAlerts = alerts.filter((alert) => {
    if (!alert.active) return false
    if (activeFilter === "all") return true
    return alert.priority === activeFilter
  })

  const activeAlertsCount = alerts.filter((alert) => alert.active).length

  const dismissAlert = (id: number) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, active: false } : alert)))
  }

  const resetDemo = () => {
    setAlerts(demoAlerts.map((alert) => ({ ...alert, active: true })))
  }

  const filterButtons = [
    { key: "all" as const, label: "All" },
    { key: "high" as const, label: "High" },
    { key: "medium" as const, label: "Medium" },
    { key: "low" as const, label: "Low" },
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-semibold">Service Alerts</h2>
          {activeAlertsCount > 0 && (
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {activeAlertsCount}
            </span>
          )}
        </div>
        <Filter className="w-5 h-5 text-gray-400" />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {filterButtons.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === key ? "bg-pink-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              {activeAlertsCount === 0 ? "No active alerts" : "No alerts match the selected filter"}
            </div>
            {activeAlertsCount === 0 && (
              <Button
                onClick={resetDemo}
                variant="outline"
                className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                Reset Demo
              </Button>
            )}
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`relative p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${
                priorityColors[alert.priority]
              }`}
            >
              <button
                onClick={() => dismissAlert(alert.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3 pr-8">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                        priorityBadgeColors[alert.priority]
                      }`}
                    >
                      {alert.priority}
                    </span>
                    <span className="text-sm font-medium">{alert.route}</span>
                  </div>
                  <p className="text-sm mb-2">{alert.message}</p>
                  <p className="text-xs text-gray-400">{alert.time}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
