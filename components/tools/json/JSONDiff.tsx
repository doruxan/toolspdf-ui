'use client';

import { useState, useCallback } from 'react';
import { compareJson } from '@/lib/json/diff';
import FileUpload from '@/components/shared/FileUpload';
import { Button } from '@/components/shared/Button';
import { Alert } from '@/components/shared/Alert';
import { Plus, Minus, Edit2, Equal } from 'lucide-react';

export default function JSONDiff() {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [differences, setDifferences] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'changes-only' | 'all'>('changes-only');

  const handleFile1Upload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    const text = await file.text();
    setJson1(text);
    setDifferences([]);
    setSummary(null);
    setError('');
  }, []);

  const handleFile2Upload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    const text = await file.text();
    setJson2(text);
    setDifferences([]);
    setSummary(null);
    setError('');
  }, []);

  const handleCompare = useCallback(() => {
    setError('');
    setDifferences([]);
    setSummary(null);

    try {
      if (!json1.trim() || !json2.trim()) {
        setError('Both JSON inputs are required');
        return;
      }

      let data1, data2;
      try {
        data1 = JSON.parse(json1);
      } catch (e) {
        setError('Invalid JSON in first input');
        return;
      }

      try {
        data2 = JSON.parse(json2);
      } catch (e) {
        setError('Invalid JSON in second input');
        return;
      }

      const result = compareJson(data1, data2);

      if (!result.success) {
        setError(result.error || 'Comparison failed');
        return;
      }

      setDifferences(result.differences || []);
      setSummary(result.summary);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Comparison failed');
    }
  }, [json1, json2]);

  const renderDifference = (diff: any, index: number) => {
    if (viewMode === 'changes-only' && diff.type === 'unchanged') {
      return null;
    }

    let icon, bgColor, textColor;
    switch (diff.type) {
      case 'added':
        icon = <Plus className="h-4 w-4" />;
        bgColor = 'bg-green-100 dark:bg-green-900/20';
        textColor = 'text-green-800 dark:text-green-300';
        break;
      case 'removed':
        icon = <Minus className="h-4 w-4" />;
        bgColor = 'bg-red-100 dark:bg-red-900/20';
        textColor = 'text-red-800 dark:text-red-300';
        break;
      case 'modified':
        icon = <Edit2 className="h-4 w-4" />;
        bgColor = 'bg-yellow-100 dark:bg-yellow-900/20';
        textColor = 'text-yellow-800 dark:text-yellow-300';
        break;
      default:
        icon = <Equal className="h-4 w-4" />;
        bgColor = 'bg-gray-100 dark:bg-gray-900/20';
        textColor = 'text-gray-600 dark:text-gray-400';
    }

    return (
      <div key={index} className={`p-3 rounded ${bgColor} ${textColor}`}>
        <div className="flex items-start gap-2">
          {icon}
          <div className="flex-1 font-mono text-sm">
            <p className="font-semibold">{diff.path}</p>
            {diff.type === 'added' && (
              <p className="mt-1">+ {JSON.stringify(diff.newValue)}</p>
            )}
            {diff.type === 'removed' && (
              <p className="mt-1">- {JSON.stringify(diff.oldValue)}</p>
            )}
            {diff.type === 'modified' && (
              <>
                <p className="mt-1">- {JSON.stringify(diff.oldValue)}</p>
                <p>+ {JSON.stringify(diff.newValue)}</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* JSON 1 */}
        <div>
          <FileUpload
            accept=".json,.txt"
            onFilesSelected={handleFile1Upload}
            label="Upload first JSON file"
          />
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">JSON 1 (Original)</label>
            <textarea
              value={json1}
              onChange={(e) => {
                setJson1(e.target.value);
                setDifferences([]);
                setSummary(null);
              }}
              placeholder="Paste first JSON here..."
              className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
              spellCheck={false}
            />
          </div>
        </div>

        {/* JSON 2 */}
        <div>
          <FileUpload
            accept=".json,.txt"
            onFilesSelected={handleFile2Upload}
            label="Upload second JSON file"
          />
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">JSON 2 (Modified)</label>
            <textarea
              value={json2}
              onChange={(e) => {
                setJson2(e.target.value);
                setDifferences([]);
                setSummary(null);
              }}
              placeholder="Paste second JSON here..."
              className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleCompare} disabled={!json1.trim() || !json2.trim()}>
          Compare JSON
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setJson1('');
            setJson2('');
            setDifferences([]);
            setSummary(null);
            setError('');
          }}
        >
          Clear
        </Button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded">
            <p className="text-sm text-green-800 dark:text-green-300">Added</p>
            <p className="text-2xl font-bold text-green-800 dark:text-green-300">{summary.added}</p>
          </div>
          <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded">
            <p className="text-sm text-red-800 dark:text-red-300">Removed</p>
            <p className="text-2xl font-bold text-red-800 dark:text-red-300">{summary.removed}</p>
          </div>
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">Modified</p>
            <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">{summary.modified}</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-900/20 rounded">
            <p className="text-sm text-gray-800 dark:text-gray-300">Unchanged</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-300">{summary.unchanged}</p>
          </div>
        </div>
      )}

      {differences.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Differences</h3>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'changes-only' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('changes-only')}
              >
                Changes Only
              </Button>
              <Button
                variant={viewMode === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('all')}
              >
                Show All
              </Button>
            </div>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {differences.map((diff, index) => renderDifference(diff, index))}
          </div>
        </div>
      )}
    </div>
  );
}

