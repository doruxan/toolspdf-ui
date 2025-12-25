import { Metadata } from 'next';
import RedactPDF from '@/components/tools/RedactPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Redact PDF Online Free - Black Out Sensitive Information',
  description: 'Free online tool to redact and black out sensitive information in PDF files. Protect privacy by covering text and data.',
  keywords: 'redact pdf, black out pdf, censor pdf online free, hide sensitive information pdf',
  openGraph: {
    title: 'Redact PDF Online Free',
    description: 'Redact sensitive information in PDF files. 100% free, secure, and fast.',
    type: 'website',
  },
};

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
              
              <h3 className="text-xl font-bold text-foreground mt-8">Redaction Use Cases</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Legal Documents:</strong> Redact names, addresses, and sensitive data</li>
                <li><strong>Medical Records:</strong> Protect patient privacy (HIPAA compliance)</li>
                <li><strong>Financial:</strong> Hide account numbers and SSNs</li>
                <li><strong>Contracts:</strong> Redact confidential terms or pricing</li>
              </ul>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mt-6">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> Coordinates are in points (72 points = 1 inch). The Y-axis starts at the bottom of the page. 
                  You may need to experiment with values to find the exact position.
                </p>
              </div>
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

