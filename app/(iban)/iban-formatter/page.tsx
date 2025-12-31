import { Metadata } from 'next'
import { IBANFormatter } from '@/components/tools/iban/IBANFormatter'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema, generateHowToSchema } from '@/lib/seo/schemas'
import { withCanonicalMetadata } from '@/lib/seo/metadata'
import AdBanner from '@/components/ads/AdBanner'
import AdSidebar from '@/components/ads/AdSidebar'

const pageMetadata: Metadata = {
  title: 'IBAN Formatter - Format IBANs for Print or Electronic Use | RawTools',
  description: 'Free IBAN formatter to convert between electronic and print formats. Batch format multiple IBANs with country-specific grouping. Supports 80+ countries.',
  keywords: 'iban formatter, format iban, iban print format, iban electronic format, batch iban formatter',
  openGraph: {
    title: 'IBAN Formatter - Format IBANs',
    description: 'Format IBANs with proper spacing. Convert between electronic and print formats.',
    type: 'website',
  
    url: 'https://rawtools.io/iban-formatter',
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
    title: 'IBAN Formatter - Format IBANs | RawTools',
    description: 'Format IBANs with proper spacing. Convert between electronic and print formats.',
  
    images: ['/og-image.svg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/iban-formatter')
}

export default function IBANFormatterPage() {
  const schema = generateSoftwareAppSchema({
    name: 'IBAN Formatter',
    description: 'Format IBANs for print or electronic use with country-specific grouping. Batch format multiple IBANs at once.',
    url: 'https://rawtools.io/iban-formatter',
  })

  const howToSchema = generateHowToSchema({
    name: 'IBAN Formatter',
    description: 'How to format International Bank Account Numbers for different use cases',
    url: 'https://rawtools.io/iban-formatter',
  }, [
    'Enter or paste one or more IBANs into the input field',
    'Select your desired output format: Electronic, Print, or Country-Specific',
    'Click the "Format" button to process the IBANs',
    'View formatted results with proper spacing and grouping',
    'Copy formatted IBANs or download results for batch operations'
  ])

  return (
    <div className="w-full">
      <StructuredData data={schema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="3333333333" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="IBAN Tools" toolName="IBAN Formatter" currentHref="/iban-formatter" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">IBAN Formatter</h1>
              <p className="text-muted-foreground">
                Format IBANs for print or electronic use with country-specific grouping and batch processing
              </p>
            </div>

            <IBANFormatter />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Format IBANs</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter or paste one or more IBANs into the input field</li>
                <li>Select your desired output format: Electronic, Print, or Country-Specific</li>
                <li>Click the "Format" button to process the IBANs</li>
                <li>View formatted results with proper spacing and grouping</li>
                <li>Copy formatted IBANs or download results for batch operations</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our IBAN Formatter?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Multiple Format Options:</strong> Electronic, print, and country-specific formats</li>
                <li><strong>Batch Processing:</strong> Format multiple IBANs simultaneously</li>
                <li><strong>80+ Countries:</strong> Support for all IBAN-using countries</li>
                <li><strong>Instant Results:</strong> Real-time formatting without delays</li>
                <li><strong>No Registration:</strong> Use immediately without creating an account</li>
                <li><strong>Copy or Download:</strong> Export results in your preferred format</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Format Types Available</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Electronic Format:</strong> Continuous string without spaces (GB29NWBK60161331926819)</li>
                <li><strong>Print Format:</strong> Groups of 4 characters separated by spaces (GB29 NWBK 6016 1331 9268 19)</li>
                <li><strong>Country-Specific:</strong> Official format per country standards (varies by country)</li>
                <li><strong>Custom Grouping:</strong> Flexible spacing options for specific requirements</li>
                <li><strong>Case Normalization:</strong> Automatic conversion to uppercase standard</li>
                <li><strong>Whitespace Removal:</strong> Cleans input IBANs before formatting</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is IBAN Formatting?</h3>
              <p className="text-muted-foreground">
                IBAN formatting refers to the presentation of International Bank Account Numbers in different visual layouts depending on the use case. While the underlying data remains identical, the format affects readability and system compatibility. Electronic format (no spaces) is the ISO 13616 standard for machine processing: it eliminates human error from whitespace inconsistencies and is required by most banking APIs and payment systems. Print format groups characters into blocks of 4, improving readability on invoices and bank statements. For example, a German IBAN DE89370400440532013000 becomes DE89 3704 0044 0532 0130 00 in print format. Country-specific formatting follows local banking conventions: some countries use different grouping (e.g., French IBANs often group by bank identifier sections). Real-world scenario: A payment processor receives IBANs with varying formats from web forms (some with spaces, some without). Before validation and processing, all IBANs are normalized to electronic format, then reformatted for display in customer-facing interfaces.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Database Migration:</strong> Convert stored IBANs from print format to electronic format for system upgrades.</li>
                <li><strong>Invoice Generation:</strong> Format IBANs in print format for better readability on customer invoices.</li>
                <li><strong>Payment File Preparation:</strong> Ensure IBANs are in electronic format before uploading to payment gateways.</li>
                <li><strong>Customer Communications:</strong> Display IBANs in country-specific format for official correspondence.</li>
                <li><strong>Data Entry Validation:</strong> Normalize user input by removing spaces and converting to uppercase.</li>
                <li><strong>Report Generation:</strong> Present IBANs in consistent print format across all financial reports.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All IBAN formatting is performed entirely in your web browser. Your banking information never leaves your device and is never transmitted to our servers. You can format IBANs with complete confidence, knowing your data remains private throughout the entire process.
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

