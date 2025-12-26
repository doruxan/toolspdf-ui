'use client';

import { useState, useCallback, useEffect } from 'react';
import { queryJson, queryExamples, explainJsonPath } from '@/lib/json/query';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { HelpCircle, Search } from 'lucide-react';

export default function JSONQuery() {
  const [inputData, setInputData] = useState('');
  const [queryPath, setQueryPath] = useState('$.*');
  const [results, setResults] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');
  const [explanation, setExplanation] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  // Real-time query execution with debounce
  useEffect(() => {
    if (!inputData.trim() || !queryPath.trim()) {
      setResults([]);
      setCount(0);
      setError('');
      setExplanation('');
      return;
    }

    const timer = setTimeout(() => {
      try {
        const jsonData = JSON.parse(inputData);
        const result = queryJson(jsonData, queryPath);

        if (result.success) {
          setResults(result.results || []);
          setCount(result.count || 0);
          setError('');
          setExplanation(explainJsonPath(queryPath));
        } else {
          setError(result.error || 'Query failed');
          setResults([]);
          setCount(0);
        }
      } catch (e) {
        setError('Invalid JSON input');
        setResults([]);
        setCount(0);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputData, queryPath]);

  const loadExample = (example: typeof queryExamples[0]) => {
    setQueryPath(example.expression);
    setShowExamples(false);
  };

  const handleClear = () => {
    setInputData('');
    setQueryPath('$.*');
    setResults([]);
    setCount(0);
    setError('');
    setExplanation('');
  };

  return (
    <div className="space-y-6">
      {/* Examples Section */}
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
                  className="text-left p-3 bg-background hover:bg-muted rounded border text-sm transition-colors"
                >
                  <p className="font-medium font-mono">{example.expression}</p>
                  <p className="text-xs text-muted-foreground mt-1">{example.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <SideBySideLayout
        options={
          <div className="space-y-2">
            <label className="block text-sm font-medium">JSONPath Expression</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={queryPath}
                onChange={(e) => setQueryPath(e.target.value)}
                placeholder="$.users[0].email"
                className="flex-1 p-2 border-2 rounded-lg font-mono text-sm bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            {explanation && (
              <p className="text-sm text-muted-foreground">{explanation}</p>
            )}
          </div>
        }
        leftPanel={
          <div>
            <div className="flex items-center justify-between mb-2 min-h-[36px]">
              <label className="block text-sm font-medium">JSON Data</label>
            </div>
            <JSONTextarea
              value={inputData}
              onChange={setInputData}
              placeholder="Paste your JSON data here or drag and drop a file..."
              accept=".json,.txt"
              minHeight="min-h-96"
            />
          </div>
        }
        rightPanel={
          <div>
            <div className="flex items-center justify-between mb-2 min-h-[36px]">
              <label className="block text-sm font-medium">
                Query Results {count > 0 && `(${count})`}
              </label>
              {results.length > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(results, null, 2))}
                >
                  Copy All Results
                </Button>
              )}
            </div>
            <div className="min-h-96 max-h-96 overflow-y-auto p-4 border-2 rounded-lg bg-background border-border">
              {error ? (
                <div className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg text-sm">
                  {error}
                </div>
              ) : results.length > 0 ? (
                <pre className="font-mono text-sm whitespace-pre-wrap">
                  {JSON.stringify(results, null, 2)}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {inputData ? 'Enter a JSONPath expression to query the data' : 'Waiting for JSON input...'}
                </p>
              )}
            </div>
          </div>
        }
        actions={
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        }
      />
    </div>
  );
}
