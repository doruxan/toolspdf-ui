import { Metadata } from 'next';
import RotatePDF from '@/components/tools/RotatePDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Rotate PDF Online Free - Rotate PDF Pages 90, 180, 270 Degrees',
  description: 'Free online tool to rotate PDF pages. Rotate all pages 90, 180, or 270 degrees. Fast, secure, and works in your browser.',
  keywords: 'rotate pdf, rotate pdf pages online free, flip pdf, turn pdf',
  openGraph: {
    title: 'Rotate PDF Online Free',
    description: 'Rotate PDF pages 90, 180, or 270 degrees. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function RotatePDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Rotate PDF',
    description: 'Free online tool to rotate PDF pages.',
    url: 'https://toolspdf.io/rotate-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Rotate PDF',
    description: 'How to rotate PDF pages',
    url: 'https://toolspdf.io/rotate-pdf',
  }, [
    'Upload your PDF file',
    'Select rotation angle (90°, 180°, or 270°)',
    'Click the "Rotate PDF" button',
    'Download your rotated PDF file'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1212121212" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <RotatePDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Rotate PDF Pages</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Select rotation angle (90°, 180°, or 270°)</li>
                <li>Click the "Rotate PDF" button</li>
                <li>Download your rotated PDF file</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Rotation Options</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>90° Clockwise:</strong> Rotate pages to the right</li>
                <li><strong>180°:</strong> Flip pages upside down</li>
                <li><strong>270° (90° Counter-clockwise):</strong> Rotate pages to the left</li>
                <li><strong>All Pages:</strong> Rotation applies to all pages</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1313131313" />
          </div>
        </div>
      </div>
    </div>
  );
}

