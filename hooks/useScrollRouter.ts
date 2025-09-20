"use client"

import { useState, useEffect, useCallback } from "react"

export interface ScrollRouterOptions {
  rootMargin?: string
  threshold?: number
  debounceMs?: number
}

export function useScrollRouter(sectionIds: string[], options: ScrollRouterOptions = {}) {
  const { rootMargin = "-20% 0px -60% 0px", threshold = 0.3, debounceMs = 100 } = options

  const [activeId, setActiveId] = useState<string>("#home")
  const [isScrolling, setIsScrolling] = useState(false)

  // Navigate to section with smooth scroll
  const navigateTo = useCallback((id: string) => {
    const element = document.querySelector(id)
    if (!element) {
      console.warn("Section not found:", id)
      return
    }

    setIsScrolling(true)
    setActiveId(id)

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

    // Update URL hash
    window.history.replaceState(null, "", id)

    setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }, [])

  // Debounce function
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }
  }, [])

  // Set up intersection observer for scroll spy
  useEffect(() => {
    const debouncedSetActiveId = debounce((id: string) => {
      if (!isScrolling) {
        setActiveId(id)
        // Update URL hash for manual scrolling
        window.history.replaceState(null, "", id)
      }
    }, debounceMs)

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = { entry: null as IntersectionObserverEntry | null, ratio: 0 }

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > mostVisible.ratio) {
            mostVisible = { entry, ratio: entry.intersectionRatio }
          }
        })

        if (mostVisible.entry) {
          debouncedSetActiveId(`#${mostVisible.entry.target.id}`)
        }
      },
      {
        rootMargin,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      },
    )

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id.slice(1))
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [sectionIds, rootMargin, threshold, debounceMs, debounce, isScrolling])

  // Sync hash with active section and handle initial load
  useEffect(() => {
    // Handle initial hash on page load
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash && sectionIds.includes(hash)) {
        setActiveId(hash)
        // Auto-scroll to section if hash exists
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    }

    // Check initial hash
    handleHashChange()

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [sectionIds])

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      // Clear any existing timeout
      clearTimeout(scrollTimeout)

      // Set a timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return {
    activeId,
    navigateTo,
  }
}
