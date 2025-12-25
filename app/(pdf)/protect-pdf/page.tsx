import { Metadata } from 'next';
import ProtectPDF from '@/components/tools/ProtectPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Protect PDF Online Free - Add Password to PDF',
  description: 'Free online tool to add password protection to PDF files. Secure your PDFs with encryption. Fast and works in your browser.',
  keywords: 'protect pdf, password protect pdf, secure pdf online free, encrypt pdf',
  openGraph: {
    title: 'Protect PDF Online Free - Add Password',
    description: 'Add password protection to PDF files. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function ProtectPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Protect PDF',
    description: 'Free online tool to add password protection to PDF files.',
    url: 'https://rawtools.io/protect-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Protect PDF',
    description: 'How to password protect PDF files',
    url: 'https://rawtools.io/protect-pdf',
  }, [
    'Upload your PDF file',
    'Enter a strong password',
    'Click the "Protect PDF" button',
    'Download your password-protected PDF'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1616161616" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <ProtectPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Password Protect PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Enter a strong password</li>
                <li>Click the "Protect PDF" button</li>
                <li>Download your password-protected PDF</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Password Protection Tips</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Strong Password:</strong> Use a combination of letters, numbers, and symbols</li>
                <li><strong>Remember It:</strong> You'll need the password to open the PDF</li>
                <li><strong>Secure Storage:</strong> Store your password in a safe place</li>
                <li><strong>Privacy:</strong> Password is never sent to any server</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1717171717" />
          </div>
        </div>
      </div>
    </div>
  );
}

