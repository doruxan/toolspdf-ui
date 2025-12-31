import { Metadata } from 'next';
import SplitPDF from '@/components/tools/SplitPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Split PDF Online Free - Extract Pages from PDF',
  description: 'Free online tool to split PDF files into separate documents or extract specific pages. Fast, secure, and works in your browser.',
  keywords: 'split pdf, extract pdf pages, divide pdf, pdf splitter online free',
  openGraph: {
    title: 'Split PDF Online Free - Extract Pages',
    description: 'Split PDF files into separate documents. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/split-pdf',
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
    title: 'Split PDF Online Free | RawTools',
    description: 'Split PDF files by page ranges or extract specific pages. Fast, secure, browser-based.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/split-pdf');
}


export default function SplitPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Split PDF',
    description: 'Free online tool to split PDF files into separate documents or extract specific pages.',
    url: 'https://rawtools.io/split-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Split PDF',
    description: 'How to split PDF files into separate documents',
    url: 'https://rawtools.io/split-pdf',
  }, [
    'Upload your PDF file',
    'Choose to split into single pages or extract specific pages',
    'For specific pages, enter page numbers (e.g., 1,3,5)',
    'Download your split PDF files'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'Can I split a PDF into individual pages?',
      answer: 'Yes. You can split any PDF into individual single-page documents. After uploading your PDF, select the "Split into single pages" option, and each page will be extracted as a separate PDF file that you can download individually or as a ZIP archive.'
    },
    {
      question: 'How do I extract specific pages from a PDF?',
      answer: 'Upload your PDF and select "Extract specific pages." Then enter the page numbers you want (e.g., 1,3,5 or 1-5,10-15). The tool will create a new PDF containing only those pages while preserving their original formatting and quality.'
    },
    {
      question: 'Is there a limit to PDF file size for splitting?',
      answer: 'No. You can split PDF files of any size. However, processing time increases with larger files. A 20-page PDF typically splits in seconds, while a 500-page PDF may take 10-30 seconds depending on your device specifications.'
    },
    {
      question: 'Will splitting a PDF reduce quality?',
      answer: 'No. Splitting is a lossless operation. All pages retain their original resolution, fonts, images, formatting, and metadata. The split pages are identical to the originals—only the document structure changes.'
    },
    {
      question: 'Can I split password-protected PDFs?',
      answer: 'If the PDF has restrictions on editing or printing but no open password, you may be able to split it depending on browser capabilities. If the PDF requires a password to open, you must unlock it first using our Unlock PDF tool before splitting.'
    },
    {
      question: 'What happens to bookmarks and links when splitting?',
      answer: 'Bookmarks and internal links are context-dependent. When splitting into single pages, bookmarks pointing to pages outside the extracted range are removed. Links within the same extracted range remain functional, while links to external pages outside the range are preserved but may not work as intended.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="3333333333" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Split PDF" currentHref="/split-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Split PDF</h1>
              <p className="text-muted-foreground">Extract pages or split into separate documents</p>
            </div>

            <SplitPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Split PDF Files</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Choose to split into single pages or extract specific pages</li>
                <li>For specific pages, enter page numbers (e.g., 1,3,5)</li>
                <li>Download your split PDF files</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Splitter Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Split All Pages:</strong> Convert each page into a separate PDF file</li>
                <li><strong>Extract Specific Pages:</strong> Choose exact pages to extract (e.g., 1,3,5-10)</li>
                <li><strong>Page Range Support:</strong> Use ranges like "1-5,8,10-12" for complex extractions</li>
                <li><strong>Preview Mode:</strong> See page thumbnails before splitting</li>
                <li><strong>Batch Download:</strong> Download all pages at once</li>
                <li><strong>No Quality Loss:</strong> Original quality preserved</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Split PDF Files?</h3>
              <p className="text-muted-foreground">
                PDF splitting is essential for <strong>extracting specific pages or breaking large documents into manageable chunks</strong>. Scenario: You receive a 200-page scanned contract but only need pages 45-52 (the pricing schedule). Split extracts just those 8 pages instead of sharing the entire document.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Extracting individual chapters from eBooks, separating exam questions from answer keys, isolating specific invoices from monthly reports, breaking presentation decks into individual slides, extracting signed pages from multi-page agreements, and creating separate files for different document sections.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF splitting happens locally in your browser. Your files never leave your device, are never uploaded to servers, and are never stored. The split PDFs are generated on your computer and downloaded directly—your documents remain completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="4444444444" />
          </div>
        </div>
      </div>
    </div>
  );
}

