import { Metadata } from 'next';
import CropPDF from '@/components/tools/CropPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Crop PDF Online Free - Adjust PDF Page Margins',
  description: 'Free online tool to crop PDF pages and adjust margins. Remove white space and trim PDF pages. Fast and secure.',
  keywords: 'crop pdf, trim pdf, adjust pdf margins online free, remove white space pdf',
  openGraph: {
    title: 'Crop PDF Online Free',
    description: 'Crop PDF pages and adjust margins. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function CropPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Crop PDF',
    description: 'Free online tool to crop PDF pages and adjust margins.',
    url: 'https://toolspdf.io/crop-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Crop PDF',
    description: 'How to crop PDF pages',
    url: 'https://toolspdf.io/crop-pdf',
  }, [
    'Upload your PDF file',
    'Set crop margins for top, right, bottom, and left',
    'Choose unit (millimeters, inches, or points)',
    'Click "Crop PDF" and download'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="3030303030" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <CropPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Crop PDF Pages</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Enter margin values for top, right, bottom, and left sides</li>
                <li>Select your preferred unit (mm, inches, or points)</li>
                <li>Margins will be applied to all pages</li>
                <li>Click "Crop PDF" and download the result</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Crop PDFs?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Remove White Space:</strong> Eliminate excessive margins</li>
                <li><strong>Better Fit:</strong> Adjust pages to fit specific dimensions</li>
                <li><strong>Professional Look:</strong> Create consistent margins</li>
                <li><strong>Printing:</strong> Optimize for printing requirements</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="3131313131" />
          </div>
        </div>
      </div>
    </div>
  );
}

