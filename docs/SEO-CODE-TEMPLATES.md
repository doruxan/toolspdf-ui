# SEO Code Templates
**Copy-paste ready code for rapid implementation**

---

## Table of Contents

1. [Config Files](#config-files)
2. [Schema Generators](#schema-generators)
3. [Metadata Helpers](#metadata-helpers)
4. [Page Templates](#page-templates)
5. [Components](#components)
6. [Next.js Config](#nextjs-config)

---

## Config Files

### `config/tools.ts`

```typescript
export interface Tool {
  title: string;
  href: string;
  icon: string;
  description: string;
  category: string;
  color?: string;
  featured?: boolean;
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  seoKeywords: string;
  tools: Tool[];
  faqs?: { question: string; answer: string }[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'category-slug',
    name: 'Category Name',
    description: 'Comprehensive description of this category for SEO and users.',
    seoKeywords: 'keyword1, keyword2, keyword3, keyword4',
    faqs: [
      {
        question: 'Is this service really free?',
        answer: 'Yes, all our tools are 100% free to use with no limits on usage or file size.',
      },
      {
        question: 'Is my data private?',
        answer: 'Absolutely. All processing happens locally in your browser. Your files never leave your device.',
      },
      {
        question: 'Do I need to install anything?',
        answer: 'No, all tools work entirely in your web browser on any device.',
      },
    ],
    tools: [
      {
        title: 'Tool Name',
        href: '/tool-slug',
        icon: 'IconName',
        description: 'Clear, benefit-focused description in 120-150 characters',
        category: 'category-slug',
        color: 'tool-color',
        featured: true,
      },
      // ... more tools
    ],
  },
  // ... more categories
];

// Helper functions
export function getAllTools(): Tool[] {
  return toolCategories.flatMap((category) => category.tools);
}

export function getToolByHref(href: string): Tool | undefined {
  return getAllTools().find((tool) => tool.href === href);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  const category = toolCategories.find((cat) => cat.id === categoryId);
  return category?.tools || [];
}

export function getCategoryByToolHref(href: string): ToolCategory | undefined {
  return toolCategories.find((category) =>
    category.tools.some((tool) => tool.href === href)
  );
}
```

---

## Schema Generators

### `lib/seo/schemas.ts`

```typescript
// Organization Schema (site-wide)
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'YourSite',
    url: 'https://yoursite.com',
    logo: 'https://yoursite.com/logo.png',
    description: 'Brief description of your site and what it offers.',
    sameAs: [
      'https://twitter.com/yourhandle',
      'https://github.com/yourorg',
    ],
  };
}

// Software Application Schema (tool pages)
export function generateSoftwareAppSchema(tool: {
  title?: string;
  name?: string;
  description: string;
  href?: string;
  url?: string;
}) {
  const toolName = tool.title || tool.name || 'Tool';
  const toolUrl = tool.url || (tool.href ? `https://yoursite.com${tool.href}` : 'https://yoursite.com');
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: toolName,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: tool.description,
    url: toolUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

// HowTo Schema (tool pages)
export function generateHowToSchema(
  tool: {
    name: string;
    description: string;
    url?: string;
  },
  steps: string[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to ${tool.name}`,
    description: tool.description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step,
    })),
  };
}

// Breadcrumb Schema (all pages)
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  siteUrl: string = 'https://yoursite.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

// FAQ Schema (category pages, blog posts)
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Collection Page Schema (category pages)
export function generateCollectionPageSchema(collection: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; description: string; url: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: collection.url,
    hasPart: collection.items.map((item) => ({
      '@type': 'WebPage',
      name: item.name,
      description: item.description,
      url: item.url,
    })),
  };
}

// Article Schema (blog posts)
export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author?: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `https://yoursite.com/blog/${article.slug}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author || 'YourSite Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'YourSite',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yoursite.com/logo.png',
      },
    },
    articleSection: article.category || 'Tools',
  };
}

// Blog Posting Schema (alternative to Article)
export function generateBlogPostingSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `https://yoursite.com/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'YourSite Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'YourSite',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yoursite.com/logo.png',
      },
    },
  };
}

// Alias for backwards compatibility
export const generateSoftwareApplicationSchema = generateSoftwareAppSchema;
```

---

## Metadata Helpers

### `lib/seo/metadata.ts`

```typescript
import type { Metadata } from 'next';

const SITE_NAME = 'YourSite';
const SITE_URL = 'https://yoursite.com';
const OG_IMAGE = '/og-image.svg';

export function withCanonicalMetadata(
  metadata: Metadata,
  path: string
): Metadata {
  // Remove query parameters and trailing slash
  const cleanPath = path.split('?')[0].replace(/\/$/, '');
  
  return {
    ...metadata,
    alternates: {
      canonical: cleanPath,
    },
  };
}

export function generateToolMetadata(tool: {
  title: string;
  description: string;
  href: string;
  category: string;
}): Metadata {
  const fullTitle = `${tool.title} | ${SITE_NAME}`;
  
  return withCanonicalMetadata(
    {
      title: fullTitle,
      description: tool.description,
      keywords: [
        tool.title,
        tool.category,
        'free tool',
        'online',
        'no signup',
        'browser-based',
      ],
      openGraph: {
        title: fullTitle,
        description: tool.description,
        type: 'website',
        url: `${SITE_URL}${tool.href}`,
        images: [
          {
            url: OG_IMAGE,
            width: 1200,
            height: 630,
            alt: `${tool.title} - ${SITE_NAME}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description: tool.description,
        images: [OG_IMAGE],
      },
    },
    tool.href
  );
}

