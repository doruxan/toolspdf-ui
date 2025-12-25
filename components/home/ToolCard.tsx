import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Tool } from '@/config/tools';

interface ToolCardProps extends Tool {}

export default function ToolCard({ title, href, icon, description, color }: ToolCardProps) {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.FileText;

  return (
    <Link
      href={href}
      className="group relative p-6 bg-background border-2 border-border rounded-xl hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-col gap-4">
        <div
          className={`w-14 h-14 min-w-[3.5rem] min-h-[3.5rem] rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          <IconComponent className="h-7 w-7 text-white" width={28} height={28} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-primary text-sm font-semibold">Try Now →</span>
      </div>
    </Link>
  );
}

