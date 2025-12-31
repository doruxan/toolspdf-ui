'use client';

import { useState, useEffect } from 'react';
import { sortLines, type SortType, type SortOrder } from '@/lib/string/text-manipulation';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';

const SORT_TYPE_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'numerical', label: 'Numerical' },
  { value: 'length', label: 'By Length' },
  { value: 'random', label: 'Random' },
];

const SORT_ORDER_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'asc', label: 'Ascending (A-Z)' },
  { value: 'desc', label: 'Descending (Z-A)' },
];

export default function LineSorter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sortType, setSortType] = useState<SortType>('alphabetical');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    if (inputText) {
      const sorted = sortLines(inputText, sortType, sortOrder);
      setOutputText(sorted);
    } else {
      setOutputText('');
    }
  }, [inputText, sortType, sortOrder]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <SideBySideLayout
      options={
        <div className="flex flex-wrap items-center gap-4">
          <Select
            label="Sort Type"
            value={sortType}
            onChange={(e) => setSortType(e.target.value as SortType)}
            options={SORT_TYPE_OPTIONS}
          />
          {sortType !== 'random' && (
            <Select
              label="Sort Order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              options={SORT_ORDER_OPTIONS}
            />
          )}
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputText}
          onChange={setInputText}
          label="Input Text (one item per line)"
          placeholder="Enter lines to sort..."
          accept=".txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label="Sorted Text"
          placeholder="Sorted lines will appear here..."
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

