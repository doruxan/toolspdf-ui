import { Metadata } from 'next';
import AddPageNumbers from '@/components/tools/AddPageNumbers';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Add Page Numbers to PDF Online Free - PDF Page Numbering',
  description: 'Free online tool to add page numbers to PDF files. Choose position, format, and starting number. Fast and easy.',
  keywords: 'add page numbers to pdf, pdf page numbering online free, number pdf pages',
  openGraph: {
    title: 'Add Page Numbers to PDF Online Free',
    description: 'Add page numbers to PDF files. 100% free, secure, and fast.',
    type: 'website',

    url: 'https://rawtools.io/add-page-numbers',
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
    title: 'Add Page Numbers to PDF | RawTools',
    description: 'Add page numbers to PDF files. Customizable position, format, and starting number.',

    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/add-page-numbers');
}


export default function AddPageNumbersPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Add Page Numbers',
    description: 'Free online tool to add page numbers to PDF files.',
    url: 'https://rawtools.io/add-page-numbers',
  });

  const howToSchema = generateHowToSchema({
    name: 'Add Page Numbers',
    description: 'How to add page numbers to PDF files',
    url: 'https://rawtools.io/add-page-numbers',
  }, [
    'Upload your PDF file',
    'Choose page number position (top/bottom, left/center/right)',
    'Select format (numbers only, "Page X", or "Page X of Y")',
    'Click "Add Page Numbers" and download'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'Can I start page numbering from a specific page?',
      answer: 'Yes, most page numbering tools allow starting from page 2 or later (skipping cover pages or title pages). You can also customize the starting number. For example, if your PDF is Chapter 3 starting on page 50, set the first page to display "50". Common use case: academic papers where page 1 is the title page (no number), and numbering starts on page 2 as "1".'
    },
    {
      question: 'Will adding page numbers overwrite existing numbers?',
      answer: 'It depends on positioning. If your PDF already has page numbers in the same location you choose, the new numbers will overlay the old ones, potentially creating double numbers or clutter. Solution: choose a different position (e.g., move from footer-center to footer-right), remove existing numbers first, or use a larger font/different color to clearly distinguish new numbers.'
    },
    {
      question: 'What page number formats are available?',
      answer: 'Common formats include: Plain numbers (1, 2, 3), "Page X" (Page 1, Page 2), "Page X of Y" (Page 1 of 50), Roman numerals (i, ii, iii or I, II, III), and custom prefixes ("Chapter 2 - Page 5"). Choose based on document type: legal documents often use "Page X of Y", academic papers use plain numbers, and appendices might use Roman numerals.'
    },
    {
      question: 'Does adding page numbers increase file size?',
      answer: 'Minimally. Text-based page numbers add only 1-5 KB per page, so a 50-page PDF might increase by 50-250 KB total (negligible). The numbers are stored as text objects, not images. If you add page numbers as images or use complex fonts, file size may increase more. For most use cases, the size impact is unnoticeable.'
    },
    {
      question: 'Can I use custom fonts for page numbers?',
      answer: 'Advanced PDF editors allow custom fonts, but many browser-based tools use standard fonts (Arial, Times New Roman, Helvetica) for compatibility. Custom fonts require embedding font data, which increases file size. For professional documents, standard fonts are recommended for universal viewer support. If branding requires custom fonts, use desktop PDF software like Adobe Acrobat Pro.'
    },
    {
      question: 'What if my PDF already has page numbers in a different location?',
      answer: 'You have two options: 1) Add new numbers in a different position (e.g., if existing numbers are centered, add new numbers to the right). 2) Remove existing numbers first (use redact or crop tools to black out old numbers), then add new ones in the desired location. Option 2 is cleaner but more time-consuming. For multi-document merges with conflicting numbering, renumbering after merging is essential.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="2424242424" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Add Page Numbers" currentHref="/add-page-numbers" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Add Page Numbers</h1>
              <p className="text-muted-foreground">Add page numbers to your PDF document</p>
            </div>

            <AddPageNumbers />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Add Page Numbers to PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Select where to place page numbers (top or bottom, alignment)</li>
                <li>Choose number format (simple numbers, "Page X", etc.)</li>
                <li>Adjust font size and starting page number if needed</li>
                <li>Click "Add Page Numbers" and download your numbered PDF</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our PDF Page Numbering Tool?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Secure:</strong> Files are processed locally in your browser</li>
                <li><strong>Fast:</strong> Instant page numbering without server uploads</li>
                <li><strong>Customizable:</strong> Control position, format, and starting number</li>
                <li><strong>Professional Results:</strong> Clean, consistent page numbers</li>
                <li><strong>Cross-Platform:</strong> Works on any OS and browser</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Page Numbering Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>6 Position Options:</strong> Top or bottom, left/center/right alignment</li>
                <li><strong>Multiple Formats:</strong> Simple numbers, "Page X", or "Page X of Y"</li>
                <li><strong>Custom Start Number:</strong> Begin numbering from any page or number</li>
                <li><strong>Adjustable Font Size:</strong> From 8pt to 24pt for readability</li>
                <li><strong>Batch Processing:</strong> Number entire documents at once</li>
                <li><strong>Client-Side Processing:</strong> Your documents never leave your browser</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is PDF Page Numbering?</h3>
              <p className="text-muted-foreground">
                PDF page numbering is the process of adding sequential numbers to pages in a PDF document, making it easier to reference specific pages and navigate long documents. Professional documents like reports, manuals, theses, and legal filings typically require page numbers for clarity and organization. Our tool automates this process, allowing you to customize the position, format, and starting number while maintaining document quality. Whether you're preparing academic papers, business reports, or eBooks, proper page numbering enhances readability and professionalism.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for PDF Page Numbers</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Academic Papers:</strong> Add page numbers to theses, dissertations, or research papers.</li>
                <li><strong>Business Reports:</strong> Number quarterly reports, proposals, or financial documents.</li>
                <li><strong>Legal Documents:</strong> Add page numbers to contracts, briefs, or court filings.</li>
                <li><strong>Manuals:</strong> Number instruction manuals or user guides for easy reference.</li>
                <li><strong>eBooks:</strong> Add professional page numbers to self-published eBooks.</li>
                <li><strong>Presentations:</strong> Number slide decks or handout materials.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All PDF page numbering operations are performed directly in your web browser. This means your sensitive documents never leave your device and are never uploaded to our servers. You can use our tool with complete confidence, knowing your data remains private and secure throughout the entire process.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2525252525" />
          </div>
        </div>
      </div>
    </div>
  );
}

