import { Metadata } from 'next';
import JSONQuery from '@/components/tools/json/JSONQuery';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'JSON Query - JSONPath Expression Tool | RawTools',
  description: 'Query JSON data using JSONPath expressions. Filter, search, and extract data from complex JSON structures. Fast, secure, browser-based. 100% free.',
  keywords: 'json query, jsonpath, json search, query json, jsonpath expression',
  openGraph: {
    title: 'JSON Query - JSONPath Expression Tool',
    description: 'Query JSON using JSONPath expressions. Includes examples and syntax explanation.',
    type: 'website',
  
    url: 'https://rawtools.io/json-query',
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
    title: 'JSON Query (JSONPath) | RawTools',
    description: 'Query JSON data using JSONPath expressions. Filter, search, and extract data from complex JSON.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/json-query');
}


export default function JSONQueryPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Query (JSONPath)',
    description: 'Free online tool to query JSON data using JSONPath expressions. Filter, search, and extract data from complex JSON structures with examples and syntax help.',
    url: 'https://rawtools.io/json-query',
  });

  const howToSchema = generateHowToSchema({
    name: 'JSON Query (JSONPath)',
    description: 'How to query JSON data with JSONPath expressions',
    url: 'https://rawtools.io/json-query',
  }, [
    'Paste your JSON data into the input area',
    'Enter a JSONPath expression (e.g., $.users[*].name)',
    'Click execute to run the query',
    'View matched results and copy extracted data'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567806" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="JSON Tools" toolName="JSON Query" currentHref="/json-query" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">JSON Query (JSONPath)</h1>
              <p className="text-muted-foreground">Query JSON data using JSONPath expressions to filter and extract data</p>
            </div>

            <JSONQuery />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Query JSON with JSONPath</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste your JSON data into the input area</li>
                <li>Enter a JSONPath expression (e.g., $.users[*].name)</li>
                <li>Click execute to run the query</li>
                <li>View matched results and copy extracted data</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our JSON Query Tool?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>JSONPath Support:</strong> Full implementation of JSONPath specification</li>
                <li><strong>Filter Expressions:</strong> Query with conditions like {`[?(@.price < 10)]`}</li>
                <li><strong>Wildcard Matching:</strong> Use * to select all elements in arrays or objects</li>
                <li><strong>Recursive Descent:</strong> Search deeply nested structures with ..</li>
                <li><strong>Examples Included:</strong> Common query patterns to get started</li>
                <li><strong>Syntax Help:</strong> Built-in documentation for JSONPath expressions</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is JSONPath?</h3>
              <p className="text-muted-foreground">
                JSONPath is a <strong>query language for JSON</strong>, similar to XPath for XML. It lets you write expressions to extract specific data from JSON without writing code. Instead of manually traversing objects, you write a path expression.
              </p>
              <p className="text-muted-foreground">
                Example: You have JSON with 1000 products, and you need all products priced under $20. The JSONPath {`$.products[?(@.price < 20)]`} returns just those items. The $ represents root, {`[?(...)]`} is a filter, and @ refers to the current item being evaluated.
              </p>
              <p className="text-muted-foreground">
                Use cases: Extracting specific fields from large API responses, filtering arrays based on conditions without writing loops, testing API responses during development, and creating reusable query patterns for data extraction. JSONPath is especially useful when JSON structure is consistent but data is large.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All JSON querying happens locally in your browser. Your JSON data and query expressions are never uploaded to servers, stored, or logged. The processing uses JavaScript, keeping your data private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567816" />
          </div>
        </div>
      </div>
    </div>
  );
}

