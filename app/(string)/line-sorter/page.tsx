import { Metadata } from 'next';
import LineSorter from '@/components/tools/string/LineSorter';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Line Sorter - Sort Lines Alphabetically or Numerically | RawTools',
  description: 'Sort lines alphabetically, numerically, by length, or randomly. Fast, free, browser-based line sorting tool with ascending and descending options. 100% free.',
  keywords: 'line sorter, sort lines, alphabetical sort, numerical sort, text sorter, sort alphabetically',
  openGraph: {
    title: 'Line Sorter - Sort Lines Alphabetically or Numerically',
    description: 'Sort lines alphabetically, numerically, by length, or randomly. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/line-sorter',
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
    title: 'Line Sorter - Sort Text Lines | RawTools',
    description: 'Sort text lines alphabetically or numerically. Ascending, descending, or reverse order.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/line-sorter');
}

export default function LineSorterPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Line Sorter',
    description: 'Free online tool to sort lines alphabetically, numerically, by length, or randomly. Features ascending and descending sort options.',
    url: 'https://rawtools.io/line-sorter',
  });

  const howToSchema = generateHowToSchema({
    name: 'Line Sorter',
    description: 'How to sort lines of text',
    url: 'https://rawtools.io/line-sorter',
  }, [
    'Paste multi-line text into the input area',
    'Select sort method (alphabetical, numerical, by length, random)',
    'Choose ascending or descending order',
    'Copy the sorted lines'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567910" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Line Sorter" currentHref="/line-sorter" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Line Sorter</h1>
              <p className="text-muted-foreground">Sort lines alphabetically, numerically, by length, or randomly</p>
            </div>

            <LineSorter />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Sort Lines</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste multi-line text into the input area</li>
                <li>Select sort method (alphabetical, numerical, by length, random)</li>
                <li>Choose ascending or descending order</li>
                <li>Copy the sorted lines</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Line Sorter Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Alphabetical Sorting:</strong> A-Z or Z-A order</li>
                <li><strong>Numerical Sorting:</strong> Handles negative numbers correctly</li>
                <li><strong>Sort by Line Length:</strong> Shortest to longest or reverse</li>
                <li><strong>Random Shuffling:</strong> Randomize line order</li>
                <li><strong>Case-Sensitive Options:</strong> Control case handling</li>
                <li><strong>100% Free:</strong> No limits on text length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Sort Lines?</h3>
              <p className="text-muted-foreground">
                Organizing lines alphabetically makes data <strong>easier to scan and find</strong>. Sorting numbers helps identify ranges and outliers. Sorting by length finds unusually short or long entries. Random sorting helps create unbiased test data.
              </p>
              <p className="text-muted-foreground">
                Example: You have 500 contact names in random order. Alphabetical sorting lets you quickly find specific names. Sorting a list of prices numerically shows the cheapest and most expensive items at a glance.
              </p>
              <p className="text-muted-foreground">
                Use cases: Organizing contact lists, sorting CSV data before import, alphabetizing bibliography entries, preparing data for diff comparison, randomizing test cases, and creating ordered file listings.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All sorting happens locally in your browser. Your text is never uploaded to servers, stored, or logged. The sorting uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567818" />
          </div>
        </div>
      </div>
    </div>
  );
}

