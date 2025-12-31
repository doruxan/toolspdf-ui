import { Metadata } from 'next';
import CropPDF from '@/components/tools/CropPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Crop PDF Online Free - Adjust PDF Page Margins',
  description: 'Free online tool to crop PDF pages and adjust margins. Remove white space and trim PDF pages. Fast and secure.',
  keywords: 'crop pdf, trim pdf, adjust pdf margins online free, remove white space pdf',
  openGraph: {
    title: 'Crop PDF Online Free',
    description: 'Crop PDF pages and adjust margins. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/crop-pdf',
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
    title: 'Crop PDF Pages | RawTools',
    description: 'Crop PDF pages to remove margins and unwanted areas. Fast, browser-based cropping.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/crop-pdf');
}


export default function CropPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Crop PDF',
    description: 'Free online tool to crop PDF pages and adjust margins.',
    url: 'https://rawtools.io/crop-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Crop PDF',
    description: 'How to crop PDF pages',
    url: 'https://rawtools.io/crop-pdf',
  }, [
    'Upload your PDF file',
    'Set crop margins for top, right, bottom, and left',
    'Choose unit (millimeters, inches, or points)',
    'Click "Crop PDF" and download'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What is the difference between cropping and trimming a PDF?',
      answer: 'Cropping removes outer margins and white space, making the visible content area smaller. The content itself is not deleted—only the view area changes. Trimming physically removes content outside the crop area, reducing file size. Most PDF crop tools adjust the MediaBox (viewable area) without deleting data. True trimming modifies the TrimBox and removes invisible data, which can reduce file size by 10-30% for heavily cropped documents.'
    },
    {
      question: 'Does cropping reduce PDF file size?',
      answer: 'Not usually. Standard cropping changes only the visible page boundaries (MediaBox), but all original content remains in the file. File size stays nearly identical. To reduce size, use a "trim and compress" option that removes cropped-out content and recompresses the PDF. Alternatively, crop first, then use a PDF compression tool. Cropping alone is useful for presentation; trimming + compression is needed for file size reduction.'
    },
    {
      question: 'Can I crop different margins for different pages?',
      answer: 'Most basic crop tools apply uniform margins to all pages. For per-page custom cropping, use advanced PDF editors (Adobe Acrobat Pro, PDFtk) or split the PDF into sections, crop each section differently, then merge. Common workflow: scan a book with inconsistent margins, split odd/even pages, crop each set appropriately, then recombine. Batch tools save time for large documents with repeating patterns.'
    },
    {
      question: 'What units should I use for cropping?',
      answer: 'Millimeters (mm) for A4/A3 international paper sizes. Inches for US Letter/Legal sizes. Points (pt) for precise digital work (1 point = 1/72 inch). Choose based on your source: scanned documents match physical paper units (mm or inches), digital-born PDFs work well with points. For removing scanner black edges, 5-10mm margins typically suffice. For presentation cropping, 0.25-0.5 inches creates clean borders.'
    },
    {
      question: 'Will cropping affect PDF text selectability?',
      answer: 'No. Cropping only changes the visible area; it does not convert text to images or affect text layers. Searchable PDFs remain searchable, selectable text remains selectable, and form fields stay functional. However, if you crop so tightly that text is cut off at page edges, that partial text may become unselectable or cause rendering issues in some PDF viewers. Leave small margins (2-5mm) to avoid edge problems.'
    },
    {
      question: 'Why does my cropped PDF still show old margins in some viewers?',
      answer: 'Some PDF viewers cache page layouts or use different bounding boxes (MediaBox vs CropBox vs TrimBox). Try: refreshing the viewer, reopening the PDF, using a different reader (Adobe Acrobat vs browser), or downloading the file again. To force consistency, open the cropped PDF in Adobe Acrobat and re-save it with "Optimize for Fast Web View" enabled. This normalizes all bounding boxes.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="3030303030" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Crop PDF" currentHref="/crop-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Crop PDF</h1>
              <p className="text-muted-foreground">Adjust margins and crop PDF pages</p>
            </div>

            <CropPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Crop PDF Pages</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Enter margin values for top, right, bottom, and left sides</li>
                <li>Select your preferred unit (mm, inches, or points)</li>
                <li>Margins will be applied to all pages</li>
                <li>Click "Crop PDF" and download the result</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Cropping Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Custom Margins:</strong> Set top, right, bottom, left margins independently</li>
                <li><strong>Multiple Units:</strong> Work in millimeters, inches, or points</li>
                <li><strong>All Pages:</strong> Crop all pages uniformly</li>
                <li><strong>Remove White Space:</strong> Eliminate excessive margins</li>
                <li><strong>No Quality Loss:</strong> Content quality preserved</li>
                <li><strong>Fast Processing:</strong> Crop large PDFs instantly</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Crop PDF Pages?</h3>
              <p className="text-muted-foreground">
                PDF cropping removes <strong>unwanted margins and white space</strong>. Scenario: You scan documents with a large-format scanner that adds 2-inch margins on all sides. The content is small and hard to read. Crop those margins to make the content fill the page—much easier to read on screens and tablets.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Removing excessive white space from scanned documents, adjusting pages for specific print sizes, creating consistent margins across mixed documents, optimizing PDFs for mobile viewing, and preparing documents for professional printing with bleed requirements.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF cropping happens locally in your browser. Your files never leave your device and are never uploaded to servers. The cropped PDF is generated on your computer—complete privacy guaranteed.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="3131313131" />
          </div>
        </div>
      </div>
    </div>
  );
}

