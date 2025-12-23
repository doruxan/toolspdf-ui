'use client';

import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export default function DownloadButton({
  onClick,
  disabled = false,
  label = 'Download PDF',
  className = '',
}: DownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:from-primary-dark hover:to-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${className}`}
    >
      <Download className="h-5 w-5" />
      {label}
    </button>
  );
}

