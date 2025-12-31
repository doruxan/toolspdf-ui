import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { FeesCalculator } from '@/components/tools/ecommerce/FeesCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema, generateHowToSchema } from '@/lib/seo/schemas';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const pageMetadata: Metadata = {
  title: 'Shopify Fees Calculator - Estimate Processing & Transaction Fees | RawTools',
  description: 'Free Shopify fees calculator. Estimate processing fees and transaction fees across all Shopify plans.',
  alternates: { canonical: 'https://rawtools.io/shopify-fees-calculator' },
  openGraph: {
    title: 'Shopify Fees Calculator | RawTools',
    description: 'Estimate processing and transaction fees across all Shopify plans.',
    type: 'website',

    url: 'https://rawtools.io/shopify-fees-calculator',
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
    title: 'Shopify Fees Calculator | RawTools',
    description: 'Estimate processing and transaction fees across all Shopify plans. Calculate exact costs.',

    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/shopify-fees-calculator');
}


export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Shopify Fees Calculator',
    description: 'Estimate processing fees and transaction fees across all Shopify plans',
    href: '/shopify-fees-calculator',
  });

  const howToSchema = generateHowToSchema({
    name: 'Shopify Fees Calculator',
    description: 'How to calculate Shopify processing and transaction fees',
    url: 'https://rawtools.io/shopify-fees-calculator',
  }, [
    'Select your Shopify plan (Basic, Shopify, Advanced, or Plus)',
    'Enter your order amount',
    'Choose your payment method (Shopify Payments or Third-party)',
    'View the processing fee, transaction fee, and total fees',
    'Calculate fees for different plans to compare costs'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="3333333333" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs
              category="E-Commerce Tools"
              toolName="Shopify Fees Calculator"
              currentHref="/shopify-fees-calculator"
            />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Shopify Fees Calculator</h1>
              <p className="text-muted-foreground">
                Estimate processing and transaction fees across all Shopify plans
              </p>
            </div>

            <FeesCalculator />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Calculate Shopify Fees</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Select your Shopify plan (Basic, Shopify, Advanced, or Plus)</li>
                <li>Enter your order amount</li>
                <li>Choose your payment method (Shopify Payments or Third-party)</li>
                <li>View the processing fee, transaction fee, and total fees</li>
                <li>Calculate fees for different plans to compare costs</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our Shopify Fees Calculator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Accurate Rates:</strong> Up-to-date fee structures for all Shopify plans</li>
                <li><strong>Plan Comparison:</strong> Compare fees across different subscription tiers</li>
                <li><strong>Instant Results:</strong> Calculate fees in real-time</li>
                <li><strong>Cost Planning:</strong> Understand true transaction costs</li>
                <li><strong>Payment Method Comparison:</strong> See differences between Shopify Payments and third-party gateways</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our Fees Calculator</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>All Shopify Plans:</strong> Basic, Shopify, Advanced, and Plus</li>
                <li><strong>Processing Fees:</strong> Credit card and payment processing charges</li>
                <li><strong>Transaction Fees:</strong> Additional fees for third-party payment gateways</li>
                <li><strong>Total Cost Breakdown:</strong> Clear itemization of all charges</li>
                <li><strong>Multiple Currencies:</strong> Calculate fees for international sales</li>
                <li><strong>Real-Time Calculations:</strong> Updates as you type</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding Shopify Fee Structure</h3>
              <p className="text-muted-foreground">
                Shopify charges two types of fees on transactions: processing fees and transaction fees. Processing fees apply when customers pay with credit cards and vary by plan (2.9% + 30¢ for Basic, 2.7% + 30¢ for Shopify, 2.5% + 30¢ for Advanced, 2.4% + 30¢ for Plus using Shopify Payments). Transaction fees are additional charges (2% for Basic, 1% for Shopify, 0.5% for Advanced, 0% for Plus) that apply only when using third-party payment gateways instead of Shopify Payments. For example, a $100 sale on the Basic plan with Shopify Payments costs $3.20 in fees, while the same sale with a third-party gateway costs $5.20 ($3.20 processing + $2.00 transaction fee). Understanding these fees helps you choose the right plan and payment method to minimize costs.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for Fee Calculation</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Plan Selection:</strong> Determine which Shopify plan offers the best value based on your sales volume.</li>
                <li><strong>Pricing Strategy:</strong> Account for transaction fees when setting product prices.</li>
                <li><strong>Payment Gateway Comparison:</strong> Decide between Shopify Payments and third-party gateways.</li>
                <li><strong>Budget Forecasting:</strong> Estimate monthly fee expenses for financial planning.</li>
                <li><strong>Profit Margin Analysis:</strong> Calculate true profit after deducting all fees.</li>
                <li><strong>Upgrade Decisions:</strong> Determine if upgrading to a higher plan saves money on fees.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All fee calculations are performed directly in your web browser. This means your sales data never leaves your device and is never uploaded to our servers. You can use our tool with complete confidence, knowing your business information remains private and secure throughout the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="4444444444" />
          </div>
        </div>
      </div>

      <RelatedTools currentTool="/shopify-fees-calculator" />
    </div>
  );
}

