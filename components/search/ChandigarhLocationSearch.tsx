"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Bus, Building2, ShoppingBag, Hospital, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const chandigarhLocations = {
  "sector 17": [
    {
      id: "sector17-plaza",
      type: "landmark",
      title: "Sector 17 Plaza",
      subtitle: "Main Shopping District & ISBT",
      description: "City Centre, Bus Terminal, Shopping Complex",
      coordinates: { lat: 30.7333, lng: 76.7794 },
      routes: ["R1", "R2", "R3", "R4"],
      nearbyStops: ["ISBT Sector 17", "Sector 17 Plaza", "Tribune Chowk"],
      icon: "🏢",
    },
    {
      id: "sector17-isbt",
      type: "bus_terminal",
      title: "ISBT Sector 17",
      subtitle: "Inter-State Bus Terminus",
      description: "Main bus terminal connecting to all major cities",
      coordinates: { lat: 30.734, lng: 76.779 },
      routes: ["R1", "R2", "R5", "R6"],
      nearbyStops: ["ISBT Main Gate", "Sector 17 Market", "Aroma Chowk"],
      icon: "🚌",
    },
    {
      id: "sector17-market",
      type: "market",
      title: "Sector 17 Market",
      subtitle: "Central Market & Food Court",
      description: "Shopping center with restaurants and retail stores",
      coordinates: { lat: 30.7325, lng: 76.78 },
      routes: ["R1", "R3", "R7"],
      nearbyStops: ["Market Bus Stop", "Food Court", "City Emporium"],
      icon: "🛍️",
    },
    {
      id: "tribune-chowk",
      type: "landmark",
      title: "Tribune Chowk",
      subtitle: "Major Traffic Junction near Sector 17",
      description: "Key intersection connecting multiple sectors",
      coordinates: { lat: 30.735, lng: 76.778 },
      routes: ["R2", "R4", "R8"],
      nearbyStops: ["Tribune Chowk", "Press Club", "Sector 18 Market"],
      icon: "🚦",
    },
  ],
  elante: [
    {
      id: "elante-mall",
      type: "mall",
      title: "Elante Mall",
      subtitle: "Largest Shopping Mall in North India",
      description: "Premium shopping, dining & entertainment complex",
      coordinates: { lat: 30.7046, lng: 76.8006 },
      routes: ["R1", "R9", "R10"],
      nearbyStops: ["Elante Main Gate", "Mall Parking", "Food Court Entry"],
      icon: "🏬",
    },
  ],
  pgi: [
    {
      id: "pgi-hospital",
      type: "hospital",
      title: "PGI Hospital",
      subtitle: "Post Graduate Institute of Medical Sciences",
      description: "Major government hospital and medical college",
      coordinates: { lat: 30.7594, lng: 76.775 },
      routes: ["R2", "R6", "R11"],
      nearbyStops: ["PGI Main Gate", "Emergency Ward", "OPD Complex"],
      icon: "🏥",
    },
  ],
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "landmark":
      return <Building2 className="w-4 h-4" />
    case "bus_terminal":
      return <Bus className="w-4 h-4" />
    case "market":
      return <ShoppingBag className="w-4 h-4" />
    case "mall":
      return <ShoppingBag className="w-4 h-4" />
    case "hospital":
      return <Hospital className="w-4 h-4" />
    default:
      return <MapPin className="w-4 h-4" />
  }
}

const getTypeBadgeColor = (type: string) => {
  switch (type) {
    case "landmark":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "bus_terminal":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "market":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    case "mall":
      return "bg-pink-500/20 text-pink-400 border-pink-500/30"
    case "hospital":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

interface LocationSearchProps {
  onLocationSelect: (location: any) => void
  placeholder?: string
  className?: string
}

export default function ChandigarhLocationSearch({
  onLocationSelect,
  placeholder = "Search routes, stops, or landmarks... (try 'Sector 17')",
  className = "",
}: LocationSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("chandigarh-recent-searches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  const handleSearch = (searchQuery: string) => {
    const searchTerm = searchQuery.toLowerCase().trim()
    if (!searchTerm) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    const results: any[] = []

    Object.keys(chandigarhLocations).forEach((key) => {
      if (key.includes(searchTerm) || searchTerm.includes(key)) {
        results.push(...chandigarhLocations[key as keyof typeof chandigarhLocations])
      }
    })

    // Also search in titles and descriptions
    Object.values(chandigarhLocations)
      .flat()
      .forEach((location) => {
        if (
          location.title.toLowerCase().includes(searchTerm) ||
          location.description.toLowerCase().includes(searchTerm) ||
          location.subtitle.toLowerCase().includes(searchTerm)
        ) {
          if (!results.find((r) => r.id === location.id)) {
            results.push(location)
          }
        }
      })

    const sortedResults = results.slice(0, 4).sort((a, b) => a.title.localeCompare(b.title))
    setSuggestions(sortedResults)
    setIsOpen(sortedResults.length > 0)
    setSelectedIndex(-1)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const selectLocation = (location: any) => {
    setQuery(location.title)
    setIsOpen(false)

    // Save to recent searches
    const updated = [location, ...recentSearches.filter((r) => r.id !== location.id)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("chandigarh-recent-searches", JSON.stringify(updated))

    onLocationSelect(location)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          selectLocation(suggestions[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const popularSearches = [
    { title: "Sector 17", query: "sector 17" },
    { title: "Elante Mall", query: "elante" },
    { title: "PGI Hospital", query: "pgi" },
  ]

  return (
    <div ref={searchRef} className={`relative w-full max-w-2xl ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-4 py-3 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              onClick={() => selectLocation(suggestion)}
              className={`p-4 cursor-pointer transition-colors ${
                index === selectedIndex ? "bg-blue-500/20 border-l-4 border-blue-500" : "hover:bg-gray-700/50"
              } ${index !== suggestions.length - 1 ? "border-b border-gray-700/50" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center">
                    {getTypeIcon(suggestion.type)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-medium truncate">{suggestion.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getTypeBadgeColor(suggestion.type)}`}>
                      {suggestion.type.replace("_", " ")}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-2">{suggestion.subtitle}</p>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {suggestion.routes.slice(0, 3).map((route: string) => (
                        <span
                          key={route}
                          className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30"
                        >
                          {route}
                        </span>
                      ))}
                      {suggestion.routes.length > 3 && (
                        <span className="text-gray-400 text-xs">+{suggestion.routes.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Navigation className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!query && !isOpen && (
        <div className="mt-4">
          <p className="text-gray-400 text-sm mb-2">Popular searches:</p>
          <div className="flex gap-2">
            {popularSearches.map((search) => (
              <Button
                key={search.query}
                variant="outline"
                size="sm"
                onClick={() => setQuery(search.query)}
                className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50"
              >
                {search.title}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
