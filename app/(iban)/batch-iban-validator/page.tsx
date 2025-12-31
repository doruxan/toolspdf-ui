import { Metadata } from 'next'
import { BatchIBANValidator } from '@/components/tools/iban/BatchIBANValidator'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas'
import { withCanonicalMetadata } from '@/lib/seo/metadata'
import AdBanner from '@/components/ads/AdBanner'
import AdSidebar from '@/components/ads/AdSidebar'

const pageMetadata: Metadata = {
  title: 'Batch IBAN Validator - Validate Multiple IBANs at Once | RawTools',
  description: 'Free batch IBAN validator. Validate up to 1000 IBANs simultaneously with CSV import/export. Get detailed validation reports and statistics.',
  keywords: 'batch iban validator, bulk iban validation, validate multiple ibans, iban csv validator, mass iban check',
  openGraph: {
    title: 'Batch IBAN Validator - Validate Multiple IBANs',
    description: 'Validate multiple IBANs at once. Upload CSV or paste list. Fast batch validation.',
    type: 'website',
  
    url: 'https://rawtools.io/batch-iban-validator',
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
    title: 'Batch IBAN Validator - Validate Multiple IBANs | RawTools',
    description: 'Validate multiple IBANs at once. Upload CSV or paste list. Fast batch validation.',
  
    images: ['/og-image.svg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/batch-iban-validator')
}

export default function BatchIBANValidatorPage() {
  const schema = generateSoftwareAppSchema({
    name: 'Batch IBAN Validator',
    description: 'Validate multiple IBANs at once. Process up to 1000 IBANs with CSV import/export and detailed validation reports.',
    url: 'https://rawtools.io/batch-iban-validator',
  })

  const howToSchema = generateHowToSchema({
    name: 'Batch IBAN Validator',
    description: 'How to validate multiple International Bank Account Numbers at once',
    url: 'https://rawtools.io/batch-iban-validator',
  }, [
    'Upload a CSV file or paste multiple IBANs (one per line)',
    'Click the "Validate All" button to process the batch',
    'View validation results with status indicators for each IBAN',
    'Use filters to show only valid or invalid IBANs',
    'Export results as CSV, JSON, or print for documentation'
  ])

  const faqSchema = generateFAQSchema([
    {
      question: 'How many IBANs can I validate at once?',
      answer: 'The tool handles up to 1000 IBANs per batch. For typical use cases (100-500 IBANs), validation completes in seconds. Larger batches take longer but remain fully functional. For enterprise needs exceeding 1000 IBANs, split your dataset into multiple batches or consider server-side batch processing solutions.'
    },
    {
      question: 'What CSV format does the tool accept?',
      answer: 'The tool accepts CSV files with IBANs in any column. It automatically detects IBAN-like patterns (2 letters + 2 digits + alphanumeric characters). You can include headers, additional columns (customer IDs, names), and the parser will extract IBANs. Supported delimiters: comma, semicolon, tab.'
    },
    {
      question: 'Can I export validation results?',
      answer: 'Yes. Export options include CSV (for Excel/spreadsheets), JSON (for programmatic processing), and print-friendly format (for documentation). CSV exports include all columns: IBAN, validation status (valid/invalid), error messages, country code, SEPA membership, and parsed components (bank code, account number).'
    },
    {
      question: 'How does filtering work?',
      answer: 'After validation, use filters to show only valid IBANs, only invalid IBANs, or all IBANs. This helps you quickly identify problematic entries that need correction. For example, filtering to "Invalid only" in a batch of 500 IBANs might show 12 entries requiring customer follow-up, saving time reviewing 488 valid ones.'
    },
    {
      question: 'What error details are provided for invalid IBANs?',
      answer: 'Each invalid IBAN receives a specific error message: "Invalid country code," "Incorrect length for [country]," "MOD-97 checksum failed," "Invalid characters," or "Country-specific format violation." These messages help you identify the exact issue—whether it is a typo, truncation, wrong country, or data corruption.'
    },
    {
      question: 'Is batch validation secure?',
      answer: 'Yes. All validation happens entirely in your browser. The CSV file is processed locally using JavaScript. Your IBAN data never leaves your device, is never uploaded to our servers, and is never stored. This client-side approach ensures complete privacy for sensitive financial data, making it safe for enterprise use.'
    }
  ])

  return (
    <div className="w-full">
      <StructuredData data={schema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="5555555555" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="IBAN Tools" toolName="Batch IBAN Validator" currentHref="/batch-iban-validator" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Batch IBAN Validator</h1>
              <p className="text-muted-foreground">
                Validate multiple IBANs simultaneously with CSV import/export and comprehensive validation reports
              </p>
            </div>

            <BatchIBANValidator />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Batch Validate IBANs</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload a CSV file or paste multiple IBANs (one per line)</li>
                <li>Click the "Validate All" button to process the batch</li>
                <li>View validation results with status indicators for each IBAN</li>
                <li>Use filters to show only valid or invalid IBANs</li>
                <li>Export results as CSV, JSON, or print for documentation</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our Batch IBAN Validator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>High Volume Processing:</strong> Validate up to 1000 IBANs in seconds</li>
                <li><strong>CSV Import/Export:</strong> Upload files and download detailed reports</li>
                <li><strong>Smart Filtering:</strong> Quickly isolate valid or invalid IBANs</li>
                <li><strong>Detailed Statistics:</strong> See success rates and error breakdowns</li>
                <li><strong>No Server Upload:</strong> All processing happens in your browser</li>
                <li><strong>Multiple Export Formats:</strong> CSV, JSON, and printable reports</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Validation Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Format Verification:</strong> Checks IBAN structure (2 letters + 2 digits + BBAN)</li>
                <li><strong>Length Validation:</strong> Ensures correct length per country (15-34 characters)</li>
                <li><strong>MOD-97 Checksum:</strong> Mathematical integrity check for each IBAN</li>
                <li><strong>Country Recognition:</strong> Validates against 80+ country-specific rules</li>
                <li><strong>Progress Tracking:</strong> Real-time progress bar for large batches</li>
                <li><strong>Error Details:</strong> Specific error messages for each invalid IBAN</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is Batch IBAN Validation?</h3>
              <p className="text-muted-foreground">
                Batch IBAN validation is the process of verifying multiple International Bank Account Numbers simultaneously rather than one at a time. This approach is essential for organizations handling large volumes of payment data. In a typical scenario, a company migrating from a legacy accounting system to a modern ERP needs to validate 5,000 customer IBANs before go-live. Manual validation would take days; batch validation completes in minutes. The validation process checks each IBAN against multiple criteria: country code validity (2-letter ISO 3166-1 alpha-2), correct length for the specific country (e.g., 22 for Germany, 27 for France), MOD-97 checksum accuracy (remainder must equal 1), and adherence to country-specific format patterns. Real-world example: A payment processor receives a CSV file with 500 supplier IBANs for monthly disbursements. Using batch validation, they identify 12 invalid IBANs (2.4% error rate) before processing, preventing rejected transactions and associated fees. The validator also flags IBANs from non-SEPA countries, helping the finance team separate cross-border payments that require different processing workflows.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Data Migration Projects:</strong> Validate customer IBANs before importing to a new banking system.</li>
                <li><strong>Database Quality Audits:</strong> Identify and correct invalid IBANs in existing customer records.</li>
                <li><strong>Pre-Payment Validation:</strong> Verify recipient IBANs before executing batch payment runs.</li>
                <li><strong>Regulatory Compliance:</strong> Ensure IBAN data meets banking standards for audit requirements.</li>
                <li><strong>Customer Data Cleanup:</strong> Detect and flag IBANs that need re-verification from customers.</li>
                <li><strong>Integration Testing:</strong> Validate test datasets before connecting to payment gateway APIs.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All batch validation is performed entirely in your web browser using client-side JavaScript. This means your banking data never leaves your device and is never uploaded to our servers. You can validate thousands of IBANs with complete confidence, knowing your sensitive financial information remains private and secure throughout the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="6666666666" />
          </div>
        </div>
      </div>
    </div>
  )
}

