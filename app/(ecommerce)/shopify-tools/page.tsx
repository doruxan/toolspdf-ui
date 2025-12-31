import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageLayout from '@/components/layout/CategoryPageLayout';
import { toolCategories } from '@/config/tools';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const categoryId = 'shopify-tools';

const pageMetadata: Metadata = {
  title: 'Shopify Tools - Profit, Fees, LTV/CAC, ROAS | RawTools',
  description:
    'Shopify calculators for operators: profit, fees, LTV/CAC, bundle pricing, break-even ROAS, return impact, invoice generator, and speed checklist.',
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/shopify-tools');
}

export default function ShopifyToolsPage() {
  const category = toolCategories.find((c) => c.id === categoryId);
  if (!category) return notFound();

  return <CategoryPageLayout category={category} />;
}
