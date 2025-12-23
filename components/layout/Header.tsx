'use client';

import Link from 'next/link';
import { FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';

const tools = [
  { name: 'Merge PDF', href: '/merge-pdf' },
  { name: 'Split PDF', href: '/split-pdf' },
  { name: 'Compress PDF', href: '/compress-pdf' },
  { name: 'PDF to JPG', href: '/pdf-to-jpg' },
  { name: 'JPG to PDF', href: '/jpg-to-pdf' },
  { name: 'Rotate PDF', href: '/rotate-pdf' },
  { name: 'Unlock PDF', href: '/unlock-pdf' },
  { name: 'Protect PDF', href: '/protect-pdf' },
  { name: 'Watermark PDF', href: '/watermark-pdf' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary-dark">
          <FileText className="h-8 w-8" />
          <span className="hidden sm:inline">PDF Tools</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          <Link href="/" className="text-sm font-semibold leading-6 text-foreground hover:text-primary">
            All Tools
          </Link>
          <Link href="/blog" className="text-sm font-semibold leading-6 text-foreground hover:text-primary">
            Blog
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden rounded-md p-2 text-foreground hover:bg-muted"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Tools
            </Link>
            <Link
              href="/blog"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="border-t border-border my-2"></div>
            <div className="text-xs font-semibold text-muted-foreground px-3 py-2">Quick Access</div>
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

