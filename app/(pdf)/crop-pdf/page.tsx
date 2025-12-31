import { Metadata } from 'next';
import CropPDF from '@/components/tools/CropPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Crop PDF Online Free - Adjust PDF Page Margins',
  description: 'Free online tool to crop PDF pages and adjust margins. Remove white space and trim PDF pages. Fast and secure.',
  keywords: 'crop pdf, trim pdf, adjust pdf margins online free, remove white space pdf',
  openGraph: {
    title: 'Crop PDF Online Free',
    description: 'Crop PDF pages and adjust margins. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/crop-pdf',
    siteName: 'RawTools',
    images: [{
      url: '/og-image.svg',
      width: 1200,
      height: 630,
      alt: 'RawTools Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crop PDF Pages | RawTools',
    description: 'Crop PDF pages to remove margins and unwanted areas. Fast, browser-based cropping.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/crop-pdf');
}


export default function CropPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Crop PDF',
    description: 'Free online tool to crop PDF pages and adjust margins.',
    url: 'https://rawtools.io/crop-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Crop PDF',
    description: 'How to crop PDF pages',
    url: 'https://rawtools.io/crop-pdf',
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
            <Breadcrumbs category="PDF Tools" toolName="Crop PDF" currentHref="/crop-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Crop PDF</h1>
              <p className="text-muted-foreground">Adjust margins and crop PDF pages</p>
            </div>

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
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Cropping Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Custom Margins:</strong> Set top, right, bottom, left margins independently</li>
                <li><strong>Multiple Units:</strong> Work in millimeters, inches, or points</li>
                <li><strong>All Pages:</strong> Crop all pages uniformly</li>
                <li><strong>Remove White Space:</strong> Eliminate excessive margins</li>
                <li><strong>No Quality Loss:</strong> Content quality preserved</li>
                <li><strong>Fast Processing:</strong> Crop large PDFs instantly</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Crop PDF Pages?</h3>
              <p className="text-muted-foreground">
                PDF cropping removes <strong>unwanted margins and white space</strong>. Scenario: You scan documents with a large-format scanner that adds 2-inch margins on all sides. The content is small and hard to read. Crop those margins to make the content fill the page—much easier to read on screens and tablets.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Removing excessive white space from scanned documents, adjusting pages for specific print sizes, creating consistent margins across mixed documents, optimizing PDFs for mobile viewing, and preparing documents for professional printing with bleed requirements.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF cropping happens locally in your browser. Your files never leave your device and are never uploaded to servers. The cropped PDF is generated on your computer—complete privacy guaranteed.
              </p>
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

