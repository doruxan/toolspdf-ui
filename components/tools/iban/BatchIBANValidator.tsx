'use client'

import { useState } from 'react'
import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { Badge } from '@/components/shared/Badge'
import { Select } from '@/components/shared/Select'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { ExportButtons } from '@/components/shared/ExportButtons'
import { validateIBANBatch, getBatchSummary, BatchValidationResult } from '@/lib/iban/core'
import { formatIBANCountrySpecific } from '@/lib/iban/utils'
import { exportToCSV } from '@/lib/exports/csv'
import { exportToJSON } from '@/lib/exports/json'

type FilterType = 'all' | 'valid' | 'invalid'

export function BatchIBANValidator() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<BatchValidationResult[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleValidate = async () => {
    setIsProcessing(true)
    setProgress(0)
    setResults([])

    // Parse input - split by lines and filter empty
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0)
    
    if (lines.length === 0) {
      setIsProcessing(false)
      return
    }

    // Limit to 1000 IBANs
    const ibansToValidate = lines.slice(0, 1000)
    
    // Process in chunks for better UX
    const chunkSize = 50
    const allResults: BatchValidationResult[] = []

    for (let i = 0; i < ibansToValidate.length; i += chunkSize) {
      const chunk = ibansToValidate.slice(i, i + chunkSize)
      const chunkResults = validateIBANBatch(chunk)
      allResults.push(...chunkResults)
      
      setProgress(Math.round((allResults.length / ibansToValidate.length) * 100))
      
      // Allow UI to update
      await new Promise(resolve => setTimeout(resolve, 10))
    }

    setResults(allResults)
    setIsProcessing(false)
    setProgress(100)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      
      // Try to parse as CSV
      const lines = text.split('\n')
      const ibans: string[] = []

      lines.forEach(line => {
        // Simple CSV parsing - look for IBAN-like patterns
        const parts = line.split(/[,;\t]/)
        parts.forEach(part => {
          const trimmed = part.trim().replace(/['"]/g, '')
          if (trimmed.length >= 15 && /^[A-Z]{2}\d{2}/.test(trimmed)) {
            ibans.push(trimmed)
          }
        })
      })

      setInput(ibans.join('\n'))
    }
    reader.readAsText(file)
  }

  const summary = results.length > 0 ? getBatchSummary(results) : null

  const filteredResults = results.filter(result => {
    if (filter === 'valid') return result.result.isValid
    if (filter === 'invalid') return !result.result.isValid
    return true
  })

  const handleExportCSV = () => {
    const data = results.map(item => ({
      iban: item.iban,
      formatted: formatIBANCountrySpecific(item.iban),
      status: item.result.isValid ? 'Valid' : 'Invalid',
      country: item.result.country?.country || 'Unknown',
      countryCode: item.result.country?.code || '',
      errors: item.result.errors.join('; '),
      sepa: item.result.country?.sepa ? 'Yes' : 'No'
    }))
    exportToCSV(data, 'batch-iban-validation')
  }

  const handleExportJSON = () => {
    const data = results.map(item => ({
      iban: item.iban,
      formatted: formatIBANCountrySpecific(item.iban),
      isValid: item.result.isValid,
      country: item.result.country?.country,
      countryCode: item.result.country?.code,
      errors: item.result.errors,
      components: item.result.components
    }))
    exportToJSON(data, 'batch-iban-validation')
  }

  const handlePrint = () => {
    window.print()
  }

  const clearAll = () => {
    setInput('')
    setResults([])
    setProgress(0)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Input Section */}
      <Card title="Batch IBAN Validation">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter IBANs (one per line, max 1000)
            </label>
            <textarea
              className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="GB29NWBK60161331926819&#10;DE89370400440532013000&#10;FR1420041010050500013M02606&#10;..."
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              disabled={isProcessing}
            />
            <div className="text-xs text-gray-500 mt-1">
              {input.split('\n').filter(l => l.trim()).length} IBAN(s) entered
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or upload CSV file
              </label>
              <input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="text-sm"
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleValidate} disabled={isProcessing || !input.trim()}>
              {isProcessing ? 'Validating...' : 'Validate All'}
            </Button>
            <Button onClick={clearAll} variant="secondary" disabled={isProcessing}>
              Clear
            </Button>
          </div>

          {isProcessing && (
            <div className="mt-4">
              <ProgressBar progress={progress} />
              <div className="text-sm text-gray-600 text-center mt-2">
                Processing... {progress}%
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Summary Statistics */}
      {summary && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card title="Total">
            <div className="text-3xl font-bold text-gray-900">{summary.total}</div>
            <div className="text-sm text-gray-600">IBANs processed</div>
          </Card>

          <Card title="Valid">
            <div className="text-3xl font-bold text-green-600">{summary.valid}</div>
            <div className="text-sm text-gray-600">{summary.validPercentage.toFixed(1)}% valid</div>
          </Card>

          <Card title="Invalid">
            <div className="text-3xl font-bold text-red-600">{summary.invalid}</div>
            <div className="text-sm text-gray-600">{(100 - summary.validPercentage).toFixed(1)}% invalid</div>
          </Card>

          <Card title="Success Rate">
            <div className="text-3xl font-bold text-blue-600">{summary.validPercentage.toFixed(0)}%</div>
            <div className="text-sm text-gray-600">validation rate</div>
          </Card>
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <div className="mt-6">
          <Card title="Validation Results">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Select
                  label="Filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as FilterType)}
                  options={[
                    { value: 'all', label: `All (${results.length})` },
                    { value: 'valid', label: `Valid (${summary?.valid || 0})` },
                    { value: 'invalid', label: `Invalid (${summary?.invalid || 0})` }
                  ]}
                />

                <ExportButtons
                  onExportCSV={handleExportCSV}
                  onExportJSON={handleExportJSON}
                  onPrint={handlePrint}
                />
              </div>

              <div className="overflow-x-auto">
                <div className="max-h-96 overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IBAN</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredResults.map((result, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {results.indexOf(result) + 1}
                          </td>
                          <td className="px-4 py-3 text-sm font-mono">
                            {formatIBANCountrySpecific(result.iban).substring(0, 30)}
                            {result.iban.length > 30 && '...'}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {result.result.country ? (
                              <div>
                                <div className="font-medium">{result.result.country.code}</div>
                                <div className="text-xs text-gray-500">{result.result.country.country}</div>
                              </div>
                            ) : (
                              <span className="text-gray-400">Unknown</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant={result.result.isValid ? 'success' : 'error'}>
                              {result.result.isValid ? 'Valid' : 'Invalid'}
                            </Badge>
                            {result.result.country?.sepa && result.result.isValid && (
                              <Badge variant="info" className="ml-1">SEPA</Badge>
                            )}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600">
                            {result.result.errors.length > 0 ? (
                              <div className="max-w-xs">
                                {result.result.errors[0]}
                                {result.result.errors.length > 1 && (
                                  <span className="text-gray-400"> +{result.result.errors.length - 1} more</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-green-600">✓ All checks passed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {filteredResults.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No results match the current filter
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Info Section */}
      {results.length === 0 && (
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <Card title="How to Use">
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                Validate multiple IBANs at once for efficient processing:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Paste IBANs into the text area (one per line)</li>
                <li>Or upload a CSV file containing IBANs</li>
                <li>Click "Validate All" to process up to 1000 IBANs</li>
                <li>Review results with filtering options</li>
                <li>Export validated data to CSV or JSON</li>
              </ol>
            </div>
          </Card>

          <Card title="Features">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Validate up to 1000 IBANs at once</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>CSV file upload support</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Real-time progress tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Filter by valid/invalid status</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Detailed error messages</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Export results to CSV or JSON</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Summary statistics</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

