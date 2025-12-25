import { Metadata } from 'next'
import { IBANParser } from '@/components/tools/iban/IBANParser'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'IBAN Parser - Extract Bank Code, Branch & Account Details | RawTools',
  description: 'Free IBAN parser to extract and analyze components: country code, check digits, bank code, branch code, and account number. Supports 80+ countries.',
  keywords: 'iban parser, extract iban, iban components, bank code extractor, iban analyzer, parse iban',
}

export default function IBANParserPage() {
  const schema = generateSoftwareAppSchema({
    name: 'IBAN Parser',
    description: 'Extract and analyze IBAN components including country code, check digits, bank code, branch code, and account number.',
    url: 'https://rawtools.io/iban-parser',
  })

  return (
    <>
      <StructuredData data={schema} />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs category="IBAN Tools" toolName="IBAN Parser" />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              IBAN Parser
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Extract and analyze IBAN components. Parse country codes, bank identifiers, 
              branch codes, and account numbers from any valid IBAN.
            </p>
          </div>

          <IBANParser />

          {/* Educational Content */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Understanding IBAN Components
              </h2>
              <p className="text-gray-600 mb-6">
                Every IBAN contains structured information that identifies the bank account uniquely 
                across international borders. Our parser breaks down these components for easy analysis.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Component Breakdown
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-blue-50 rounded">
                  <h4 className="font-semibold text-blue-900 mb-2">Country Code (2 characters)</h4>
                  <p className="text-sm text-blue-800">
                    ISO 3166-1 alpha-2 country code. Examples: DE (Germany), FR (France), GB (United Kingdom)
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded">
                  <h4 className="font-semibold text-green-900 mb-2">Check Digits (2 digits)</h4>
                  <p className="text-sm text-green-800">
                    Calculated using MOD-97 algorithm. These digits verify the integrity of the entire IBAN.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded">
                  <h4 className="font-semibold text-purple-900 mb-2">Bank Identifier</h4>
                  <p className="text-sm text-purple-800">
                    Identifies the financial institution. Length varies by country (typically 3-8 characters).
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded">
                  <h4 className="font-semibold text-yellow-900 mb-2">Branch Identifier (Optional)</h4>
                  <p className="text-sm text-yellow-800">
                    Identifies the specific branch. Not all countries use branch codes in their IBANs.
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded">
                  <h4 className="font-semibold text-orange-900 mb-2">Account Number</h4>
                  <p className="text-sm text-orange-800">
                    The basic bank account number. May include check digits specific to the country's banking system.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Use Cases
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Extract bank codes for payment routing</li>
                <li>Analyze IBAN structure for validation purposes</li>
                <li>Educational purposes to understand international banking</li>
                <li>Data processing and migration tasks</li>
                <li>Integration with banking APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

