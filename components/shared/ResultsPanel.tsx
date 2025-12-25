export interface ResultItem {
  label: string;
  value: string | number;
  isHighlight?: boolean;
  helpText?: string;
}

export interface ResultsPanelProps {
  title?: string;
  results: ResultItem[];
  className?: string;
}

export function ResultsPanel({ title, results, className = '' }: ResultsPanelProps) {
  return (
    <div className={`bg-gradient-to-br from-muted to-muted/50 border-2 border-border rounded-xl p-6 ${className}`}>
      {title && <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>}
      <div className="space-y-3">
        {results.map((item, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-baseline ${
              item.isHighlight ? 'pb-3 border-b-2 border-primary' : ''
            }`}
          >
            <div className="flex flex-col">
              <span className={`text-sm ${item.isHighlight ? 'font-bold' : 'font-semibold'} text-foreground`}>
                {item.label}
              </span>
              {item.helpText && <span className="text-xs text-muted-foreground mt-0.5">{item.helpText}</span>}
            </div>
            <span
              className={`${
                item.isHighlight
                  ? 'text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
                  : 'text-lg font-semibold text-foreground'
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

