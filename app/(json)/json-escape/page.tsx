import { Metadata } from 'next';
import JSONEscape from '@/components/tools/json/JSONEscape';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
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
  
    url: 'https://rawtools.io/json-escape',
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
    title: 'JSON Escape/Unescape Tool | RawTools',
    description: 'Escape and unescape JSON strings. Handle quotes, newlines, and special characters safely.',
  
    images: ['/og-image.svg'],
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

  const howToSchema = generateHowToSchema({
    name: 'JSON Escape/Unescape',
    description: 'How to escape and unescape JSON strings',
    url: 'https://rawtools.io/json-escape',
  }, [
    'Paste your JSON or escaped string into the input area',
    'Select escape or unescape mode',
    'Choose encoding type (JSON, Base64, or URL)',
    'Copy the escaped or unescaped output'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What characters need to be escaped in JSON?',
      answer: 'JSON requires escaping: double quotes (\\" for "), backslashes (\\\\ for \\), forward slashes (\\/ for /, optional but common), and control characters (\\n for newline, \\t for tab, \\r for carriage return). Unicode characters can be escaped as \\uXXXX. Example: "He said \\"Hello\\"" becomes valid JSON. Without escaping, quotes would break JSON structure. Escaping ensures special characters are treated as data, not syntax.'
    },
    {
      question: 'Why do I need to escape JSON for logging or config files?',
      answer: 'Embedding JSON inside JSON, logs, or config files creates nesting conflicts. Example: storing API response JSON as a string value requires escaping all quotes and backslashes. Without escaping: {"response": {"name": "John"}} breaks the outer JSON. With escaping: {"response": "{\\"name\\":\\"John\\"}"}. Escaped JSON treats the inner JSON as a plain string value, preventing parsing errors.'
    },
    {
      question: 'What is the difference between JSON escaping and URL encoding?',
      answer: 'JSON escaping uses backslashes for special characters (\\" for quotes). URL encoding uses percent-encoding (%20 for space, %22 for quotes). JSON escaping is for embedding strings in JSON. URL encoding is for passing JSON in query parameters (e.g., ?data={"name":"John"} becomes ?data=%7B%22name%22%3A%22John%22%7D). Use JSON escaping for JSON-inside-JSON. Use URL encoding for JSON-in-URLs. They solve different problems.'
    },
    {
      question: 'Can I escape entire JSON objects or only strings?',
      answer: 'Escaping applies to JSON strings (text values). To escape an entire JSON object, first stringify it (convert to a JSON string), then escape that string. Example: object {"name": "John"} → stringified "{\\"name\\":\\"John\\"}" → escaped as a value in another JSON: {"data": "{\\"name\\":\\"John\\"}"}. You are essentially nesting JSON by treating inner JSON as a string value.'
    },
    {
      question: 'Why does my unescaped JSON still look weird?',
      answer: 'Common issues: 1) Double-escaping (escaping already-escaped JSON creates \\\\\\" instead of \\"). Solution: unescape once, verify, then use. 2) Mixed encoding (JSON escaping + URL encoding). Solution: decode URL first, then unescape JSON. 3) Invalid escape sequences (\\q is invalid; only \\", \\\\, \\/, \\n, \\t, \\r, \\uXXXX are valid). Validate JSON after unescaping using a JSON parser.'
    },
    {
      question: 'When should I use Base64 encoding vs JSON escaping?',
      answer: 'JSON escaping: when embedding JSON strings in other JSON (config files, logs, nested API responses). Base64 encoding: when transmitting binary data (images, PDFs) or JSON through systems that only accept alphanumeric text (email, XML attributes, some legacy APIs). Base64 is not human-readable; JSON escaping maintains readability. Choose based on use case: nested JSON → escape; binary data or restrictive systems → Base64.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="1234567804" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="JSON Tools" toolName="JSON Escape/Unescape" currentHref="/json-escape" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">JSON Escape/Unescape</h1>
              <p className="text-muted-foreground">Escape and unescape JSON strings for safe data transmission</p>
            </div>

            <JSONEscape />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Escape/Unescape JSON</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste your JSON or escaped string into the input area</li>
                <li>Select escape or unescape mode</li>
                <li>Choose encoding type (JSON, Base64, or URL)</li>
                <li>Copy the escaped or unescaped output</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our JSON Escape Tool?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>JSON Escaping:</strong> Escape quotes, backslashes, and special characters</li>
                <li><strong>Base64 Encoding:</strong> Convert JSON to Base64 for safe text transmission</li>
                <li><strong>URL Encoding:</strong> Encode JSON for use in URL parameters</li>
                <li><strong>Bidirectional:</strong> Both escape and unescape in one tool</li>
                <li><strong>Validation:</strong> Checks JSON syntax before escaping</li>
                <li><strong>100% Free:</strong> No limits on string length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">When to Escape JSON Strings</h3>
              <p className="text-muted-foreground">
                JSON escaping converts special characters like quotes and backslashes into escape sequences (\", \\) so the JSON can be <strong>safely embedded within other JSON or strings</strong>. Without escaping, quotes would terminate the string prematurely.
              </p>
              <p className="text-muted-foreground">
                Common scenario: You have a JSON object that contains another JSON string as a property value. The inner JSON needs escaping so its quotes don&apos;t conflict with the outer JSON structure. Example: {`{"config": "{\\"name\\":\\"value\\"}"}`}.
              </p>
              <p className="text-muted-foreground">
                Use cases: Storing JSON as string values in databases, embedding JSON in HTML attributes or JavaScript strings, sending JSON as part of another JSON payload, and preparing JSON for transmission through systems that don't natively support JSON structure.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All escaping and encoding happens locally in your browser. Your JSON strings are never uploaded to servers, stored, or logged. The processing uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567815" />
          </div>
        </div>
      </div>
    </div>
  );
}

