import { Metadata } from 'next'
import { IBANParser } from '@/components/tools/iban/IBANParser'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema, generateHowToSchema } from '@/lib/seo/schemas'
import { withCanonicalMetadata } from '@/lib/seo/metadata'
import AdBanner from '@/components/ads/AdBanner'
import AdSidebar from '@/components/ads/AdSidebar'

const pageMetadata: Metadata = {
  title: 'IBAN Parser - Extract Bank Code, Branch & Account Details | RawTools',
  description: 'Free IBAN parser to extract and analyze components: country code, check digits, bank code, branch code, and account number. Supports 80+ countries.',
  keywords: 'iban parser, extract iban, iban components, bank code extractor, iban analyzer, parse iban',
  openGraph: {
    title: 'IBAN Parser - Extract IBAN Components',
    description: 'Parse IBANs to extract country code, check digits, bank code, branch, and account number.',
    type: 'website',
  
    url: 'https://rawtools.io/iban-parser',
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
    title: 'IBAN Parser - Extract IBAN Components | RawTools',
    description: 'Parse IBANs to extract country code, check digits, bank code, branch, and account number.',
  
    images: ['/og-image.svg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/iban-parser')
}

export default function IBANParserPage() {
  const schema = generateSoftwareAppSchema({
    name: 'IBAN Parser',
    description: 'Extract and analyze IBAN components including country code, check digits, bank code, branch code, and account number.',
    url: 'https://rawtools.io/iban-parser',
  })

  const howToSchema = generateHowToSchema({
    name: 'IBAN Parser',
    description: 'How to parse and extract components from IBANs',
    url: 'https://rawtools.io/iban-parser',
  }, [
    'Enter or paste a valid IBAN',
    'Click "Parse IBAN" button',
    'View extracted country code and check digits',
    'See bank identifier and branch code (if applicable)',
    'Review the account number and validation status'
  ])

  return (
    <div className="w-full">
      <StructuredData data={schema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="3333333333" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="IBAN Tools" toolName="IBAN Parser" currentHref="/iban-parser" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">IBAN Parser</h1>
              <p className="text-muted-foreground">
                Extract and analyze IBAN components: country code, check digits, bank code, branch, and account number
              </p>
            </div>

            <IBANParser />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Parse IBANs</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter or paste a valid IBAN</li>
                <li>Click "Parse IBAN" button</li>
                <li>View extracted country code and check digits</li>
                <li>See bank identifier and branch code (if applicable)</li>
                <li>Review the account number and validation status</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our IBAN Parser?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Instant Parsing:</strong> Extract all components in real-time</li>
                <li><strong>Detailed Breakdown:</strong> Shows every component with explanations</li>
                <li><strong>80+ Countries:</strong> Supports all IBAN-using countries</li>
                <li><strong>Developer-Friendly:</strong> Perfect for understanding IBAN structure</li>
                <li><strong>Educational Tool:</strong> Learn how IBANs are organized</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Parsing Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Country Code Extraction:</strong> 2-letter ISO 3166-1 alpha-2 code</li>
                <li><strong>Check Digits:</strong> MOD-97 validation digits</li>
                <li><strong>Bank Identifier:</strong> Financial institution code (length varies by country)</li>
                <li><strong>Branch Code:</strong> Branch identifier (when applicable)</li>
                <li><strong>Account Number:</strong> Basic bank account number</li>
                <li><strong>Validation Status:</strong> Automatic validation during parsing</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding IBAN Structure</h3>
              <p className="text-muted-foreground">
                Every IBAN contains structured, encoded information that uniquely identifies a bank account across international borders. The structure follows a consistent pattern: Country Code (2 letters) + Check Digits (2 numbers) + BBAN (Basic Bank Account Number, country-specific length and format). For example, in GB82WEST12345698765432, GB=United Kingdom, 82=check digits, WEST=bank code, 123456=sort code (branch), 98765432=account number. Different countries use different BBAN structures: Germany (DE) uses 18 characters (8-digit bank code + 10-digit account), France (FR) uses 23 characters (5-digit bank code + 5-digit branch + 11-digit account + 2-digit key), Italy (IT) uses 23 characters (1-digit check + 5-digit ABI bank code + 5-digit CAB branch + 12-digit account). Our parser automatically detects the country and applies the correct parsing rules.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for IBAN Parsing</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Payment Routing:</strong> Extract bank codes for directing transfers to the correct institution.</li>
                <li><strong>Data Analysis:</strong> Analyze IBAN components for reporting and analytics.</li>
                <li><strong>System Integration:</strong> Parse IBANs for integration with banking APIs.</li>
                <li><strong>Validation Logic:</strong> Understand IBAN structure to implement custom validation.</li>
                <li><strong>Educational Purposes:</strong> Learn international banking standards and formats.</li>
                <li><strong>Database Migration:</strong> Convert legacy account formats to IBAN structure.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All IBAN parsing is performed entirely in your web browser. This means your banking information never leaves your device and is never uploaded to our servers. You can parse IBANs with complete confidence, knowing your data remains private and secure throughout the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="4444444444" />
          </div>
        </div>
      </div>
    </div>
  )
}

