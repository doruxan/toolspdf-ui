import { Metadata } from 'next';
import RotatePDF from '@/components/tools/RotatePDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Rotate PDF Online Free - Rotate PDF Pages 90, 180, 270 Degrees',
  description: 'Free online tool to rotate PDF pages. Rotate all pages 90, 180, or 270 degrees. Fast, secure, and works in your browser.',
  keywords: 'rotate pdf, rotate pdf pages online free, flip pdf, turn pdf',
  openGraph: {
    title: 'Rotate PDF Online Free',
    description: 'Rotate PDF pages 90, 180, or 270 degrees. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/rotate-pdf',
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
    title: 'Rotate PDF Pages | RawTools',
    description: 'Rotate PDF pages 90, 180, or 270 degrees. Fast, browser-based rotation.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/rotate-pdf');
}


export default function RotatePDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Rotate PDF',
    description: 'Free online tool to rotate PDF pages.',
    url: 'https://rawtools.io/rotate-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Rotate PDF',
    description: 'How to rotate PDF pages',
    url: 'https://rawtools.io/rotate-pdf',
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
            <Breadcrumbs category="PDF Tools" toolName="Rotate PDF" currentHref="/rotate-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Rotate PDF</h1>
              <p className="text-muted-foreground">Rotate pages in your PDF document</p>
            </div>

            <RotatePDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Rotate PDF Pages</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Select rotation angle (90°, 180°, or 270°)</li>
                <li>Click the "Rotate PDF" button</li>
                <li>Download your rotated PDF file</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Rotation Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>90° Clockwise:</strong> Rotate pages to the right (portrait to landscape)</li>
                <li><strong>180° Flip:</strong> Turn pages upside down</li>
                <li><strong>270° Counter-clockwise:</strong> Rotate pages to the left</li>
                <li><strong>All Pages at Once:</strong> Rotation applies to entire document</li>
                <li><strong>Quality Preserved:</strong> No degradation in image or text quality</li>
                <li><strong>Fast Processing:</strong> Instant rotation without re-encoding</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Rotate PDF Pages?</h3>
              <p className="text-muted-foreground">
                PDF rotation fixes <strong>orientation issues from scanning or mobile photos</strong>. Scenario: You scan a landscape document (like a wide spreadsheet) but the scanner saves it in portrait mode. The PDF displays sideways—rotate 90° to fix the orientation permanently.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Fixing scanned documents with wrong orientation, correcting mobile phone photos saved as PDFs, adjusting landscape pages mixed with portrait pages, preparing documents for printing in correct orientation, and fixing upside-down pages from duplex scanning errors.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF rotation happens locally in your browser. Your files never leave your device and are never uploaded to servers. The rotated PDF is generated on your computer—complete privacy guaranteed.
              </p>
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

