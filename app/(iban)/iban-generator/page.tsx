import { Metadata } from 'next'
import { IBANGenerator } from '@/components/tools/iban/IBANGenerator'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema, generateHowToSchema } from '@/lib/seo/schemas'
import { withCanonicalMetadata } from '@/lib/seo/metadata'
import AdBanner from '@/components/ads/AdBanner'
import AdSidebar from '@/components/ads/AdSidebar'

const pageMetadata: Metadata = {
  title: 'IBAN Generator - Generate Valid Test IBANs for 80+ Countries | RawTools',
  description: 'Free IBAN generator for testing and development. Generate valid IBANs with correct checksums for 80+ countries. Bulk generation up to 100 IBANs.',
  keywords: 'iban generator, generate iban, test iban, random iban, iban creator, fake iban generator',
  openGraph: {
    title: 'IBAN Generator - Generate Test IBANs',
    description: 'Generate valid test IBANs for 80+ countries. Perfect for development and testing.',
    type: 'website',
  
    url: 'https://rawtools.io/iban-generator',
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
    title: 'IBAN Generator - Generate Test IBANs | RawTools',
    description: 'Generate valid test IBANs for 80+ countries. Perfect for development and testing.',
  
    images: ['/og-image.svg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/iban-generator')
}

export default function IBANGeneratorPage() {
  const schema = generateSoftwareAppSchema({
    name: 'IBAN Generator',
    description: 'Generate valid test IBANs for development and testing purposes. Supports 80+ countries with correct MOD-97 checksums.',
    url: 'https://rawtools.io/iban-generator',
  })

  const howToSchema = generateHowToSchema({
    name: 'IBAN Generator',
    description: 'How to generate valid test IBANs for development and testing',
    url: 'https://rawtools.io/iban-generator',
  }, [
    'Select a country from the dropdown list',
    'Optionally specify bank and branch codes',
    'Choose how many IBANs to generate (1-100)',
    'Click "Generate IBANs" button',
    'Copy or export generated IBANs in CSV or JSON format'
  ])

  return (
    <div className="w-full">
      <StructuredData data={schema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="9999999999" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="IBAN Tools" toolName="IBAN Generator" currentHref="/iban-generator" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">IBAN Generator</h1>
              <p className="text-muted-foreground">
                Generate valid test IBANs for development, testing, and educational purposes
              </p>
            </div>

            <IBANGenerator />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Generate Test IBANs</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Select a country from the dropdown list</li>
                <li>Optionally specify bank and branch codes</li>
                <li>Choose how many IBANs to generate (1-100)</li>
                <li>Click "Generate IBANs" button</li>
                <li>Copy or export generated IBANs in CSV or JSON format</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our IBAN Generator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Mathematically Valid:</strong> All IBANs pass MOD-97 checksum validation</li>
                <li><strong>Country-Specific:</strong> Follows exact format rules for each country</li>
                <li><strong>Bulk Generation:</strong> Create up to 100 IBANs at once</li>
                <li><strong>Export Options:</strong> Download as CSV or JSON</li>
                <li><strong>Developer-Friendly:</strong> Perfect for testing and development</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our IBAN Generator</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>80+ Countries:</strong> Support for all IBAN-using countries</li>
                <li><strong>Custom Bank Codes:</strong> Specify bank and branch codes or randomize</li>
                <li><strong>Batch Generation:</strong> Generate multiple IBANs simultaneously</li>
                <li><strong>Valid Checksums:</strong> Correct MOD-97 check digits</li>
                <li><strong>Copy Functions:</strong> Copy individual or all IBANs at once</li>
                <li><strong>Export Formats:</strong> CSV and JSON for easy integration</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What is Test IBAN Generation?</h3>
              <p className="text-muted-foreground">
                Test IBAN generation creates mathematically valid IBANs that pass all format and checksum validations but do not correspond to real bank accounts. This is essential for software testing, API development, form validation, and educational purposes. Our generator follows country-specific format rules and calculates correct MOD-97 check digits, ensuring generated IBANs behave identically to real ones in validation logic. For example, generating a German IBAN produces a 22-character string starting with DE, followed by 2 check digits and an 18-character BBAN (8-digit bank code + 10-digit account). The check digits are calculated using the official MOD-97 algorithm, so the IBAN passes all validation checks. This allows developers to test payment systems without using real bank account data, QA engineers to create test datasets, and educators to demonstrate international banking standards safely.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for IBAN Generation</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Software Testing:</strong> Generate test data for payment processing systems and banking applications.</li>
                <li><strong>API Development:</strong> Create sample IBANs for API documentation and integration testing.</li>
                <li><strong>Form Validation:</strong> Test IBAN entry fields, input masks, and error handling.</li>
                <li><strong>Educational Materials:</strong> Demonstrate IBAN structure and validation algorithms.</li>
                <li><strong>QA Automation:</strong> Populate test databases with valid but non-real IBANs.</li>
                <li><strong>Development Environments:</strong> Use test IBANs in staging and development systems.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Important Disclaimer</h3>
              <div className="p-6 bg-yellow-500/10 dark:bg-yellow-500/20 border-2 border-yellow-500/30 rounded-lg">
                <p className="text-yellow-700 dark:text-yellow-300">
                  <strong>Generated IBANs are for testing purposes only.</strong> While mathematically valid and passing all format checks, they do not correspond to real bank accounts. Never use generated IBANs for actual financial transactions, production payment processing, real money transfers, or fraudulent activities. Always use legitimate IBANs provided by authorized financial institutions for real transactions.
                </p>
              </div>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All IBAN generation is performed entirely in your web browser. No generated IBANs are sent to our servers or stored anywhere. This tool is designed solely for creating test data and educational purposes, ensuring complete privacy and security.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1010101010" />
          </div>
        </div>
      </div>
    </div>
  )
}

