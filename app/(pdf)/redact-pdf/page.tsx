import { Metadata } from 'next';
import RedactPDF from '@/components/tools/RedactPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
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

  const faqSchema = generateFAQSchema([
    {
      question: 'What is the difference between redacting and deleting text?',
      answer: 'Redaction permanently blacks out information by replacing it with solid blocks, making the original text unrecoverable. The text is removed from the file structure entirely. Deleting text leaves empty space but may leave recoverable data in metadata or file history. Highlighting or covering text with shapes is NOT redaction—the text remains underneath. True redaction is irreversible and meets legal privacy requirements.'
    },
    {
      question: 'Can redacted text be recovered from a PDF?',
      answer: 'If properly redacted, NO. Correct redaction removes the underlying text data and replaces it with black rectangles. The original information is gone from the file. However, improper "redaction" (using black highlights or boxes that overlay text) can be reversed by removing the shapes. Always verify redactions by: attempting to copy text from blacked-out areas (should copy nothing) and checking PDF properties for hidden metadata.'
    },
    {
      question: 'What should I redact in legal or sensitive documents?',
      answer: 'Common redactions include: personal identifiers (Social Security numbers, passport IDs, driver license numbers), financial information (account numbers, credit card info), protected health information (medical records per HIPAA), confidential business data (trade secrets, proprietary info), and legal privilege (attorney-client communications). Follow your organization policy or consult legal counsel for compliance with GDPR, HIPAA, or FOIA redaction requirements.'
    },
    {
      question: 'Does redacting reduce PDF file size?',
      answer: 'Usually yes, slightly. Redaction removes text data and fonts, replacing them with simple black rectangles. The file size reduction depends on how much content is redacted. Redacting 10 lines of text might reduce a 2 MB PDF by 10-50 KB. Redacting entire pages could save more. However, images are not affected—redacting text over images leaves the image intact, so size savings are minimal in image-heavy PDFs.'
    },
    {
      question: 'Can I redact images in PDFs?',
      answer: 'Yes. Redaction black boxes can cover any content: text, images, or both. To redact sensitive images (faces, signatures, photos), position redaction rectangles over the image areas. The image data beneath is permanently obscured. For precise image redaction, use coordinates to define exact boundaries. Note: large image redactions do not reduce file size significantly—the image data remains, just covered.'
    },
    {
      question: 'How do I verify redactions were applied correctly?',
      answer: 'Verification steps: 1) Attempt to select/copy text from redacted areas (should be impossible). 2) Check PDF Properties → Security → Document restrictions (should show no hidden layers). 3) Open in multiple PDF readers (Adobe, browser viewers) to confirm black boxes appear consistently. 4) Search the PDF for redacted keywords (should return no results). 5) For legal compliance, use Adobe Acrobat Pro built-in "Examine Document" feature.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
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

