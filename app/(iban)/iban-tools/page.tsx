import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageLayout from '@/components/layout/CategoryPageLayout';
import { toolCategories } from '@/config/tools';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const categoryId = 'iban-tools';

const pageMetadata: Metadata = {
  title: 'IBAN Tools - Validate, Generate, Parse, Format | RawTools',
  description:
    'IBAN tools for banking workflows: validator, generator, parser, formatter, check digit calculator, country lookup, and batch validation. Runs locally in your browser.',
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/iban-tools');
}

export default function IBANToolsPage() {
  const category = toolCategories.find((c) => c.id === categoryId);
  if (!category) return notFound();

  return <CategoryPageLayout category={category} />;
}
