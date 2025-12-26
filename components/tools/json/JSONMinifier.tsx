'use client';

import { useState, useCallback } from 'react';
import { minifyJson, validateJson } from '@/lib/json/formatter';
import FileUpload from '@/components/shared/FileUpload';
import { Button } from '@/components/shared/Button';
import { Alert } from '@/components/shared/Alert';

export default function JSONMinifier() {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<{
    originalSize: number;
    minifiedSize: number;
    reduction: number;
  } | null>(null);

  const handleFileUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    const text = await file.text();
    setInputData(text);
    setOutputData('');
    setError('');
    setStats(null);
  }, []);

  const handleMinify = useCallback(() => {
    setError('');
    setStats(null);

    try {
      if (!inputData.trim()) {
        setError('Please provide JSON input');
        return;
      }

      const result = minifyJson(inputData);

      if (!result.success) {
        setError(result.error || 'Failed to minify JSON');
        return;
      }

      const originalSize = new Blob([inputData]).size;
      const minifiedSize = new Blob([result.formatted || '']).size;
      const reduction = ((originalSize - minifiedSize) / originalSize) * 100;

      setOutputData(result.formatted || '');
      setStats({
        originalSize,
        minifiedSize,
        reduction,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Minification failed');
    }
  }, [inputData]);

  const handleClear = () => {
    setInputData('');
    setOutputData('');
    setError('');
    setStats(null);
  };

  return (
    <div className="space-y-6">
      <FileUpload
        accept=".json,.txt"
        onFilesSelected={handleFileUpload}
        label="Upload JSON file"
      />

      <div>
        <label className="block text-sm font-medium mb-2">JSON Input</label>
        <textarea
          value={inputData}
          onChange={(e) => {
            setInputData(e.target.value);
            setError('');
            setStats(null);
          }}
          placeholder="Paste your formatted JSON here..."
          className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={handleMinify} disabled={!inputData.trim()}>
          Minify JSON
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      {stats && (
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
            <p className="text-lg font-semibold text-green-600">{stats.reduction.toFixed(1)}%</p>
          </div>
        </div>
      )}

      {outputData && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Minified JSON</label>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigator.clipboard.writeText(outputData)}
            >
              Copy to Clipboard
            </Button>
          </div>
          <textarea
            value={outputData}
            readOnly
            className="w-full h-64 p-4 border rounded-lg font-mono text-sm bg-muted"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}

