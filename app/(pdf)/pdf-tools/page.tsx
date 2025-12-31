import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageLayout from '@/components/layout/CategoryPageLayout';
import { toolCategories } from '@/config/tools';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const categoryId = 'pdf-tools';

const pageMetadata: Metadata = {
  title: 'PDF Tools - Merge, Split, Compress, Convert | RawTools',
  description:
    'Free browser-based PDF tools: merge, split, compress, convert, rotate, protect, unlock, watermark, extract, and more. No uploads required.',
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/pdf-tools');
}

export default function PDFToolsPage() {
  const category = toolCategories.find((c) => c.id === categoryId);
  if (!category) return notFound();

  return <CategoryPageLayout category={category} />;
}
