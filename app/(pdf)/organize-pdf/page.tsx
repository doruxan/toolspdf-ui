import { Metadata } from 'next';
import OrganizePDF from '@/components/tools/OrganizePDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Organize PDF Pages Online Free - Reorder PDF Pages',
  description: 'Free online tool to reorder and organize PDF pages. Rearrange pages in any order or reverse all pages. Fast and secure.',
  keywords: 'organize pdf, reorder pdf pages, rearrange pdf pages online free, reverse pdf',
  openGraph: {
    title: 'Organize PDF Pages Online Free',
    description: 'Reorder and organize PDF pages. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function OrganizePDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Organize PDF',
    description: 'Free online tool to reorder and organize PDF pages.',
    url: 'https://rawtools.io/organize-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Organize PDF',
    description: 'How to organize and reorder PDF pages',
    url: 'https://rawtools.io/organize-pdf',
  }, [
    'Upload your PDF file',
    'Enter the new page order (e.g., 3, 1, 2, 4, 5)',
    'Or click "Reverse All" to reverse the entire document',
    'Download your reorganized PDF'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="2626262626" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <OrganizePDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Organize PDF Pages</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Enter your desired page order separated by commas</li>
                <li>Example: To move page 3 to the front, enter "3, 1, 2, 4, 5..."</li>
                <li>Or use "Reverse All" button to flip the entire document</li>
                <li>Download your reorganized PDF</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Use Cases</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Fix Scanning Errors:</strong> Correct pages scanned in wrong order</li>
                <li><strong>Reverse Documents:</strong> Flip entire documents with one click</li>
                <li><strong>Custom Order:</strong> Arrange pages any way you want</li>
                <li><strong>Presentations:</strong> Reorder slides for different audiences</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2727272727" />
          </div>
        </div>
      </div>
    </div>
  );
}