export function generateCategoryMetadata(category: {
  name: string;
  description: string;
  id: string;
  toolCount: number;
}): Metadata {
  const fullTitle = `${category.name} | ${SITE_NAME}`;
  const description = `${category.toolCount} free ${category.name.toLowerCase()}: ${category.description}`;
  
  return withCanonicalMetadata(
    {
      title: fullTitle,
      description: description,
      keywords: [
        category.name,
        'free tools',
        'online tools',
        'browser-based',
      ],
      openGraph: {
        title: fullTitle,
        description: description,
        type: 'website',
        url: `${SITE_URL}/${category.id}`,
        images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description: description,
        images: [OG_IMAGE],
      },
    },
    `/${category.id}`
  );
}

export function generateBlogMetadata(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author?: string;
}): Metadata {
  const fullTitle = `${post.title} | ${SITE_NAME} Blog`;
  
  return withCanonicalMetadata(
    {
      title: fullTitle,
      description: post.excerpt,
      authors: post.author ? [{ name: post.author }] : [{ name: `${SITE_NAME} Team` }],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        url: `${SITE_URL}/blog/${post.slug}`,
        publishedTime: post.date,
        authors: [post.author || `${SITE_NAME} Team`],
        images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [OG_IMAGE],
      },
    },
    `/blog/${post.slug}`
  );
}
```

---

## Page Templates

### Tool Page: `app/(category)/[tool]/page.tsx`

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getToolByHref, getCategoryByToolHref } from '@/config/tools';
import { generateToolMetadata } from '@/lib/seo/metadata';
import {
  generateSoftwareAppSchema,
  generateHowToSchema,
} from '@/lib/seo/schemas';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import RelatedTools from '@/components/shared/RelatedTools';
import dynamic from 'next/dynamic';

// Lazy load heavy tool component
const ToolComponent = dynamic(
  () => import('@/components/tools/ToolComponent'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

interface PageProps {
  params: {
    tool: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tool = getToolByHref(`/${params.tool}`);
  if (!tool) return {};
  
  return generateToolMetadata(tool);
}

export default function ToolPage({ params }: PageProps) {
  const tool = getToolByHref(`/${params.tool}`);
  const category = getCategoryByToolHref(`/${params.tool}`);
  
  if (!tool || !category) {
    notFound();
  }

  // Generate schemas
  const softwareSchema = generateSoftwareAppSchema({
    title: tool.title,
    description: tool.description,
    href: tool.href,
  });

  const howToSchema = generateHowToSchema(
    {
      name: tool.title,
      description: tool.description,
    },
    [
      'Step 1: Upload your file or paste your data into the tool',
      'Step 2: Configure any available options (optional)',
      'Step 3: Click the process or convert button',
      'Step 4: Download the result or copy it to your clipboard',
    ]
  );

  // Get related tools (same category, limit 5)
  const relatedTools = category.tools
    .filter((t) => t.href !== tool.href)
    .slice(0, 5);

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: category.name, url: `/${category.id}` },
            { name: tool.title, url: tool.href },
          ]}
        />

        {/* Main Heading */}
        <h1 className="text-4xl font-bold mt-6 mb-4">{tool.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{tool.description}</p>

        {/* How to Use Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How to Use {tool.title}</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Upload your file or paste your data into the tool</li>
            <li>Configure any available options (optional)</li>
            <li>Click the process or convert button</li>
            <li>Download the result or copy it to your clipboard</li>
          </ol>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Features</h2>

          <h3 className="text-xl font-semibold mt-6 mb-2">Fast Processing</h3>
          <p className="text-gray-700">
            Process files instantly with zero waiting time. All operations happen
            locally in your browser for maximum speed.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">100% Privacy</h3>
          <p className="text-gray-700">
            Your files never leave your device. All processing happens locally in
            your browser, ensuring complete data privacy.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">No Limits</h3>
          <p className="text-gray-700">
            Use this tool as many times as you need with no restrictions on file
            size or usage frequency.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Easy to Use</h3>
          <p className="text-gray-700">
            Simple, intuitive interface that requires no technical knowledge. Just
            upload and process.
          </p>
        </section>

        {/* Why Use Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Use This Tool?</h2>

          <h3 className="text-xl font-semibold mt-6 mb-2">Save Time</h3>
          <p className="text-gray-700">
            Complete your task in seconds instead of minutes. No installation or
            configuration required.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Save Money</h3>
          <p className="text-gray-700">
            This tool is completely free. No subscriptions, no hidden fees, no
            watermarks.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Work Anywhere</h3>
          <p className="text-gray-700">
            Access from any device with a web browser. Works on desktop, tablet,
            and mobile.
          </p>
        </section>

        {/* Use Cases Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
          <ul className="space-y-3">
            <li>
              <strong>Business:</strong> Process documents for client presentations
              and reports
            </li>
            <li>
              <strong>Education:</strong> Convert study materials and assignments
            </li>
            <li>
              <strong>Personal:</strong> Organize personal files and archives
            </li>
            <li>
              <strong>Development:</strong> Convert data formats for software projects
            </li>
          </ul>
        </section>

        {/* Privacy Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Privacy & Security</h2>
          <p className="text-gray-700">
            Your privacy is our top priority. This tool processes everything locally
            in your web browser. Your files are never uploaded to any server, and we
            don't store, collect, or transmit your data. What happens in your browser
            stays in your browser.
          </p>
        </section>

        {/* Tool Component */}
        <div className="my-12">
          <ToolComponent />
        </div>

        {/* Related Tools */}
        <RelatedTools tools={relatedTools} />
      </div>
    </>
  );
}

// Generate static params if you have a fixed set of tools
export async function generateStaticParams() {
  const { getAllTools } = await import('@/config/tools');
  const tools = getAllTools();
  
  return tools.map((tool) => ({
    tool: tool.href.replace('/', ''),
  }));
}
```

