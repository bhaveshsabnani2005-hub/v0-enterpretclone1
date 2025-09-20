import axios from "axios"
import type { BusLocation, Route, ETA } from "@/lib/map/utils"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("auth_token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export interface Alert {
  id: string
  routeId?: string
  message: string
  severity: "low" | "medium" | "high"
  startsAt: string
  endsAt: string
  status: "active" | "resolved"
}

export interface SystemHealth {
  lastUpdateMs: number
  latencyMs: number
  gpsCoveragePct: number
  refreshRateSec: number
}

// API functions
export const api = {
  // Bus operations
  getLiveBuses: async (): Promise<BusLocation[]> => {
    try {
      const response = await apiClient.get("/buses/live")
      return response.data
    } catch (error) {
      console.warn("API not available, using mock data")
      return mockBuses()
    }
  },

  // Route operations
  getRoutes: async (): Promise<Route[]> => {
    try {
      const response = await apiClient.get("/routes")
      return response.data
    } catch (error) {
      console.warn("API not available, using mock data")
      return mockRoutes()
    }
  },

  // Stop operations
  getStopETAs: async (stopId: string): Promise<ETA> => {
    try {
      const response = await apiClient.get(`/stops/${stopId}/etas`)
      return response.data
    } catch (error) {
      console.warn("API not available, using mock data")
      return mockETA(stopId)
    }
  },

  // Alert operations
  getActiveAlerts: async (): Promise<Alert[]> => {
    try {
      const response = await apiClient.get("/alerts/active")
      return response.data
    } catch (error) {
      console.warn("API not available, using mock data")
      return mockAlerts()
    }
  },

  // System health
  getSystemHealth: async (): Promise<SystemHealth> => {
    try {
      const response = await apiClient.get("/system/health")
      return response.data
    } catch (error) {
      console.warn("API not available, using mock data")
      return mockSystemHealth()
    }
  },

  // User favorites
  addFavorite: async (stopId: string): Promise<void> => {
    try {
      await apiClient.post("/users/favorites", { stopId })
    } catch (error) {
      console.warn("API not available, favorite not saved")
    }
  },

  removeFavorite: async (stopId: string): Promise<void> => {
    try {
      await apiClient.delete(`/users/favorites/${stopId}`)
    } catch (error) {
      console.warn("API not available, favorite not removed")
    }
  },
}

// Mock data functions for development
function mockBuses(): BusLocation[] {
  return [
    {
      id: "CHD-001",
      routeId: "route-1",
      status: "moving",
      location: { lat: 30.755, lng: 76.77 },
      speed: 28,
      delay: 4,
      occupancy: 0.7,
      lastPing: new Date(),
    },
    {
      id: "CHD-002",
      routeId: "route-1",
      status: "stopped",
      location: { lat: 30.745, lng: 76.785 },
      speed: 0,
      delay: 2,
      occupancy: 0.4,
      lastPing: new Date(),
    },
    {
      id: "CHD-003",
      routeId: "route-2",
      status: "delayed",
      location: { lat: 30.76, lng: 76.79 },
      speed: 15,
      delay: 8,
      occupancy: 0.9,
      lastPing: new Date(),
    },
  ]
}

function mockRoutes(): Route[] {
  return [
    {
      id: "route-1",
      name: "Route 1",
      color: "#84cc16",
      direction: "ISBT to Elante",
      polyline: {
        type: "LineString",
        coordinates: [
          [76.76, 30.76],
          [76.78, 30.75],
          [76.8, 30.74],
        ],
      },
      stops: [],
    },
    {
      id: "route-2",
      name: "Route 2",
      color: "#3b82f6",
      direction: "PGI to Sector 17",
      polyline: {
        type: "LineString",
        coordinates: [
          [76.77, 30.77],
          [76.78, 30.75],
          [76.79, 30.73],
        ],
      },
      stops: [],
    },
  ]
}

function mockETA(stopId: string): ETA {
  return {
    stopId,
    routeId: "route-1",
    arrivals: [
      { inMinRange: [2, 4], confidence: 0.9, occupancyTag: "medium" },
      { inMinRange: [8, 12], confidence: 0.8, occupancyTag: "low" },
      { inMinRange: [15, 18], confidence: 0.7, occupancyTag: "high" },
    ],
  }
}

function mockAlerts(): Alert[] {
  return [
    {
      id: "alert-1",
      routeId: "route-2",
      message: "Route 2 delayed due to traffic congestion",
      severity: "medium",
      startsAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + 3600000).toISOString(),
      status: "active",
    },
    {
      id: "alert-2",
      message: "New stop added on Route 5 - Sector 22",
      severity: "low",
      startsAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + 86400000).toISOString(),
      status: "active",
    },
  ]
}

function mockSystemHealth(): SystemHealth {
  return {
    lastUpdateMs: Date.now(),
    latencyMs: 45,
    gpsCoveragePct: 94,
    refreshRateSec: 15,
  }
}
