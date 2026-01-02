# SEO Quick Start Guide
**Get production-grade SEO running in 1 week**

> **For full details, see [SEO-NORTHSTAR.md](./SEO-NORTHSTAR.md)**

---

## Day 1: Foundation Setup (4 hours)

### ✅ Create Core Files

**1. Config File: `config/tools.ts`**
```typescript
export interface Tool {
  title: string;
  href: string;
  description: string;
  category: string;
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
  // Your categories here
];
```

**2. Schema Library: `lib/seo/schemas.ts`**
```typescript
export function generateSoftwareAppSchema(tool) { /*...*/ }
export function generateHowToSchema(tool, steps) { /*...*/ }
export function generateBreadcrumbSchema(items) { /*...*/ }
export function generateFAQSchema(faqs) { /*...*/ }
export function generateCollectionPageSchema(collection) { /*...*/ }
export function generateArticleSchema(article) { /*...*/ }
```

**3. Metadata Helpers: `lib/seo/metadata.ts`**
```typescript
export function withCanonicalMetadata(metadata, path) { /*...*/ }
export function generateToolMetadata(tool) { /*...*/ }
```

**4. Sitemap: `app/sitemap.ts`**
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  // Auto-generate from config/tools.ts
}
```

**5. Robots: `app/robots.ts`**
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://yoursite.com/sitemap.xml',
  };
}
```

---

## Day 2: Global Metadata (2 hours)

### ✅ Update `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),
  alternates: { canonical: './' },
  title: "Site Name - Brief Description",
  description: "150-160 character description with key benefits and numbers",
  keywords: "keyword1, keyword2, keyword3",
  openGraph: {
    title: "Site Name",
    description: "OG description",
    type: "website",
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Site Name",
    description: "Twitter description",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### ✅ Add Performance Optimizations

```typescript
<head>
  {/* Preconnect */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://www.googletagmanager.com" />
  
  {/* Dark mode FOUC prevention */}
  <script dangerouslySetInnerHTML={{ __html: `/* theme script */` }} />
</head>
```

---

## Day 3: Tool Page Template (4 hours)

### ✅ Create Standard Tool Page

**File: `app/(category)/[tool]/page.tsx`**

```typescript
import { generateSoftwareAppSchema, generateHowToSchema } from '@/lib/seo/schemas';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export async function generateMetadata({ params }) {
  const tool = getToolBySlug(params.tool);
  return {
    title: `${tool.title} | YourSite`,
    description: tool.description,
    alternates: { canonical: tool.href },
    openGraph: {
      title: `${tool.title} | YourSite`,
      description: tool.description,
      images: [{ url: '/og-image.svg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title}`,
      description: tool.description,
    },
  };
}

export default function ToolPage({ params }) {
  const tool = getToolBySlug(params.tool);
  
  // Schemas
  const softwareSchema = generateSoftwareAppSchema(tool);
  const howToSchema = generateHowToSchema(tool, [
    'Step 1: Upload or paste your data',
    'Step 2: Configure options (optional)',
    'Step 3: Click the process button',
    'Step 4: Download or copy the result',
  ]);

  return (
    <>
      {/* Schemas */}
      <script type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} 
      />
      <script type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} 
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { name: 'Home', url: '/' },
        { name: tool.category, url: `/${tool.categoryId}` },
        { name: tool.title, url: tool.href },
      ]} />

      {/* CONTENT STRUCTURE */}
      <h1>{tool.title}</h1>
      
      <section>
        <h2>How to Use {tool.title}</h2>
        <ol>
          <li>Step 1: Upload or paste your data</li>
          <li>Step 2: Configure options (optional)</li>
          <li>Step 3: Click the process button</li>
          <li>Step 4: Download or copy the result</li>
        </ol>
      </section>

      <section>
        <h2>Features</h2>
        <h3>Feature 1 Name</h3>
        <p>Description with benefits...</p>
        
        <h3>Feature 2 Name</h3>
        <p>Description with benefits...</p>
        
        {/* 4-6 features total */}
      </section>

      <section>
        <h2>Why Use This Tool?</h2>
        <h3>Benefit 1</h3>
        <p>Specific, measurable benefit...</p>
        
        <h3>Benefit 2</h3>
        <p>Specific, measurable benefit...</p>
        
        {/* 3-4 benefits */}
      </section>

      <section>
        <h2>Common Use Cases</h2>
        <ul>
          <li><strong>Use Case 1:</strong> Specific scenario with details</li>
          <li><strong>Use Case 2:</strong> Specific scenario with details</li>
          <li><strong>Use Case 3:</strong> Specific scenario with details</li>
          <li><strong>Use Case 4:</strong> Specific scenario with details</li>
        </ul>
      </section>

      <section>
        <h2>Privacy & Security</h2>
        <p>Explanation of data handling...</p>
      </section>

      {/* Tool Component */}
      <ToolComponent />

      {/* Related Tools */}
      <section>
        <h2>Related Tools</h2>
        {/* Links to 3-5 related tools */}
      </section>
    </>
  );
}
```

---

## Day 4: Category Pages (3 hours)

### ✅ Category Hub Template

**File: `app/(category)/page.tsx`**

```typescript
import { generateCollectionPageSchema, generateFAQSchema } from '@/lib/seo/schemas';

