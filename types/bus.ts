// types/bus.ts
export interface BusLocation {
  lat: number
  lng: number
}

export interface BusDriver {
  name: string
  rating: number
  busNumber: string
}

export interface BusETA {
  nextStop: string
  finalDestination: string
}

export interface CrowdLevel {
  occupancy: string
  passengers: number
  totalSeats: number
  crowdStatus: "comfortable" | "crowded" | "packed"
  waitTime: string
}

export interface BusData {
  busId: string
  routeName: string
  currentLocation: string
  status: string
  crowdLevel: CrowdLevel
  nextStops: string[]
  eta: BusETA
  driver: BusDriver
  position: BusLocation
}
