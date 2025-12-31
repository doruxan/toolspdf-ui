import { Metadata } from 'next';
import RemoveAccents from '@/components/tools/string/RemoveAccents';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Remove Accents - Strip Diacritics Online | RawTools',
  description: 'Remove accents and diacritics from text for ASCII-safe output. Fast, free, browser-based accent remover. Converts café to cafe. 100% free.',
  keywords: 'remove accents, strip diacritics, remove diacritics, accent remover, ascii converter, normalize text',
  openGraph: {
    title: 'Remove Accents - Strip Diacritics Online',
    description: 'Remove accents and diacritics for ASCII-safe text. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/remove-accents',
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
    title: 'Remove Accents - Strip Diacritics | RawTools',
    description: 'Remove accents and diacritical marks from text. Convert é to e, ñ to n, and more.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/remove-accents');
}

export default function RemoveAccentsPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Remove Accents Tool',
    description: 'Free online tool to remove accents and diacritics from text. Converts accented characters to their ASCII equivalents for compatibility.',
    url: 'https://rawtools.io/remove-accents',
  });

  const howToSchema = generateHowToSchema({
    name: 'Remove Accents Tool',
    description: 'How to remove accents and diacritics from text',
    url: 'https://rawtools.io/remove-accents',
  }, [
    'Paste text with accented characters into the input field',
    'View the text with accents automatically removed',
    'Accented characters are converted to ASCII equivalents (é → e)',
    'Copy the accent-free output'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567934" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Remove Accents" currentHref="/remove-accents" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Remove Accents & Diacritics</h1>
              <p className="text-muted-foreground">Strip accents and diacritics for ASCII-safe text output</p>
            </div>

            <RemoveAccents />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Remove Accents</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste text with accented characters into the input field</li>
                <li>View the text with accents automatically removed</li>
                <li>Accented characters are converted to ASCII equivalents (é → e)</li>
                <li>Copy the accent-free output</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Remove Accents Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>ASCII Conversion:</strong> Converts é, ñ, ü, ç and hundreds of accented characters</li>
                <li><strong>Diacritic Removal:</strong> Strips all combining diacritical marks</li>
                <li><strong>Preserves Base Characters:</strong> Maintains original letters (café → cafe)</li>
                <li><strong>Unicode Support:</strong> Handles characters from multiple languages</li>
                <li><strong>Real-Time Processing:</strong> See results instantly as you type</li>
                <li><strong>100% Free:</strong> No limits on text length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Remove Accents?</h3>
              <p className="text-muted-foreground">
                Accented characters cause <strong>compatibility issues</strong> in systems that only support ASCII. URLs, filenames, and database fields often require ASCII-only characters. "café.jpg" might fail to load on some systems, but "cafe.jpg" works universally.
              </p>
              <p className="text-muted-foreground">
                Example: A blog post titled "Crème Brûlée Recipe" needs a URL slug. You can't use "crème-brûlée" because web servers might mishandle the accents. Removing accents produces "creme-brulee", which is URL-safe and SEO-friendly while remaining readable.
              </p>
              <p className="text-muted-foreground">
                Use cases: Creating URL-friendly slugs for blog posts and products, generating safe filenames from user uploads, preparing text for SMS (which has encoding limitations), normalizing names for database searches, and ensuring compatibility with legacy systems that don't support Unicode.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All accent removal happens locally in your browser. Your text is never uploaded to servers, stored, or logged. The conversion uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567830" />
          </div>
        </div>
      </div>
    </div>
  );
}

