import { Metadata } from 'next';
import SplitPDF from '@/components/tools/SplitPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Split PDF Online Free - Extract Pages from PDF',
  description: 'Free online tool to split PDF files into separate documents or extract specific pages. Fast, secure, and works in your browser.',
  keywords: 'split pdf, extract pdf pages, divide pdf, pdf splitter online free',
  openGraph: {
    title: 'Split PDF Online Free - Extract Pages',
    description: 'Split PDF files into separate documents. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/split-pdf',
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
    title: 'Split PDF Online Free | RawTools',
    description: 'Split PDF files by page ranges or extract specific pages. Fast, secure, browser-based.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/split-pdf');
}


export default function SplitPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Split PDF',
    description: 'Free online tool to split PDF files into separate documents or extract specific pages.',
    url: 'https://rawtools.io/split-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Split PDF',
    description: 'How to split PDF files into separate documents',
    url: 'https://rawtools.io/split-pdf',
  }, [
    'Upload your PDF file',
    'Choose to split into single pages or extract specific pages',
    'For specific pages, enter page numbers (e.g., 1,3,5)',
    'Download your split PDF files'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="3333333333" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Split PDF" currentHref="/split-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Split PDF</h1>
              <p className="text-muted-foreground">Extract pages or split into separate documents</p>
            </div>

            <SplitPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Split PDF Files</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Choose to split into single pages or extract specific pages</li>
                <li>For specific pages, enter page numbers (e.g., 1,3,5)</li>
                <li>Download your split PDF files</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Splitter Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Split All Pages:</strong> Convert each page into a separate PDF file</li>
                <li><strong>Extract Specific Pages:</strong> Choose exact pages to extract (e.g., 1,3,5-10)</li>
                <li><strong>Page Range Support:</strong> Use ranges like "1-5,8,10-12" for complex extractions</li>
                <li><strong>Preview Mode:</strong> See page thumbnails before splitting</li>
                <li><strong>Batch Download:</strong> Download all pages at once</li>
                <li><strong>No Quality Loss:</strong> Original quality preserved</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Split PDF Files?</h3>
              <p className="text-muted-foreground">
                PDF splitting is essential for <strong>extracting specific pages or breaking large documents into manageable chunks</strong>. Scenario: You receive a 200-page scanned contract but only need pages 45-52 (the pricing schedule). Split extracts just those 8 pages instead of sharing the entire document.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Extracting individual chapters from eBooks, separating exam questions from answer keys, isolating specific invoices from monthly reports, breaking presentation decks into individual slides, extracting signed pages from multi-page agreements, and creating separate files for different document sections.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF splitting happens locally in your browser. Your files never leave your device, are never uploaded to servers, and are never stored. The split PDFs are generated on your computer and downloaded directly—your documents remain completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="4444444444" />
          </div>
        </div>
      </div>
    </div>
  );
}

