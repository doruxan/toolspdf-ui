import { Metadata } from 'next';
import AddPageNumbers from '@/components/tools/AddPageNumbers';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Add Page Numbers to PDF Online Free - PDF Page Numbering',
  description: 'Free online tool to add page numbers to PDF files. Choose position, format, and starting number. Fast and easy.',
  keywords: 'add page numbers to pdf, pdf page numbering online free, number pdf pages',
  openGraph: {
    title: 'Add Page Numbers to PDF Online Free',
    description: 'Add page numbers to PDF files. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function AddPageNumbersPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Add Page Numbers',
    description: 'Free online tool to add page numbers to PDF files.',
    url: 'https://rawtools.io/add-page-numbers',
  });

  const howToSchema = generateHowToSchema({
    name: 'Add Page Numbers',
    description: 'How to add page numbers to PDF files',
    url: 'https://rawtools.io/add-page-numbers',
  }, [
    'Upload your PDF file',
    'Choose page number position (top/bottom, left/center/right)',
    'Select format (numbers only, "Page X", or "Page X of Y")',
    'Click "Add Page Numbers" and download'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="2424242424" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <AddPageNumbers />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Add Page Numbers to PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Select where to place page numbers (top or bottom, alignment)</li>
                <li>Choose number format (simple numbers, "Page X", etc.)</li>
                <li>Adjust font size and starting page number if needed</li>
                <li>Click "Add Page Numbers" and download your numbered PDF</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Page Numbering Options</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Position:</strong> 6 positions available (top/bottom × left/center/right)</li>
                <li><strong>Format:</strong> Simple numbers, "Page X", or "Page X of Y"</li>
                <li><strong>Custom Start:</strong> Start numbering from any number</li>
                <li><strong>Font Size:</strong> Adjustable from 8pt to 24pt</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2525252525" />
          </div>
        </div>
      </div>
    </div>
  );
}

