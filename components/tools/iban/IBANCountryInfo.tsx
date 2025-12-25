'use client'

import { useState } from 'react'
import { Card } from '@/components/shared/Card'
import { Input } from '@/components/shared/Input'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { IBAN_COUNTRIES, IBANCountrySpec, searchCountries, getSEPACountries } from '@/lib/iban/countries'

export function IBANCountryInfo() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<IBANCountrySpec | null>(null)
  const [showSEPAOnly, setShowSEPAOnly] = useState(false)

  const allCountries = Object.values(IBAN_COUNTRIES)
  const sepaCountries = getSEPACountries()

  const filteredCountries = searchQuery
    ? searchCountries(searchQuery)
    : (showSEPAOnly ? sepaCountries : allCountries)

  const sortedCountries = [...filteredCountries].sort((a, b) => 
    a.country.localeCompare(b.country)
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filter */}
      <Card title="Search Countries">
        <div className="space-y-4">
          <Input
            label="Search by country name or code"
            placeholder="e.g., Germany, DE, United Kingdom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showSEPAOnly}
                onChange={(e) => setShowSEPAOnly(e.target.checked)}
                className="rounded"
              />
              Show SEPA countries only ({sepaCountries.length})
            </label>
            <div className="text-sm text-gray-600">
              {sortedCountries.length} {sortedCountries.length === 1 ? 'country' : 'countries'} found
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Country List */}
        <div className="lg:col-span-1">
          <Card title="Countries">
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {sortedCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country)}
                  className={`w-full text-left p-3 rounded transition-colors ${
                    selectedCountry?.code === country.code
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{country.country}</div>
                      <div className="text-xs text-gray-600">{country.code}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="default" className="text-xs">{country.length}</Badge>
                      {country.sepa && <Badge variant="success" className="text-xs">SEPA</Badge>}
                    </div>
                  </div>
                </button>
              ))}
              {sortedCountries.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No countries found
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Country Details */}
        <div className="lg:col-span-2">
          {selectedCountry ? (
            <div className="space-y-6">
              <Card title={selectedCountry.country}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedCountry.country}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="info">{selectedCountry.code}</Badge>
                        {selectedCountry.sepa && <Badge variant="success">SEPA Member</Badge>}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-sm text-gray-600">IBAN Length</div>
                      <div className="text-xl font-semibold">{selectedCountry.length} characters</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">BBAN Format</div>
                      <div className="text-sm font-mono font-semibold">{selectedCountry.bbanFormat}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Bank Code Length</div>
                      <div className="text-xl font-semibold">{selectedCountry.bankIdentifier.length} characters</div>
                    </div>
                    {selectedCountry.branchIdentifier && (
                      <div>
                        <div className="text-sm text-gray-600">Branch Code Length</div>
                        <div className="text-xl font-semibold">{selectedCountry.branchIdentifier.length} characters</div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <Card title="IBAN Example">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Example IBAN:</div>
                    <div className="font-mono text-lg bg-gray-100 p-4 rounded break-all">
                      {selectedCountry.example}
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => copyToClipboard(selectedCountry.example)}
                      className="mt-2"
                    >
                      Copy Example
                    </Button>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="text-sm text-gray-600 mb-2">Structure Breakdown:</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-mono bg-blue-100 text-blue-900 px-2 py-1 rounded">
                          {selectedCountry.example.substring(0, 2)}
                        </span>
                        <div>
                          <div className="font-semibold">Country Code</div>
                          <div className="text-xs text-gray-600">{selectedCountry.country}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono bg-green-100 text-green-900 px-2 py-1 rounded">
                          {selectedCountry.example.replace(/\s/g, '').substring(2, 4)}
                        </span>
                        <div>
                          <div className="font-semibold">Check Digits</div>
                          <div className="text-xs text-gray-600">MOD-97 validation</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono bg-purple-100 text-purple-900 px-2 py-1 rounded text-xs">
                          {selectedCountry.example.replace(/\s/g, '').substring(
                            4,
                            4 + selectedCountry.bankIdentifier.length
                          )}
                        </span>
                        <div>
                          <div className="font-semibold">Bank Code</div>
                          <div className="text-xs text-gray-600">
                            Position {selectedCountry.bankIdentifier.position + 1}, 
                            Length {selectedCountry.bankIdentifier.length}
                          </div>
                        </div>
                      </div>
                      {selectedCountry.branchIdentifier && (
                        <div className="flex items-start gap-2">
                          <span className="font-mono bg-yellow-100 text-yellow-900 px-2 py-1 rounded text-xs">
                            {selectedCountry.example.replace(/\s/g, '').substring(
                              4 + selectedCountry.branchIdentifier.position,
                              4 + selectedCountry.branchIdentifier.position + selectedCountry.branchIdentifier.length
                            )}
                          </span>
                          <div>
                            <div className="font-semibold">Branch Code</div>
                            <div className="text-xs text-gray-600">
                              Position {selectedCountry.branchIdentifier.position + 1}, 
                              Length {selectedCountry.branchIdentifier.length}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Format Specification">
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">BBAN Format: {selectedCountry.bbanFormat}</div>
                    <div className="text-gray-600">
                      <div className="mb-2">Format legend:</div>
                      <ul className="space-y-1 ml-4">
                        <li><span className="font-mono bg-gray-100 px-1">n</span> = digits (0-9)</li>
                        <li><span className="font-mono bg-gray-100 px-1">a</span> = uppercase letters (A-Z)</li>
                        <li><span className="font-mono bg-gray-100 px-1">c</span> = alphanumeric characters (A-Z, 0-9)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="font-semibold text-gray-900 mb-2">Validation Pattern</div>
                    <div className="font-mono text-xs bg-gray-100 p-2 rounded break-all">
                      {selectedCountry.regex.toString()}
                    </div>
                  </div>

                  {selectedCountry.sepa && (
                    <div className="pt-3 border-t">
                      <div className="flex items-start gap-2 p-3 bg-green-50 rounded">
                        <Badge variant="success">SEPA</Badge>
                        <div className="text-xs text-green-800">
                          This country is part of the Single Euro Payments Area (SEPA), enabling 
                          standardized euro payments across participating countries.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ) : (
            <Card title="Select a Country">
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">🌍</div>
                <div className="text-lg font-semibold mb-2">Select a country from the list</div>
                <div className="text-sm">View detailed IBAN format specifications and examples</div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid md:grid-cols-4 gap-4">
        <Card title="Total Countries">
          <div className="text-3xl font-bold text-blue-600">{allCountries.length}</div>
          <div className="text-sm text-gray-600">IBAN supported</div>
        </Card>

        <Card title="SEPA Countries">
          <div className="text-3xl font-bold text-green-600">{sepaCountries.length}</div>
          <div className="text-sm text-gray-600">Euro payments area</div>
        </Card>

        <Card title="Shortest IBAN">
          <div className="text-3xl font-bold text-purple-600">15</div>
          <div className="text-sm text-gray-600">Norway (NO)</div>
        </Card>

        <Card title="Longest IBAN">
          <div className="text-3xl font-bold text-orange-600">31-32</div>
          <div className="text-sm text-gray-600">Malta, Seychelles</div>
        </Card>
      </div>
    </div>
  )
}

