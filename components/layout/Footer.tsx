import Link from 'next/link';
import { Wrench, Github, Twitter } from 'lucide-react';
import { toolCategories } from '@/config/tools';

export default function Footer() {
  const pdfTools = toolCategories.find((cat) => cat.id === 'pdf-tools')?.tools.slice(0, 5) || [];
  const jsonTools = toolCategories.find((cat) => cat.id === 'json-tools')?.tools.slice(0, 5) || [];
  const ecommerceTools =
    toolCategories.find((cat) => cat.id === 'ecommerce-tools')?.tools.slice(0, 5) || [];
  const ibanTools = toolCategories.find((cat) => cat.id === 'iban-tools')?.tools.slice(0, 5) || [];

  const legalLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="border-t-2 border-border bg-gradient-to-br from-muted/30 to-muted/10">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              <Wrench className="h-8 w-8 text-primary" />
              <span>RawTools</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free online PDF tools, JSON converters, IBAN validators, and Shopify calculators. Process files and convert data
              directly in your browser. Your data never leaves your device.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
                aria-label="Visit our GitHub repository"
              >
                <Github className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* PDF Tools */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">PDF Tools</h3>
            <ul className="space-y-2">
              {pdfTools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* JSON Tools */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">JSON Tools</h3>
            <ul className="space-y-2">
              {jsonTools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* E-Commerce Tools */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">Shopify Tools</h3>
            <ul className="space-y-2">
              {ecommerceTools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* IBAN Tools */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">IBAN Tools</h3>
            <ul className="space-y-2">
              {ibanTools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">Legal & Info</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t-2 border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} RawTools.io - All rights reserved. Made with ❤️ for
            privacy-conscious users.
          </p>
        </div>
      </div>
    </footer>
  );
}
