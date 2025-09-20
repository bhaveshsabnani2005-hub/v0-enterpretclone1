"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState("EN")
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const languages = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "HI", name: "हिंदी" },
  ]

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Row 1: Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6">
          <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <span className="text-sm">📖</span>
            <span>About Us</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <span className="text-sm">📞</span>
            <span>Contact Us</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <span className="text-sm">❓</span>
            <span>FAQ</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors font-medium">
            <span className="text-sm">🔒</span>
            <span>Terms & Privacy</span>
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Row 2: Social Media */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">in</span>
            </div>
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-pink-400 transition-colors" aria-label="Instagram">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center">
              <span className="text-white text-sm">📷</span>
            </div>
            <span className="hidden sm:inline">Instagram</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-red-400 transition-colors" aria-label="YouTube">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white text-sm">▶</span>
            </div>
            <span className="hidden sm:inline">YouTube</span>
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Row 3: Language Toggle & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Language Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <span className="text-sm">🌐</span>
              <span>{selectedLanguage}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageOpen ? "rotate-180" : ""}`} />
            </button>

            {isLanguageOpen && (
              <div className="absolute bottom-full left-0 mb-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg min-w-[120px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code)
                      setIsLanguageOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    <span className="text-sm">{lang.code}</span>
                    <span className="text-xs text-gray-400 ml-2">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">© 2024 TrackMyBus. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
