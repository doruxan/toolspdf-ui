import { Metadata } from 'next';
import JSONFormatter from '@/components/tools/json/JSONFormatter';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'JSON Formatter & Beautifier - Free Online Tool | RawTools',
  description: 'Format, beautify, and validate JSON with syntax highlighting. Adjustable indentation, sort keys, and real-time validation. Fast, secure, browser-based. 100% free.',
  keywords: 'json formatter, json beautifier, format json, beautify json, json validator, validate json',
  openGraph: {
    title: 'JSON Formatter & Beautifier - Free Online Tool',
    description: 'Format and beautify JSON with syntax highlighting and validation. Fast, secure, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/json-formatter',
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
    title: 'JSON Formatter & Beautifier | RawTools',
    description: 'Format, beautify, and validate JSON with syntax highlighting. Adjustable indentation and key sorting.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/json-formatter');
}


export default function JSONFormatterPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JSON Formatter & Beautifier',
    description: 'Free online tool to format, beautify, and validate JSON. Features adjustable indentation, key sorting, and real-time syntax validation.',
    url: 'https://rawtools.io/json-formatter',
  });

  const howToSchema = generateHowToSchema({
    name: 'JSON Formatter & Beautifier',
    description: 'How to format and beautify JSON data',
    url: 'https://rawtools.io/json-formatter',
  }, [
    'Paste your minified or unformatted JSON into the input area',
    'Adjust indentation spacing (2 or 4 spaces)',
    'Enable "Sort Keys" if you want alphabetical key ordering',
    'Copy the formatted JSON output'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567894" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="JSON Tools" toolName="JSON Formatter" currentHref="/json-formatter" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">JSON Formatter & Beautifier</h1>
              <p className="text-muted-foreground">Format, beautify, and validate JSON with syntax highlighting</p>
            </div>

            <JSONFormatter />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Format JSON</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste your minified or unformatted JSON into the input area</li>
                <li>Adjust indentation spacing (2 or 4 spaces)</li>
                <li>Enable "Sort Keys" if you want alphabetical key ordering</li>
                <li>Copy the formatted JSON output</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our JSON Formatter?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Syntax Highlighting:</strong> Color-coded keys, values, and brackets for easy reading</li>
                <li><strong>Real-Time Validation:</strong> Instant error detection with helpful messages</li>
                <li><strong>Sort Keys:</strong> Alphabetize object keys for consistency</li>
                <li><strong>Configurable Spacing:</strong> Choose between 2-space or 4-space indentation</li>
                <li><strong>Copy with One Click:</strong> Formatted output ready to paste into code</li>
                <li><strong>100% Free:</strong> No limits on JSON size or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is JSON Formatting?</h3>
              <p className="text-muted-foreground">
                JSON formatting (or beautification) adds <strong>whitespace and indentation</strong> to make JSON human-readable. When APIs return minified JSON, it appears as a single line of text that's difficult to parse visually.
              </p>
              <p className="text-muted-foreground">
                Formatted JSON uses line breaks after each property, indents nested objects and arrays, and spaces values for clarity. This is essential for debugging API responses, reviewing configuration files, and understanding data structures during development.
              </p>
              <p className="text-muted-foreground">
                Use cases: Debugging API responses from REST endpoints, reviewing webhook payloads, editing configuration files (package.json, tsconfig.json), code reviews where JSON is shared in pull requests, and converting minified JSON from production logs into readable format.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All formatting happens locally in your browser. Your JSON data is never sent to any server, stored, or logged. This makes it safe to format sensitive data like API keys or configuration files.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567810" />
          </div>
        </div>
      </div>
    </div>
  );
}

