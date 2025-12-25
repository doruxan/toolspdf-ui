import { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2.5 border-2 rounded-lg text-foreground bg-background
            placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            disabled:bg-muted disabled:cursor-not-allowed
            transition-all duration-200
            ${error ? 'border-error' : 'border-border hover:border-primary/50'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
        {helpText && !error && <p className="mt-1.5 text-sm text-muted-foreground">{helpText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

