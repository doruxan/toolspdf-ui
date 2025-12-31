'use client';

import { useState } from 'react';
import { generateMultipleUUIDs } from '@/lib/string/generators';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { RefreshCw } from 'lucide-react';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const handleGenerate = () => {
    const generated = generateMultipleUUIDs(Math.min(count, 100));
    setUuids(generated);
  };

  const handleClear = () => {
    setUuids([]);
  };

  const outputText = uuids.join('\n');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Generation Options</h3>
        
        <Input
          type="number"
          label="Number of UUIDs"
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
          min={1}
          max={100}
          helpText="Generate 1-100 UUIDs at once"
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={handleGenerate}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate UUIDs
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {uuids.length > 0 && (
        <>
          <JSONTextarea
            value={outputText}
            onChange={() => {}}
            label={`Generated UUIDs (${uuids.length})`}
            readOnly
            minHeight="min-h-96"
          />
          
          <Button
            variant="secondary"
            onClick={() => navigator.clipboard.writeText(outputText)}
          >
            Copy All UUIDs
          </Button>
        </>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">About UUIDs</h4>
        <p className="text-sm text-blue-800 dark:text-blue-400">
          Universally Unique Identifiers (UUIDs) are 128-bit values used to uniquely identify information.
          This tool generates version 4 UUIDs using cryptographically strong random numbers.
        </p>
      </div>
    </div>
  );
}

