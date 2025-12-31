import { Metadata } from 'next';
import WordCounter from '@/components/tools/string/WordCounter';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Word Counter & Character Counter - Free Online Tool | RawTools',
  description: 'Count words, characters, sentences, and paragraphs. Calculate reading time and speaking time. Fast, free, browser-based text analysis tool. 100% free.',
  keywords: 'word counter, character counter, text counter, reading time calculator, word count tool',
  openGraph: {
    title: 'Word Counter & Character Counter - Free Online Tool',
    description: 'Count words, characters, sentences, paragraphs. Calculate reading and speaking time. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/word-counter',
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
    title: 'Word Counter - Real-Time Stats | RawTools',
    description: 'Count words, characters, sentences, paragraphs. Calculate reading and speaking time instantly.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/word-counter');
}

export default function WordCounterPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Word Counter & Character Counter',
    description: 'Free online tool to count words, characters, sentences, and paragraphs. Calculate reading time and speaking time for your text.',
    url: 'https://rawtools.io/word-counter',
  });

  const howToSchema = generateHowToSchema({
    name: 'Word Counter & Character Counter',
    description: 'How to count words and characters in text',
    url: 'https://rawtools.io/word-counter',
  }, [
    'Paste or type text into the input area',
    'View automatic statistics: words, characters, sentences, paragraphs',
    'Check reading time (200 WPM) and speaking time (130 WPM)',
    'Use metrics for content planning and optimization'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567898" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Word Counter" currentHref="/word-counter" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Word Counter & Character Counter</h1>
              <p className="text-muted-foreground">Count words, characters, sentences, paragraphs, and calculate reading time</p>
            </div>

            <WordCounter />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Count Words and Characters</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste or type text into the input area</li>
                <li>View automatic statistics: words, characters, sentences, paragraphs</li>
                <li>Check reading time (200 WPM) and speaking time (130 WPM)</li>
                <li>Use metrics for content planning and optimization</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Word Counter Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Word Count:</strong> Total word count for essays, articles, and documents</li>
                <li><strong>Character Count:</strong> Characters with and without spaces</li>
                <li><strong>Sentence & Paragraph Count:</strong> Track document structure</li>
                <li><strong>Reading Time:</strong> Estimated time at 200 words per minute</li>
                <li><strong>Speaking Time:</strong> Estimated time at 130 words per minute</li>
                <li><strong>Line Count:</strong> Number of lines in multi-line text</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">How Reading Time is Calculated</h3>
              <p className="text-muted-foreground">
                Reading time uses the <strong>average silent reading speed</strong> of 200-250 words per minute for adults. We use 200 WPM as a conservative estimate. A 1000-word article takes approximately 5 minutes to read.
              </p>
              <p className="text-muted-foreground">
                Speaking time is calculated at 130-150 words per minute, which is the typical pace for presentations and speeches. This is slower than reading because speaking requires pauses for breath, emphasis, and audience comprehension.
              </p>
              <p className="text-muted-foreground">
                Use cases: Estimating blog post reading time for readers, planning speech duration for presentations, meeting word count requirements for essays and assignments, optimizing social media posts for character limits (Twitter 280, LinkedIn 3000), and ensuring meta descriptions stay under 160 characters for SEO.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All counting happens locally in your browser. Your text is never uploaded to servers, stored, or logged. The analysis uses JavaScript, keeping your content completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567812" />
          </div>
        </div>
      </div>
    </div>
  );
}

