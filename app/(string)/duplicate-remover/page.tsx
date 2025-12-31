import { Metadata } from 'next';
import DuplicateRemover from '@/components/tools/string/DuplicateRemover';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Duplicate Line Remover - Remove Duplicate Lines | RawTools',
  description: 'Remove duplicate lines from text. Keep first, last, or remove all occurrences. Fast, free, browser-based duplicate removal tool. 100% free.',
  keywords: 'duplicate remover, remove duplicates, duplicate line remover, unique lines, deduplicate text',
  openGraph: {
    title: 'Duplicate Line Remover - Remove Duplicate Lines',
    description: 'Remove duplicate lines from text. Keep first, last, or remove all. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/duplicate-remover',
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
    title: 'Duplicate Line Remover | RawTools',
    description: 'Remove duplicate lines from text. Keep first, last, or remove all occurrences.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/duplicate-remover');
}

export default function DuplicateRemoverPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Duplicate Line Remover',
    description: 'Free online tool to remove duplicate lines from text. Options to keep first occurrence, last occurrence, or remove all duplicates.',
    url: 'https://rawtools.io/duplicate-remover',
  });

  const howToSchema = generateHowToSchema({
    name: 'Duplicate Line Remover',
    description: 'How to remove duplicate lines from text',
    url: 'https://rawtools.io/duplicate-remover',
  }, [
    'Paste text with duplicate lines',
    'Choose removal mode (keep first, keep last, remove all)',
    'View deduplicated output with count of removed lines',
    'Copy the unique lines'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567912" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Duplicate Line Remover" currentHref="/duplicate-remover" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Duplicate Line Remover</h1>
              <p className="text-muted-foreground">Remove duplicate lines and keep only unique entries</p>
            </div>

            <DuplicateRemover />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Remove Duplicate Lines</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste text with duplicate lines</li>
                <li>Choose removal mode (keep first, keep last, remove all)</li>
                <li>View deduplicated output with count of removed lines</li>
                <li>Copy the unique lines</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Duplicate Remover Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Keep First Occurrence:</strong> Preserve the first instance of each duplicate</li>
                <li><strong>Keep Last Occurrence:</strong> Preserve the last instance of each duplicate</li>
                <li><strong>Remove All Duplicates:</strong> Delete all lines that appear more than once</li>
                <li><strong>Case-Sensitive Options:</strong> Control case handling</li>
                <li><strong>Shows Removal Count:</strong> See how many duplicates were found</li>
                <li><strong>100% Free:</strong> No limits on text length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Remove Duplicates?</h3>
              <p className="text-muted-foreground">
                Duplicate lines create <strong>data quality issues</strong>. In contact lists, duplicate emails cause double-sends and annoy recipients. In code, duplicate imports waste space and slow compilation. In datasets, duplicates skew analysis results.
              </p>
              <p className="text-muted-foreground">
                Example: You scraped 1000 product listings but many are duplicates. Removing duplicates before importing to your database prevents constraint violations and ensures each product appears once. Or you have a list of 500 email addresses with 50 duplicates—cleaning prevents sending the same newsletter twice to the same person.
              </p>
              <p className="text-muted-foreground">
                Use cases: Cleaning scraped data, deduplicating email lists, preparing unique values for databases, consolidating log files, ensuring dataset uniqueness before analysis, and removing duplicate entries from CSV imports.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All duplicate removal happens locally in your browser. Your text is never uploaded to servers, stored, or logged. The processing uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567819" />
          </div>
        </div>
      </div>
    </div>
  );
}

