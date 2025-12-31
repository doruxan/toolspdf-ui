'use client';

import { useState } from 'react';
import { generatePassword, estimatePasswordStrength, type PasswordOptions } from '@/lib/string/generators';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { RefreshCw, Shield, AlertTriangle } from 'lucide-react';

export default function PasswordGenerator() {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [count, setCount] = useState(5);

  const handleGenerate = () => {
    try {
      const generated = Array.from({ length: Math.min(count, 100) }, () =>
        generatePassword(options)
      );
      setPasswords(generated);
    } catch (error) {
      console.error('Password generation failed:', error);
    }
  };

  const handleClear = () => {
    setPasswords([]);
  };

  const outputText = passwords.join('\n');
  
  // Estimate strength of first password
  const firstPassword = passwords[0];
  const strength = firstPassword ? estimatePasswordStrength(firstPassword) : null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Password Options</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Password Length"
              value={options.length}
              onChange={(e) => setOptions({ ...options, length: Math.max(4, Math.min(128, parseInt(e.target.value) || 4)) })}
              min={4}
              max={128}
            />
            <Input
              type="number"
              label="Number of Passwords"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              min={1}
              max={100}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.uppercase}
                onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.lowercase}
                onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.numbers}
                onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.symbols}
                onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Symbols (!@#)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleGenerate}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate Passwords
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {strength && (
        <div className="bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold">Password Strength: {strength.label}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all ${
                strength.score >= 7 ? 'bg-green-500' :
                strength.score >= 5 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${(strength.score / 8) * 100}%` }}
            />
          </div>
          {strength.feedback.length > 0 && (
            <div className="text-xs text-muted-foreground">
              Suggestions: {strength.feedback.join(', ')}
            </div>
          )}
        </div>
      )}

      {passwords.length > 0 && (
        <>
          <JSONTextarea
            value={outputText}
            onChange={() => {}}
            label={`Generated Passwords (${passwords.length})`}
            readOnly
            minHeight="min-h-96"
          />
          
          <Button
            variant="secondary"
            onClick={() => navigator.clipboard.writeText(outputText)}
          >
            Copy All Passwords
          </Button>
        </>
      )}

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-yellow-900 dark:text-yellow-300 mb-1">Security Note</h4>
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              All passwords are generated locally in your browser using cryptographically strong random numbers.
              Never share your passwords, and consider using a password manager.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

