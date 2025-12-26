import { Metadata } from 'next'
import { IBANCheckCalculator } from '@/components/tools/iban/IBANCheckCalculator'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StructuredData from '@/components/seo/StructuredData'
import { generateSoftwareAppSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'IBAN Check Digit Calculator - Calculate & Verify MOD-97 | RawTools',
  description: 'Free IBAN check digit calculator. Calculate correct check digits using MOD-97 algorithm or verify existing IBANs. See step-by-step calculations.',
  keywords: 'iban check digit calculator, mod 97 calculator, iban checksum, calculate iban check digits, verify check digits',
}

export default function IBANCheckCalculatorPage() {
  const schema = generateSoftwareAppSchema({
    name: 'IBAN Check Digit Calculator',
    description: 'Calculate and verify IBAN check digits using the MOD-97 algorithm. Educational tool with step-by-step calculations.',
    url: 'https://rawtools.io/iban-check-calculator',
  })

  return (
    <>
      <StructuredData data={schema} />
      
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs category="IBAN Tools" toolName="Check Digit Calculator" />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              IBAN Check Digit Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate correct check digits using the MOD-97 algorithm or verify existing IBANs. 
              Educational tool with step-by-step calculation breakdown.
            </p>
          </div>

          <IBANCheckCalculator />
        </div>
      </div>
    </>
  )
}

