'use client';

import { useState } from 'react';
import { generateLoremParagraphs, generateLoremIpsum } from '@/lib/string/generators';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';

export default function LoremIpsumGenerator() {
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'paragraphs' | 'words'>('paragraphs');
  const [paragraphCount, setParagraphCount] = useState(3);
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState(5);
  const [wordCount, setWordCount] = useState(50);

  const handleGenerate = () => {
    if (mode === 'paragraphs') {
      const text = generateLoremParagraphs(paragraphCount, sentencesPerParagraph);
      setOutputText(text);
    } else {
      const text = generateLoremIpsum(wordCount);
      setOutputText(text);
    }
  };

  const handleClear = () => {
    setOutputText('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Generation Options</h3>
        
        <div className="flex gap-4 mb-4">
          <Button
            variant={mode === 'paragraphs' ? 'primary' : 'secondary'}
            onClick={() => setMode('paragraphs')}
          >
            Paragraphs
          </Button>
          <Button
            variant={mode === 'words' ? 'primary' : 'secondary'}
            onClick={() => setMode('words')}
          >
            Words
          </Button>
        </div>

        {mode === 'paragraphs' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Number of Paragraphs"
              value={paragraphCount}
              onChange={(e) => setParagraphCount(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              max={100}
            />
            <Input
              type="number"
              label="Sentences per Paragraph"
              value={sentencesPerParagraph}
              onChange={(e) => setSentencesPerParagraph(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              max={20}
            />
          </div>
        ) : (
          <Input
            type="number"
            label="Number of Words"
            value={wordCount}
            onChange={(e) => setWordCount(Math.max(1, parseInt(e.target.value) || 1))}
            min={1}
            max={1000}
          />
        )}
      </div>

      <div className="flex gap-4">
        <Button onClick={handleGenerate}>
          Generate Lorem Ipsum
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {outputText && (
        <JSONTextarea
          value={outputText}
          onChange={() => {}}
          label="Generated Lorem Ipsum"
          readOnly
          minHeight="min-h-96"
        />
      )}

      {outputText && (
        <Button
          variant="secondary"
          onClick={() => navigator.clipboard.writeText(outputText)}
        >
          Copy to Clipboard
        </Button>
      )}
    </div>
  );
}

