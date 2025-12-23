import { Metadata } from 'next';
import { Mail, MessageSquare, Github } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - PDF Tools',
  description: 'Get in touch with PDF Tools. We\'d love to hear from you!',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-8">Contact Us</h1>
      
      <div className="space-y-8">
        <section>
          <p className="text-xl text-muted-foreground">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
            <Mail className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Email Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              For general inquiries and support
            </p>
            <a 
              href="mailto:contact@pdftools.com" 
              className="text-primary hover:underline font-medium"
            >
              contact@pdftools.com
            </a>
          </div>

          <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
            <MessageSquare className="h-10 w-10 text-secondary mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Feedback</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Share your thoughts and suggestions
            </p>
            <a 
              href="mailto:feedback@pdftools.com" 
              className="text-secondary hover:underline font-medium"
            >
              feedback@pdftools.com
            </a>
          </div>

          <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
            <Github className="h-10 w-10 text-accent mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">GitHub</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Report bugs and contribute
            </p>
            <a 
              href="https://github.com/yourrepo" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-medium"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-bold text-foreground mb-2">How quickly will you respond?</h3>
              <p className="text-sm text-muted-foreground">
                We aim to respond to all inquiries within 24-48 hours.
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-bold text-foreground mb-2">Can I request new features?</h3>
              <p className="text-sm text-muted-foreground">
                Absolutely! We're always looking to improve our tools based on user feedback.
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-bold text-foreground mb-2">Do you offer business partnerships?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, we're open to partnerships. Please email us with your proposal.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

