export function CompanyLogos() {
  const companies = [
    "Canva",
    "STRAVA",
    "perplexity",
    "Notion",
    "Hinge",
    "Fanatics",
    "nextdoor",
    "bitvavo",
    "ATLASSIAN",
    "Robot",
    "Webflow",
    "Quizlet",
    "monday.com",
    "Linear",
    "The Farmer's Dog",
  ]

  return (
    <section className="py-16 px-4 bg-card/50">
      <div className="container mx-auto">
        <p className="text-center text-muted-foreground mb-12">Redefining how the best companies build with feedback</p>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
