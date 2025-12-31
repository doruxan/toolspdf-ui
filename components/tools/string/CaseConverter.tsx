'use client';

import { useState, useEffect } from 'react';
import { convertCase, type CaseType } from '@/lib/string/case-converter';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';

const CASE_OPTIONS: { value: CaseType; label: string }[] = [
  { value: 'lowercase', label: 'lowercase' },
  { value: 'uppercase', label: 'UPPERCASE' },
  { value: 'titlecase', label: 'Title Case' },
  { value: 'sentencecase', label: 'Sentence case' },
  { value: 'camelcase', label: 'camelCase' },
  { value: 'pascalcase', label: 'PascalCase' },
  { value: 'snakecase', label: 'snake_case' },
  { value: 'kebabcase', label: 'kebab-case' },
  { value: 'constantcase', label: 'CONSTANT_CASE' },
  { value: 'dotcase', label: 'dot.case' },
  { value: 'pathcase', label: 'path/case' },
  { value: 'traincase', label: 'Train-Case' },
];

export default function CaseConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [caseType, setCaseType] = useState<CaseType>('lowercase');

  useEffect(() => {
    if (inputText) {
      const converted = convertCase(inputText, caseType);
      setOutputText(converted);
    } else {
      setOutputText('');
    }
  }, [inputText, caseType]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <SideBySideLayout
      options={
        <div className="flex flex-wrap items-center gap-4">
          <Select
            label="Target Case"
            value={caseType}
            onChange={(e) => setCaseType(e.target.value as CaseType)}
            options={CASE_OPTIONS}
          />
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputText}
          onChange={setInputText}
          label="Input Text"
          placeholder="Enter text to convert..."
          accept=".txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label="Converted Text"
          placeholder="Converted text will appear here..."
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