export async function generateMetadata() {
  return {
    title: "Category Name Tools | YourSite",
    description: "X tools for [purpose]: list key tools",
    alternates: { canonical: '/category-name' },
  };
}

export default function CategoryPage() {
  const category = getCategoryById('category-name');
  
  const collectionSchema = generateCollectionPageSchema({
    name: category.name,
    description: category.description,
    url: `https://yoursite.com/${category.id}`,
    items: category.tools.map(t => ({
      name: t.title,
      description: t.description,
      url: `https://yoursite.com${t.href}`,
    })),
  });

  const faqSchema = generateFAQSchema(category.faqs || []);

  return (
    <>
      <script type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} 
      />
      <script type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />

      <h1>{category.name}</h1>
      <p>{category.description}</p>

      {/* Tool Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {category.tools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </div>

      {/* FAQs */}
      <section>
        <h2>Frequently Asked Questions</h2>
        {category.faqs?.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>
    </>
  );
}
```

---

## Day 5: Content Writing (8 hours)

### ✅ Content Checklist Per Page

Use this for EVERY tool page:

- [ ] **H1:** Tool name only
- [ ] **Intro:** 1-2 sentences explaining what it does
- [ ] **How to Use (H2):** 4 steps matching HowTo schema
- [ ] **Features (H2):** 4-6 features as H3 subsections
- [ ] **Why Use (H2):** 3-4 benefits as H3 subsections
- [ ] **Use Cases (H2):** 4-6 scenarios as bullet list
- [ ] **Privacy (H2):** If relevant
- [ ] **Related Tools (H2):** 3-5 tool links
- [ ] **Total:** 400-600 words minimum

### ✅ Writing Rules

**DO:**
- ✅ Use specific numbers: "Save up to 60% file size"
- ✅ Real examples: "Example: Converting a 500-line CSV with 12 columns"
- ✅ Short paragraphs (2-3 lines max)
- ✅ Active voice
- ✅ Descriptive subheadings
- ✅ Natural keyword usage

**DON'T:**
- ❌ Hype words: "revolutionary," "game-changer," "unlock"
- ❌ "In this article we will..."
- ❌ Generic anchor text: "click here"
- ❌ Keyword stuffing
- ❌ Fluff without value

---

## Day 6: Components & Performance (4 hours)

### ✅ Breadcrumbs Component

**File: `components/shared/Breadcrumbs.tsx`**

```typescript
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';

