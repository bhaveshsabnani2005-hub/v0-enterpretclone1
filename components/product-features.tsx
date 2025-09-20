import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, MessageSquare, Zap } from "lucide-react"

export function ProductFeatures() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How Enterpret connects customers to builders</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Auto-generate Dashboards</h3>
              </div>
              <p className="text-muted-foreground">
                Automatically create comprehensive dashboards from your feedback data
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Send feedback summaries to Slack</h3>
              </div>
              <p className="text-muted-foreground">Keep your team informed with automated feedback summaries</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Automate closing the loop</h3>
              </div>
              <p className="text-muted-foreground">Automatically follow up with customers based on their feedback</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-lg p-8 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Every voice, heard</h3>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">660,090</p>
              <p className="text-sm text-muted-foreground">Feedback Records</p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-6">
            Consolidate and organize customer feedback across all channels - fast.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">231K</p>
              <p className="text-sm text-muted-foreground">World Peace</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">290K</p>
              <p className="text-sm text-muted-foreground">Gong</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">30K</p>
              <p className="text-sm text-muted-foreground">Enterprise Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">88</p>
              <p className="text-sm text-muted-foreground">Integrations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
