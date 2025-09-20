"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, RefreshCw, Map, Bell, Palette } from "lucide-react"
import { usePreferences } from "@/store/preferences"

export function SystemPreferences() {
  const {
    theme,
    setTheme,
    refreshInterval,
    setRefreshInterval,
    mapStyle,
    setMapStyle,
    notifications,
    updateNotifications,
  } = usePreferences()

  const refreshIntervalOptions = [
    { value: 5, label: "5 seconds" },
    { value: 15, label: "15 seconds" },
    { value: 30, label: "30 seconds" },
    { value: 60, label: "1 minute" },
  ]

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Settings className="h-4 w-4 text-gray-400" />
          System Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Theme Selection */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-white">Theme</span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => setTheme("dark")}
              className="flex-1"
            >
              Dark
            </Button>
            <Button
              size="sm"
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => setTheme("light")}
              className="flex-1"
            >
              Light
            </Button>
          </div>
        </div>

        {/* Refresh Interval */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-white">Refresh Interval</span>
          </div>
          <Select
            value={refreshInterval.toString()}
            onValueChange={(value) => setRefreshInterval(Number.parseInt(value))}
          >
            <SelectTrigger className="bg-gray-900 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {refreshIntervalOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Map Style */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Map className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-white">Map Style</span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={mapStyle === "dark" ? "default" : "outline"}
              onClick={() => setMapStyle("dark")}
              className="flex-1"
            >
              Dark
            </Button>
            <Button
              size="sm"
              variant={mapStyle === "light" ? "default" : "outline"}
              onClick={() => setMapStyle("light")}
              className="flex-1"
            >
              Light
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-white">Notifications</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Arrival Alerts</span>
              <Switch
                checked={notifications.arrivals}
                onCheckedChange={(checked) => updateNotifications({ arrivals: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Delay Notifications</span>
              <Switch
                checked={notifications.delays}
                onCheckedChange={(checked) => updateNotifications({ delays: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Route Changes</span>
              <Switch
                checked={notifications.routeChanges}
                onCheckedChange={(checked) => updateNotifications({ routeChanges: checked })}
              />
            </div>
          </div>
        </div>

        {/* Current Settings Summary */}
        <div className="pt-3 border-t border-gray-700">
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">
              {theme} theme
            </Badge>
            <Badge variant="outline" className="text-xs">
              {refreshInterval}s refresh
            </Badge>
            <Badge variant="outline" className="text-xs">
              {mapStyle} map
            </Badge>
            <Badge variant="outline" className="text-xs">
              {Object.values(notifications).filter(Boolean).length}/3 notifications
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
