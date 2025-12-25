import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { LtvCacCalculator } from '@/components/tools/ecommerce/LtvCacCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'LTV/CAC Calculator - Measure Customer Lifetime Value | RawTools',
  description: 'Free LTV/CAC calculator. Measure customer lifetime value and acquisition cost ratio.',
  alternates: { canonical: 'https://rawtools.io/shopify-ltv-cac-calculator' },
};

export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'LTV/CAC Calculator',
    description: 'Measure customer lifetime value and acquisition cost ratio',
    href: '/shopify-ltv-cac-calculator',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <Breadcrumbs category="E-Commerce Tools" toolName="LTV/CAC Calculator" />
        <h1 className="text-4xl font-bold text-foreground mb-4">LTV/CAC Calculator</h1>
        <LtvCacCalculator />
      </div>
      <RelatedTools currentTool="/shopify-ltv-cac-calculator" />
    </div>
  );
}

