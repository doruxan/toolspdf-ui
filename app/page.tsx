import ToolGrid from '@/components/layout/ToolGrid';
import AdBanner from '@/components/ads/AdBanner';
import { Shield, Zap, Lock } from 'lucide-react';
import StructuredData from '@/components/seo/StructuredData';
import { generateOrganizationSchema } from '@/lib/seo/schemas';

export default function Home() {
  const orgSchema = generateOrganizationSchema();

  return (
    <div className="w-full">
      <StructuredData data={orgSchema} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              Free Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">PDF Tools</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Merge, split, compress, and convert PDFs directly in your browser. 
              100% free, no limits, and your files never leave your device.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">100% Secure</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border">
                <Zap className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border">
                <Lock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Privacy First</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner - Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
        <AdBanner dataAdSlot="1234567890" dataAdFormat="horizontal" />
      </div>

      {/* Tools Grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">All PDF Tools</h2>
            <p className="text-lg text-muted-foreground">Choose a tool to get started - no registration required</p>
          </div>
          <ToolGrid />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose Our PDF Tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">100% Secure & Private</h3>
              <p className="text-muted-foreground">
                All processing happens in your browser. Your files never leave your device, ensuring complete privacy and security.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Lightning Fast</h3>
              <p className="text-muted-foreground">
                No uploads or downloads to servers. Process PDFs instantly with our optimized client-side technology.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Completely Free</h3>
              <p className="text-muted-foreground">
                No hidden fees, no subscriptions, no file size limits. All tools are 100% free to use, forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner - Footer */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
        <AdBanner dataAdSlot="0987654321" dataAdFormat="horizontal" />
      </div>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Are these PDF tools really free?</h3>
              <p className="text-muted-foreground">
                Yes! All our PDF tools are completely free to use with no hidden charges, subscriptions, or file size limits.
              </p>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Is it safe to use online PDF tools?</h3>
              <p className="text-muted-foreground">
                Absolutely! All processing happens directly in your browser. Your files never get uploaded to any server, ensuring complete privacy and security.
              </p>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Do I need to create an account?</h3>
              <p className="text-muted-foreground">
                No account needed! Simply select a tool, upload your file, and start processing immediately.
              </p>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">What file formats are supported?</h3>
              <p className="text-muted-foreground">
                We support PDF files for most tools, and JPG/PNG images for our conversion tools. All standard PDF formats are compatible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
