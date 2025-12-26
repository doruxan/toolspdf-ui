'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  escapeJson,
  unescapeJson,
  encodeBase64,
  decodeBase64,
  encodeUrl,
  decodeUrl,
} from '@/lib/json/escape';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';
import { ArrowLeftRight } from 'lucide-react';

type Operation = 'escape' | 'unescape' | 'base64-encode' | 'base64-decode' | 'url-encode' | 'url-decode';

export default function JSONEscape() {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [operation, setOperation] = useState<Operation>('escape');
  const [error, setError] = useState('');

  // Real-time transformation
  useEffect(() => {
    if (!inputData.trim()) {
      setOutputData('');
      setError('');
      return;
    }

    const timer = setTimeout(() => {
      let result;
      switch (operation) {
        case 'escape':
          result = escapeJson(inputData);
          break;
        case 'unescape':
          result = unescapeJson(inputData);
          break;
        case 'base64-encode':
          result = encodeBase64(inputData);
          break;
        case 'base64-decode':
          result = decodeBase64(inputData);
          break;
        case 'url-encode':
          result = encodeUrl(inputData);
          break;
        case 'url-decode':
          result = decodeUrl(inputData);
          break;
      }

      if (result.success) {
        setOutputData(result.result || '');
        setError('');
      } else {
        setError(result.error || 'Operation failed');
        setOutputData('');
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [inputData, operation]);

  const handleSwap = () => {
    setInputData(outputData);
    setOutputData('');
    
    // Auto-switch operation
    const swapMap: Record<Operation, Operation> = {
      'escape': 'unescape',
      'unescape': 'escape',
      'base64-encode': 'base64-decode',
      'base64-decode': 'base64-encode',
      'url-encode': 'url-decode',
      'url-decode': 'url-encode',
    };
    setOperation(swapMap[operation]);
  };

  const handleClear = () => {
    setInputData('');
    setOutputData('');
    setError('');
  };

  return (
    <SideBySideLayout
      options={
        <div className="flex flex-wrap items-center gap-4">
          <Select
            label="Operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value as Operation)}
            options={[
              { value: 'escape', label: 'Escape JSON' },
              { value: 'unescape', label: 'Unescape JSON' },
              { value: 'base64-encode', label: 'Base64 Encode' },
              { value: 'base64-decode', label: 'Base64 Decode' },
              { value: 'url-encode', label: 'URL Encode' },
              { value: 'url-decode', label: 'URL Decode' },
            ]}
          />
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputData}
          onChange={setInputData}
          label="Input"
          placeholder={`Enter text to ${operation}...`}
          accept=".json,.txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputData}
          onChange={() => {}}
          label="Output"
          placeholder="Transformed text will appear here..."
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
          <Button variant="secondary" onClick={handleSwap} disabled={!outputData}>
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Swap & Reverse
          </Button>
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
