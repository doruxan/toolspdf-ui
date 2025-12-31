import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { ReturnsCalculator } from '@/components/tools/ecommerce/ReturnsCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema, generateHowToSchema } from '@/lib/seo/schemas';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { withCanonicalMetadata } from '@/lib/seo/metadata';

const pageMetadata: Metadata = {
  title: 'Return Impact Calculator - Analyze Return Impact | RawTools',
  description: 'Free return impact calculator. Analyze the impact of returns and refunds on profitability.',
  alternates: { canonical: 'https://rawtools.io/shopify-return-refund-impact-calculator' },
  openGraph: {
    title: 'Return Impact Calculator | RawTools',
    description: 'Analyze the impact of returns and refunds on your store profitability.',
    type: 'website',

    url: 'https://rawtools.io/shopify-return-refund-impact-calculator',
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
    title: 'Return Impact Calculator | RawTools',
    description: 'Analyze the impact of returns and refunds on your Shopify store profitability.',

    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/shopify-return-refund-impact-calculator');
}


export default function Page() {
  const toolSchema = generateSoftwareAppSchema({
    title: 'Return Impact Calculator',
    description: 'Analyze the impact of returns and refunds on profitability',
    href: '/shopify-return-refund-impact-calculator',
  });

  const howToSchema = generateHowToSchema({
    name: 'Return Impact Calculator',
    description: 'How to analyze the impact of returns and refunds on store profitability',
    url: 'https://rawtools.io/shopify-return-refund-impact-calculator',
  }, [
    'Enter your total revenue',
    'Input your return rate percentage',
    'Add processing cost per return (shipping, restocking, etc.)',
    'View total returns, processing costs, and net revenue impact',
    'Analyze how return rate changes affect profitability'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1111111112" className="mb-6" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs
              category="E-Commerce Tools"
              toolName="Return Impact Calculator"
              currentHref="/shopify-return-refund-impact-calculator"
            />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Return Impact Calculator</h1>
              <p className="text-muted-foreground">
                Analyze the impact of returns and refunds on your Shopify store profitability
              </p>
            </div>

            <ReturnsCalculator />

            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Calculate Return Impact</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter your total revenue</li>
                <li>Input your return rate percentage</li>
                <li>Add processing cost per return (shipping, restocking, etc.)</li>
                <li>View total returns, processing costs, and net revenue impact</li>
                <li>Analyze how return rate changes affect profitability</li>
              </ol>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Use Our Return Impact Calculator?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>100% Free:</strong> No hidden costs or subscriptions</li>
                <li><strong>True Cost Visibility:</strong> Understand the full financial impact of returns</li>
                <li><strong>Instant Analysis:</strong> Calculate return costs in real-time</li>
                <li><strong>Profitability Protection:</strong> Identify if returns are hurting your bottom line</li>
                <li><strong>Policy Planning:</strong> Make informed decisions about return policies</li>
                <li><strong>Cost Reduction:</strong> Find opportunities to minimize return-related losses</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Features of Our Return Calculator</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Total Return Value:</strong> Calculate revenue lost to returns</li>
                <li><strong>Processing Costs:</strong> Account for shipping, restocking, and handling</li>
                <li><strong>Net Revenue Impact:</strong> See actual profit after returns</li>
                <li><strong>Return Rate Analysis:</strong> Understand if your rate is healthy</li>
                <li><strong>Cost Per Return:</strong> Track all expenses associated with returns</li>
                <li><strong>Real-Time Calculations:</strong> Updates as you type</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Understanding Return Impact on Business</h3>
              <p className="text-muted-foreground">
                Returns significantly impact e-commerce profitability beyond just the refunded amount. When a customer returns a $100 item, you lose the $100 sale, plus you pay return shipping ($8), restocking labor ($5), and potential damage/wear ($10)—a total $123 loss. If your store has $50,000 monthly revenue with a 10% return rate, that's $5,000 in returns plus $1,150 in processing costs, reducing net revenue to $43,850. The average e-commerce return rate is 20-30% for apparel and 5-10% for other categories. High return rates signal product quality issues, inaccurate descriptions, or sizing problems. This calculator helps you quantify the true cost of returns and make strategic decisions about return policies, product descriptions, sizing guides, and quality control to protect profitability.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Common Use Cases for Return Analysis</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Policy Evaluation:</strong> Determine if your return policy is too lenient or strict.</li>
                <li><strong>Financial Planning:</strong> Forecast true net revenue accounting for returns.</li>
                <li><strong>Product Quality:</strong> Identify products with high return rates for improvement.</li>
                <li><strong>Pricing Strategy:</strong> Factor return costs into product pricing.</li>
                <li><strong>Restocking Fees:</strong> Calculate if restocking fees are justified.</li>
                <li><strong>Vendor Negotiation:</strong> Discuss return rates and quality with suppliers.</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy is our top priority. All return impact calculations are performed directly in your web browser. This means your business data never leaves your device and is never uploaded to our servers. You can use our tool with complete confidence, knowing your financial information remains private and secure throughout the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1212121212" />
          </div>
        </div>
      </div>

      <RelatedTools currentTool="/shopify-return-refund-impact-calculator" />
    </div>
  );
}

