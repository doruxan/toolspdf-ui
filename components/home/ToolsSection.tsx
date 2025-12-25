import { ToolCategory } from '@/config/tools';
import ToolCard from './ToolCard';

interface ToolsSectionProps {
  category: ToolCategory;
}

export default function ToolsSection({ category }: ToolsSectionProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{category.name}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{category.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}

