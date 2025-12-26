'use client';

import { useState, useCallback, useEffect } from 'react';
import { minifyJson } from '@/lib/json/formatter';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';

export default function JSONMinifier() {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<{
    originalSize: number;
    minifiedSize: number;
    reduction: number;
  } | null>(null);

  // Real-time minification
  useEffect(() => {
    if (!inputData.trim()) {
      setOutputData('');
      setError('');
      setStats(null);
      return;
    }

    const timer = setTimeout(() => {
      const result = minifyJson(inputData);

      if (result.success) {
        const minified = result.formatted || '';
        setOutputData(minified);
        setError('');
        
        const originalSize = new Blob([inputData]).size;
        const minifiedSize = new Blob([minified]).size;
        const reduction = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;

        setStats({
          originalSize,
          minifiedSize,
          reduction,
        });
      } else {
        setError(result.error || 'Failed to minify JSON');
        setOutputData('');
        setStats(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputData]);

  const handleClear = () => {
    setInputData('');
    setOutputData('');
    setError('');
    setStats(null);
  };

  return (
    <SideBySideLayout
      options={
        stats && (
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Original Size</p>
              <p className="text-lg font-semibold">{(stats.originalSize / 1024).toFixed(2)} KB</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Minified Size</p>
              <p className="text-lg font-semibold">{(stats.minifiedSize / 1024).toFixed(2)} KB</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reduction</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                {stats.reduction.toFixed(1)}%
              </p>
            </div>
          </div>
        )
      }
      leftPanel={
        <JSONTextarea
          value={inputData}
          onChange={setInputData}
          label="Formatted JSON Input"
          placeholder="Paste your formatted JSON here or drag and drop a file..."
          accept=".json,.txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputData}
          onChange={() => {}}
          label="Minified JSON Output"
          placeholder="Minified JSON will appear here..."
          readOnly
          minHeight="min-h-96"
        />
      }
      actions={
        <div className="flex flex-wrap gap-4">
          {error && (
            <div className="flex-1 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}
          <Button 
            variant="secondary" 
            onClick={() => navigator.clipboard.writeText(outputData)}
            disabled={!outputData}
          >
            Copy Output
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      }
    />
  );
}
