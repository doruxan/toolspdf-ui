import { Metadata } from 'next';
import PDFToJPG from '@/components/tools/PDFToJPG';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'PDF to JPG Converter Online Free - Convert PDF to Images',
  description: 'Free online tool to convert PDF pages to JPG images. High quality conversion, fast and secure. Works in your browser.',
  keywords: 'pdf to jpg, pdf to image, convert pdf to jpg online free, pdf to jpeg',
  openGraph: {
    title: 'PDF to JPG Converter Online Free',
    description: 'Convert PDF pages to JPG images. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function PDFToJPGPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'PDF to JPG',
    description: 'Free online tool to convert PDF pages to JPG images.',
    url: 'https://toolspdf.io/pdf-to-jpg',
  });

  const howToSchema = generateHowToSchema({
    name: 'PDF to JPG',
    description: 'How to convert PDF to JPG images',
    url: 'https://toolspdf.io/pdf-to-jpg',
  }, [
    'Upload your PDF file',
    'Click the "Convert to JPG" button',
    'Preview the converted images',
    'Download individual images or all at once'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="7777777777" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <PDFToJPG />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Convert PDF to JPG</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Click the "Convert to JPG" button</li>
                <li>Preview the converted images</li>
                <li>Download individual images or all at once</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF to JPG Benefits</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>High Quality:</strong> Maintains image quality during conversion</li>
                <li><strong>All Pages:</strong> Converts every page to a separate image</li>
                <li><strong>Universal Format:</strong> JPG works everywhere</li>
                <li><strong>Easy Sharing:</strong> Share images on social media and websites</li>
              </ul>
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

