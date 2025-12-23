import { Metadata } from 'next';
import SplitPDF from '@/components/tools/SplitPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Split PDF Online Free - Extract Pages from PDF',
  description: 'Free online tool to split PDF files into separate documents or extract specific pages. Fast, secure, and works in your browser.',
  keywords: 'split pdf, extract pdf pages, divide pdf, pdf splitter online free',
  openGraph: {
    title: 'Split PDF Online Free - Extract Pages',
    description: 'Split PDF files into separate documents. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function SplitPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Split PDF',
    description: 'Free online tool to split PDF files into separate documents or extract specific pages.',
    url: 'https://toolspdf.io/split-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Split PDF',
    description: 'How to split PDF files into separate documents',
    url: 'https://toolspdf.io/split-pdf',
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
            <SplitPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Split PDF Files</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Choose to split into single pages or extract specific pages</li>
                <li>For specific pages, enter page numbers (e.g., 1,3,5)</li>
                <li>Download your split PDF files</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Split PDF Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Split All Pages:</strong> Convert each page to a separate PDF</li>
                <li><strong>Extract Pages:</strong> Select specific pages to extract</li>
                <li><strong>Batch Download:</strong> Download all pages at once</li>
                <li><strong>No Quality Loss:</strong> Original quality preserved</li>
              </ul>
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

