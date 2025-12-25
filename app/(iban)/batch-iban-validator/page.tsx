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
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs category="IBAN Tools" toolName="Batch IBAN Validator" />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Batch IBAN Validator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Validate multiple IBANs efficiently. Process up to 1000 IBANs at once with 
              CSV import/export, filtering, and comprehensive validation reports.
            </p>
          </div>

          <BatchIBANValidator />

          {/* Educational Content */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Efficient Batch IBAN Validation
              </h2>
              <p className="text-gray-600 mb-6">
                Process large volumes of IBANs quickly and accurately. Perfect for data migration, 
                customer database validation, payment processing verification, and quality assurance.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Key Features
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded">
                  <h4 className="font-semibold text-blue-900 mb-2">📊 Bulk Processing</h4>
                  <p className="text-sm text-blue-800">
                    Validate up to 1000 IBANs in a single operation with real-time progress tracking.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded">
                  <h4 className="font-semibold text-green-900 mb-2">📁 CSV Import/Export</h4>
                  <p className="text-sm text-green-800">
                    Upload CSV files and export validation results with detailed error messages.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded">
                  <h4 className="font-semibold text-purple-900 mb-2">🔍 Smart Filtering</h4>
                  <p className="text-sm text-purple-800">
                    Filter results by validation status to quickly identify and fix invalid IBANs.
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded">
                  <h4 className="font-semibold text-orange-900 mb-2">📈 Statistics</h4>
                  <p className="text-sm text-orange-800">
                    Get instant summary statistics including total, valid, invalid counts and success rate.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Use Cases
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li><strong>Data Migration:</strong> Validate IBANs before importing into new systems</li>
                <li><strong>Database Cleanup:</strong> Identify and fix invalid IBANs in customer databases</li>
                <li><strong>Payment Processing:</strong> Pre-validate recipient IBANs before batch payments</li>
                <li><strong>Compliance Audits:</strong> Verify IBAN data quality for regulatory requirements</li>
                <li><strong>Customer Onboarding:</strong> Validate IBANs during bulk customer imports</li>
                <li><strong>Quality Assurance:</strong> Test payment systems with large datasets</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                CSV File Format
              </h3>
              <p className="text-gray-600 mb-4">
                Upload CSV files with IBANs in any column. Our parser automatically detects IBAN-like 
                patterns. Example formats:
              </p>
              
              <div className="bg-gray-100 p-4 rounded font-mono text-xs mb-6">
                <div className="mb-2">Simple list:</div>
                <div>GB29NWBK60161331926819</div>
                <div>DE89370400440532013000</div>
                <div>FR1420041010050500013M02606</div>
                <div className="mt-4 mb-2">With headers:</div>
                <div>customer_id,iban,name</div>
                <div>1001,GB29NWBK60161331926819,John Doe</div>
                <div>1002,DE89370400440532013000,Jane Smith</div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Validation Details
              </h3>
              <p className="text-gray-600 mb-4">
                Each IBAN is validated against:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Country code recognition (80+ countries)</li>
                <li>Length validation for specific country</li>
                <li>MOD-97 checksum verification</li>
                <li>Country-specific format rules</li>
                <li>Character set validation</li>
                <li>SEPA membership identification</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Export Options
              </h3>
              <p className="text-gray-600 mb-4">
                Export validation results in multiple formats:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>CSV:</strong> Spreadsheet-compatible format with all validation details</li>
                <li><strong>JSON:</strong> Structured data format for programmatic processing</li>
                <li><strong>Print:</strong> Formatted report for documentation and review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

