import { Button } from "@/components/ui/button"
import { Bus, Clock, Wifi, Leaf } from "lucide-react"

export default function ImpactSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
            Making public transport reliable for every city
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto text-balance">
            A smarter way to connect commuters and buses in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto mb-8 sm:mb-12">
          {/* Live Tracking Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-in slide-in-from-left-6 duration-700 delay-200 border border-blue-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:rotate-12 transition-transform duration-300 group shadow-lg">
              <Bus className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Live Tracking</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Real-time bus locations and accurate arrival predictions for better journey planning.
            </p>
          </div>

          {/* Crowd Status Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-in slide-in-from-right-6 duration-700 delay-300 border border-green-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:rotate-12 transition-transform duration-300 group shadow-lg">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300 animate-pulse" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Crowd Status</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Know how crowded buses are before boarding for a more comfortable commute.
            </p>
          </div>

          {/* Smart Routes Card */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-in slide-in-from-left-6 duration-700 delay-400 border border-purple-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:rotate-12 transition-transform duration-300 group shadow-lg">
              <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300 animate-bounce" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Smart Routes</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Optimized route suggestions based on traffic conditions and bus availability.
            </p>
          </div>

          {/* Sustainable Cities Card */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-in slide-in-from-right-6 duration-700 delay-500 border border-orange-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:rotate-12 transition-transform duration-300 group shadow-lg">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300 hover:text-green-300" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Sustainable Cities</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Promoting eco-friendly transport choices for cleaner, healthier urban environments.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
          <p className="text-base sm:text-lg text-gray-800 bg-gray-100 rounded-lg p-4 mb-6 sm:mb-8 max-w-2xl mx-auto">
            It's more than a website. It's a step towards better daily life and a cleaner future — powered by buses,
            powered by you.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 animate-pulse"
          >
            Explore How It Works →
          </Button>
        </div>
      </div>
    </section>
  )
}
