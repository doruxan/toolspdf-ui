import { Metadata } from 'next';
import JSONMinifier from '@/components/tools/json/JSONMinifier';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'JSON Minifier - Compress JSON Online | RawTools',
  description: 'Minify and compress JSON by removing whitespace. Reduce file size instantly with compression statistics. Fast, secure, browser-based. 100% free.',
  keywords: 'json minifier, minify json, compress json, json compressor, reduce json size',
  openGraph: {
    title: 'JSON Minifier - Compress JSON Online',
    description: 'Minify JSON by removing whitespace. Shows compression statistics and file size reduction.',
    type: 'website',
  },
};

export default function JSONMinifierPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Minifier',
    description: 'Free online tool to minify and compress JSON by removing unnecessary whitespace. Shows compression statistics and file size reduction.',
    url: 'https://rawtools.io/json-minifier',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JSON Minifier</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compress JSON by removing whitespace. See compression statistics and file size reduction in real-time.
          </p>
        </div>

        <AdBanner dataAdSlot="1234567896" />

        <div className="flex gap-8 mt-8">
          <div className="flex-1">
            <JSONMinifier />
          </div>
          <AdSidebar dataAdSlot="1234567811" />
        </div>

        <AdBanner dataAdSlot="1234567897" className="mt-8" />
      </div>
    </div>
  );
}

