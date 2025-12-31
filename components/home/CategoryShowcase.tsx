import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { toolCategories } from '@/config/tools';
import ToolCard from './ToolCard';

export default function CategoryShowcase() {
  return (
    <div className="py-12">
      {toolCategories.map((category, index) => {
        // Get featured tools first
        const featuredTools = category.tools.filter((t) => t.featured);
        
        // If no featured tools, or fewer than 4, take the first 4 tools
        const toolsToShow = featuredTools.length > 0 
          ? featuredTools.slice(0, 4) 
          : category.tools.slice(0, 4);

        const isLastCategory = index === toolCategories.length - 1;

        return (
          <section 
            key={category.id} 
            className={`scroll-mt-16 ${!isLastCategory ? 'mb-8' : ''}`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <Link href={`/${category.id}`} className="group/title block">
                  <h2 className="text-3xl font-bold text-foreground mb-2 group-hover/title:text-primary transition-colors flex items-center gap-2">
                    {category.name}
                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-primary hidden md:block" />
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl group-hover/title:text-foreground/80 transition-colors">
                    {category.description}
                  </p>
                </Link>
                <Link 
                  href={`/${category.id}`}
                  className="group flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors whitespace-nowrap md:mb-1"
                >
                  View all {category.tools.length} tools
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {toolsToShow.map((tool) => (
                  <ToolCard key={tool.href} {...tool} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
