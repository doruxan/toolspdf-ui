import { Metadata } from 'next';
import JWTDecoder from '@/components/tools/string/JWTDecoder';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'JWT Decoder - Decode JSON Web Tokens Online | RawTools',
  description: 'Decode and inspect JWT (JSON Web Token) header and payload online. Fast, secure, browser-based JWT decoder. No verification, just decoding. 100% free.',
  keywords: 'jwt decoder, json web token, jwt parser, decode jwt, jwt inspector, jwt debugger',
  openGraph: {
    title: 'JWT Decoder - Decode JSON Web Tokens Online',
    description: 'Decode and inspect JWT tokens in your browser. Fast, secure, no verification.',
    type: 'website',
  
    url: 'https://rawtools.io/jwt-decoder',
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
    title: 'JWT Decoder - Decode JSON Web Tokens | RawTools',
    description: 'Decode and inspect JWT tokens. View header, payload, and claims without verification.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/jwt-decoder');
}

export default function JWTDecoderPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'JWT Decoder',
    description: 'Free online tool to decode and inspect JWT (JSON Web Token) header and payload. Does not verify signatures or validate tokens.',
    url: 'https://rawtools.io/jwt-decoder',
  });

  const howToSchema = generateHowToSchema({
    name: 'JWT Decoder',
    description: 'How to decode JWT tokens',
    url: 'https://rawtools.io/jwt-decoder',
  }, [
    'Paste JWT token',
    'View decoded header and payload',
    'Inspect claims and metadata',
    'Note: Signature verification not performed'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567920" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="JWT Decoder" currentHref="/jwt-decoder" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">JWT Decoder</h1>
              <p className="text-muted-foreground">Decode and inspect JWT tokens for development</p>
            </div>

            <JWTDecoder />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Decode JWT Tokens</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste JWT token</li>
                <li>View decoded header and payload</li>
                <li>Inspect claims and metadata</li>
                <li>Note: Signature verification not performed</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">JWT Decoder Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Decode Header:</strong> View algorithm and token type</li>
                <li><strong>Decode Payload:</strong> Inspect claims, expiration, issuer</li>
                <li><strong>No Verification:</strong> Decoding only, no signature validation</li>
                <li><strong>Formatted JSON:</strong> Pretty-printed output for readability</li>
                <li><strong>Developer-Friendly:</strong> Quick debugging of JWT structure</li>
                <li><strong>100% Free:</strong> No limits on decoding</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What are JWT Tokens?</h3>
              <p className="text-muted-foreground">
                JWT (JSON Web Token) is a <strong>compact URL-safe token format</strong> for transmitting claims between parties. Structure: header.payload.signature (three Base64URL-encoded parts separated by dots). Header contains algorithm (HS256, RS256), payload contains claims (sub, exp, iat), signature verifies integrity.
              </p>
              <p className="text-muted-foreground">
                Example JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c. This tool decodes header and payload but does NOT verify the signature—use this for debugging, not for security validation.
              </p>
              <p className="text-muted-foreground">
                Use cases: Debugging authentication issues, inspecting token expiration times, checking claims in API responses, understanding JWT structure during development, verifying token contents without backend access, and troubleshooting SSO integration. Always verify JWTs on the server for security.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All JWT decoding happens locally in your browser. Your tokens are never uploaded to servers, stored, or logged. The decoding uses JavaScript, keeping your tokens completely private. Remember: JWTs are not encrypted, only signed—don&apos;t store sensitive data in payloads.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567823" />
          </div>
        </div>
      </div>
    </div>
  );
}
