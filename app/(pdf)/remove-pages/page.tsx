import { Metadata } from 'next';
import RemovePages from '@/components/tools/RemovePages';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Remove PDF Pages Online Free - Delete Pages from PDF',
  description: 'Free online tool to remove unwanted pages from PDF files. Delete specific pages quickly and securely in your browser.',
  keywords: 'remove pdf pages, delete pdf pages, remove pages from pdf online free',
  openGraph: {
    title: 'Remove PDF Pages Online Free',
    description: 'Delete specific pages from PDF files. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/remove-pages',
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
    title: 'Remove Pages from PDF | RawTools',
    description: 'Delete specific pages from PDF files. Fast, secure, browser-based removal.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/remove-pages');
}


export default function RemovePagesPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Remove PDF Pages',
    description: 'Free online tool to remove unwanted pages from PDF files.',
    url: 'https://rawtools.io/remove-pages',
  });

  const howToSchema = generateHowToSchema({
    name: 'Remove PDF Pages',
    description: 'How to remove pages from PDF files',
    url: 'https://rawtools.io/remove-pages',
  }, [
    'Upload your PDF file',
    'Enter page numbers to remove (e.g., 1,3,5-7)',
    'Click the "Remove Pages" button',
    'Download your modified PDF file'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="2020202020" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Remove Pages" currentHref="/remove-pages" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Remove Pages</h1>
              <p className="text-muted-foreground">Delete specific pages from your PDF</p>
            </div>

            <RemovePages />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Remove Pages from PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file by clicking or dragging</li>
                <li>Enter the page numbers you want to remove</li>
                <li>Use commas for individual pages (1,3,5) or hyphens for ranges (5-10)</li>
                <li>Click "Remove Pages" and download the result</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Page Removal Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Specific Pages:</strong> Remove exact pages (e.g., 1,3,5)</li>
                <li><strong>Page Ranges:</strong> Delete ranges (e.g., 10-20)</li>
                <li><strong>Blank Page Removal:</strong> Clean up scanned documents</li>
                <li><strong>Fast Processing:</strong> Remove pages from large PDFs instantly</li>
                <li><strong>No Quality Loss:</strong> Remaining pages unchanged</li>
                <li><strong>File Size Reduction:</strong> Smaller files after removal</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Remove PDF Pages?</h3>
              <p className="text-muted-foreground">
                Page removal creates <strong>cleaner documents by deleting unwanted content</strong>. Scenario: You scan a 50-page document but pages 12, 15, and 23 are blank or duplicates. Remove those 3 pages to create a clean 47-page PDF without rescanning everything.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Removing blank pages from scans, deleting duplicate pages, removing advertisements from downloaded PDFs, cleaning up fax transmissions, deleting cover pages before archiving, and removing sensitive pages before sharing documents.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All page removal happens locally in your browser. Your files never leave your device and are never uploaded to servers. The cleaned PDF is generated on your computer—complete privacy guaranteed.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2121212121" />
          </div>
        </div>
      </div>
    </div>
  );
}

