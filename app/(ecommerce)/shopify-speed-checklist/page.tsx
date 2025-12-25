import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { SpeedChecklist } from '@/components/tools/ecommerce/SpeedChecklist';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Shopify Speed Checklist - Optimize Store Speed | RawTools',
  description: 'Free Shopify speed checklist. Optimize your store speed with our comprehensive checklist.',
  alternates: { canonical: 'https://rawtools.io/shopify-speed-checklist' },
};

export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Shopify Speed Checklist',
    description: 'Optimize your Shopify store speed with our comprehensive checklist',
    href: '/shopify-speed-checklist',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <Breadcrumbs category="E-Commerce Tools" toolName="Shopify Speed Checklist" />
        <h1 className="text-4xl font-bold text-foreground mb-4">Shopify Speed Checklist</h1>
        <SpeedChecklist />
      </div>
      <RelatedTools currentTool="/shopify-speed-checklist" />
    </div>
  );
}

