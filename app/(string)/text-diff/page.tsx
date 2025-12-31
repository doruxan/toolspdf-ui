import { Metadata } from 'next';
import TextDiff from '@/components/tools/string/TextDiff';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Text Diff Tool - Compare Text Online | RawTools',
  description: 'Compare two texts and highlight differences. Shows additions, deletions, and unchanged text. Fast, free, browser-based text comparison tool. 100% free.',
  keywords: 'text diff, text compare, diff tool, compare text, text comparison, diff checker',
  openGraph: {
    title: 'Text Diff Tool - Compare Text Online',
    description: 'Compare two texts with highlighted differences. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/text-diff',
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
    title: 'Text Diff - Compare Text Online | RawTools',
    description: 'Compare two texts and highlight differences. Shows additions, deletions, and changes.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/text-diff');
}

export default function TextDiffPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Text Diff Tool',
    description: 'Free online tool to compare two texts and highlight differences. Shows additions, deletions, and unchanged text with detailed statistics.',
    url: 'https://rawtools.io/text-diff',
  });

  const howToSchema = generateHowToSchema({
    name: 'Text Diff Tool',
    description: 'How to compare two texts and see differences',
    url: 'https://rawtools.io/text-diff',
  }, [
    'Paste original text into left panel',
    'Paste modified text into right panel',
    'Click compare to see differences',
    'View additions (green), deletions (red), and changes'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567924" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Text Diff" currentHref="/text-diff" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Text Diff Tool</h1>
              <p className="text-muted-foreground">Compare two texts and highlight differences with color coding</p>
            </div>

            <TextDiff />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Compare Text</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste original text into left panel</li>
                <li>Paste modified text into right panel</li>
                <li>Click compare to see differences</li>
                <li>View additions (green), deletions (red), and changes</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Text Diff Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Side-by-Side Comparison:</strong> View both texts simultaneously</li>
                <li><strong>Color-Coded Differences:</strong> Additions in green, deletions in red, unchanged in gray</li>
                <li><strong>Word-Level Diff:</strong> Precise highlighting of changed words</li>
                <li><strong>Statistics:</strong> Count of additions, deletions, and changes</li>
                <li><strong>Line Numbers:</strong> Easy reference for specific changes</li>
                <li><strong>100% Free:</strong> No limits on text length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Compare Text?</h3>
              <p className="text-muted-foreground">
                Text diff shows <strong>what changed between two versions</strong>. Essential for code reviews, document revisions, and comparing contract versions. The diff algorithm finds the smallest set of changes to transform one text to another.
              </p>
              <p className="text-muted-foreground">
                Example: You sent a contract to a client, they made edits, and sent it back. Instead of reading both versions line-by-line, diff highlights only the changes. Or in code review, you see exactly which lines a developer modified without reading unchanged code.
              </p>
              <p className="text-muted-foreground">
                Use cases: Comparing document versions, code review before merging, detecting unauthorized changes to content, tracking content edits over time, debugging why two similar texts behave differently, and verifying translations against originals.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All text comparison happens locally in your browser. Both texts are never uploaded to servers, stored, or logged. The diff algorithm runs in JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567825" />
          </div>
        </div>
      </div>
    </div>
  );
}

