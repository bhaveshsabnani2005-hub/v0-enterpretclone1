import { Star, Bus, MapPin, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FavoritesHistorySection() {
  const favoriteRoutes = [
    { id: 1, name: "Home ↔ Work Commute", icon: Bus, saved: true },
    { id: 2, name: "College ↔ Railway Station", icon: MapPin, saved: true },
    { id: 3, name: "Market Road Stop", icon: Bus, saved: true },
  ]

  const recentHistory = [
    { id: 1, route: "Market Road Stop", detail: "Bus 12, Arrives in 5 min", time: "2 hours ago" },
    { id: 2, route: "Bus 21", detail: "Central Market", time: "1 day ago" },
    { id: 3, route: "Railway Station", detail: "Bus 15, 18, 22", time: "2 days ago" },
    { id: 4, route: "College Gate", detail: "Bus 9, Arrives in 12 min", time: "3 days ago" },
  ]

  return (
    <section className="bg-black text-white py-8 sm:py-12 lg:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side - Feature descriptions */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 text-balance">
                Favorites & History
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 text-pretty">
                Instantly access your most-used routes and recently searched stops.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-white">My Saved Routes</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-200 text-pretty">
                    Mark your daily trips (like Home ↔ Work or College ↔ Railway Station) as favorites. These will
                    always appear at the top of your page for quick access.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-white">Recent History</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-200 text-pretty">
                    Even if you forget to save, the site automatically shows your recently searched stops and routes, so
                    you can return to them with one click.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Interactive elements */}
          <div className="space-y-6 sm:space-y-8">
            {/* Favorites Section */}
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white truncate">My Favorites</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-500 text-gray-200 hover:bg-gray-800 hover:text-white bg-transparent text-xs px-2 py-1 flex-shrink-0"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  <span className="hidden xs:inline">Save</span>
                  <span className="xs:hidden">+</span>
                </Button>
              </div>

              <div className="flex flex-col md:flex-row gap-2 sm:gap-3 lg:gap-4 md:overflow-x-auto pb-4 scrollbar-hide">
                {favoriteRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-2 sm:p-3 lg:p-4 w-full md:min-w-[160px] lg:min-w-[200px] cursor-pointer hover:from-blue-500 hover:to-blue-600 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <route.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400 fill-current" />
                    </div>
                    <h4 className="font-semibold text-white text-xs sm:text-sm leading-tight">{route.name}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent History Section */}
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 text-white">Recent History</h3>
              <div className="space-y-2 sm:space-y-3 max-w-sm md:max-w-none">
                {recentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-900 rounded-lg p-2 sm:p-3 lg:p-4 cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Bus className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-medium text-white truncate text-xs sm:text-sm lg:text-base">
                            {item.route}
                          </h4>
                          <span className="text-xs text-gray-500 flex-shrink-0">{item.time}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 truncate">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
