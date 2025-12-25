import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { BundlePricingCalculator } from '@/components/tools/ecommerce/BundlePricingCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Bundle Pricing Calculator - Optimize Bundle Pricing | RawTools',
  description: 'Free bundle pricing calculator. Calculate optimal bundle pricing and discount strategies.',
  alternates: { canonical: 'https://rawtools.io/shopify-bundle-pricing-calculator' },
};

export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Bundle Pricing Calculator',
    description: 'Calculate optimal bundle pricing and discount strategies',
    href: '/shopify-bundle-pricing-calculator',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <Breadcrumbs category="E-Commerce Tools" toolName="Bundle Pricing Calculator" />
        <h1 className="text-4xl font-bold text-foreground mb-4">Bundle Pricing Calculator</h1>
        <BundlePricingCalculator />
      </div>
      <RelatedTools currentTool="/shopify-bundle-pricing-calculator" />
    </div>
  );
}

