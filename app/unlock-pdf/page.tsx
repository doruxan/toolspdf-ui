import { Metadata } from 'next';
import UnlockPDF from '@/components/tools/UnlockPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Unlock PDF Online Free - Remove PDF Password Protection',
  description: 'Free online tool to unlock PDF files and remove password protection. Fast, secure, and works in your browser.',
  keywords: 'unlock pdf, remove pdf password, pdf password remover online free, decrypt pdf',
  openGraph: {
    title: 'Unlock PDF Online Free - Remove Password',
    description: 'Remove PDF password protection. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function UnlockPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Unlock PDF',
    description: 'Free online tool to unlock PDF files and remove password protection.',
    url: 'https://toolspdf.io/unlock-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Unlock PDF',
    description: 'How to unlock PDF files',
    url: 'https://toolspdf.io/unlock-pdf',
  }, [
    'Upload your password-protected PDF file',
    'Click the "Unlock PDF" button',
    'Download your unlocked PDF file'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1414141414" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <UnlockPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Unlock PDF Files</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your password-protected PDF file</li>
                <li>Click the "Unlock PDF" button</li>
                <li>Download your unlocked PDF file</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Important Notes</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Legal Use Only:</strong> Only unlock PDFs you own or have permission to access</li>
                <li><strong>Restrictions:</strong> Can only remove restrictions, not crack encrypted passwords</li>
                <li><strong>Privacy:</strong> All processing happens in your browser</li>
                <li><strong>No Logs:</strong> We don't store or track your files</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1515151515" />
          </div>
        </div>
      </div>
    </div>
  );
}

