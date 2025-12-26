'use client';

import { useState, useCallback } from 'react';
import { validateJsonSchema, generateSchemaFromJson } from '@/lib/json/validator';
import FileUpload from '@/components/shared/FileUpload';
import { Button } from '@/components/shared/Button';
import { Alert } from '@/components/shared/Alert';
import { Check, X, AlertTriangle } from 'lucide-react';

export default function JSONSchemaValidator() {
  const [jsonData, setJsonData] = useState('');
  const [schemaData, setSchemaData] = useState('');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleJsonFileUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    const text = await file.text();
    setJsonData(text);
    setValidationResult(null);
    setError('');
  }, []);

  const handleSchemaFileUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    const text = await file.text();
    setSchemaData(text);
    setValidationResult(null);
    setError('');
  }, []);

  const handleValidate = useCallback(() => {
    setError('');
    setValidationResult(null);

    try {
      if (!jsonData.trim() || !schemaData.trim()) {
        setError('Both JSON data and schema are required');
        return;
      }

      let data, schema;
      try {
        data = JSON.parse(jsonData);
      } catch (e) {
        setError('Invalid JSON data');
        return;
      }

      try {
        schema = JSON.parse(schemaData);
      } catch (e) {
        setError('Invalid JSON schema');
        return;
      }

      const result = validateJsonSchema(data, schema);
      setValidationResult(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Validation failed');
    }
  }, [jsonData, schemaData]);

  const handleGenerateSchema = useCallback(() => {
    setError('');

    try {
      if (!jsonData.trim()) {
        setError('JSON data is required to generate schema');
        return;
      }

      const data = JSON.parse(jsonData);
      const schema = generateSchemaFromJson(data);
      setSchemaData(JSON.stringify(schema, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate schema');
    }
  }, [jsonData]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* JSON Data */}
        <div>
          <FileUpload
            accept=".json,.txt"
            onFilesSelected={handleJsonFileUpload}
            label="Upload JSON data"
          />
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">JSON Data</label>
            <textarea
              value={jsonData}
              onChange={(e) => {
                setJsonData(e.target.value);
                setValidationResult(null);
              }}
              placeholder="Paste your JSON data here..."
              className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
              spellCheck={false}
            />
          </div>
        </div>

        {/* JSON Schema */}
        <div>
          <FileUpload
            accept=".json,.txt"
            onFilesSelected={handleSchemaFileUpload}
            label="Upload JSON schema"
          />
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">JSON Schema</label>
            <textarea
              value={schemaData}
              onChange={(e) => {
                setSchemaData(e.target.value);
                setValidationResult(null);
              }}
              placeholder="Paste your JSON schema here..."
              className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleValidate} disabled={!jsonData.trim() || !schemaData.trim()}>
          Validate
        </Button>
        <Button variant="secondary" onClick={handleGenerateSchema} disabled={!jsonData.trim()}>
          Generate Schema from JSON
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setJsonData('');
            setSchemaData('');
            setValidationResult(null);
            setError('');
          }}
        >
          Clear
        </Button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}

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

          {!validationResult.isValid && validationResult.errors && (
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

