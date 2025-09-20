// components/Sector17BusDemo.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import type { BusData, BusLocation } from "@/types/bus"

// Coordinates
const SECTOR_17_CENTER: BusLocation = { lat: 30.7333, lng: 76.7794 }
const ELANTE_MALL_CENTER: BusLocation = { lat: 30.7046, lng: 76.8006 }

// Route path from Sector 17 to Elante Mall
const ROUTE_PATH: BusLocation[] = [
  { lat: 30.7333, lng: 76.7794 }, // Sector 17 Plaza
  { lat: 30.732, lng: 76.782 }, // Tribune Chowk
  { lat: 30.728, lng: 76.787 }, // Sector 22 Market
  { lat: 30.72, lng: 76.792 }, // Piccadilly Square
  { lat: 30.713, lng: 76.798 }, // Industrial Area Phase 1
  { lat: 30.7046, lng: 76.8006 }, // Elante Mall
]

// Bus stops data
const BUS_STOPS = [
  { id: 1, name: "Sector 17 Plaza", position: { lat: 30.7333, lng: 76.7794 }, current: true },
  { id: 2, name: "Tribune Chowk", position: { lat: 30.732, lng: 76.782 }, current: false },
  { id: 3, name: "Sector 22 Market", position: { lat: 30.728, lng: 76.787 }, current: false },
  { id: 4, name: "Piccadilly Square", position: { lat: 30.72, lng: 76.792 }, current: false },
  { id: 5, name: "Industrial Area Phase 1", position: { lat: 30.713, lng: 76.798 }, current: false },
  { id: 6, name: "Elante Mall Main Gate", position: { lat: 30.7046, lng: 76.8006 }, current: false },
]

// Mock bus data
const MOCK_BUS_DATA: BusData = {
  busId: "CHD-S17-001",
  routeName: "Sector 17 → Elante Mall Express",
  currentLocation: "Sector 17 Plaza Bus Stop",
  status: "Boarding Passengers",
  crowdLevel: {
    occupancy: "68%",
    passengers: 41,
    totalSeats: 60,
    crowdStatus: "crowded",
    waitTime: "2-3 minutes",
  },
  nextStops: ["Tribune Chowk", "Piccadilly Square", "Elante Mall"],
  eta: {
    nextStop: "3 minutes",
    finalDestination: "18 minutes",
  },
  driver: {
    name: "Rajesh Kumar",
    rating: 4.8,
    busNumber: "PB-02-AC-5647",
  },
  position: SECTOR_17_CENTER,
}

