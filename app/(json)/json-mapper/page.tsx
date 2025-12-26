import { Metadata } from 'next';
import JSONMapper from '@/components/tools/json/JSONMapper';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'JSON Mapper - Extract Nested Properties | RawTools',
  description: 'Extract nested properties from JSON with visual tree selector or text input. Support for dot notation and array indexing. Fast, secure, browser-based. 100% free.',
  keywords: 'json mapper, extract json properties, json property extractor, nested json, json path',
  openGraph: {
    title: 'JSON Mapper - Extract Nested Properties',
    description: 'Extract nested properties from JSON with visual tree selector. Supports dot notation and arrays.',
    type: 'website',
  },
};

export default function JSONMapperPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Mapper',
    description: 'Free online tool to extract nested properties from JSON. Features visual tree selector and text input with dot notation support.',
    url: 'https://rawtools.io/json-mapper',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JSON Mapper</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Extract nested properties from JSON using visual tree selector or text input. Supports dot notation and array indexing.
          </p>
        </div>

        <AdBanner dataAdSlot="1234567898" />

        <div className="flex gap-8 mt-8">
          <div className="flex-1">
            <JSONMapper />
          </div>
          <AdSidebar dataAdSlot="1234567812" />
        </div>

        <AdBanner dataAdSlot="1234567899" className="mt-8" />
      </div>
    </div>
  );
}

