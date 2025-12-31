import { Metadata } from 'next';
import BracketMatcher from '@/components/tools/string/BracketMatcher';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Bracket Matcher - Check Balanced Brackets Online | RawTools',
  description: 'Check if brackets, parentheses, and braces are balanced. Fast, free, browser-based bracket validator. Shows errors and positions. 100% free.',
  keywords: 'bracket matcher, bracket validator, check brackets, balanced parentheses, bracket checker',
  openGraph: {
    title: 'Bracket Matcher - Check Balanced Brackets Online',
    description: 'Check if brackets are balanced with error reporting. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/bracket-matcher',
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
    title: 'Bracket Matcher - Validate Brackets | RawTools',
    description: 'Validate matching brackets, parentheses, and braces. Find unmatched pairs instantly.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/bracket-matcher');
}

export default function BracketMatcherPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Bracket Matcher',
    description: 'Free online tool to check if brackets, parentheses, and braces are balanced. Shows detailed error messages and positions.',
    url: 'https://rawtools.io/bracket-matcher',
  });

  const howToSchema = generateHowToSchema({
    name: 'Bracket Matcher',
    description: 'How to check if brackets are balanced',
    url: 'https://rawtools.io/bracket-matcher',
  }, [
    'Paste code or text with brackets into the input',
    'Tool automatically checks for matching pairs',
    'View validation results: balanced or errors',
    'See error positions and which brackets are unmatched'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567942" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Bracket Matcher" currentHref="/bracket-matcher" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Bracket Matcher</h1>
              <p className="text-muted-foreground">Check if brackets, parentheses, and braces are balanced</p>
            </div>

            <BracketMatcher />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Check Balanced Brackets</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Paste code or text with brackets into the input</li>
                <li>Tool automatically checks for matching pairs</li>
                <li>View validation results: balanced or errors</li>
                <li>See error positions and which brackets are unmatched</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Bracket Matcher Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Multiple Bracket Types:</strong> Validates (), [], and {}</li>
                <li><strong>Error Detection:</strong> Identifies unmatched, mismatched, or extra brackets</li>
                <li><strong>Position Reporting:</strong> Shows exact line and character of errors</li>
                <li><strong>Real-Time Validation:</strong> Checks as you type</li>
                <li><strong>Detailed Messages:</strong> Explains what's wrong and where</li>
                <li><strong>100% Free:</strong> No limits on text length or usage</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Bracket Matching Matters</h3>
              <p className="text-muted-foreground">
                Unbalanced brackets are a <strong>common syntax error</strong> in programming. Missing a closing {`}`} or having an extra ( causes code to fail compilation or execution. Bracket matchers help debug these issues before running code.
              </p>
              <p className="text-muted-foreground">
                Balanced brackets follow strict rules: Every opening bracket must have a matching closing bracket in the correct order. [( )] is valid, but [( ]) is not (brackets closed in wrong order). This is validated using a stack data structure.
              </p>
              <p className="text-muted-foreground">
                Use cases: Validating code before compilation, debugging syntax errors in JSON/JavaScript/Python, checking mathematical expressions for correctness, finding missing brackets in complex nested structures, and ensuring proper nesting in template engines.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All bracket validation happens locally in your browser. Your code and text are never uploaded to servers, stored, or logged. The validation uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567834" />
          </div>
        </div>
      </div>
    </div>
  );
}

