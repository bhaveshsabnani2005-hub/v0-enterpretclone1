import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <blockquote className="text-lg mb-6">
                "Wisdom saves me hours every week. I can condense feedback with a single click, replacing the tedious
                process of reading through hundreds of tickets. It's life-changing!"
              </blockquote>
              <div>
                <p className="font-semibold">Jill McKinney</p>
                <p className="text-sm text-muted-foreground">Director of Customer Support</p>
                <p className="text-sm text-primary font-medium mt-1">descript</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <blockquote className="text-lg mb-6">
                "Enterpret is one of the most powerful tools in our toolkit. It's very Member-friendly. We've been able
                to share how other teams can modify and self-serve in Enterpret. It's bridged a gap to getting access to
                Member feedback."
              </blockquote>
              <div>
                <p className="font-semibold">Dina Mohammad-Laity</p>
                <p className="text-sm text-muted-foreground">VP of Data</p>
                <p className="text-sm text-primary font-medium mt-1">FEELD</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
