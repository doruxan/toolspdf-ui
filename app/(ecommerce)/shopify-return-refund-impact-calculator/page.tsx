import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { ReturnsCalculator } from '@/components/tools/ecommerce/ReturnsCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const pageMetadata: Metadata = {
  title: 'Return Impact Calculator - Analyze Return Impact | RawTools',
  description: 'Free return impact calculator. Analyze the impact of returns and refunds on profitability.',
  alternates: { canonical: 'https://rawtools.io/shopify-return-refund-impact-calculator' },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/shopify-return-refund-impact-calculator');
}


export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Return Impact Calculator',
    description: 'Analyze the impact of returns and refunds on profitability',
    href: '/shopify-return-refund-impact-calculator',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <Breadcrumbs
          category="E-Commerce Tools"
          toolName="Return Impact Calculator"
          currentHref="/shopify-return-refund-impact-calculator"
        />
        <h1 className="text-4xl font-bold text-foreground mb-4">Return Impact Calculator</h1>
        <ReturnsCalculator />
      </div>
      <RelatedTools currentTool="/shopify-return-refund-impact-calculator" />
    </div>
  );
}

