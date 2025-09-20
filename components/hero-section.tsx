"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Search } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const router = useRouter()

  const handleFindMyBus = () => {
    router.push("/dashboard")
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance text-gray-900 leading-tight">
              Track your bus in real-time.
              <br />
              <span className="text-blue-800">Save time, travel smart.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-pretty">
              Get live updates on bus locations, arrival times, and route changes. Never miss your ride again.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
              <Button
                size="lg"
                onClick={handleFindMyBus}
                className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold flex-1 transition-all duration-200 hover:scale-105 text-sm sm:text-base py-3 sm:py-4 relative overflow-hidden group"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <Search className="h-4 w-4 mr-2" />
                Find My Bus
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white flex-1 transition-all duration-200 bg-transparent text-sm sm:text-base py-3 sm:py-4"
              >
                <MapPin className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">View Nearby Stops</span>
                <span className="sm:hidden">Nearby Stops</span>
              </Button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/ontimebharat-bus.png"
                alt="OnTimeBharat green bus at modern bus stop with digital QR code display and passengers waiting"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
