export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 md:py-24 border-b-2 border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              RawTools
            </span>{' '}
            - Free Online Tools
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Free online tools that run in your browser: PDF tools, JSON converters (CSV/Excel, formatter, validator), IBAN validators, and Shopify calculators. Fast, private, and easy to use.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border-2 border-border">
              <span className="text-2xl">🔒</span>
              <span className="text-sm font-medium text-foreground">100% Secure</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border-2 border-border">
              <span className="text-2xl">⚡</span>
              <span className="text-sm font-medium text-foreground">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border-2 border-border">
              <span className="text-2xl">🆓</span>
              <span className="text-sm font-medium text-foreground">Always Free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
