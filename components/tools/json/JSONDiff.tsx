'use client';

import { useState, useCallback, useEffect } from 'react';
import { compareJson } from '@/lib/json/diff';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Plus, Minus, Edit2, Equal } from 'lucide-react';

export default function JSONDiff() {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [differences, setDifferences] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'changes-only' | 'all'>('changes-only');

  // Real-time comparison with debounce
  useEffect(() => {
    if (!json1.trim() || !json2.trim()) {
      setDifferences([]);
      setSummary(null);
      setError('');
      return;
    }

    const timer = setTimeout(() => {
      try {
        const data1 = JSON.parse(json1);
        const data2 = JSON.parse(json2);

        const result = compareJson(data1, data2);

        if (result.success) {
          setDifferences(result.differences || []);
          setSummary(result.summary);
          setError('');
        } else {
          setError(result.error || 'Comparison failed');
          setDifferences([]);
          setSummary(null);
        }
      } catch (e) {
        setError('Invalid JSON in one or both inputs');
        setDifferences([]);
        setSummary(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [json1, json2]);

  const handleClear = () => {
    setJson1('');
    setJson2('');
    setDifferences([]);
    setSummary(null);
    setError('');
  };

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
      <SideBySideLayout
        leftPanel={
          <JSONTextarea
            value={json1}
            onChange={setJson1}
            label="JSON 1 (Original)"
            placeholder="Paste first JSON here or drag and drop a file..."
            accept=".json,.txt"
            minHeight="min-h-96"
          />
        }
        rightPanel={
          <JSONTextarea
            value={json2}
            onChange={setJson2}
            label="JSON 2 (Modified)"
            placeholder="Paste second JSON here or drag and drop a file..."
            accept=".json,.txt"
            minHeight="min-h-96"
          />
        }
        actions={
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        }
      />

      {error && (
        <div className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}

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
