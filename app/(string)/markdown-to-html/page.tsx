import { Metadata } from 'next';
import MarkdownToHTML from '@/components/tools/string/MarkdownToHTML';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Markdown to HTML Converter - Free Online Tool | RawTools',
  description: 'Convert Markdown to HTML with live preview. Fast, free, browser-based Markdown converter. Supports GFM, tables, and more. 100% free.',
  keywords: 'markdown to html, markdown converter, md to html, markdown parser, markdown preview',
  openGraph: {
    title: 'Markdown to HTML Converter - Free Online Tool',
    description: 'Convert Markdown to HTML with live preview. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/markdown-to-html',
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
    title: 'Markdown to HTML Converter | RawTools',
    description: 'Convert Markdown to HTML with live preview. Supports GFM, tables, and code blocks.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/markdown-to-html');
}

export default function MarkdownToHTMLPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Markdown to HTML Converter',
    description: 'Free online tool to convert Markdown to HTML. Features live preview, GitHub Flavored Markdown support, and secure HTML output.',
    url: 'https://rawtools.io/markdown-to-html',
  });

  const howToSchema = generateHowToSchema({
    name: 'Markdown to HTML Converter',
    description: 'How to convert Markdown to HTML',
    url: 'https://rawtools.io/markdown-to-html',
  }, [
    'Paste or type Markdown text',
    'View live HTML preview',
    'Copy generated HTML code',
    'Use in your website or project'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567936" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Markdown to HTML" currentHref="/markdown-to-html" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Markdown to HTML Converter</h1>
              <p className="text-muted-foreground">Convert Markdown to HTML with live preview</p>
            </div>

            <MarkdownToHTML />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Convert Markdown to HTML</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste or type Markdown text</li>
                <li>View live HTML preview</li>
                <li>Copy generated HTML code</li>
                <li>Use in your website or project</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Markdown Converter Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>GitHub Flavored Markdown:</strong> Full GFM support</li>
                <li><strong>Live Preview:</strong> See rendered HTML in real-time</li>
                <li><strong>Tables, Lists, Code Blocks:</strong> All Markdown features</li>
                <li><strong>Sanitized Output:</strong> Secure HTML generation</li>
                <li><strong>Copy HTML:</strong> One-click copy to clipboard</li>
                <li><strong>100% Free:</strong> No limits on conversions</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is Markdown?</h3>
              <p className="text-muted-foreground">
                Markdown is a <strong>lightweight markup language</strong> for creating formatted text using plain text syntax. Created in 2004 by John Gruber. Syntax: # for headers, ** for bold, * for italic, - for lists, ``` for code blocks. Readable as plain text, converts to HTML for rendering.
              </p>
              <p className="text-muted-foreground">
                Example: &quot;## Title&quot; becomes &lt;h2&gt;Title&lt;/h2&gt;. &quot;**bold**&quot; becomes &lt;strong&gt;bold&lt;/strong&gt;. GitHub Flavored Markdown (GFM) adds tables, strikethrough, task lists, and auto-linking. This tool uses the marked library which follows CommonMark spec with GFM extensions.
              </p>
              <p className="text-muted-foreground">
                Use cases: Converting README files to HTML, blog post authoring, documentation generation, email formatting, note-taking apps, static site generators, CMS content, and any workflow where you write in Markdown but need HTML output.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All Markdown conversion happens locally in your browser. Your text is never uploaded to servers, stored, or logged. The conversion uses JavaScript, keeping your content completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567831" />
          </div>
        </div>
      </div>
    </div>
  );
}
