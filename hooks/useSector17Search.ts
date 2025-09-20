"use client"

// hooks/useSector17Search.ts
import { useState, useCallback } from "react"

export const useSector17Search = () => {
  const [isDemo, setIsDemo] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const handleRouteSearch = useCallback((query: string) => {
    const searchTerm = query.toLowerCase().trim()

    if (searchTerm.includes("sector 17") || searchTerm === "s17") {
      // Trigger Sector 17 demo
      setIsDemo(true)
      setSearchResults([
        {
          type: "route",
          id: "sector17-elante",
          name: "Sector 17 → Elante Mall Express",
          stops: 6,
          duration: "18 mins",
          frequency: "Every 8 minutes",
          status: "live",
          occupancy: 68,
        },
      ])
      return true
    }

    setIsDemo(false)
    return false
  }, [])

  const resetDemo = useCallback(() => {
    setIsDemo(false)
    setSearchResults([])
  }, [])

  return {
    isDemo,
    searchResults,
    handleRouteSearch,
    resetDemo,
  }
}
