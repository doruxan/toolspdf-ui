import { Metadata } from 'next';
import EmojiExtractor from '@/components/tools/string/EmojiExtractor';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Emoji Extractor - Extract Emojis from Text Online | RawTools',
  description: 'Extract all emojis from text or remove emojis completely. Fast, free, browser-based emoji extractor. Shows count and unique emojis. 100% free.',
  keywords: 'emoji extractor, extract emojis, remove emojis, emoji counter, emoji finder',
  openGraph: {
    title: 'Emoji Extractor - Extract Emojis from Text Online',
    description: 'Extract or remove emojis from text with counts. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/emoji-extractor',
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
    title: 'Emoji Extractor - Extract Emojis | RawTools',
    description: 'Extract all emojis from text or remove them completely. Shows count and unique emojis.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/emoji-extractor');
}

export default function EmojiExtractorPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Emoji Extractor',
    description: 'Free online tool to extract all emojis from text or remove emojis completely. Shows total count, unique emojis, and text without emojis.',
    url: 'https://rawtools.io/emoji-extractor',
  });

  const howToSchema = generateHowToSchema({
    name: 'Emoji Extractor',
    description: 'How to extract or remove emojis from text',
    url: 'https://rawtools.io/emoji-extractor',
  }, [
    'Paste text containing emojis',
    'View extracted emojis list',
    'See total count and unique emoji count',
    'Copy extracted emojis or text without emojis'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567944" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Emoji Extractor" currentHref="/emoji-extractor" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Emoji Extractor</h1>
              <p className="text-muted-foreground">Extract all emojis from text or remove them completely</p>
            </div>

            <EmojiExtractor />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Extract Emojis</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste text containing emojis</li>
                <li>View extracted emojis list</li>
                <li>See total count and unique emoji count</li>
                <li>Copy extracted emojis or text without emojis</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Emoji Extractor Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Extract All Emojis:</strong> Pull out every emoji character</li>
                <li><strong>Remove Emojis from Text:</strong> Get clean text without emojis</li>
                <li><strong>Count Total Emojis:</strong> See how many emojis appear</li>
                <li><strong>List Unique Emojis:</strong> View which different emojis are used</li>
                <li><strong>Unicode Emoji Support:</strong> Handles all standard emojis</li>
                <li><strong>100% Free:</strong> No limits on text length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Extract or Remove Emojis?</h3>
              <p className="text-muted-foreground">
                Emojis are <strong>Unicode characters</strong> that add visual meaning. Sometimes you need text without emojis for systems that don&apos;t support Unicode, or you want to analyze emoji usage in social media content for sentiment analysis.
              </p>
              <p className="text-muted-foreground">
                Example: You&apos;re analyzing 10,000 customer reviews and want to see which emojis appear most frequently to gauge sentiment. Or you have user-generated content with emojis that needs to go into an SMS system or legacy database that doesn&apos;t support Unicode properly.
              </p>
              <p className="text-muted-foreground">
                Use cases: Cleaning user input for legacy systems, analyzing social media sentiment by emoji, removing emojis from SMS messages, extracting reactions from chat logs, preparing text for translation services that don&apos;t handle emojis, and analyzing emoji usage patterns in marketing data.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All emoji extraction happens locally in your browser. Your text is never uploaded to servers, stored, or logged. The processing uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567835" />
          </div>
        </div>
      </div>
    </div>
  );
}

