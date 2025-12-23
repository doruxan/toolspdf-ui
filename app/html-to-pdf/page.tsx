import { Metadata } from 'next';
import HTMLToPDF from '@/components/tools/HTMLToPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'HTML to PDF Converter Online Free - Convert HTML to PDF',
  description: 'Free online tool to convert HTML or text to PDF. Paste your HTML code or plain text and create a PDF instantly.',
  keywords: 'html to pdf, convert html to pdf online free, text to pdf',
  openGraph: {
    title: 'HTML to PDF Converter Online Free',
    description: 'Convert HTML or text to PDF. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function HTMLToPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'HTML to PDF',
    description: 'Free online tool to convert HTML or text to PDF.',
    url: 'https://toolspdf.io/html-to-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'HTML to PDF',
    description: 'How to convert HTML to PDF',
    url: 'https://toolspdf.io/html-to-pdf',
  }, [
    'Paste your HTML code or plain text',
    'Choose page size (A4 or Letter) and orientation',
    'Adjust font size if needed',
    'Click "Convert to PDF" and download'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="2828282828" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <HTMLToPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Convert HTML to PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste your HTML code or plain text into the text area</li>
                <li>Select page size (A4 or Letter)</li>
                <li>Choose orientation (Portrait or Landscape)</li>
                <li>Adjust font size for readability</li>
                <li>Click "Convert to PDF" to download your document</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Perfect For</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Documentation:</strong> Convert documentation to PDF format</li>
                <li><strong>Reports:</strong> Turn text reports into shareable PDFs</li>
                <li><strong>Notes:</strong> Save notes as PDF documents</li>
                <li><strong>Web Content:</strong> Archive web content as PDF</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2929292929" />
          </div>
        </div>
      </div>
    </div>
  );
}

