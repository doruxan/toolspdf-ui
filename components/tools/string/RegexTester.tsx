'use client';

import { useState } from 'react';
import { testRegex, COMMON_PATTERNS, type RegexMatch } from '@/lib/string/regex';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('');
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleTest = () => {
    setError(null);
    setMatches([]);

    if (!pattern || !testText) return;

    const result = testRegex(pattern, testText, flags);

    if (result.isValid) {
      setMatches(result.matches);
    } else {
      setError(result.error || 'Invalid regex');
    }
  };

  const handleUseCommonPattern = (patternName: keyof typeof COMMON_PATTERNS) => {
    const commonPattern = COMMON_PATTERNS[patternName];
    setPattern(commonPattern.pattern);
  };

  const handleClear = () => {
    setPattern('');
    setTestText('');
    setMatches([]);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Regular Expression</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <Input
              type="text"
              label="Pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
            />
          </div>
          <Input
            type="text"
            label="Flags"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g, i, m, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Common Patterns</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(COMMON_PATTERNS).map(([key, { description }]) => (
              <Button
                key={key}
                variant="secondary"
                size="sm"
                onClick={() => handleUseCommonPattern(key as keyof typeof COMMON_PATTERNS)}
              >
                {description}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <JSONTextarea
        value={testText}
        onChange={setTestText}
        label="Test Text"
        placeholder="Enter text to test against the regex..."
        accept=".txt"
        minHeight="min-h-48"
      />

      <div className="flex gap-4">
        <Button onClick={handleTest} disabled={!pattern || !testText}>
          Test Regex
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg border-2 border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      {matches.length > 0 && (
        <div className="bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Matches ({matches.length})
          </h3>
          <div className="space-y-3">
            {matches.map((match, index) => (
              <div key={index} className="bg-background border border-border rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-foreground">Match {index + 1}</span>
                  <span className="text-xs text-muted-foreground">Index: {match.index}</span>
                </div>
                <code className="block bg-primary/10 p-2 rounded text-sm break-all">
                  {match.match}
                </code>
                {match.groups.length > 0 && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    Groups: {match.groups.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {testText && pattern && matches.length === 0 && !error && (
        <div className="px-4 py-3 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-lg border-2 border-yellow-200 dark:border-yellow-800">
          No matches found.
        </div>
      )}
    </div>
  );
}

