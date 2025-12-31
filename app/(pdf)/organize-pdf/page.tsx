import { Metadata } from 'next';
import OrganizePDF from '@/components/tools/OrganizePDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Organize PDF Pages Online Free - Reorder PDF Pages',
  description: 'Free online tool to reorder and organize PDF pages. Rearrange pages in any order or reverse all pages. Fast and secure.',
  keywords: 'organize pdf, reorder pdf pages, rearrange pdf pages online free, reverse pdf',
  openGraph: {
    title: 'Organize PDF Pages Online Free',
    description: 'Reorder and organize PDF pages. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/organize-pdf',
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
    title: 'Organize PDF Pages | RawTools',
    description: 'Reorder and organize PDF pages. Drag and drop or specify custom page order.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/organize-pdf');
}


export default function OrganizePDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Organize PDF',
    description: 'Free online tool to reorder and organize PDF pages.',
    url: 'https://rawtools.io/organize-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Organize PDF',
    description: 'How to organize and reorder PDF pages',
    url: 'https://rawtools.io/organize-pdf',
  }, [
    'Upload your PDF file',
    'Enter the new page order (e.g., 3, 1, 2, 4, 5)',
    'Or click "Reverse All" to reverse the entire document',
    'Download your reorganized PDF'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'Can I reorder pages visually or only by entering page numbers?',
      answer: 'Browser tools typically require entering page numbers (e.g., "3, 1, 2, 5, 4" to move page 3 to the front). Desktop PDF editors (Adobe Acrobat) offer drag-and-drop visual reordering. For complex reordering (50+ pages), visual tools are faster. For simple reordering (swapping a few pages), entering numbers works fine. Some tools offer "reverse all" buttons for quick reversal without manual numbering.'
    },
    {
      question: 'Does reordering pages affect file size?',
      answer: 'No. Reordering only changes page sequence metadata; it does not modify content, compress images, or remove data. File size remains nearly identical (may vary by 1-5 KB due to internal PDF structure changes). Reordering is purely organizational—think of it as reshuffling a deck of cards. The cards (pages) stay the same; only their order changes.'
    },
    {
      question: 'What happens to page numbers when I reorder pages?',
      answer: 'Physical page order changes, but printed page numbers (embedded in content) do not update automatically. If your PDF has "Page 10" printed on page 10, and you move it to position 5, the PDF page numbering becomes 5, but the printed text still shows "Page 10". This causes confusion. Solution: reorder first, then add new sequential page numbers using a page numbering tool.'
    },
    {
      question: 'Can I duplicate pages while reordering?',
      answer: 'Some tools allow duplication by repeating page numbers (e.g., "1, 2, 2, 3" creates a 4-page PDF with page 2 duplicated). This is useful for inserting copies of forms or signature pages. If your tool does not support duplication via reordering, extract the page you want to duplicate as a separate PDF, then merge it back into the desired location.'
    },
    {
      question: 'Will reordering break bookmarks and links?',
      answer: 'Bookmarks and internal links are updated to point to the new page locations. If page 10 had a bookmark and you moved it to position 5, the bookmark now points to position 5. However, printed page numbers in bookmark names ("Chapter 3, Page 10") become misleading. External links (URLs) are unaffected. Form field calculations referencing page numbers may break—test thoroughly after reordering.'
    },
    {
      question: 'Why would I need to reverse all pages in a PDF?',
      answer: 'Common scenario: scanning a document stack with an automatic document feeder (ADF) that produces pages in reverse order. Instead of manually entering "50, 49, 48... 2, 1", the "reverse all" feature flips the entire document instantly. Also useful for: reversing accidentally scanned backwards, reordering appendices, or creating mirror-order documents for printing (e.g., booklet assembly).'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="2626262626" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Organize PDF" currentHref="/organize-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Organize PDF</h1>
              <p className="text-muted-foreground">Reorder and rearrange PDF pages</p>
            </div>

            <OrganizePDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Organize PDF Pages</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Enter your desired page order separated by commas</li>
                <li>Example: To move page 3 to the front, enter "3, 1, 2, 4, 5..."</li>
                <li>Or use "Reverse All" button to flip the entire document</li>
                <li>Download your reorganized PDF</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Organization Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Custom Page Order:</strong> Rearrange pages in any sequence (e.g., 3,1,2,4,5)</li>
                <li><strong>Reverse All:</strong> Flip entire document with one click</li>
                <li><strong>Visual Preview:</strong> See page thumbnails before reordering</li>
                <li><strong>Flexible Syntax:</strong> Use commas to specify exact order</li>
                <li><strong>No Quality Loss:</strong> Pages maintain original quality</li>
                <li><strong>Fast Processing:</strong> Instant reordering without re-encoding</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Organize PDF Pages?</h3>
              <p className="text-muted-foreground">
                PDF organization fixes <strong>page order issues and customizes document flow</strong>. Scenario: You scan a 20-page contract but page 15 was scanned twice and page 8 is missing. Instead of rescanning everything, reorganize to remove the duplicate and note the gap.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Fixing scanning errors where pages fed in wrong order, moving cover pages to the front, reordering presentation slides for different audiences, placing signature pages at the end, reversing documents scanned backward, and customizing report sections for specific recipients.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF organization happens locally in your browser. Your files never leave your device and are never uploaded to servers. The reorganized PDF is generated on your computer—complete privacy guaranteed.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2727272727" />
          </div>
        </div>
      </div>
    </div>
  );
}

