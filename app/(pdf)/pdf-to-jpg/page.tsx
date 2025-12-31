import { Metadata } from 'next';
import PDFToJPG from '@/components/tools/PDFToJPG';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'PDF to JPG Converter Online Free - Convert PDF to Images',
  description: 'Free online tool to convert PDF pages to JPG images. High quality conversion, fast and secure. Works in your browser.',
  keywords: 'pdf to jpg, pdf to image, convert pdf to jpg online free, pdf to jpeg',
  openGraph: {
    title: 'PDF to JPG Converter Online Free',
    description: 'Convert PDF pages to JPG images. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/pdf-to-jpg',
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
    title: 'PDF to JPG Converter | RawTools',
    description: 'Convert PDF pages to JPG images. High quality, fast, browser-based conversion.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/pdf-to-jpg');
}


export default function PDFToJPGPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'PDF to JPG',
    description: 'Free online tool to convert PDF pages to JPG images.',
    url: 'https://rawtools.io/pdf-to-jpg',
  });

  const howToSchema = generateHowToSchema({
    name: 'PDF to JPG',
    description: 'How to convert PDF to JPG images',
    url: 'https://rawtools.io/pdf-to-jpg',
  }, [
    'Upload your PDF file',
    'Click the "Convert to JPG" button',
    'Preview the converted images',
    'Download individual images or all at once'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What image quality do I get when converting PDF to JPG?',
      answer: 'The default conversion uses high-quality rendering at 150 DPI (dots per inch), which produces sharp images suitable for web use, presentations, and printing. Each PDF page is rendered at its original dimensions and then converted to JPG format with 90% quality setting, balancing file size and visual fidelity.'
    },
    {
      question: 'Can I convert all pages or just specific pages?',
      answer: 'The tool converts all pages in your PDF to individual JPG images. If you need only specific pages, first use our Split PDF tool to extract the pages you want, then convert that smaller PDF to JPG. This approach gives you precise control over which pages to convert.'
    },
    {
      question: 'Will text remain readable after conversion to JPG?',
      answer: 'Yes. Text in your PDF is rendered as part of the image at high resolution, maintaining readability. However, note that text becomes part of the image and cannot be selected or searched after conversion. If you need editable text, keep the original PDF.'
    },
    {
      question: 'How are multi-page PDFs handled?',
      answer: 'Each page is converted to a separate JPG image. For a 10-page PDF, you will receive 10 JPG files. You can download them individually or use the "Download All" option to get a ZIP archive containing all converted images with sequential naming (page-1.jpg, page-2.jpg, etc.).'
    },
    {
      question: 'Can I convert PDFs with transparent backgrounds?',
      answer: 'JPG format does not support transparency. If your PDF contains transparent elements, they will be rendered with a white background in the JPG output. If you need to preserve transparency, consider using PNG format instead (though our tool currently outputs JPG only).'
    },
    {
      question: 'Is there a page limit for conversion?',
      answer: 'No. You can convert PDFs with any number of pages. However, very large PDFs (100+ pages) will take longer to process and may require significant browser memory. For optimal performance, consider splitting large PDFs into smaller batches before conversion.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="7777777777" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="PDF to JPG" currentHref="/pdf-to-jpg" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">PDF to JPG</h1>
              <p className="text-muted-foreground">Convert PDF pages to JPG images</p>
            </div>

            <PDFToJPG />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Convert PDF to JPG</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Click the "Convert to JPG" button</li>
                <li>Preview the converted images</li>
                <li>Download individual images or all at once</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF to JPG Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>High Quality:</strong> Maintains image quality during conversion (300 DPI)</li>
                <li><strong>All Pages Converted:</strong> Each PDF page becomes a separate JPG image</li>
                <li><strong>Batch Download:</strong> Download all images at once as a ZIP file</li>
                <li><strong>Universal Format:</strong> JPG works on all devices and platforms</li>
                <li><strong>Fast Processing:</strong> Convert multi-page PDFs in seconds</li>
                <li><strong>No Quality Loss:</strong> Original image fidelity preserved</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Convert PDF to JPG?</h3>
              <p className="text-muted-foreground">
                PDF to JPG conversion enables <strong>image editing and universal compatibility</strong>. Scenario: You receive a PDF brochure and need to extract the product photos for your website. Convert to JPG to get individual images you can crop, resize, and upload—PDFs don&apos;t work in image galleries.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Extracting images for social media posts, creating thumbnails for presentations, editing PDF graphics in Photoshop, inserting PDF pages into Word documents as images, sharing specific pages on platforms that don&apos;t support PDFs, and archiving documents as image files.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF to JPG conversion happens locally in your browser. Your files never leave your device and are never uploaded to servers. The images are generated on your computer—complete privacy guaranteed.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="8888888888" />
          </div>
        </div>
      </div>
    </div>
  );
}

