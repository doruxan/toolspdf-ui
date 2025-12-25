import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { ProfitCalculator } from '@/components/tools/ecommerce/ProfitCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema } from '@/lib/seo/schemas';
import AdSlot from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Shopify Profit Calculator - Calculate Per-Order Profit | RawTools',
  description:
    'Free Shopify profit calculator. Calculate per-order profit, contribution margin, and break-even revenue with detailed cost breakdowns. No signup required.',
  keywords:
    'shopify profit calculator, profit margin calculator, shopify calculator, e-commerce profit',
  alternates: {
    canonical: 'https://rawtools.io/shopify-profit-calculator',
  },
  openGraph: {
    title: 'Shopify Profit Calculator | RawTools',
    description: 'Calculate per-order profit and contribution margin for your Shopify store.',
    type: 'website',
    url: 'https://rawtools.io/shopify-profit-calculator',
  },
};

export default function ShopifyProfitCalculatorPage() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Shopify Profit Calculator',
    description:
      'Calculate per-order profit, contribution margin, and break-even revenue with detailed cost breakdowns.',
    href: '/shopify-profit-calculator',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <Breadcrumbs category="E-Commerce Tools" toolName="Shopify Profit Calculator" />

        {/* Tool Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Shopify Profit Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate per-order profit, contribution margin, and break-even revenue with detailed
            cost breakdowns for your Shopify store.
          </p>
        </div>

        {/* Ad Slot - Header */}
        <div className="flex justify-center mb-8">
          <AdSlot format="728x90" />
        </div>

        {/* Calculator Component */}
        <ProfitCalculator />

        {/* Ad Slot - After Results */}
        <div className="flex justify-center my-8">
          <AdSlot format="300x250" />
        </div>
      </div>

      {/* Related Tools */}
      <RelatedTools currentTool="/shopify-profit-calculator" />
    </div>
  );
}

