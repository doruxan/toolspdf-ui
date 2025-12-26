'use client';

import { useState, useCallback } from 'react';
import {
  escapeJson,
  unescapeJson,
  encodeBase64,
  decodeBase64,
  encodeUrl,
  decodeUrl,
} from '@/lib/json/escape';
import FileUpload from '@/components/shared/FileUpload';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';
import { Alert } from '@/components/shared/Alert';
import { ArrowLeftRight } from 'lucide-react';

type Operation = 'escape' | 'unescape' | 'base64-encode' | 'base64-decode' | 'url-encode' | 'url-decode';

export default function JSONEscape() {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [operation, setOperation] = useState<Operation>('escape');
  const [error, setError] = useState('');

  const handleFileUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    const text = await file.text();
    setInputData(text);
    setOutputData('');
    setError('');
  }, []);

  const handleProcess = useCallback(() => {
    setError('');

    if (!inputData.trim()) {
      setError('Please provide input');
      return;
    }

    let result;
    switch (operation) {
      case 'escape':
        result = escapeJson(inputData);
        break;
      case 'unescape':
        result = unescapeJson(inputData);
        break;
      case 'base64-encode':
        result = encodeBase64(inputData);
        break;
      case 'base64-decode':
        result = decodeBase64(inputData);
        break;
      case 'url-encode':
        result = encodeUrl(inputData);
        break;
      case 'url-decode':
        result = decodeUrl(inputData);
        break;
    }

    if (!result.success) {
      setError(result.error || 'Operation failed');
      return;
    }

    setOutputData(result.result || '');
  }, [inputData, operation]);

  const handleSwap = () => {
    setInputData(outputData);
    setOutputData('');
    
    // Auto-switch operation
    if (operation === 'escape') setOperation('unescape');
    else if (operation === 'unescape') setOperation('escape');
    else if (operation === 'base64-encode') setOperation('base64-decode');
    else if (operation === 'base64-decode') setOperation('base64-encode');
    else if (operation === 'url-encode') setOperation('url-decode');
    else if (operation === 'url-decode') setOperation('url-encode');
  };

  return (
    <div className="space-y-6">
      <Select
        label="Operation"
        value={operation}
        onChange={(e) => setOperation(e.target.value as Operation)}
        options={[
          { value: 'escape', label: 'Escape JSON' },
          { value: 'unescape', label: 'Unescape JSON' },
          { value: 'base64-encode', label: 'Base64 Encode' },
          { value: 'base64-decode', label: 'Base64 Decode' },
          { value: 'url-encode', label: 'URL Encode' },
          { value: 'url-decode', label: 'URL Decode' },
        ]}
      />

      <FileUpload
        accept=".json,.txt"
        onFilesSelected={handleFileUpload}
        label="Upload file"
      />

      <div>
        <label className="block text-sm font-medium mb-2">Input</label>
        <textarea
          value={inputData}
          onChange={(e) => {
            setInputData(e.target.value);
            setError('');
          }}
          placeholder={`Enter text to ${operation}...`}
          className="w-full h-48 p-4 border rounded-lg font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={handleProcess} disabled={!inputData.trim()}>
          {operation.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </Button>
        <Button variant="secondary" onClick={handleSwap} disabled={!outputData} title="Swap input/output">
          <ArrowLeftRight className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setInputData('');
            setOutputData('');
            setError('');
          }}
        >
          Clear
        </Button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      {outputData && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Output</label>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigator.clipboard.writeText(outputData)}
            >
              Copy to Clipboard
            </Button>
          </div>
          <textarea
            value={outputData}
            readOnly
            className="w-full h-48 p-4 border rounded-lg font-mono text-sm bg-muted"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}

