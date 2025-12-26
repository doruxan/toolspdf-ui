'use client';

import { ReactNode } from 'react';

export interface SideBySideLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  options?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function SideBySideLayout({
  leftPanel,
  rightPanel,
  options,
  actions,
  className = '',
}: SideBySideLayoutProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Options/Controls Section */}
      {options && (
        <div className="w-full">
          {options}
        </div>
      )}

      {/* Side-by-side panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          {leftPanel}
        </div>
        <div className="w-full">
          {rightPanel}
        </div>
      </div>

      {/* Actions Section */}
      {actions && (
        <div className="w-full">
          {actions}
        </div>
      )}
    </div>
  );
}

