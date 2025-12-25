import { Metadata } from 'next'
import { IBANValidator } from '@/components/tools/iban/IBANValidator'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'IBAN Validator - Validate International Bank Account Numbers | RawTools',
  description: 'Free IBAN validator supporting 80+ countries. Verify IBAN format, checksum, and country-specific rules instantly. Real-time validation with detailed error messages.',
  keywords: 'iban validator, validate iban, check iban, iban checker, iban verification, international bank account number, iban format checker',
  openGraph: {
    title: 'Free IBAN Validator - Verify International Bank Account Numbers',
    description: 'Validate IBANs for 80+ countries with real-time verification. Check format, MOD-97 checksum, and country rules.',
    type: 'website',
  },
}

export default function IBANValidatorPage() {
  const schema = generateSoftwareAppSchema({
    name: 'IBAN Validator',
    description: 'Validate International Bank Account Numbers (IBAN) for 80+ countries with real-time format and checksum verification.',
    url: 'https://rawtools.io/iban-validator',
  })

  return (
    <>
      <StructuredData data={schema} />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs category="IBAN Tools" toolName="IBAN Validator" />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              IBAN Validator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Validate International Bank Account Numbers with real-time verification. 
              Supporting 80+ countries with MOD-97 checksum validation and country-specific format rules.
            </p>
          </div>

          <IBANValidator />

          {/* Educational Content */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What is an IBAN?
              </h2>
              <p className="text-gray-600 mb-6">
                An IBAN (International Bank Account Number) is an internationally agreed system of identifying 
                bank accounts across national borders. It was originally developed to facilitate payments within 
                the European Union, but the format is now used worldwide.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                IBAN Structure
              </h3>
              <p className="text-gray-600 mb-4">
                An IBAN consists of up to 34 alphanumeric characters, comprising:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li><strong>Country Code</strong>: 2-letter ISO country code (e.g., GB, DE, FR)</li>
                <li><strong>Check Digits</strong>: 2 digits calculated using MOD-97 algorithm</li>
                <li><strong>Bank Identifier</strong>: Identifies the bank (length varies by country)</li>
                <li><strong>Branch Identifier</strong>: Identifies the branch (if applicable)</li>
                <li><strong>Account Number</strong>: The basic bank account number</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How IBAN Validation Works
              </h3>
              <p className="text-gray-600 mb-4">
                Our validator performs comprehensive checks:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
                <li><strong>Format Check</strong>: Verifies the IBAN starts with 2 letters followed by 2 digits</li>
                <li><strong>Length Validation</strong>: Ensures the length matches the country specification</li>
                <li><strong>Character Set</strong>: Confirms only valid alphanumeric characters (A-Z, 0-9)</li>
                <li><strong>Country Rules</strong>: Validates against country-specific format patterns</li>
                <li><strong>Checksum Verification</strong>: Performs MOD-97 calculation to verify integrity</li>
              </ol>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Supported Countries
              </h3>
              <p className="text-gray-600 mb-4">
                We support IBAN validation for 80+ countries including all SEPA countries and many others:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-6">
                <div>🇩🇪 Germany</div>
                <div>🇫🇷 France</div>
                <div>🇬🇧 United Kingdom</div>
                <div>🇮🇹 Italy</div>
                <div>🇪🇸 Spain</div>
                <div>🇳🇱 Netherlands</div>
                <div>🇵🇱 Poland</div>
                <div>🇨🇭 Switzerland</div>
                <div>🇦🇹 Austria</div>
                <div>🇧🇪 Belgium</div>
                <div>🇸🇪 Sweden</div>
                <div>... and 70+ more</div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Privacy & Security
              </h3>
              <p className="text-gray-600 mb-6">
                All IBAN validation is performed entirely in your browser. No data is sent to our servers, 
                ensuring your banking information remains completely private and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

