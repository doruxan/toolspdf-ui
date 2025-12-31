import { Metadata } from 'next';
import ExtractPages from '@/components/tools/ExtractPages';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Extract PDF Pages Online Free - Extract Specific Pages from PDF',
  description: 'Free online tool to extract specific pages from PDF files. Create a new PDF with only selected pages. Fast and secure.',
  keywords: 'extract pdf pages, extract pages from pdf online free, pdf page extractor',
  openGraph: {
    title: 'Extract PDF Pages Online Free',
    description: 'Extract specific pages from PDF files. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/extract-pages',
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
    title: 'Extract Pages from PDF | RawTools',
    description: 'Extract specific pages from PDF files. Fast, secure, browser-based extraction.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/extract-pages');
}


export default function ExtractPagesPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Extract PDF Pages',
    description: 'Free online tool to extract specific pages from PDF files.',
    url: 'https://rawtools.io/extract-pages',
  });

  const howToSchema = generateHowToSchema({
    name: 'Extract PDF Pages',
    description: 'How to extract pages from PDF files',
    url: 'https://rawtools.io/extract-pages',
  }, [
    'Upload your PDF file',
    'Enter page numbers to extract (e.g., 1,3,5-7)',
    'Click the "Extract Pages" button',
    'Download your new PDF with extracted pages'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What is the difference between extracting and splitting PDF pages?',
      answer: 'Extracting creates a new PDF containing only the selected pages (e.g., pages 5, 10, 15 from a 50-page document become a 3-page PDF). The original PDF remains unchanged. Splitting divides a PDF into multiple separate files (e.g., splitting a 50-page PDF into 50 single-page files). Use extraction for selective pages; use splitting for breaking a document into sections or individual pages.'
    },
    {
      question: 'Can I extract non-consecutive pages?',
      answer: 'Yes. Most extraction tools support ranges (1-5), individual pages (7, 12, 18), and combinations (1-3, 8, 15-20). The extracted PDF maintains the page order you specify. For example, extracting "10, 5, 20" creates a 3-page PDF with pages in that exact order: page 10 becomes page 1, page 5 becomes page 2, page 20 becomes page 3.'
    },
    {
      question: 'Does extracting pages reduce file size?',
      answer: 'Yes, proportionally. If you extract 10 pages from a 100-page 5 MB PDF, the new PDF will be approximately 500 KB (10% of original size). However, if the PDF contains shared resources (fonts, images used across pages), the extracted PDF includes those resources, so size reduction may be less than proportional. Extracting 10 pages might yield 600-700 KB instead of exactly 500 KB.'
    },
    {
      question: 'Will extracted pages retain their original quality?',
      answer: 'Yes. Page extraction is a lossless operation. Text, images, fonts, links, and formatting remain identical to the original. Resolution is preserved. The only difference is file structure—the extracted PDF contains fewer pages. Bookmarks and links pointing to pages outside the extraction range are removed, but internal content quality is unchanged.'
    },
    {
      question: 'Can I extract pages from password-protected PDFs?',
      answer: 'If the PDF requires a password to open (user password), you cannot extract pages without unlocking it first. If the PDF has editing restrictions (owner password) but opens without a password, extraction may work depending on the restrictions and tool capabilities. For best results, unlock the PDF first using an unlock tool, then extract pages.'
    },
    {
      question: 'What happens to form fields and annotations on extracted pages?',
      answer: 'Form fields, annotations, comments, and highlights on extracted pages are preserved. JavaScript actions and document-level scripts may not function if they reference pages outside the extracted range. Cross-page form calculations will break. For forms spanning multiple pages, extract all related pages to maintain functionality. Single-page forms extract cleanly without issues.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="2222222222" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Extract Pages" currentHref="/extract-pages" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Extract Pages</h1>
              <p className="text-muted-foreground">Extract specific pages into a new PDF</p>
            </div>

            <ExtractPages />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Extract Pages from PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Specify which pages to extract</li>
                <li>Use commas for individual pages or hyphens for ranges</li>
                <li>Download the new PDF containing only extracted pages</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Extraction Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Specific Pages:</strong> Extract exact pages (e.g., 1,5,7,10-15)</li>
                <li><strong>Page Ranges:</strong> Use hyphens for ranges (e.g., 10-20)</li>
                <li><strong>Single Output:</strong> All extracted pages in one new PDF</li>
                <li><strong>Custom Order:</strong> Pages appear in the order you specify</li>
                <li><strong>No Quality Loss:</strong> Original page quality preserved</li>
                <li><strong>Fast Processing:</strong> Extract from large PDFs instantly</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Extract PDF Pages?</h3>
              <p className="text-muted-foreground">
                PDF extraction creates <strong>focused documents from specific pages</strong>. Scenario: You have a 300-page employee handbook but only need to share the benefits section (pages 45-62) with new hires. Extract those 18 pages into a standalone PDF—easier to read and smaller to email.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Isolating relevant chapters from textbooks, extracting signed pages from contracts, creating custom document packets from larger files, sharing specific sections without exposing entire documents, and building presentations from selected report pages.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF extraction happens locally in your browser. Your files never leave your device and are never uploaded to servers. The extracted PDF is generated on your computer—complete privacy guaranteed.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2323232323" />
          </div>
        </div>
      </div>
    </div>
  );
}

