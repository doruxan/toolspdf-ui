import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { toolCategories, getCategoryByToolHref } from '@/config/tools';

interface RelatedToolsProps {
  currentTool: string; // href of current tool
}

export default function RelatedTools({ currentTool }: RelatedToolsProps) {
  // Find current tool's category
  const currentCategory = getCategoryByToolHref(currentTool);

  if (!currentCategory) return null;

  // Get 3 tools from same category (excluding current)
  const sameCategoryTools = currentCategory.tools
    .filter((tool) => tool.href !== currentTool)
    .slice(0, 3);

  // Get 2 tools from different category
  const otherCategory = toolCategories.find((cat) => cat.id !== currentCategory.id);
  const otherCategoryTools = otherCategory?.tools.slice(0, 2) || [];

  const relatedTools = [...sameCategoryTools, ...otherCategoryTools];

  return (
    <section className="py-12 border-t-2 border-border bg-gradient-to-br from-muted/20 to-muted/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Related Tools</h2>
          <p className="text-muted-foreground">Explore more tools to boost your productivity</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {relatedTools.map((tool) => {
            const IconComponent = (LucideIcons as any)[tool.icon] || LucideIcons.FileText;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-4 bg-background border-2 border-border rounded-lg hover:border-primary hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

