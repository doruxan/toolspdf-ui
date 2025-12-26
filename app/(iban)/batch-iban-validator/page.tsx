import { Metadata } from 'next'
import { BatchIBANValidator } from '@/components/tools/iban/BatchIBANValidator'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Batch IBAN Validator - Validate Multiple IBANs at Once | RawTools',
  description: 'Free batch IBAN validator. Validate up to 1000 IBANs simultaneously with CSV import/export. Get detailed validation reports and statistics.',
  keywords: 'batch iban validator, bulk iban validation, validate multiple ibans, iban csv validator, mass iban check',
}

export default function BatchIBANValidatorPage() {
  const schema = generateSoftwareAppSchema({
    name: 'Batch IBAN Validator',
    description: 'Validate multiple IBANs at once. Process up to 1000 IBANs with CSV import/export and detailed validation reports.',
    url: 'https://rawtools.io/batch-iban-validator',
  })

  return (
    <>
      <StructuredData data={schema} />
      
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs category="IBAN Tools" toolName="Batch IBAN Validator" />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Batch IBAN Validator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Validate multiple IBANs efficiently. Process up to 1000 IBANs at once with 
              CSV import/export, filtering, and comprehensive validation reports.
            </p>
          </div>

          <BatchIBANValidator />

          {/* Educational Content */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Efficient Batch IBAN Validation
              </h2>
              <p className="text-muted-foreground mb-6">
                Process large volumes of IBANs quickly and accurately. Perfect for data migration, 
                customer database validation, payment processing verification, and quality assurance.
              </p>

              <h3 className="text-xl font-bold text-foreground mb-3">
                Key Features
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 rounded">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">📊 Bulk Processing</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Validate up to 1000 IBANs in a single operation with real-time progress tracking.
                  </p>
                </div>

                <div className="p-4 bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 rounded">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">📁 CSV Import/Export</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Upload CSV files and export validation results with detailed error messages.
                  </p>
                </div>

                <div className="p-4 bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 rounded">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">🔍 Smart Filtering</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Filter results by validation status to quickly identify and fix invalid IBANs.
                  </p>
                </div>

                <div className="p-4 bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/20 rounded">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">📈 Statistics</h4>
                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    Get instant summary statistics including total, valid, invalid counts and success rate.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                Use Cases
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li><strong className="text-foreground">Data Migration:</strong> Validate IBANs before importing into new systems</li>
                <li><strong className="text-foreground">Database Cleanup:</strong> Identify and fix invalid IBANs in customer databases</li>
                <li><strong className="text-foreground">Payment Processing:</strong> Pre-validate recipient IBANs before batch payments</li>
                <li><strong className="text-foreground">Compliance Audits:</strong> Verify IBAN data quality for regulatory requirements</li>
                <li><strong className="text-foreground">Customer Onboarding:</strong> Validate IBANs during bulk customer imports</li>
                <li><strong className="text-foreground">Quality Assurance:</strong> Test payment systems with large datasets</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mb-3">
                CSV File Format
              </h3>
              <p className="text-muted-foreground mb-4">
                Upload CSV files with IBANs in any column. Our parser automatically detects IBAN-like 
                patterns. Example formats:
              </p>
              
              <div className="bg-muted p-4 rounded font-mono text-xs mb-6 text-foreground">
                <div className="mb-2">Simple list:</div>
                <div>GB29NWBK60161331926819</div>
                <div>DE89370400440532013000</div>
                <div>FR1420041010050500013M02606</div>
                <div className="mt-4 mb-2">With headers:</div>
                <div>customer_id,iban,name</div>
                <div>1001,GB29NWBK60161331926819,John Doe</div>
                <div>1002,DE89370400440532013000,Jane Smith</div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                Validation Details
              </h3>
              <p className="text-muted-foreground mb-4">
                Each IBAN is validated against:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li>Country code recognition (80+ countries)</li>
                <li>Length validation for specific country</li>
                <li>MOD-97 checksum verification</li>
                <li>Country-specific format rules</li>
                <li>Character set validation</li>
                <li>SEPA membership identification</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mb-3">
                Export Options
              </h3>
              <p className="text-muted-foreground mb-4">
                Export validation results in multiple formats:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong className="text-foreground">CSV:</strong> Spreadsheet-compatible format with all validation details</li>
                <li><strong className="text-foreground">JSON:</strong> Structured data format for programmatic processing</li>
                <li><strong className="text-foreground">Print:</strong> Formatted report for documentation and review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

