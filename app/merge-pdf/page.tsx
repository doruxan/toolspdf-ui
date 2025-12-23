import { Metadata } from 'next';
import MergePDF from '@/components/tools/MergePDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Merge PDF Online Free - Combine Multiple PDFs into One',
  description: 'Free online tool to merge multiple PDF files into a single document. Fast, secure, and works directly in your browser. No file size limits.',
  keywords: 'merge pdf, combine pdf, join pdf, pdf merger online free',
  openGraph: {
    title: 'Merge PDF Online Free - Combine Multiple PDFs',
    description: 'Merge multiple PDF files into one document. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function MergePDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Merge PDF',
    description: 'Free online tool to merge multiple PDF files into a single document.',
    url: 'https://toolspdf.io/merge-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Merge PDF',
    description: 'How to merge multiple PDF files into a single document',
    url: 'https://toolspdf.io/merge-pdf',
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
            <MergePDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Merge PDF Files Online</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Click the upload area or drag and drop your PDF files</li>
                <li>Select at least 2 PDF files you want to combine</li>
                <li>Click the "Merge PDF Files" button</li>
                <li>Download your merged PDF file</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our PDF Merger?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Secure:</strong> Files are processed locally in your browser</li>
                <li><strong>Fast:</strong> Instant merging without server uploads</li>
                <li><strong>No Limits:</strong> Merge as many PDFs as you need</li>
              </ul>
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

