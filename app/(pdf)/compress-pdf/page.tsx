import { Metadata } from 'next';
import CompressPDF from '@/components/tools/CompressPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Compress PDF Online Free - Reduce PDF File Size',
  description: 'Free online PDF compressor to reduce file size without losing quality. Compress large PDF files instantly in your browser.',
  keywords: 'compress pdf, reduce pdf size, pdf compressor online free, shrink pdf',
  openGraph: {
    title: 'Compress PDF Online Free - Reduce File Size',
    description: 'Compress PDF files to reduce size. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function CompressPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Compress PDF',
    description: 'Free online PDF compressor to reduce file size without losing quality.',
    url: 'https://rawtools.io/compress-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Compress PDF',
    description: 'How to compress PDF files',
    url: 'https://rawtools.io/compress-pdf',
  }, [
    'Upload your PDF file',
    'Click the "Compress PDF" button',
    'Wait for compression to complete',
    'Download your compressed PDF file'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="5555555555" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <CompressPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Compress PDF Files</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Click the "Compress PDF" button</li>
                <li>Wait for compression to complete</li>
                <li>Download your compressed PDF file</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Compress PDFs?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Email Friendly:</strong> Reduce size for email attachments</li>
                <li><strong>Save Space:</strong> Store more files on your device</li>
                <li><strong>Faster Sharing:</strong> Upload and download faster</li>
                <li><strong>Quality Preserved:</strong> Minimal quality loss</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="6666666666" />
          </div>
        </div>
      </div>
    </div>
  );
}

