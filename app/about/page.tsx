import { Metadata } from 'next';
import { Shield, Zap, Lock, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - PDF Tools',
  description: 'Learn about PDF Tools - free, secure, and privacy-focused online PDF tools.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-8">About PDF Tools</h1>
      
      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <p className="text-xl text-muted-foreground">
            PDF Tools is a free, privacy-focused platform that provides essential PDF manipulation 
            tools directly in your browser. No uploads, no downloads, no compromises on your privacy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            We believe that everyone should have access to powerful PDF tools without sacrificing 
            their privacy or paying expensive subscription fees. Our mission is to provide free, 
            secure, and easy-to-use PDF tools that work entirely in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
              <Shield className="h-8 w-8 text-success flex-shrink-0" />
              <div>
                <h3 className="font-bold text-foreground mb-2">100% Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Your files never leave your device. All processing happens locally in your browser.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
              <Zap className="h-8 w-8 text-warning flex-shrink-0" />
              <div>
                <h3 className="font-bold text-foreground mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  No server uploads or downloads. Process files instantly with optimized algorithms.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
              <Lock className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-foreground mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  We don't store, track, or access your files. Your privacy is our top priority.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
              <Heart className="h-8 w-8 text-error flex-shrink-0" />
              <div>
                <h3 className="font-bold text-foreground mb-2">Completely Free</h3>
                <p className="text-sm text-muted-foreground">
                  No hidden fees, no subscriptions, no file limits. Free forever.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Our tools use modern web technologies (WebAssembly, JavaScript) to process PDFs entirely 
            in your browser. When you upload a file, it stays on your device and is processed using 
            your computer's resources. This ensures maximum privacy and security while providing 
            fast, reliable results.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Open Source</h2>
          <p className="text-muted-foreground">
            We believe in transparency. Our tools are built using open-source libraries including 
            pdf-lib, PDF.js, and jsPDF. This ensures that our code is auditable and trustworthy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            Have questions, suggestions, or feedback? We'd love to hear from you! 
            Visit our <a href="/contact" className="text-primary hover:underline">contact page</a> to get in touch.
          </p>
        </section>
      </div>
    </div>
  );
}

