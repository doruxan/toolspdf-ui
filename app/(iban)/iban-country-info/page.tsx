import { Metadata } from 'next'
import { IBANCountryInfo } from '@/components/tools/iban/IBANCountryInfo'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema } from '@/lib/seo/schemas'
import { withCanonicalMetadata } from '@/lib/seo/metadata'

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

  return (
    <>
      <StructuredData data={schema} />
      
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs category="IBAN Tools" toolName="Country Lookup" currentHref="/iban-country-info" />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              IBAN Country Lookup
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive database of IBAN format specifications for 80+ countries. 
              View examples, validation rules, structure breakdowns, and SEPA membership information.
            </p>
          </div>

          <IBANCountryInfo />
        </div>
      </div>
    </>
  )
}

