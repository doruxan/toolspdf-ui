import { Metadata } from 'next';
import RemovePages from '@/components/tools/RemovePages';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Remove PDF Pages Online Free - Delete Pages from PDF',
  description: 'Free online tool to remove unwanted pages from PDF files. Delete specific pages quickly and securely in your browser.',
  keywords: 'remove pdf pages, delete pdf pages, remove pages from pdf online free',
  openGraph: {
    title: 'Remove PDF Pages Online Free',
    description: 'Delete specific pages from PDF files. 100% free, secure, and fast.',
    type: 'website',
  },
};

export default function RemovePagesPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Remove PDF Pages',
    description: 'Free online tool to remove unwanted pages from PDF files.',
    url: 'https://rawtools.io/remove-pages',
  });

  const howToSchema = generateHowToSchema({
    name: 'Remove PDF Pages',
    description: 'How to remove pages from PDF files',
    url: 'https://rawtools.io/remove-pages',
  }, [
    'Upload your PDF file',
    'Enter page numbers to remove (e.g., 1,3,5-7)',
    'Click the "Remove Pages" button',
    'Download your modified PDF file'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="2020202020" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <RemovePages />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Remove Pages from PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file by clicking or dragging</li>
                <li>Enter the page numbers you want to remove</li>
                <li>Use commas for individual pages (1,3,5) or hyphens for ranges (5-10)</li>
                <li>Click "Remove Pages" and download the result</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Remove PDF Pages?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Clean Documents:</strong> Remove unnecessary pages, blank pages, or ads</li>
                <li><strong>Privacy:</strong> Delete pages with sensitive information</li>
                <li><strong>File Size:</strong> Reduce file size by removing unwanted pages</li>
                <li><strong>Share Specific Content:</strong> Keep only relevant pages</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2121212121" />
          </div>
        </div>
      </div>
    </div>
  );
}

