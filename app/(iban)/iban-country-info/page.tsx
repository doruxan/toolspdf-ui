import { Metadata } from 'next'
import { IBANCountryInfo } from '@/components/tools/iban/IBANCountryInfo'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'IBAN Country Lookup - Format Rules & Examples for 80+ Countries | RawTools',
  description: 'Comprehensive IBAN country database. View format specifications, examples, and validation rules for 80+ countries. SEPA membership information included.',
  keywords: 'iban country lookup, iban format by country, iban country codes, iban specifications, sepa countries',
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
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs category="IBAN Tools" toolName="Country Lookup" />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              IBAN Country Lookup
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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

