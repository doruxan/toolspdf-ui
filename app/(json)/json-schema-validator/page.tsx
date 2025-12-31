import { Metadata } from 'next';
import JSONSchemaValidator from '@/components/tools/json/JSONSchemaValidator';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'JSON Schema Validator - Validate JSON Online | RawTools',
  description: 'Validate JSON data against JSON Schema specifications. Auto-generate schemas from JSON. Fast, secure, browser-based validation. 100% free.',
  keywords: 'json schema validator, validate json schema, json validation, schema validation, json schema',
  openGraph: {
    title: 'JSON Schema Validator - Validate JSON Online',
    description: 'Validate JSON against schemas with detailed error reports. Auto-generate schemas included.',
    type: 'website',
  
    url: 'https://rawtools.io/json-schema-validator',
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
    title: 'JSON Schema Validator | RawTools',
    description: 'Validate JSON against JSON Schema. Detailed error messages and schema compliance checking.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/json-schema-validator');
}


export default function JSONSchemaValidatorPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Schema Validator',
    description: 'Free online tool to validate JSON data against JSON Schema specifications. Features auto-generation of schemas from JSON data.',
    url: 'https://rawtools.io/json-schema-validator',
  });

  const howToSchema = generateHowToSchema({
    name: 'JSON Schema Validator',
    description: 'How to validate JSON against a schema',
    url: 'https://rawtools.io/json-schema-validator',
  }, [
    'Paste your JSON schema into the schema panel',
    'Paste your JSON data into the data panel',
    'Click validate to check compliance',
    'Review validation results with detailed error messages'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567800" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="JSON Tools" toolName="JSON Schema Validator" currentHref="/json-schema-validator" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">JSON Schema Validator</h1>
              <p className="text-muted-foreground">Validate JSON data against JSON Schema specifications</p>
            </div>

            <JSONSchemaValidator />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Validate JSON Schema</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste your JSON schema into the schema panel</li>
                <li>Paste your JSON data into the data panel</li>
                <li>Click validate to check compliance</li>
                <li>Review validation results with detailed error messages</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our JSON Schema Validator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Draft Support:</strong> Compatible with JSON Schema Draft 7 and newer</li>
                <li><strong>Detailed Errors:</strong> Pinpoint exactly which properties fail validation</li>
                <li><strong>Schema Validation:</strong> Validates both your schema and your data</li>
                <li><strong>Auto-Generate Schemas:</strong> Create schemas from example JSON</li>
                <li><strong>Examples Included:</strong> Preloaded templates to get started quickly</li>
                <li><strong>100% Free:</strong> No registration or usage limits</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is JSON Schema?</h3>
              <p className="text-muted-foreground">
                JSON Schema is a <strong>vocabulary for annotating and validating JSON documents</strong>. It defines the expected structure, data types, required properties, and constraints for JSON data. Think of it as a contract that your JSON must follow.
              </p>
              <p className="text-muted-foreground">
                Example: A user schema might require email (string), age (number, minimum 0), and optional address (object). If you try to validate JSON with age: -5 or email: 123, the validator will reject it. This ensures data quality and prevents bugs from malformed input.
              </p>
              <p className="text-muted-foreground">
                Use cases: API contract testing to ensure endpoints return expected structures, validating user input before saving to databases, ensuring data quality in data pipelines, and documenting API schemas for developer onboarding. JSON Schema is widely used in OpenAPI/Swagger specifications.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your JSON data and schemas are validated entirely in your browser. No data is uploaded to servers, stored, or logged. The validation happens locally using JavaScript, keeping your data private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567813" />
          </div>
        </div>
      </div>
    </div>
  );
}

