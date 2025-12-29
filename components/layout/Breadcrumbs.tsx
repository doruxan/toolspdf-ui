import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  category: string;
  toolName: string;
  categoryHref?: string;
  currentHref?: string;
}

function guessCategoryHref(category: string): string {
  const normalized = category.toLowerCase();
  if (normalized.includes('pdf')) return '/pdf-tools';
  if (normalized.includes('json')) return '/json-tools';
  if (normalized.includes('iban')) return '/iban-tools';
  if (normalized.includes('shopify') || normalized.includes('e-commerce') || normalized.includes('ecommerce')) {
    return '/shopify-tools';
  }
  return '/';
}

export default function Breadcrumbs({ category, toolName, categoryHref, currentHref }: BreadcrumbsProps) {
  const resolvedCategoryHref = categoryHref ?? guessCategoryHref(category);
  const resolvedCurrentHref = currentHref ?? '/';

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://rawtools.io',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category,
        item: `https://rawtools.io${resolvedCategoryHref}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: toolName,
        item: `https://rawtools.io${resolvedCurrentHref}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
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
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </li>
          <li>
            <Link href={resolvedCategoryHref} className="hover:text-primary transition-colors">
              {category}
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </li>
          <li className="font-semibold text-foreground" aria-current="page">
            {toolName}
          </li>
        </ol>
      </nav>
    </>
  );
}

