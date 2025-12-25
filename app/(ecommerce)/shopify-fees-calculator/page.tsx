import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { FeesCalculator } from '@/components/tools/ecommerce/FeesCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Shopify Fees Calculator - Estimate Processing & Transaction Fees | RawTools',
  description: 'Free Shopify fees calculator. Estimate processing fees and transaction fees across all Shopify plans.',
  alternates: { canonical: 'https://rawtools.io/shopify-fees-calculator' },
};

export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Shopify Fees Calculator',
    description: 'Estimate processing fees and transaction fees across all Shopify plans',
    href: '/shopify-fees-calculator',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <Breadcrumbs category="E-Commerce Tools" toolName="Shopify Fees Calculator" />
        <h1 className="text-4xl font-bold text-foreground mb-4">Shopify Fees Calculator</h1>
        <FeesCalculator />
      </div>
      <RelatedTools currentTool="/shopify-fees-calculator" />
    </div>
  );
}

