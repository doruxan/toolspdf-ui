import { Metadata } from 'next';
import FindReplace from '@/components/tools/string/FindReplace';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Find and Replace - Text Search & Replace Tool | RawTools',
  description: 'Find and replace text with regex support, case-sensitive search, and whole word matching. Fast, free, browser-based text manipulation. 100% free.',
  keywords: 'find and replace, text search, regex replace, search and replace, text editor, bulk replace',
  openGraph: {
    title: 'Find and Replace - Text Search & Replace Tool',
    description: 'Find and replace text with regex support. Fast, free, browser-based text manipulation.',
    type: 'website',
  
    url: 'https://rawtools.io/find-replace',
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
    title: 'Find & Replace Tool | RawTools',
    description: 'Find and replace text with regex support. Case-sensitive options and match highlighting.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/find-replace');
}

export default function FindReplacePage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Find and Replace Tool',
    description: 'Free online tool to find and replace text. Features regex support, case-sensitive search, whole word matching, and occurrence counting.',
    url: 'https://rawtools.io/find-replace',
  });

  const howToSchema = generateHowToSchema({
    name: 'Find and Replace Tool',
    description: 'How to find and replace text',
    url: 'https://rawtools.io/find-replace',
  }, [
    'Paste text into the input area',
    'Enter search term and replacement text',
    'Choose options: case-sensitive, whole word, or regex',
    'Click replace to perform bulk text replacement'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567908" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Find & Replace" currentHref="/find-replace" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Find & Replace Tool</h1>
              <p className="text-muted-foreground">Search and replace text with regex support and advanced options</p>
            </div>

            <FindReplace />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Find and Replace Text</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste text into the input area</li>
                <li>Enter search term and replacement text</li>
                <li>Choose options: case-sensitive, whole word, or regex</li>
                <li>Click replace to perform bulk text replacement</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Find & Replace Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Regex Support:</strong> Use patterns like \d+ to find numbers</li>
                <li><strong>Case-Sensitive Search:</strong> Match exact capitalization</li>
                <li><strong>Whole Word Matching:</strong> Find complete words only (avoid partial matches)</li>
                <li><strong>Occurrence Counting:</strong> See how many matches before replacing</li>
                <li><strong>Replace All:</strong> Bulk replacement in one click</li>
                <li><strong>Highlight Matches:</strong> Preview what will be replaced</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">When to Use Find & Replace</h3>
              <p className="text-muted-foreground">
                Find and replace is essential for <strong>bulk text editing</strong>. Instead of manually changing 200 instances of "colour" to "color", find-and-replace does it instantly. This saves hours on repetitive edits.
              </p>
              <p className="text-muted-foreground">
                Regex mode enables powerful pattern-based replacement. Example: Replace all 10-digit phone numbers with a formatted version, or convert dates from MM/DD/YYYY to YYYY-MM-DD format. Whole word matching prevents accidental partial replacements (replacing "cat" won't affect "category").
              </p>
              <p className="text-muted-foreground">
                Use cases: Converting British to American spelling across documents, updating brand names in marketing copy, reformatting data exports, sanitizing sensitive information before sharing, and refactoring code variable names across large files.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All find and replace operations happen locally in your browser. Your text is never uploaded to servers, stored, or logged. The processing uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567817" />
          </div>
        </div>
      </div>
    </div>
  );
}

