'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/shared/Input'
import { Card } from '@/components/shared/Card'
import { ResultsPanel } from '@/components/shared/ResultsPanel'
import { ExportButtons } from '@/components/shared/ExportButtons'
import { calculateRoas, RoasInputs } from '@/lib/calculators/roas'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/formatting'
import { exportToCSV } from '@/lib/exports/csv'
import { exportToJSON } from '@/lib/exports/json'
import { printToPDF } from '@/lib/exports/pdf'

const DEFAULT_INPUTS: RoasInputs = {
  averageOrderValue: 100,
  cogs: 30,
  shippingCost: 8,
  paymentFees: 3.2,
  otherVariableCosts: 2,
  discountPercent: 10,
  refundRate: 5,
  desiredProfitMargin: 15
}

export function RoasCalculator() {
  const [inputs, setInputs] = useState<RoasInputs>(DEFAULT_INPUTS)
  const [results, setResults] = useState(calculateRoas(DEFAULT_INPUTS))
  
  useEffect(() => {
    setResults(calculateRoas(inputs))
  }, [inputs])
  
  const handleInputChange = (field: keyof RoasInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }))
  }
  
  const handleExportCSV = () => {
    const data = [
      { metric: 'Revenue', value: results.revenue },
      { metric: 'Net Revenue', value: results.netRevenue },
      { metric: 'Contribution Margin', value: results.contributionMargin },
      { metric: 'Contribution Margin %', value: results.contributionMarginPercent },
      { metric: 'Break-even ROAS', value: results.breakEvenRoas },
      { metric: 'Target ROAS', value: results.targetRoas },
      { metric: 'Max CPA', value: results.maxCPA },
      { metric: 'Max CPA with Profit', value: results.maxCPAWithProfit }
    ]
    exportToCSV(data, 'roas-calculation')
  }
  
  const handleExportJSON = () => {
    exportToJSON({ inputs, results }, 'roas-calculation')
  }
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Revenue & Costs">
          <div className="space-y-4">
            <Input label="Average Order Value" type="number" step="0.01" value={inputs.averageOrderValue}
              onChange={(e) => handleInputChange('averageOrderValue', e.target.value)} />
            <Input label="COGS" type="number" step="0.01" value={inputs.cogs}
              onChange={(e) => handleInputChange('cogs', e.target.value)} />
            <Input label="Shipping Cost" type="number" step="0.01" value={inputs.shippingCost}
              onChange={(e) => handleInputChange('shippingCost', e.target.value)} />
            <Input label="Payment Fees" type="number" step="0.01" value={inputs.paymentFees}
              onChange={(e) => handleInputChange('paymentFees', e.target.value)} />
            <Input label="Other Variable Costs" type="number" step="0.01" value={inputs.otherVariableCosts}
              onChange={(e) => handleInputChange('otherVariableCosts', e.target.value)} />
          </div>
        </Card>
        
        <Card title="Discounts & Targets">
          <div className="space-y-4">
            <Input label="Discount (%)" type="number" step="0.1" value={inputs.discountPercent}
              onChange={(e) => handleInputChange('discountPercent', e.target.value)} />
            <Input label="Refund Rate (%)" type="number" step="0.1" value={inputs.refundRate}
              onChange={(e) => handleInputChange('refundRate', e.target.value)} />
            <Input label="Desired Profit Margin (%)" type="number" step="0.1" value={inputs.desiredProfitMargin}
              onChange={(e) => handleInputChange('desiredProfitMargin', e.target.value)} />
          </div>
        </Card>
      </div>
      
      <div id="roas-results" className="mt-6">
        <ResultsPanel title="ROAS Analysis" results={[
          { label: 'Contribution Margin', value: formatCurrency(results.contributionMargin) },
          { label: 'Contribution Margin %', value: formatPercent(results.contributionMarginPercent) },
          { label: 'Break-even ROAS', value: formatNumber(results.breakEvenRoas, 2), isHighlight: true },
          { label: 'Target ROAS (with profit)', value: formatNumber(results.targetRoas, 2), isHighlight: true },
          { label: 'Max CPA (break-even)', value: formatCurrency(results.maxCPA) },
          { label: 'Max CPA (with profit margin)', value: formatCurrency(results.maxCPAWithProfit) }
        ]} />
      </div>
      
      <div className="mt-6">
        <ExportButtons onExportCSV={handleExportCSV} onExportJSON={handleExportJSON} onPrint={() => printToPDF('roas-results')} />
      </div>
    </div>
  )
}
