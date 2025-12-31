import { Metadata } from 'next';
import MergePDF from '@/components/tools/MergePDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Merge PDF Online Free - Combine Multiple PDFs into One',
  description: 'Free online tool to merge multiple PDF files into a single document. Fast, secure, and works directly in your browser. No file size limits.',
  keywords: 'merge pdf, combine pdf, join pdf, pdf merger online free',
  openGraph: {
    title: 'Merge PDF Online Free - Combine Multiple PDFs',
    description: 'Merge multiple PDF files into one document. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/merge-pdf',
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
    title: 'Merge PDF Online Free | RawTools',
    description: 'Combine multiple PDF files into one document. Fast, secure, browser-based merging.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/merge-pdf');
}


export default function MergePDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Merge PDF',
    description: 'Free online tool to merge multiple PDF files into a single document.',
    url: 'https://rawtools.io/merge-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Merge PDF',
    description: 'How to merge multiple PDF files into a single document',
    url: 'https://rawtools.io/merge-pdf',
  }, [
    'Click the upload area or drag and drop your PDF files',
    'Select at least 2 PDF files you want to combine',
    'Click the "Merge PDF Files" button',
    'Download your merged PDF file'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1111111111" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Merge PDF" currentHref="/merge-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Merge PDF</h1>
              <p className="text-muted-foreground">Combine multiple PDF files into one document</p>
            </div>

            <MergePDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Merge PDF Files Online</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Click the upload area or drag and drop your PDF files</li>
                <li>Select at least 2 PDF files you want to combine</li>
                <li>Click the "Merge PDF Files" button</li>
                <li>Download your merged PDF file</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Merger Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs, subscriptions, or file limits</li>
                <li><strong>Browser-Based:</strong> No software installation required</li>
                <li><strong>Drag & Drop:</strong> Easy file upload with visual feedback</li>
                <li><strong>Unlimited Files:</strong> Merge 2, 10, or 100+ PDFs at once</li>
                <li><strong>Preserve Quality:</strong> Original PDF quality maintained</li>
                <li><strong>Fast Processing:</strong> Instant merging using local processing</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Merge PDF Files?</h3>
              <p className="text-muted-foreground">
                PDF merging is essential for <strong>combining multiple documents into a single file</strong>. Common scenario: You have a signed contract (3 pages), supporting documents (8 pages), and attachments (5 pages)—instead of sending 16 separate files, merge them into one professional document.
              </p>
              <p className="text-muted-foreground">
                Use cases: Combining invoice pages with receipts, merging chapters of a report, creating presentation handouts from multiple sources, consolidating scanned documents, assembling legal documents with exhibits, and preparing application packages with multiple forms.
              </p>
              <p className="text-muted-foreground">
                Real example: HR departments merge offer letters, NDAs, and benefit summaries into one onboarding packet. Instead of emailing 6 separate PDFs to new hires, they send one comprehensive 18-page document—easier to manage, harder to lose pages.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF merging happens locally in your browser using JavaScript. Your files are never uploaded to servers, stored in databases, or transmitted over the internet. The merged PDF is generated on your device and downloaded directly—complete privacy guaranteed.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2222222222" />
          </div>
        </div>
      </div>
    </div>
  );
}

