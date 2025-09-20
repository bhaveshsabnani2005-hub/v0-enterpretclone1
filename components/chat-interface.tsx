import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Sparkles } from "lucide-react"

export function ChatInterface() {
  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Hey Elly</CardTitle>
            </div>
            <p className="text-muted-foreground">What do you want to know about your customers' feedback?</p>
          </CardHeader>

          <CardContent>
            <div className="space-y-4 mb-6">
              <Button variant="outline" className="w-full justify-start text-left h-auto p-4 bg-transparent">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                Suggested Prompts
              </Button>
              <Button variant="outline" className="w-full justify-start text-left h-auto p-4 bg-transparent">
                Go to Prompt Library
              </Button>
            </div>

            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-primary/20 px-2 py-1 rounded text-xs font-medium text-primary">COPILOT</div>
              </div>
              <h3 className="font-semibold mb-2">Chat your way to instant insights</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
