import { Metadata } from 'next';
import JPGToPDF from '@/components/tools/JPGToPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'JPG to PDF Converter Online Free - Convert Images to PDF',
  description: 'Free online tool to convert JPG, PNG images to PDF. Combine multiple images into one PDF document. Fast and secure.',
  keywords: 'jpg to pdf, image to pdf, png to pdf, convert images to pdf online free',
  openGraph: {
    title: 'JPG to PDF Converter Online Free',
    description: 'Convert images to PDF document. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function JPGToPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JPG to PDF',
    description: 'Free online tool to convert JPG, PNG images to PDF.',
    url: 'https://toolspdf.io/jpg-to-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'JPG to PDF',
    description: 'How to convert JPG images to PDF',
    url: 'https://toolspdf.io/jpg-to-pdf',
  }, [
    'Upload one or more image files (JPG, PNG)',
    'Images will be added in the order you select them',
    'Click the "Convert to PDF" button',
    'Download your PDF document'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="9999999999" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <JPGToPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Convert JPG to PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload one or more image files (JPG, PNG)</li>
                <li>Images will be added in the order you select them</li>
                <li>Click the "Convert to PDF" button</li>
                <li>Download your PDF document</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Image to PDF Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Multiple Images:</strong> Combine up to 50 images in one PDF</li>
                <li><strong>Any Format:</strong> Supports JPG, PNG, and other image formats</li>
                <li><strong>Automatic Sizing:</strong> Images fit perfectly on PDF pages</li>
                <li><strong>Original Quality:</strong> No compression or quality loss</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1010101010" />
          </div>
        </div>
      </div>
    </div>
  );
}

