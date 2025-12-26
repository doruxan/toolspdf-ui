'use client';

import { useState, useCallback, useEffect } from 'react';
import { csvToJson, jsonToCsv, detectDelimiter } from '@/lib/json/csv-converter';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';
import { ArrowLeftRight } from 'lucide-react';

export default function CSVToJSON() {
  const [mode, setMode] = useState<'csv-to-json' | 'json-to-csv'>('csv-to-json');
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeaders, setHasHeaders] = useState(true);
  const [error, setError] = useState('');

  // Real-time conversion with debounce
  useEffect(() => {
    if (!inputData.trim()) {
      setOutputData('');
      setError('');
      return;
    }

    const timer = setTimeout(() => {
      try {
        if (mode === 'csv-to-json') {
          const result = csvToJson(inputData, {
            delimiter,
            hasHeaders,
            skipEmptyLines: true,
            trimFields: true,
          });

          if (result.success) {
            setOutputData(JSON.stringify(result.data, null, 2));
            setError('');
          } else {
            setError(result.error || 'Failed to convert CSV to JSON');
            setOutputData('');
          }
        } else {
          // JSON to CSV
          try {
            const jsonData = JSON.parse(inputData);
            const result = jsonToCsv(jsonData, {
              delimiter,
              hasHeaders,
            });

            if (result.success) {
              setOutputData(result.csv || '');
              setError('');
            } else {
              setError(result.error || 'Failed to convert JSON to CSV');
              setOutputData('');
            }
          } catch (e) {
            setError('Invalid JSON input');
            setOutputData('');
          }
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Conversion failed');
        setOutputData('');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputData, mode, delimiter, hasHeaders]);

  // Auto-detect delimiter when CSV is loaded
  const handleInputChange = useCallback((value: string) => {
    setInputData(value);
    if (mode === 'csv-to-json' && value.trim()) {
      const detected = detectDelimiter(value);
      setDelimiter(detected);
    }
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === 'csv-to-json' ? 'json-to-csv' : 'csv-to-json');
    setInputData(outputData);
    setOutputData('');
    setError('');
  };

  const handleClear = () => {
    setInputData('');
    setOutputData('');
    setError('');
  };

  return (
    <SideBySideLayout
      options={
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={mode === 'csv-to-json' ? 'primary' : 'secondary'}
              onClick={() => {
                setMode('csv-to-json');
                setInputData('');
                setOutputData('');
                setError('');
              }}
            >
              CSV → JSON
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleMode}
              title="Swap input and output"
              disabled={!outputData}
            >
              <ArrowLeftRight className="h-5 w-5" />
            </Button>
            <Button
              variant={mode === 'json-to-csv' ? 'primary' : 'secondary'}
              onClick={() => {
                setMode('json-to-csv');
                setInputData('');
                setOutputData('');
                setError('');
              }}
            >
              JSON → CSV
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <Select
              label="Delimiter"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              options={[
                { value: ',', label: 'Comma (,)' },
                { value: ';', label: 'Semicolon (;)' },
                { value: '\t', label: 'Tab' },
                { value: '|', label: 'Pipe (|)' },
              ]}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasHeaders"
                checked={hasHeaders}
                onChange={(e) => setHasHeaders(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="hasHeaders" className="text-sm font-medium">
                First row contains headers
              </label>
            </div>
          </div>
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputData}
          onChange={handleInputChange}
          label={mode === 'csv-to-json' ? 'CSV Input' : 'JSON Input'}
          placeholder={
            mode === 'csv-to-json'
              ? 'Paste your CSV data here or drag and drop a file...'
              : 'Paste your JSON array here or drag and drop a file...'
          }
          accept={mode === 'csv-to-json' ? '.csv,.txt' : '.json,.txt'}
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputData}
          onChange={() => {}}
          label={mode === 'csv-to-json' ? 'JSON Output' : 'CSV Output'}
          placeholder={`Converted ${mode === 'csv-to-json' ? 'JSON' : 'CSV'} will appear here...`}
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
