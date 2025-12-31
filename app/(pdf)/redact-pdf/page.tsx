import { Metadata } from 'next';
import RedactPDF from '@/components/tools/RedactPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Redact PDF Online Free - Black Out Sensitive Information',
  description: 'Free online tool to redact and black out sensitive information in PDF files. Protect privacy by covering text and data.',
  keywords: 'redact pdf, black out pdf, censor pdf online free, hide sensitive information pdf',
  openGraph: {
    title: 'Redact PDF Online Free',
    description: 'Redact sensitive information in PDF files. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/redact-pdf',
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
    title: 'Redact PDF - Black Out Text | RawTools',
    description: 'Redact sensitive information from PDF files. Permanent black-out redaction.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/redact-pdf');
}


export default function RedactPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Redact PDF',
    description: 'Free online tool to redact and black out sensitive information in PDF files.',
    url: 'https://rawtools.io/redact-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Redact PDF',
    description: 'How to redact PDF files',
    url: 'https://rawtools.io/redact-pdf',
  }, [
    'Upload your PDF file',
    'Add redaction areas by specifying coordinates and dimensions',
    'Set page number, position (X, Y), width, and height',
    'Add multiple redactions as needed',
    'Click "Apply Redactions" and download'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="3232323232" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Redact PDF" currentHref="/redact-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Redact PDF</h1>
              <p className="text-muted-foreground">Black out sensitive information in PDF</p>
            </div>

            <RedactPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Redact PDF Documents</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>For each area to redact, specify the page number</li>
                <li>Enter X and Y coordinates (position) and width/height</li>
                <li>Click "Add Redaction" to add it to the list</li>
                <li>Repeat for all areas you want to black out</li>
                <li>Click "Apply Redactions" to process and download</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Redaction Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Permanent Removal:</strong> Text is completely deleted, not just covered</li>
                <li><strong>Multiple Redactions:</strong> Black out multiple areas in one operation</li>
                <li><strong>Precise Control:</strong> Specify exact coordinates and dimensions</li>
                <li><strong>Legal Compliance:</strong> Meets HIPAA, GDPR redaction standards</li>
                <li><strong>Irreversible:</strong> Redacted information cannot be recovered</li>
                <li><strong>All Pages:</strong> Redact across multiple pages at once</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Redact PDF Documents?</h3>
              <p className="text-muted-foreground">
                PDF redaction permanently removes <strong>sensitive information before sharing</strong>. Scenario: You&apos;re sharing a legal contract with a third party but need to hide client names and financial terms. Redact those sections—the information is permanently deleted, not just hidden with a black box.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Protecting personal information in legal documents, redacting Social Security numbers from HR files, hiding account numbers in financial statements, removing patient names from medical records (HIPAA compliance), and censoring confidential terms in contracts before public release.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF redaction happens locally in your browser. Your files never leave your device and are never uploaded to servers. The redacted PDF is generated on your computer—complete privacy guaranteed.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="3333333333" />
          </div>
        </div>
      </div>
    </div>
  );
}

