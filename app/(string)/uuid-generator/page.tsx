import { Metadata } from 'next';
import UUIDGenerator from '@/components/tools/string/UUIDGenerator';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'UUID Generator - Generate v4 UUIDs Online | RawTools',
  description: 'Generate version 4 UUIDs (Universally Unique Identifiers) online. Batch generation up to 100 UUIDs. Fast, secure, browser-based. 100% free.',
  keywords: 'uuid generator, guid generator, unique id generator, v4 uuid, uuid v4, generate uuid',
  openGraph: {
    title: 'UUID Generator - Generate v4 UUIDs Online',
    description: 'Generate version 4 UUIDs with batch support. Fast, secure, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/uuid-generator',
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
    title: 'UUID Generator - Generate v4 UUIDs | RawTools',
    description: 'Generate version 4 UUIDs. Batch generation up to 100 UUIDs with secure random numbers.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/uuid-generator');
}

export default function UUIDGeneratorPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'UUID Generator',
    description: 'Free online tool to generate version 4 UUIDs (Universally Unique Identifiers). Supports batch generation up to 100 UUIDs using cryptographically strong random numbers.',
    url: 'https://rawtools.io/uuid-generator',
  });

  const howToSchema = generateHowToSchema({
    name: 'UUID Generator',
    description: 'How to generate UUIDs',
    url: 'https://rawtools.io/uuid-generator',
  }, [
    'Enter number of UUIDs to generate (1-100)',
    'Click generate',
    'View unique UUIDs (v4 format)',
    'Copy individual or all UUIDs'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567914" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="UUID Generator" currentHref="/uuid-generator" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">UUID Generator</h1>
              <p className="text-muted-foreground">Generate v4 UUIDs for unique identifiers</p>
            </div>

            <UUIDGenerator />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Generate UUIDs</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter number of UUIDs to generate (1-100)</li>
                <li>Click generate</li>
                <li>View unique UUIDs (v4 format)</li>
                <li>Copy individual or all UUIDs</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">UUID Generator Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>UUID v4 Generation:</strong> Random 128-bit identifiers</li>
                <li><strong>Batch Generation:</strong> Create 1-100 UUIDs at once</li>
                <li><strong>Cryptographically Secure:</strong> Uses secure random number generation</li>
                <li><strong>Copy Individual or All:</strong> Flexible copying options</li>
                <li><strong>Standard Format:</strong> Lowercase with hyphens (8-4-4-4-12)</li>
                <li><strong>100% Free:</strong> No limits on generation</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What are UUIDs?</h3>
              <p className="text-muted-foreground">
                UUIDs (Universally Unique Identifiers) are <strong>128-bit values</strong> guaranteed to be unique. UUIDv4 uses random generation with 2^122 possible combinations. Format: 8-4-4-4-12 hexadecimal digits. Chance of collision is negligible (1 in 5.3 undecillion).
              </p>
              <p className="text-muted-foreground">
                Example UUID: c9bf9e57-1685-4c89-bafb-ff5af830be8a. The third group always starts with 4 (indicating version 4), and the fourth group starts with 8, 9, a, or b (indicating variant). These constraints ensure standard compliance while maintaining randomness.
              </p>
              <p className="text-muted-foreground">
                Use cases: Database primary keys without auto-increment, API request IDs for tracking, session identifiers for web applications, file naming to prevent conflicts, distributed system identifiers, and tracking unique events in analytics.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All UUID generation happens locally in your browser using cryptographically secure random numbers. No UUIDs are uploaded to servers, stored, or logged. The generation uses JavaScript, keeping your identifiers completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567820" />
          </div>
        </div>
      </div>
    </div>
  );
}

