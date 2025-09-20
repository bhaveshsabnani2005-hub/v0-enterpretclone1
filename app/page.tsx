import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import LocationSearchSection from "@/components/location-search-section"
import LiveTrackingSection from "@/components/live-tracking-section"
import FavoritesHistorySection from "@/components/favorites-history-section"
import ImpactBannerSection from "@/components/impact-banner-section"
import ImpactSection from "@/components/impact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <LocationSearchSection />
      <LiveTrackingSection />
      <FavoritesHistorySection />
      <ImpactBannerSection />
      <ImpactSection />
      <Footer />
    </main>
  )
}
