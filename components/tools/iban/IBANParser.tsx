'use client'

import { useState } from 'react'
import { Input } from '@/components/shared/Input'
import { Card } from '@/components/shared/Card'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { parseIBAN, ParsedIBAN } from '@/lib/iban/utils'
import { validateIBAN } from '@/lib/iban/core'

export function IBANParser() {
  const [iban, setIban] = useState('')
  const [parsed, setParsed] = useState<ParsedIBAN | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleParse = () => {
    if (iban.length >= 15) {
      const result = parseIBAN(iban)
      setParsed(result)
    }
  }

  const copyField = (field: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const validation = iban.length >= 15 ? validateIBAN(iban) : null

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card title="Parse IBAN">
          <div className="space-y-4">
            <Input
              label="IBAN Number"
              placeholder="e.g., DE89 3704 0044 0532 0130 00"
              value={iban}
              onChange={(e) => setIban(e.target.value.toUpperCase())}
              helpText="Enter an IBAN to extract its components"
            />

            <Button onClick={handleParse} disabled={iban.length < 15}>
              Parse IBAN
            </Button>

            {validation && !validation.isValid && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                ⚠️ This IBAN may be invalid. Parser will still extract components.
              </div>
            )}
          </div>
        </Card>

        {/* Parsed Components */}
        {parsed && (
          <>
            <Card title="IBAN Components">
              <div className="space-y-3">
                {/* Country Code */}
                <div className="p-3 bg-blue-50 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-blue-900">COUNTRY CODE</span>
                    <Button
                      variant="secondary"
                      onClick={() => copyField('country', parsed.countryCode)}
                    >
                      {copiedField === 'country' ? '✓' : 'Copy'}
                    </Button>
                  </div>
                  <div className="font-mono text-xl font-bold text-blue-900">{parsed.countryCode}</div>
                  {parsed.country && (
                    <div className="text-sm text-blue-800 mt-1">{parsed.country.country}</div>
                  )}
                </div>

                {/* Check Digits */}
                <div className="p-3 bg-green-50 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-green-900">CHECK DIGITS</span>
                    <Button
                      variant="secondary"
                      onClick={() => copyField('check', parsed.checkDigits)}
                    >
                      {copiedField === 'check' ? '✓' : 'Copy'}
                    </Button>
                  </div>
                  <div className="font-mono text-xl font-bold text-green-900">{parsed.checkDigits}</div>
                  <div className="text-xs text-green-800 mt-1">MOD-97 validation digits</div>
                </div>

                {/* Bank Code */}
                {parsed.bankIdentifier && (
                  <div className="p-3 bg-purple-50 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-purple-900">BANK CODE</span>
                      <Button
                        variant="secondary"
                        onClick={() => copyField('bank', parsed.bankIdentifier!)}
                      >
                        {copiedField === 'bank' ? '✓' : 'Copy'}
                      </Button>
                    </div>
                    <div className="font-mono text-xl font-bold text-purple-900">{parsed.bankIdentifier}</div>
                    <div className="text-xs text-purple-800 mt-1">Identifies the financial institution</div>
                  </div>
                )}

                {/* Branch Code */}
                {parsed.branchIdentifier && (
                  <div className="p-3 bg-yellow-50 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-yellow-900">BRANCH CODE</span>
                      <Button
                        variant="secondary"
                        onClick={() => copyField('branch', parsed.branchIdentifier!)}
                      >
                        {copiedField === 'branch' ? '✓' : 'Copy'}
                      </Button>
                    </div>
                    <div className="font-mono text-xl font-bold text-yellow-900">{parsed.branchIdentifier}</div>
                    <div className="text-xs text-yellow-800 mt-1">Identifies the branch location</div>
                  </div>
                )}

                {/* Account Number */}
                {parsed.accountNumber && (
                  <div className="p-3 bg-orange-50 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-orange-900">ACCOUNT NUMBER</span>
                      <Button
                        variant="secondary"
                        onClick={() => copyField('account', parsed.accountNumber!)}
                      >
                        {copiedField === 'account' ? '✓' : 'Copy'}
                      </Button>
                    </div>
                    <div className="font-mono text-lg font-bold text-orange-900 break-all">{parsed.accountNumber}</div>
                    <div className="text-xs text-orange-800 mt-1">Individual account identifier</div>
                  </div>
                )}

                {/* BBAN */}
                <div className="p-3 bg-gray-50 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-900">BBAN (Basic Bank Account Number)</span>
                    <Button
                      variant="secondary"
                      onClick={() => copyField('bban', parsed.bban)}
                    >
                      {copiedField === 'bban' ? '✓' : 'Copy'}
                    </Button>
                  </div>
                  <div className="font-mono text-sm font-bold text-gray-900 break-all">{parsed.bban}</div>
                  <div className="text-xs text-gray-600 mt-1">Country-specific account identifier</div>
                </div>
              </div>
            </Card>

            {/* Country Information */}
            {parsed.country && (
              <Card title="Country Information">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{parsed.country.code}</span>
                    <div>
                      <div className="font-semibold">{parsed.country.country}</div>
                      <div className="text-sm text-gray-600">Country Code: {parsed.country.code}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-600">IBAN Length</div>
                      <div className="font-semibold">{parsed.country.length} characters</div>
                    </div>
                    <div>
                      <div className="text-gray-600">SEPA Member</div>
                      <div className="font-semibold">
                        {parsed.country.sepa ? (
                          <Badge variant="success">Yes</Badge>
                        ) : (
                          <Badge variant="default">No</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-600 text-sm mb-1">BBAN Format</div>
                    <div className="font-mono text-sm bg-gray-100 p-2 rounded">{parsed.country.bbanFormat}</div>
                  </div>

                  <div>
                    <div className="text-gray-600 text-sm mb-1">Example IBAN</div>
                    <div className="font-mono text-xs bg-gray-100 p-2 rounded break-all">{parsed.country.example}</div>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="text-xs text-gray-600">
                      <strong>Format Legend:</strong><br />
                      n = digits (0-9)<br />
                      a = uppercase letters (A-Z)<br />
                      c = alphanumeric (A-Z, 0-9)
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Visual Diagram */}
            <Card title="IBAN Structure Diagram">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-3">
                  Visual representation of how your IBAN is structured:
                </div>

                <div className="font-mono text-sm break-all bg-gray-50 p-4 rounded">
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-blue-200 text-blue-900 rounded">{parsed.countryCode}</span>
                    <span className="px-2 py-1 bg-green-200 text-green-900 rounded">{parsed.checkDigits}</span>
                    {parsed.bankIdentifier && (
                      <span className="px-2 py-1 bg-purple-200 text-purple-900 rounded">{parsed.bankIdentifier}</span>
                    )}
                    {parsed.branchIdentifier && (
                      <span className="px-2 py-1 bg-yellow-200 text-yellow-900 rounded">{parsed.branchIdentifier}</span>
                    )}
                    {parsed.accountNumber && (
                      <span className="px-2 py-1 bg-orange-200 text-orange-900 rounded">{parsed.accountNumber}</span>
                    )}
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-blue-200 rounded"></span>
                    <span>Country Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-green-200 rounded"></span>
                    <span>Check Digits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-purple-200 rounded"></span>
                    <span>Bank Code</span>
                  </div>
                  {parsed.branchIdentifier && (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-yellow-200 rounded"></span>
                      <span>Branch Code</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-orange-200 rounded"></span>
                    <span>Account Number</span>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Info Section */}
        {!parsed && (
          <Card title="About IBAN Parser">
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                The IBAN Parser extracts and displays all components of an International Bank Account Number.
              </p>
              <div>
                <div className="font-semibold text-gray-900 mb-1">What you'll see:</div>
                <ul className="space-y-1 ml-4">
                  <li>✓ Country code and name</li>
                  <li>✓ Check digits (MOD-97 validation)</li>
                  <li>✓ Bank identifier code</li>
                  <li>✓ Branch code (if applicable)</li>
                  <li>✓ Account number</li>
                  <li>✓ BBAN (Basic Bank Account Number)</li>
                </ul>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <div className="font-semibold text-blue-900 mb-1">💡 Use Cases</div>
                <div className="text-blue-800 text-xs">
                  Perfect for understanding IBAN structure, extracting bank codes for routing, 
                  or educational purposes to learn about international banking standards.
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