### Category Page: `app/(category)/page.tsx`

```typescript
import { Metadata } from 'next';
import { toolCategories } from '@/config/tools';
import { generateCategoryMetadata } from '@/lib/seo/metadata';
import {
  generateCollectionPageSchema,
  generateFAQSchema,
} from '@/lib/seo/schemas';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ToolCard from '@/components/shared/ToolCard';

const CATEGORY_ID = 'your-category-id'; // Replace with actual category ID

export async function generateMetadata(): Promise<Metadata> {
  const category = toolCategories.find((c) => c.id === CATEGORY_ID);
  if (!category) return {};
  
  return generateCategoryMetadata({
    name: category.name,
    description: category.description,
    id: category.id,
    toolCount: category.tools.length,
  });
}

export default function CategoryPage() {
  const category = toolCategories.find((c) => c.id === CATEGORY_ID);
  
  if (!category) {
    return <div>Category not found</div>;
  }

  // Generate schemas
  const collectionSchema = generateCollectionPageSchema({
    name: category.name,
    description: category.description,
    url: `https://yoursite.com/${category.id}`,
    items: category.tools.map((tool) => ({
      name: tool.title,
      description: tool.description,
      url: `https://yoursite.com${tool.href}`,
    })),
  });

  const faqSchema = category.faqs ? generateFAQSchema(category.faqs) : null;

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: category.name, url: `/${category.id}` },
          ]}
        />

        {/* Header */}
        <h1 className="text-4xl font-bold mt-6 mb-4">{category.name}</h1>
        <p className="text-lg text-gray-600 mb-8">{category.description}</p>

        {/* Tool Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {category.tools.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>

        {/* FAQs */}
        {category.faqs && category.faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {category.faqs.map((faq, index) => (
                <div key={index} className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
```

---

## Components

### Breadcrumbs: `components/shared/Breadcrumbs.tsx`

```typescript
import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-gray-600">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center gap-2">
              {index < items.length - 1 ? (
                <>
                  <Link
                    href={item.url}
                    className="hover:text-gray-900 underline"
                  >
                    {item.name}
                  </Link>
                  <span>/</span>
                </>
              ) : (
                <span className="text-gray-900 font-medium">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
```

### Related Tools: `components/shared/RelatedTools.tsx`

```typescript
import Link from 'next/link';
import { Tool } from '@/config/tools';

interface RelatedToolsProps {
  tools: Tool[];
}

export default function RelatedTools({ tools }: RelatedToolsProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

---

## Next.js Config

### `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';
import { toolCategories } from '@/config/tools';
import { getAllBlogPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yoursite.com';
  const currentDate = new Date();

  // Homepage
  const homepage = {
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 1,
  };

  // Category hub pages
  const categoryPages = toolCategories.map((category) => ({
    url: `${baseUrl}/${category.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Tool pages
  const toolPages = toolCategories.flatMap((category) =>
    category.tools.map((tool) => ({
      url: `${baseUrl}${tool.href}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))
  );

  // Blog main page
  const blogPage = {
    url: `${baseUrl}/blog`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  };

  // Blog posts
  const blogPosts = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Static pages
  const staticPages = [
    { path: '/about', priority: 0.5 },
    { path: '/contact', priority: 0.4 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
  ].map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: currentDate,
    changeFrequency: 'yearly' as const,
    priority: page.priority,
  }));

  return [
    homepage,
    ...categoryPages,
    ...toolPages,
    blogPage,
    ...blogPosts,
    ...staticPages,
  ];
}
```

### `app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/test/',
        '/*.json$',
      ],
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  };
}
```

### `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable SWC minification (faster)
  swcMinify: true,

  // Optimize package imports
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },

  // Experimental performance features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Strict mode
  reactStrictMode: true,

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## Usage Examples

### Using schemas in a page:

```typescript
const softwareSchema = generateSoftwareAppSchema({
  title: 'JSON Formatter',
  description: 'Format and beautify JSON with syntax highlighting',
  href: '/json-formatter',
});

return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
    />
    {/* Rest of page */}
  </>
);
```

### Using metadata helpers:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const tool = getToolByHref(`/${params.tool}`);
  return generateToolMetadata(tool);
}
```

### Lazy loading heavy components:

```typescript
const PDFProcessor = dynamic(
  () => import('@/components/tools/pdf/PDFProcessor'),
  { loading: () => <Spinner />, ssr: false }
);
```

---

## Quick Copy-Paste Snippets

### Add schema to page:
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

### Generate static params:
```typescript
export async function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}
```

### Canonical URL:
```typescript
alternates: {
  canonical: '/path',
}
```

### OpenGraph image:
```typescript
openGraph: {
  images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
}
```

---

**Pro Tip:** Copy the entire schemas.ts file first, then customize. Most of the work is already done!

