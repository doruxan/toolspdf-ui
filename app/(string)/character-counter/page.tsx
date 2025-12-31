import { Metadata } from 'next';
import CharacterCounter from '@/components/tools/string/CharacterCounter';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Character Frequency Counter - Analyze Text Distribution | RawTools',
  description: 'Analyze character and word frequency distribution in text. Fast, free, browser-based frequency counter with percentages. 100% free.',
  keywords: 'character frequency, word frequency, text analysis, character counter, frequency distribution',
  openGraph: {
    title: 'Character Frequency Counter - Analyze Text Distribution',
    description: 'Analyze character and word frequency with visual distribution. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/character-counter',
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
    title: 'Character Frequency Counter | RawTools',
    description: 'Analyze character and word frequency with visual distribution charts. Instant analysis.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/character-counter');
}

export default function CharacterCounterPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Character Frequency Counter',
    description: 'Free online tool to analyze character and word frequency distribution in text. Shows counts, percentages, and visual distribution bars.',
    url: 'https://rawtools.io/character-counter',
  });

  const howToSchema = generateHowToSchema({
    name: 'Character Frequency Counter',
    description: 'How to analyze character and word frequency in text',
    url: 'https://rawtools.io/character-counter',
  }, [
    'Paste or type text into the input area',
    'View character frequency sorted by count',
    'See percentages and visual distribution bars',
    'Identify most and least common characters'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567940" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Character Frequency" currentHref="/character-counter" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Character Frequency Counter</h1>
              <p className="text-muted-foreground">Analyze character and word frequency distribution with visual bars</p>
            </div>

            <CharacterCounter />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Analyze Character Frequency</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste or type text into the input area</li>
                <li>View character frequency sorted by count</li>
                <li>See percentages and visual distribution bars</li>
                <li>Identify most and least common characters</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Character Frequency Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Character Distribution:</strong> See which letters appear most often</li>
                <li><strong>Percentage Breakdown:</strong> View each character's share of total text</li>
                <li><strong>Visual Bars:</strong> Graphical representation of frequency</li>
                <li><strong>Sorted by Frequency:</strong> Most common characters appear first</li>
                <li><strong>Case Sensitive Option:</strong> Analyze with or without case sensitivity</li>
                <li><strong>Real-Time Analysis:</strong> Updates as you type</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Analyze Character Frequency?</h3>
              <p className="text-muted-foreground">
                Character frequency analysis reveals <strong>patterns in text composition</strong>. In English text, 'e' is typically the most common letter (12-13%), followed by 't', 'a', 'o', 'i', 'n'. Deviations from this pattern can indicate specialized vocabulary, technical content, or non-English text.
              </p>
              <p className="text-muted-foreground">
                Frequency analysis is used in cryptography to break substitution ciphers. If an encrypted message has one symbol appearing 13% of the time, it likely represents 'e'. Linguists use frequency analysis to study writing patterns and identify authorship.
              </p>
              <p className="text-muted-foreground">
                Use cases: Cryptography and cipher breaking, linguistic analysis and research, password strength assessment, identifying unusual character patterns in data, detecting character encoding issues, and analyzing writing style for author attribution.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All frequency analysis happens locally in your browser. Your text is never uploaded to servers, stored, or logged. The analysis uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567833" />
          </div>
        </div>
      </div>
    </div>
  );
}

