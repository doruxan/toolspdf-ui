import { Metadata } from 'next';
import JSONMapper from '@/components/tools/json/JSONMapper';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'JSON Mapper - Extract Nested Properties | RawTools',
  description: 'Extract nested properties from JSON with visual tree selector or text input. Support for dot notation and array indexing. Fast, secure, browser-based. 100% free.',
  keywords: 'json mapper, extract json properties, json property extractor, nested json, json path',
  openGraph: {
    title: 'JSON Mapper - Extract Nested Properties',
    description: 'Extract nested properties from JSON with visual tree selector. Supports dot notation and arrays.',
    type: 'website',
  
    url: 'https://rawtools.io/json-mapper',
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
    title: 'JSON Mapper - Transform JSON | RawTools',
    description: 'Transform JSON with JavaScript expressions. Map, filter, and reshape data structures.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/json-mapper');
}


export default function JSONMapperPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Mapper',
    description: 'Free online tool to extract nested properties from JSON. Features visual tree selector and text input with dot notation support.',
    url: 'https://rawtools.io/json-mapper',
  });

  const howToSchema = generateHowToSchema({
    name: 'JSON Mapper',
    description: 'How to extract nested properties from JSON',
    url: 'https://rawtools.io/json-mapper',
  }, [
    'Paste your JSON data into the input area',
    'Use the visual tree selector to navigate nested objects',
    'Or type a path using dot notation (e.g., user.address.city)',
    'Copy the extracted value or transformed JSON'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567898" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="JSON Tools" toolName="JSON Mapper" currentHref="/json-mapper" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">JSON Mapper</h1>
              <p className="text-muted-foreground">Extract nested properties from JSON with visual selector or dot notation</p>
            </div>

            <JSONMapper />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Extract JSON Properties</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste your JSON data into the input area</li>
                <li>Use the visual tree selector to navigate nested objects</li>
                <li>Or type a path using dot notation (e.g., user.address.city)</li>
                <li>Copy the extracted value or transformed JSON</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our JSON Mapper?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Visual Tree Selector:</strong> Click through nested objects without typing paths</li>
                <li><strong>Dot Notation Support:</strong> Use user.profile.email to access nested properties</li>
                <li><strong>Array Indexing:</strong> Extract items with users[0].name syntax</li>
                <li><strong>Nested Mapping:</strong> Transform complex JSON structures</li>
                <li><strong>Real-Time Preview:</strong> See extracted values as you navigate</li>
                <li><strong>Copy with One Click:</strong> Extracted data ready to use</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is JSON Mapping?</h3>
              <p className="text-muted-foreground">
                JSON mapping is the process of <strong>extracting specific data</strong> from nested JSON structures or <strong>transforming JSON</strong> from one shape to another. This is essential when working with complex API responses where you only need certain fields.
              </p>
              <p className="text-muted-foreground">
                Example: An API returns 200 fields, but you only need email and name. Instead of manually parsing the response, you map user.profile.email and user.profile.name to extract just those values. This simplifies data integration and reduces code complexity.
              </p>
              <p className="text-muted-foreground">
                Common use cases: API integration where source and destination schemas differ, migrating data between systems with different structures, extracting specific fields from large JSON payloads, and transforming legacy API responses to match modern application requirements.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your JSON data is processed entirely in your browser. No data is uploaded to servers, and nothing is stored or logged. The mapping happens locally using JavaScript, so your data remains private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567812" />
          </div>
        </div>
      </div>
    </div>
  );
}

