'use client'

import { useState } from 'react'
import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { Select } from '@/components/shared/Select'
import { 
  formatIBAN, 
  formatIBANElectronic, 
  formatIBANCountrySpecific,
  convertToFormats,
  IBANFormats
} from '@/lib/iban/utils'
import { validateIBAN } from '@/lib/iban/core'

type FormatType = 'electronic' | 'print4' | 'print2' | 'country' | 'uppercase' | 'lowercase'

export function IBANFormatter() {
  const [input, setInput] = useState('')
  const [formatType, setFormatType] = useState<FormatType>('country')
  const [output, setOutput] = useState('')
  const [formats, setFormats] = useState<IBANFormats | null>(null)
  const [copied, setCopied] = useState(false)
  const [batchInput, setBatchInput] = useState('')
  const [batchOutput, setBatchOutput] = useState('')

  const handleFormat = () => {
    const lines = input.split('\n').filter(line => line.trim())
    const formatted = lines.map(line => {
      const trimmed = line.trim()
      if (trimmed.length < 15) return trimmed

      switch (formatType) {
        case 'electronic':
          return formatIBANElectronic(trimmed)
        case 'print4':
          return formatIBAN(trimmed, 4)
        case 'print2':
          return formatIBAN(trimmed, 2)
        case 'country':
          return formatIBANCountrySpecific(trimmed)
        case 'uppercase':
          return formatIBANElectronic(trimmed).toUpperCase()
        case 'lowercase':
          return formatIBANElectronic(trimmed).toLowerCase()
        default:
          return trimmed
      }
    })

    setOutput(formatted.join('\n'))

    // If single IBAN, show all formats
    if (lines.length === 1 && lines[0].trim().length >= 15) {
      const allFormats = convertToFormats(lines[0].trim())
      setFormats(allFormats)
    } else {
      setFormats(null)
    }
  }

  const handleBatchFormat = () => {
    const lines = batchInput.split('\n').filter(line => line.trim())
    const formatted = lines.map(line => {
      const trimmed = line.trim()
      if (trimmed.length < 15) return `${trimmed} (too short)`
      
      const validation = validateIBAN(trimmed)
      const formattedIban = formatIBANCountrySpecific(trimmed)
      
      return `${formattedIban} - ${validation.isValid ? '✓ Valid' : '✗ Invalid'}`
    })

    setBatchOutput(formatted.join('\n'))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setFormats(null)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Input Section */}
        <Card title="Input IBAN(s)">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter IBAN(s) - one per line
              </label>
              <textarea
                className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="GB29NWBK60161331926819&#10;DE89370400440532013000&#10;FR1420041010050500013M02606"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
              />
            </div>

            <Select
              label="Format Type"
              value={formatType}
              onChange={(e) => setFormatType(e.target.value as FormatType)}
              options={[
                { value: 'country', label: 'Country-Specific Format (Recommended)' },
                { value: 'electronic', label: 'Electronic Format (No Spaces)' },
                { value: 'print4', label: 'Print Format (4-char groups)' },
                { value: 'print2', label: 'Print Format (2-char groups)' },
                { value: 'uppercase', label: 'Uppercase (No Spaces)' },
                { value: 'lowercase', label: 'Lowercase (No Spaces)' },
              ]}
              helpText="Choose how to format your IBAN(s)"
            />

            <div className="flex gap-2">
              <Button onClick={handleFormat}>
                Format IBAN(s)
              </Button>
              <Button onClick={clearAll} variant="secondary">
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Output Section */}
        <Card title="Formatted Output">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formatted IBAN(s)
              </label>
              <textarea
                className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm"
                value={output}
                readOnly
                placeholder="Formatted IBANs will appear here..."
              />
            </div>

            {output && (
              <Button onClick={() => copyToClipboard(output)}>
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </Button>
            )}

            {input && !output && (
              <div className="text-sm text-gray-500 italic">
                Click "Format IBAN(s)" to see the result
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* All Formats Preview (Single IBAN) */}
      {formats && (
        <Card title="All Format Options">
          <div className="space-y-3">
            <div className="text-sm text-gray-600 mb-4">
              Preview your IBAN in different formats:
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded">
                <div className="text-xs font-semibold text-blue-900 mb-1">ELECTRONIC FORMAT</div>
                <div className="font-mono text-sm text-blue-900">{formats.electronic}</div>
                <div className="text-xs text-blue-700 mt-1">No spaces - used for electronic transactions</div>
                <Button
                  variant="secondary"
                  onClick={() => copyToClipboard(formats.electronic)}
                  className="mt-2"
                >
                  Copy
                </Button>
              </div>

              <div className="p-3 bg-green-50 rounded">
                <div className="text-xs font-semibold text-green-900 mb-1">COUNTRY-SPECIFIC FORMAT</div>
                <div className="font-mono text-sm text-green-900">{formats.countrySpecific}</div>
                <div className="text-xs text-green-700 mt-1">Formatted according to country standards</div>
                <Button
                  variant="secondary"
                  onClick={() => copyToClipboard(formats.countrySpecific)}
                  className="mt-2"
                >
                  Copy
                </Button>
              </div>

              <div className="p-3 bg-purple-50 rounded">
                <div className="text-xs font-semibold text-purple-900 mb-1">PRINT FORMAT (4-CHAR GROUPS)</div>
                <div className="font-mono text-sm text-purple-900">{formats.grouped4}</div>
                <div className="text-xs text-purple-700 mt-1">Standard print format with 4-character groups</div>
                <Button
                  variant="secondary"
                  onClick={() => copyToClipboard(formats.grouped4)}
                  className="mt-2"
                >
                  Copy
                </Button>
              </div>

              <div className="p-3 bg-orange-50 rounded">
                <div className="text-xs font-semibold text-orange-900 mb-1">PRINT FORMAT (2-CHAR GROUPS)</div>
                <div className="font-mono text-sm text-orange-900">{formats.grouped2}</div>
                <div className="text-xs text-orange-700 mt-1">Alternative format with 2-character groups</div>
                <Button
                  variant="secondary"
                  onClick={() => copyToClipboard(formats.grouped2)}
                  className="mt-2"
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Batch Formatter with Validation */}
      <div className="mt-8">
        <Card title="Batch Format with Validation">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Format multiple IBANs and validate them at the same time:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input IBANs (one per line)
                </label>
                <textarea
                  className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="GB29NWBK60161331926819&#10;DE89370400440532013000"
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value.toUpperCase())}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formatted & Validated
                </label>
                <textarea
                  className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-xs"
                  value={batchOutput}
                  readOnly
                  placeholder="Results will appear here..."
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleBatchFormat}>
                Format & Validate
              </Button>
              {batchOutput && (
                <Button onClick={() => copyToClipboard(batchOutput)} variant="secondary">
                  Copy Results
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Info Section */}
      <div className="mt-8">
        <Card title="Format Guidelines">
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <div className="font-semibold text-gray-900 mb-1">Electronic Format</div>
              <p>Used for electronic transactions and data processing. No spaces, uppercase letters only.</p>
              <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">GB29NWBK60161331926819</div>
            </div>

            <div>
              <div className="font-semibold text-gray-900 mb-1">Print Format</div>
              <p>Used for paper documents and human readability. Grouped with spaces.</p>
              <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">GB29 NWBK 6016 1331 9268 19</div>
            </div>

            <div>
              <div className="font-semibold text-gray-900 mb-1">Country-Specific Format</div>
              <p>Follows the official formatting rules for each country, which may vary in grouping.</p>
              <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">
                DE89 3704 0044 0532 0130 00 (Germany)<br />
                FR14 2004 1010 0505 0001 3M02 606 (France)
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded">
              <div className="font-semibold text-blue-900 mb-1">💡 Best Practice</div>
              <div className="text-blue-800 text-xs">
                Use electronic format for APIs and databases. Use print format for displaying to users 
                or on printed documents. Country-specific format is recommended for official communications.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

