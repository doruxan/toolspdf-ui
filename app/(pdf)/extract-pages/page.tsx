import { Metadata } from 'next';
import ExtractPages from '@/components/tools/ExtractPages';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Extract PDF Pages Online Free - Extract Specific Pages from PDF',
  description: 'Free online tool to extract specific pages from PDF files. Create a new PDF with only selected pages. Fast and secure.',
  keywords: 'extract pdf pages, extract pages from pdf online free, pdf page extractor',
  openGraph: {
    title: 'Extract PDF Pages Online Free',
    description: 'Extract specific pages from PDF files. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function ExtractPagesPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Extract PDF Pages',
    description: 'Free online tool to extract specific pages from PDF files.',
    url: 'https://rawtools.io/extract-pages',
  });

  const howToSchema = generateHowToSchema({
    name: 'Extract PDF Pages',
    description: 'How to extract pages from PDF files',
    url: 'https://rawtools.io/extract-pages',
  }, [
    'Upload your PDF file',
    'Enter page numbers to extract (e.g., 1,3,5-7)',
    'Click the "Extract Pages" button',
    'Download your new PDF with extracted pages'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="2222222222" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <ExtractPages />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Extract Pages from PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Specify which pages to extract</li>
                <li>Use commas for individual pages or hyphens for ranges</li>
                <li>Download the new PDF containing only extracted pages</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Extract vs Split</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Extract:</strong> Create one PDF with specific pages you choose</li>
                <li><strong>Split:</strong> Separate PDF into multiple files</li>
                <li><strong>Flexible:</strong> Extract non-consecutive pages (e.g., 1,5,7,10)</li>
                <li><strong>Maintain Order:</strong> Pages appear in the order specified</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2323232323" />
          </div>
        </div>
      </div>
    </div>
  );
}

