"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Route, Building2, X } from "lucide-react"

type SearchType = "routes" | "stops" | "landmarks"

interface SearchResult {
  id: string
  name: string
  type: SearchType
  subtitle?: string
  code?: string
  location?: { lat: number; lng: number }
}

interface RouteStopFinderProps {
  onResultSelect?: (result: SearchResult) => void
}

const CHANDIGARH_LANDMARKS = [
  { id: "isbt-17", name: "ISBT-17", type: "landmarks" as const, subtitle: "Inter State Bus Terminal" },
  { id: "sector-17-plaza", name: "Sector 17 Plaza", type: "landmarks" as const, subtitle: "Shopping Center" },
  { id: "pgimer", name: "PGIMER", type: "landmarks" as const, subtitle: "Medical Institute" },
  { id: "elante-mall", name: "Elante Mall", type: "landmarks" as const, subtitle: "Shopping Mall" },
  {
    id: "chandigarh-university",
    name: "Chandigarh University",
    type: "landmarks" as const,
    subtitle: "Educational Institute",
  },
  { id: "rock-garden", name: "Rock Garden", type: "landmarks" as const, subtitle: "Tourist Attraction" },
]

export function RouteStopFinder({ onResultSelect }: RouteStopFinderProps) {
  const [activeTab, setActiveTab] = useState<SearchType>("routes")
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 0) {
        performSearch()
      } else {
        setResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, activeTab])

  const performSearch = async () => {
    setLoading(true)
    try {
      let searchResults: SearchResult[] = []

      if (query.toLowerCase().includes("sector 17")) {
        // Trigger Sector 17 demo
        triggerSector17Demo()

        // Return specific Sector 17 results
        searchResults = [
          {
            id: "sector-17-demo",
            name: "Sector 17 → Elante Mall Express",
            type: "routes" as const,
            subtitle: "Live Demo Route - 6 stops, 18 mins",
          },
          {
            id: "sector-17-plaza",
            name: "Sector 17 Plaza Bus Stop",
            type: "stops" as const,
            subtitle: "Shopping Center - Live Bus Available",
            code: "S17001",
          },
        ]
      } else if (activeTab === "landmarks") {
        searchResults = CHANDIGARH_LANDMARKS.filter(
          (landmark) =>
            landmark.name.toLowerCase().includes(query.toLowerCase()) ||
            landmark.subtitle.toLowerCase().includes(query.toLowerCase()),
        )
      } else if (activeTab === "routes") {
        // Mock route search
        const mockRoutes = [
          { id: "route-1", name: "Route 1", subtitle: "ISBT to Elante Mall" },
          { id: "route-2", name: "Route 2", subtitle: "PGI to Sector 17" },
          { id: "route-3", name: "Route 3", subtitle: "University to Rock Garden" },
        ]
        searchResults = mockRoutes
          .filter(
            (route) =>
              route.name.toLowerCase().includes(query.toLowerCase()) ||
              route.subtitle.toLowerCase().includes(query.toLowerCase()),
          )
          .map((route) => ({ ...route, type: "routes" as const }))
      } else if (activeTab === "stops") {
        // Mock stop search
        const mockStops = [
          { id: "stop-1", name: "ISBT-17", code: "ISB001", subtitle: "Inter State Bus Terminal" },
          { id: "stop-2", name: "Sector 17 Plaza", code: "S17001", subtitle: "Shopping Center" },
          { id: "stop-3", name: "Elante Mall", code: "ELT001", subtitle: "Industrial Area Phase I" },
          { id: "stop-4", name: "PGIMER", code: "PGI001", subtitle: "Medical Institute" },
        ]
        searchResults = mockStops
          .filter(
            (stop) =>
              stop.name.toLowerCase().includes(query.toLowerCase()) ||
              stop.code.toLowerCase().includes(query.toLowerCase()) ||
              stop.subtitle.toLowerCase().includes(query.toLowerCase()),
          )
          .map((stop) => ({ ...stop, type: "stops" as const }))
      }

      setResults(searchResults)
      setShowResults(true)
      setSelectedIndex(-1)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const triggerSector17Demo = () => {
    console.log("[v0] Triggering Sector 17 demo")

    // Dispatch custom event to trigger map demo
    const demoEvent = new CustomEvent("sector17Demo", {
      detail: {
        center: { lat: 30.7333, lng: 76.7794 },
        zoom: 16,
        busData: {
          busId: "CHD-S17-001",
          routeName: "Sector 17 → Elante Mall Express",
          currentLocation: "Sector 17 Plaza Bus Stop",
          status: "Boarding Passengers",
          crowdLevel: {
            occupancy: "68%",
            passengers: 41,
            totalSeats: 60,
            crowdStatus: "Moderately Crowded",
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
        },
        routeData: {
          name: "Sector 17 → Elante Mall Express",
          color: "#3B82F6",
          stops: [
            { name: "Sector 17 Plaza Bus Stop", lat: 30.7333, lng: 76.7794, current: true },
            { name: "Tribune Chowk", lat: 30.732, lng: 76.785 },
            { name: "Sector 22 Market", lat: 30.728, lng: 76.79 },
            { name: "Piccadilly Square", lat: 30.72, lng: 76.795 },
            { name: "Industrial Area Phase 1", lat: 30.71, lng: 76.8 },
            { name: "Elante Mall Main Gate", lat: 30.7046, lng: 76.8006 },
          ],
        },
      },
    })

    window.dispatchEvent(demoEvent)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          selectResult(results[selectedIndex])
        }
        break
      case "Escape":
        setShowResults(false)
        setSelectedIndex(-1)
        break
    }
  }

  const selectResult = (result: SearchResult) => {
    setQuery(result.name)
    setShowResults(false)
    setSelectedIndex(-1)
    onResultSelect?.({ ...result, query })
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setShowResults(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const getResultIcon = (type: SearchType) => {
    switch (type) {
      case "routes":
        return <Route className="h-4 w-4 text-lime-400" />
      case "stops":
        return <MapPin className="h-4 w-4 text-blue-400" />
      case "landmarks":
        return <Building2 className="h-4 w-4 text-purple-400" />
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700 relative">
      <CardHeader>
        <CardTitle className="text-sm">Find Routes & Stops</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tab Selector */}
        <div className="flex rounded-lg bg-gray-900 p-1">
          {(["routes", "stops", "landmarks"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors capitalize ${
                activeTab === tab ? "bg-lime-400 text-gray-900" : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setShowResults(true)}
            placeholder={`Search ${activeTab}...`}
            className="pl-10 pr-10 bg-gray-900 border-gray-600 text-white"
          />
          {query && (
            <button onClick={clearSearch} className="absolute right-3 top-3 text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Quick Access Chips */}
        {activeTab === "landmarks" && !query && (
          <div className="flex flex-wrap gap-2">
            {CHANDIGARH_LANDMARKS.slice(0, 4).map((landmark) => (
              <Button
                key={landmark.id}
                size="sm"
                variant="outline"
                onClick={() => selectResult(landmark)}
                className="h-7 px-2 text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                {landmark.name}
              </Button>
            ))}
          </div>
        )}

        {/* Search Results */}
        {showResults && (
          <div
            ref={resultsRef}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto"
          >
            {loading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-lime-400 mx-auto"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => selectResult(result)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
                      index === selectedIndex ? "bg-gray-700" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getResultIcon(result.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white truncate">{result.name}</span>
                          {result.code && (
                            <Badge variant="outline" className="text-xs">
                              {result.code}
                            </Badge>
                          )}
                        </div>
                        {result.subtitle && <p className="text-sm text-gray-400 truncate">{result.subtitle}</p>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-400">
                <Search className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm">No results found</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
