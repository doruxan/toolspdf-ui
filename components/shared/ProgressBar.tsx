'use client';

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export default function ProgressBar({ progress, label, className = '' }: ProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

