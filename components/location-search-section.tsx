"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Search, X, Home, GraduationCap, ShoppingCart } from "lucide-react"

const quickActionTiles = [
  { icon: Home, label: "Home-Work Commute", id: "commute" },
  { icon: GraduationCap, label: "Colleges", id: "colleges" },
  { icon: ShoppingCart, label: "Main Market", id: "market" },
]

const mockSuggestions = [
  { type: "stop", name: "Central Bus Station", routes: ["12", "45", "67"] },
  { type: "stop", name: "City Mall Stop", routes: ["23", "89"] },
  { type: "route", name: "Route 12", description: "Airport - Downtown" },
  { type: "stop", name: "University Gate", routes: ["34", "56", "78"] },
  { type: "route", name: "Route 45", description: "Mall - Railway Station" },
]

const placeholderTexts = [
  "Enter route name or route number",
  "Search for bus stops...",
  "Find your route...",
  "Type stop name...",
]

export default function LocationSearchSection() {
  const [locationStatus, setLocationStatus] = useState<"idle" | "requesting" | "granted" | "denied">("idle")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholderTexts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleLocationRequest = async () => {
    setLocationStatus("requesting")
    setIsLoading(true)

    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => {
            setLocationStatus("granted")
            setIsLoading(false)
          },
          () => {
            setLocationStatus("denied")
            setIsLoading(false)
          },
        )
      } else {
        setLocationStatus("denied")
        setIsLoading(false)
      }
    }, 1500)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setShowSuggestions(value.length > 0)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSuggestions(false)
  }

  const filteredSuggestions = mockSuggestions
    .filter((suggestion) => suggestion.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5)

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Interactive Elements */}
          <div className="space-y-8">
            {/* Search Bar Component */}
            <div className="relative max-w-md mx-auto lg:mx-0 animate-in slide-in-from-left-6 duration-700 delay-200">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-lime-400 transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder={placeholderTexts[currentPlaceholder]}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-10 h-12 text-base border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 placeholder:font-bold rounded-lg shadow-sm focus:border-lime-400 focus:ring-1 focus:ring-lime-400 focus:shadow-lg focus:shadow-lime-400/20 transition-all duration-300 hover:shadow-md"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <Card className="absolute top-full left-0 right-0 mt-1 border border-gray-600 bg-gray-800 shadow-lg z-10 animate-in slide-in-from-top-2 duration-200">
                  <CardContent className="p-0">
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full px-4 py-3 text-left hover:bg-gray-700 border-b border-gray-600 last:border-b-0 flex items-center space-x-3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setSearchQuery(suggestion.name)
                          setShowSuggestions(false)
                        }}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex-shrink-0 animate-bounce">
                          {suggestion.type === "stop" ? (
                            <div className="w-6 h-6 flex items-center justify-center">🚏</div>
                          ) : (
                            <div className="w-6 h-6 flex items-center justify-center">🚌</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white">
                            {suggestion.name.split(new RegExp(`(${searchQuery})`, "gi")).map((part, i) =>
                              part.toLowerCase() === searchQuery.toLowerCase() ? (
                                <span key={i} className="font-bold">
                                  {part}
                                </span>
                              ) : (
                                part
                              ),
                            )}
                          </div>
                          {suggestion.type === "stop" && suggestion.routes && (
                            <div className="text-sm text-gray-400">Routes: {suggestion.routes.join(", ")}</div>
                          )}
                          {suggestion.type === "route" && suggestion.description && (
                            <div className="text-sm text-gray-400">{suggestion.description}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Location Detection Component */}
            {locationStatus !== "granted" && (
              <div className="border-0 shadow-sm bg-gray-800 border border-gray-600 animate-in slide-in-from-right-6 duration-700 delay-300 hover:shadow-lg hover:shadow-blue-800/10 transition-all duration-300">
                <div className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div
                      className={`p-3 rounded-full bg-blue-800 ${isLoading ? "animate-pulse" : "animate-bounce"} hover:scale-110 transition-transform duration-300`}
                    >
                      <MapPin className="h-8 w-8 text-lime-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">Auto-Detect Location</h3>
                      <p className="text-sm text-gray-200 max-w-md">
                        Allow location access to show nearby bus stops and live timings
                      </p>
                    </div>
                    {isLoading ? (
                      <div className="flex items-center space-x-2 text-lime-400">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-lime-400 border-t-transparent"></div>
                        <span className="text-sm animate-pulse">Finding your location...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={handleLocationRequest}
                          className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-6 hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-lime-400/30"
                          disabled={locationStatus === "requesting"}
                        >
                          Use My Current Location
                        </Button>
                        <Button
                          variant="outline"
                          className="border-blue-400 text-white bg-blue-600 hover:bg-blue-700 hover:border-blue-300 hover:scale-105 transition-all duration-200"
                        >
                          Enter Manually
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Feature Descriptions */}
          <div className="space-y-6">
            <div className="text-center lg:text-left space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-2xl font-bold text-gray-900 bg-lime-400 px-4 py-2 rounded-lg inline-block">
                Find Your Bus
              </h2>
              <p className="text-gray-300">Quickly select a stop or route to see when your bus is arriving.</p>
            </div>

            <div className="flex items-start space-x-4 animate-in slide-in-from-right-4 duration-700 delay-300">
              <div className="flex-shrink-0 p-2 bg-lime-400 rounded-lg hover:scale-110 transition-transform duration-300">
                <MapPin className="h-6 w-6 text-gray-900" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Auto Location</h3>
                <p className="text-gray-300 leading-relaxed">
                  With your permission, the site can automatically detect your current location and show you the nearest
                  bus stops.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 animate-in slide-in-from-right-4 duration-700 delay-500">
              <div className="flex-shrink-0 p-2 bg-blue-800 rounded-lg hover:scale-110 transition-transform duration-300">
                <Search className="h-6 w-6 text-lime-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Search Bar</h3>
                <p className="text-gray-300 leading-relaxed">
                  Type the name of your bus stop or route number, and we'll instantly suggest matching options (like
                  "Market Road Stop" or "Bus 21").
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Tiles - Centered at Bottom */}
        <div className="mt-16 space-y-4 animate-in slide-in-from-bottom-6 duration-700 delay-500">
          <h3 className="text-lg font-semibold text-white text-center">Quick Access</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {quickActionTiles.map((tile, index) => {
              const IconComponent = tile.icon
              return (
                <button
                  key={tile.id}
                  className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-600 hover:shadow-md hover:scale-105 hover:bg-gray-700 transition-all duration-200 min-h-[120px] group animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <IconComponent className="h-8 w-8 text-lime-400 mb-3 group-hover:text-lime-300 group-hover:scale-110 transition-all duration-200" />
                  <span className="text-sm font-medium text-gray-300 text-center leading-tight">{tile.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
