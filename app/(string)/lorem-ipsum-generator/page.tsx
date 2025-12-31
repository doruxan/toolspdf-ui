import { Metadata } from 'next';
import LoremIpsumGenerator from '@/components/tools/string/LoremIpsumGenerator';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Lorem Ipsum Generator - Placeholder Text Generator | RawTools',
  description: 'Generate Lorem Ipsum placeholder text with customizable paragraphs, sentences, and words. Fast, free, browser-based generator for designers and developers. 100% free.',
  keywords: 'lorem ipsum generator, placeholder text, dummy text generator, lorem ipsum, filler text',
  openGraph: {
    title: 'Lorem Ipsum Generator - Placeholder Text Generator',
    description: 'Generate Lorem Ipsum placeholder text with customizable options. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/lorem-ipsum-generator',
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
    title: 'Lorem Ipsum Generator | RawTools',
    description: 'Generate Lorem Ipsum placeholder text. Customizable paragraphs and word count.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/lorem-ipsum-generator');
}

export default function LoremIpsumGeneratorPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Lorem Ipsum Generator',
    description: 'Free online tool to generate Lorem Ipsum placeholder text. Customize paragraphs, sentences, and word count for your design needs.',
    url: 'https://rawtools.io/lorem-ipsum-generator',
  });

  const howToSchema = generateHowToSchema({
    name: 'Lorem Ipsum Generator',
    description: 'How to generate Lorem Ipsum placeholder text',
    url: 'https://rawtools.io/lorem-ipsum-generator',
  }, [
    'Enter number of paragraphs needed',
    'Choose words per paragraph',
    'Click generate',
    'Copy the placeholder text'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567906" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Lorem Ipsum Generator" currentHref="/lorem-ipsum-generator" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Lorem Ipsum Generator</h1>
              <p className="text-muted-foreground">Generate Lorem Ipsum placeholder text for design mockups</p>
            </div>

            <LoremIpsumGenerator />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Generate Lorem Ipsum</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter number of paragraphs needed</li>
                <li>Choose words per paragraph</li>
                <li>Click generate</li>
                <li>Copy the placeholder text</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Lorem Ipsum Generator Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Custom Paragraph Count:</strong> Generate 1-100 paragraphs</li>
                <li><strong>Configurable Word Count:</strong> Control words per paragraph</li>
                <li><strong>Classic Lorem Ipsum Text:</strong> Standard placeholder from Cicero&apos;s &quot;de Finibus&quot;</li>
                <li><strong>Real-Time Generation:</strong> Instant placeholder text</li>
                <li><strong>Copy with One Click:</strong> Easy to use in your projects</li>
                <li><strong>100% Free:</strong> No limits on generation</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is Lorem Ipsum?</h3>
              <p className="text-muted-foreground">
                Lorem Ipsum is <strong>placeholder text</strong> used in design mockups since the 1500s. It prevents clients from reading draft copy and focuses attention on layout and typography. The text is derived from Cicero&apos;s &quot;de Finibus Bonorum et Malorum&quot; written in 45 BC.
              </p>
              <p className="text-muted-foreground">
                Lorem Ipsum uses normal distribution of letters, making it look like readable English without being distracting. Real content would draw attention away from design elements. The scrambled Latin text has been industry standard for over 500 years.
              </p>
              <p className="text-muted-foreground">
                Use cases: Website wireframes and mockups, print design layouts, testing text overflow in responsive designs, demonstrating font rendering in style guides, filling CMS templates during development, and creating realistic design presentations without final copy.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All text generation happens locally in your browser. No data is uploaded to servers, stored, or logged. The generation uses JavaScript, keeping your usage completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567816" />
          </div>
        </div>
      </div>
    </div>
  );
}

