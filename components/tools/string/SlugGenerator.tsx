'use client';

import { useState, useEffect } from 'react';
import { generateSlug } from '@/lib/string/generators';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';

export default function SlugGenerator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [lowercase, setLowercase] = useState(true);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (inputText) {
      const slug = generateSlug(inputText, { lowercase, maxLength });
      setOutputText(slug);
    } else {
      setOutputText('');
    }
  }, [inputText, lowercase, maxLength]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <SideBySideLayout
      options={
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Lowercase</span>
          </label>
          <Input
            type="number"
            label="Max Length (optional)"
            value={maxLength || ''}
            onChange={(e) => setMaxLength(e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="Unlimited"
            min={1}
            className="w-48"
          />
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputText}
          onChange={setInputText}
          label="Text to Convert"
          placeholder="Enter text to convert to slug..."
          accept=".txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label="Generated Slug"
          placeholder="URL-friendly slug will appear here..."
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
            Copy Slug
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      }
    />
  );
}

