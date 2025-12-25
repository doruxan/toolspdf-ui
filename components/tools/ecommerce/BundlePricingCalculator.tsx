'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/shared/Input'
import { Card } from '@/components/shared/Card'
import { ResultsPanel } from '@/components/shared/ResultsPanel'
import { ExportButtons } from '@/components/shared/ExportButtons'
import { calculateBundlePricing, BundlePricingInputs } from '@/lib/calculators/bundle-pricing'
import { formatCurrency, formatPercent } from '@/lib/utils/formatting'
import { exportToCSV } from '@/lib/exports/csv'
import { exportToJSON } from '@/lib/exports/json'
import { printToPDF } from '@/lib/exports/pdf'

const DEFAULT_INPUTS: BundlePricingInputs = {
  singlePrice: 29.99,
  bundleSize: 3,
  cogsPerUnit: 8,
  shippingPerUnit: 4,
  bundleShippingCost: 10,
  targetMargin: 40,
  paymentFeePercent: 2.9,
  paymentFeeFixed: 0.30
}

export function BundlePricingCalculator() {
  const [inputs, setInputs] = useState<BundlePricingInputs>(DEFAULT_INPUTS)
  const [results, setResults] = useState(calculateBundlePricing(DEFAULT_INPUTS))
  
  useEffect(() => {
    setResults(calculateBundlePricing(inputs))
  }, [inputs])
  
  const handleInputChange = (field: keyof BundlePricingInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }))
  }
  
  const handleExportCSV = () => {
    const data = [
      { metric: 'Single Price', value: inputs.singlePrice },
      { metric: 'Bundle Size', value: inputs.bundleSize },
      { metric: 'Suggested Bundle Price', value: results.suggestedBundlePrice },
      { metric: 'Bundle Discount', value: results.bundleDiscount },
      { metric: 'Bundle Discount %', value: results.bundleDiscountPercent },
      { metric: 'Bundle Profit', value: results.bundleProfit },
      { metric: 'Bundle Margin %', value: results.bundleMargin }
    ]
    exportToCSV(data, 'bundle-pricing-calculation')
  }
  
  const handleExportJSON = () => {
    exportToJSON({ inputs, results }, 'bundle-pricing-calculation')
  }
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Pricing & Costs">
          <div className="space-y-4">
            <Input label="Single Unit Price" type="number" step="0.01" value={inputs.singlePrice}
              onChange={(e) => handleInputChange('singlePrice', e.target.value)} />
            <Input label="Bundle Size (units)" type="number" value={inputs.bundleSize}
              onChange={(e) => handleInputChange('bundleSize', e.target.value)} />
            <Input label="COGS Per Unit" type="number" step="0.01" value={inputs.cogsPerUnit}
              onChange={(e) => handleInputChange('cogsPerUnit', e.target.value)} />
            <Input label="Shipping Per Unit" type="number" step="0.01" value={inputs.shippingPerUnit}
              onChange={(e) => handleInputChange('shippingPerUnit', e.target.value)} />
            <Input label="Bundle Shipping Cost" type="number" step="0.01" value={inputs.bundleShippingCost}
              onChange={(e) => handleInputChange('bundleShippingCost', e.target.value)} />
          </div>
        </Card>
        
        <Card title="Target Margin & Fees">
          <div className="space-y-4">
            <Input label="Target Margin (%)" type="number" step="0.1" value={inputs.targetMargin}
              onChange={(e) => handleInputChange('targetMargin', e.target.value)} />
            <Input label="Payment Fee (%)" type="number" step="0.01" value={inputs.paymentFeePercent}
              onChange={(e) => handleInputChange('paymentFeePercent', e.target.value)} />
            <Input label="Payment Fee Fixed" type="number" step="0.01" value={inputs.paymentFeeFixed}
              onChange={(e) => handleInputChange('paymentFeeFixed', e.target.value)} />
          </div>
        </Card>
      </div>
      
      <div id="bundle-results" className="mt-6">
        <ResultsPanel title="Bundle Pricing Results" results={[
          { label: 'Suggested Bundle Price', value: formatCurrency(results.suggestedBundlePrice), isHighlight: true },
          { label: 'Bundle Discount', value: formatCurrency(results.bundleDiscount) },
          { label: 'Discount %', value: formatPercent(results.bundleDiscountPercent) },
          { label: 'Bundle Profit', value: formatCurrency(results.bundleProfit) },
          { label: 'Bundle Margin', value: formatPercent(results.bundleMargin) },
          { label: 'Profit Per Unit', value: formatCurrency(results.profitPerUnit) }
        ]} />
      </div>
      
      <div className="mt-6">
        <ExportButtons onExportCSV={handleExportCSV} onExportJSON={handleExportJSON} onPrint={() => printToPDF('bundle-results')} />
      </div>
    </div>
  )
}

