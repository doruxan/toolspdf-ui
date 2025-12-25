import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  category: string;
  toolName: string;
}

export default function Breadcrumbs({ category, toolName }: BreadcrumbsProps) {
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
        item: 'https://rawtools.io/#' + category.toLowerCase().replace(/\s+/g, '-'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: toolName,
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
            <Link href="/" className="hover:text-primary transition-colors">
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

