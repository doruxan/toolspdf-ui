import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { InvoiceGenerator } from '@/components/tools/ecommerce/InvoiceGenerator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Invoice Generator - Create Professional Invoices | RawTools',
  description: 'Free invoice generator. Create professional invoices with line items and tax calculations.',
  alternates: { canonical: 'https://rawtools.io/shopify-invoice-generator' },
};

export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Invoice Generator',
    description: 'Create professional invoices with line items and tax calculations',
    href: '/shopify-invoice-generator',
  });

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <Breadcrumbs category="E-Commerce Tools" toolName="Invoice Generator" />
        <h1 className="text-4xl font-bold text-foreground mb-4">Invoice Generator</h1>
        <InvoiceGenerator />
      </div>
      <RelatedTools currentTool="/shopify-invoice-generator" />
    </div>
  );
}

