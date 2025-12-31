import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageLayout from '@/components/layout/CategoryPageLayout';
import { toolCategories } from '@/config/tools';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const categoryId = 'json-tools';

const pageMetadata: Metadata = {
  title: 'JSON Tools - Format, Validate, Convert CSV/Excel | RawTools',
  description:
    'Browser-based JSON tools: formatter, minifier, schema validator, diff, query, and CSV/Excel converters. Fast, private, and free.',
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/json-tools');
}

export default function JSONToolsPage() {
  const category = toolCategories.find((c) => c.id === categoryId);
  if (!category) return notFound();

  return <CategoryPageLayout category={category} />;
}
