import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageLayout from '@/components/layout/CategoryPageLayout';
import { toolCategories } from '@/config/tools';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const categoryId = 'string-tools';

const pageMetadata: Metadata = {
  title: 'String Tools - Case Converter, Base64, Hash Generator | RawTools',
  description:
    'Browser-based string tools: case converter, base64 encoder, hash generator, regex tester, JWT decoder, and 20+ more. Fast, private, and free.',
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/string-tools');
}

export default function StringToolsPage() {
  const category = toolCategories.find((c) => c.id === categoryId);
  if (!category) return notFound();

  return <CategoryPageLayout category={category} />;
}

