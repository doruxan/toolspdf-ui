'use client';

import { useState } from 'react';
import { generateAllHashes, type HashAlgorithm } from '@/lib/string/hash';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { Copy, Check } from 'lucide-react';

export default function HashGenerator() {
  const [inputText, setInputText] = useState('');
  const [hashes, setHashes] = useState<Record<HashAlgorithm, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!inputText) return;

    setLoading(true);
    try {
      const result = await generateAllHashes(inputText);
      setHashes(result);
    } catch (error) {
      console.error('Hash generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (hash: string, algorithm: string) => {
    await navigator.clipboard.writeText(hash);
    setCopiedHash(algorithm);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setHashes(null);
  };

  return (
    <div className="space-y-6">
      <JSONTextarea
        value={inputText}
        onChange={setInputText}
        label="Text to Hash"
        placeholder="Enter text to generate hashes..."
        accept=".txt"
        minHeight="min-h-64"
      />

      <div className="flex gap-4">
        <Button onClick={handleGenerate} disabled={!inputText || loading}>
          {loading ? 'Generating...' : 'Generate Hashes'}
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {hashes && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">Generated Hashes</h3>
          {(Object.entries(hashes) as [HashAlgorithm, string][]).map(([algorithm, hash]) => (
            <div
              key={algorithm}
              className="bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-foreground">{algorithm}</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(hash, algorithm)}
                  className="flex items-center gap-2"
                >
                  {copiedHash === algorithm ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <code className="block font-mono text-xs bg-background p-3 rounded border border-border break-all">
                {hash}
              </code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

