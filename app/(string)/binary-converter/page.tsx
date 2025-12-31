import { Metadata } from 'next';
import BinaryConverter from '@/components/tools/string/BinaryConverter';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Binary Converter - Binary, Hex, Decimal Converter | RawTools',
  description: 'Convert between binary, hexadecimal, and decimal formats. Fast, free, browser-based number system converter. Supports text encoding. 100% free.',
  keywords: 'binary converter, hex converter, decimal converter, binary to hex, hex to decimal, number converter',
  openGraph: {
    title: 'Binary Converter - Binary, Hex, Decimal Converter',
    description: 'Convert between binary, hexadecimal, and decimal. Fast, free, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/binary-converter',
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
    title: 'Binary Converter - Binary, Hex, Decimal | RawTools',
    description: 'Convert between binary, hexadecimal, and decimal. Supports text encoding to binary/hex.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/binary-converter');
}

export default function BinaryConverterPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Binary Converter',
    description: 'Free online tool to convert between binary, hexadecimal, and decimal number systems. Supports text encoding to binary and hex.',
    url: 'https://rawtools.io/binary-converter',
  });

  const howToSchema = generateHowToSchema({
    name: 'Binary Converter',
    description: 'How to convert between binary, hex, and decimal',
    url: 'https://rawtools.io/binary-converter',
  }, [
    'Select input format (binary/hex/decimal/text)',
    'Enter value to convert',
    'View conversions in all formats automatically',
    'Copy desired output format'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567932" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Binary Converter" currentHref="/binary-converter" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Binary Converter</h1>
              <p className="text-muted-foreground">Convert between binary, hexadecimal, and decimal number systems</p>
            </div>

            <BinaryConverter />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Convert Number Systems</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Select input format (binary/hex/decimal/text)</li>
                <li>Enter value to convert</li>
                <li>View conversions in all formats automatically</li>
                <li>Copy desired output format</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Binary Converter Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Binary (Base-2):</strong> 0 and 1 only</li>
                <li><strong>Hexadecimal (Base-16):</strong> 0-9 and A-F</li>
                <li><strong>Decimal (Base-10):</strong> Standard numbers</li>
                <li><strong>Text Encoding:</strong> Convert text to binary/hex</li>
                <li><strong>Real-Time Conversion:</strong> Instant results</li>
                <li><strong>100% Free:</strong> No limits on conversions</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding Number Systems</h3>
              <p className="text-muted-foreground">
                Computers use <strong>binary (base-2)</strong> internally—only 0 and 1 represent electrical states. Hexadecimal (base-16) is shorthand for binary: each hex digit represents 4 binary digits. Decimal (base-10) is human-friendly. Example: 255 decimal = 0xFF hex = 11111111 binary.
              </p>
              <p className="text-muted-foreground">
                Binary to hex conversion: Group binary digits in sets of 4 from right to left. Each group becomes one hex digit. 1010 1100 = AC. Hex to decimal: (A × 16^1) + (C × 16^0) = (10 × 16) + (12 × 1) = 172. Text to binary: Each character&apos;s ASCII code converted to binary.
              </p>
              <p className="text-muted-foreground">
                Use cases: Understanding memory addresses, debugging low-level code, analyzing network packets, working with color codes (CSS hex colors), understanding file formats, IP address subnet calculations, and learning computer science fundamentals.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All number system conversions happen locally in your browser. Your input is never uploaded to servers, stored, or logged. The conversion uses JavaScript, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567829" />
          </div>
        </div>
      </div>
    </div>
  );
}
