'use client';

import { useState, useCallback } from 'react';
import { queryJson, queryExamples, explainJsonPath } from '@/lib/json/query';
import FileUpload from '@/components/shared/FileUpload';
import { Button } from '@/components/shared/Button';
import { Alert } from '@/components/shared/Alert';
import { Search, HelpCircle, Copy } from 'lucide-react';

export default function JSONQuery() {
  const [inputData, setInputData] = useState('');
  const [queryPath, setQueryPath] = useState('$.*');
  const [results, setResults] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');
  const [explanation, setExplanation] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const handleFileUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    const text = await file.text();
    setInputData(text);
    setResults([]);
    setCount(0);
    setError('');
  }, []);

  const handleQuery = useCallback(() => {
    setError('');
    setResults([]);
    setCount(0);
    setExplanation('');

    try {
      if (!inputData.trim()) {
        setError('Please provide JSON input');
        return;
      }

      if (!queryPath.trim()) {
        setError('Please provide a JSONPath expression');
        return;
      }

      const jsonData = JSON.parse(inputData);
      const result = queryJson(jsonData, queryPath);

      if (!result.success) {
        setError(result.error || 'Query failed');
        return;
      }

      setResults(result.results || []);
      setCount(result.count || 0);
      setExplanation(explainJsonPath(queryPath));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Query failed');
    }
  }, [inputData, queryPath]);

  const loadExample = (example: typeof queryExamples[0]) => {
    setQueryPath(example.expression);
    setExplanation(example.description);
  };

  return (
    <div className="space-y-6">
      {/* Examples */}
      <div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowExamples(!showExamples)}
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          {showExamples ? 'Hide' : 'Show'} Examples
        </Button>

        {showExamples && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">JSONPath Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {queryExamples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => loadExample(example)}
                  className="text-left p-3 bg-background hover:bg-muted rounded border text-sm"
                >
                  <p className="font-medium font-mono">{example.expression}</p>
                  <p className="text-xs text-muted-foreground mt-1">{example.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <FileUpload
        accept=".json,.txt"
        onFilesSelected={handleFileUpload}
        label="Upload JSON file"
      />

      <div>
        <label className="block text-sm font-medium mb-2">JSON Data</label>
        <textarea
          value={inputData}
          onChange={(e) => {
            setInputData(e.target.value);
            setResults([]);
            setError('');
          }}
          placeholder="Paste your JSON here..."
          className="w-full h-48 p-4 border rounded-lg font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">JSONPath Expression</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={queryPath}
            onChange={(e) => {
              setQueryPath(e.target.value);
              setResults([]);
            }}
            placeholder="$.users[0].email"
            className="flex-1 p-2 border rounded-lg font-mono text-sm"
          />
          <Button onClick={handleQuery} disabled={!inputData.trim() || !queryPath.trim()}>
            <Search className="h-4 w-4 mr-2" />
            Query
          </Button>
        </div>
        {explanation && (
          <p className="text-sm text-muted-foreground mt-2">{explanation}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          variant="secondary"
          onClick={() => {
            setInputData('');
            setQueryPath('$.*');
            setResults([]);
            setCount(0);
            setError('');
            setExplanation('');
          }}
        >
          Clear
        </Button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      {results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Query Results</h3>
              <p className="text-sm text-muted-foreground">{count} result(s) found</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigator.clipboard.writeText(JSON.stringify(results, null, 2))}
            >
              Copy All Results
            </Button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((result, idx) => (
              <div key={idx} className="p-4 bg-muted rounded-lg">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Result {idx + 1}</p>
                    <pre className="font-mono text-sm overflow-x-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
                    }}
                    title="Copy result"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

