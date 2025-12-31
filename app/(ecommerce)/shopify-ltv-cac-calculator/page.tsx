import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { LtvCacCalculator } from '@/components/tools/ecommerce/LtvCacCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const pageMetadata: Metadata = {
  title: 'LTV/CAC Calculator - Measure Customer Lifetime Value | RawTools',
  description: 'Free LTV/CAC calculator. Measure customer lifetime value and acquisition cost ratio.',
  alternates: { canonical: 'https://rawtools.io/shopify-ltv-cac-calculator' },
  openGraph: {
    title: 'LTV/CAC Calculator | RawTools',
    description: 'Measure customer lifetime value (LTV) and acquisition cost (CAC) ratio for profitability.',
    type: 'website',

    url: 'https://rawtools.io/shopify-ltv-cac-calculator',
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
    title: 'LTV/CAC Calculator | RawTools',
    description: 'Measure customer lifetime value (LTV) and acquisition cost (CAC) ratio for profitability.',

    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/shopify-ltv-cac-calculator');
}


export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'LTV/CAC Calculator',
    description: 'Measure customer lifetime value and acquisition cost ratio',
    href: '/shopify-ltv-cac-calculator',
  });

  const howToSchema = generateHowToSchema({
    name: 'LTV/CAC Calculator',
    description: 'How to calculate customer lifetime value to acquisition cost ratio',
    url: 'https://rawtools.io/shopify-ltv-cac-calculator',
  }, [
    'Enter average order value (AOV)',
    'Input number of purchases per year',
    'Enter average customer lifespan in years',
    'Input customer acquisition cost (CAC)',
    'View your LTV, LTV:CAC ratio, and profitability insights'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What is a good LTV:CAC ratio for e-commerce?',
      answer: 'Healthy benchmark: 3:1 or higher (customer lifetime value is 3x acquisition cost). Example: LTV $300, CAC $100 = 3:1 ratio. Interpretation: 1:1 ratio (break-even, unsustainable), 2:1 (marginally profitable, risky), 3:1 (healthy, sustainable growth), 5:1+ (excellent, scale aggressively). SaaS companies target 5:1+, but e-commerce typically operates at 3-4:1 due to lower repeat rates. If ratio < 3:1, focus on retention (increase LTV) or reduce ad spend (lower CAC).'
    },
    {
      question: 'How do I calculate customer lifetime value (LTV)?',
      answer: 'Formula: Average Order Value × Purchase Frequency × Customer Lifespan. Example: AOV $75, customers buy 4x/year, stay 2 years = $75 × 4 × 2 = $600 LTV. For Shopify: use analytics to find AOV (Orders ÷ Customers), repeat purchase rate (returning customers / total customers), and average retention (cohort analysis). Simplify: LTV ≈ AOV × (1 + Repeat Purchase Rate × Years Active). Real case: AOV $100, 30% repurchase rate, 1.5 years = $100 × (1 + 0.3 × 1.5) = $145 LTV.'
    },
    {
      question: 'How do I calculate customer acquisition cost (CAC)?',
      answer: 'Formula: Total Marketing Spend ÷ New Customers Acquired. Include: paid ads (Facebook, Google, TikTok), influencer fees, agency costs, creative production, and promotional discounts. Exclude: general brand awareness spend. Example: $10,000 ad spend acquires 200 new customers = $50 CAC. Track by channel: Facebook CAC $45, Google CAC $60, influencers CAC $80. Allocate budget to lowest-CAC channels. Shopify reports: use UTM parameters and attribution to track per-channel CAC accurately.'
    },
    {
      question: 'Why is my LTV:CAC ratio low and how do I improve it?',
      answer: 'Low ratio causes: high ad costs (competitive niches), low repeat rates (poor retention), or low AOV (cheap products). Solutions: Increase LTV (launch subscriptions, upsell bundles, email retention campaigns, loyalty programs), Lower CAC (optimize ad creative, target high-intent keywords, improve landing page conversion), or Both (retain customers longer AND reduce acquisition costs). Real fix: store with 2:1 ratio ($200 LTV, $100 CAC) launches subscription, increasing LTV to $350. New ratio: 3.5:1.'
    },
    {
      question: 'How often should I track LTV:CAC ratio?',
      answer: 'Calculate monthly for trend analysis, but use quarterly data for strategic decisions (monthly fluctuations can mislead). Track by cohort: January 2024 customers vs February 2024 customers. Monitor changes: if ratio drops from 4:1 to 2.5:1 over 3 months, investigate immediately (rising ad costs? declining retention?). Use cohort reports in Shopify or tools like Lifetimely, Peel, or Littledata for automated LTV:CAC tracking.'
    },
    {
      question: 'Does LTV:CAC ratio vary by product category?',
      answer: 'Significantly. Subscription products (coffee, supplements): 5-8:1 (high retention). Fashion/apparel: 2-3:1 (trend-driven, lower loyalty). Furniture/home goods: 1.5-2.5:1 (infrequent repurchase). Digital products: 8-10:1 (low COGS, high margins). Pet supplies: 4-6:1 (recurring needs, loyal buyers). Benchmark against your category, not all e-commerce. If your coffee subscription achieves 4:1 but industry average is 6:1, there is improvement opportunity.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="5555555555" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs
              category="E-Commerce Tools"
              toolName="LTV/CAC Calculator"
              currentHref="/shopify-ltv-cac-calculator"
            />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">LTV/CAC Calculator</h1>
              <p className="text-muted-foreground">
                Measure customer lifetime value (LTV) and acquisition cost (CAC) ratio for profitability
              </p>
            </div>

            <LtvCacCalculator />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Calculate LTV/CAC Ratio</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter average order value (AOV)</li>
                <li>Input number of purchases per year</li>
                <li>Enter average customer lifespan in years</li>
                <li>Input customer acquisition cost (CAC)</li>
                <li>View your LTV, LTV:CAC ratio, and profitability insights</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our LTV/CAC Calculator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Business Health Check:</strong> Understand if your acquisition strategy is profitable</li>
                <li><strong>Instant Results:</strong> Calculate LTV:CAC ratio in real-time</li>
                <li><strong>Profitability Insights:</strong> Know if you're spending too much on customer acquisition</li>
                <li><strong>Growth Planning:</strong> Determine sustainable scaling strategies</li>
                <li><strong>Investor-Ready Metrics:</strong> Key performance indicators for fundraising</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our LTV/CAC Tool</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Customer Lifetime Value:</strong> Total revenue generated per customer</li>
                <li><strong>Acquisition Cost:</strong> Average cost to acquire one customer</li>
                <li><strong>LTV:CAC Ratio:</strong> Benchmark metric for business sustainability</li>
                <li><strong>Profitability Assessment:</strong> Clear indicators of business health</li>
                <li><strong>Growth Recommendations:</strong> Actionable insights based on your ratio</li>
                <li><strong>Real-Time Calculations:</strong> Updates as you type</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding LTV/CAC Metrics</h3>
              <p className="text-muted-foreground">
                The LTV:CAC ratio measures the relationship between customer lifetime value and customer acquisition cost. A healthy ratio is 3:1 or higher, meaning you earn at least $3 for every $1 spent acquiring customers. For example, if your average customer spends $50 per order, makes 4 purchases per year, stays for 3 years (LTV = $600), and costs $100 to acquire (CAC), your ratio is 6:1—excellent. Ratios below 1:1 mean you're losing money on every customer. Ratios between 1:1 and 3:1 suggest you're profitable but may struggle to scale. Understanding this metric helps you make informed decisions about marketing spend, pricing, retention strategies, and business growth. It's a critical indicator of long-term sustainability.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for LTV/CAC Analysis</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Marketing Budget:</strong> Determine how much to spend on customer acquisition.</li>
                <li><strong>Business Valuation:</strong> Key metric for investors and potential buyers.</li>
                <li><strong>Growth Strategy:</strong> Decide if you can afford to scale aggressively.</li>
                <li><strong>Retention Focus:</strong> Understand if improving retention is more valuable than acquisition.</li>
                <li><strong>Pricing Optimization:</strong> Test how price changes affect profitability.</li>
                <li><strong>Channel Comparison:</strong> Calculate LTV:CAC for different marketing channels.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All LTV/CAC calculations are performed directly in your web browser. This means your business data never leaves your device and is never uploaded to our servers. You can use our tool with complete confidence, knowing your financial metrics remain private and secure throughout the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="6666666666" />
          </div>
        </div>
      </div>

      <RelatedTools currentTool="/shopify-ltv-cac-calculator" />
    </div>
  );
}

