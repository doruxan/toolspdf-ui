'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import ToolCard from './ToolCard';
import { toolCategories, ToolCategory } from '@/config/tools';

export default function ClientSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tools based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return null;
    }

    const query = searchQuery.toLowerCase();
    return toolCategories
      .map((category) => ({
        ...category,
        tools: category.tools.filter(
          (tool) =>
            tool.title.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.tools.length > 0);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto pt-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="search"
            aria-label="Search tools"
            placeholder="Search for a tool..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
        </div>
      </div>

      {/* Search Results */}
      {filteredCategories && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-lg text-muted-foreground">
                Found {filteredCategories.reduce((acc, cat) => acc + cat.tools.length, 0)} tools
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.flatMap((category) =>
                category.tools.map((tool) => <ToolCard key={tool.href} {...tool} />)
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

