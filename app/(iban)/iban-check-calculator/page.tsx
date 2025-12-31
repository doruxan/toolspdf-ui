import { Metadata } from 'next'
import { IBANCheckCalculator } from '@/components/tools/iban/IBANCheckCalculator'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema, generateHowToSchema } from '@/lib/seo/schemas'
import { withCanonicalMetadata } from '@/lib/seo/metadata'
import AdBanner from '@/components/ads/AdBanner'
import AdSidebar from '@/components/ads/AdSidebar'

const pageMetadata: Metadata = {
  title: 'IBAN Check Digit Calculator - Calculate & Verify MOD-97 | RawTools',
  description: 'Free IBAN check digit calculator. Calculate correct check digits using MOD-97 algorithm or verify existing IBANs. See step-by-step calculations.',
  keywords: 'iban check digit calculator, mod 97 calculator, iban checksum, calculate iban check digits, verify check digits',
  openGraph: {
    title: 'IBAN Check Digit Calculator',
    description: 'Calculate IBAN check digits using MOD-97 algorithm. Verify or generate check digits.',
    type: 'website',
  
    url: 'https://rawtools.io/iban-check-calculator',
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
    title: 'IBAN Check Digit Calculator | RawTools',
    description: 'Calculate IBAN check digits using MOD-97 algorithm. Verify or generate check digits.',
  
    images: ['/og-image.svg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/iban-check-calculator')
}

export default function IBANCheckCalculatorPage() {
  const schema = generateSoftwareAppSchema({
    name: 'IBAN Check Digit Calculator',
    description: 'Calculate and verify IBAN check digits using the MOD-97 algorithm. Educational tool with step-by-step calculations.',
    url: 'https://rawtools.io/iban-check-calculator',
  })

  const howToSchema = generateHowToSchema({
    name: 'IBAN Check Digit Calculator',
    description: 'How to calculate and verify IBAN check digits using MOD-97 algorithm',
    url: 'https://rawtools.io/iban-check-calculator',
  }, [
    'Enter the country code (2 letters)',
    'Input the BBAN (Basic Bank Account Number)',
    'Click "Calculate Check Digits" to generate the correct digits',
    'Alternatively, enter a complete IBAN to verify its check digits',
    'View step-by-step MOD-97 calculation breakdown'
  ])

  return (
    <div className="w-full">
      <StructuredData data={schema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="7777777777" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="IBAN Tools" toolName="Check Digit Calculator" currentHref="/iban-check-calculator" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">IBAN Check Digit Calculator</h1>
              <p className="text-muted-foreground">
                Calculate correct check digits using the MOD-97 algorithm or verify existing IBANs
              </p>
            </div>

            <IBANCheckCalculator />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Calculate IBAN Check Digits</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter the country code (2 letters)</li>
                <li>Input the BBAN (Basic Bank Account Number)</li>
                <li>Click "Calculate Check Digits" to generate the correct digits</li>
                <li>Alternatively, enter a complete IBAN to verify its check digits</li>
                <li>View step-by-step MOD-97 calculation breakdown</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our Check Digit Calculator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Educational:</strong> Understand the MOD-97 algorithm with step-by-step explanations</li>
                <li><strong>Instant Results:</strong> Calculate or verify check digits immediately</li>
                <li><strong>Developer-Friendly:</strong> Learn implementation details for your own validation</li>
                <li><strong>Debugging Tool:</strong> Troubleshoot IBAN generation or validation issues</li>
                <li><strong>Accurate:</strong> Uses the official MOD-97 algorithm per ISO 13616</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our Calculator</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Calculate Mode:</strong> Generate check digits from country code and BBAN</li>
                <li><strong>Verify Mode:</strong> Validate existing IBAN check digits</li>
                <li><strong>Step-by-Step Breakdown:</strong> See each calculation step explained</li>
                <li><strong>MOD-97 Algorithm:</strong> Official ISO 13616 standard implementation</li>
                <li><strong>Error Detection:</strong> Identifies common mistakes in manual IBAN entry</li>
                <li><strong>Educational Tool:</strong> Perfect for learning international banking standards</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding the MOD-97 Algorithm</h3>
              <p className="text-muted-foreground">
                The MOD-97 algorithm is the mathematical foundation of IBAN validation. It ensures that IBANs are entered correctly and detects most transcription errors. Here's how it works: First, move the first 4 characters (country code + check digits) to the end of the IBAN. Second, replace each letter with its numeric equivalent (A=10, B=11, ... Z=35). Third, treat the resulting number as a single integer and calculate the remainder when divided by 97. For a valid IBAN, this remainder must equal 1. For example, GB82WEST12345698765432 becomes WEST12345698765432GB82. Converting letters gives 3214282919123456987654321611820. Dividing by 97 gives remainder 1—valid! If generating check digits, use placeholder 00, calculate MOD-97, then subtract result from 98. This algorithm catches 98% of all data entry errors.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for Check Digit Calculation</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>IBAN Generation:</strong> Create valid IBANs from existing bank account numbers.</li>
                <li><strong>Validation Testing:</strong> Verify your IBAN validation implementation works correctly.</li>
                <li><strong>Educational Purposes:</strong> Teach banking standards and validation algorithms.</li>
                <li><strong>Debugging:</strong> Troubleshoot why an IBAN fails validation.</li>
                <li><strong>Data Migration:</strong> Generate IBANs when converting from legacy account formats.</li>
                <li><strong>Manual Entry Verification:</strong> Check if manually-entered IBANs are valid.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All check digit calculations are performed entirely in your browser. No IBAN data is sent to our servers, ensuring complete privacy. The calculator is purely educational and should not be used to generate real IBANs for financial transactions without proper authorization from banking institutions.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="8888888888" />
          </div>
        </div>
      </div>
    </div>
  )
}