export default function Breadcrumbs({ 
  items 
}: { 
  items: { name: string; url: string }[] 
}) {
  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-2 text-sm">
          {items.map((item, idx) => (
            <li key={item.url}>
              {idx < items.length - 1 ? (
                <>
                  <Link href={item.url}>{item.name}</Link>
                  <span> / </span>
                </>
              ) : (
                <span>{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
```

### ✅ Lazy Load Heavy Libraries

```typescript
'use client';
import dynamic from 'next/dynamic';

const HeavyTool = dynamic(
  () => import('@/components/tools/HeavyTool'),
  { 
    loading: () => <LoadingSpinner />,
    ssr: false 
  }
);
```

### ✅ Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/image.png"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"
/>
```

---

## Day 7: Testing & Launch (4 hours)

### ✅ Pre-Launch Checklist

**Schema Validation**
- [ ] Test each page type in [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verify all schemas are valid
- [ ] Check breadcrumbs appear correctly

**Metadata Validation**
- [ ] Every page has unique title (50-60 chars)
- [ ] Every page has unique description (150-160 chars)
- [ ] Canonical URLs are correct (no query params)
- [ ] OpenGraph images are 1200x630
- [ ] Twitter cards configured

**Technical Checks**
- [ ] Sitemap generates correctly: `/sitemap.xml`
- [ ] Robots.txt is accessible: `/robots.txt`
- [ ] No broken internal links
- [ ] Mobile responsive on real devices
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1

**Content Checks**
- [ ] All pages have 400+ words
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Alt text on all images
- [ ] Internal links use descriptive anchors

### ✅ Launch Day

**Google Search Console**
1. [ ] Add property
2. [ ] Verify ownership
3. [ ] Submit sitemap
4. [ ] Request indexing for homepage
5. [ ] Request indexing for top 10 pages

**Google Analytics**
1. [ ] Create GA4 property
2. [ ] Add tracking code
3. [ ] Set up events (tool usage, etc.)
4. [ ] Verify tracking works

**Monitor First Week**
- [ ] Check Search Console daily for crawl errors
- [ ] Verify pages are getting indexed
- [ ] Monitor Core Web Vitals
- [ ] Check for any 404s or redirects needed

---

## Quick Commands

### Test Locally
```bash
npm run build
npm run start

# Visit in browser:
# http://localhost:3000/sitemap.xml
# http://localhost:3000/robots.txt
```

### Validate Schema
```bash
# Test a page:
# Visit: https://search.google.com/test/rich-results
# Enter URL: https://yoursite.com/tool-name
```

### Check Performance
```bash
# Visit: https://pagespeed.web.dev/
# Enter URL and run test
```

---

## After Launch: Monthly Tasks (1 hour/month)

**First Monday of Each Month:**

1. **Search Console Review** (20 min)
   - [ ] Check crawl errors
   - [ ] Review coverage issues
   - [ ] Check Core Web Vitals trends
   - [ ] Review top queries & CTR

2. **Content Updates** (30 min)
   - [ ] Find pages with impressions but low CTR
   - [ ] Improve meta descriptions
   - [ ] Add FAQs based on support questions
   - [ ] Update outdated content

3. **Performance Check** (10 min)
   - [ ] Run PageSpeed Insights on 3 random pages
   - [ ] Fix any regressions
   - [ ] Check for new broken links

---

## Emergency Fixes

### "My page isn't indexing!"
1. Check robots.txt isn't blocking it
2. Check canonical URL is correct
3. Submit to Search Console manually
4. Verify sitemap includes the page
5. Check for noindex meta tag

### "Rich results not showing!"
1. Test in Google Rich Results Test
2. Verify schema is valid JSON
3. Check schema matches page content
4. Wait 2-4 weeks (can take time)

### "Core Web Vitals are failing!"
1. Check image sizes (biggest cause)
2. Lazy load heavy JavaScript
3. Remove unused third-party scripts
4. Use next/image for all images
5. Check font loading strategy

---

## Essential URLs

- **Rich Results Test:** https://search.google.com/test/rich-results
- **Schema Validator:** https://validator.schema.org/
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Search Console:** https://search.google.com/search-console
- **Google Analytics:** https://analytics.google.com/

---

## Next Steps

After your first successful implementation:

1. **Read the full [SEO-NORTHSTAR.md](./SEO-NORTHSTAR.md)** for deeper understanding
2. **Document your learnings** in a project-specific SEO log
3. **A/B test** different content structures
4. **Expand gradually** - add more schema types, more content, more internal links
5. **Share knowledge** with your team

---

**Questions?** Refer to [SEO-NORTHSTAR.md](./SEO-NORTHSTAR.md) for comprehensive details.

**Good luck!** 🚀

