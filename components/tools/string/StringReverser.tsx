'use client';

import { useState, useEffect } from 'react';
import { reverseText, reverseWords, reverseLines } from '@/lib/string/text-manipulation';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';

const REVERSE_TYPE_OPTIONS = [
  { value: 'text', label: 'Reverse Characters' },
  { value: 'words', label: 'Reverse Word Order' },
  { value: 'lines', label: 'Reverse Line Order' },
];

export default function StringReverser() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [reverseType, setReverseType] = useState<'text' | 'words' | 'lines'>('text');

  useEffect(() => {
    if (inputText) {
      let result = '';
      
      switch (reverseType) {
        case 'text':
          result = reverseText(inputText);
          break;
        case 'words':
          result = reverseWords(inputText);
          break;
        case 'lines':
          result = reverseLines(inputText);
          break;
      }
      
      setOutputText(result);
    } else {
      setOutputText('');
    }
  }, [inputText, reverseType]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <SideBySideLayout
      options={
        <div className="flex items-center gap-4">
          <Select
            label="Reverse Type"
            value={reverseType}
            onChange={(e) => setReverseType(e.target.value as 'text' | 'words' | 'lines')}
            options={REVERSE_TYPE_OPTIONS}
          />
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputText}
          onChange={setInputText}
          label="Input Text"
          placeholder="Enter text to reverse..."
          accept=".txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label="Reversed Text"
          placeholder="Reversed text will appear here..."
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

