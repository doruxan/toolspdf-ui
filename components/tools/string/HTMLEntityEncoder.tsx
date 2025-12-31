'use client';

import { useState } from 'react';
import { encodeHTMLEntities, decodeHTMLEntities } from '@/lib/string/encoders';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function HTMLEntityEncoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    try {
      if (mode === 'encode') {
        const encoded = encodeHTMLEntities(inputText);
        setOutputText(encoded);
      } else {
        const decoded = decodeHTMLEntities(inputText);
        setOutputText(decoded);
      }
    } catch (err) {
      console.error('Conversion failed:', err);
    }
  };

  const handleModeSwitch = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <SideBySideLayout
      options={
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
      }
      leftPanel={
        <JSONTextarea
          value={inputText}
          onChange={setInputText}
          label={mode === 'encode' ? 'Plain Text' : 'HTML Entities'}
          placeholder={
            mode === 'encode'
              ? 'Enter text with special characters (<, >, &, etc.)...'
              : 'Enter HTML entities (&lt;, &gt;, &amp;, etc.)...'
          }
          accept=".txt,.html"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label={mode === 'encode' ? 'HTML Entities' : 'Plain Text'}
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
                Encode HTML Entities
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Decode HTML Entities
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

