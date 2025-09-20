import type { GeoJSON } from "geojson"

export interface BusLocation {
  id: string
  routeId: string
  status: "moving" | "stopped" | "delayed" | "out-of-service"
  location: {
    lat: number
    lng: number
  }
  speed: number
  delay: number
  occupancy: number
  lastPing: Date
}

export interface Route {
  id: string
  name: string
  color: string
  direction: string
  polyline: GeoJSON.LineString
  stops: Stop[]
}

export interface Stop {
  id: string
  name: string
  code: string
  location: {
    lat: number
    lng: number
  }
  address: string
  accessible: boolean
}

export interface ETA {
  stopId: string
  routeId: string
  arrivals: Array<{
    inMinRange: [number, number]
    confidence: number
    occupancyTag: "low" | "medium" | "high"
  }>
}

export const CHANDIGARH_CENTER = {
  lat: 30.75,
  lng: 76.78,
  zoom: 12,
}

export const MOCK_ROUTES: Route[] = [
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
]

export const MOCK_STOPS: Stop[] = [
  {
    id: "stop-1",
    name: "ISBT-17",
    code: "ISB001",
    location: { lat: 30.76, lng: 76.76 },
    address: "Inter State Bus Terminal, Sector 17",
    accessible: true,
  },
  {
    id: "stop-2",
    name: "Sector 17 Plaza",
    code: "S17001",
    location: { lat: 30.75, lng: 76.78 },
    address: "Sector 17 Plaza, Chandigarh",
    accessible: true,
  },
  {
    id: "stop-3",
    name: "Elante Mall",
    code: "ELT001",
    location: { lat: 30.74, lng: 76.8 },
    address: "Elante Mall, Industrial Area Phase I",
    accessible: false,
  },
]

export const MOCK_BUSES: BusLocation[] = [
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
]

export function getBusStatusColor(status: BusLocation["status"]): string {
  switch (status) {
    case "moving":
      return "#14b8a6" // teal
    case "stopped":
      return "#eab308" // yellow
    case "delayed":
      return "#f97316" // orange
    case "out-of-service":
      return "#ef4444" // red
    default:
      return "#6b7280" // gray
  }
}

export function formatDelay(delaySec: number): string {
  const minutes = Math.floor(delaySec / 60)
  if (minutes === 0) return "On time"
  return `+${minutes}m`
}

export function getOccupancyLevel(occupancy: number): "low" | "medium" | "high" {
  if (occupancy < 0.3) return "low"
  if (occupancy < 0.7) return "medium"
  return "high"
}
