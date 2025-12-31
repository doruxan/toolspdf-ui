import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { InvoiceGenerator } from '@/components/tools/ecommerce/InvoiceGenerator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema, generateHowToSchema } from '@/lib/seo/schemas';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const pageMetadata: Metadata = {
  title: 'Invoice Generator - Create Professional Invoices | RawTools',
  description: 'Free invoice generator. Create professional invoices with line items and tax calculations.',
  alternates: { canonical: 'https://rawtools.io/shopify-invoice-generator' },
  openGraph: {
    title: 'Invoice Generator | RawTools',
    description: 'Create professional invoices with line items and tax calculations. Free and instant.',
    type: 'website',

    url: 'https://rawtools.io/shopify-invoice-generator',
    siteName: 'RawTools',
    images: [{
      url: '/og-image.svg',
      width: 1200,
      height: 630,
      alt: 'RawTools Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invoice Generator | RawTools',
    description: 'Create professional invoices with line items and tax calculations. Free and instant.',

    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/shopify-invoice-generator');
}


export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Invoice Generator',
    description: 'Create professional invoices with line items and tax calculations',
    href: '/shopify-invoice-generator',
  });

  const howToSchema = generateHowToSchema({
    name: 'Invoice Generator',
    description: 'How to create professional invoices with line items and tax calculations',
    url: 'https://rawtools.io/shopify-invoice-generator',
  }, [
    'Enter your business information (name, address, contact)',
    'Add customer details',
    'Input line items with descriptions, quantities, and prices',
    'Add tax rate if applicable',
    'Preview and download your professional invoice'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1313131313" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs
              category="E-Commerce Tools"
              toolName="Invoice Generator"
              currentHref="/shopify-invoice-generator"
            />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Invoice Generator</h1>
              <p className="text-muted-foreground">
                Create professional invoices with line items and tax calculations. Free and instant.
              </p>
            </div>

            <InvoiceGenerator />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Create Professional Invoices</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter your business information (name, address, contact)</li>
                <li>Add customer details</li>
                <li>Input line items with descriptions, quantities, and prices</li>
                <li>Add tax rate if applicable</li>
                <li>Preview and download your professional invoice</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our Invoice Generator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Professional Design:</strong> Clean, business-ready invoice templates</li>
                <li><strong>Instant Creation:</strong> Generate invoices in seconds</li>
                <li><strong>Automatic Calculations:</strong> Tax and total amounts calculated automatically</li>
                <li><strong>Downloadable PDFs:</strong> Save and send invoices immediately</li>
                <li><strong>No Registration:</strong> Start creating invoices without signing up</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our Invoice Tool</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Multiple Line Items:</strong> Add unlimited products or services</li>
                <li><strong>Tax Calculations:</strong> Automatic tax computation based on your rate</li>
                <li><strong>Subtotal & Total:</strong> Clear breakdown of all charges</li>
                <li><strong>Custom Branding:</strong> Add your business information and logo</li>
                <li><strong>Invoice Numbers:</strong> Track invoices with unique identifiers</li>
                <li><strong>Due Dates:</strong> Set payment terms and deadlines</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding Professional Invoicing</h3>
              <p className="text-muted-foreground">
                A professional invoice is a detailed billing statement that itemizes products or services provided, their costs, and payment terms. It serves as both a payment request and a legal record of the transaction. Key elements include invoice number, date, seller and buyer information, itemized list of goods/services, quantities, unit prices, subtotal, tax, and grand total. For example, a freelance developer might invoice a client $5,000 for website development (40 hours × $125/hour), add 10% tax ($500), for a total of $5,500 due in 30 days. Clear, detailed invoices reduce payment delays and disputes while maintaining professional standards. Our tool automates calculations and formatting so you can focus on your business.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for Invoice Generation</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Freelancers:</strong> Bill clients for design, development, or consulting services.</li>
                <li><strong>Small Businesses:</strong> Create invoices for product sales or service delivery.</li>
                <li><strong>Contractors:</strong> Invoice for project milestones and completed work.</li>
                <li><strong>E-commerce:</strong> Generate invoices for wholesale or B2B orders.</li>
                <li><strong>Service Providers:</strong> Bill for subscriptions, retainers, or one-time services.</li>
                <li><strong>Record Keeping:</strong> Maintain organized financial records for taxes and accounting.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All invoice generation happens directly in your web browser. This means your business and client information never leaves your device and is never uploaded to our servers. You can use our tool with complete confidence, knowing your sensitive data remains private and secure throughout the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1414141414" />
          </div>
        </div>
      </div>

      <RelatedTools currentTool="/shopify-invoice-generator" />
    </div>
  );
}

