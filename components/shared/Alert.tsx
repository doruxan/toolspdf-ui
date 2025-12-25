import { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  className?: string;
}

export function Alert({ children, variant = 'info', title, className = '' }: AlertProps) {
  const variantConfig = {
    info: {
      icon: Info,
      classes: 'bg-primary/10 text-primary border-primary/20',
    },
    success: {
      icon: CheckCircle,
      classes: 'bg-success/10 text-success border-success/20',
    },
    warning: {
      icon: AlertTriangle,
      classes: 'bg-warning/10 text-warning border-warning/20',
    },
    error: {
      icon: AlertCircle,
      classes: 'bg-error/10 text-error border-error/20',
    },
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${config.classes} ${className}`}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}

