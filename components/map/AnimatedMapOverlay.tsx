"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Bus, Navigation } from "lucide-react"

interface AnimatedMapOverlayProps {
  routeData: {
    busesLive: number
    nearestBus: {
      arrival: string
    }
  }
}

export function AnimatedMapOverlay({ routeData }: AnimatedMapOverlayProps) {
  const [animationPhase, setAnimationPhase] = useState(0)
  const [busPosition, setBusPosition] = useState(0)
  const [showBusDetails, setShowBusDetails] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 100)
      setBusPosition((prev) => (prev + 0.2) % 100)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Route path coordinates (percentage-based for overlay positioning)
  const routePoints = [
    { x: 33, y: 50, name: "Sector 17" }, // Starting point
    { x: 45, y: 45, name: "Tribune Chowk" },
    { x: 60, y: 40, name: "Sector 22" },
    { x: 75, y: 35, name: "Industrial Area" },
    { x: 85, y: 30, name: "Elante Mall" }, // End point
  ]

  // Calculate current bus position along route
  const getCurrentBusPosition = () => {
    const progress = (busPosition / 100) * (routePoints.length - 1)
    const currentIndex = Math.floor(progress)
    const nextIndex = Math.min(currentIndex + 1, routePoints.length - 1)
    const localProgress = progress - currentIndex

    const current = routePoints[currentIndex]
    const next = routePoints[nextIndex]

    return {
      x: current.x + (next.x - current.x) * localProgress,
      y: current.y + (next.y - current.y) * localProgress,
      currentStop: current.name,
      nextStop: next.name,
    }
  }

  const busPos = getCurrentBusPosition()

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
        {routePoints.slice(0, -1).map((point, index) => {
          const nextPoint = routePoints[index + 1]
          return (
            <line
              key={index}
              x1={`${point.x}%`}
              y1={`${point.y}%`}
              x2={`${nextPoint.x}%`}
              y2={`${nextPoint.y}%`}
              stroke="url(#routeGradient)"
              strokeWidth="3"
              strokeDasharray="8,4"
              strokeDashoffset={-animationPhase * 1.5}
              className="drop-shadow-md"
              style={{
                animation: `dashMove 3s linear infinite`,
              }}
            />
          )
        })}

        {/* Main animated route path - now smoother curve */}
        <path
          d={`M ${routePoints[0].x}% ${routePoints[0].y}% 
              Q ${routePoints[1].x}% ${routePoints[1].y}% ${routePoints[2].x}% ${routePoints[2].y}%
              Q ${routePoints[3].x}% ${routePoints[3].y}% ${routePoints[4].x}% ${routePoints[4].y}%`}
          stroke="url(#routeGradient)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="10,5"
          strokeDashoffset={-animationPhase * 2}
          className="drop-shadow-lg"
        />

        {/* Gradient definition for route */}
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>

      <style jsx>{`
        @keyframes dashMove {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -24; }
        }
      `}</style>

      {/* Sector 17 marker */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ left: `${routePoints[0].x}%`, top: `${routePoints[0].y}%` }}
      >
        <div className="relative">
          <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
          </div>
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap font-semibold">
            Sector 17
          </div>
        </div>
      </div>

      {/* Elante Mall marker */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ left: `${routePoints[4].x}%`, top: `${routePoints[4].y}%` }}
      >
        <div className="relative">
          <div className="w-8 h-8 bg-purple-500 rounded-lg border-4 border-white shadow-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">🏬</span>
          </div>
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap font-semibold">
            Elante Mall
          </div>
        </div>
      </div>

      {/* Intermediate stops */}
      {routePoints.slice(1, -1).map((point, index) => (
        <div
          key={index}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        >
          <div className="w-4 h-4 bg-blue-400 rounded-full border-2 border-white shadow-md">
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
          </div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {point.name}
          </div>
        </div>
      ))}

      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto cursor-pointer transition-all duration-500 ease-in-out"
        style={{ left: `${busPos.x}%`, top: `${busPos.y}%` }}
        onClick={() => setShowBusDetails(!showBusDetails)}
      >
        <div className="relative">
          <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <Bus className="h-4 w-4 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap font-semibold">
            CHD-001
          </div>
        </div>
      </div>

      {showBusDetails && (
        <div
          className="absolute z-30 pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{
            left: `${Math.min(busPos.x + 5, 80)}%`,
            top: `${Math.max(busPos.y - 15, 10)}%`,
          }}
        >
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-600 rounded-lg p-4 min-w-64 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-white">CHD-001</span>
              </div>
              <button onClick={() => setShowBusDetails(false)} className="text-gray-400 hover:text-white">
                ×
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Route:</span>
                <span className="text-white">Sector 17 → Elante Mall</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current:</span>
                <span className="text-blue-400">{busPos.currentStop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Next Stop:</span>
                <span className="text-white">{busPos.nextStop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Passengers:</span>
                <span className="text-yellow-400">32/45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Speed:</span>
                <span className="text-green-400">28 km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ETA:</span>
                <span className="text-lime-400">4 min</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Bus Map info panel */}
      <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 text-white pointer-events-auto z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-4 bg-lime-400 rounded-full animate-pulse"></div>
          <span className="text-lg font-bold">Live Bus Map</span>
        </div>
        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-blue-400" />
            <span>Sector 17 → Elante Mall</span>
          </div>
          <div className="flex justify-between text-xs text-gray-300">
            <span>Buses: {routeData.busesLive} live</span>
            <span>Next: {routeData.nearestBus.arrival}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Badge className="bg-green-500/20 text-green-400 border-0 text-xs">Route Active</Badge>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-0 text-xs">Medium Traffic</Badge>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg p-3 text-white pointer-events-auto z-10">
        <h4 className="text-sm font-semibold mb-2">Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Start Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Live Bus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span>Bus Stops</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-lg"></div>
            <span>Destination</span>
          </div>
        </div>
      </div>
    </div>
  )
}
