import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/tools/RelatedTools';
import { ReturnsCalculator } from '@/components/tools/ecommerce/ReturnsCalculator';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareAppSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
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

  const faqSchema = generateFAQSchema([
    {
      question: 'What is a normal return rate for e-commerce?',
      answer: 'Industry averages: apparel 20-30% (sizing issues, fit preferences), electronics 5-10% (defects, buyer remorse), home goods 5-15% (damage, expectations mismatch), footwear 25-35% (highest due to fit), beauty/cosmetics 5-10% (hygiene restrictions limit returns). If your store exceeds category norms by 5-10%, investigate root causes: inaccurate product descriptions, poor sizing guides, low-quality products, or inadequate photos. Track by product SKU to identify problematic items.'
    },
    {
      question: 'What are the hidden costs of processing returns?',
      answer: 'Beyond refund amount: return shipping ($7-15 per return), restocking labor ($5-10 per item), inspection/testing ($2-5), repackaging ($1-3), inventory shrinkage (10-20% of returns unsellable), payment processing fees (non-refundable), customer service time ($8-12 per interaction). Real example: $50 product return costs $15 shipping + $8 labor + $2 repackage + $1.75 payment fee = $26.75 (53% of product value). High return rates devastate profit margins. Aim to keep total return costs under 5% of revenue.'
    },
    {
      question: 'How can I reduce my return rate?',
      answer: 'Proven strategies: detailed product descriptions (measurements, materials, use cases), high-quality photos (6+ angles, zoom, lifestyle shots), size guides with fit charts, video demonstrations, customer reviews with photos, accurate color representation, clear shipping/delivery times, and realistic expectations. Fashion-specific: virtual try-on tools, fit quizzes. For high-return products, offer exchanges instead of refunds (keeps revenue). Track: reviews mentioning "not as expected" or "too small/large" indicate description/sizing problems.'
    },
    {
      question: 'Should I offer free returns?',
      answer: 'Depends on margin and competition. High-margin products (50%+ margin): free returns increase conversions 10-20% and customer trust, offsetting return costs. Low-margin products (< 30%): free returns destroy profitability. Compromise: offer store credit for free returns (keeps revenue), charge $5-10 restocking fee for refunds, or offer free returns over $100 order value (encourages larger orders). Test A/B: conversion rate increase vs return cost increase. Amazon trains customers to expect free returns; niche brands can educate on sustainability/cost.'
    },
    {
      question: 'How do returns affect inventory and forecasting?',
      answer: 'Returns create inventory volatility. Returned items: may be unsellable (damaged, worn), need cleaning/inspection (delays restocking), or are out-of-season (clearance pricing). Forecast demand accounting for returns: if you sell 100 units and 20% return, you effectively sold 80 units, but must stock 100+ to meet demand. Use Shopify apps (Loop Returns, Returnly) to track return reasons and timing. Seasonal spike: post-holiday returns (January) can flood warehouses; plan storage and labor capacity.'
    },
    {
      question: 'What return policies balance customer satisfaction and profitability?',
      answer: 'Balanced policies: 30-day return window (industry standard, reduces fraud vs 60-90 days), original condition required (prevents wear-and-return abuse), exchange preferred over refund (keeps revenue), customer pays return shipping for remorse, free shipping for defects/errors. Strict for final sale: clearance items, custom/personalized products, hygiene items (underwear, cosmetics). Communicate clearly: 50% of returns stem from misunderstood policies. Use apps like Returnly or AfterShip Returns to automate and streamline the process.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
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

