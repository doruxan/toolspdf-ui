'use client'

import { useState } from 'react'
import { Card } from '@/components/shared/Card'
import { Select } from '@/components/shared/Select'
import { Input } from '@/components/shared/Input'
import { Button } from '@/components/shared/Button'
import { Badge } from '@/components/shared/Badge'
import { ExportButtons } from '@/components/shared/ExportButtons'
import { 
  generateRandomIBAN, 
  generateMultipleIBANs, 
  generateIBANWithCodes,
  formatIBANCountrySpecific 
} from '@/lib/iban/utils'
import { getAllCountryCodes, getCountrySpec } from '@/lib/iban/countries'
import { validateIBAN } from '@/lib/iban/core'
import { exportToCSV } from '@/lib/exports/csv'
import { exportToJSON } from '@/lib/exports/json'

interface GeneratedIBAN {
  iban: string;
  formatted: string;
  country: string;
  isValid: boolean;
}

export function IBANGenerator() {
  const [countryCode, setCountryCode] = useState('DE')
  const [quantity, setQuantity] = useState(1)
  const [bankCode, setBankCode] = useState('')
  const [branchCode, setBranchCode] = useState('')
  const [useCustomCodes, setUseCustomCodes] = useState(false)
  const [generatedIBANs, setGeneratedIBANs] = useState<GeneratedIBAN[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const countryCodes = getAllCountryCodes()
  const selectedCountry = getCountrySpec(countryCode)

  const handleGenerate = () => {
    const ibans: GeneratedIBAN[] = []

    for (let i = 0; i < quantity; i++) {
      let iban: string | null

      if (useCustomCodes && (bankCode || branchCode)) {
        iban = generateIBANWithCodes(countryCode, bankCode, branchCode)
      } else {
        iban = generateRandomIBAN(countryCode)
      }

      if (iban) {
        const validation = validateIBAN(iban)
        ibans.push({
          iban,
          formatted: formatIBANCountrySpecific(iban),
          country: selectedCountry?.country || countryCode,
          isValid: validation.isValid
        })
      }
    }

    setGeneratedIBANs(ibans)
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const copyAll = () => {
    const allIBANs = generatedIBANs.map(item => item.formatted).join('\n')
    navigator.clipboard.writeText(allIBANs)
  }

  const handleExportCSV = () => {
    const data = generatedIBANs.map((item, idx) => ({
      index: idx + 1,
      iban: item.iban,
      formatted: item.formatted,
      country: item.country,
      valid: item.isValid ? 'Yes' : 'No'
    }))
    exportToCSV(data, 'generated-ibans')
  }

  const handleExportJSON = () => {
    exportToJSON(generatedIBANs, 'generated-ibans')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Configuration */}
        <Card title="Generator Settings" className="md:col-span-1">
          <div className="space-y-4">
            <Select
              label="Country"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              options={countryCodes.map(code => {
                const country = getCountrySpec(code)
                return {
                  value: code,
                  label: `${code} - ${country?.country || code}`
                }
              })}
              helpText="Select the country for IBAN generation"
            />

            <Input
              label="Quantity"
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              helpText="Generate 1-100 IBANs at once"
            />

            <div className="pt-4 border-t border-border">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                <input
                  type="checkbox"
                  checked={useCustomCodes}
                  onChange={(e) => setUseCustomCodes(e.target.checked)}
                  className="rounded"
                />
                Specify Bank/Branch Codes
              </label>

              {useCustomCodes && (
                <div className="space-y-3 pl-6">
                  <Input
                    label="Bank Code (Optional)"
                    value={bankCode}
                    onChange={(e) => setBankCode(e.target.value.toUpperCase())}
                    placeholder={selectedCountry ? `${selectedCountry.bankIdentifier.length} chars` : ''}
                    helpText={selectedCountry ? `Length: ${selectedCountry.bankIdentifier.length}` : ''}
                  />

                  {selectedCountry?.branchIdentifier && (
                    <Input
                      label="Branch Code (Optional)"
                      value={branchCode}
                      onChange={(e) => setBranchCode(e.target.value.toUpperCase())}
                      placeholder={`${selectedCountry.branchIdentifier.length} chars`}
                      helpText={`Length: ${selectedCountry.branchIdentifier.length}`}
                    />
                  )}
                </div>
              )}
            </div>

            <Button onClick={handleGenerate} className="w-full">
              Generate IBAN{quantity > 1 ? 's' : ''}
            </Button>
          </div>
        </Card>

        {/* Country Info */}
        <Card title="Country Information" className="md:col-span-2">
          {selectedCountry ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedCountry.country}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="info">{selectedCountry.code}</Badge>
                    {selectedCountry.sepa && <Badge variant="success">SEPA</Badge>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">IBAN Length</div>
                  <div className="font-semibold text-foreground">{selectedCountry.length} characters</div>
                </div>
                <div>
                  <div className="text-muted-foreground">BBAN Format</div>
                  <div className="font-mono text-xs text-foreground">{selectedCountry.bbanFormat}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Bank Code Length</div>
                  <div className="font-semibold text-foreground">{selectedCountry.bankIdentifier.length} characters</div>
                </div>
                {selectedCountry.branchIdentifier && (
                  <div>
                    <div className="text-muted-foreground">Branch Code Length</div>
                    <div className="font-semibold text-foreground">{selectedCountry.branchIdentifier.length} characters</div>
                  </div>
                )}
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Example IBAN:</div>
                <div className="font-mono text-sm bg-muted p-3 rounded break-all text-foreground">
                  {selectedCountry.example}
                </div>
              </div>

              <div className="text-xs text-muted-foreground pt-3 border-t border-border">
                <strong className="text-foreground">Format Legend:</strong> n = digits (0-9), a = letters (A-Z), c = alphanumeric (A-Z, 0-9)
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground">Select a country to see details</div>
          )}
        </Card>
      </div>

      {/* Generated IBANs */}
      {generatedIBANs.length > 0 && (
        <Card title={`Generated IBANs (${generatedIBANs.length})`}>
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={copyAll} variant="secondary">
                Copy All
              </Button>
              <ExportButtons
                onExportCSV={handleExportCSV}
                onExportJSON={handleExportJSON}
                onPrint={handlePrint}
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {generatedIBANs.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded hover:bg-muted/70 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-mono text-sm font-semibold text-foreground">{item.formatted}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.country} • {item.isValid ? (
                        <span className="text-green-600 dark:text-green-400">✓ Valid</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">✗ Invalid</span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => copyToClipboard(item.formatted, index)}
                  >
                    {copiedIndex === index ? '✓ Copied' : 'Copy'}
                  </Button>
                </div>
              ))}
            </div>

            {generatedIBANs.length >= 10 && (
              <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
                Showing {generatedIBANs.length} IBAN{generatedIBANs.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Info Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card title="About IBAN Generator">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Generate valid test IBANs for development, testing, and educational purposes. 
              All generated IBANs pass MOD-97 checksum validation.
            </p>
            <div>
              <div className="font-semibold text-foreground mb-1">Features:</div>
              <ul className="space-y-1 ml-4">
                <li>✓ Generate 1-100 IBANs at once</li>
                <li>✓ Support for 80+ countries</li>
                <li>✓ Custom bank/branch codes</li>
                <li>✓ Valid MOD-97 checksums</li>
                <li>✓ Export to CSV or JSON</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card title="Important Notice">
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-yellow-500/10 dark:bg-yellow-500/20 border border-yellow-500/30 rounded">
              <div className="font-semibold text-yellow-700 dark:text-yellow-300 mb-1">⚠️ Test Data Only</div>
              <div className="text-yellow-600 dark:text-yellow-400 text-xs">
                Generated IBANs are for testing and development purposes only. They are 
                mathematically valid but do not correspond to real bank accounts.
              </div>
            </div>

            <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 rounded">
              <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">💡 Use Cases</div>
              <div className="text-blue-600 dark:text-blue-400 text-xs">
                Perfect for software testing, API development, form validation testing, 
                educational demonstrations, and QA processes.
              </div>
            </div>

            <div className="p-3 bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 rounded">
              <div className="font-semibold text-red-700 dark:text-red-300 mb-1">🚫 Not for Production</div>
              <div className="text-red-600 dark:text-red-400 text-xs">
                Never use generated IBANs for actual financial transactions. Always use 
                real IBANs provided by legitimate financial institutions.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

