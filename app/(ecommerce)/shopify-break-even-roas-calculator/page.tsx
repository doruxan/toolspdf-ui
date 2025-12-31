import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { RoasCalculator } from '@/components/tools/ecommerce/RoasCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const pageMetadata: Metadata = {
  title: 'Break-Even ROAS Calculator - Calculate Minimum ROAS | RawTools',
  description: 'Free ROAS calculator. Calculate minimum return on ad spend to break even.',
  alternates: { canonical: 'https://rawtools.io/shopify-break-even-roas-calculator' },
  openGraph: {
    title: 'Break-Even ROAS Calculator | RawTools',
    description: 'Calculate minimum return on ad spend (ROAS) to break even on your campaigns.',
    type: 'website',

    url: 'https://rawtools.io/shopify-break-even-roas-calculator',
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
    title: 'Break-Even ROAS Calculator | RawTools',
    description: 'Calculate minimum return on ad spend (ROAS) to break even on your ad campaigns.',

    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/shopify-break-even-roas-calculator');
}


export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Break-Even ROAS Calculator',
    description: 'Calculate minimum return on ad spend to break even',
    href: '/shopify-break-even-roas-calculator',
  });

  const howToSchema = generateHowToSchema({
    name: 'Break-Even ROAS Calculator',
    description: 'How to calculate minimum return on ad spend (ROAS) to break even',
    url: 'https://rawtools.io/shopify-break-even-roas-calculator',
  }, [
    'Enter your product selling price',
    'Input cost of goods sold (COGS)',
    'Add any other variable costs (shipping, fees, etc.)',
    'View your break-even ROAS',
    'Set target ROAS above break-even for profitability'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What is break-even ROAS and why does it matter?',
      answer: 'Break-even ROAS is the minimum return on ad spend where revenue equals costs. Formula: Selling Price / (Selling Price - All Costs). Example: $100 product with $60 total costs (COGS $40 + fees $10 + shipping $10) = $100 / ($100 - $60) = 2.5 break-even ROAS. Spending $40 on ads must generate $100 in sales (2.5x return) to break even. Target ROAS should be 30-50% above break-even for profit. If break-even is 2.5, target 3.5-4.0 ROAS.'
    },
    {
      question: 'What costs should I include in break-even ROAS calculations?',
      answer: 'Include ALL variable costs per sale: product cost (COGS), Shopify fees (2-3%), payment processing (2.9% + 30¢), shipping (actual carrier cost or customer-paid), packaging, and fulfillment labor. Exclude fixed costs (rent, salaries, monthly subscriptions). Example: $50 product, $20 COGS, $1.50 Shopify fee, $1.75 payment fee, $5 shipping = $28.25 total costs. Break-even ROAS = $50 / ($50 - $28.25) = 2.3.'
    },
    {
      question: 'How do I set profitable target ROAS above break-even?',
      answer: 'Add 30-50% margin above break-even for profit. If break-even ROAS is 2.5, target 3.5 (40% buffer). This buffer covers: ad spend fluctuations, returns/refunds (2-5% of sales), customer acquisition costs amortized across purchases, and desired profit margin. Conservative approach: target 2x break-even ROAS. Aggressive (scale mode): target 1.3x break-even. Most e-commerce operates at 1.5-2x break-even for sustainable growth.'
    },
    {
      question: 'Does break-even ROAS differ by product or margin?',
      answer: 'Yes, dramatically. High-margin products (50%+ margin) have low break-even ROAS (2.0). Low-margin products (20% margin) require high ROAS (5.0+). Example: $100 product with $80 costs = 5.0 break-even ROAS vs $100 product with $50 costs = 2.0 break-even. Implication: low-margin products need highly efficient ads or will not scale profitably. Focus ad spend on high-margin products for easier profitability.'
    },
    {
      question: 'How often should I recalculate break-even ROAS?',
      answer: 'Recalculate when key costs change: supplier price increases, shipping rate changes, Shopify plan upgrades, or payment processor fee adjustments. Monitor monthly. Example scenario: supplier raises product cost from $30 to $35 (+16%). Break-even ROAS increases from 2.5 to 2.9. Ads that were profitable (3.0 ROAS) now barely break even. Adjust ad budgets or raise prices immediately to maintain profitability.'
    },
    {
      question: 'Can I use average order value (AOV) for break-even ROAS?',
      answer: 'Yes, for blended calculations. If AOV is $150 with average $90 costs across all products, blended break-even ROAS = $150 / ($150 - $90) = 2.5. This simplifies portfolio-level ad decisions. However, track individual product ROAS for optimization. High-margin products (jewelry, digital goods) can sustain lower ROAS; low-margin items (electronics) need higher ROAS. Optimize campaigns by pausing ads on below-break-even products and scaling winners.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="9999999999" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs
              category="E-Commerce Tools"
              toolName="Break-Even ROAS Calculator"
              currentHref="/shopify-break-even-roas-calculator"
            />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Break-Even ROAS Calculator</h1>
              <p className="text-muted-foreground">
                Calculate minimum return on ad spend (ROAS) to break even on your ad campaigns
              </p>
            </div>

            <RoasCalculator />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Calculate Break-Even ROAS</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter your product selling price</li>
                <li>Input cost of goods sold (COGS)</li>
                <li>Add any other variable costs (shipping, fees, etc.)</li>
                <li>View your break-even ROAS</li>
                <li>Set target ROAS above break-even for profitability</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our Break-Even ROAS Calculator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>Profitable Advertising:</strong> Know exactly when your ads are making money</li>
                <li><strong>Instant Results:</strong> Calculate break-even ROAS in real-time</li>
                <li><strong>Prevent Losses:</strong> Avoid spending more on ads than you earn</li>
                <li><strong>Campaign Planning:</strong> Set realistic ROAS targets for profitability</li>
                <li><strong>Budget Optimization:</strong> Allocate ad spend to profitable channels</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our ROAS Calculator</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Break-Even ROAS:</strong> Minimum ROAS needed to cover all costs</li>
                <li><strong>Profit Margin Consideration:</strong> Accounts for COGS and variable costs</li>
                <li><strong>Target ROAS Recommendations:</strong> Suggested profitable ROAS targets</li>
                <li><strong>Cost Breakdown:</strong> Clear visibility into all cost components</li>
                <li><strong>Campaign Profitability:</strong> Determine if ads are generating profit</li>
                <li><strong>Real-Time Calculations:</strong> Updates as you type</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding Break-Even ROAS</h3>
              <p className="text-muted-foreground">
                Return on Ad Spend (ROAS) measures how much revenue you generate for every dollar spent on advertising. Break-even ROAS is the minimum ROAS needed to cover all costs without losing money. It's calculated as: Selling Price ÷ (Selling Price - COGS - Variable Costs). For example, if you sell a product for $100 with $40 COGS and $10 in shipping/fees, your profit margin is $50 (50%). Your break-even ROAS is 2.0—meaning for every $1 spent on ads, you need $2 in revenue. A ROAS of 1.5 would lose money, while 3.0 would be profitable. Most successful e-commerce businesses target a ROAS of 3-4x or higher to cover fixed costs and generate profit. This calculator helps you set realistic advertising goals and avoid unprofitable campaigns.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for ROAS Calculation</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Ad Campaign Planning:</strong> Set ROAS targets before launching campaigns.</li>
                <li><strong>Budget Allocation:</strong> Prioritize ad spend on channels with best ROAS.</li>
                <li><strong>Performance Monitoring:</strong> Track if campaigns are meeting break-even thresholds.</li>
                <li><strong>Product Viability:</strong> Determine if a product can be profitably advertised.</li>
                <li><strong>Scaling Decisions:</strong> Know if you can afford to increase ad spend.</li>
                <li><strong>Channel Comparison:</strong> Compare ROAS across Facebook, Google, TikTok, etc.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All ROAS calculations are performed directly in your web browser. This means your business data never leaves your device and is never uploaded to our servers. You can use our tool with complete confidence, knowing your financial information remains private and secure throughout the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1010101010" />
          </div>
        </div>
      </div>

      <RelatedTools currentTool="/shopify-break-even-roas-calculator" />
    </div>
  );
}

