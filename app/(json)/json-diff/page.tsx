import { Metadata } from 'next';
import JSONDiff from '@/components/tools/json/JSONDiff';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'JSON Diff - Compare JSON Files Online | RawTools',
  description: 'Compare two JSON files with side-by-side highlighting. Shows additions, deletions, and modifications. Fast, secure, browser-based comparison. 100% free.',
  keywords: 'json diff, compare json, json compare, json difference, json comparison',
  openGraph: {
    title: 'JSON Diff - Compare JSON Files Online',
    description: 'Compare JSON files with color-coded differences. Side-by-side comparison with detailed change tracking.',
    type: 'website',
  },
};

export default function JSONDiffPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Diff & Compare',
    description: 'Free online tool to compare two JSON files. Features side-by-side comparison with color-coded differences showing additions, deletions, and modifications.',
    url: 'https://rawtools.io/json-diff',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JSON Diff & Compare</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare two JSON files with side-by-side highlighting. Shows additions, deletions, and modifications with detailed statistics.
          </p>
        </div>

        <AdBanner dataAdSlot="1234567802" />

        <div className="flex gap-8 mt-8">
          <div className="flex-1">
            <JSONDiff />
          </div>
          <AdSidebar dataAdSlot="1234567814" />
        </div>

        <AdBanner dataAdSlot="1234567803" className="mt-8" />
      </div>
    </div>
  );
}

