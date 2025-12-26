'use client';

import Link from 'next/link';
import { Wrench, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { toolCategories } from '@/config/tools';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          aria-label="RawTools Home"
        >
          <Wrench className="h-8 w-8 text-primary" aria-hidden="true" />
          <span className="hidden sm:inline">RawTools</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-6 lg:items-center">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>

          {/* Category Links */}
          {toolCategories.map((category) => {
            const categoryLabel = category.name.replace(/^Free Online\s+/i, '').replace(/\s+Tools?$/i, '');
            const href = isHomePage ? `#${category.id}` : `/#${category.id}`;
            
            return (
              <Link
                key={category.id}
                href={href}
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    document.getElementById(category.id)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                }}
                className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              >
                {categoryLabel}
              </Link>
            );
          })}

          <Link
            href="/blog"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden rounded-md p-3 text-foreground hover:bg-muted min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t-2 border-border bg-background">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="border-t-2 border-border my-2"></div>
            {toolCategories.map((category) => {
              const categoryLabel = category.name.replace(/^Free Online\s+/i, '').replace(/\s+Tools?$/i, '');
              const href = isHomePage ? `#${category.id}` : `/#${category.id}`;
              
              return (
                <Link
                  key={category.id}
                  href={href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (isHomePage) {
                      e.preventDefault();
                      setTimeout(() => {
                        document.getElementById(category.id)?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }, 100);
                    }
                  }}
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted min-h-[44px] flex items-center"
                >
                  {categoryLabel}
                </Link>
              );
            })}
            <div className="border-t-2 border-border my-2"></div>
            <Link
              href="/blog"
              className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
