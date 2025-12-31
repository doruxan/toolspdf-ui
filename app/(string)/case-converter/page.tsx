import { Metadata } from 'next';
import CaseConverter from '@/components/tools/string/CaseConverter';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
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

  const faqSchema = generateFAQSchema([
    {
      question: 'What is the difference between camelCase and PascalCase?',
      answer: 'camelCase starts with a lowercase letter (e.g., userName), while PascalCase starts with an uppercase letter (e.g., UserName). Both remove spaces and capitalize subsequent words. camelCase is common for JavaScript variables and functions. PascalCase is used for class names, React components, and C# naming conventions.'
    },
    {
      question: 'When should I use snake_case vs kebab-case?',
      answer: 'snake_case uses underscores (user_name) and is standard in Python, Ruby, and database column names. kebab-case uses hyphens (user-name) and is used in URLs, CSS class names, and HTML attributes. Most file systems and databases prefer snake_case. Web URLs and front-end code prefer kebab-case for SEO and readability.'
    },
    {
      question: 'What is SCREAMING_SNAKE_CASE used for?',
      answer: 'SCREAMING_SNAKE_CASE (ALL_CAPS_WITH_UNDERSCORES) is used for constants and environment variables in most programming languages. Examples: MAX_RETRY_COUNT in Python, API_KEY in Node.js, DATABASE_URL in config files. This convention signals that values should not change during program execution.'
    },
    {
      question: 'Can I convert multiple lines of text at once?',
      answer: 'Yes. Paste multiline text and the converter processes each line independently. This is useful for converting variable lists, converting CSV column headers, or batch-processing code identifiers. Each line maintains its own conversion, preserving the structure of your input.'
    },
    {
      question: 'How does the converter handle special characters?',
      answer: 'Special characters (!, @, #, $, %, etc.) are typically removed during conversion since programming identifiers do not support them. Numbers are preserved (user2Name → user2Name). Spaces, hyphens, and underscores are used as word delimiters and then replaced with the target format conventions (spaces become underscores in snake_case, removed in camelCase).'
    },
    {
      question: 'Is case conversion reversible?',
      answer: 'Partially. Converting from camelCase or PascalCase back to separate words works well (userName → user name). However, converting from UPPERCASE or lowercase loses word boundary information, making reverse conversion imperfect (username → user name requires manual adjustment). Always keep original text if you need exact reversibility.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
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