export default function Sector17BusDemo() {
  const [showBusInfo, setShowBusInfo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [animatedPosition, setAnimatedPosition] = useState(0)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Simulate bus movement animation
  useEffect(() => {
    const animationTimer = setInterval(() => {
      setAnimatedPosition((prev) => (prev + 1) % 100)
    }, 2000)

    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearInterval(animationTimer)
      clearTimeout(loadingTimer)
    }
  }, [])

  const handleBusClick = useCallback(() => {
    setShowBusInfo(true)
  }, [])

  const handleInfoClose = useCallback(() => {
    setShowBusInfo(false)
  }, [])

  return (
    <div className="relative w-full h-[520px] rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
          {/* Grid pattern to simulate map */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Route Path Visualization */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          <path
            d="M 100 200 Q 200 150 300 180 Q 400 210 450 160 Q 500 120 520 140"
            stroke="url(#routeGradient)"
            strokeWidth="6"
            fill="none"
            strokeDasharray="10,5"
            className="animate-pulse"
          />
        </svg>

        {/* Bus Stop Markers */}
        {BUS_STOPS.map((stop, index) => (
          <div
            key={stop.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${20 + index * 80}px`,
              top: `${180 + (index % 2 === 0 ? -20 : 20)}px`,
            }}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-white ${
                stop.current ? "bg-yellow-500 animate-pulse" : "bg-blue-500"
              }`}
            >
              {stop.id}
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-lg max-w-32 text-center">
              {stop.name}
            </div>
          </div>
        ))}

        {/* Animated Bus Marker */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{
            left: `${120 + animatedPosition * 3}px`,
            top: `${190 + Math.sin(animatedPosition * 0.1) * 10}px`,
          }}
          onClick={handleBusClick}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-4 border-white shadow-xl animate-pulse flex items-center justify-center">
              <span className="text-white font-bold text-lg">🚌</span>
            </div>
            {/* Live Indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full"></div>
            {/* Bus ID Label */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg">
              {MOCK_BUS_DATA.busId}
            </div>
            {/* Status Badge */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
              LIVE
            </div>
          </div>
        </div>

        {/* Bus Info Popup */}
        {showBusInfo && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white p-4 rounded-lg max-w-sm shadow-2xl border border-gray-600 z-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-blue-400">{MOCK_BUS_DATA.busId}</h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
                  {MOCK_BUS_DATA.status}
                </span>
                <button onClick={handleInfoClose} className="text-gray-400 hover:text-white text-xl">
                  ×
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-300">Route:</span>
                <div className="text-white font-medium">{MOCK_BUS_DATA.routeName}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-300">Occupancy:</span>
                  <div className="text-white font-medium">{MOCK_BUS_DATA.crowdLevel.occupancy}</div>
                </div>
                <div>
                  <span className="text-gray-300">Passengers:</span>
                  <div className="text-white font-medium">
                    {MOCK_BUS_DATA.crowdLevel.passengers}/{MOCK_BUS_DATA.crowdLevel.totalSeats}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-gray-300">Crowd Level:</span>
                <div
                  className={`font-medium ${
                    MOCK_BUS_DATA.crowdLevel.crowdStatus === "comfortable"
                      ? "text-green-400"
                      : MOCK_BUS_DATA.crowdLevel.crowdStatus === "crowded"
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  {MOCK_BUS_DATA.crowdLevel.crowdStatus} ({MOCK_BUS_DATA.crowdLevel.waitTime})
                </div>
              </div>

              <div>
                <span className="text-gray-300">Next Stops:</span>
                <div className="text-white">{MOCK_BUS_DATA.nextStops.join(" → ")}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-300">Next Stop ETA:</span>
                  <div className="text-blue-400 font-medium">{MOCK_BUS_DATA.eta.nextStop}</div>
                </div>
                <div>
                  <span className="text-gray-300">Final ETA:</span>
                  <div className="text-blue-400 font-medium">{MOCK_BUS_DATA.eta.finalDestination}</div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-2 mt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-300">Driver:</span>
                    <div className="text-white font-medium">{MOCK_BUS_DATA.driver.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400">★ {MOCK_BUS_DATA.driver.rating}</div>
                    <div className="text-gray-300 text-xs">{MOCK_BUS_DATA.driver.busNumber}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <div className="text-blue-400 text-lg font-medium">Loading Sector 17 Demo...</div>
          </div>
        </div>
      )}

      {/* Demo Info Panel */}
      <div className="absolute top-4 left-4 bg-gray-900/95 backdrop-blur text-white p-3 rounded-lg shadow-xl max-w-xs">
        <h4 className="font-bold text-blue-400 mb-2">🚌 Demo Active</h4>
        <p className="text-sm text-gray-300 mb-2">Showing live bus tracking for Sector 17 route</p>
        <div className="text-xs text-gray-400">
          <div>Route: Sector 17 → Elante Mall</div>
          <div>Bus: CHD-S17-001</div>
          <div>Updated: {currentTime.toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Route Legend */}
      <div className="absolute bottom-4 right-4 bg-gray-900/95 backdrop-blur text-white p-3 rounded-lg shadow-xl">
        <h5 className="font-bold text-sm mb-2">Route Legend</h5>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span>Route Path</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span>Live Bus</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
            <span>Current Stop</span>
          </div>
        </div>
      </div>
    </div>
  )
}
