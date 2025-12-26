'use client';

import { useState, useCallback } from 'react';
import { formatJson, validateJson, sortJsonKeys } from '@/lib/json/formatter';
import FileUpload from '@/components/shared/FileUpload';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';
import { Alert } from '@/components/shared/Alert';
import { Check, X, AlertCircle } from 'lucide-react';

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
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    const text = await file.text();
    setInputData(text);
    setOutputData('');
    setValidation(null);
  }, []);

  const handleValidate = useCallback(() => {
    const result = validateJson(inputData);
    setValidation(result);
  }, [inputData]);

  const handleFormat = useCallback(() => {
    setProcessing(true);
    setValidation(null);

    try {
      const result = formatJson(inputData, { indentSize, useTabs });

      if (!result.success) {
        setValidation({
          isValid: false,
          error: result.error,
        });
        setProcessing(false);
        return;
      }

      setOutputData(result.formatted || '');
      setValidation({ isValid: true });
    } catch (e) {
      setValidation({
        isValid: false,
        error: e instanceof Error ? e.message : 'Format failed',
      });
    } finally {
      setProcessing(false);
    }
  }, [inputData, indentSize, useTabs]);

  const handleSortKeys = useCallback(() => {
    setProcessing(true);
    setValidation(null);

    try {
      const result = sortJsonKeys(inputData);

      if (!result.success) {
        setValidation({
          isValid: false,
          error: result.error,
        });
        setProcessing(false);
        return;
      }

      setOutputData(result.formatted || '');
      setValidation({ isValid: true });
    } catch (e) {
      setValidation({
        isValid: false,
        error: e instanceof Error ? e.message : 'Sort failed',
      });
    } finally {
      setProcessing(false);
    }
  }, [inputData]);

  const handleClear = () => {
    setInputData('');
    setOutputData('');
    setValidation(null);
  };

  const handleCopy = () => {
    if (outputData) {
      navigator.clipboard.writeText(outputData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            Use tabs instead of spaces
          </label>
        </div>
      </div>

      {/* File Upload */}
      <FileUpload
        accept=".json,.txt"
        onFilesSelected={handleFileUpload}
        label="Upload JSON file"
      />

      {/* Input Area */}
      <div>
        <label className="block text-sm font-medium mb-2">JSON Input</label>
        <textarea
          value={inputData}
          onChange={(e) => {
            setInputData(e.target.value);
            setValidation(null);
            setOutputData('');
          }}
          placeholder="Paste your JSON here..."
          className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
          spellCheck={false}
        />
      </div>

      {/* Validation Status */}
      {validation && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          validation.isValid ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
        }`}>
          {validation.isValid ? (
            <>
              <Check className="h-5 w-5" />
              <span className="font-medium">Valid JSON</span>
            </>
          ) : (
            <>
              <X className="h-5 w-5" />
              <div>
                <span className="font-medium">Invalid JSON</span>
                {validation.error && (
                  <p className="text-sm mt-1">{validation.error}</p>
                )}
                {validation.errorPosition && (
                  <p className="text-sm mt-1">
                    Line {validation.errorPosition.line}, Column {validation.errorPosition.column}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleValidate} disabled={!inputData.trim()} variant="secondary">
          Validate
        </Button>
        <Button onClick={handleFormat} disabled={processing || !inputData.trim()}>
          {processing ? 'Formatting...' : 'Format & Beautify'}
        </Button>
        <Button onClick={handleSortKeys} disabled={processing || !inputData.trim()} variant="secondary">
          Sort Keys
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {/* Output */}
      {outputData && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Formatted JSON</label>
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

