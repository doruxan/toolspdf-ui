import { Metadata } from 'next';
import WatermarkPDF from '@/components/tools/WatermarkPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Add Watermark to PDF Online Free - PDF Watermark Tool',
  description: 'Free online tool to add text watermark to PDF files. Protect your documents with custom watermarks. Fast and secure.',
  keywords: 'watermark pdf, add watermark to pdf online free, pdf watermark tool',
  openGraph: {
    title: 'Add Watermark to PDF Online Free',
    description: 'Add text watermark to PDF files. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function WatermarkPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Add Watermark',
    description: 'Free online tool to add text watermark to PDF files.',
    url: 'https://toolspdf.io/watermark-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Add Watermark',
    description: 'How to add watermark to PDF files',
    url: 'https://toolspdf.io/watermark-pdf',
  }, [
    'Upload your PDF file',
    'Enter your watermark text',
    'Adjust opacity using the slider',
    'Click "Add Watermark" and download'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1818181818" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <WatermarkPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Add Watermark to PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Enter your watermark text</li>
                <li>Adjust opacity using the slider</li>
                <li>Click "Add Watermark" and download</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Watermark Uses</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Copyright Protection:</strong> Mark documents as your property</li>
                <li><strong>Draft Marking:</strong> Label documents as drafts or confidential</li>
                <li><strong>Branding:</strong> Add company name or logo</li>
                <li><strong>All Pages:</strong> Watermark appears on every page</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1919191919" />
          </div>
        </div>
      </div>
    </div>
  );
}

