import { Metadata } from 'next';
import UnlockPDF from '@/components/tools/UnlockPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Unlock PDF Online Free - Remove PDF Password Protection',
  description: 'Free online tool to unlock PDF files and remove password protection. Fast, secure, and works in your browser.',
  keywords: 'unlock pdf, remove pdf password, pdf password remover online free, decrypt pdf',
  openGraph: {
    title: 'Unlock PDF Online Free - Remove Password',
    description: 'Remove PDF password protection. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/unlock-pdf',
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
    title: 'Unlock PDF - Remove Password | RawTools',
    description: 'Remove password protection from PDF files. Fast, secure, browser-based unlocking.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/unlock-pdf');
}


export default function UnlockPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Unlock PDF',
    description: 'Free online tool to unlock PDF files and remove password protection.',
    url: 'https://rawtools.io/unlock-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Unlock PDF',
    description: 'How to unlock PDF files',
    url: 'https://rawtools.io/unlock-pdf',
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
            <Breadcrumbs category="PDF Tools" toolName="Unlock PDF" currentHref="/unlock-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Unlock PDF</h1>
              <p className="text-muted-foreground">Remove password protection from PDF</p>
            </div>

            <UnlockPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Unlock PDF Files</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your password-protected PDF file</li>
                <li>Click the "Unlock PDF" button</li>
                <li>Download your unlocked PDF file</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Unlock Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Remove Restrictions:</strong> Unlock editing, printing, and copying permissions</li>
                <li><strong>Fast Processing:</strong> Unlock PDFs instantly</li>
                <li><strong>No Quality Loss:</strong> Original document quality preserved</li>
                <li><strong>Legal Use Only:</strong> Only for PDFs you own or have permission to access</li>
                <li><strong>Browser-Based:</strong> All processing happens locally</li>
                <li><strong>No File Limits:</strong> Unlock files of any size</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Unlock PDF Files?</h3>
              <p className="text-muted-foreground">
                PDF unlocking removes <strong>editing and printing restrictions from your own documents</strong>. Scenario: You created a PDF years ago with restrictions enabled. Now you need to edit it but forgot you locked it. Unlock to regain full editing access to your own file.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Removing restrictions from your own old documents, enabling printing on legitimately purchased eBooks, allowing copying from your archived reports, unlocking forms you need to edit, and removing outdated security settings from company documents you&apos;re authorized to modify.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF unlocking happens locally in your browser. Your files never leave your device and are never uploaded to servers. The unlocked PDF is generated on your computer—complete privacy guaranteed.
              </p>
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

