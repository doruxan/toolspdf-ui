'use client';

import { useState, useCallback } from 'react';
import { csvToJson, jsonToCsv, detectDelimiter } from '@/lib/json/csv-converter';
import FileUpload from '@/components/shared/FileUpload';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Alert } from '@/components/shared/Alert';
import { ArrowLeftRight } from 'lucide-react';

export default function CSVToJSON() {
  const [mode, setMode] = useState<'csv-to-json' | 'json-to-csv'>('csv-to-json');
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeaders, setHasHeaders] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    const text = await file.text();
    setInputData(text);
    
    // Auto-detect delimiter for CSV files
    if (mode === 'csv-to-json') {
      const detected = detectDelimiter(text);
      setDelimiter(detected);
    }
  }, [mode]);

  const handleConvert = useCallback(() => {
    setError('');
    setProcessing(true);

    try {
      if (!inputData.trim()) {
        setError('Please provide input data');
        setProcessing(false);
        return;
      }

      if (mode === 'csv-to-json') {
        const result = csvToJson(inputData, {
          delimiter,
          hasHeaders,
          skipEmptyLines: true,
          trimFields: true,
        });

        if (!result.success) {
          setError(result.error || 'Failed to convert CSV to JSON');
          setProcessing(false);
          return;
        }

        setOutputData(JSON.stringify(result.data, null, 2));
      } else {
        // JSON to CSV
        let jsonData;
        try {
          jsonData = JSON.parse(inputData);
        } catch (e) {
          setError('Invalid JSON input');
          setProcessing(false);
          return;
        }

        const result = jsonToCsv(jsonData, {
          delimiter,
          hasHeaders,
        });

        if (!result.success) {
          setError(result.error || 'Failed to convert JSON to CSV');
          setProcessing(false);
          return;
        }

        setOutputData(result.csv || '');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
    } finally {
      setProcessing(false);
    }
  }, [inputData, mode, delimiter, hasHeaders]);

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
    <div className="space-y-6">
      {/* Mode Toggle */}
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
          CSV to JSON
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMode}
          title="Swap input and output"
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
          JSON to CSV
        </Button>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* File Upload */}
      <FileUpload
        accept={mode === 'csv-to-json' ? '.csv,.txt' : '.json,.txt'}
        onFilesSelected={handleFileUpload}
        label={mode === 'csv-to-json' ? 'Upload CSV file' : 'Upload JSON file'}
      />

      {/* Input Area */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {mode === 'csv-to-json' ? 'CSV Input' : 'JSON Input'}
        </label>
        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder={
            mode === 'csv-to-json'
              ? 'Paste your CSV data here...'
              : 'Paste your JSON array here...'
          }
          className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
          spellCheck={false}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={handleConvert} disabled={processing || !inputData.trim()}>
          {processing ? 'Converting...' : `Convert to ${mode === 'csv-to-json' ? 'JSON' : 'CSV'}`}
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {/* Error */}
      {error && <Alert variant="error">{error}</Alert>}

      {/* Output */}
      {outputData && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">
              {mode === 'csv-to-json' ? 'JSON Output' : 'CSV Output'}
            </label>
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

