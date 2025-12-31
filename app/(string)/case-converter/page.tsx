import { Metadata } from 'next';
import CaseConverter from '@/components/tools/string/CaseConverter';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Case Converter - camelCase, snake_case, kebab-case | RawTools',
  description: 'Convert text between camelCase, snake_case, kebab-case, PascalCase, UPPERCASE, lowercase, and more. Fast, free, browser-based case converter. No limits.',
  keywords: 'case converter, camelcase, snake case, kebab case, pascal case, text converter, string formatter',
  openGraph: {
    title: 'Case Converter - Convert Text Cases Online',
    description: 'Convert text between camelCase, snake_case, kebab-case, and 12+ case formats. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/case-converter',
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
    title: 'Case Converter - 12+ Formats | RawTools',
    description: 'Convert text between camelCase, snake_case, kebab-case, and 12+ case formats. Free & instant.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/case-converter');
}

export default function CaseConverterPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Case Converter',
    description: 'Free online tool to convert text between camelCase, snake_case, kebab-case, PascalCase, and more. Features 12+ case formats with real-time conversion.',
    url: 'https://rawtools.io/case-converter',
  });

  const howToSchema = generateHowToSchema({
    name: 'Case Converter',
    description: 'How to convert text between different case formats',
    url: 'https://rawtools.io/case-converter',
  }, [
    'Enter or paste text into the input field',
    'Select target case format from the dropdown (camelCase, snake_case, etc.)',
    'View real-time conversion in the output area',
    'Copy the converted text with one click'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567896" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Case Converter" currentHref="/case-converter" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Case Converter</h1>
              <p className="text-muted-foreground">Convert text between camelCase, snake_case, kebab-case, and 12+ formats</p>
            </div>

            <CaseConverter />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Convert Text Cases</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter or paste text into the input field</li>
                <li>Select target case format from the dropdown (camelCase, snake_case, etc.)</li>
                <li>View real-time conversion in the output area</li>
                <li>Copy the converted text with one click</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Case Converter Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>12 Case Formats:</strong> camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, dot.case, path/case, and more</li>
                <li><strong>Real-Time Conversion:</strong> See results instantly as you type</li>
                <li><strong>Preserves Text Integrity:</strong> Maintains original words and meaning</li>
                <li><strong>No Character Limits:</strong> Convert text of any length</li>
                <li><strong>Copy with One Click:</strong> Easily copy converted text</li>
                <li><strong>100% Free:</strong> No registration or usage limits</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Different Case Formats?</h3>
              <p className="text-muted-foreground">
                Different programming languages and contexts have <strong>naming conventions</strong> that dictate how to format identifiers. Using the correct case improves code readability and follows community standards.
              </p>
              <p className="text-muted-foreground">
                <strong>camelCase</strong> (firstName) is standard for JavaScript variables and functions. <strong>PascalCase</strong> (FirstName) is used for classes and React components. <strong>snake_case</strong> (first_name) is common in Python, Ruby, and database column names. <strong>kebab-case</strong> (first-name) is used for URLs, CSS classes, and HTML attributes. <strong>CONSTANT_CASE</strong> (FIRST_NAME) represents constants and environment variables.
              </p>
              <p className="text-muted-foreground">
                Use cases: Converting API field names between frontend (camelCase) and backend (snake_case), creating URL slugs from titles, generating database column names from class properties, and formatting CSS class names from component names.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All text conversion happens locally in your browser. Your text is never uploaded to servers, stored, or logged. The conversion uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567811" />
          </div>
        </div>
      </div>
    </div>
  );
}

