import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { BundlePricingCalculator } from '@/components/tools/ecommerce/BundlePricingCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const pageMetadata: Metadata = {
  title: 'Bundle Pricing Calculator - Optimize Bundle Pricing | RawTools',
  description: 'Free bundle pricing calculator. Calculate optimal bundle pricing and discount strategies.',
  alternates: { canonical: 'https://rawtools.io/shopify-bundle-pricing-calculator' },
  openGraph: {
    title: 'Bundle Pricing Calculator | RawTools',
    description: 'Calculate optimal bundle pricing and discount strategies for maximum profitability.',
    type: 'website',

    url: 'https://rawtools.io/shopify-bundle-pricing-calculator',
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
    title: 'Bundle Pricing Calculator | RawTools',
    description: 'Calculate optimal bundle pricing and discount strategies for maximum profitability.',

    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/shopify-bundle-pricing-calculator');
}


export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Bundle Pricing Calculator',
    description: 'Calculate optimal bundle pricing and discount strategies',
    href: '/shopify-bundle-pricing-calculator',
  });

  const howToSchema = generateHowToSchema({
    name: 'Bundle Pricing Calculator',
    description: 'How to calculate optimal bundle pricing and discount strategies',
    url: 'https://rawtools.io/shopify-bundle-pricing-calculator',
  }, [
    'Enter the individual prices of products in your bundle',
    'Input your desired bundle discount percentage',
    'View the total regular price and discounted bundle price',
    'Calculate customer savings and perceived value',
    'Test different discount percentages to find optimal pricing'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What discount percentage should I offer on bundles?',
      answer: 'Common bundle discounts range from 10-25% depending on margin and perceived value. For low-margin products (apparel, electronics), 10-15% maintains profitability. For high-margin products (digital goods, cosmetics), 20-30% drives volume without hurting profit. Test A/B: 15% vs 20% and measure conversion rate impact. Real example: a $100 bundle (3 items at $40 each) with 15% discount = $102 bundle price. Customer saves $18, you maintain 85% of individual sale revenue.'
    },
    {
      question: 'Is it better to show total savings or percentage discount?',
      answer: 'Both. Display: "Save $25 (20% off)" for maximum impact. Dollar savings resonate with budget-conscious shoppers ($25 saved feels tangible). Percentage discounts appeal to value seekers (20% off sounds significant). For high-value bundles ($200+), emphasize dollar savings. For lower-value bundles ($50-100), emphasize percentages. Example: "$200 bundle, Save $50 (25% off)" converts better than either metric alone.'
    },
    {
      question: 'Should bundle pricing be below individual item costs?',
      answer: 'Not necessarily. Bundles succeed through perceived value, not just price cuts. Strategies: offer complementary products together (shampoo + conditioner), add free shipping (saves $10-15), include exclusive items (bundle-only variant), or provide bulk convenience (3-month supply). Example: $30 + $25 + $20 items = $75. Bundle at $70 (7% off) with free shipping ($10 value) = $80 total value for $70, strong perceived value.'
    },
    {
      question: 'How do I calculate break-even on bundle discounts?',
      answer: 'Formula: (Bundle Price × Contribution Margin) ≥ (Sum of Individual COGS + Fixed Costs per Order). Example: 3 items, individual prices $30 each ($90 total), COGS $10 each ($30 total). At 20% bundle discount ($72), contribution = $72 - $30 = $42. If fixed costs per order (shipping, processing) = $10, profit = $32. Compare to individual sales: $90 - $30 - $10 = $50. Bundle yields 64% of individual profit but potentially 2x conversion rate, increasing total revenue.'
    },
    {
      question: 'Can I use dynamic pricing for different bundle sizes?',
      answer: 'Yes. Tiered bundle discounts incentivize larger purchases. Example: 2-item bundle (10% off), 3-item bundle (15% off), 4+ items (20% off). This encourages customers to add more items. Real scenario: customer adds 2 items for 10% off, then adds a third to unlock 15% off, increasing order value $30 → $90. Shopify apps like Bold Bundles or Bundle Builder automate tiered pricing based on cart contents.'
    },
    {
      question: 'How do bundles affect inventory and fulfillment?',
      answer: 'Bundles sync inventory with component items. Selling a 3-item bundle decrements each item inventory by 1. Fulfillment: pre-assembled bundles (faster shipping, higher prep costs) vs pick-and-pack (slower, lower costs). For high-volume bundles (100+ orders/month), pre-assemble. For low-volume or customizable bundles, pick-and-pack. Use Shopify bundle apps to auto-sync inventory, preventing overselling when bundle components run low.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="7777777777" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs
              category="E-Commerce Tools"
              toolName="Bundle Pricing Calculator"
              currentHref="/shopify-bundle-pricing-calculator"
            />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Bundle Pricing Calculator</h1>
              <p className="text-muted-foreground">
                Calculate optimal bundle pricing and discount strategies for maximum profitability
              </p>
            </div>

            <BundlePricingCalculator />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Calculate Bundle Pricing</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter the individual prices of products in your bundle</li>
                <li>Input your desired bundle discount percentage</li>
                <li>View the total regular price and discounted bundle price</li>
                <li>Calculate customer savings and perceived value</li>
                <li>Test different discount percentages to find optimal pricing</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our Bundle Pricing Calculator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Instant Calculations:</strong> Real-time pricing updates as you type</li>
                <li><strong>Value Perception:</strong> Show customers exactly how much they save</li>
                <li><strong>Profit Optimization:</strong> Balance discount appeal with profitability</li>
                <li><strong>Test Multiple Scenarios:</strong> Experiment with different bundle compositions</li>
                <li><strong>Increase AOV:</strong> Bundle strategies that boost average order value</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our Bundle Calculator</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Multi-Product Support:</strong> Calculate bundles with any number of items</li>
                <li><strong>Flexible Discounting:</strong> Test any discount percentage</li>
                <li><strong>Savings Display:</strong> Show exact dollar and percentage savings</li>
                <li><strong>Regular vs. Bundle Price:</strong> Clear comparison for customers</li>
                <li><strong>Profit Margin Analysis:</strong> Ensure bundles remain profitable</li>
                <li><strong>Real-Time Updates:</strong> Calculations update as you type</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding Bundle Pricing Strategy</h3>
              <p className="text-muted-foreground">
                Bundle pricing is a strategy where you group multiple products together at a discounted price compared to buying each item individually. For example, if you sell a shampoo ($15), conditioner ($15), and hair mask ($20) separately for $50 total, offering them as a bundle for $40 (20% discount) creates a win-win: customers save $10, and you increase average order value while moving more inventory. The key is finding the sweet spot where the discount is attractive enough to drive sales but still maintains healthy profit margins. Typical bundle discounts range from 10-25%, depending on your industry and profit margins. This calculator helps you test different scenarios to find the optimal balance between perceived value and profitability.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for Bundle Pricing</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Increase AOV:</strong> Encourage customers to buy more items per transaction.</li>
                <li><strong>Move Slow Inventory:</strong> Pair slow-moving products with bestsellers.</li>
                <li><strong>Product Launches:</strong> Introduce new products by bundling with popular items.</li>
                <li><strong>Seasonal Promotions:</strong> Create holiday or seasonal bundles for gift shoppers.</li>
                <li><strong>Customer Retention:</strong> Offer exclusive bundles to loyal customers.</li>
                <li><strong>Competitive Pricing:</strong> Match competitor offers while maintaining profitability.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All bundle pricing calculations are performed directly in your web browser. This means your pricing data never leaves your device and is never uploaded to our servers. You can use our tool with complete confidence, knowing your business information remains private and secure throughout the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="8888888888" />
          </div>
        </div>
      </div>

      <RelatedTools currentTool="/shopify-bundle-pricing-calculator" />
    </div>
  );
}

