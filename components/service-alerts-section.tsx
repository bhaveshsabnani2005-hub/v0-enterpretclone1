"use client"

import { Bell, AlertTriangle, Construction, X, ChevronDown } from "lucide-react"
import { useState } from "react"

export default function ServiceAlertsSection() {
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null)

  const alerts = [
    {
      id: 1,
      route: "Route 5",
      type: "delay",
      icon: AlertTriangle,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      borderColor: "border-yellow-500",
      title: "Delayed due to traffic jam",
      details:
        "Expected delay of 15-20 minutes due to heavy traffic on Main Street. Alternative routes available via Route 12 or Route 18.",
      time: "2 min ago",
    },
    {
      id: 2,
      route: "Route 8",
      type: "diversion",
      icon: Construction,
      color: "bg-orange-500",
      textColor: "text-orange-500",
      borderColor: "border-orange-500",
      title: "Diverted near City Hospital for parade",
      details:
        "Route temporarily diverted via Park Avenue due to city parade. Normal service will resume at 6:00 PM. Add 10 minutes to your journey time.",
      time: "5 min ago",
    },
    {
      id: 3,
      route: "Route 12",
      type: "cancelled",
      icon: X,
      color: "bg-red-500",
      textColor: "text-red-500",
      borderColor: "border-red-500",
      title: "Service cancelled due to breakdown",
      details:
        "Bus service temporarily suspended due to mechanical issues. Next available service on Route 15 in 20 minutes. Refunds available for affected passengers.",
      time: "8 min ago",
    },
  ]

  const tickerMessages = [
    "🚦 Route 5 delayed due to traffic jam",
    "🚧 Route 8 diverted near City Hospital for parade",
    "❌ Route 12 service cancelled due to breakdown",
    "⚠️ Route 3 running 10 minutes behind schedule",
  ]

  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bell className="w-8 h-8 text-blue-400 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-bold text-balance animate-fade-in-up">Service Updates & Alerts</h2>
          </div>
          <p className="text-xl text-gray-300 text-pretty animate-fade-in-up animation-delay-200">
            Stay informed instantly about delays, diversions, and service changes
          </p>
        </div>

        {/* Ticker */}
        <div className="mb-12 bg-gray-900 rounded-lg p-4 overflow-hidden animate-slide-in-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-400">LIVE UPDATES</span>
          </div>
          <div className="overflow-hidden">
            <div className="animate-scroll whitespace-nowrap text-lg">
              {tickerMessages.join(" | ")} | {tickerMessages.join(" | ")}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interactive Elements - Left Side */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 animate-fade-in-left">Current Alerts</h3>

            {alerts.map((alert, index) => {
              const IconComponent = alert.icon
              const isExpanded = expandedAlert === alert.id

              return (
                <div
                  key={alert.id}
                  className={`bg-gray-900 rounded-xl p-6 border-l-4 ${alert.borderColor} transition-all duration-300 hover:bg-gray-800 cursor-pointer hover:scale-105 hover:shadow-lg animate-slide-in-left`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${alert.color} bg-opacity-20 animate-pulse-slow`}>
                        <IconComponent className={`w-6 h-6 ${alert.textColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold text-white">{alert.route}</span>
                          <span className="text-sm text-gray-400">{alert.time}</span>
                        </div>
                        <p className="text-lg text-gray-200 mb-2">{alert.title}</p>

                        {isExpanded && (
                          <div className="mt-4 p-4 bg-gray-800 rounded-lg animate-expand-down">
                            <p className="text-gray-300 leading-relaxed">{alert.details}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {!isExpanded && (
                    <div className="mt-3 text-sm text-blue-400 hover:text-blue-300 animate-pulse">
                      Tap for more details →
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Feature Descriptions - Right Side */}
          <div className="space-y-8 animate-fade-in-right">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Stay Informed Instantly</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                No more surprises on the road! Our alert system keeps you updated with important news about your bus
                routes in real-time.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 animate-slide-in-right animation-delay-200">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-white">Live Updates</h4>
                  <p className="text-gray-300 leading-relaxed">
                    If a bus is delayed, diverted, or cancelled, you'll see it right away with clear, color-coded
                    alerts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 animate-slide-in-right animation-delay-400">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Bell className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-white">Easy to Spot</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Messages appear in a clear ticker and expandable cards, so you never miss important updates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 animate-slide-in-right animation-delay-600">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <ChevronDown className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-white">Detailed Information</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Tap any alert to read full details including new timings, alternate routes, and disruption duration.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 animate-float">
              <p className="text-lg text-gray-200 leading-relaxed">
                <span className="text-blue-400 font-semibold">Smart Planning:</span> Plan your journey better by leaving
                earlier, choosing different routes, or avoiding long waits.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes expand-down {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 200px; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-scroll { animation: scroll 30s linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-left { animation: fade-in-left 0.8s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
        .animate-expand-down { animation: expand-down 0.3s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
      `}</style>
    </section>
  )
}
