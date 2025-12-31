'use client';

import { useState } from 'react';
import { encodeBase64, decodeBase64, isValidBase64 } from '@/lib/string/encoders';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { ArrowRight, ArrowLeft, Check, X } from 'lucide-react';

export default function Base64Encoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleConvert = () => {
    setError(null);
    setIsValid(null);

    if (!inputText) {
      setOutputText('');
      return;
    }

    try {
      if (mode === 'encode') {
        const encoded = encodeBase64(inputText);
        setOutputText(encoded);
        setIsValid(true);
      } else {
        // Validate before decoding
        if (!isValidBase64(inputText.trim())) {
          setError('Invalid Base64 string');
          setIsValid(false);
          setOutputText('');
          return;
        }
        const decoded = decodeBase64(inputText.trim());
        setOutputText(decoded);
        setIsValid(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setIsValid(false);
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
    setIsValid(null);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError(null);
    setIsValid(null);
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
          {isValid !== null && (
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                isValid
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
              }`}
            >
              {isValid ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Valid</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4" />
                  <span>{error}</span>
                </>
              )}
            </div>
          )}
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputText}
          onChange={setInputText}
          label={mode === 'encode' ? 'Plain Text' : 'Base64 String'}
          placeholder={
            mode === 'encode'
              ? 'Enter text to encode...'
              : 'Enter Base64 string to decode...'
          }
          accept=".txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label={mode === 'encode' ? 'Base64 String' : 'Plain Text'}
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
                Encode to Base64
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Decode from Base64
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

