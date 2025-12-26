import { Metadata } from 'next'
import { IBANGenerator } from '@/components/tools/iban/IBANGenerator'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'IBAN Generator - Generate Valid Test IBANs for 80+ Countries | RawTools',
  description: 'Free IBAN generator for testing and development. Generate valid IBANs with correct checksums for 80+ countries. Bulk generation up to 100 IBANs.',
  keywords: 'iban generator, generate iban, test iban, random iban, iban creator, fake iban generator',
}

export default function IBANGeneratorPage() {
  const schema = generateSoftwareAppSchema({
    name: 'IBAN Generator',
    description: 'Generate valid test IBANs for development and testing purposes. Supports 80+ countries with correct MOD-97 checksums.',
    url: 'https://rawtools.io/iban-generator',
  })

  return (
    <>
      <StructuredData data={schema} />
      
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs category="IBAN Tools" toolName="IBAN Generator" />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              IBAN Generator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate valid test IBANs for development, testing, and educational purposes. 
              Supporting 80+ countries with mathematically correct MOD-97 checksums.
            </p>
          </div>

          <IBANGenerator />

          {/* Educational Content */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                IBAN Generator for Testing & Development
              </h2>
              <p className="text-muted-foreground mb-6">
                Our IBAN generator creates mathematically valid IBANs that pass all format and 
                checksum validations. These are perfect for testing payment systems, validating 
                forms, or educational demonstrations.
              </p>

              <h3 className="text-xl font-bold text-foreground mb-3">
                How It Works
              </h3>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-2 mb-6">
                <li>Select a country from our list of 80+ supported countries</li>
                <li>Optionally specify bank and branch codes, or let the generator randomize them</li>
                <li>Choose how many IBANs to generate (1-100)</li>
                <li>Click generate to create valid IBANs with correct MOD-97 checksums</li>
                <li>Export results to CSV or JSON for use in your projects</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mb-3">
                Use Cases
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 rounded">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🧪 Software Testing</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Generate test data for payment processing systems, banking applications, 
                    and financial software QA.
                  </p>
                </div>

                <div className="p-4 bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 rounded">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">🔧 API Development</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Create sample IBANs for API documentation, integration testing, and 
                    development environments.
                  </p>
                </div>

                <div className="p-4 bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 rounded">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">📚 Education</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Demonstrate IBAN structure, validation algorithms, and international 
                    banking standards in training materials.
                  </p>
                </div>

                <div className="p-4 bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/20 rounded">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">✅ Form Validation</h4>
                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    Test form validation logic, input masks, and error handling for 
                    IBAN entry fields.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                Features
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li><strong className="text-foreground">Valid Checksums:</strong> All generated IBANs pass MOD-97 validation</li>
                <li><strong className="text-foreground">Country-Specific:</strong> Follows exact format rules for each country</li>
                <li><strong className="text-foreground">Bulk Generation:</strong> Create up to 100 IBANs at once</li>
                <li><strong className="text-foreground">Custom Codes:</strong> Specify bank and branch codes or randomize</li>
                <li><strong className="text-foreground">Export Options:</strong> Download as CSV or JSON for easy integration</li>
                <li><strong className="text-foreground">Copy Functions:</strong> Copy individual IBANs or all at once</li>
              </ul>

              <div className="p-6 bg-yellow-500/10 dark:bg-yellow-500/20 border-2 border-yellow-500/30 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-300 mb-3">
                  ⚠️ Important Disclaimer
                </h3>
                <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <p>
                    <strong>Generated IBANs are for testing purposes only.</strong> While they are 
                    mathematically valid and pass all format checks, they do not correspond to real 
                    bank accounts.
                  </p>
                  <p>
                    <strong>Never use generated IBANs for:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Actual financial transactions</li>
                    <li>Production payment processing</li>
                    <li>Real money transfers</li>
                    <li>Fraudulent activities</li>
                  </ul>
                  <p className="font-semibold">
                    Always use legitimate IBANs provided by authorized financial institutions 
                    for real transactions.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                Technical Details
              </h3>
              <p className="text-muted-foreground mb-4">
                Our generator creates IBANs using the following process:
              </p>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                <li>Retrieves the IBAN specification for the selected country</li>
                <li>Generates a random BBAN (Basic Bank Account Number) following the country's format</li>
                <li>Applies custom bank/branch codes if specified</li>
                <li>Calculates the correct check digits using the MOD-97 algorithm</li>
                <li>Validates the generated IBAN to ensure correctness</li>
                <li>Formats the IBAN according to country-specific standards</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

