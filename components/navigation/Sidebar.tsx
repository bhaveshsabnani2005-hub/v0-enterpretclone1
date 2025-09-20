"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { ScrollLink } from "./ScrollLink"
import { useScrollRouter } from "@/hooks/useScrollRouter"
import { Home, MapPin, Bus, Clock, AlertTriangle, Activity, Accessibility } from "lucide-react"

const navigationItems = [
  { id: "#home", label: "Home", icon: <Home className="h-5 w-5" /> },
  { id: "#live-map", label: "Live Bus Map", icon: <MapPin className="h-5 w-5" /> },
  { id: "#live-buses", label: "Live Buses", icon: <Bus className="h-5 w-5" /> },
  { id: "#stop-details", label: "Stop Details", icon: <Clock className="h-5 w-5" /> },
  { id: "#service-alerts", label: "Service Alerts", icon: <AlertTriangle className="h-5 w-5" /> },
  { id: "#system-status", label: "System Status", icon: <Activity className="h-5 w-5" /> },
  { id: "#accessibility", label: "Accessibility", icon: <Accessibility className="h-5 w-5" /> },
]

export function Sidebar() {
  const [isHovered, setIsHovered] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)

  const sectionIds = navigationItems.map((item) => item.id)
  const { activeId, navigateTo } = useScrollRouter(sectionIds)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          const prevIndex = index > 0 ? index - 1 : navigationItems.length - 1
          setFocusedIndex(prevIndex)
          const prevButton = document.querySelector(`[data-nav-index="${prevIndex}"]`) as HTMLButtonElement
          prevButton?.focus()
          break
        case "ArrowDown":
          e.preventDefault()
          const nextIndex = index < navigationItems.length - 1 ? index + 1 : 0
          setFocusedIndex(nextIndex)
          const nextButton = document.querySelector(`[data-nav-index="${nextIndex}"]`) as HTMLButtonElement
          nextButton?.focus()
          break
        case "Enter":
        case " ":
          e.preventDefault()
          navigateTo(navigationItems[index].id)
          break
      }
    },
    [navigateTo],
  )

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed left-0 top-0 h-full bg-slate-900 border-r border-slate-800 z-40 flex flex-col transition-all duration-500 ease-in-out ${
        isHovered ? "w-64" : "w-16"
      }`}
      style={{ backgroundColor: "#0B1220" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 border-b border-slate-800">
        <div
          className={`flex items-center transition-all duration-500 ease-in-out ${isHovered ? "gap-3" : "justify-center"}`}
        >
          <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
            <Bus className="h-5 w-5 text-slate-900" />
          </div>
          <span
            className={`font-bold text-lime-400 text-lg transition-all duration-500 ease-in-out ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 overflow-hidden"
            }`}
          >
            OnTime
          </span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-2">
        {navigationItems.map((item, index) => (
          <div key={item.id} data-nav-index={index} className="transition-all duration-300 ease-in-out">
            <ScrollLink
              id={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeId === item.id}
              isCollapsed={!isHovered}
              onClick={navigateTo}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          </div>
        ))}
      </div>
    </nav>
  )
}
