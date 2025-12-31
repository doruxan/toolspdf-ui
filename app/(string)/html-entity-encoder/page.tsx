import { Metadata } from 'next';
import HTMLEntityEncoder from '@/components/tools/string/HTMLEntityEncoder';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'HTML Entity Encoder/Decoder - Free Online Tool | RawTools',
  description: 'Encode and decode HTML entities and special characters online. Fast, secure, browser-based HTML entity converter. Handles &lt;, &gt;, &amp;, and more. 100% free.',
  keywords: 'html entity encoder, html entity decoder, html escape, html unescape, special characters, html entities',
  openGraph: {
    title: 'HTML Entity Encoder/Decoder - Free Online Tool',
    description: 'Encode and decode HTML entities. Fast, secure, browser-based conversion.',
    type: 'website',
  
    url: 'https://rawtools.io/html-entity-encoder',
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
    title: 'HTML Entity Encoder/Decoder | RawTools',
    description: 'Encode and decode HTML entities. Convert &lt; &gt; &amp; and special characters safely.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/html-entity-encoder');
}

export default function HTMLEntityEncoderPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'HTML Entity Encoder/Decoder',
    description: 'Free online tool to encode and decode HTML entities and special characters. Handles common entities like &lt;, &gt;, &amp;, &quot;, and numeric entities.',
    url: 'https://rawtools.io/html-entity-encoder',
  });

  const howToSchema = generateHowToSchema({
    name: 'HTML Entity Encoder/Decoder',
    description: 'How to encode and decode HTML entities',
    url: 'https://rawtools.io/html-entity-encoder',
  }, [
    'Paste text or HTML entities into the input field',
    'Choose encode or decode mode',
    'Click convert to process special characters',
    'Copy the encoded or decoded output'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567922" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="HTML Entity Encoder" currentHref="/html-entity-encoder" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">HTML Entity Encoder & Decoder</h1>
              <p className="text-muted-foreground">Encode special characters to HTML entities or decode them back to text</p>
            </div>

            <HTMLEntityEncoder />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Encode/Decode HTML Entities</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste text or HTML entities into the input field</li>
                <li>Choose encode or decode mode</li>
                <li>Click convert to process special characters</li>
                <li>Copy the encoded or decoded output</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">HTML Entity Encoder Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Common Entities:</strong> Converts &lt;, &gt;, &amp;, &quot;, &#39; automatically</li>
                <li><strong>Numeric Entities:</strong> Supports both decimal (&#38;#60;) and hexadecimal (&#38;#x3C;) formats</li>
                <li><strong>Bidirectional:</strong> Encode text to entities and decode entities to text</li>
                <li><strong>Special Character Handling:</strong> Properly encodes copyright, trademark, and Unicode symbols</li>
                <li><strong>Real-Time Processing:</strong> Instant conversion as you type</li>
                <li><strong>100% Free:</strong> No limits on text length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">When to Use HTML Entities</h3>
              <p className="text-muted-foreground">
                HTML entities are <strong>named or numeric references</strong> for special characters that have meaning in HTML syntax. Characters like &lt; and &gt; must be encoded as &amp;lt; and &amp;gt; to prevent browsers from interpreting them as HTML tags.
              </p>
              <p className="text-muted-foreground">
                Example: If you want to display &lt;div&gt; as text on a webpage, you must encode it as &amp;lt;div&amp;gt;. Without encoding, the browser would try to render an actual div element. Similarly, &amp; becomes &amp;amp;, " becomes &amp;quot;, and non-breaking spaces use &amp;nbsp;.
              </p>
              <p className="text-muted-foreground">
                Use cases: Displaying code snippets on web pages, preventing XSS attacks by encoding user input, including special characters like © (copyright) and € (euro) in HTML, and safely rendering user-generated content that might contain HTML-like syntax.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All HTML entity encoding and decoding happens locally in your browser. Your text and HTML content never leave your device, are never uploaded to servers, and are never stored or logged.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567824" />
          </div>
        </div>
      </div>
    </div>
  );
}

