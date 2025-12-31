import { Metadata } from 'next';
import CSVToJSON from '@/components/tools/json/CSVToJSON';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'CSV to JSON Converter - Free Online Tool | RawTools',
  description: 'Convert CSV files to JSON format instantly. Support for custom delimiters, headers, and bidirectional conversion. Fast, secure, works in your browser. 100% free.',
  keywords: 'csv to json, convert csv to json, csv parser, csv converter, json to csv',
  openGraph: {
    title: 'CSV to JSON Converter - Free Online Tool',
    description: 'Convert CSV files to JSON format with custom delimiters. Fast, secure, browser-based conversion.',
    type: 'website',
  
    url: 'https://rawtools.io/csv-to-json',
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
    title: 'CSV to JSON Converter | RawTools',
    description: 'Convert CSV files to JSON format instantly. Custom delimiters, headers, and bidirectional conversion.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/csv-to-json');
}


export default function CSVToJSONPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'CSV to JSON Converter',
    description: 'Free online tool to convert CSV files to JSON format and vice versa. Supports custom delimiters, headers, and bidirectional conversion.',
    url: 'https://rawtools.io/csv-to-json',
  });

  const howToSchema = generateHowToSchema({
    name: 'CSV to JSON Converter',
    description: 'How to convert CSV files to JSON format',
    url: 'https://rawtools.io/csv-to-json',
  }, [
    'Paste your CSV data or upload a CSV file',
    'Configure delimiter (comma, semicolon, tab) and header options',
    'Click convert to transform CSV to JSON format',
    'Download JSON file or copy the output'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567890" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="JSON Tools" toolName="CSV to JSON" currentHref="/csv-to-json" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">CSV to JSON Converter</h1>
              <p className="text-muted-foreground">Convert CSV files to JSON format and JSON arrays to CSV with custom delimiters</p>
            </div>

            <CSVToJSON />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Convert CSV to JSON</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste your CSV data or upload a CSV file</li>
                <li>Configure delimiter (comma, semicolon, tab) and header options</li>
                <li>Click convert to transform CSV to JSON format</li>
                <li>Download JSON file or copy the output</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our CSV to JSON Converter?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Custom Delimiters:</strong> Support for comma, semicolon, tab, and custom separators</li>
                <li><strong>Header Detection:</strong> Automatically uses first row as JSON keys</li>
                <li><strong>Bidirectional:</strong> Convert CSV to JSON and JSON back to CSV</li>
                <li><strong>Array or Object Output:</strong> Choose between JSON array or object format</li>
                <li><strong>100% Free:</strong> No registration or file size limits</li>
                <li><strong>Privacy First:</strong> All conversions happen in your browser</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">When to Use JSON vs CSV</h3>
              <p className="text-muted-foreground">
                CSV is ideal for <strong>simple tabular data</strong> that needs to open in Excel or Google Sheets. Each row represents one record, and columns are consistent across all rows.
              </p>
              <p className="text-muted-foreground">
                JSON is better for <strong>nested or hierarchical data</strong>, API payloads, and application configuration. JSON supports arrays, objects, and multiple data types (strings, numbers, booleans, null).
              </p>
              <p className="text-muted-foreground">
                Common use cases for CSV to JSON conversion: importing data to NoSQL databases, preparing API request bodies, migrating from spreadsheets to web applications, and integrating with JavaScript frameworks that expect JSON input.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your CSV and JSON data never leaves your device. All conversion happens client-side in your browser using JavaScript. No files are uploaded to servers, and no data is stored or logged.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567808" />
          </div>
        </div>
      </div>
    </div>
  );
}

