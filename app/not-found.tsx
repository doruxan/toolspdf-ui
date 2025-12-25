'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { toolCategories } from '@/config/tools';
import ToolCard from '@/components/home/ToolCard';
import { Search, Home } from 'lucide-react';

export default function NotFound() {
  const [search, setSearch] = useState('');

  // Get popular tools (first 8 tools across all categories)
  const popularTools = useMemo(() => {
    return toolCategories.flatMap((cat) => cat.tools).slice(0, 8);
  }, []);

  // Filter tools based on search
  const filteredTools = useMemo(() => {
    if (!search.trim()) return popularTools;

    const query = search.toLowerCase();
    return toolCategories
      .flatMap((cat) => cat.tools)
      .filter(
        (tool) =>
          tool.title.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [search, popularTools]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The page you're looking for doesn't exist. But don't worry, we have plenty of useful
            tools to help you!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search for a tool..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="pt-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            {search.trim() ? 'Search Results' : 'Popular Tools'}
          </h3>
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.href} {...tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No tools found matching "{search}"</p>
              <button
                onClick={() => setSearch('')}
                className="text-primary hover:underline font-semibold"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Home Link */}
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <Home className="h-5 w-5" />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

