import { Metadata } from 'next';
import ExcelToJSON from '@/components/tools/json/ExcelToJSON';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Excel to JSON Converter - Free Online Tool | RawTools',
  description: 'Convert Excel (.xlsx) files to JSON format instantly. Support for multiple sheets, bidirectional conversion. Fast, secure, works in your browser. 100% free.',
  keywords: 'excel to json, convert excel to json, xlsx to json, json to excel, excel converter',
  openGraph: {
    title: 'Excel to JSON Converter - Free Online Tool',
    description: 'Convert Excel files to JSON format with sheet selection. Fast, secure, browser-based conversion.',
    type: 'website',
  
    url: 'https://rawtools.io/excel-to-json',
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
    title: 'Excel to JSON Converter | RawTools',
    description: 'Convert Excel (.xlsx) files to JSON format. Sheet selection and header row support.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/excel-to-json');
}


export default function ExcelToJSONPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Excel to JSON Converter',
    description: 'Free online tool to convert Excel (.xlsx) files to JSON format and vice versa. Supports multiple sheets and bidirectional conversion.',
    url: 'https://rawtools.io/excel-to-json',
  });

  const howToSchema = generateHowToSchema({
    name: 'Excel to JSON Converter',
    description: 'How to convert Excel (.xlsx) files to JSON format',
    url: 'https://rawtools.io/excel-to-json',
  }, [
    'Upload your Excel (.xlsx) file',
    'Select which sheet to convert if multiple sheets exist',
    'Click convert to transform Excel data to JSON',
    'Download JSON file or copy the result'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567892" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="JSON Tools" toolName="Excel to JSON" currentHref="/excel-to-json" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Excel to JSON Converter</h1>
              <p className="text-muted-foreground">Convert Excel (.xlsx) files to JSON format with multi-sheet support</p>
            </div>

            <ExcelToJSON />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Convert Excel to JSON</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your Excel (.xlsx) file</li>
                <li>Select which sheet to convert if multiple sheets exist</li>
                <li>Click convert to transform Excel data to JSON</li>
                <li>Download JSON file or copy the result</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our Excel to JSON Converter?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Multi-Sheet Support:</strong> Select and convert any sheet from your workbook</li>
                <li><strong>Type Detection:</strong> Automatically preserves numbers, dates, and text formatting</li>
                <li><strong>Large File Handling:</strong> Process Excel files with thousands of rows</li>
                <li><strong>Bidirectional:</strong> Convert Excel to JSON and JSON back to Excel</li>
                <li><strong>Preview Mode:</strong> See JSON output before downloading</li>
                <li><strong>100% Private:</strong> Files never leave your browser</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Convert Excel to JSON?</h3>
              <p className="text-muted-foreground">
                Excel is designed for <strong>human-readable spreadsheets</strong>, while JSON is built for <strong>machine-readable data exchange</strong>. Converting Excel to JSON lets you automate workflows, integrate with APIs, and feed data into web applications.
              </p>
              <p className="text-muted-foreground">
                Common scenarios: You have a product catalog in Excel and need to import it to an e-commerce platform. You maintain a contact list in Excel and want to sync it with a CRM API. You export reports from business tools as Excel but need JSON for data analysis pipelines.
              </p>
              <p className="text-muted-foreground">
                JSON preserves the structure of your Excel data while making it accessible to JavaScript frameworks, REST APIs, NoSQL databases like MongoDB, and data processing tools. Each Excel row becomes a JSON object with column headers as keys.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your Excel files are processed entirely in your browser using JavaScript. No data is uploaded to servers, and nothing is stored or logged. The conversion happens locally on your device, so your data remains private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567809" />
          </div>
        </div>
      </div>
    </div>
  );
}

