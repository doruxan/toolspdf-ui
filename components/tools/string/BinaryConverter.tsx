'use client';

import { useState } from 'react';
import { textToBinary, binaryToText, textToHex, hexToText, decimalToBinary, binaryToDecimal, decimalToHex, hexToDecimal } from '@/lib/string/converters';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';

type ConversionType = 'text-to-binary' | 'binary-to-text' | 'text-to-hex' | 'hex-to-text' | 'decimal-to-binary' | 'binary-to-decimal' | 'decimal-to-hex' | 'hex-to-decimal';

const CONVERSION_OPTIONS = [
  { value: 'text-to-binary', label: 'Text → Binary' },
  { value: 'binary-to-text', label: 'Binary → Text' },
  { value: 'text-to-hex', label: 'Text → Hexadecimal' },
  { value: 'hex-to-text', label: 'Hexadecimal → Text' },
  { value: 'decimal-to-binary', label: 'Decimal → Binary' },
  { value: 'binary-to-decimal', label: 'Binary → Decimal' },
  { value: 'decimal-to-hex', label: 'Decimal → Hexadecimal' },
  { value: 'hex-to-decimal', label: 'Hexadecimal → Decimal' },
];

export default function BinaryConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [conversionType, setConversionType] = useState<ConversionType>('text-to-binary');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      let result = '';
      
      switch (conversionType) {
        case 'text-to-binary':
          result = textToBinary(inputText);
          break;
        case 'binary-to-text':
          result = binaryToText(inputText);
          break;
        case 'text-to-hex':
          result = textToHex(inputText);
          break;
        case 'hex-to-text':
          result = hexToText(inputText);
          break;
        case 'decimal-to-binary':
          result = decimalToBinary(parseInt(inputText.trim()));
          break;
        case 'binary-to-decimal':
          result = binaryToDecimal(inputText.trim()).toString();
          break;
        case 'decimal-to-hex':
          result = decimalToHex(parseInt(inputText.trim()));
          break;
        case 'hex-to-decimal':
          result = hexToDecimal(inputText.trim()).toString();
          break;
      }
      
      setOutputText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setOutputText('');
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const getPlaceholder = () => {
    if (conversionType.includes('text-to')) return 'Enter text...';
    if (conversionType.includes('binary')) return 'Enter binary (e.g., 01001000)...';
    if (conversionType.includes('hex')) return 'Enter hexadecimal (e.g., 48656C6C6F)...';
    if (conversionType.includes('decimal')) return 'Enter decimal number...';
    return 'Enter input...';
  };

  return (
    <SideBySideLayout
      options={
        <div className="flex flex-wrap items-center gap-4">
          <Select
            label="Conversion Type"
            value={conversionType}
            onChange={(e) => setConversionType(e.target.value as ConversionType)}
            options={CONVERSION_OPTIONS}
          />
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
          label="Input"
          placeholder={getPlaceholder()}
          accept=".txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label="Output"
          placeholder="Converted result will appear here..."
          readOnly
          minHeight="min-h-96"
        />
      }
      actions={
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleConvert} disabled={!inputText.trim()}>
            Convert
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

