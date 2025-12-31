import { Metadata } from 'next';
import AddPageNumbers from '@/components/tools/AddPageNumbers';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
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

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
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

