import Link from 'next/link';
import { FileText, Github, Twitter } from 'lucide-react';

const toolLinks = [
  { name: 'Merge PDF', href: '/merge-pdf' },
  { name: 'Split PDF', href: '/split-pdf' },
  { name: 'Compress PDF', href: '/compress-pdf' },
  { name: 'PDF to JPG', href: '/pdf-to-jpg' },
  { name: 'JPG to PDF', href: '/jpg-to-pdf' },
];

const moreTools = [
  { name: 'Rotate PDF', href: '/rotate-pdf' },
  { name: 'Unlock PDF', href: '/unlock-pdf' },
  { name: 'Protect PDF', href: '/protect-pdf' },
  { name: 'Watermark PDF', href: '/watermark-pdf' },
];

const legalLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
              <FileText className="h-8 w-8" />
              <span>PDF Tools</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free online PDF tools. Merge, split, compress, and convert PDFs directly in your browser. 
              Your files never leave your device.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Visit our GitHub repository"
              >
                <Github className="h-6 w-6" aria-hidden="true" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">More Tools</h3>
            <ul className="space-y-2">
              {moreTools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal & Info</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PDF Tools. All rights reserved. Made with ❤️ for privacy-conscious users.
          </p>
        </div>
      </div>
    </footer>
  );
}

