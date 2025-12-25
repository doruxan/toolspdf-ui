import { Button } from './Button';
import { Download, FileJson, Printer } from 'lucide-react';

interface ExportButtonsProps {
  onExportCSV?: () => void;
  onExportJSON?: () => void;
  onPrint?: () => void;
  className?: string;
}

export function ExportButtons({
  onExportCSV,
  onExportJSON,
  onPrint,
  className = '',
}: ExportButtonsProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {onExportCSV && (
        <Button
          variant="secondary"
          onClick={onExportCSV}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      )}
      {onExportJSON && (
        <Button
          variant="secondary"
          onClick={onExportJSON}
          className="flex items-center gap-2"
        >
          <FileJson className="h-4 w-4" />
          Export JSON
        </Button>
      )}
      {onPrint && (
        <Button
          variant="secondary"
          onClick={onPrint}
          className="flex items-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Print PDF
        </Button>
      )}
    </div>
  );
}

