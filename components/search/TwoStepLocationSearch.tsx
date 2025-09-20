"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Navigation, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TwoStepLocationSearchProps {
  onLocationChange: (from: string, to: string) => void
  onClear: () => void
}

const chandigarhLocations = [
  "Sector 17",
  "Elante Mall",
  "PGI Hospital",
  "Sector 22",
  "Sector 35",
  "Chandigarh Railway Station",
  "ISBT Sector 43",
  "Rock Garden",
  "Sukhna Lake",
  "Sector 8 Market",
  "Sector 15 Market",
  "Manimajra",
  "Panchkula",
  "Mohali",
  "Zirakpur",
  "Sector 34",
  "Sector 46",
  "Tribune Chowk",
  "Piccadily Square",
  "DLF Mall",
  "Nexus Mall",
  "Sector 17 Plaza",
  "Sector 22 Market",
  "Industrial Area Phase 1",
  "Sector 35 Market",
  "Sector 43 ISBT",
  "Chandigarh University",
  "Punjab University",
  "Government Medical College",
  "Sector 14 Market",
  "Sector 19 Market",
  "Sector 26 Market",
  "Sector 32 Market",
]

const popularRoutes = [
  { from: "Sector 17", to: "Elante Mall" },
  { from: "PGI Hospital", to: "Sector 22" },
  { from: "Railway Station", to: "Sector 35" },
  { from: "ISBT Sector 43", to: "Sector 17" },
  { from: "Chandigarh University", to: "Sector 17" },
  { from: "Mohali", to: "Sector 22" },
]

export default function TwoStepLocationSearch({ onLocationChange, onClear }: TwoStepLocationSearchProps) {
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([])
  const [toSuggestions, setToSuggestions] = useState<string[]>([])
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)
  const hasCalledOnLocationChange = useRef(false)

  const filterSuggestions = (input: string) => {
    if (!input.trim()) return []
    return chandigarhLocations.filter((location) => location.toLowerCase().includes(input.toLowerCase())).slice(0, 5)
  }

  useEffect(() => {
    setFromSuggestions(filterSuggestions(fromLocation))
  }, [fromLocation])

  useEffect(() => {
    setToSuggestions(filterSuggestions(toLocation))
  }, [toLocation])

  useEffect(() => {
    if (fromLocation.trim() && toLocation.trim()) {
      const locationKey = `${fromLocation}-${toLocation}`
      if (!hasCalledOnLocationChange.current || hasCalledOnLocationChange.current !== locationKey) {
        onLocationChange(fromLocation, toLocation)
        hasCalledOnLocationChange.current = locationKey
      }
    } else {
      hasCalledOnLocationChange.current = false
    }
  }, [fromLocation, toLocation])

  const handleFromSelect = (location: string) => {
    setFromLocation(location)
    setShowFromSuggestions(false)
    hasCalledOnLocationChange.current = false
  }

  const handleToSelect = (location: string) => {
    setToLocation(location)
    setShowToSuggestions(false)
    hasCalledOnLocationChange.current = false
  }

  const handleClear = () => {
    setFromLocation("")
    setToLocation("")
    setShowFromSuggestions(false)
    setShowToSuggestions(false)
    hasCalledOnLocationChange.current = false
    onClear()
  }

  const handlePopularRoute = (route: { from: string; to: string }) => {
    setFromLocation(route.from)
    setToLocation(route.to)
    setShowFromSuggestions(false)
    setShowToSuggestions(false)
    hasCalledOnLocationChange.current = false
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* From Location */}
        <div className="relative">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Enter Your Location (e.g. Sector 17)"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              onFocus={() => setShowFromSuggestions(true)}
              onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
              className="pl-10 pr-4 py-3 text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          {/* From Suggestions */}
          {showFromSuggestions && fromSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {fromSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleFromSelect(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-700 text-white border-b border-gray-700 last:border-b-0 flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* To Location */}
        <div className="relative">
          <div className="relative">
            <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Where Do You Want To Go? (e.g. Elante Mall)"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              onFocus={() => setShowToSuggestions(true)}
              onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
              className="pl-10 pr-4 py-3 text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* To Suggestions */}
          {showToSuggestions && toSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {toSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleToSelect(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-700 text-white border-b border-gray-700 last:border-b-0 flex items-center gap-2"
                >
                  <Navigation className="h-4 w-4 text-gray-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-400">Popular routes:</span>
          {popularRoutes.map((route, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handlePopularRoute(route)}
              className="text-xs bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {route.from} → {route.to}
            </Button>
          ))}
        </div>

        {(fromLocation || toLocation) && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Locations
          </Button>
        )}
      </div>

      {!fromLocation || !toLocation ? (
        <div className="text-center py-4">
          <p className="text-gray-400 text-sm">Enter your current location and destination to view transit data.</p>
          {fromLocation && !toLocation && (
            <p className="text-blue-400 text-xs mt-1">Now enter your destination to see available routes</p>
          )}
          {!fromLocation && toLocation && (
            <p className="text-green-400 text-xs mt-1">Now enter your current location to see available routes</p>
          )}
        </div>
      ) : (
        <div className="text-center py-2">
          <p className="text-green-400 text-sm">
            Showing transit data for {fromLocation} → {toLocation}
          </p>
          <p className="text-gray-400 text-xs mt-1">Live bus tracking, crowd density, and arrival times available</p>
        </div>
      )}
    </div>
  )
}
