import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - PDF Tools',
  description: 'Terms of service for PDF Tools. Read our terms and conditions.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
        <p className="text-foreground"><strong>Last Updated: December 22, 2025</strong></p>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using PDF Tools, you accept and agree to be bound by the terms and 
            conditions of this agreement. If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Use of Service</h2>
          <p>Our service is provided free of charge for personal and commercial use. You agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the service only for lawful purposes</li>
            <li>Not attempt to harm or disrupt the service</li>
            <li>Not use automated tools to access the service excessively</li>
            <li>Respect intellectual property rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">File Processing</h2>
          <p>
            All file processing occurs in your browser. We do not store, access, or transmit your files. 
            You are solely responsible for the content of files you process using our tools.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Intellectual Property</h2>
          <p>
            The service, including all content, features, and functionality, is owned by PDF Tools 
            and is protected by copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Disclaimer of Warranties</h2>
          <p>
            The service is provided "as is" without warranties of any kind, either express or implied. 
            We do not guarantee that the service will be uninterrupted, secure, or error-free.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Limitation of Liability</h2>
          <p>
            PDF Tools shall not be liable for any indirect, incidental, special, consequential, or 
            punitive damages resulting from your use of or inability to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Advertisements</h2>
          <p>
            Our service displays advertisements through Google AdSense. We are not responsible for 
            the content of advertisements or the practices of advertisers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective 
            immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with applicable laws, 
            without regard to conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact</h2>
          <p>
            For questions about these terms, please contact us at: 
            <a href="/contact" className="text-primary hover:underline ml-1">Contact Page</a>
          </p>
        </section>
      </div>
    </div>
  );
}

