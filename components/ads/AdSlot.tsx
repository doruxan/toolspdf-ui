interface AdSlotProps {
  format?: '728x90' | '300x250' | '336x280';
  className?: string;
}

export default function AdSlot({ format = '300x250', className = '' }: AdSlotProps) {
  const dimensions = {
    '728x90': { width: 'w-[728px]', height: 'h-[90px]', label: 'Leaderboard' },
    '300x250': { width: 'w-[300px]', height: 'h-[250px]', label: 'Medium Rectangle' },
    '336x280': { width: 'w-[336px]', height: 'h-[280px]', label: 'Large Rectangle' },
  };

  const { width, height, label } = dimensions[format];

  return (
    <div
      className={`${width} ${height} max-w-full bg-muted border-2 border-border rounded-lg flex flex-col items-center justify-center ${className}`}
      role="region"
      aria-label="Advertisement"
    >
      <span className="text-muted-foreground text-sm font-medium">Ad</span>
      <span className="text-muted-foreground text-xs mt-1">{label}</span>
    </div>
  );
}

