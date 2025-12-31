import { Metadata } from 'next'
import { IBANValidator } from '@/components/tools/iban/IBANValidator'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas'
import { withCanonicalMetadata } from '@/lib/seo/metadata'
import AdBanner from '@/components/ads/AdBanner'
import AdSidebar from '@/components/ads/AdSidebar'

const pageMetadata: Metadata = {
  title: 'IBAN Validator - Validate International Bank Account Numbers | RawTools',
  description: 'Free IBAN validator supporting 80+ countries. Verify IBAN format, checksum, and country-specific rules instantly. Real-time validation with detailed error messages.',
  keywords: 'iban validator, validate iban, check iban, iban checker, iban verification, international bank account number, iban format checker',
  openGraph: {
    title: 'Free IBAN Validator - Verify International Bank Account Numbers',
    description: 'Validate IBANs for 80+ countries with real-time verification. Check format, MOD-97 checksum, and country rules.',
    type: 'website',
  
    url: 'https://rawtools.io/iban-validator',
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
    title: 'IBAN Validator - Validate IBANs | RawTools',
    description: 'Validate International Bank Account Numbers for 80+ countries. Real-time verification with MOD-97 checksum.',
  
    images: ['/og-image.svg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/iban-validator')
}

export default function IBANValidatorPage() {
  const schema = generateSoftwareAppSchema({
    name: 'IBAN Validator',
    description: 'Validate International Bank Account Numbers (IBAN) for 80+ countries with real-time format and checksum verification.',
    url: 'https://rawtools.io/iban-validator',
  })

  const howToSchema = generateHowToSchema({
    name: 'IBAN Validator',
    description: 'How to validate International Bank Account Numbers',
    url: 'https://rawtools.io/iban-validator',
  }, [
    'Enter or paste the IBAN you want to validate',
    'Click the "Validate" button',
    'View validation results: valid or invalid with error details',
    'Check country information, format, and SEPA membership',
    'See parsed components: country, check digits, bank, branch, account'
  ])

  const faqSchema = generateFAQSchema([
    {
      question: 'What is IBAN validation?',
      answer: 'IBAN validation verifies that an International Bank Account Number is structurally correct and mathematically valid. It checks five criteria: correct format (2 letters + 2 digits + up to 30 alphanumeric characters), valid country code, correct length for that country, valid MOD-97 checksum (remainder equals 1), and compliance with country-specific format rules.'
    },
    {
      question: 'What is the MOD-97 checksum?',
      answer: 'The MOD-97 checksum is a mathematical error-detection algorithm used in IBANs. The two check digits (positions 3-4) are calculated so that when the entire IBAN is converted to an integer and divided by 97, the remainder equals 1. This catches typos and transposition errors with 99% accuracy, preventing most accidental mistakes in payment processing.'
    },
    {
      question: 'Can a valid IBAN still fail a bank transfer?',
      answer: 'Yes. IBAN validation only confirms structural and mathematical correctness. It does not verify that the account exists, is active, or belongs to the intended recipient. Banks perform additional checks (account existence, beneficiary name matching) during actual transfers. Always verify recipient details through secure channels before sending payments.'
    },
    {
      question: 'How many countries use IBAN?',
      answer: 'Over 80 countries use IBAN, including all 27 EU member states, the UK, Switzerland, Norway, and many Middle Eastern and African nations. The United States, Canada, Australia, and most Asian countries do not use IBAN, relying instead on domestic account numbering systems (e.g., routing numbers + account numbers in the US).'
    },
    {
      question: 'Why does my valid-looking IBAN fail validation?',
      answer: 'Common causes: incorrect country code (must be 2 letters matching ISO 3166-1), wrong length (e.g., German IBANs must be exactly 22 characters), invalid check digits (digits 3-4 must satisfy MOD-97), spaces in electronic format (remove all spaces for validation), or country-specific format violations (e.g., invalid bank code structure).'
    },
    {
      question: 'Is IBAN validation secure for sensitive banking data?',
      answer: 'Yes. Our validator runs entirely in your browser using client-side JavaScript. Your IBAN never leaves your device, is never transmitted to our servers, and is not stored or logged. You can validate IBANs with complete privacy, making it safe for personal and business banking information.'
    }
  ])

  return (
    <div className="w-full">
      <StructuredData data={schema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="1111111111" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="IBAN Tools" toolName="IBAN Validator" currentHref="/iban-validator" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">IBAN Validator</h1>
              <p className="text-muted-foreground">
                Validate International Bank Account Numbers with real-time verification for 80+ countries
              </p>
            </div>

            <IBANValidator />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Validate IBANs</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter or paste the IBAN you want to validate</li>
                <li>Click the "Validate" button</li>
                <li>View validation results: valid or invalid with error details</li>
                <li>Check country information, format, and SEPA membership</li>
                <li>See parsed components: country, check digits, bank, branch, account</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our IBAN Validator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Comprehensive Validation:</strong> 5-step verification process</li>
                <li><strong>80+ Countries:</strong> Support for all IBAN-using countries</li>
                <li><strong>MOD-97 Checksum:</strong> Accurate checksum validation</li>
                <li><strong>Instant Results:</strong> Real-time validation feedback</li>
                <li><strong>Detailed Errors:</strong> Specific error messages for troubleshooting</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Validation Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Format Check:</strong> Verifies correct IBAN structure (2 letters + 2 digits + BBAN)</li>
                <li><strong>Length Validation:</strong> Ensures country-specific length requirements</li>
                <li><strong>Character Set:</strong> Confirms only alphanumeric characters (A-Z, 0-9)</li>
                <li><strong>Country Rules:</strong> Validates against country-specific patterns</li>
                <li><strong>MOD-97 Checksum:</strong> Performs mathematical integrity check</li>
                <li><strong>Component Parsing:</strong> Extracts bank, branch, and account details</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is an IBAN?</h3>
              <p className="text-muted-foreground">
                An IBAN (International Bank Account Number) is an internationally standardized system for identifying bank accounts across borders. Developed by the European Committee for Banking Standards and adopted by ISO (ISO 13616), IBANs facilitate automated payment processing and reduce errors in cross-border transactions. An IBAN contains up to 34 alphanumeric characters: a 2-letter country code (e.g., DE for Germany), 2 check digits calculated using MOD-97, and a country-specific BBAN (Basic Bank Account Number) that includes bank identifier, branch code (if applicable), and account number. For example, GB29NWBK60161331926819 is a UK IBAN where GB=country, 29=check digits, NWBK=bank code, 601613=sort code, 31926819=account number. Over 70 countries use IBANs, especially within the SEPA (Single Euro Payments Area).
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for IBAN Validation</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Payment Processing:</strong> Validate recipient IBANs before initiating transfers.</li>
                <li><strong>Customer Onboarding:</strong> Verify bank account details during registration.</li>
                <li><strong>Form Validation:</strong> Implement real-time IBAN validation in web forms.</li>
                <li><strong>Data Quality:</strong> Clean and validate IBAN data in customer databases.</li>
                <li><strong>Compliance:</strong> Ensure IBANs meet regulatory standards before processing.</li>
                <li><strong>API Integration:</strong> Validate IBANs before sending to payment gateways.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All IBAN validation is performed entirely in your web browser. This means your banking information never leaves your device and is never uploaded to our servers. You can validate IBANs with complete confidence, knowing your data remains private and secure throughout the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2222222222" />
          </div>
        </div>
      </div>
    </div>
  )
}

