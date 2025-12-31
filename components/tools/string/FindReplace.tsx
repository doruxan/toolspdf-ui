'use client';

import { useState } from 'react';
import { findReplace, countOccurrences, type FindReplaceOptions } from '@/lib/string/text-manipulation';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';

export default function FindReplace() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const occurrences = findText ? countOccurrences(inputText, findText, caseSensitive) : 0;

  const handleReplace = () => {
    if (!inputText || !findText) {
      setOutputText('');
      setError(null);
      return;
    }

    setError(null);

    try {
      const options: FindReplaceOptions = {
        caseSensitive,
        wholeWord,
        useRegex,
        global: true,
      };

      const result = findReplace(inputText, findText, replaceText, options);
      setOutputText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Replacement failed');
      setOutputText('');
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setFindText('');
    setReplaceText('');
    setError(null);
  };

  return (
    <SideBySideLayout
      options={
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Find"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              placeholder="Text to find..."
            />
            <Input
              type="text"
              label="Replace with"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replacement text..."
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Case sensitive</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={wholeWord}
                onChange={(e) => setWholeWord(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Whole word only</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Use regex</span>
            </label>
          </div>

          {findText && (
            <div className="text-sm text-muted-foreground">
              Found {occurrences} occurrence{occurrences !== 1 ? 's' : ''}
            </div>
          )}

          {error && (
            <div className="px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded text-sm">
              {error}
            </div>
          )}
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputText}
          onChange={setInputText}
          label="Input Text"
          placeholder="Enter text to search..."
          accept=".txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label="Output Text"
          placeholder="Result will appear here..."
          readOnly
          minHeight="min-h-96"
        />
      }
      actions={
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleReplace} disabled={!inputText || !findText}>
            Replace All
          </Button>
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

