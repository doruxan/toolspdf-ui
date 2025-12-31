import { Metadata } from 'next';
import CompressPDF from '@/components/tools/CompressPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Compress PDF Online Free - Reduce PDF File Size',
  description: 'Free online PDF compressor to reduce file size without losing quality. Compress large PDF files instantly in your browser.',
  keywords: 'compress pdf, reduce pdf size, pdf compressor online free, shrink pdf',
  openGraph: {
    title: 'Compress PDF Online Free - Reduce File Size',
    description: 'Compress PDF files to reduce size. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/compress-pdf',
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
    title: 'Compress PDF Online Free | RawTools',
    description: 'Reduce PDF file size without losing quality. Fast, secure, browser-based compression.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/compress-pdf');
}


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

  const faqSchema = generateFAQSchema([
    {
      question: 'How much can I reduce PDF file size with compression?',
      answer: 'Compression results vary based on PDF content. Documents with large images can typically be reduced by 50-70%, while text-heavy PDFs may see 20-40% reduction. The actual compression depends on the original quality and content type.'
    },
    {
      question: 'Will compressing my PDF reduce image quality?',
      answer: 'Our compression algorithm balances file size reduction with quality preservation. Images are optimized using smart algorithms that maintain visual quality while reducing file size. For most use cases, the quality difference is imperceptible.'
    },
    {
      question: 'Is there a file size limit for PDF compression?',
      answer: 'No. You can compress PDF files of any size. However, very large files (over 100MB) may take longer to process in your browser depending on your device specifications and available memory.'
    },
    {
      question: 'Can I compress multiple PDFs at once?',
      answer: 'Currently, the tool compresses one PDF at a time to ensure optimal performance and quality. For batch processing, you can compress files sequentially without any limits on the number of files processed.'
    },
    {
      question: 'Do you store my PDF files after compression?',
      answer: 'No. All compression happens entirely in your browser using client-side processing. Your PDF files never leave your device and are automatically discarded from memory after you download the compressed version.'
    },
    {
      question: 'What happens to PDF metadata during compression?',
      answer: 'PDF metadata (title, author, creation date, keywords) is preserved during compression. Only file size is reduced by optimizing images and removing redundant data, while all document properties and structure remain intact.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="5555555555" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Compress PDF" currentHref="/compress-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Compress PDF</h1>
              <p className="text-muted-foreground">Reduce PDF file size without losing quality</p>
            </div>

            <CompressPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Compress PDF Files</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Click the "Compress PDF" button</li>
                <li>Wait for compression to complete</li>
                <li>Download your compressed PDF file</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Compression Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Smart Compression:</strong> Optimizes images and removes redundant data</li>
                <li><strong>Quality Preserved:</strong> Minimal visible quality loss</li>
                <li><strong>Email-Friendly Sizes:</strong> Reduce 50MB files to under 10MB</li>
                <li><strong>Fast Processing:</strong> Compress large files in seconds</li>
                <li><strong>No File Limits:</strong> Compress files of any size</li>
                <li><strong>Browser-Based:</strong> No software installation required</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Compress PDF Files?</h3>
              <p className="text-muted-foreground">
                PDF compression is critical for <strong>reducing file size while maintaining readability</strong>. Scenario: You scan a 50-page proposal with images—the PDF is 45MB. Most email servers reject attachments over 25MB. Compress it to 8MB and send successfully without quality loss.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Meeting email attachment limits (typically 10-25MB), reducing cloud storage costs, speeding up file transfers, optimizing website PDFs for faster page loads, preparing documents for mobile viewing, and archiving large document collections efficiently.
              </p>
              <p className="text-muted-foreground">
                Real example: Marketing teams compress product catalogs from 80MB to 12MB before emailing to clients. The compressed version loads 6x faster, fits within email limits, and looks identical on screen—clients get the same information without download frustration.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF compression happens locally in your browser. Your files are never uploaded to servers, stored in databases, or transmitted over the internet. The compressed PDF is generated on your device—complete privacy and security guaranteed.
              </p>
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

