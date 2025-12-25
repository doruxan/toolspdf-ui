import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-gradient-to-br from-primary to-primary-dark text-white hover:shadow-lg hover:-translate-y-0.5 focus:ring-2 focus:ring-primary',
    secondary:
      'bg-background text-foreground border-2 border-border hover:border-primary hover:shadow-md focus:ring-2 focus:ring-primary',
    ghost: 'bg-transparent text-foreground hover:bg-muted focus:ring-2 focus:ring-primary',
    danger:
      'bg-gradient-to-br from-error to-error/90 text-white hover:shadow-lg hover:-translate-y-0.5 focus:ring-2 focus:ring-error',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

