import { Metadata } from 'next'
import { IBANFormatter } from '@/components/tools/iban/IBANFormatter'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'IBAN Formatter - Format IBANs for Print or Electronic Use | RawTools',
  description: 'Free IBAN formatter to convert between electronic and print formats. Batch format multiple IBANs with country-specific grouping. Supports 80+ countries.',
  keywords: 'iban formatter, format iban, iban print format, iban electronic format, batch iban formatter',
}

export default function IBANFormatterPage() {
  const schema = generateSoftwareAppSchema({
    name: 'IBAN Formatter',
    description: 'Format IBANs for print or electronic use with country-specific grouping. Batch format multiple IBANs at once.',
    url: 'https://rawtools.io/iban-formatter',
  })

  return (
    <>
      <StructuredData data={schema} />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs category="IBAN Tools" toolName="IBAN Formatter" />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              IBAN Formatter
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Format IBANs for different use cases. Convert between electronic and print formats, 
              apply country-specific grouping, or batch format multiple IBANs at once.
            </p>
          </div>

          <IBANFormatter />

          {/* Educational Content */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                IBAN Formatting Standards
              </h2>
              <p className="text-gray-600 mb-6">
                IBANs can be represented in different formats depending on the use case. 
                Understanding when to use each format ensures compatibility and readability.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Format Types Explained
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Electronic Format</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    No spaces, uppercase only. Used for electronic transactions, APIs, and databases.
                  </p>
                  <code className="text-xs bg-white px-2 py-1 rounded">GB29NWBK60161331926819</code>
                  <div className="mt-2 text-xs text-gray-600">
                    <strong>When to use:</strong> Payment processing, API requests, database storage
                  </div>
                </div>

                <div className="p-4 border-l-4 border-green-500 bg-green-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Print Format (4-char groups)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Grouped in 4-character blocks for readability. Standard format for paper documents.
                  </p>
                  <code className="text-xs bg-white px-2 py-1 rounded">GB29 NWBK 6016 1331 9268 19</code>
                  <div className="mt-2 text-xs text-gray-600">
                    <strong>When to use:</strong> Invoices, statements, printed forms, user interfaces
                  </div>
                </div>

                <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Country-Specific Format</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Follows official formatting rules for each country. Grouping may vary.
                  </p>
                  <code className="text-xs bg-white px-2 py-1 rounded block mb-1">DE89 3704 0044 0532 0130 00</code>
                  <code className="text-xs bg-white px-2 py-1 rounded block">FR14 2004 1010 0505 0001 3M02 606</code>
                  <div className="mt-2 text-xs text-gray-600">
                    <strong>When to use:</strong> Official communications, regulatory compliance, local standards
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Best Practices
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Always store IBANs in electronic format (no spaces) in databases</li>
                <li>Display IBANs in print format for user interfaces and documents</li>
                <li>Use country-specific format for official banking communications</li>
                <li>Validate IBANs before formatting to ensure data quality</li>
                <li>Remove spaces before processing IBANs in payment systems</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Batch Formatting
              </h3>
              <p className="text-gray-600 mb-4">
                Our batch formatter allows you to process multiple IBANs simultaneously. 
                This is particularly useful for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Data migration and cleanup projects</li>
                <li>Preparing customer lists for mailings</li>
                <li>Converting between system formats</li>
                <li>Quality assurance and validation tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

