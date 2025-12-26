import { Metadata } from 'next';
import JSONSchemaValidator from '@/components/tools/json/JSONSchemaValidator';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'JSON Schema Validator - Validate JSON Online | RawTools',
  description: 'Validate JSON data against JSON Schema specifications. Auto-generate schemas from JSON. Fast, secure, browser-based validation. 100% free.',
  keywords: 'json schema validator, validate json schema, json validation, schema validation, json schema',
  openGraph: {
    title: 'JSON Schema Validator - Validate JSON Online',
    description: 'Validate JSON against schemas with detailed error reports. Auto-generate schemas included.',
    type: 'website',
  },
};

export default function JSONSchemaValidatorPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Schema Validator',
    description: 'Free online tool to validate JSON data against JSON Schema specifications. Features auto-generation of schemas from JSON data.',
    url: 'https://rawtools.io/json-schema-validator',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JSON Schema Validator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Validate JSON data against JSON Schema specifications. Auto-generate schemas from existing JSON data.
          </p>
        </div>

        <AdBanner dataAdSlot="1234567800" />

        <div className="flex gap-8 mt-8">
          <div className="flex-1">
            <JSONSchemaValidator />
          </div>
          <AdSidebar dataAdSlot="1234567813" />
        </div>

        <AdBanner dataAdSlot="1234567801" className="mt-8" />
      </div>
    </div>
  );
}

