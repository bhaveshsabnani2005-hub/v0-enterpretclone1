"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X, Filter } from "lucide-react"
import { api, type Alert } from "@/lib/api/client"

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all")

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    setLoading(true)
    try {
      const alertData = await api.getActiveAlerts()
      setAlerts(Array.isArray(alertData) ? alertData : [])
    } catch (error) {
      console.error("Failed to fetch alerts:", error)
      setAlerts([])
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-400/20 text-red-400 border-red-400/30"
      case "medium":
        return "bg-orange-400/20 text-orange-400 border-orange-400/30"
      case "low":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30"
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30"
    }
  }

  const getSeverityIcon = (severity: Alert["severity"]) => {
    return <AlertTriangle className="h-3 w-3" />
  }

  const filteredAlerts = Array.isArray(alerts)
    ? alerts.filter((alert) => filter === "all" || alert.severity === filter)
    : []

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            Service Alerts
            {alerts.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {alerts.length}
              </Badge>
            )}
          </CardTitle>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
            <Filter className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Filter buttons */}
          <div className="flex gap-1">
            {(["all", "high", "medium", "low"] as const).map((severity) => (
              <Button
                key={severity}
                size="sm"
                variant={filter === severity ? "default" : "ghost"}
                onClick={() => setFilter(severity)}
                className="h-6 px-2 text-xs capitalize"
              >
                {severity}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredAlerts.length > 0 ? (
            <div className="space-y-2">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded border ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getSeverityIcon(alert.severity)}
                        <Badge
                          variant="outline"
                          className={`text-xs ${getSeverityColor(alert.severity)} border-current`}
                        >
                          {alert.severity.toUpperCase()}
                        </Badge>
                        {alert.routeId && (
                          <Badge variant="outline" className="text-xs">
                            Route {alert.routeId.replace("route-", "")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-current">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(alert.startsAt).toLocaleTimeString()} - {new Date(alert.endsAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => dismissAlert(alert.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <AlertTriangle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No active alerts</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
