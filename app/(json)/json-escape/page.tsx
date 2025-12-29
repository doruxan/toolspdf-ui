import { Metadata } from 'next';
import JSONEscape from '@/components/tools/json/JSONEscape';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'JSON Escape/Unescape - Encode & Decode Online | RawTools',
  description: 'Escape and unescape JSON strings. Includes Base64 encoding/decoding and URL encoding/decoding. Fast, secure, browser-based. 100% free.',
  keywords: 'json escape, unescape json, json encode, json decode, escape json string',
  openGraph: {
    title: 'JSON Escape/Unescape - Encode & Decode Online',
    description: 'Escape and unescape JSON strings with Base64 and URL encoding support.',
    type: 'website',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/json-escape');
}


export default function JSONEscapePage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Escape/Unescape',
    description: 'Free online tool to escape and unescape JSON strings. Includes Base64 encoding/decoding and URL encoding/decoding for safe data transmission.',
    url: 'https://rawtools.io/json-escape',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs category="JSON Tools" toolName="JSON Escape/Unescape" currentHref="/json-escape" />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JSON Escape/Unescape</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Escape and unescape JSON strings for safe transmission. Includes Base64 and URL encoding/decoding.
          </p>
        </div>

        <AdBanner dataAdSlot="1234567804" />

        <div className="flex gap-8 mt-8">
          <div className="flex-1">
            <JSONEscape />
          </div>
          <AdSidebar dataAdSlot="1234567815" />
        </div>

        <AdBanner dataAdSlot="1234567805" className="mt-8" />
      </div>
    </div>
  );
}

