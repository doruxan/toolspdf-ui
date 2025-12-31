import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import ClientSearch from '@/components/home/ClientSearch';
import StructuredData from '@/components/seo/StructuredData';
import { toolCategories } from '@/config/tools';
import { Shield, Zap, Lock } from 'lucide-react';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const pageMetadata: Metadata = {
  title: 'RawTools - Free PDF, JSON, IBAN & Shopify Tools',
  description:
    '40 free online tools: 16 PDF tools, 9 JSON tools (CSV/Excel converters, formatter, validator), 7 IBAN tools, 8 Shopify calculators. Browser-based, private, and fast.',
  openGraph: {
    title: 'RawTools - Free PDF, JSON, IBAN & Shopify Tools',
    description:
      'Free online tools that run in your browser: PDF tools, JSON converters, IBAN tools, and Shopify calculators. Fast, private, and easy to use.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RawTools - Free PDF, JSON, IBAN & Shopify Tools',
    description:
      '40 free tools: PDFs, JSON converters, IBAN tools, Shopify calculators. Browser-based, private, no signup.',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io');
}

export default function Home() {
  const pdfCount = toolCategories.find((c) => c.id === 'pdf-tools')?.tools.length ?? 0;
  const jsonCount = toolCategories.find((c) => c.id === 'json-tools')?.tools.length ?? 0;
  const ibanCount = toolCategories.find((c) => c.id === 'iban-tools')?.tools.length ?? 0;
  const ecommerceCount = toolCategories.find((c) => c.id === 'ecommerce-tools')?.tools.length ?? 0;

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

      {/* Category Showcase */}
      <div className="pt-8 pb-12">
        <CategoryShowcase />
      </div>

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
                We currently offer {pdfCount} PDF tools (merge, split, compress, convert, etc.),{' '}
                {jsonCount} JSON tools (CSV/Excel converters, formatter, minifier, schema validator, etc.),{' '}
                {ibanCount} IBAN tools (validator, generator, parser, batch validator, etc.), and{' '}
                {ecommerceCount} Shopify calculators (profit, fees, LTV/CAC, break-even ROAS, etc.).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
