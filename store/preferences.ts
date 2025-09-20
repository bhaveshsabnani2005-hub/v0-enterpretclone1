import { create } from "zustand"
import { persist } from "zustand/middleware"

interface PreferencesState {
  theme: "dark" | "light"
  contrast: "normal" | "high"
  lowBandwidth: boolean
  refreshInterval: number
  mapStyle: "dark" | "light"
  notifications: {
    arrivals: boolean
    delays: boolean
    routeChanges: boolean
  }
  defaultCity: string
  favoriteStops: string[]

  // Actions
  setTheme: (theme: "dark" | "light") => void
  setContrast: (contrast: "normal" | "high") => void
  setLowBandwidth: (enabled: boolean) => void
  setRefreshInterval: (interval: number) => void
  setMapStyle: (style: "dark" | "light") => void
  updateNotifications: (notifications: Partial<PreferencesState["notifications"]>) => void
  setDefaultCity: (city: string) => void
  addFavoriteStop: (stopId: string) => void
  removeFavoriteStop: (stopId: string) => void
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      contrast: "normal",
      lowBandwidth: false,
      refreshInterval: 15,
      mapStyle: "dark",
      notifications: {
        arrivals: true,
        delays: true,
        routeChanges: false,
      },
      defaultCity: "Chandigarh",
      favoriteStops: [],

      setTheme: (theme) => set({ theme }),
      setContrast: (contrast) => set({ contrast }),
      setLowBandwidth: (lowBandwidth) => set({ lowBandwidth }),
      setRefreshInterval: (refreshInterval) => set({ refreshInterval }),
      setMapStyle: (mapStyle) => set({ mapStyle }),
      updateNotifications: (notifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications },
        })),
      setDefaultCity: (defaultCity) => set({ defaultCity }),
      addFavoriteStop: (stopId) =>
        set((state) => ({
          favoriteStops: [...state.favoriteStops, stopId],
        })),
      removeFavoriteStop: (stopId) =>
        set((state) => ({
          favoriteStops: state.favoriteStops.filter((id) => id !== stopId),
        })),
    }),
    {
      name: "ontimebharat-preferences",
    },
  ),
)
