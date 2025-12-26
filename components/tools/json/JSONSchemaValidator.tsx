'use client';

import { useState, useCallback, useEffect } from 'react';
import { validateJsonSchema, generateSchemaFromJson } from '@/lib/json/validator';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Check, X } from 'lucide-react';

export default function JSONSchemaValidator() {
  const [jsonData, setJsonData] = useState('');
  const [schemaData, setSchemaData] = useState('');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [error, setError] = useState('');

  // Real-time validation with debounce
  useEffect(() => {
    if (!jsonData.trim() || !schemaData.trim()) {
      setValidationResult(null);
      setError('');
      return;
    }

    const timer = setTimeout(() => {
      try {
        const data = JSON.parse(jsonData);
        const schema = JSON.parse(schemaData);
        
        const result = validateJsonSchema(data, schema);
        setValidationResult(result);
        setError('');
      } catch (e) {
        if (!jsonData.trim() || !schemaData.trim()) {
          setError('');
        } else {
          setError('Invalid JSON in data or schema');
        }
        setValidationResult(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [jsonData, schemaData]);

  const handleGenerateSchema = useCallback(() => {
    if (!jsonData.trim()) {
      setError('JSON data is required to generate schema');
      return;
    }

    try {
      const data = JSON.parse(jsonData);
      const schema = generateSchemaFromJson(data);
      setSchemaData(JSON.stringify(schema, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JSON data');
    }
  }, [jsonData]);

  const handleClear = () => {
    setJsonData('');
    setSchemaData('');
    setValidationResult(null);
    setError('');
  };

  return (
    <div className="space-y-6">
      <SideBySideLayout
        leftPanel={
          <div>
            <div className="flex items-center justify-between mb-2 min-h-[36px]">
              <label className="block text-sm font-medium">JSON Data</label>
            </div>
            <JSONTextarea
              value={jsonData}
              onChange={setJsonData}
              placeholder="Paste your JSON data here or drag and drop a file..."
              accept=".json,.txt"
              minHeight="min-h-96"
            />
          </div>
        }
        rightPanel={
          <div>
            <div className="flex items-center justify-between mb-2 min-h-[36px]">
              <label className="block text-sm font-medium">JSON Schema</label>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleGenerateSchema}
                disabled={!jsonData.trim()}
              >
                Generate from Data
              </Button>
            </div>
            <JSONTextarea
              value={schemaData}
              onChange={setSchemaData}
              placeholder="Paste your JSON schema here or drag and drop a file..."
              accept=".json,.txt"
              minHeight="min-h-96"
            />
          </div>
        }
        actions={
          <div className="flex flex-wrap gap-4">
            {error && (
              <div className="flex-1 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg text-sm">
                {error}
              </div>
            )}
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        }
      />

      {validationResult && (
        <div
          className={`p-6 rounded-lg border-2 ${
            validationResult.isValid
              ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
              : 'bg-red-50 dark:bg-red-900/20 border-red-500'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            {validationResult.isValid ? (
              <>
                <Check className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
                  Valid JSON
                </h3>
              </>
            ) : (
              <>
                <X className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
                  Validation Failed
                </h3>
              </>
            )}
          </div>

          {!validationResult.isValid && validationResult.errors && validationResult.errors.length > 0 && (
            <div className="space-y-3">
              {validationResult.errors.map((err: any, idx: number) => (
                <div key={idx} className="p-3 bg-white/50 dark:bg-black/20 rounded">
                  <p className="font-medium text-red-800 dark:text-red-300">
                    {err.path || 'Root'}: {err.message}
                  </p>
                  {err.keyword && (
                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                      Keyword: {err.keyword}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
