import { Metadata } from 'next';
import JSONDiff from '@/components/tools/json/JSONDiff';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'JSON Diff - Compare JSON Files Online | RawTools',
  description: 'Compare two JSON files with side-by-side highlighting. Shows additions, deletions, and modifications. Fast, secure, browser-based comparison. 100% free.',
  keywords: 'json diff, compare json, json compare, json difference, json comparison',
  openGraph: {
    title: 'JSON Diff - Compare JSON Files Online',
    description: 'Compare JSON files with color-coded differences. Side-by-side comparison with detailed change tracking.',
    type: 'website',
  
    url: 'https://rawtools.io/json-diff',
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
    title: 'JSON Diff - Compare JSON Files | RawTools',
    description: 'Compare two JSON files and see differences. Highlights additions, deletions, and changes.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/json-diff');
}


export default function JSONDiffPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Diff & Compare',
    description: 'Free online tool to compare two JSON files. Features side-by-side comparison with color-coded differences showing additions, deletions, and modifications.',
    url: 'https://rawtools.io/json-diff',
  });

  const howToSchema = generateHowToSchema({
    name: 'JSON Diff & Compare',
    description: 'How to compare two JSON files',
    url: 'https://rawtools.io/json-diff',
  }, [
    'Paste the first JSON object into the left panel',
    'Paste the second JSON object into the right panel',
    'Click compare to see color-coded differences',
    'Review additions (green), deletions (red), and changes (yellow)'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567802" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="JSON Tools" toolName="JSON Diff" currentHref="/json-diff" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">JSON Diff & Compare</h1>
              <p className="text-muted-foreground">Compare two JSON files with color-coded differences</p>
            </div>

            <JSONDiff />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Compare JSON Files</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste the first JSON object into the left panel</li>
                <li>Paste the second JSON object into the right panel</li>
                <li>Click compare to see color-coded differences</li>
                <li>Review additions (green), deletions (red), and changes (yellow)</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our JSON Diff Tool?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Visual Diff:</strong> Side-by-side comparison with color highlighting</li>
                <li><strong>Added Properties:</strong> See new fields in green</li>
                <li><strong>Removed Properties:</strong> Deleted fields shown in red</li>
                <li><strong>Changed Values:</strong> Modified values highlighted in yellow</li>
                <li><strong>Nested Comparison:</strong> Deep comparison of nested objects and arrays</li>
                <li><strong>Statistics:</strong> Count of additions, deletions, and changes</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">How JSON Comparison Works</h3>
              <p className="text-muted-foreground">
                JSON diff tools perform <strong>deep comparison</strong> of two JSON structures, recursively checking each property and value. The tool identifies three types of changes: additions (properties in the second JSON but not the first), deletions (properties in the first JSON but not the second), and modifications (properties that exist in both but with different values).
              </p>
              <p className="text-muted-foreground">
                This is more sophisticated than text-based diff tools because it understands JSON structure. Property order doesn&apos;t matter ({`{"a":1,"b":2}`} equals {`{"b":2,"a":1}`}), and nested objects are compared recursively. This makes JSON diff essential for API version control and configuration auditing.
              </p>
              <p className="text-muted-foreground">
                Use cases: Comparing API responses between different endpoints or versions, detecting configuration drift between environments (dev vs production), debugging why two seemingly identical JSON payloads behave differently, and code reviews where JSON configuration files have changed.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Both JSON objects are processed entirely in your browser. No data is uploaded to servers, stored, or logged. The comparison happens locally using JavaScript, keeping your data private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567814" />
          </div>
        </div>
      </div>
    </div>
  );
}

