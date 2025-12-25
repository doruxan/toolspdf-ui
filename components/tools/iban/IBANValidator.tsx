'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/shared/Input'
import { Card } from '@/components/shared/Card'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { validateIBAN, ValidationResult } from '@/lib/iban/core'
import { formatIBANCountrySpecific, getIBANDisplayParts } from '@/lib/iban/utils'

interface ValidationHistory {
  iban: string;
  isValid: boolean;
  timestamp: Date;
}

export function IBANValidator() {
  const [iban, setIban] = useState('')
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [history, setHistory] = useState<ValidationHistory[]>([])
  const [copiedIban, setCopiedIban] = useState(false)

  useEffect(() => {
    if (iban.length >= 15) {
      const validationResult = validateIBAN(iban)
      setResult(validationResult)
    } else {
      setResult(null)
    }
  }, [iban])

  const handleValidate = () => {
    if (!result) return
    
    // Add to history (keep last 5)
    const newEntry: ValidationHistory = {
      iban: iban.trim(),
      isValid: result.isValid,
      timestamp: new Date()
    }
    setHistory(prev => [newEntry, ...prev].slice(0, 5))
  }

  const copyToClipboard = () => {
    if (result?.isValid) {
      const formatted = formatIBANCountrySpecific(iban)
      navigator.clipboard.writeText(formatted)
      setCopiedIban(true)
      setTimeout(() => setCopiedIban(false), 2000)
    }
  }

  const displayParts = result?.isValid ? getIBANDisplayParts(iban) : null

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card title="Validate IBAN">
          <div className="space-y-4">
            <Input
              label="IBAN Number"
              placeholder="e.g., GB29 NWBK 6016 1331 9268 19"
              value={iban}
              onChange={(e) => setIban(e.target.value.toUpperCase())}
              helpText="Enter an IBAN to validate (with or without spaces)"
            />

            {result && (
              <div className="mt-4 p-4 rounded-lg border" style={{
                borderColor: result.isValid ? '#10b981' : '#ef4444',
                backgroundColor: result.isValid ? '#f0fdf4' : '#fef2f2'
              }}>
                <div className="flex items-center gap-2 mb-2">
                  {result.isValid ? (
                    <>
                      <span className="text-2xl">✓</span>
                      <span className="font-semibold text-green-800">Valid IBAN</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">✗</span>
                      <span className="font-semibold text-red-800">Invalid IBAN</span>
                    </>
                  )}
                </div>

                {result.errors.length > 0 && (
                  <ul className="text-sm space-y-1">
                    {result.errors.map((error, idx) => (
                      <li key={idx} className="text-red-700">• {error}</li>
                    ))}
                  </ul>
                )}

                {result.isValid && result.country && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="info">{result.country.code}</Badge>
                      <span className="text-sm font-medium">{result.country.country}</span>
                      {result.country.sepa && (
                        <Badge variant="success">SEPA</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Length: {result.country.length} characters</div>
                      <div>Format: {result.country.bbanFormat}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {result?.isValid && (
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="secondary">
                  {copiedIban ? '✓ Copied!' : 'Copy Formatted IBAN'}
                </Button>
                <Button onClick={handleValidate}>
                  Add to History
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Components Breakdown */}
        {displayParts && (
          <Card title="IBAN Components">
            <div className="space-y-3">
              <div className="text-sm text-gray-600 mb-4">
                Visual breakdown of your IBAN structure:
              </div>

              <div className={`p-3 rounded ${displayParts.countryCode.color}`}>
                <div className="font-mono font-bold text-lg">{displayParts.countryCode.value}</div>
                <div className="text-xs mt-1">{displayParts.countryCode.label}</div>
              </div>

              <div className={`p-3 rounded ${displayParts.checkDigits.color}`}>
                <div className="font-mono font-bold text-lg">{displayParts.checkDigits.value}</div>
                <div className="text-xs mt-1">{displayParts.checkDigits.label}</div>
                <div className="text-xs opacity-75">MOD-97 verified ✓</div>
              </div>

              <div className={`p-3 rounded ${displayParts.bankCode.color}`}>
                <div className="font-mono font-bold text-lg">{displayParts.bankCode.value}</div>
                <div className="text-xs mt-1">{displayParts.bankCode.label}</div>
              </div>

              {displayParts.branchCode && (
                <div className={`p-3 rounded ${displayParts.branchCode.color}`}>
                  <div className="font-mono font-bold text-lg">{displayParts.branchCode.value}</div>
                  <div className="text-xs mt-1">{displayParts.branchCode.label}</div>
                </div>
              )}

              <div className={`p-3 rounded ${displayParts.accountNumber.color}`}>
                <div className="font-mono font-bold text-lg break-all">{displayParts.accountNumber.value}</div>
                <div className="text-xs mt-1">{displayParts.accountNumber.label}</div>
              </div>

              {result?.country && (
                <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                  <div className="font-semibold mb-1">Example IBAN:</div>
                  <div className="font-mono text-xs">{result.country.example}</div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Validation History */}
        {history.length > 0 && (
          <Card title="Validation History">
            <div className="space-y-2">
              {history.map((entry, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs">{entry.iban.substring(0, 20)}...</span>
                    <Badge variant={entry.isValid ? 'success' : 'error'}>
                      {entry.isValid ? 'Valid' : 'Invalid'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {entry.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Info Section */}
        <Card title="About IBAN Validation">
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              An IBAN (International Bank Account Number) is an internationally agreed system 
              of identifying bank accounts across national borders.
            </p>
            <div>
              <div className="font-semibold text-gray-900 mb-1">What we check:</div>
              <ul className="space-y-1 ml-4">
                <li>✓ Country code validity (80+ countries supported)</li>
                <li>✓ Correct length for the country</li>
                <li>✓ MOD-97 checksum verification</li>
                <li>✓ Country-specific format rules</li>
                <li>✓ Character set validation</li>
              </ul>
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <div className="font-semibold text-blue-900 mb-1">💡 Tip</div>
              <div className="text-blue-800 text-xs">
                IBANs can be entered with or without spaces. We automatically format them 
                for you based on country-specific standards.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

