'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/shared/Input'
import { Card } from '@/components/shared/Card'
import { ResultsPanel } from '@/components/shared/ResultsPanel'
import { Alert } from '@/components/shared/Alert'
import { ExportButtons } from '@/components/shared/ExportButtons'
import { calculateLtvCac, LtvCacInputs } from '@/lib/calculators/ltv-cac'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/formatting'
import { exportToCSV } from '@/lib/exports/csv'
import { exportToJSON } from '@/lib/exports/json'
import { printToPDF } from '@/lib/exports/pdf'

const DEFAULT_INPUTS: LtvCacInputs = {
  averageOrderValue: 75,
  purchaseFrequency: 2.5,
  customerLifespan: 2,
  grossMarginPercent: 50,
  cac: 45,
  discountPercent: 10,
  refundRate: 5
}

export function LtvCacCalculator() {
  const [inputs, setInputs] = useState<LtvCacInputs>(DEFAULT_INPUTS)
  const [results, setResults] = useState(calculateLtvCac(DEFAULT_INPUTS))
  
  useEffect(() => {
    setResults(calculateLtvCac(inputs))
  }, [inputs])
  
  const handleInputChange = (field: keyof LtvCacInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }))
  }
  
  const handleExportCSV = () => {
    const data = [
      { metric: 'Revenue LTV', value: results.revenueLTV },
      { metric: 'Gross Profit LTV', value: results.grossProfitLTV },
      { metric: 'CAC', value: results.cac },
      { metric: 'LTV:CAC Ratio', value: results.ltvCacRatio },
      { metric: 'Payback Period (months)', value: results.paybackPeriod },
      { metric: 'ROI %', value: results.roi }
    ]
    exportToCSV(data, 'ltv-cac-calculation')
  }
  
  const handleExportJSON = () => {
    exportToJSON({ inputs, results }, 'ltv-cac-calculation')
  }
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Customer Behavior">
          <div className="space-y-4">
            <Input label="Average Order Value" type="number" step="0.01" value={inputs.averageOrderValue}
              onChange={(e) => handleInputChange('averageOrderValue', e.target.value)} />
            <Input label="Purchase Frequency (per year)" type="number" step="0.1" value={inputs.purchaseFrequency}
              onChange={(e) => handleInputChange('purchaseFrequency', e.target.value)} />
            <Input label="Customer Lifespan (years)" type="number" step="0.1" value={inputs.customerLifespan}
              onChange={(e) => handleInputChange('customerLifespan', e.target.value)} />
            <Input label="Gross Margin (%)" type="number" step="0.1" value={inputs.grossMarginPercent}
              onChange={(e) => handleInputChange('grossMarginPercent', e.target.value)} />
          </div>
        </Card>
        
        <Card title="Acquisition & Adjustments">
          <div className="space-y-4">
            <Input label="Customer Acquisition Cost (CAC)" type="number" step="0.01" value={inputs.cac}
              onChange={(e) => handleInputChange('cac', e.target.value)} />
            <Input label="Discount (%)" type="number" step="0.1" value={inputs.discountPercent}
              onChange={(e) => handleInputChange('discountPercent', e.target.value)} />
            <Input label="Refund Rate (%)" type="number" step="0.1" value={inputs.refundRate}
              onChange={(e) => handleInputChange('refundRate', e.target.value)} />
          </div>
        </Card>
      </div>
      
      <div id="ltv-results" className="mt-6">
        <ResultsPanel title="LTV/CAC Analysis" results={[
          { label: 'Revenue LTV', value: formatCurrency(results.revenueLTV) },
          { label: 'Gross Profit LTV', value: formatCurrency(results.grossProfitLTV) },
          { label: 'Net Profit LTV (after CAC)', value: formatCurrency(results.netProfitLTV) },
          { label: 'LTV:CAC Ratio', value: `${formatNumber(results.ltvCacRatio, 2)}:1`, isHighlight: true },
          { label: 'Payback Period', value: `${formatNumber(results.paybackPeriod, 1)} months`, isHighlight: true },
          { label: 'ROI', value: formatPercent(results.roi) }
        ]} />
      </div>
      
      <div className="mt-6">
        <Alert variant={results.isHealthy ? 'success' : 'warning'} title="Analysis">
          {results.recommendation}
        </Alert>
      </div>
      
      <div className="mt-6">
        <ExportButtons onExportCSV={handleExportCSV} onExportJSON={handleExportJSON} onPrint={() => printToPDF('ltv-results')} />
      </div>
    </div>
  )
}

