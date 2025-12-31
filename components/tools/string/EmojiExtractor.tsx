'use client';

import { useState, useEffect } from 'react';
import { extractEmojis, countEmojis, removeEmojis } from '@/lib/string/unicode';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Smile } from 'lucide-react';

export default function EmojiExtractor() {
  const [inputText, setInputText] = useState('');
  const [extractedEmojis, setExtractedEmojis] = useState<string[]>([]);
  const [textWithoutEmojis, setTextWithoutEmojis] = useState('');
  const [showMode, setShowMode] = useState<'emojis' | 'text-without'>('emojis');

  useEffect(() => {
    if (inputText) {
      const emojis = extractEmojis(inputText);
      const textNoEmojis = removeEmojis(inputText);
      setExtractedEmojis(emojis);
      setTextWithoutEmojis(textNoEmojis);
    } else {
      setExtractedEmojis([]);
      setTextWithoutEmojis('');
    }
  }, [inputText]);

  const handleClear = () => {
    setInputText('');
    setExtractedEmojis([]);
    setTextWithoutEmojis('');
  };

  const emojiCount = countEmojis(inputText);
  const uniqueEmojis = [...new Set(extractedEmojis)];

  return (
    <div className="space-y-6">
      <JSONTextarea
        value={inputText}
        onChange={setInputText}
        label="Text with Emojis"
        placeholder="Enter text containing emojis... 😀🎉✨🚀"
        accept=".txt"
        minHeight="min-h-64"
      />

      {emojiCount > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Smile className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Emojis</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{emojiCount}</div>
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Smile className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Unique Emojis</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{uniqueEmojis.length}</div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <Button
          variant={showMode === 'emojis' ? 'primary' : 'secondary'}
          onClick={() => setShowMode('emojis')}
        >
          Show Extracted Emojis
        </Button>
        <Button
          variant={showMode === 'text-without' ? 'primary' : 'secondary'}
          onClick={() => setShowMode('text-without')}
        >
          Show Text Without Emojis
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {showMode === 'emojis' && extractedEmojis.length > 0 && (
        <div className="bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Extracted Emojis</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {extractedEmojis.map((emoji, index) => (
              <span key={index} className="text-4xl">
                {emoji}
              </span>
            ))}
          </div>
          <div className="text-sm text-muted-foreground mb-2">As text (one per line):</div>
          <JSONTextarea
            value={extractedEmojis.join('\n')}
            onChange={() => {}}
            readOnly
            minHeight="min-h-32"
          />
          <Button
            variant="secondary"
            onClick={() => navigator.clipboard.writeText(extractedEmojis.join('\n'))}
            className="mt-2"
          >
            Copy Emojis
          </Button>
        </div>
      )}

      {showMode === 'text-without' && textWithoutEmojis && (
        <div>
          <JSONTextarea
            value={textWithoutEmojis}
            onChange={() => {}}
            label="Text Without Emojis"
            readOnly
            minHeight="min-h-64"
          />
          <Button
            variant="secondary"
            onClick={() => navigator.clipboard.writeText(textWithoutEmojis)}
            className="mt-2"
          >
            Copy Text
          </Button>
        </div>
      )}

      {uniqueEmojis.length > 0 && (
        <div className="bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Unique Emojis ({uniqueEmojis.length})</h3>
          <div className="flex flex-wrap gap-3">
            {uniqueEmojis.map((emoji, index) => (
              <span key={index} className="text-3xl">
                {emoji}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

