import { Metadata } from 'next';
import JPGToPDF from '@/components/tools/JPGToPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'JPG to PDF Converter Online Free - Convert Images to PDF',
  description: 'Free online tool to convert JPG, PNG images to PDF. Combine multiple images into one PDF document. Fast and secure.',
  keywords: 'jpg to pdf, image to pdf, png to pdf, convert images to pdf online free',
  openGraph: {
    title: 'JPG to PDF Converter Online Free',
    description: 'Convert images to PDF document. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/jpg-to-pdf',
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
    title: 'JPG to PDF Converter | RawTools',
    description: 'Convert JPG images to PDF. Multiple images to single PDF. Fast, browser-based.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/jpg-to-pdf');
}


export default function JPGToPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JPG to PDF',
    description: 'Free online tool to convert JPG, PNG images to PDF.',
    url: 'https://rawtools.io/jpg-to-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'JPG to PDF',
    description: 'How to convert JPG images to PDF',
    url: 'https://rawtools.io/jpg-to-pdf',
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
            <Breadcrumbs category="PDF Tools" toolName="JPG to PDF" currentHref="/jpg-to-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">JPG to PDF</h1>
              <p className="text-muted-foreground">Convert images to PDF document</p>
            </div>

            <JPGToPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Convert JPG to PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload one or more image files (JPG, PNG)</li>
                <li>Images will be added in the order you select them</li>
                <li>Click the "Convert to PDF" button</li>
                <li>Download your PDF document</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">JPG to PDF Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Multiple Images:</strong> Combine unlimited images in one PDF</li>
                <li><strong>Any Image Format:</strong> Supports JPG, PNG, GIF, BMP, and more</li>
                <li><strong>Automatic Page Sizing:</strong> Images fit perfectly on PDF pages</li>
                <li><strong>Custom Order:</strong> Drag and drop to reorder images</li>
                <li><strong>Original Quality:</strong> No compression or quality loss</li>
                <li><strong>Fast Processing:</strong> Create PDFs from dozens of images instantly</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Convert JPG to PDF?</h3>
              <p className="text-muted-foreground">
                JPG to PDF conversion creates <strong>professional documents from photos and scans</strong>. Scenario: You photograph 15 pages of handwritten notes with your phone. Convert all photos to one PDF—easier to email, store, and read than 15 separate image files.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Creating PDFs from scanned receipts, converting photo albums to shareable documents, assembling product catalogs from images, digitizing handwritten notes, creating portfolios from artwork photos, and preparing image-based reports for printing.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All JPG to PDF conversion happens locally in your browser. Your images never leave your device and are never uploaded to servers. The PDF is generated on your computer—complete privacy guaranteed.
              </p>
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

