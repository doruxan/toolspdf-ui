import { Metadata } from 'next';
import Base64Encoder from '@/components/tools/string/Base64Encoder';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Base64 Encoder/Decoder - Free Online Tool | RawTools',
  description: 'Encode and decode Base64 strings online. Fast, secure, browser-based Base64 converter with validation. Supports bidirectional conversion. 100% free.',
  keywords: 'base64 encoder, base64 decoder, base64 converter, encode base64, decode base64',
  openGraph: {
    title: 'Base64 Encoder/Decoder - Free Online Tool',
    description: 'Encode and decode Base64 strings with validation. Fast, secure, browser-based conversion.',
    type: 'website',
  
    url: 'https://rawtools.io/base64-encoder',
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
    title: 'Base64 Encoder/Decoder | RawTools',
    description: 'Encode and decode Base64 strings instantly. Fast, secure, browser-based encoding.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/base64-encoder');
}

export default function Base64EncoderPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Base64 Encoder/Decoder',
    description: 'Free online tool to encode and decode Base64 strings. Features validation, bidirectional conversion, and real-time processing.',
    url: 'https://rawtools.io/base64-encoder',
  });

  const howToSchema = generateHowToSchema({
    name: 'Base64 Encoder/Decoder',
    description: 'How to encode and decode Base64 strings',
    url: 'https://rawtools.io/base64-encoder',
  }, [
    'Paste text or Base64 string into the input field',
    'Select Encode or Decode mode',
    'Click the convert button to process',
    'Copy the encoded or decoded result'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567900" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Base64 Encoder" currentHref="/base64-encoder" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Base64 Encoder & Decoder</h1>
              <p className="text-muted-foreground">Encode text to Base64 or decode Base64 strings with validation</p>
            </div>

            <Base64Encoder />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Encode/Decode Base64</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste text or Base64 string into the input field</li>
                <li>Select Encode or Decode mode</li>
                <li>Click the convert button to process</li>
                <li>Copy the encoded or decoded result</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Base64 Encoder Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Bidirectional Conversion:</strong> Encode text to Base64 and decode Base64 to text</li>
                <li><strong>Input Validation:</strong> Detects invalid Base64 strings when decoding</li>
                <li><strong>Error Detection:</strong> Helpful messages for malformed input</li>
                <li><strong>Handles Special Characters:</strong> Correctly encodes Unicode and symbols</li>
                <li><strong>Real-Time Processing:</strong> Instant results as you type</li>
                <li><strong>100% Free:</strong> No limits on text length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is Base64 Encoding?</h3>
              <p className="text-muted-foreground">
                Base64 is a <strong>binary-to-text encoding scheme</strong> that represents binary data as ASCII characters. It converts groups of 3 bytes into 4 printable characters (A-Z, a-z, 0-9, +, /), making binary data safe for text-based protocols.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Embedding images in HTML/CSS as data URLs (data:image/png;base64,...), sending binary attachments in email (MIME), encoding API tokens and credentials, transmitting binary files through JSON APIs, and storing binary data in text-based formats like JSON or XML.
              </p>
              <p className="text-muted-foreground">
                <strong>Important:</strong> Base64 is NOT encryption. It's encoding for transport, not security. Anyone can decode Base64 strings. Never use Base64 alone for sensitive data—use proper encryption (AES, RSA) instead. Base64 increases data size by about 33% (3 bytes become 4 characters).
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All encoding and decoding happens locally in your browser. Your text and data never leave your device, are never uploaded to servers, and are never stored or logged anywhere.
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

