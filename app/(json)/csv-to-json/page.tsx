import { Metadata } from 'next';
import CSVToJSON from '@/components/tools/json/CSVToJSON';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'CSV to JSON Converter - Free Online Tool | RawTools',
  description: 'Convert CSV files to JSON format instantly. Support for custom delimiters, headers, and bidirectional conversion. Fast, secure, works in your browser. 100% free.',
  keywords: 'csv to json, convert csv to json, csv parser, csv converter, json to csv',
  openGraph: {
    title: 'CSV to JSON Converter - Free Online Tool',
    description: 'Convert CSV files to JSON format with custom delimiters. Fast, secure, browser-based conversion.',
    type: 'website',
  },
};

export default function CSVToJSONPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'CSV to JSON Converter',
    description: 'Free online tool to convert CSV files to JSON format and vice versa. Supports custom delimiters, headers, and bidirectional conversion.',
    url: 'https://rawtools.io/csv-to-json',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">CSV to JSON Converter</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Convert CSV files to JSON format and JSON arrays to CSV. Supports custom delimiters, headers, and real-time conversion.
          </p>
        </div>

        <AdBanner dataAdSlot="1234567890" />

        <div className="flex gap-8 mt-8">
          <div className="flex-1">
            <CSVToJSON />
          </div>
          <AdSidebar dataAdSlot="1234567808" />
        </div>

        <AdBanner dataAdSlot="1234567891" className="mt-8" />
      </div>
    </div>
  );
}

