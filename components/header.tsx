"use client"

import { Button } from "@/components/ui/button"
import { Globe, Menu, Home, Star, Bell, HelpCircle, Bus, X, Navigation } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("EN")

  const navItems = [
    { name: "Home", icon: Home, href: "#home" },
    { name: "Favorites", icon: Star, href: "#favorites" },
    { name: "Alerts", icon: Bell, href: "#alerts" },
    { name: "FAQ/Support", icon: HelpCircle, href: "#support" },
  ]

  const languages = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "HI", name: "हिंदी" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 sm:h-18 py-2">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <Bus className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-800" />
            <span className="text-base sm:text-lg md:text-xl font-bold text-blue-800">OnTimeBharat</span>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <img
              src="/images/ontimebharat-bus.png"
              alt="OnTimeBharat Bus"
              className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 text-gray-800 hover:text-blue-800 transition-colors duration-200 font-medium py-2 px-2 ${
                  index === 0 ? "mr-4" : ""
                }`}
              >
                <item.icon
                  className={`h-4 w-4 ${
                    item.name === "Home"
                      ? "text-green-600"
                      : item.name === "Favorites"
                        ? "text-yellow-500"
                        : item.name === "Alerts"
                          ? "text-red-500"
                          : "text-purple-600"
                  }`}
                />
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-gray-800 hover:text-blue-800 hover:bg-gray-100 px-3 sm:px-4 py-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Globe className="h-4 w-4 text-blue-600" />
                {selectedLanguage}
              </Button>
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[120px] animate-in fade-in-0 zoom-in-95 duration-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-800 transition-colors duration-150"
                      onClick={() => {
                        setSelectedLanguage(lang.code)
                        setIsMenuOpen(false)
                      }}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              asChild
              variant="outline"
              className="hidden sm:flex border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 bg-transparent hover:scale-105 hover:shadow-md"
            >
              <Link href="/login">Sign In</Link>
            </Button>

            <Button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-2 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                <Navigation className="h-3 w-3 sm:h-4 sm:w-4 text-green-700" />
                <span className="hidden xs:inline">Track Now</span>
                <span className="xs:hidden">Track</span>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-lime-300/0 via-lime-200/50 to-lime-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-800 hover:text-blue-800 p-1.5 sm:p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 sm:py-6 bg-white animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-4 sm:gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 sm:gap-4 text-gray-800 hover:text-blue-800 transition-colors duration-200 font-medium py-2 sm:py-3 px-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      item.name === "Home"
                        ? "text-green-600"
                        : item.name === "Favorites"
                          ? "text-yellow-500"
                          : item.name === "Alerts"
                            ? "text-red-500"
                            : "text-purple-600"
                    }`}
                  />
                  {item.name}
                </a>
              ))}
              <div className="border-t border-gray-200 pt-4 sm:pt-6 mt-2 sm:mt-4">
                <div className="flex items-center gap-3 text-gray-800 mb-3 sm:mb-4">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Language</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`px-3 sm:px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedLanguage === lang.code
                          ? "bg-blue-800 text-white shadow-md"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105"
                      }`}
                      onClick={() => {
                        setSelectedLanguage(lang.code)
                        setIsMenuOpen(false)
                      }}
                    >
                      {lang.code}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="flex border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 mt-4 bg-transparent hover:scale-105 hover:shadow-md"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
