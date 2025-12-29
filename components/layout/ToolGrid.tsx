import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import type { ComponentType } from 'react';
import { getAllTools, getToolsByCategory } from '@/config/tools';

interface ToolGridProps {
  categoryId?: string;
}

export default function ToolGrid({ categoryId }: ToolGridProps) {
  const tools = categoryId ? getToolsByCategory(categoryId) : getAllTools();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => {
        type LucideIconName = keyof typeof LucideIcons;
        const iconKey = tool.icon as LucideIconName;
        const Icon = (iconKey in LucideIcons ? LucideIcons[iconKey] : LucideIcons.FileText) as
          | ComponentType<{ className?: string; width?: number; height?: number; 'aria-hidden'?: boolean }>
          | typeof LucideIcons.FileText;
        return (
          <Link
            key={tool.href}
            href={tool.href}
            className="group relative p-6 bg-background border-2 border-border rounded-xl hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 min-w-[3.5rem] min-h-[3.5rem] rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="h-7 w-7 text-white" width={28} height={28} aria-hidden={true} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-primary text-sm font-semibold">Try Now →</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

