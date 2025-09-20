import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plug } from "lucide-react"

export function Integrations() {
  const integrations = [
    "Salesforce",
    "Gong",
    "Zendesk",
    "Intercom",
    "Slack",
    "Jira",
    "HubSpot",
    "Amplitude",
    "Mixpanel",
    "Segment",
  ]

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Plug className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-3xl">INTEGRATIONS</CardTitle>
            </div>
            <h2 className="text-4xl font-bold mb-4">Integrate with all feedback channels</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enterpret connects to your existing channels, and more with our CSV importer and API.
            </p>
          </CardHeader>

          <CardContent className="pt-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg p-4 text-center border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="text-sm font-medium">{integration}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button className="bg-primary hover:bg-primary/90">
                Integrations <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
