import { Metadata } from 'next';
import HTMLToText from '@/components/tools/string/HTMLToText';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'HTML to Text Converter - Strip HTML Tags Online | RawTools',
  description: 'Strip HTML tags and extract plain text online. Fast, free, browser-based HTML to text converter. Removes all tags and scripts. 100% free.',
  keywords: 'html to text, strip html tags, html remover, extract text from html, html cleaner',
  openGraph: {
    title: 'HTML to Text Converter - Strip HTML Tags Online',
    description: 'Strip HTML tags and extract plain text. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/html-to-text',
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
    title: 'HTML to Text - Strip HTML Tags | RawTools',
    description: 'Strip HTML tags and extract plain text. Removes all markup, scripts, and styles.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/html-to-text');
}

export default function HTMLToTextPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'HTML to Text Converter',
    description: 'Free online tool to strip HTML tags and extract plain text. Removes all HTML markup, scripts, and styles to leave clean text.',
    url: 'https://rawtools.io/html-to-text',
  });

  const howToSchema = generateHowToSchema({
    name: 'HTML to Text Converter',
    description: 'How to strip HTML tags and extract text',
    url: 'https://rawtools.io/html-to-text',
  }, [
    'Paste HTML code',
    'View extracted plain text',
    'All tags, scripts, and styles removed',
    'Copy clean text'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567938" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="HTML to Text" currentHref="/html-to-text" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">HTML to Text Converter</h1>
              <p className="text-muted-foreground">Strip HTML tags and extract plain text</p>
            </div>

            <HTMLToText />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Extract Text from HTML</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste HTML code</li>
                <li>View extracted plain text</li>
                <li>All tags, scripts, and styles removed</li>
                <li>Copy clean text</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">HTML to Text Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Strip All Tags:</strong> Removes &lt;div&gt;, &lt;span&gt;, &lt;p&gt;, etc.</li>
                <li><strong>Remove Scripts:</strong> Eliminates JavaScript code</li>
                <li><strong>Remove Styles:</strong> Strips CSS styling</li>
                <li><strong>Decode HTML Entities:</strong> Converts &amp;nbsp; to spaces, &amp;lt; to &lt;</li>
                <li><strong>Clean Output:</strong> Pure text without markup</li>
                <li><strong>100% Free:</strong> No limits on conversions</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Strip HTML Tags?</h3>
              <p className="text-muted-foreground">
                HTML tags add <strong>markup and formatting</strong> but sometimes you need the raw text. Useful for word counts, text analysis, copying content to plain text editors, extracting article content from web scraping, and preparing text for systems that don&apos;t accept HTML.
              </p>
              <p className="text-muted-foreground">
                Example: You scrape product descriptions from a website and get &quot;&lt;div class=&apos;desc&apos;&gt;Amazing &lt;strong&gt;product&lt;/strong&gt;&lt;/div&gt;&quot;. You need just &quot;Amazing product&quot; to import into your database. Or you have an email template in HTML and need to generate a plain text version for email clients that don&apos;t support HTML.
              </p>
              <p className="text-muted-foreground">
                Use cases: Extracting article text from web scraping, generating plain text email versions, analyzing text content without markup, preparing text for SMS or plain text systems, counting actual words in HTML documents, and cleaning pasted content from rich text editors.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All HTML stripping happens locally in your browser. Your HTML is never uploaded to servers, stored, or logged. The conversion uses JavaScript, keeping your content completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567832" />
          </div>
        </div>
      </div>
    </div>
  );
}
