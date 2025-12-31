import Link from 'next/link';
import { ChevronRight, Home, ChevronDown } from 'lucide-react';
import { ToolCategory } from '@/config/tools';
import ToolCard from '@/components/home/ToolCard';
import StructuredData from '@/components/seo/StructuredData';
import { generateCollectionPageSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo/schemas';

interface CategoryPageLayoutProps {
  category: ToolCategory;
}

export default function CategoryPageLayout({ category }: CategoryPageLayoutProps) {
  // Generate Schemas
  const collectionSchema = generateCollectionPageSchema({
    name: category.name,
    description: category.description,
    url: `https://rawtools.io/${category.id}`,
    items: category.tools.map((tool) => ({
      name: tool.title,
      description: tool.description,
      url: `https://rawtools.io${tool.href}`,
    })),
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: category.name, url: `/${category.id}` }
  ]);

  const faqSchema = category.faqs ? generateFAQSchema(category.faqs) : null;

  return (
    <div className="w-full">
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-24 text-center">
          {/* Visual Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex justify-center mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 px-4 py-2 rounded-full border border-border">
              <li>
                <Link
                  href="/"
                  className="flex items-center hover:text-primary transition-colors"
                  aria-label="Go to homepage"
                >
                  <Home className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
              </li>
              <li className="font-semibold text-foreground" aria-current="page">
                {category.name}
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            {category.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
        {/* Tool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {category.tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>

        {/* SEO Content & FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border pt-16">
          
          {/* Left: SEO Text */}
          <div className="lg:col-span-7 prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
            <h2>Why Use Our {category.name}?</h2>
            <p>
              Our collection of <strong>{category.name}</strong> is designed for speed, privacy, and ease of use. 
              Whether you need to process files or calculate complex metrics, our tools run entirely in your browser.
            </p>
            <ul>
              <li><strong>100% Free:</strong> No limits, no signups, no hidden costs.</li>
              <li><strong>Private:</strong> Files never leave your device (client-side processing).</li>
              <li><strong>Fast:</strong> Instant results without waiting for uploads/downloads.</li>
            </ul>
            <p>
              We are constantly adding new tools to this collection. If you have a specific request, 
              feel free to reach out.
            </p>
          </div>

          {/* Right: FAQ */}
          {category.faqs && (
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {category.faqs.map((faq, index) => (
                  <div key={index} className="border border-border rounded-lg bg-background overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                        <span className="font-medium text-foreground pr-4">{faq.question}</span>
                        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-4 pb-4 text-muted-foreground border-t border-border/50 pt-4">
                        {faq.answer}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

