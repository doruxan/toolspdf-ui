import { Metadata } from 'next';
import HTMLToPDF from '@/components/tools/HTMLToPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'HTML to PDF Converter Online Free - Convert HTML to PDF',
  description: 'Free online tool to convert HTML or text to PDF. Paste your HTML code or plain text and create a PDF instantly.',
  keywords: 'html to pdf, convert html to pdf online free, text to pdf',
  openGraph: {
    title: 'HTML to PDF Converter Online Free',
    description: 'Convert HTML or text to PDF. 100% free, secure, and fast.',
    type: 'website',

    url: 'https://rawtools.io/html-to-pdf',
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
    title: 'HTML to PDF Converter | RawTools',
    description: 'Convert HTML to PDF files. Preserves styling, images, and layout. Fast conversion.',

    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/html-to-pdf');
}


export default function HTMLToPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'HTML to PDF',
    description: 'Free online tool to convert HTML or text to PDF.',
    url: 'https://rawtools.io/html-to-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'HTML to PDF',
    description: 'How to convert HTML to PDF',
    url: 'https://rawtools.io/html-to-pdf',
  }, [
    'Paste your HTML code or plain text',
    'Choose page size (A4 or Letter) and orientation',
    'Adjust font size if needed',
    'Click "Convert to PDF" and download'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'Will CSS styles be preserved in the PDF?',
      answer: 'Most HTML-to-PDF converters support basic CSS: colors, fonts (web-safe fonts), margins, padding, text alignment, and background colors. Advanced CSS may not work: animations, transforms, complex positioning, CSS Grid (may convert to basic layout). For best results, use inline CSS or simple external stylesheets. Test with sample HTML to verify styling. Print-specific CSS (@page, @media print) is often supported for page breaks and margins.'
    },
    {
      question: 'Can I convert entire web pages to PDF?',
      answer: 'If the tool accepts URLs (some do, some do not), it will attempt to fetch and convert the page. However, dynamic content loaded by JavaScript (React, Vue, AJAX) may not render. Static HTML works best. For complex web pages, use browser "Print to PDF" (Ctrl+P) or dedicated web scraping tools. For HTML snippets or emails, paste the HTML source directly into the converter.'
    },
    {
      question: 'What happens to images in the HTML?',
      answer: 'Embedded images (Base64 data URIs: <img src="data:image/png;base64...">) convert reliably. External images (URLs: <img src="https://...">) may not load if the converter cannot fetch them or if URLs are broken. For guaranteed image inclusion, use Base64-encoded images or host images on accessible URLs. Images are embedded in the PDF at their original resolution.'
    },
    {
      question: 'How do I control page breaks in the PDF?',
      answer: 'Use CSS page-break properties: "page-break-before: always" (force new page before element), "page-break-after: always" (new page after element), "page-break-inside: avoid" (prevent element from spanning pages). Example: <div style="page-break-after: always;">Section 1</div>. This works in most HTML-to-PDF converters. For precise control, use @page CSS rules (supported by some converters).'
    },
    {
      question: 'Can I include hyperlinks in the PDF?',
      answer: 'Yes. Standard HTML links (<a href="https://example.com">Link</a>) convert to clickable PDF links. Internal anchor links (<a href="#section2">) may work if the converter supports them. Email links (mailto:) typically work. JavaScript-based links (onclick handlers) do NOT work—PDFs do not execute JavaScript. Use standard HTML href attributes for reliable link conversion.'
    },
    {
      question: 'What font options are available?',
      answer: 'Most converters support web-safe fonts: Arial, Times New Roman, Courier, Helvetica, Georgia, Verdana. Custom fonts via @font-face or Google Fonts may work if the converter can fetch font files. For guaranteed font rendering, use standard fonts or Base64-embed fonts in CSS. If a specified font is unavailable, the converter falls back to a default font (usually Arial or serif).'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="2828282828" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="HTML to PDF" currentHref="/html-to-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">HTML to PDF</h1>
              <p className="text-muted-foreground">Convert HTML or text to PDF document</p>
            </div>

            <HTMLToPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Convert HTML to PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste your HTML code or plain text into the text area</li>
                <li>Select page size (A4 or Letter)</li>
                <li>Choose orientation (Portrait or Landscape)</li>
                <li>Adjust font size for readability</li>
                <li>Click "Convert to PDF" to download your document</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our HTML to PDF Converter?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Secure:</strong> All conversion happens locally in your browser</li>
                <li><strong>Fast:</strong> Instant conversion without server uploads</li>
                <li><strong>Flexible:</strong> Supports HTML and plain text</li>
                <li><strong>Customizable:</strong> Control page size, orientation, and font size</li>
                <li><strong>Cross-Platform:</strong> Works on any OS and browser</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our HTML to PDF Tool</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>HTML Support:</strong> Preserves basic HTML formatting and structure</li>
                <li><strong>Plain Text:</strong> Convert simple text documents to PDF</li>
                <li><strong>Multiple Page Sizes:</strong> A4 and Letter formats available</li>
                <li><strong>Orientation Control:</strong> Portrait or landscape layout</li>
                <li><strong>Font Size Adjustment:</strong> Optimize readability for any purpose</li>
                <li><strong>Client-Side Processing:</strong> Your content never leaves your browser</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is HTML to PDF Conversion?</h3>
              <p className="text-muted-foreground">
                HTML to PDF conversion is the process of transforming HTML markup or plain text into a Portable Document Format (PDF) file. This is essential for archiving web content, creating printable versions of online documents, or generating reports from HTML templates. Our tool handles the conversion directly in your browser, ensuring privacy and speed. Whether you're converting structured HTML with formatting or simple text content, the output is a universally compatible PDF document that preserves your content's readability and structure.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for HTML to PDF</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Documentation:</strong> Convert technical documentation or API docs to PDF format.</li>
                <li><strong>Reports:</strong> Turn HTML reports or analytics into shareable PDFs.</li>
                <li><strong>Web Archiving:</strong> Save web content or blog posts as permanent PDF files.</li>
                <li><strong>Email Templates:</strong> Convert HTML email templates to PDF for review.</li>
                <li><strong>Notes & Memos:</strong> Transform text notes into professional PDF documents.</li>
                <li><strong>Invoices:</strong> Generate PDF invoices from HTML templates.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All HTML to PDF conversion operations are performed directly in your web browser. This means your content never leaves your device and is never uploaded to our servers. You can use our tool with complete confidence, knowing your data remains private and secure throughout the entire process.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2929292929" />
          </div>
        </div>
      </div>
    </div>
  );
}

