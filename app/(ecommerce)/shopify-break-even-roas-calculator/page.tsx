import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { RoasCalculator } from '@/components/tools/ecommerce/RoasCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Break-Even ROAS Calculator - Calculate Minimum ROAS | RawTools',
  description: 'Free ROAS calculator. Calculate minimum return on ad spend to break even.',
  alternates: { canonical: 'https://rawtools.io/shopify-break-even-roas-calculator' },
};

export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Break-Even ROAS Calculator',
    description: 'Calculate minimum return on ad spend to break even',
    href: '/shopify-break-even-roas-calculator',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <Breadcrumbs category="E-Commerce Tools" toolName="Break-Even ROAS Calculator" />
        <h1 className="text-4xl font-bold text-foreground mb-4">Break-Even ROAS Calculator</h1>
        <RoasCalculator />
      </div>
      <RelatedTools currentTool="/shopify-break-even-roas-calculator" />
    </div>
  );
}

