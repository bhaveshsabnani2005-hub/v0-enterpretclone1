"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Car, Leaf, Users, CheckCircle } from "lucide-react"

export default function ImpactBannerSection() {
  const [hoursSaved, setHoursSaved] = useState(0)
  const [carsAvoided, setCarsAvoided] = useState(0)
  const [carbonReduced, setCarbonReduced] = useState(0)
  const [progressWidth, setProgressWidth] = useState(0)

  useEffect(() => {
    // Animate counters on load
    const animateCounter = (setter: (value: number) => void, target: number, duration = 2000) => {
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(Math.floor(start))
        }
      }, 16)
    }

    const timer = setTimeout(() => {
      animateCounter(setHoursSaved, 512)
      animateCounter(setCarsAvoided, 220)
      animateCounter(setCarbonReduced, 1.2)
      animateCounter(setProgressWidth, 85)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="bg-black text-white py-8 sm:py-12 lg:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 animate-fade-in-left">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-balance animate-text-shimmer">
                Together, Every Ride Counts
              </h2>
              <p className="text-sm sm:text-lg lg:text-xl text-gray-300 text-pretty animate-fade-in-up animation-delay-300">
                Tracking buses reduces wait times and cuts pollution. Together, we save 500+ hours every day in our
                city.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3 animate-slide-in-left animation-delay-400">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400 mt-1 flex-shrink-0 animate-bounce-slow" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-green-400">
                    Less Waiting, More Living
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-300">
                    By knowing exactly when your bus arrives, you avoid long, frustrating waits at the stop.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 animate-slide-in-left animation-delay-600">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400 mt-1 flex-shrink-0 animate-sway" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-green-400">
                    Cleaner Air, Healthier City
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-300">
                    Every tracked bus means fewer wasted car trips. It's like taking dozens of cars off the road every
                    single day.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 animate-slide-in-left animation-delay-800">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400 mt-1 flex-shrink-0 animate-pulse" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-blue-400">See the Impact Live</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-300">
                    A friendly counter shows how many hours we've saved today, and how much pollution we've prevented.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-3 sm:p-4 rounded-lg border border-green-500/20 animate-glow">
              <p className="text-green-400 font-medium text-xs sm:text-sm lg:text-base">
                👉 Each person who uses it makes the city greener and smoother. So yes, your clicks really do change the
                world — one bus ride at a time.
              </p>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 animate-fade-in-right">
            {/* Live Counters */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-3 sm:p-4 lg:p-6 rounded-2xl border border-blue-500/30 text-center animate-scale-in animation-delay-200 hover:scale-105 transition-transform duration-300">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400 mx-auto mb-2 sm:mb-3 animate-spin-slow" />
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-1 animate-number-count">
                  {hoursSaved}
                </div>
                <div className="text-xs sm:text-sm text-gray-300">Hours Saved Today</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-3 sm:p-4 lg:p-6 rounded-2xl border border-yellow-500/30 text-center animate-scale-in animation-delay-400 hover:scale-105 transition-transform duration-300">
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mx-auto mb-2 sm:mb-3">
                  <Car className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-400 animate-shake" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full flex items-center justify-center animate-ping">
                    <span className="text-xs text-white font-bold">✕</span>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400 mb-1 animate-number-count">
                  {carsAvoided}
                </div>
                <div className="text-xs sm:text-sm text-gray-300">Car Trips Avoided</div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 sm:p-4 lg:p-6 rounded-2xl border border-green-500/30 text-center animate-scale-in animation-delay-600 hover:scale-105 transition-transform duration-300">
                <Leaf className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-400 mx-auto mb-2 sm:mb-3 animate-float" />
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400 mb-1 animate-number-count">
                  {carbonReduced.toFixed(1)}
                </div>
                <div className="text-xs sm:text-sm text-gray-300">Tons CO₂ Reduced</div>
              </div>
            </div>

            {/* Progress Visualization */}
            <div className="bg-gray-900/50 p-4 sm:p-6 rounded-2xl border border-gray-700 animate-slide-up animation-delay-800">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">Today's Impact</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span className="text-gray-300">Daily Goal Progress</span>
                    <span className="text-blue-400">{progressWidth}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 sm:h-3 rounded-full transition-all duration-2000 ease-out animate-shimmer"
                      style={{ width: `${progressWidth}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center text-xs sm:text-sm text-gray-400 animate-bounce-slow">
                  🌱 We're on track to save 600+ hours today!
                </div>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="text-center animate-fade-in-up animation-delay-1000">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
              >
                <span className="hidden sm:inline">Join the Smarter Commute 👉</span>
                <span className="sm:hidden">Join Now 👉</span>
              </Button>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 sm:mt-3">
                Start tracking buses and make a difference today
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.8); }
        }
        @keyframes number-count {
          from { transform: scale(1.2); opacity: 0.7; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-text-shimmer {
          background: linear-gradient(90deg, #ffffff, #60a5fa, #34d399, #ffffff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shimmer 3s linear infinite;
        }
        .animate-fade-in-left { animation: fade-in-left 0.8s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-sway { animation: sway 3s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-shimmer { background-size: 200% auto; animation: shimmer 2s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-number-count { animation: number-count 0.5s ease-out; }
        
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        .duration-2000 { transition-duration: 2000ms; }
      `}</style>
    </section>
  )
}
