'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/shared/Input'
import { Select } from '@/components/shared/Select'
import { Card } from '@/components/shared/Card'
import { ResultsPanel } from '@/components/shared/ResultsPanel'
import { ExportButtons } from '@/components/shared/ExportButtons'
import { calculateFees, FeesInputs } from '@/lib/calculators/fees'
import { formatCurrency, formatPercent } from '@/lib/utils/formatting'
import { exportToCSV } from '@/lib/exports/csv'
import { exportToJSON } from '@/lib/exports/json'
import { printToPDF } from '@/lib/exports/pdf'

const DEFAULT_INPUTS: FeesInputs = {
  orderValue: 100,
  plan: 'basic',
  processor: 'shopify_payments'
}

export function FeesCalculator() {
  const [inputs, setInputs] = useState<FeesInputs>(DEFAULT_INPUTS)
  const [results, setResults] = useState(calculateFees(DEFAULT_INPUTS))
  
  useEffect(() => {
    const newResults = calculateFees(inputs)
    setResults(newResults)
  }, [inputs])
  
  const handleInputChange = (field: keyof FeesInputs, value: string | number) => {
    if (field === 'orderValue') {
      setInputs(prev => ({ ...prev, [field]: parseFloat(value as string) || 0 }))
    } else {
      setInputs(prev => ({ ...prev, [field]: value }))
    }
  }
  
  const handleExportCSV = () => {
    const data = [
      { metric: 'Order Value', value: inputs.orderValue },
      { metric: 'Processing Fee %', value: results.processingFeePercent },
      { metric: 'Processing Fee Fixed', value: results.processingFeeFixed },
      { metric: 'Processing Fee Total', value: results.processingFeeTotal },
      { metric: 'Transaction Fee %', value: results.transactionFeePercent },
      { metric: 'Transaction Fee Total', value: results.transactionFeeTotal },
      { metric: 'Total Fees', value: results.totalFees },
      { metric: 'Effective Fee Rate %', value: results.effectiveFeeRate },
      { metric: 'Net Amount', value: results.netAmount }
    ]
    exportToCSV(data, 'shopify-fees-calculation')
  }
  
  const handleExportJSON = () => {
    exportToJSON({ inputs, results }, 'shopify-fees-calculation')
  }
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Order Details">
          <div className="space-y-4">
            <Input
              label="Order Value"
              type="number"
              step="0.01"
              value={inputs.orderValue}
              onChange={(e) => handleInputChange('orderValue', e.target.value)}
              helpText="Total order amount"
            />
            <Select
              label="Shopify Plan"
              value={inputs.plan}
              onChange={(e) => handleInputChange('plan', e.target.value)}
              options={[
                { value: 'basic', label: 'Basic Shopify' },
                { value: 'shopify', label: 'Shopify' },
                { value: 'advanced', label: 'Advanced Shopify' },
                { value: 'plus', label: 'Shopify Plus' }
              ]}
              helpText="Your current Shopify plan"
            />
            <Select
              label="Payment Processor"
              value={inputs.processor}
              onChange={(e) => handleInputChange('processor', e.target.value)}
              options={[
                { value: 'shopify_payments', label: 'Shopify Payments' },
                { value: 'third_party', label: 'Third-party Gateway' }
              ]}
              helpText="Payment gateway you're using"
            />
          </div>
        </Card>
        
        <div id="fees-results">
          <ResultsPanel
            title="Fee Breakdown"
            results={[
              { 
                label: 'Processing Fee Rate', 
                value: `${results.processingFeePercent}% + ${formatCurrency(results.processingFeeFixed)}` 
              },
              { 
                label: 'Processing Fee Total', 
                value: formatCurrency(results.processingFeeTotal),
                helpText: 'Credit card processing fees'
              },
              { label: 'Transaction Fee Rate', value: `${results.transactionFeePercent}%` },
              { 
                label: 'Transaction Fee Total', 
                value: formatCurrency(results.transactionFeeTotal),
                helpText: 'Additional fee for third-party gateways'
              },
              { 
                label: 'Total Fees', 
                value: formatCurrency(results.totalFees), 
                isHighlight: true 
              },
              { 
                label: 'Effective Fee Rate', 
                value: formatPercent(results.effectiveFeeRate),
                helpText: 'Total fees as % of order value'
              },
              { 
                label: 'Net Amount (after fees)', 
                value: formatCurrency(results.netAmount),
                isHighlight: true
              }
            ]}
          />
        </div>
      </div>
      
      <div className="mt-6">
        <ExportButtons
          onExportCSV={handleExportCSV}
          onExportJSON={handleExportJSON}
          onPrint={() => printToPDF('fees-results')}
        />
      </div>
    </div>
  )
}

