import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-balance">Ready to turn intelligence into intuition?</h2>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Get Started
        </Button>
      </div>
    </section>
  )
}
