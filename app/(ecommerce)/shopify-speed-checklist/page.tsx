import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { SpeedChecklist } from '@/components/tools/ecommerce/SpeedChecklist';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const pageMetadata: Metadata = {
  title: 'Shopify Speed Checklist - Optimize Store Speed | RawTools',
  description: 'Free Shopify speed checklist. Optimize your store speed with our comprehensive checklist.',
  alternates: { canonical: 'https://rawtools.io/shopify-speed-checklist' },
  openGraph: {
    title: 'Shopify Speed Checklist | RawTools',
    description: 'Optimize your Shopify store speed with our comprehensive performance checklist.',
    type: 'website',

    url: 'https://rawtools.io/shopify-speed-checklist',
    siteName: 'RawTools',
    images: [{
      url: '/og-image.svg',
      width: 1200,
      height: 630,
      alt: 'RawTools Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify Speed Checklist | RawTools',
    description: 'Optimize your Shopify store speed with our comprehensive performance checklist.',

    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/shopify-speed-checklist');
}


export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Shopify Speed Checklist',
    description: 'Optimize your Shopify store speed with our comprehensive checklist',
    href: '/shopify-speed-checklist',
  });

  const howToSchema = generateHowToSchema({
    name: 'Shopify Speed Checklist',
    description: 'How to optimize your Shopify store speed for better performance',
    url: 'https://rawtools.io/shopify-speed-checklist',
  }, [
    'Review each optimization category in the checklist',
    'Check off items you have already implemented',
    'Prioritize unchecked items based on impact',
    'Implement high-impact optimizations first',
    'Track your progress and measure speed improvements'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'Why is site speed important for Shopify stores?',
      answer: 'Site speed directly impacts revenue. Research shows: 1-second delay reduces conversions by 7%, 40% of users abandon sites that take 3+ seconds to load, and Google ranks faster sites higher in search. Real impact: a store loading in 1.5 seconds vs 3 seconds sees 20-30% higher conversion rates. For a store with $100K monthly revenue, a 2-second improvement could generate $20-30K additional revenue monthly. Speed affects mobile users most (slower connections). Google Core Web Vitals (LCP, FID, CLS) now influence SEO rankings directly.'
    },
    {
      question: 'What is a good page speed score for Shopify stores?',
      answer: 'Target benchmarks: Mobile (most critical): 50-70 PageSpeed Insights score (good), 70-90 (excellent), 90+ (rare, minimalist stores). Desktop: 80-90 (good), 90+ (excellent). Real-world load times: under 2 seconds (excellent), 2-3 seconds (acceptable), 3-5 seconds (needs improvement), 5+ seconds (urgent fix required). Note: PageSpeed Insights scores are strict; focus on real-world metrics (Google Analytics speed reports, GTmetrix). A 60 mobile score with 2-second load time is better than a 90 score with 4-second load time.'
    },
    {
      question: 'What are the biggest speed killers on Shopify stores?',
      answer: 'Top culprits: Unoptimized images (70% of page weight; resize to max 2000px, compress to under 200 KB), Too many apps (each adds 50-200 KB code; audit and remove unused apps), Large theme files (use lightweight themes; Dawn theme is fastest), Uncompressed code (minify CSS/JS), External scripts (Facebook Pixel, analytics, chat widgets slow pages; load asynchronously), Hero videos (use thumbnail images with click-to-play), and Carousels (load off-screen slides lazily). Fix images and apps first for 50-70% speed gain.'
    },
    {
      question: 'How do I optimize images without losing quality?',
      answer: 'Image optimization workflow: Resize first (max 2000px width for product images, 1500px for thumbnails), Compress using tools (TinyPNG, Shopify Image Optimizer app, ImageOptim), Use WebP format (80% smaller than JPEG, supported on all browsers), Implement lazy loading (images load as user scrolls), and Use Shopify CDN (automatic delivery from nearest server). Example: 5 MB original → resize to 1500px → compress → 150 KB final (97% size reduction, no visible quality loss). Aim for under 200 KB per image.'
    },
    {
      question: 'Should I limit the number of apps on my store?',
      answer: 'Yes. Each app adds code that slows your site. Guidelines: under 10 apps (ideal), 10-15 apps (acceptable), 15-20 apps (performance impact likely), 20+ apps (severe slowdown). Audit regularly: uninstall unused apps (they often leave code behind; manually remove remnants), combine functionality (use one multi-feature app instead of five single-purpose apps), and evaluate necessity (is this app worth 0.5 seconds load time?). Check app impact using Shopify Speed Score or GTmetrix before installing.'
    },
    {
      question: 'Can changing my Shopify theme improve speed?',
      answer: 'Significantly. Theme speed comparison: Dawn (Shopify default): 80-90 PageSpeed score, lightweight, fast. Debutify, Turbo: optimized for speed, 70-85 score. PageFly, GemPages (page builders): 50-70 score, feature-rich but slower. Heavily customized themes: 40-60 score, often bloated. Before switching themes, test speed using theme preview mode. Expect 20-40% speed improvement switching from a slow custom theme to Dawn. Lightweight does not mean less functionality—prioritize themes built for performance with minimal code.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="1515151515" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs
              category="E-Commerce Tools"
              toolName="Shopify Speed Checklist"
              currentHref="/shopify-speed-checklist"
            />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Shopify Speed Checklist</h1>
              <p className="text-muted-foreground">
                Optimize your Shopify store speed with our comprehensive performance checklist
              </p>
            </div>

            <SpeedChecklist />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Use This Speed Checklist</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Review each optimization category in the checklist</li>
                <li>Check off items you have already implemented</li>
                <li>Prioritize unchecked items based on impact</li>
                <li>Implement high-impact optimizations first</li>
                <li>Track your progress and measure speed improvements</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our Speed Checklist?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Comprehensive:</strong> Covers all major speed optimization areas</li>
                <li><strong>Actionable:</strong> Clear steps you can implement immediately</li>
                <li><strong>Conversion Focused:</strong> Faster sites convert better</li>
                <li><strong>SEO Benefits:</strong> Speed is a Google ranking factor</li>
                <li><strong>Track Progress:</strong> Check off completed optimizations</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our Speed Optimization Tool</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Image Optimization:</strong> Compress and lazy-load images</li>
                <li><strong>Code Minification:</strong> Reduce CSS, JS, and HTML file sizes</li>
                <li><strong>App Audit:</strong> Identify and remove slow-performing apps</li>
                <li><strong>Caching Strategies:</strong> Implement browser and server caching</li>
                <li><strong>CDN Setup:</strong> Use content delivery networks for faster loading</li>
                <li><strong>Theme Optimization:</strong> Choose lightweight, performance-focused themes</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding Shopify Store Speed</h3>
              <p className="text-muted-foreground">
                Store speed directly impacts conversions, SEO rankings, and customer experience. Studies show that a 1-second delay in page load time can reduce conversions by 7%. For a store making $100,000/month, that's $7,000 in lost revenue. Google also uses page speed as a ranking factor, meaning faster stores rank higher in search results. Common culprits for slow Shopify stores include unoptimized images (high-resolution photos without compression), excessive apps (each app adds code and requests), bloated themes (poorly coded or feature-heavy themes), and lack of caching. Our checklist helps you systematically address each factor. For example, compressing images from 2MB to 200KB can reduce page load from 8 seconds to 3 seconds—a massive improvement that directly boosts sales and search visibility.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for Speed Optimization</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>New Store Launch:</strong> Optimize speed before going live to start strong.</li>
                <li><strong>Conversion Rate Optimization:</strong> Speed improvements often increase sales.</li>
                <li><strong>SEO Improvement:</strong> Boost Google rankings with faster page loads.</li>
                <li><strong>Mobile Performance:</strong> Ensure fast loading on mobile devices.</li>
                <li><strong>High-Traffic Events:</strong> Prepare for Black Friday, holiday sales, or launches.</li>
                <li><strong>Regular Audits:</strong> Quarterly speed checks to maintain performance.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. This checklist tool runs entirely in your web browser. No data about your store or optimizations is collected or stored. You can use our tool with complete confidence, knowing your store information remains private and secure throughout the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1616161616" />
          </div>
        </div>
      </div>

      <RelatedTools currentTool="/shopify-speed-checklist" />
    </div>
  );
}

