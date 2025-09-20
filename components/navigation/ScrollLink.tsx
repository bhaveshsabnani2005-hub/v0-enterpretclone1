"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ScrollLinkProps {
  id: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  isCollapsed: boolean
  onClick: (id: string) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
}

export function ScrollLink({ id, icon, label, isActive, isCollapsed, onClick, onKeyDown }: ScrollLinkProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onClick(id)}
      onKeyDown={onKeyDown}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-slate-800 hover:scale-105 focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
        isActive && "bg-slate-800 text-lime-400 border-l-2 border-lime-400 shadow-lg shadow-lime-400/20",
        isCollapsed ? "justify-center px-2" : "justify-start",
        "text-slate-300 hover:text-slate-50",
      )}
      title={isCollapsed ? label : undefined}
    >
      <div
        className={cn(
          "h-5 w-5 flex-shrink-0 transition-all duration-200 ease-in-out",
          isActive && "text-lime-400 drop-shadow-sm",
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          "truncate text-sm font-medium transition-all duration-300 ease-in-out",
          isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100",
        )}
      >
        {label}
      </span>
    </Button>
  )
}
