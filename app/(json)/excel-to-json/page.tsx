import { Metadata } from 'next';
import ExcelToJSON from '@/components/tools/json/ExcelToJSON';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Excel to JSON Converter - Free Online Tool | RawTools',
  description: 'Convert Excel (.xlsx) files to JSON format instantly. Support for multiple sheets, bidirectional conversion. Fast, secure, works in your browser. 100% free.',
  keywords: 'excel to json, convert excel to json, xlsx to json, json to excel, excel converter',
  openGraph: {
    title: 'Excel to JSON Converter - Free Online Tool',
    description: 'Convert Excel files to JSON format with sheet selection. Fast, secure, browser-based conversion.',
    type: 'website',
  },
};

export default function ExcelToJSONPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Excel to JSON Converter',
    description: 'Free online tool to convert Excel (.xlsx) files to JSON format and vice versa. Supports multiple sheets and bidirectional conversion.',
    url: 'https://rawtools.io/excel-to-json',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Excel to JSON Converter</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Convert Excel (.xlsx) files to JSON format and JSON arrays to Excel. Supports multiple sheets and real-time conversion.
          </p>
        </div>

        <AdBanner dataAdSlot="1234567892" />

        <div className="flex gap-8 mt-8">
          <div className="flex-1">
            <ExcelToJSON />
          </div>
          <AdSidebar dataAdSlot="1234567809" />
        </div>

        <AdBanner dataAdSlot="1234567893" className="mt-8" />
      </div>
    </div>
  );
}

