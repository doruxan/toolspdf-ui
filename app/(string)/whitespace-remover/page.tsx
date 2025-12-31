import { Metadata } from 'next';
import WhitespaceRemover from '@/components/tools/string/WhitespaceRemover';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Whitespace Remover - Remove Extra Spaces Online | RawTools',
  description: 'Remove extra spaces, trim, normalize whitespace online. Fast, free, browser-based whitespace removal tool with multiple modes. 100% free.',
  keywords: 'whitespace remover, remove spaces, trim whitespace, normalize whitespace, remove extra spaces',
  openGraph: {
    title: 'Whitespace Remover - Remove Extra Spaces Online',
    description: 'Remove extra spaces and normalize whitespace. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/whitespace-remover',
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
    title: 'Whitespace Remover | RawTools',
    description: 'Remove extra spaces, tabs, and line breaks. Clean up text formatting instantly.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/whitespace-remover');
}

export default function WhitespaceRemoverPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Whitespace Remover',
    description: 'Free online tool to remove extra spaces, trim, normalize, or remove all whitespace from text. Multiple modes for different cleaning needs.',
    url: 'https://rawtools.io/whitespace-remover',
  });

  const howToSchema = generateHowToSchema({
    name: 'Whitespace Remover',
    description: 'How to remove extra spaces and whitespace from text',
    url: 'https://rawtools.io/whitespace-remover',
  }, [
    'Paste text with extra whitespace into the input field',
    'Select cleaning mode (remove all, normalize, trim, etc.)',
    'View the cleaned text automatically',
    'Copy the whitespace-cleaned output'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567930" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Whitespace Remover" currentHref="/whitespace-remover" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Whitespace Remover</h1>
              <p className="text-muted-foreground">Remove extra spaces, trim lines, normalize, or remove all whitespace</p>
            </div>

            <WhitespaceRemover />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Remove Whitespace</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste text with extra whitespace into the input field</li>
                <li>Select cleaning mode (remove all, normalize, trim, etc.)</li>
                <li>View the cleaned text automatically</li>
                <li>Copy the whitespace-cleaned output</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Whitespace Remover Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Remove All Whitespace:</strong> Strip all spaces, tabs, and line breaks</li>
                <li><strong>Normalize Whitespace:</strong> Collapse multiple spaces into single spaces</li>
                <li><strong>Trim Lines:</strong> Remove leading and trailing whitespace from each line</li>
                <li><strong>Remove Empty Lines:</strong> Delete blank lines from multi-line text</li>
                <li><strong>Real-Time Processing:</strong> See results instantly as you type</li>
                <li><strong>100% Free:</strong> No limits on text length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">When to Clean Whitespace</h3>
              <p className="text-muted-foreground">
                Extra whitespace often appears when copying text from PDFs, web pages, or formatted documents. Multiple spaces, tabs, and empty lines create <strong>inconsistent formatting</strong> that's problematic for data processing and code.
              </p>
              <p className="text-muted-foreground">
                Normalizing whitespace is essential before importing data into databases or spreadsheets. "John  Smith" (two spaces) and "John Smith" (one space) are technically different strings, which causes duplicate detection to fail. Removing all whitespace is useful for comparing strings or generating compact identifiers.
              </p>
              <p className="text-muted-foreground">
                Use cases: Cleaning copy-pasted text from PDFs, preparing CSV data for import, normalizing user input before database storage, removing formatting artifacts from web scraping, and creating compact string representations for comparison or hashing.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All whitespace cleaning happens locally in your browser. Your text is never uploaded to servers, stored, or logged. The processing uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567828" />
          </div>
        </div>
      </div>
    </div>
  );
}

