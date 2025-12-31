'use client';

import { useState, useEffect } from 'react';
import { removeAccents } from '@/lib/string/unicode';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';

export default function RemoveAccents() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  useEffect(() => {
    if (inputText) {
      const result = removeAccents(inputText);
      setOutputText(result);
    } else {
      setOutputText('');
    }
  }, [inputText]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <SideBySideLayout
      leftPanel={
        <JSONTextarea
          value={inputText}
          onChange={setInputText}
          label="Text with Accents"
          placeholder="Enter text with diacritics (e.g., café, naïve, résumé)..."
          accept=".txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label="ASCII-Safe Text"
          placeholder="Text without accents will appear here..."
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

