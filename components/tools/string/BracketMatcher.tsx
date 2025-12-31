'use client';

import { useState, useEffect } from 'react';
import { checkBrackets, type BracketMatch } from '@/lib/string/unicode';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function BracketMatcher() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<BracketMatch | null>(null);

  useEffect(() => {
    if (inputText) {
      const matchResult = checkBrackets(inputText);
      setResult(matchResult);
    } else {
      setResult(null);
    }
  }, [inputText]);

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <JSONTextarea
        value={inputText}
        onChange={setInputText}
        label="Text to Check"
        placeholder="Enter text with brackets to check if they're balanced..."
        accept=".txt"
        minHeight="min-h-64"
      />

      <Button variant="secondary" onClick={handleClear}>
        Clear
      </Button>

      {result && (
        <div
          className={`border-2 rounded-lg p-6 ${
            result.isBalanced
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            {result.isBalanced ? (
              <>
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-300">
                    Brackets are Balanced!
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    All brackets, parentheses, and braces are properly matched.
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                <div>
                  <h3 className="text-lg font-bold text-red-900 dark:text-red-300">
                    Brackets are Not Balanced
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Found {result.errors.length} error{result.errors.length !== 1 ? 's' : ''}:
                  </p>
                </div>
              </>
            )}
          </div>

          {!result.isBalanced && result.errors.length > 0 && (
            <div className="space-y-2 mt-4">
              {result.errors.map((error, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 bg-background/50 rounded p-3"
                >
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-900 dark:text-red-300">
                    <span className="font-mono">{error.message}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">Supported Brackets</h4>
        <p className="text-sm text-blue-800 dark:text-blue-400 font-mono">
          ( ) Round Parentheses | [ ] Square Brackets | {'{'}  {'}'} Curly Braces | &lt; &gt; Angle Brackets
        </p>
      </div>
    </div>
  );
}

