'use client'

import { useState } from 'react'
import { Card } from '@/components/shared/Card'
import { Select } from '@/components/shared/Select'
import { Input } from '@/components/shared/Input'
import { Button } from '@/components/shared/Button'
import { Badge } from '@/components/shared/Badge'
import { getAllCountryCodes, getCountrySpec } from '@/lib/iban/countries'
import { calculateCheckDigits, validateChecksum } from '@/lib/iban/core'
import { formatIBANCountrySpecific } from '@/lib/iban/utils'

type CalculatorMode = 'calculate' | 'verify'

export function IBANCheckCalculator() {
  const [mode, setMode] = useState<CalculatorMode>('calculate')
  const [countryCode, setCountryCode] = useState('DE')
  const [bban, setBban] = useState('')
  const [calculatedCheckDigits, setCalculatedCheckDigits] = useState<string | null>(null)
  const [fullIBAN, setFullIBAN] = useState<string | null>(null)
  
  // Verify mode
  const [verifyIBAN, setVerifyIBAN] = useState('')
  const [verifyResult, setVerifyResult] = useState<{
    isValid: boolean;
    actualCheckDigits: string;
    expectedCheckDigits: string;
  } | null>(null)
  
  // Show calculation steps
  const [showSteps, setShowSteps] = useState(false)

  const countryCodes = getAllCountryCodes()
  const selectedCountry = getCountrySpec(countryCode)

  const handleCalculate = () => {
    if (!bban.trim()) return

    try {
      const checkDigits = calculateCheckDigits(countryCode, bban.trim())
      setCalculatedCheckDigits(checkDigits)
      
      const iban = countryCode + checkDigits + bban.trim()
      setFullIBAN(iban)
    } catch (error) {
      setCalculatedCheckDigits(null)
      setFullIBAN(null)
    }
  }

  const handleVerify = () => {
    const cleanIBAN = verifyIBAN.replace(/\s/g, '').toUpperCase()
    
    if (cleanIBAN.length < 15) {
      setVerifyResult(null)
      return
    }

    const actualCheckDigits = cleanIBAN.substring(2, 4)
    const country = cleanIBAN.substring(0, 2)
    const bbanPart = cleanIBAN.substring(4)
    
    const expectedCheckDigits = calculateCheckDigits(country, bbanPart)
    const isValid = validateChecksum(cleanIBAN)

    setVerifyResult({
      isValid,
      actualCheckDigits,
      expectedCheckDigits
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Calculate MOD-97 step by step for educational purposes
  const getCalculationSteps = () => {
    if (!bban.trim()) return []

    const steps: string[] = []
    const ibanWithZeros = countryCode + '00' + bban.trim()
    steps.push(`1. Start with country code + 00 + BBAN: ${ibanWithZeros}`)
    
    const rearranged = ibanWithZeros.substring(4) + ibanWithZeros.substring(0, 4)
    steps.push(`2. Move first 4 characters to end: ${rearranged}`)
    
    const numericString = rearranged.replace(/[A-Z]/g, (char) =>
      (char.charCodeAt(0) - 55).toString()
    )
    steps.push(`3. Replace letters with numbers (A=10, B=11, ...): ${numericString.substring(0, 50)}${numericString.length > 50 ? '...' : ''}`)
    
    // Calculate MOD 97
    let remainder = 0
    for (let i = 0; i < numericString.length; i++) {
      remainder = (remainder * 10 + parseInt(numericString[i], 10)) % 97
    }
    steps.push(`4. Calculate MOD 97: ${remainder}`)
    
    const checkDigit = 98 - remainder
    steps.push(`5. Check digits = 98 - ${remainder} = ${checkDigit}`)
    steps.push(`6. Final IBAN: ${countryCode}${checkDigit.toString().padStart(2, '0')}${bban.trim()}`)
    
    return steps
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Mode Selector */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={mode === 'calculate' ? 'primary' : 'secondary'}
          onClick={() => setMode('calculate')}
        >
          Calculate Check Digits
        </Button>
        <Button
          variant={mode === 'verify' ? 'primary' : 'secondary'}
          onClick={() => setMode('verify')}
        >
          Verify Check Digits
        </Button>
      </div>

      {/* Calculate Mode */}
      {mode === 'calculate' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Calculate Check Digits">
            <div className="space-y-4">
              <Select
                label="Country Code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                options={countryCodes.map(code => {
                  const country = getCountrySpec(code)
                  return {
                    value: code,
                    label: `${code} - ${country?.country || code}`
                  }
                })}
                helpText="Select the country"
              />

              <Input
                label="BBAN (Basic Bank Account Number)"
                value={bban}
                onChange={(e) => setBban(e.target.value.toUpperCase())}
                placeholder={selectedCountry ? `${selectedCountry.length - 4} characters` : 'Enter BBAN'}
                helpText={selectedCountry ? `Expected length: ${selectedCountry.length - 4} characters` : ''}
              />

              {selectedCountry && (
                <div className="text-xs text-gray-600 p-3 bg-blue-50 rounded">
                  <div className="font-semibold mb-1">Format: {selectedCountry.bbanFormat}</div>
                  <div>Example: {selectedCountry.example}</div>
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={handleCalculate} disabled={!bban.trim()}>
                  Calculate
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowSteps(!showSteps)}
                  disabled={!calculatedCheckDigits}
                >
                  {showSteps ? 'Hide' : 'Show'} Steps
                </Button>
              </div>
            </div>
          </Card>

          {calculatedCheckDigits && fullIBAN && (
            <Card title="Result">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded">
                  <div className="text-sm text-green-900 font-semibold mb-2">Check Digits</div>
                  <div className="text-4xl font-bold text-green-900 font-mono">{calculatedCheckDigits}</div>
                </div>

                <div className="p-4 bg-blue-50 rounded">
                  <div className="text-sm text-blue-900 font-semibold mb-2">Complete IBAN</div>
                  <div className="font-mono text-lg text-blue-900 break-all mb-2">
                    {formatIBANCountrySpecific(fullIBAN)}
                  </div>
                  <Button 
                    variant="secondary" 
                    onClick={() => copyToClipboard(formatIBANCountrySpecific(fullIBAN))}
                  >
                    Copy IBAN
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  <div className="font-semibold mb-1">IBAN Structure:</div>
                  <div className="font-mono text-xs bg-gray-100 p-2 rounded">
                    <span className="text-blue-600">{countryCode}</span>
                    <span className="text-green-600">{calculatedCheckDigits}</span>
                    <span className="text-gray-700">{bban}</span>
                  </div>
                  <div className="mt-2 text-xs">
                    <span className="text-blue-600">■</span> Country Code •
                    <span className="text-green-600">■</span> Check Digits •
                    <span className="text-gray-700">■</span> BBAN
                  </div>
                </div>
              </div>
            </Card>
          )}

          {showSteps && calculatedCheckDigits && (
            <div className="md:col-span-2">
              <Card title="MOD-97 Calculation Steps">
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-4">
                    The check digits are calculated using the MOD-97 algorithm as specified in ISO 13616:
                  </p>
                  {getCalculationSteps().map((step, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded">
                      <div className="font-mono text-sm break-all">{step}</div>
                    </div>
                  ))}
                  <div className="p-3 bg-green-50 border border-green-200 rounded mt-4">
                    <div className="text-sm font-semibold text-green-900">
                      ✓ The check digits ensure the IBAN is valid when MOD 97 of the entire number equals 1
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Verify Mode */}
      {mode === 'verify' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Verify Check Digits">
            <div className="space-y-4">
              <Input
                label="Complete IBAN"
                value={verifyIBAN}
                onChange={(e) => setVerifyIBAN(e.target.value.toUpperCase())}
                placeholder="e.g., DE89 3704 0044 0532 0130 00"
                helpText="Enter the full IBAN to verify its check digits"
              />

              <Button onClick={handleVerify} disabled={verifyIBAN.length < 15}>
                Verify Check Digits
              </Button>
            </div>
          </Card>

          {verifyResult && (
            <Card title="Verification Result">
              <div className="space-y-4">
                <div className={`p-4 rounded ${verifyResult.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {verifyResult.isValid ? (
                      <>
                        <span className="text-2xl">✓</span>
                        <span className="font-semibold text-green-900">Check Digits Valid</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl">✗</span>
                        <span className="font-semibold text-red-900">Check Digits Invalid</span>
                      </>
                    )}
                  </div>
                  <div className={`text-sm ${verifyResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
                    {verifyResult.isValid 
                      ? 'The check digits are correct and the IBAN passes MOD-97 validation.'
                      : 'The check digits are incorrect. The IBAN fails MOD-97 validation.'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-600 mb-1">Actual Check Digits</div>
                    <div className="text-2xl font-bold font-mono">{verifyResult.actualCheckDigits}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-600 mb-1">Expected Check Digits</div>
                    <div className="text-2xl font-bold font-mono">{verifyResult.expectedCheckDigits}</div>
                  </div>
                </div>

                {!verifyResult.isValid && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="text-sm font-semibold text-yellow-900 mb-1">⚠️ Correction Needed</div>
                    <div className="text-xs text-yellow-800">
                      The correct check digits should be <strong>{verifyResult.expectedCheckDigits}</strong> instead of {verifyResult.actualCheckDigits}.
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Educational Content */}
      <div className="mt-8">
        <Card title="About MOD-97 Algorithm">
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              The MOD-97 algorithm is used to calculate and verify IBAN check digits according to ISO 13616 standard.
            </p>
            
            <div>
              <div className="font-semibold text-gray-900 mb-2">How it works:</div>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Replace the check digits with "00" in the IBAN</li>
                <li>Move the first 4 characters to the end</li>
                <li>Replace each letter with its numeric equivalent (A=10, B=11, ..., Z=35)</li>
                <li>Calculate the remainder when divided by 97</li>
                <li>Subtract the remainder from 98 to get the check digits</li>
              </ol>
            </div>

            <div>
              <div className="font-semibold text-gray-900 mb-2">Verification:</div>
              <p>
                To verify an IBAN, perform the same calculation. If the final MOD 97 result equals 1, 
                the IBAN is valid.
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded">
              <div className="font-semibold text-blue-900 mb-1">💡 Why MOD-97?</div>
              <div className="text-blue-800 text-xs">
                The MOD-97 algorithm can detect up to 99% of transcription errors, including 
                single digit errors, transposition of adjacent digits, and most other common mistakes.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

