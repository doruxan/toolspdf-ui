import { Metadata } from 'next';
import RotatePDF from '@/components/tools/RotatePDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
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

  const faqSchema = generateFAQSchema([
    {
      question: 'Can I rotate individual pages or only all pages at once?',
      answer: 'The tool allows you to rotate all pages uniformly or select specific pages to rotate. For selective rotation, upload your PDF, preview all pages, and select only the pages you want to rotate. Each page can be rotated independently at 90°, 180°, or 270° intervals. This is useful when scanning documents produces mixed orientations.'
    },
    {
      question: 'Will rotating a PDF reduce image quality?',
      answer: 'No. PDF rotation is a lossless operation that changes only the page orientation metadata, not the actual content. Images, text, and vector graphics retain their original resolution and quality. The file size remains nearly identical. Rotation simply tells PDF viewers to display pages at a different angle—no recompression or quality loss occurs.'
    },
    {
      question: 'What do the rotation angles mean?',
      answer: '90° clockwise rotates the page a quarter turn to the right (portrait to landscape). 180° flips the page upside down. 270° clockwise (or 90° counterclockwise) rotates a quarter turn to the left. Most scanned documents need 90° or 270° rotation when fed incorrectly into scanners. For upside-down pages, use 180°.'
    },
    {
      question: 'Can I rotate password-protected PDFs?',
      answer: 'If the PDF has a password to open it, you must unlock it first using our Unlock PDF tool. If the PDF only restricts editing but opens without a password, you can usually rotate it depending on the restrictions and browser capabilities. Owner-password-protected PDFs (editing restrictions) may work, but open-password-protected PDFs require unlocking first.'
    },
    {
      question: 'Does rotation affect PDF bookmarks and links?',
      answer: 'Internal bookmarks pointing to rotated pages remain functional, but their visual alignment may shift since the page orientation changed. Internal links to specific page areas may become misaligned. External links (URLs) are unaffected. Form fields and annotations rotate with the page but may need repositioning. For forms, verify field placement after rotation.'
    },
    {
      question: 'Why does my rotated PDF look wrong in some viewers?',
      answer: 'Some PDF viewers cache page rendering or ignore rotation metadata. Try: closing and reopening the PDF, refreshing the viewer, using a different PDF reader (Adobe Acrobat, Foxit, browser built-in viewer), or downloading the PDF again. If the issue persists, the original PDF may have conflicting rotation metadata. Re-saving the PDF usually fixes viewer inconsistencies.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
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

