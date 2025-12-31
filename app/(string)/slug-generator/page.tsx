import { Metadata } from 'next';
import SlugGenerator from '@/components/tools/string/SlugGenerator';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Slug Generator - URL-Friendly Slug Converter | RawTools',
  description: 'Convert text to URL-friendly slugs. Removes special characters, converts spaces to hyphens, and handles accents. Fast, free, browser-based. 100% free.',
  keywords: 'slug generator, url slug, permalink generator, seo friendly url, url converter, slug converter',
  openGraph: {
    title: 'Slug Generator - URL-Friendly Slug Converter',
    description: 'Convert text to URL-friendly slugs. Fast, free, browser-based slug generator.',
    type: 'website',
  
    url: 'https://rawtools.io/slug-generator',
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
    title: 'Slug Generator - URL-Friendly | RawTools',
    description: 'Convert text to URL-friendly slugs. Perfect for URLs, filenames, and identifiers.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/slug-generator');
}

export default function SlugGeneratorPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Slug Generator',
    description: 'Free online tool to convert text to URL-friendly slugs. Removes special characters, converts spaces to hyphens, and handles diacritics.',
    url: 'https://rawtools.io/slug-generator',
  });

  const howToSchema = generateHowToSchema({
    name: 'Slug Generator',
    description: 'How to generate URL-friendly slugs from text',
    url: 'https://rawtools.io/slug-generator',
  }, [
    'Enter or paste text (title, filename, etc.)',
    'View the automatically generated slug',
    'Spaces become hyphens, special characters are removed',
    'Copy the SEO-friendly slug'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567918" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Slug Generator" currentHref="/slug-generator" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Slug Generator</h1>
              <p className="text-muted-foreground">Convert text to URL-friendly slugs for SEO-optimized URLs</p>
            </div>

            <SlugGenerator />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Generate URL Slugs</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter or paste text (title, filename, etc.)</li>
                <li>View the automatically generated slug</li>
                <li>Spaces become hyphens, special characters are removed</li>
                <li>Copy the SEO-friendly slug</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Slug Generator Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>URL-Safe:</strong> Removes characters that break URLs (?, &, #, spaces)</li>
                <li><strong>Hyphen Conversion:</strong> Converts spaces to hyphens for readability</li>
                <li><strong>Accent Removal:</strong> Strips diacritics (café → cafe)</li>
                <li><strong>Lowercase Conversion:</strong> Converts to lowercase for consistency</li>
                <li><strong>Special Character Removal:</strong> Strips punctuation and symbols</li>
                <li><strong>100% Free:</strong> No limits on slug generation</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is a URL Slug?</h3>
              <p className="text-muted-foreground">
                A URL slug is the <strong>readable part of a URL</strong> that identifies a specific page or resource. It appears after the domain name in addresses like example.com/blog/your-slug-here. Good slugs are descriptive, readable, and SEO-friendly.
              </p>
              <p className="text-muted-foreground">
                Example: A blog post titled "10 Best Coffee Shops in Seattle!" becomes the slug "10-best-coffee-shops-in-seattle". The exclamation mark is removed, spaces become hyphens, and everything is lowercase. This slug tells users and search engines what the page is about.
              </p>
              <p className="text-muted-foreground">
                Use cases: Creating permalinks for blog posts and articles, generating product URLs for e-commerce sites, making SEO-friendly file names for downloads, creating readable API endpoint paths, and generating unique identifiers from user-provided titles.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All slug generation happens locally in your browser. Your text and titles are never uploaded to servers, stored, or logged. The conversion uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567822" />
          </div>
        </div>
      </div>
    </div>
  );
}

