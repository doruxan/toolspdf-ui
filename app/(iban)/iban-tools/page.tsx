import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StructuredData from '@/components/seo/StructuredData';
import ToolCard from '@/components/home/ToolCard';
import { toolCategories } from '@/config/tools';
import { generateCollectionPageSchema } from '@/lib/seo/schemas';
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

  const collectionSchema = generateCollectionPageSchema({
    name: 'IBAN Tools',
    description: category.description,
    url: 'https://rawtools.io/iban-tools',
    items: category.tools.map((tool) => ({
      name: tool.title,
      description: tool.description,
      url: `https://rawtools.io${tool.href}`,
    })),
  });

  return (
    <div className="w-full">
      <StructuredData data={collectionSchema} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">IBAN Tools</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}


