'use client';

import Link from 'next/link';
import { Wrench, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { toolCategories } from '@/config/tools';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
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
        <div className="hidden xl:flex xl:gap-x-8 xl:items-center">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>

          {/* Tools Dropdown with Categories Only */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              Tools
              <ChevronDown className="h-4 w-4" />
            </button>
            {toolsDropdownOpen && (
              <div
                className="absolute left-0 top-full pt-2 w-64"
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <div className="bg-background border-2 border-border rounded-xl shadow-xl p-4 space-y-2">
                  {toolCategories.map((category) => {
                    const categoryLabel = category.name.replace(/^Free Online\s+/i, '').replace(/\s+Tools?$/i, '');
                    const href = isHomePage ? `#${category.id}` : `/#${category.id}`;
                    
                    return (
                      <Link
                        key={category.id}
                        href={href}
                        onClick={(e) => {
                          setToolsDropdownOpen(false);
                          if (isHomePage) {
                            e.preventDefault();
                            document.getElementById(category.id)?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start',
                            });
                          }
                        }}
                        className="block text-sm text-foreground hover:text-primary hover:bg-muted px-3 py-2.5 rounded-lg transition-colors font-medium"
                      >
                        {categoryLabel}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

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
          className="xl:hidden rounded-md p-3 text-foreground hover:bg-muted min-w-[44px] min-h-[44px] flex items-center justify-center"
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
        <div id="mobile-menu" className="xl:hidden border-t-2 border-border bg-background">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="border-t-2 border-border my-2"></div>
            <div className="text-xs font-bold text-muted-foreground uppercase px-3 py-2">
              Tool Categories
            </div>
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
