import { Metadata } from 'next';
import WatermarkPDF from '@/components/tools/WatermarkPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Add Watermark to PDF Online Free - PDF Watermark Tool',
  description: 'Free online tool to add text watermark to PDF files. Protect your documents with custom watermarks. Fast and secure.',
  keywords: 'watermark pdf, add watermark to pdf online free, pdf watermark tool',
  openGraph: {
    title: 'Add Watermark to PDF Online Free',
    description: 'Add text watermark to PDF files. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/watermark-pdf',
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
    title: 'Add Watermark to PDF | RawTools',
    description: 'Add text or image watermarks to PDF files. Customizable position and opacity.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/watermark-pdf');
}


export default function WatermarkPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Add Watermark',
    description: 'Free online tool to add text watermark to PDF files.',
    url: 'https://rawtools.io/watermark-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Add Watermark',
    description: 'How to add watermark to PDF files',
    url: 'https://rawtools.io/watermark-pdf',
  }, [
    'Upload your PDF file',
    'Enter your watermark text',
    'Adjust opacity using the slider',
    'Click "Add Watermark" and download'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'Can I add image watermarks or only text?',
      answer: 'Currently, the tool supports text watermarks with customizable opacity, font size, and positioning. Text watermarks are most common for copyright notices, "CONFIDENTIAL" stamps, or company names. For image watermarks (logos), you would need to use dedicated PDF editing software like Adobe Acrobat. Text watermarks are sufficient for most document protection and branding needs.'
    },
    {
      question: 'Will the watermark appear on every page?',
      answer: 'Yes. The watermark is applied to all pages in the PDF document uniformly. This ensures consistent branding or protection across the entire document. If you need selective watermarking (e.g., only first and last pages), first split the PDF into sections, watermark the desired pages, then merge them back together using our PDF tools.'
    },
    {
      question: 'Can watermarks be removed from PDFs?',
      answer: 'Text watermarks added by overlay tools can potentially be removed with PDF editing software, which is why they are considered "visual deterrents" rather than absolute security. For true document protection, use password encryption (Protect PDF tool) or digital signatures. Watermarks work best for copyright notices, draft stamps, or indicating document status, not for preventing unauthorized use.'
    },
    {
      question: 'Does adding a watermark increase file size significantly?',
      answer: 'No. Text watermarks add minimal file size—typically 5-20 KB regardless of PDF length, because the watermark text is stored once and referenced on each page. A 50-page PDF might increase from 2.5 MB to 2.52 MB. Image watermarks (if supported) add more—roughly the image file size multiplied by page count. Text watermarks are extremely efficient.'
    },
    {
      question: 'What opacity should I use for my watermark?',
      answer: 'For subtle watermarks that do not obstruct readability: 10-30% opacity (faint, professional). For visible but non-intrusive watermarks: 40-60% opacity (noticeable, balanced). For prominent watermarks (DRAFT, CONFIDENTIAL): 70-90% opacity (bold, attention-grabbing). Experiment based on background color: lighter backgrounds need higher opacity, darker backgrounds need lower opacity. 50% is a safe default.'
    },
    {
      question: 'Can I position the watermark diagonally across the page?',
      answer: 'Diagonal watermarks are a common request for "DRAFT" or "CONFIDENTIAL" stamps. Some tools support rotation angles (e.g., 45°). If this tool does not support diagonal placement, position the watermark centered with increased font size to span the page. Alternatively, create a diagonal watermark image externally and use a watermarking tool that supports image overlays.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="1818181818" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Watermark PDF" currentHref="/watermark-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Watermark PDF</h1>
              <p className="text-muted-foreground">Add text or image watermark to PDF</p>
            </div>

            <WatermarkPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Add Watermark to PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Enter your watermark text</li>
                <li>Adjust opacity using the slider</li>
                <li>Click "Add Watermark" and download</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Watermark Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Custom Text:</strong> Add any text watermark you want</li>
                <li><strong>Adjustable Opacity:</strong> Control transparency from 10% to 100%</li>
                <li><strong>All Pages:</strong> Watermark appears on every page automatically</li>
                <li><strong>Copyright Protection:</strong> Mark documents as your property</li>
                <li><strong>Fast Processing:</strong> Add watermarks to multi-page PDFs instantly</li>
                <li><strong>No Quality Loss:</strong> Original document quality preserved</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Add Watermarks to PDFs?</h3>
              <p className="text-muted-foreground">
                PDF watermarks provide <strong>copyright protection and document tracking</strong>. Scenario: You&apos;re sharing a design proposal with a potential client. Add &quot;CONFIDENTIAL - Client Name Only&quot; watermark so if they forward it to competitors, the watermark shows it was meant for them specifically.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Protecting copyright on documents, marking drafts as &quot;DRAFT&quot; or &quot;NOT FINAL&quot;, adding company branding to reports, labeling confidential documents, tracking document distribution, preventing unauthorized copying, and adding disclaimers to legal documents.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All watermarking happens locally in your browser. Your files never leave your device and are never uploaded to servers. The watermarked PDF is generated on your computer—complete privacy guaranteed.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1919191919" />
          </div>
        </div>
      </div>
    </div>
  );
}

