'use client';

import { useState, useEffect } from 'react';
import { getCharacterFrequency, getWordFrequency, type CharacterFrequency, type WordFrequency } from '@/lib/string/text-analysis';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';

const DISPLAY_OPTIONS = [
  { value: 'characters', label: 'Character Frequency' },
  { value: 'words', label: 'Word Frequency' },
];

export default function CharacterCounter() {
  const [inputText, setInputText] = useState('');
  const [displayMode, setDisplayMode] = useState<'characters' | 'words'>('characters');
  const [charFrequency, setCharFrequency] = useState<CharacterFrequency[]>([]);
  const [wordFrequency, setWordFrequency] = useState<WordFrequency[]>([]);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    if (inputText) {
      const charFreq = getCharacterFrequency(inputText);
      const wordFreq = getWordFrequency(inputText);
      setCharFrequency(charFreq);
      setWordFrequency(wordFreq);
    } else {
      setCharFrequency([]);
      setWordFrequency([]);
    }
  }, [inputText]);

  const handleClear = () => {
    setInputText('');
    setCharFrequency([]);
    setWordFrequency([]);
  };

  const displayData = displayMode === 'characters' ? charFrequency : wordFrequency;
  const limitedData = displayData.slice(0, limit);

  return (
    <div className="space-y-6">
      <JSONTextarea
        value={inputText}
        onChange={setInputText}
        label="Text to Analyze"
        placeholder="Enter text to analyze character or word frequency..."
        accept=".txt"
        minHeight="min-h-64"
      />

      <div className="flex items-center gap-4">
        <Select
          label="Display Mode"
          value={displayMode}
          onChange={(e) => setDisplayMode(e.target.value as 'characters' | 'words')}
          options={DISPLAY_OPTIONS}
        />
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {displayData.length > 0 && (
        <div className="bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">
              {displayMode === 'characters' ? 'Character' : 'Word'} Frequency ({displayData.length} unique)
            </h3>
            {displayData.length > limit && (
              <span className="text-sm text-muted-foreground">
                Showing top {limit} of {displayData.length}
              </span>
            )}
          </div>

          <div className="overflow-auto max-h-96">
            <table className="w-full text-sm">
              <thead className="border-b-2 border-border">
                <tr>
                  <th className="text-left py-2 px-4">{displayMode === 'characters' ? 'Char' : 'Word'}</th>
                  <th className="text-right py-2 px-4">Count</th>
                  <th className="text-right py-2 px-4">Percentage</th>
                  <th className="py-2 px-4">Distribution</th>
                </tr>
              </thead>
              <tbody>
                {limitedData.map((item, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-2 px-4 font-mono">
                      {displayMode === 'characters' 
                        ? (item as CharacterFrequency).char === ' ' 
                          ? '(space)' 
                          : (item as CharacterFrequency).char === '\n'
                          ? '(newline)'
                          : (item as CharacterFrequency).char
                        : (item as WordFrequency).word
                      }
                    </td>
                    <td className="text-right py-2 px-4">{item.count}</td>
                    <td className="text-right py-2 px-4">{item.percentage.toFixed(2)}%</td>
                    <td className="py-2 px-4">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${Math.min(100, item.percentage)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {displayData.length > limit && (
            <div className="mt-4 text-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setLimit((prev) => prev + 50)}
              >
                Show More
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

