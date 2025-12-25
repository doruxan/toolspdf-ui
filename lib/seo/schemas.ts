export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RawTools',
    url: 'https://rawtools.io',
    logo: 'https://rawtools.io/logo.png',
    description:
      'Free online tools that run in your browser: PDF tools, e-commerce calculators, and IBAN tools. Fast, private, and easy to use.',
    sameAs: ['https://twitter.com/rawtools', 'https://github.com/rawtools'],
  };
}

export function generateSoftwareAppSchema(tool: {
  title?: string;
  name?: string;
  description: string;
  href?: string;
  url?: string;
}) {
  const toolName = tool.title || tool.name || 'Tool';
  const toolUrl = tool.url || (tool.href ? `https://rawtools.io${tool.href}` : 'https://rawtools.io');
  
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  siteUrl: string = 'https://rawtools.io'
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

// Alias for backwards compatibility
export const generateSoftwareApplicationSchema = generateSoftwareAppSchema;

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
    url: `https://rawtools.io/blog/${article.slug}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author || 'RawTools Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RawTools',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rawtools.io/logo.png',
      },
    },
    articleSection: article.category || 'Tools',
  };
}

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
    url: `https://rawtools.io/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'RawTools Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RawTools',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rawtools.io/logo.png',
      },
    },
  };
}

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
