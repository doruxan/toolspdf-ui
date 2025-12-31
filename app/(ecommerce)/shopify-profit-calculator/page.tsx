import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { ProfitCalculator } from '@/components/tools/ecommerce/ProfitCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema, generateHowToSchema } from '@/lib/seo/schemas';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const pageMetadata: Metadata = {
  title: 'Shopify Profit Calculator - Calculate Per-Order Profit | RawTools',
  description:
    'Free Shopify profit calculator. Calculate per-order profit, contribution margin, and break-even revenue with detailed cost breakdowns. No signup required.',
  keywords:
    'shopify profit calculator, profit margin calculator, shopify calculator, e-commerce profit',
  alternates: {
    canonical: 'https://rawtools.io/shopify-profit-calculator',
  },
  openGraph: {
    title: 'Shopify Profit Calculator | RawTools',
    description: 'Calculate per-order profit and contribution margin for your Shopify store.',
    type: 'website',
    url: 'https://rawtools.io/shopify-profit-calculator',

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
    title: 'Shopify Profit Calculator | RawTools',
    description: 'Calculate per-order profit, contribution margin, and break-even revenue for your Shopify store.',

    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/shopify-profit-calculator');
}


export default function ShopifyProfitCalculatorPage() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Shopify Profit Calculator',
    description:
      'Calculate per-order profit, contribution margin, and break-even revenue with detailed cost breakdowns.',
    href: '/shopify-profit-calculator',
  });

  const howToSchema = generateHowToSchema({
    name: 'Shopify Profit Calculator',
    description: 'How to calculate per-order profit and contribution margin for your Shopify store',
    url: 'https://rawtools.io/shopify-profit-calculator',
  }, [
    'Enter your selling price per unit',
    'Input product cost (COGS - Cost of Goods Sold)',
    'Add shipping cost, payment processing fees, and other variable costs',
    'Enter fixed costs (overhead, software subscriptions, salaries)',
    'View your per-order profit, contribution margin, and break-even revenue'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1111111111" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs
              category="E-Commerce Tools"
              toolName="Shopify Profit Calculator"
              currentHref="/shopify-profit-calculator"
            />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Shopify Profit Calculator</h1>
              <p className="text-muted-foreground">
                Calculate per-order profit, contribution margin, and break-even revenue for your Shopify store
              </p>
            </div>

            <ProfitCalculator />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Calculate Shopify Profit</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter your selling price per unit</li>
                <li>Input product cost (COGS - Cost of Goods Sold)</li>
                <li>Add shipping cost, payment processing fees, and other variable costs</li>
                <li>Enter fixed costs (overhead, software subscriptions, salaries)</li>
                <li>View your per-order profit, contribution margin, and break-even revenue</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our Shopify Profit Calculator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Accurate Calculations:</strong> Includes all cost variables for precise results</li>
                <li><strong>Instant Results:</strong> Calculate profit margins in real-time</li>
                <li><strong>Break-Even Analysis:</strong> Know exactly how much revenue you need</li>
                <li><strong>Contribution Margin:</strong> Understand profitability per unit</li>
                <li><strong>Business Planning:</strong> Make informed pricing decisions</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our Profit Calculator</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Per-Order Profit:</strong> Calculate exact profit for each order</li>
                <li><strong>Contribution Margin:</strong> Percentage of revenue covering fixed costs</li>
                <li><strong>Break-Even Revenue:</strong> Minimum sales needed to cover all costs</li>
                <li><strong>Variable Cost Tracking:</strong> COGS, shipping, fees, and more</li>
                <li><strong>Fixed Cost Analysis:</strong> Monthly overhead and operating expenses</li>
                <li><strong>Real-Time Updates:</strong> Calculations update as you type</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding Shopify Profit Metrics</h3>
              <p className="text-muted-foreground">
                Calculating profit for your Shopify store involves understanding the difference between revenue and costs. Per-order profit is the amount you keep after deducting all variable costs (COGS, shipping, payment fees) from the selling price. Contribution margin shows what percentage of each sale contributes to covering fixed costs and generating profit. Break-even revenue tells you the minimum sales volume needed to cover all expenses. For example, if you sell a product for $50 with $20 COGS, $5 shipping, and $2 payment fees, your per-order profit is $23. If your monthly fixed costs are $2,000, you need to sell 87 units to break even. Understanding these metrics helps you price products profitably and make data-driven business decisions.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for Profit Calculation</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Pricing Strategy:</strong> Set optimal prices that ensure profitability.</li>
                <li><strong>Product Evaluation:</strong> Determine which products are most profitable.</li>
                <li><strong>Budget Planning:</strong> Forecast revenue needed to meet profit goals.</li>
                <li><strong>Cost Management:</strong> Identify areas to reduce costs and improve margins.</li>
                <li><strong>Supplier Negotiation:</strong> Understand how COGS changes affect profit.</li>
                <li><strong>Growth Planning:</strong> Calculate how many sales you need to scale.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All profit calculations are performed directly in your web browser. This means your business data never leaves your device and is never uploaded to our servers. You can use our tool with complete confidence, knowing your financial information remains private and secure throughout the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="2222222222" />
          </div>
        </div>
      </div>

      <RelatedTools currentTool="/shopify-profit-calculator" />
    </div>
  );
}

