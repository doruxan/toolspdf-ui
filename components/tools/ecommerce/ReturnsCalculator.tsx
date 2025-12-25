'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/shared/Input'
import { Card } from '@/components/shared/Card'
import { ResultsPanel } from '@/components/shared/ResultsPanel'
import { Alert } from '@/components/shared/Alert'
import { ExportButtons } from '@/components/shared/ExportButtons'
import { calculateReturns, ReturnsInputs } from '@/lib/calculators/returns'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/formatting'
import { exportToCSV } from '@/lib/exports/csv'
import { exportToJSON } from '@/lib/exports/json'
import { printToPDF } from '@/lib/exports/pdf'

const DEFAULT_INPUTS: ReturnsInputs = {
  monthlyOrders: 500,
  averageOrderValue: 85,
  returnRate: 10,
  recoveryRate: 75,
  outboundShipping: 8,
  returnShippingCost: 6,
  processingCostPerReturn: 5,
  restockingFeePercent: 0
}

export function ReturnsCalculator() {
  const [inputs, setInputs] = useState<ReturnsInputs>(DEFAULT_INPUTS)
  const [results, setResults] = useState(calculateReturns(DEFAULT_INPUTS))
  
  useEffect(() => {
    setResults(calculateReturns(inputs))
  }, [inputs])
  
  const handleInputChange = (field: keyof ReturnsInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }))
  }
  
  const handleExportCSV = () => {
    const data = [
      { metric: 'Expected Returns', value: results.expectedReturns },
      { metric: 'Total Return Cost', value: results.totalReturnCost },
      { metric: 'Cost Per Return', value: results.costPerReturn },
      { metric: 'Cost Per Order', value: results.costPerOrder },
      { metric: 'Monthly Impact', value: results.monthlyImpact },
      { metric: 'Annual Impact', value: results.annualImpact }
    ]
    exportToCSV(data, 'returns-impact-calculation')
  }
  
  const handleExportJSON = () => {
    exportToJSON({ inputs, results }, 'returns-impact-calculation')
  }
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Order Volume & Returns">
          <div className="space-y-4">
            <Input label="Monthly Orders" type="number" value={inputs.monthlyOrders}
              onChange={(e) => handleInputChange('monthlyOrders', e.target.value)} />
            <Input label="Average Order Value" type="number" step="0.01" value={inputs.averageOrderValue}
              onChange={(e) => handleInputChange('averageOrderValue', e.target.value)} />
            <Input label="Return Rate (%)" type="number" step="0.1" value={inputs.returnRate}
              onChange={(e) => handleInputChange('returnRate', e.target.value)} />
            <Input label="Recovery Rate (%)" type="number" step="0.1" value={inputs.recoveryRate}
              onChange={(e) => handleInputChange('recoveryRate', e.target.value)}
              helpText="% of product value recovered through resale" />
          </div>
        </Card>
        
        <Card title="Return Costs">
          <div className="space-y-4">
            <Input label="Outbound Shipping Cost" type="number" step="0.01" value={inputs.outboundShipping}
              onChange={(e) => handleInputChange('outboundShipping', e.target.value)} />
            <Input label="Return Shipping Cost" type="number" step="0.01" value={inputs.returnShippingCost}
              onChange={(e) => handleInputChange('returnShippingCost', e.target.value)} />
            <Input label="Processing Cost Per Return" type="number" step="0.01" value={inputs.processingCostPerReturn}
              onChange={(e) => handleInputChange('processingCostPerReturn', e.target.value)} />
            <Input label="Restocking Fee (%)" type="number" step="0.1" value={inputs.restockingFeePercent}
              onChange={(e) => handleInputChange('restockingFeePercent', e.target.value)}
              helpText="Fee you charge customers" />
          </div>
        </Card>
      </div>
      
      <div id="returns-results" className="mt-6">
        <ResultsPanel title="Return Impact Analysis" results={[
          { label: 'Expected Returns (monthly)', value: formatNumber(results.expectedReturns, 0) },
          { label: 'Total Return Cost', value: formatCurrency(results.totalReturnCost), isHighlight: true },
          { label: 'Cost Per Return', value: formatCurrency(results.costPerReturn) },
          { label: 'Cost Per Order', value: formatCurrency(results.costPerOrder) },
          { label: 'Monthly Impact', value: formatCurrency(results.monthlyImpact) },
          { label: 'Annual Impact', value: formatCurrency(results.annualImpact), isHighlight: true }
        ]} />
      </div>
      
      <div className="mt-6">
        <Alert variant="info" title="Recommendations">
          <ul className="list-disc list-inside space-y-1">
            {results.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </Alert>
      </div>
      
      <div className="mt-6">
        <ExportButtons onExportCSV={handleExportCSV} onExportJSON={handleExportJSON} onPrint={() => printToPDF('returns-results')} />
      </div>
    </div>
  )
}

