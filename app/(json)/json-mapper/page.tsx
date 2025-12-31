import { Metadata } from 'next';
import JSONMapper from '@/components/tools/json/JSONMapper';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
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

  const faqSchema = generateFAQSchema([
    {
      question: 'What is JSON mapping and when do I need it?',
      answer: 'JSON mapping extracts specific values from complex JSON structures. Common use case: API returns {"user": {"profile": {"name": "John", "age": 30, "address": {"city": "NYC"}}}}, but you only need the city. Instead of parsing the entire structure, use mapping: user.profile.address.city → "NYC". Essential for: extracting data from large API responses, transforming data between systems, and simplifying complex JSON for display or storage.'
    },
    {
      question: 'What is dot notation in JSON mapping?',
      answer: 'Dot notation uses periods to navigate nested objects. Format: outerKey.innerKey.deeperKey. Example: {"order": {"customer": {"email": "user@example.com"}}} → order.customer.email = "user@example.com". For arrays, use brackets: users[0].name accesses the first user name. Dot notation is simpler than writing loops or parsing logic manually. Supported by most programming languages (JavaScript, Python, jq).'
    },
    {
      question: 'Can I extract multiple fields at once?',
      answer: 'Yes, but method varies by tool. Some mappers allow multiple paths: [user.name, user.email, user.age] extracts all three. Others require separate extractions. For bulk extraction, use JSONPath (more powerful) or jq (command-line). Example JSONPath: $.users[*].[name,email] extracts name and email from all users. For API data transformation, mapping tools save time compared to manual parsing.'
    },
    {
      question: 'How do I handle missing or null fields during mapping?',
      answer: 'Good mappers return null or undefined for missing paths instead of throwing errors. Example: extracting user.address.city when address is null should return null, not crash. In production code, use optional chaining (JavaScript: user?.address?.city) or safe navigation (Python: user.get("address", {}).get("city")). Test mappings with incomplete data to ensure graceful degradation when expected fields are missing.'
    },
    {
      question: 'What is the difference between JSON mapping and JSON transformation?',
      answer: 'Mapping extracts existing values (user.name → "John"). Transformation restructures data ({"firstName": "John", "lastName": "Doe"} → {"fullName": "John Doe"}). Mapping is extraction; transformation is conversion. Some tools do both. For simple extraction, use mappers. For complex transformations (merging fields, calculations, filtering), use transformation libraries (jq, JSONPath, lodash) or custom code.'
    },
    {
      question: 'Can JSON mapping handle arrays?',
      answer: 'Yes. Access array elements by index: users[0].name (first user). Extract from all elements: users[*].name (all user names). Filter arrays: users[age > 21].name (users over 21, requires advanced tools). Standard dot notation handles simple array access. For complex array operations (filtering, mapping, reducing), use JSONPath or programmatic tools (JavaScript Array methods, Python list comprehensions, jq).'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
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

