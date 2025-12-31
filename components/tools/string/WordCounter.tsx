'use client';

import { useState, useEffect } from 'react';
import { analyzeText, type TextStats } from '@/lib/string/text-analysis';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { FileText, Type, Hash, List, Clock, Mic } from 'lucide-react';

export default function WordCounter() {
  const [inputText, setInputText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: 0,
    speakingTime: 0,
  });

  useEffect(() => {
    const result = analyzeText(inputText);
    setStats(result);
  }, [inputText]);

  const handleClear = () => {
    setInputText('');
  };

  const statCards = [
    { icon: Type, label: 'Characters', value: stats.characters },
    { icon: Type, label: 'Characters (no spaces)', value: stats.charactersNoSpaces },
    { icon: FileText, label: 'Words', value: stats.words },
    { icon: Hash, label: 'Sentences', value: stats.sentences },
    { icon: List, label: 'Paragraphs', value: stats.paragraphs },
    { icon: List, label: 'Lines', value: stats.lines },
    { icon: Clock, label: 'Reading Time', value: `${stats.readingTime} min` },
    { icon: Mic, label: 'Speaking Time', value: `${stats.speakingTime} min` },
  ];

  return (
    <div className="space-y-6">
      <JSONTextarea
        value={inputText}
        onChange={setInputText}
        label="Text to Analyze"
        placeholder="Enter or paste your text here..."
        accept=".txt"
        minHeight="min-h-96"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}

