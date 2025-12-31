'use client';

import { useState } from 'react';
import { encodeURL, decodeURL } from '@/lib/string/encoders';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function URLEncoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);

    if (!inputText) {
      setOutputText('');
      return;
    }

    try {
      if (mode === 'encode') {
        const encoded = encodeURL(inputText);
        setOutputText(encoded);
      } else {
        const decoded = decodeURL(inputText);
        setOutputText(decoded);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setOutputText('');
    }
  };

  const handleModeSwitch = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    // Swap input and output
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    setError(null);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  return (
    <SideBySideLayout
      options={
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={mode === 'encode' ? 'primary' : 'secondary'}
              onClick={() => setMode('encode')}
            >
              Encode
            </Button>
            <Button
              variant={mode === 'decode' ? 'primary' : 'secondary'}
              onClick={() => setMode('decode')}
            >
              Decode
            </Button>
          </div>
          {error && (
            <div className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-sm">
              {error}
            </div>
          )}
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputText}
          onChange={setInputText}
          label={mode === 'encode' ? 'Plain Text / URL' : 'URL-Encoded Text'}
          placeholder={
            mode === 'encode'
              ? 'Enter text or URL to encode...'
              : 'Enter URL-encoded text to decode...'
          }
          accept=".txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label={mode === 'encode' ? 'URL-Encoded Text' : 'Decoded Text'}
          placeholder="Result will appear here..."
          readOnly
          minHeight="min-h-96"
        />
      }
      actions={
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleConvert} disabled={!inputText}>
            {mode === 'encode' ? (
              <>
                <ArrowRight className="h-4 w-4 mr-2" />
                Encode URL
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Decode URL
              </>
            )}
          </Button>
          <Button variant="secondary" onClick={handleModeSwitch}>
            Switch Mode
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

