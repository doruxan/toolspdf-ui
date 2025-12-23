import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - PDF Tools',
  description: 'Privacy policy for PDF Tools. Learn how we protect your data and privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
        <p className="text-foreground"><strong>Last Updated: December 22, 2025</strong></p>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Introduction</h2>
          <p>
            Welcome to PDF Tools. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we handle your information when you use our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Data Collection</h2>
          <p>
            <strong>Files You Upload:</strong> All PDF and image files you upload are processed entirely in your browser. 
            Your files NEVER leave your device and are NEVER uploaded to our servers. We have no access to your files.
          </p>
          <p>
            <strong>Analytics Data:</strong> We use Google Analytics to collect anonymous usage data including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pages visited</li>
            <li>Time spent on site</li>
            <li>Browser type and version</li>
            <li>Device type</li>
            <li>Geographic location (country/city level)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Cookies</h2>
          <p>We use cookies for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google Analytics:</strong> To understand how visitors use our site</li>
            <li><strong>Google AdSense:</strong> To display relevant advertisements</li>
            <li><strong>Cookie Consent:</strong> To remember your cookie preferences</li>
          </ul>
          <p>You can disable cookies in your browser settings, but this may affect site functionality.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google Analytics:</strong> For website analytics</li>
            <li><strong>Google AdSense:</strong> For displaying advertisements</li>
          </ul>
          <p>These services may collect data as described in their respective privacy policies.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of analytics tracking</li>
            <li>Disable cookies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Data Security</h2>
          <p>
            Since all file processing happens in your browser, your files never leave your device. 
            This ensures maximum security and privacy for your sensitive documents.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our service is not directed to children under 13. We do not knowingly collect personal 
            information from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this page 
            with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us at: 
            <a href="/contact" className="text-primary hover:underline ml-1">Contact Page</a>
          </p>
        </section>
      </div>
    </div>
  );
}

