"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Type, Keyboard, Volume2, MousePointer, Globe } from "lucide-react"
import { usePreferences } from "@/store/preferences"
import { useState } from "react"

export function AccessibilityPanel() {
  const { contrast, setContrast, lowBandwidth, setLowBandwidth } = usePreferences()
  const [selectedLanguage, setSelectedLanguage] = useState("english")

  const toggleHighContrast = () => {
    const newContrast = contrast === "high" ? "normal" : "high"
    setContrast(newContrast)

    // Apply high contrast styles to document
    if (newContrast === "high") {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  const toggleLargeText = () => {
    const currentSize = document.documentElement.style.fontSize
    if (currentSize === "120%") {
      document.documentElement.style.fontSize = "100%"
    } else {
      document.documentElement.style.fontSize = "120%"
    }
  }

  const enableKeyboardMode = () => {
    document.documentElement.classList.add("keyboard-navigation")
    // Focus on first interactive element
    const firstButton = document.querySelector("button") as HTMLElement
    firstButton?.focus()
  }

  const announceForScreenReader = (message: string) => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = message
    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    announceForScreenReader(`Language changed to ${language}`)
    // Here you would typically integrate with your i18n system
    console.log(`Language changed to: ${language}`)
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Eye className="h-4 w-4 text-blue-400" />
          Accessibility
          <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">
            A11Y
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-white">Language</span>
          </div>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="english" className="text-white hover:bg-gray-600">
                English
              </SelectItem>
              <SelectItem value="hindi" className="text-white hover:bg-gray-600">
                हिंदी
              </SelectItem>
              <SelectItem value="punjabi" className="text-white hover:bg-gray-600">
                ਪੰਜਾਬੀ
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-white">High Contrast</span>
          </div>
          <Switch checked={contrast === "high"} onCheckedChange={toggleHighContrast} />
        </div>

        {/* Large Text */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-white">Large Text</span>
          </div>
          <Button size="sm" variant="outline" onClick={toggleLargeText}>
            Toggle
          </Button>
        </div>

        {/* Keyboard Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-white">Keyboard Mode</span>
          </div>
          <Button size="sm" variant="outline" onClick={enableKeyboardMode}>
            Enable
          </Button>
        </div>

        {/* Low Bandwidth Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MousePointer className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-white">Low Bandwidth</span>
          </div>
          <Switch checked={lowBandwidth} onCheckedChange={setLowBandwidth} />
        </div>

        {/* Screen Reader Tips */}
        <div className="pt-2 border-t border-gray-700">
          <h4 className="text-xs font-medium text-gray-300 mb-2">Screen Reader Tips</h4>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex items-start gap-2">
              <Volume2 className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>Use Tab to navigate between interactive elements</span>
            </div>
            <div className="flex items-start gap-2">
              <Volume2 className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>Press Space or Enter to activate buttons</span>
            </div>
            <div className="flex items-start gap-2">
              <Volume2 className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>Use arrow keys to navigate search results</span>
            </div>
          </div>
        </div>

        {/* Test Announcement */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => announceForScreenReader("Accessibility features are working correctly")}
          className="w-full"
        >
          <Volume2 className="h-3 w-3 mr-2" />
          Test Screen Reader
        </Button>
      </CardContent>
    </Card>
  )
}
