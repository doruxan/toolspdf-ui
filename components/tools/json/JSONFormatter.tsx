'use client';

import { useState, useCallback, useEffect } from 'react';
import { formatJson, validateJson, sortJsonKeys } from '@/lib/json/formatter';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';
import { Check, X } from 'lucide-react';

export default function JSONFormatter() {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [useTabs, setUseTabs] = useState(false);
  const [validation, setValidation] = useState<{
    isValid: boolean;
    error?: string;
    errorPosition?: { line: number; column: number };
  } | null>(null);

  // Real-time formatting with debounce
  useEffect(() => {
    if (!inputData.trim()) {
      setOutputData('');
      setValidation(null);
      return;
    }

    const timer = setTimeout(() => {
      const result = formatJson(inputData, { indentSize, useTabs });
      
      if (result.success) {
        setOutputData(result.formatted || '');
        setValidation({ isValid: true });
      } else {
        setValidation({
          isValid: false,
          error: result.error,
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputData, indentSize, useTabs]);

  const handleSortKeys = useCallback(() => {
    const result = sortJsonKeys(inputData);
    
    if (result.success) {
      setOutputData(result.formatted || '');
      setValidation({ isValid: true });
    } else {
      setValidation({
        isValid: false,
        error: result.error,
      });
    }
  }, [inputData]);

  const handleClear = () => {
    setInputData('');
    setOutputData('');
    setValidation(null);
  };

  return (
    <SideBySideLayout
      options={
        <div className="flex flex-wrap items-center gap-4">
          <Select
            label="Indentation"
            value={indentSize.toString()}
            onChange={(e) => setIndentSize(parseInt(e.target.value))}
            options={[
              { value: '2', label: '2 spaces' },
              { value: '4', label: '4 spaces' },
              { value: '8', label: '8 spaces' },
            ]}
            disabled={useTabs}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="useTabs"
              checked={useTabs}
              onChange={(e) => setUseTabs(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="useTabs" className="text-sm font-medium">
              Use tabs
            </label>
          </div>
          
          {validation && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              validation.isValid 
                ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
            }`}>
              {validation.isValid ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Valid</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4" />
                  <span>Invalid</span>
                </>
              )}
            </div>
          )}
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputData}
          onChange={setInputData}
          label="Raw JSON Input"
          placeholder="Paste your JSON here or drag and drop a file..."
          accept=".json,.txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputData}
          onChange={() => {}}
          label="Formatted JSON Output"
          placeholder="Formatted JSON will appear here..."
          readOnly
          minHeight="min-h-96"
        />
      }
      actions={
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleSortKeys} disabled={!inputData.trim()} variant="secondary">
            Sort Keys
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
