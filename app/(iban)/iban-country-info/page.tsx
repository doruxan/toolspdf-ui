import { Metadata } from 'next'
import { IBANCountryInfo } from '@/components/tools/iban/IBANCountryInfo'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema, generateHowToSchema } from '@/lib/seo/schemas'
import { withCanonicalMetadata } from '@/lib/seo/metadata'
import AdBanner from '@/components/ads/AdBanner'
import AdSidebar from '@/components/ads/AdSidebar'

const pageMetadata: Metadata = {
  title: 'IBAN Country Lookup - Format Rules & Examples for 80+ Countries | RawTools',
  description: 'Comprehensive IBAN country database. View format specifications, examples, and validation rules for 80+ countries. SEPA membership information included.',
  keywords: 'iban country lookup, iban format by country, iban country codes, iban specifications, sepa countries',
  openGraph: {
    title: 'IBAN Country Lookup - IBAN Formats',
    description: 'Comprehensive IBAN format database for 80+ countries. Examples, validation rules, and SEPA info.',
    type: 'website',
  
    url: 'https://rawtools.io/iban-country-info',
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
    title: 'IBAN Country Lookup - IBAN Formats | RawTools',
    description: 'Comprehensive IBAN format database for 80+ countries. Examples, validation rules, and SEPA info.',
  
    images: ['/og-image.svg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/iban-country-info')
}

export default function IBANCountryInfoPage() {
  const schema = generateSoftwareAppSchema({
    name: 'IBAN Country Lookup',
    description: 'Comprehensive database of IBAN format specifications for 80+ countries including examples, validation rules, and SEPA membership.',
    url: 'https://rawtools.io/iban-country-info',
  })

  const howToSchema = generateHowToSchema({
    name: 'IBAN Country Lookup',
    description: 'How to look up IBAN format specifications for different countries',
    url: 'https://rawtools.io/iban-country-info',
  }, [
    'Select a country from the dropdown or search by name/code',
    'View the IBAN format specification and length',
    'See example IBANs for the selected country',
    'Check SEPA membership status',
    'Review the format structure and validation rules'
  ])

  return (
    <div className="w-full">
      <StructuredData data={schema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="5555555555" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="IBAN Tools" toolName="Country Lookup" currentHref="/iban-country-info" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">IBAN Country Lookup</h1>
              <p className="text-muted-foreground">
                Comprehensive database of IBAN format specifications for 80+ countries
              </p>
            </div>

            <IBANCountryInfo />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Use IBAN Country Lookup</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Select a country from the dropdown or search by name/code</li>
                <li>View the IBAN format specification and length</li>
                <li>See example IBANs for the selected country</li>
                <li>Check SEPA membership status</li>
                <li>Review the format structure and validation rules</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our IBAN Country Database?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Comprehensive Coverage:</strong> 80+ countries with complete specifications</li>
                <li><strong>Real Examples:</strong> Valid IBAN examples for each country</li>
                <li><strong>SEPA Information:</strong> Instant identification of SEPA member countries</li>
                <li><strong>Developer-Friendly:</strong> Format patterns for validation implementation</li>
                <li><strong>Always Updated:</strong> Current with latest IBAN standards</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our Country Lookup Tool</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Search by Name or Code:</strong> Quick country selection</li>
                <li><strong>Format Specifications:</strong> Exact IBAN structure for each country</li>
                <li><strong>Length Information:</strong> Character count requirements</li>
                <li><strong>Example IBANs:</strong> Valid samples for reference</li>
                <li><strong>SEPA Status:</strong> Single Euro Payments Area membership</li>
                <li><strong>Regex Patterns:</strong> Validation patterns for developers</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding IBAN Country Codes</h3>
              <p className="text-muted-foreground">
                Every IBAN starts with a two-letter ISO 3166-1 alpha-2 country code that identifies the country where the account is held. For example, DE for Germany, FR for France, GB for United Kingdom, and IT for Italy. Each country has its own IBAN format with specific length requirements (ranging from 15 to 34 characters) and structure. For instance, German IBANs are always 22 characters long (DE + 2 check digits + 18-character BBAN), while French IBANs are 27 characters (FR + 2 check digits + 23-character BBAN). Understanding these country-specific formats is essential for implementing IBAN validation, generating test data, or processing international payments. SEPA countries use standardized formats for euro transfers, making cross-border payments within Europe faster and cheaper.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for Country Lookup</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>IBAN Validation:</strong> Implement country-specific validation rules in your application.</li>
                <li><strong>Test Data Generation:</strong> Create valid test IBANs for different countries.</li>
                <li><strong>Payment Processing:</strong> Verify IBAN formats before processing international transfers.</li>
                <li><strong>Form Design:</strong> Set appropriate input length and format constraints.</li>
                <li><strong>Customer Support:</strong> Help customers understand their IBAN format.</li>
                <li><strong>Compliance:</strong> Ensure adherence to international banking standards.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                This country lookup tool provides publicly available IBAN format specifications. No personal or financial data is collected or stored. All lookups are performed locally in your browser, ensuring complete privacy.
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

