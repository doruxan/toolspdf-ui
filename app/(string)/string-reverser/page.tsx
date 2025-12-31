import { Metadata } from 'next';
import StringReverser from '@/components/tools/string/StringReverser';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'String Reverser - Reverse Text, Words, Lines Online | RawTools',
  description: 'Reverse text characters, word order, or line order online. Fast, free, browser-based string reverser with multiple modes. 100% free.',
  keywords: 'string reverser, reverse text, text reverser, reverse words, reverse lines, backwards text',
  openGraph: {
    title: 'String Reverser - Reverse Text Online',
    description: 'Reverse text characters, words, or lines. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/string-reverser',
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
    title: 'String Reverser - Reverse Text | RawTools',
    description: 'Reverse text strings instantly. Character-by-character or word-by-word reversal.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/string-reverser');
}

export default function StringReverserPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'String Reverser',
    description: 'Free online tool to reverse text characters, word order, or line order. Multiple reverse modes for different use cases.',
    url: 'https://rawtools.io/string-reverser',
  });

  const howToSchema = generateHowToSchema({
    name: 'String Reverser',
    description: 'How to reverse text, words, or lines',
    url: 'https://rawtools.io/string-reverser',
  }, [
    'Enter or paste text into the input field',
    'Select reverse mode (characters, words, or lines)',
    'View the reversed output automatically',
    'Copy the reversed text'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567928" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="String Reverser" currentHref="/string-reverser" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">String Reverser</h1>
              <p className="text-muted-foreground">Reverse text characters, word order, or line order</p>
            </div>

            <StringReverser />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Reverse Text</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter or paste text into the input field</li>
                <li>Select reverse mode (characters, words, or lines)</li>
                <li>View the reversed output automatically</li>
                <li>Copy the reversed text</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">String Reverser Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Reverse Characters:</strong> Flip entire text backwards (hello → olleh)</li>
                <li><strong>Reverse Words:</strong> Reverse word order while keeping letters intact (hello world → world hello)</li>
                <li><strong>Reverse Lines:</strong> Flip line order in multi-line text</li>
                <li><strong>Real-Time Processing:</strong> See results instantly as you type</li>
                <li><strong>Unicode Support:</strong> Correctly handles emojis and special characters</li>
                <li><strong>100% Free:</strong> No limits on text length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Reverse Text?</h3>
              <p className="text-muted-foreground">
                Text reversal has <strong>practical and creative applications</strong>. Character reversal is used for testing palindrome detection algorithms, obfuscating spoilers in forums, and creating mirror text for design purposes.
              </p>
              <p className="text-muted-foreground">
                Word reversal is useful for natural language processing experiments, testing text parsers, and creating word games or puzzles. Line reversal helps when reading logs in reverse chronological order or preparing data for specific import formats.
              </p>
              <p className="text-muted-foreground">
                Use cases: Testing string manipulation functions in code, creating puzzles or riddles, debugging text processing algorithms, generating obfuscated text for spoiler protection, and preparing data for reverse-order processing.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All text reversal happens locally in your browser. Your text is never uploaded to servers, stored, or logged. The reversal uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567827" />
          </div>
        </div>
      </div>
    </div>
  );
}

