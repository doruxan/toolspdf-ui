import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
  id?: string;
}

export function Card({ children, title, description, footer, className = '', id }: CardProps) {
  return (
    <div
      id={id}
      className={`bg-background border-2 border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {(title || description) && (
        <div className="px-6 py-4 border-b-2 border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          {title && <h3 className="text-lg font-bold text-foreground">{title}</h3>}
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-muted border-t-2 border-border">
          {footer}
        </div>
      )}
    </div>
  );
}

