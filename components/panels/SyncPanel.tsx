"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Wifi, WifiOff, Zap, Satellite } from "lucide-react"
import { api, type SystemHealth } from "@/lib/api/client"
import { getWebSocketClient } from "@/lib/ws/client"

export function SyncPanel() {
  const [health, setHealth] = useState<SystemHealth | null>(null)
  const [loading, setLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    fetchSystemHealth()

    const wsClient = getWebSocketClient()
    setIsConnected(wsClient.isConnected)

    // Subscribe to connection status updates
    const unsubscribe = wsClient.subscribe("system_status", (data) => {
      setHealth((prev) => (prev ? { ...prev, ...data } : data))
    })

    return unsubscribe
  }, [])

  const fetchSystemHealth = async () => {
    setLoading(true)
    try {
      const healthData = await api.getSystemHealth()
      setHealth(healthData)
    } catch (error) {
      console.error("Failed to fetch system health:", error)
    } finally {
      setLoading(false)
    }
  }

  const syncNow = async () => {
    await fetchSystemHealth()
    // Trigger a refresh of other components
    window.dispatchEvent(new CustomEvent("sync-now"))
  }

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return "text-green-400"
    if (latency < 100) return "text-yellow-400"
    return "text-red-400"
  }

  const getCoverageColor = (coverage: number) => {
    if (coverage > 90) return "text-green-400"
    if (coverage > 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          {isConnected ? <Wifi className="h-4 w-4 text-green-400" /> : <WifiOff className="h-4 w-4 text-red-400" />}
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Connection</span>
            <Badge
              variant="outline"
              className={isConnected ? "text-green-400 border-green-400" : "text-red-400 border-red-400"}
            >
              {isConnected ? "Online" : "Offline"}
            </Badge>
          </div>

          {health && (
            <>
              {/* Last Update */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Last Update</span>
                <span className="text-sm text-white">{new Date(health.lastUpdateMs).toLocaleTimeString()}</span>
              </div>

              {/* Latency */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Latency
                </span>
                <span className={`text-sm font-medium ${getLatencyColor(health.latencyMs)}`}>{health.latencyMs}ms</span>
              </div>

              {/* GPS Coverage */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Satellite className="h-3 w-3" />
                  GPS Coverage
                </span>
                <span className={`text-sm font-medium ${getCoverageColor(health.gpsCoveragePct)}`}>
                  {health.gpsCoveragePct}%
                </span>
              </div>

              {/* Coverage Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      health.gpsCoveragePct > 90
                        ? "bg-green-400"
                        : health.gpsCoveragePct > 70
                          ? "bg-yellow-400"
                          : "bg-red-400"
                    }`}
                    style={{ width: `${health.gpsCoveragePct}%` }}
                  />
                </div>
              </div>

              {/* Refresh Rate */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Refresh Rate</span>
                <span className="text-sm text-white">{health.refreshRateSec}s</span>
              </div>
            </>
          )}

          {/* Sync Button */}
          <Button
            size="sm"
            onClick={syncNow}
            disabled={loading}
            className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900"
          >
            <RefreshCw className={`h-3 w-3 mr-2 ${loading ? "animate-spin" : ""}`} />
            Sync Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
