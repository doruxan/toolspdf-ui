import { Metadata } from 'next';
import JSONMinifier from '@/components/tools/json/JSONMinifier';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'JSON Minifier - Compress JSON Online | RawTools',
  description: 'Minify and compress JSON by removing whitespace. Reduce file size instantly with compression statistics. Fast, secure, browser-based. 100% free.',
  keywords: 'json minifier, minify json, compress json, json compressor, reduce json size',
  openGraph: {
    title: 'JSON Minifier - Compress JSON Online',
    description: 'Minify JSON by removing whitespace. Shows compression statistics and file size reduction.',
    type: 'website',
  
    url: 'https://rawtools.io/json-minifier',
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
    title: 'JSON Minifier - Compress JSON | RawTools',
    description: 'Remove whitespace and compress JSON to reduce file size. Instant minification.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/json-minifier');
}


export default function JSONMinifierPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Minifier',
    description: 'Free online tool to minify and compress JSON by removing unnecessary whitespace. Shows compression statistics and file size reduction.',
    url: 'https://rawtools.io/json-minifier',
  });

  const howToSchema = generateHowToSchema({
    name: 'JSON Minifier',
    description: 'How to minify and compress JSON files',
    url: 'https://rawtools.io/json-minifier',
  }, [
    'Paste your formatted JSON into the input area',
    'Click the minify button to remove all whitespace',
    'View compression statistics showing size reduction',
    'Copy the minified JSON output'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What is JSON minification?',
      answer: 'JSON minification removes all unnecessary whitespace (spaces, tabs, line breaks) from JSON data to reduce file size. For example, a 10 KB formatted JSON might minify to 6 KB (40% reduction). Minified JSON is functionally identical to formatted JSON—both parse to the same data structure. Minification is essential for production: reducing network transfer time, API response sizes, and storage costs. Development uses formatted JSON for readability; production uses minified JSON for performance.'
    },
    {
      question: 'Does minifying JSON change its structure or data?',
      answer: 'No. Minification only removes whitespace; it does NOT alter keys, values, structure, or data types. {"name": "John", "age": 30} minifies to {"name":"John","age":30}—the data is identical. JSON parsers ignore whitespace, so minified and formatted versions parse to the same JavaScript object. The only difference is file size and human readability. Minification is a safe, reversible operation.'
    },
    {
      question: 'How much file size reduction can I expect from minification?',
      answer: 'Typical reduction: 20-60% depending on formatting style. Heavily indented JSON (4-space indents, blank lines) sees 50-60% reduction. Simply formatted JSON (2-space indents) sees 20-30% reduction. For a real example: a 1 MB config file minifies to ~400-600 KB. File size reduction is greater for deeply nested JSON with many indentation levels. Flat JSON sees minimal reduction.'
    },
    {
      question: 'Should I minify JSON before storing in databases?',
      answer: 'It depends. PostgreSQL JSONB columns automatically compress data, so pre-minification provides minimal benefit. MongoDB stores BSON (binary JSON), which is already compact. For TEXT/VARCHAR columns storing JSON as strings, minification saves storage. For NoSQL document stores, minification reduces storage and network costs. Rule of thumb: minify for storage in text columns or file-based storage; skip for native JSON column types.'
    },
    {
      question: 'Can minification break my JSON?',
      answer: 'No, if done correctly. Minification tools preserve valid JSON structure. However, manually removing whitespace can cause errors if you accidentally delete quotes, commas, or brackets. Always use automated minification tools. After minification, validate the JSON to confirm it parses correctly. For mission-critical systems, test minified JSON in staging environments before production deployment.'
    },
    {
      question: 'Is there a difference between minification and compression?',
      answer: 'Yes. Minification removes whitespace (lossless transformation of the JSON itself). Compression (gzip, Brotli) uses algorithms to encode data more efficiently (requires decompression before use). For APIs: minify JSON first (permanent size reduction), then enable gzip compression on the server (further 70-80% reduction during transfer). Combined: a 10 KB formatted JSON → 6 KB minified → 1-2 KB gzipped. Both techniques complement each other.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="1234567896" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="JSON Tools" toolName="JSON Minifier" currentHref="/json-minifier" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">JSON Minifier</h1>
              <p className="text-muted-foreground">Compress JSON by removing whitespace and reduce file size</p>
            </div>

            <JSONMinifier />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Minify JSON</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste your formatted JSON into the input area</li>
                <li>Click the minify button to remove all whitespace</li>
                <li>View compression statistics showing size reduction</li>
                <li>Copy the minified JSON output</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our JSON Minifier?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Whitespace Removal:</strong> Strips all unnecessary spaces, tabs, and line breaks</li>
                <li><strong>Validation Included:</strong> Verifies JSON syntax before minifying</li>
                <li><strong>Size Comparison:</strong> Shows original vs minified size with percentage reduction</li>
                <li><strong>Instant Processing:</strong> No delays, minifies large files in milliseconds</li>
                <li><strong>Undo Support:</strong> Easily revert to formatted version</li>
                <li><strong>100% Free:</strong> No limits on file size or usage frequency</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">When to Minify JSON</h3>
              <p className="text-muted-foreground">
                Minified JSON reduces file size by <strong>removing whitespace</strong> that humans use for readability but machines don't need. This saves bandwidth when transmitting JSON over networks and reduces storage costs.
              </p>
              <p className="text-muted-foreground">
                Use minified JSON for: Production API responses to reduce network transfer time, CDN-delivered configuration files to minimize download size, mobile apps where bandwidth is limited or expensive, and embedded JSON in HTML pages to improve page load speed.
              </p>
              <p className="text-muted-foreground">
                Don't minify during development. Formatted JSON is easier to debug, review in version control, and edit manually. Minify as a build step before deployment. Typical compression: a 10KB formatted JSON file might reduce to 6-7KB when minified, saving 30-40% in size.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All minification happens locally in your browser. Your JSON data never leaves your device, is never uploaded to servers, and is never stored or logged anywhere.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567811" />
          </div>
        </div>
      </div>
    </div>
  );
}

