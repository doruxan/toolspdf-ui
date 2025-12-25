'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 md:py-24 border-b-2 border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              RawTools
            </span>{' '}
            - Free Online Tools
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Professional PDF tools and Shopify calculators. 100% free, works in your browser, no signup required.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search for a tool..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border-2 border-border">
              <span className="text-2xl">🔒</span>
              <span className="text-sm font-medium text-foreground">100% Secure</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border-2 border-border">
              <span className="text-2xl">⚡</span>
              <span className="text-sm font-medium text-foreground">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border-2 border-border">
              <span className="text-2xl">🆓</span>
              <span className="text-sm font-medium text-foreground">Always Free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

