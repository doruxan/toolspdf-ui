import { Metadata } from 'next';
import JSONFormatter from '@/components/tools/json/JSONFormatter';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'JSON Formatter & Beautifier - Free Online Tool | RawTools',
  description: 'Format, beautify, and validate JSON with syntax highlighting. Adjustable indentation, sort keys, and real-time validation. Fast, secure, browser-based. 100% free.',
  keywords: 'json formatter, json beautifier, format json, beautify json, json validator, validate json',
  openGraph: {
    title: 'JSON Formatter & Beautifier - Free Online Tool',
    description: 'Format and beautify JSON with syntax highlighting and validation. Fast, secure, browser-based.',
    type: 'website',
  },
};

export default function JSONFormatterPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Formatter & Beautifier',
    description: 'Free online tool to format, beautify, and validate JSON. Features adjustable indentation, key sorting, and real-time syntax validation.',
    url: 'https://rawtools.io/json-formatter',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JSON Formatter & Beautifier</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Format, beautify, and validate JSON with syntax highlighting. Adjustable indentation and key sorting included.
          </p>
        </div>

        <AdBanner dataAdSlot="1234567894" />

        <div className="flex gap-8 mt-8">
          <div className="flex-1">
            <JSONFormatter />
          </div>
          <AdSidebar dataAdSlot="1234567810" />
        </div>

        <AdBanner dataAdSlot="1234567895" className="mt-8" />
      </div>
    </div>
  );
}

