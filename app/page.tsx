import Hero from '@/components/home/Hero';
import ToolsSection from '@/components/home/ToolsSection';
import ClientSearch from '@/components/home/ClientSearch';
import StructuredData from '@/components/seo/StructuredData';
import { toolCategories } from '@/config/tools';
import { Shield, Zap, Lock } from 'lucide-react';

export default function Home() {
  // Collection Page Schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'RawTools - Free Online Tools',
    description:
      'Free online tools that run in your browser: PDF tools (merge, split, compress), JSON tools (CSV/Excel converters, formatter, validator), IBAN validation/parsing, and e-commerce calculators. Fast, private, and easy to use.',
    url: 'https://rawtools.io',
    hasPart: toolCategories.flatMap((category) =>
      category.tools.map((tool) => ({
        '@type': 'WebPage',
        name: tool.title,
        description: tool.description,
        url: `https://rawtools.io${tool.href}`,
      }))
    ),
  };

  return (
    <div className="w-full">
      <StructuredData data={collectionSchema} />

      {/* Hero Section */}
      <Hero />

      {/* Client Search Component */}
      <ClientSearch />

      {/* All Categories */}
      {toolCategories.map((category, index) => (
        <div key={category.id}>
          <ToolsSection category={category} />
          {index < toolCategories.length - 1 && (
            <div className="border-t-2 border-border mx-auto max-w-7xl" />
          )}
        </div>
      ))}

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-muted/10 border-y-2 border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose RawTools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">100% Secure & Private</h3>
              <p className="text-muted-foreground">
                All processing happens in your browser. Your files never leave your device, ensuring
                complete privacy and security.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Lightning Fast</h3>
              <p className="text-muted-foreground">
                No uploads or downloads to servers. Process files and calculate metrics instantly
                with optimized client-side technology.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Completely Free</h3>
              <p className="text-muted-foreground">
                No hidden fees, no subscriptions, no limits. All tools are 100% free to use,
                forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-2 border-border rounded-xl p-6 bg-background hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Are these tools really free?
              </h3>
              <p className="text-muted-foreground">
                Yes! All our tools are completely free to use with no hidden charges, subscriptions,
                or file size limits.
              </p>
            </div>
            <div className="border-2 border-border rounded-xl p-6 bg-background hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Is it safe to use online tools?
              </h3>
              <p className="text-muted-foreground">
                Absolutely! All processing happens directly in your browser. Your files never get
                uploaded to any server, ensuring complete privacy and security.
              </p>
            </div>
            <div className="border-2 border-border rounded-xl p-6 bg-background hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Do I need to create an account?
              </h3>
              <p className="text-muted-foreground">
                No account needed! Simply select a tool and start using it immediately. No
                registration, no email required.
              </p>
            </div>
            <div className="border-2 border-border rounded-xl p-6 bg-background hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-foreground mb-2">
                What tools are available?
              </h3>
              <p className="text-muted-foreground">
                We offer 16 PDF tools (merge, split, compress, convert, etc.), 8 Shopify
                calculators (profit, fees, LTV/CAC, etc.), and 7 IBAN tools (validator, generator, parser, etc.). All tools are professional-grade and
                constantly updated.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
