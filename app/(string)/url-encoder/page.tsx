import { Metadata } from 'next';
import URLEncoder from '@/components/tools/string/URLEncoder';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'URL Encoder/Decoder - Free Online Tool | RawTools',
  description: 'Encode and decode URLs and query parameters online. Fast, secure, browser-based URL converter. Handles special characters and spaces. 100% free.',
  keywords: 'url encoder, url decoder, urlencode, urldecode, url converter, query string encoder',
  openGraph: {
    title: 'URL Encoder/Decoder - Free Online Tool',
    description: 'Encode and decode URLs and query parameters. Fast, secure, browser-based conversion.',
    type: 'website',
  
    url: 'https://rawtools.io/url-encoder',
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
    title: 'URL Encoder/Decoder | RawTools',
    description: 'Encode and decode URLs and query parameters. Handle special characters safely.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/url-encoder');
}

export default function URLEncoderPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'URL Encoder/Decoder',
    description: 'Free online tool to encode and decode URLs and query parameters. Handles special characters, spaces, and bidirectional conversion.',
    url: 'https://rawtools.io/url-encoder',
  });

  const howToSchema = generateHowToSchema({
    name: 'URL Encoder/Decoder',
    description: 'How to encode and decode URLs and query parameters',
    url: 'https://rawtools.io/url-encoder',
  }, [
    'Paste URL or encoded string into the input field',
    'Choose encode or decode mode',
    'Click convert to process the URL',
    'Copy the encoded or decoded URL'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What is URL encoding and why is it needed?',
      answer: 'URL encoding (percent-encoding) converts special characters into a format safe for URLs. URLs can only contain unreserved characters (A-Z, a-z, 0-9, -, _, ., ~). All other characters—including spaces, &, =, ?, #—must be encoded as %XX (hexadecimal). For example, "hello world" becomes "hello%20world" and "user@email.com" becomes "user%40email.com". This prevents URL parsing errors.'
    },
    {
      question: 'What characters need to be URL encoded?',
      answer: 'Reserved characters (&, =, ?, #, /, :, @, +) have special meaning in URLs and must be encoded. Unsafe characters (spaces, <, >, {, }, |, \\, ^, `) are not allowed in URLs. Non-ASCII characters (é, ñ, 中) must be encoded. Safe characters (A-Z, a-z, 0-9, -, _, ., ~) never need encoding. Example: "&" becomes "%26", space becomes "%20" or "+".'
    },
    {
      question: 'What is the difference between %20 and + for spaces?',
      answer: 'Both represent spaces, but context matters. "%20" is the standard percent-encoding for spaces, valid everywhere in URLs. "+" is specific to query parameters (after "?") in application/x-www-form-urlencoded format, commonly used in HTML forms. In URL paths, only "%20" is correct. In query strings, both work, but "%20" is more universal and recommended.'
    },
    {
      question: 'Do I need to encode entire URLs or just query parameters?',
      answer: 'Only encode the values, not the structure. Never encode the protocol (https://), domain (example.com), or structural characters (?&=). Encode only: path segments with special characters (/search/hello world → /search/hello%20world) and query parameter values (?name=John Doe → ?name=John%20Doe). Encoding the entire URL breaks it: "https://" becomes "https%3A%2F%2F" which is invalid.'
    },
    {
      question: 'Can URL encoding handle non-English characters?',
      answer: 'Yes. Non-ASCII characters (Chinese, Arabic, emoji) are first converted to UTF-8 bytes, then each byte is percent-encoded. For example, "こんにちは" (Japanese) becomes "%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF". Modern browsers handle this automatically, but manual encoding is needed when constructing URLs programmatically or in APIs.'
    },
    {
      question: 'Is URL encoding the same as HTML entity encoding?',
      answer: 'No. URL encoding uses percent-encoding (%20, %26) for URLs. HTML entity encoding uses &-entities (&nbsp;, &amp;) for displaying characters in HTML content. They serve different purposes. In HTML, use &amp; for "&". In URLs, use %26. Never mix them: "?name=John%26Doe" (URL-encoded "&") is correct; "?name=John&amp;Doe" (HTML entity) breaks URLs.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="1234567902" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="URL Encoder" currentHref="/url-encoder" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">URL Encoder & Decoder</h1>
              <p className="text-muted-foreground">Encode and decode URLs and query parameters safely</p>
            </div>

            <URLEncoder />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Encode/Decode URLs</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste URL or encoded string into the input field</li>
                <li>Choose encode or decode mode</li>
                <li>Click convert to process the URL</li>
                <li>Copy the encoded or decoded URL</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">URL Encoder Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>URL-Safe Encoding:</strong> Converts special characters to percent-encoded format</li>
                <li><strong>Query Parameter Support:</strong> Properly encodes key=value pairs</li>
                <li><strong>Special Character Handling:</strong> Handles spaces, &, ?, =, and more</li>
                <li><strong>Bidirectional Conversion:</strong> Encode and decode in one tool</li>
                <li><strong>Preserves URL Structure:</strong> Maintains protocol, domain, and path</li>
                <li><strong>100% Free:</strong> No limits on URL length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why URLs Need Encoding</h3>
              <p className="text-muted-foreground">
                URLs can only contain a <strong>limited set of ASCII characters</strong>. Special characters like spaces, &, #, ?, and non-ASCII characters must be percent-encoded (%20 for space, %26 for &) to avoid breaking the URL structure or conflicting with URL syntax.
              </p>
              <p className="text-muted-foreground">
                Example: The search query "cats & dogs" becomes "cats%20%26%20dogs" in a URL. Without encoding, the & would be interpreted as a parameter separator, breaking the query. Similarly, "München" becomes "M%C3%BCnchen" to preserve the ü character.
              </p>
              <p className="text-muted-foreground">
                Use cases: Building query strings for API requests, creating shareable URLs with user-generated content, encoding URL parameters for analytics tracking, and constructing redirect URLs with destination URLs as parameters.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All URL encoding and decoding happens locally in your browser. Your URLs and parameters are never uploaded to servers, stored, or logged. The processing uses JavaScript, keeping your data private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567814" />
          </div>
        </div>
      </div>
    </div>
  );
}

