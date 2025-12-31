import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { toolCategories } from '@/config/tools';

export default function Footer() {
  const legalLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const categoryColumns = toolCategories.map((category) => {
    const title = category.name
      .replace(/^Free Online\s+/i, '')
      .replace(/\s+Tools?$/i, ' Tools');

    return {
      id: category.id,
      title,
      tools: category.tools.slice(0, 5),
    };
  });

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
              Free online PDF tools, JSON converters, IBAN validators, Shopify calculators, and String manipulation tools. Process files and convert data
              directly in your browser. Your data never leaves your device.
            </p>
          </div>

          {/* Tool Categories (dynamic, config-driven) */}
          {categoryColumns.map((col) => (
            <div key={col.id}>
              <h3 className="text-sm font-bold text-foreground mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.tools.map((tool) => (
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
          ))}

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
