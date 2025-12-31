'use client';

import { useState, useEffect } from 'react';
import { htmlToText } from '@/lib/string/converters';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';

export default function HTMLToText() {
  const [inputHTML, setInputHTML] = useState('');
  const [outputText, setOutputText] = useState('');

  useEffect(() => {
    if (inputHTML) {
      const text = htmlToText(inputHTML);
      setOutputText(text);
    } else {
      setOutputText('');
    }
  }, [inputHTML]);

  const handleClear = () => {
    setInputHTML('');
    setOutputText('');
  };

  return (
    <SideBySideLayout
      leftPanel={
        <JSONTextarea
          value={inputHTML}
          onChange={setInputHTML}
          label="HTML Input"
          placeholder="Enter HTML to strip tags..."
          accept=".html,.htm,.txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label="Plain Text Output"
          placeholder="Plain text will appear here..."
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
            Copy Text
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      }
    />
  );
}

