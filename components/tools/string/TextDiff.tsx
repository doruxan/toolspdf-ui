'use client';

import { useState } from 'react';
import { computeTextDiff, calculateDiffStats, type DiffResult } from '@/lib/string/diff';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { Plus, Minus, Equal } from 'lucide-react';

export default function TextDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffs, setDiffs] = useState<DiffResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!text1 || !text2) return;

    setLoading(true);
    try {
      const result = await computeTextDiff(text1, text2);
      setDiffs(result);
    } catch (error) {
      console.error('Comparison failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText1('');
    setText2('');
    setDiffs(null);
  };

  const stats = diffs ? calculateDiffStats(diffs) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JSONTextarea
          value={text1}
          onChange={setText1}
          label="Original Text"
          placeholder="Enter original text..."
          accept=".txt"
          minHeight="min-h-64"
        />
        <JSONTextarea
          value={text2}
          onChange={setText2}
          label="Modified Text"
          placeholder="Enter modified text..."
          accept=".txt"
          minHeight="min-h-64"
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={handleCompare} disabled={!text1 || !text2 || loading}>
          {loading ? 'Comparing...' : 'Compare Texts'}
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-900 dark:text-green-300">Added</span>
            </div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{stats.additions}</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Minus className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-900 dark:text-red-300">Removed</span>
            </div>
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">{stats.deletions}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/20 border-2 border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Equal className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Unchanged</span>
            </div>
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-400">{stats.unchanged}</div>
          </div>
        </div>
      )}

      {diffs && (
        <div className="bg-background border-2 border-border rounded-lg p-4 overflow-auto">
          <h3 className="text-lg font-bold text-foreground mb-4">Differences</h3>
          <div className="font-mono text-sm space-y-1">
            {diffs.map((diff, index) => (
              <div
                key={index}
                className={`p-1 ${
                  diff.type === 'added'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-300'
                    : diff.type === 'removed'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-300'
                    : ''
                }`}
              >
                {diff.type === 'added' && <span className="text-green-600">+ </span>}
                {diff.type === 'removed' && <span className="text-red-600">- </span>}
                {diff.type === 'unchanged' && <span className="text-gray-500">  </span>}
                {diff.value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

