import { Metadata } from 'next';
import JSONQuery from '@/components/tools/json/JSONQuery';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'JSON Query - JSONPath Expression Tool | RawTools',
  description: 'Query JSON data using JSONPath expressions. Filter, search, and extract data from complex JSON structures. Fast, secure, browser-based. 100% free.',
  keywords: 'json query, jsonpath, json search, query json, jsonpath expression',
  openGraph: {
    title: 'JSON Query - JSONPath Expression Tool',
    description: 'Query JSON using JSONPath expressions. Includes examples and syntax explanation.',
    type: 'website',
  },
};

export default function JSONQueryPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Query (JSONPath)',
    description: 'Free online tool to query JSON data using JSONPath expressions. Filter, search, and extract data from complex JSON structures with examples and syntax help.',
    url: 'https://rawtools.io/json-query',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JSON Query (JSONPath)</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Query JSON data using JSONPath expressions. Filter, search, and extract data from complex JSON structures.
          </p>
        </div>

        <AdBanner dataAdSlot="1234567806" />

        <div className="flex gap-8 mt-8">
          <div className="flex-1">
            <JSONQuery />
          </div>
          <AdSidebar dataAdSlot="1234567816" />
        </div>

        <AdBanner dataAdSlot="1234567807" className="mt-8" />
      </div>
    </div>
  );
}

