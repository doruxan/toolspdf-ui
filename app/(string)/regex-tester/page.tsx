import { Metadata } from 'next';
import RegexTester from '@/components/tools/string/RegexTester';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Regex Tester - Test Regular Expressions Online | RawTools',
  description: 'Test regular expressions with match highlighting and common patterns. Fast, free, browser-based regex tester. Supports flags and groups. 100% free.',
  keywords: 'regex tester, regular expression, regex validator, regex test, regex tool, pattern matcher',
  openGraph: {
    title: 'Regex Tester - Test Regular Expressions Online',
    description: 'Test regex patterns with highlighting. Fast, free, browser-based regex tester.',
    type: 'website',
  
    url: 'https://rawtools.io/regex-tester',
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
    title: 'Regex Tester - Test Patterns | RawTools',
    description: 'Test regular expressions with match highlighting. Supports flags and real-time testing.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/regex-tester');
}

export default function RegexTesterPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Regex Tester',
    description: 'Free online tool to test regular expressions with match highlighting. Includes common patterns for email, URL, phone, IP address, and more.',
    url: 'https://rawtools.io/regex-tester',
  });

  const howToSchema = generateHowToSchema({
    name: 'Regex Tester',
    description: 'How to test regular expressions online',
    url: 'https://rawtools.io/regex-tester',
  }, [
    'Enter your regex pattern (e.g., \\d{3}-\\d{4})',
    'Add test string to match against',
    'Choose flags (g=global, i=case-insensitive, m=multiline)',
    'View matches with highlighting and capture groups'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What is a regular expression?',
      answer: 'A regular expression (regex) is a pattern-matching language for searching and manipulating text. Regex uses special characters to define search patterns: "\\d" matches digits, "." matches any character, "*" means zero or more repetitions. Example: "\\d{3}-\\d{4}" matches phone numbers like "555-1234". Regex is used in text editors, programming languages, data validation, log parsing, and search-replace operations across virtually all modern development tools.'
    },
    {
      question: 'What do regex flags (g, i, m) do?',
      answer: 'Flags modify regex behavior. "g" (global) finds all matches instead of stopping at the first match. "i" (case-insensitive) makes "ABC" match "abc". "m" (multiline) makes "^" and "$" match line boundaries instead of string boundaries. "s" (dotall) makes "." match newlines. "u" (unicode) enables Unicode property escapes. Example: /hello/gi finds all occurrences of "hello", "Hello", "HELLO" in text.'
    },
    {
      question: 'How do I match email addresses with regex?',
      answer: 'Basic email pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$". This matches "user@example.com". However, full RFC 5322 email validation is extremely complex (thousands of characters). For production: use basic patterns for UI validation, then verify via email confirmation link. Never rely solely on regex for email validation; addresses like "user+tag@domain.co.uk" have many edge cases.'
    },
    {
      question: 'What are capture groups in regex?',
      answer: 'Capture groups extract parts of matches using parentheses. Pattern "(\\d{3})-(\\d{4})" applied to "555-1234" captures two groups: group 1 = "555", group 2 = "1234". Non-capturing groups "(?:...)" match but do not capture. Named groups "(?<name>...)" assign names to captures. Use captures for: extracting data (phone area codes), search-replace ($1, $2 placeholders), or conditional matching.'
    },
    {
      question: 'Why does my regex match too much or too little?',
      answer: 'Common issues: greedy vs lazy quantifiers. ".*" (greedy) matches as much as possible; ".*?" (lazy) matches as little as possible. Example: in "<b>hello</b><b>world</b>", pattern "<b>.*</b>" matches entire string (greedy); "<b>.*?</b>" matches each tag separately (lazy). Anchors matter: "abc" matches "abc" anywhere; "^abc$" requires entire string to be exactly "abc". Test edge cases and boundary conditions.'
    },
    {
      question: 'Can regex validate all formats (URLs, phone numbers, IBANs)?',
      answer: 'Regex works for simple formats but fails for complex ones. URLs: regex cannot validate all valid URLs per RFC 3986 (use URL parser libraries). Phone numbers: regex handles formatting (123-456-7890) but not validity (real phone numbers require carrier databases). IBANs: regex checks format but not MOD-97 checksum (use specialized validators). Use regex for format checking; use dedicated libraries/APIs for comprehensive validation.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="1234567926" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Regex Tester" currentHref="/regex-tester" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Regex Tester</h1>
              <p className="text-muted-foreground">Test regular expressions with match highlighting and capture groups</p>
            </div>

            <RegexTester />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Test Regular Expressions</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter your regex pattern (e.g., \d{3}-\d{4})</li>
                <li>Add test string to match against</li>
                <li>Choose flags (g=global, i=case-insensitive, m=multiline)</li>
                <li>View matches with highlighting and capture groups</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Regex Tester Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Pattern Validation:</strong> Checks if regex syntax is valid</li>
                <li><strong>Match Highlighting:</strong> Visual highlighting of matched text</li>
                <li><strong>Group Capture Display:</strong> Shows captured groups separately</li>
                <li><strong>Common Pattern Library:</strong> Pre-built patterns for email, URL, phone, etc.</li>
                <li><strong>Multi-flag Support:</strong> g (global), i (case-insensitive), m (multiline)</li>
                <li><strong>Real-Time Testing:</strong> Matches update as you type</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What are Regular Expressions?</h3>
              <p className="text-muted-foreground">
                Regular expressions (regex) are <strong>patterns for matching text</strong>. They're used to validate input, extract data, and search-and-replace operations. A regex like ^\d{3}-\d{4}$ matches phone numbers in format 555-1234.
              </p>
              <p className="text-muted-foreground">
                Common patterns: \d matches digits, \w matches word characters, . matches any character, * means zero or more, + means one or more. Flags modify behavior: g finds all matches (not just first), i ignores case, m makes ^ and $ match line boundaries.
              </p>
              <p className="text-muted-foreground">
                Use cases: Validating email addresses and phone numbers, extracting URLs from text, parsing log files, find-and-replace in code editors, sanitizing user input, and web scraping. Warning: Complex regex can be slow on large text—test performance before using in production.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All regex testing happens locally in your browser. Your patterns and test strings are never uploaded to servers, stored, or logged. The testing uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567826" />
          </div>
        </div>
      </div>
    </div>
  );
}

