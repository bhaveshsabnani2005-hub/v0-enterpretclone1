"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Bus, Navigation, Clock, Users } from "lucide-react"
import ChandigarhLocationSearch from "@/components/search/ChandigarhLocationSearch"

interface EmptyDashboardStateProps {
  onLocationSelect: (location: any) => void
}

export default function EmptyDashboardState({ onLocationSelect }: EmptyDashboardStateProps) {
  const popularLocations = [
    { name: "Sector 17", query: "sector 17", icon: "🏢" },
    { name: "Elante Mall", query: "elante", icon: "🏬" },
    { name: "PGI Hospital", query: "pgi", icon: "🏥" },
  ]

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8 max-w-2xl">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center">
            <Bus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Discover Chandigarh's Transit Network</h1>
          <p className="text-gray-400 text-lg">
            Search for any location to view real-time bus information, routes, and arrival times
          </p>
        </div>

        <div className="mb-8">
          <ChandigarhLocationSearch onLocationSelect={onLocationSelect} className="mx-auto" />
        </div>

        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-3">Quick access to popular locations:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularLocations.map((location) => (
              <Button
                key={location.query}
                variant="outline"
                onClick={() => {
                  // Simulate location selection for popular locations
                  const mockLocation = {
                    id: location.query.replace(" ", "-"),
                    title: location.name,
                    type: "landmark",
                    coordinates: { lat: 30.7333, lng: 76.7794 },
                    routes: ["R1", "R2", "R3"],
                  }
                  onLocationSelect(mockLocation)
                }}
                className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:text-white"
              >
                <span className="mr-2">{location.icon}</span>
                {location.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl w-full mb-8">
        <Card className="bg-gray-800/30 border-gray-700/50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Navigation className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-medium text-white mb-2">Live Tracking</h3>
            <p className="text-sm text-gray-400">Real-time bus locations and movement</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/30 border-gray-700/50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-medium text-white mb-2">Arrival Times</h3>
            <p className="text-sm text-gray-400">Accurate ETA predictions</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/30 border-gray-700/50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-medium text-white mb-2">Route Planning</h3>
            <p className="text-sm text-gray-400">Optimal journey suggestions</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/30 border-gray-700/50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="font-medium text-white mb-2">Crowd Levels</h3>
            <p className="text-sm text-gray-400">Bus occupancy information</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-sm">Start exploring by searching for a location above</p>
      </div>
    </div>
  )
}
