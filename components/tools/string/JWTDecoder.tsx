'use client';

import { useState } from 'react';
import { decodeBase64 } from '@/lib/string/encoders';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { AlertTriangle } from 'lucide-react';

export default function JWTDecoder() {
  const [jwtToken, setJwtToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    setError(null);
    setHeader('');
    setPayload('');

    if (!jwtToken.trim()) return;

    try {
      const parts = jwtToken.trim().split('.');
      
      if (parts.length !== 3) {
        setError('Invalid JWT format. A valid JWT has 3 parts separated by dots.');
        return;
      }

      // Decode header
      const decodedHeader = decodeBase64(parts[0]);
      const headerObj = JSON.parse(decodedHeader);
      setHeader(JSON.stringify(headerObj, null, 2));

      // Decode payload
      const decodedPayload = decodeBase64(parts[1]);
      const payloadObj = JSON.parse(decodedPayload);
      setPayload(JSON.stringify(payloadObj, null, 2));

    } catch (err) {
      setError('Failed to decode JWT. Make sure it\'s a valid JWT token.');
    }
  };

  const handleClear = () => {
    setJwtToken('');
    setHeader('');
    setPayload('');
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-yellow-900 dark:text-yellow-300 mb-1">Security Note</h4>
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              This tool only decodes and displays JWT contents. It does NOT verify signatures or validate tokens.
              Never share sensitive tokens publicly.
            </p>
          </div>
        </div>
      </div>

      <JSONTextarea
        value={jwtToken}
        onChange={setJwtToken}
        label="JWT Token"
        placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
        accept=".txt,.jwt"
        minHeight="min-h-32"
      />

      <div className="flex gap-4">
        <Button onClick={handleDecode} disabled={!jwtToken.trim()}>
          Decode JWT
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

      {header && (
        <div>
          <h3 className="text-lg font-bold text-foreground mb-2">Header</h3>
          <JSONTextarea
            value={header}
            onChange={() => {}}
            readOnly
            minHeight="min-h-48"
          />
        </div>
      )}

      {payload && (
        <div>
          <h3 className="text-lg font-bold text-foreground mb-2">Payload</h3>
          <JSONTextarea
            value={payload}
            onChange={() => {}}
            readOnly
            minHeight="min-h-64"
          />
        </div>
      )}
    </div>
  );
}

