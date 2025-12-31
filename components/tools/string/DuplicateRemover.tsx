'use client';

import { useState, useEffect } from 'react';
import { removeDuplicateLines, type DuplicateKeep } from '@/lib/string/text-manipulation';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';

const KEEP_OPTIONS: { value: DuplicateKeep; label: string }[] = [
  { value: 'first', label: 'Keep First Occurrence' },
  { value: 'last', label: 'Keep Last Occurrence' },
  { value: 'none', label: 'Remove All Duplicates' },
];

export default function DuplicateRemover() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [keepOption, setKeepOption] = useState<DuplicateKeep>('first');
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });

  useEffect(() => {
    if (inputText) {
      const result = removeDuplicateLines(inputText, keepOption);
      setOutputText(result);

      const originalLines = inputText.split('\n').length;
      const uniqueLines = result.split('\n').length;
      setStats({
        original: originalLines,
        unique: uniqueLines,
        removed: originalLines - uniqueLines,
      });
    } else {
      setOutputText('');
      setStats({ original: 0, unique: 0, removed: 0 });
    }
  }, [inputText, keepOption]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setStats({ original: 0, unique: 0, removed: 0 });
  };

  return (
    <SideBySideLayout
      options={
        <div className="flex flex-wrap items-center gap-4">
          <Select
            label="Duplicate Handling"
            value={keepOption}
            onChange={(e) => setKeepOption(e.target.value as DuplicateKeep)}
            options={KEEP_OPTIONS}
          />
          {stats.original > 0 && (
            <div className="text-sm text-muted-foreground">
              Original: {stats.original} lines | Unique: {stats.unique} lines | Removed: {stats.removed} duplicates
            </div>
          )}
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputText}
          onChange={setInputText}
          label="Input Text (one item per line)"
          placeholder="Enter lines (duplicates will be removed)..."
          accept=".txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label="Deduplicated Text"
          placeholder="Unique lines will appear here..."
          readOnly
          minHeight="min-h-96"
        />
      }
      actions={
        <div className="flex flex-wrap gap-4">
          <Button
            variant="secondary"
            onClick={() => navigator.clipboard.writeText(outputText)}
            disabled={!outputText}
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

