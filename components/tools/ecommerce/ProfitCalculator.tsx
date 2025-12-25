'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/shared/Input'
import { Card } from '@/components/shared/Card'
import { ResultsPanel } from '@/components/shared/ResultsPanel'
import { Button } from '@/components/shared/Button'
import { ExportButtons } from '@/components/shared/ExportButtons'
import { calculateProfit, ProfitInputs } from '@/lib/calculators/profit'
import { formatCurrency, formatPercent } from '@/lib/utils/formatting'
import { exportToCSV } from '@/lib/exports/csv'
import { exportToJSON } from '@/lib/exports/json'
import { printToPDF } from '@/lib/exports/pdf'

const DEFAULT_INPUTS: ProfitInputs = {
  revenue: 100,
  cogs: 30,
  shippingCost: 8,
  paymentFees: 3.2,
  transactionFees: 0,
  discounts: 0,
  cac: 25,
  refundRate: 5
}

export function ProfitCalculator() {
  const [inputs, setInputs] = useState<ProfitInputs>(DEFAULT_INPUTS)
  const [results, setResults] = useState(calculateProfit(DEFAULT_INPUTS))
  
  useEffect(() => {
    const newResults = calculateProfit(inputs)
    setResults(newResults)
  }, [inputs])
  
  const handleInputChange = (field: keyof ProfitInputs, value: string) => {
    const numValue = parseFloat(value) || 0
    setInputs(prev => ({ ...prev, [field]: numValue }))
  }
  
  const loadExample = (example: 'basic' | 'subscription' | 'dropship') => {
    const examples: Record<string, ProfitInputs> = {
      basic: {
        revenue: 100,
        cogs: 30,
        shippingCost: 8,
        paymentFees: 3.2,
        transactionFees: 0,
        discounts: 10,
        cac: 25,
        refundRate: 5
      },
      subscription: {
        revenue: 49,
        cogs: 12,
        shippingCost: 0,
        paymentFees: 1.72,
        transactionFees: 0,
        discounts: 0,
        cac: 35,
        refundRate: 2
      },
      dropship: {
        revenue: 79,
        cogs: 45,
        shippingCost: 0,
        paymentFees: 2.60,
        transactionFees: 0,
        discounts: 5,
        cac: 18,
        refundRate: 8
      }
    }
    setInputs(examples[example])
  }
  
  const handleExportCSV = () => {
    const data = [
      { metric: 'Gross Revenue', value: results.grossRevenue },
      { metric: 'Net Revenue', value: results.netRevenue },
      { metric: 'Gross Profit', value: results.grossProfit },
      { metric: 'Gross Margin %', value: results.grossMargin },
      { metric: 'Contribution Margin', value: results.contributionMargin },
      { metric: 'Contribution Margin %', value: results.contributionMarginPercent },
      { metric: 'Net Profit', value: results.netProfit },
      { metric: 'Net Margin %', value: results.netMarginPercent },
      { metric: 'Break-even Revenue', value: results.breakEvenRevenue }
    ]
    exportToCSV(data, 'shopify-profit-calculation')
  }
  
  const handleExportJSON = () => {
    exportToJSON({ inputs, results }, 'shopify-profit-calculation')
  }
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => loadExample('basic')}>
          Load Basic Example
        </Button>
        <Button size="sm" variant="secondary" onClick={() => loadExample('subscription')}>
          Load Subscription
        </Button>
        <Button size="sm" variant="secondary" onClick={() => loadExample('dropship')}>
          Load Dropship
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Revenue & Costs">
          <div className="space-y-4">
            <Input
              label="Order Revenue"
              type="number"
              step="0.01"
              value={inputs.revenue}
              onChange={(e) => handleInputChange('revenue', e.target.value)}
              helpText="Total order value before discounts"
            />
            <Input
              label="Cost of Goods (COGS)"
              type="number"
              step="0.01"
              value={inputs.cogs}
              onChange={(e) => handleInputChange('cogs', e.target.value)}
              helpText="Product cost per order"
            />
            <Input
              label="Shipping Cost"
              type="number"
              step="0.01"
              value={inputs.shippingCost}
              onChange={(e) => handleInputChange('shippingCost', e.target.value)}
              helpText="Fulfillment and shipping"
            />
            <Input
              label="Payment Fees"
              type="number"
              step="0.01"
              value={inputs.paymentFees}
              onChange={(e) => handleInputChange('paymentFees', e.target.value)}
              helpText="Processing fees (e.g., 2.9% + $0.30)"
            />
            <Input
              label="Transaction Fees"
              type="number"
              step="0.01"
              value={inputs.transactionFees}
              onChange={(e) => handleInputChange('transactionFees', e.target.value)}
              helpText="Third-party gateway fees (if applicable)"
            />
          </div>
        </Card>
        
        <Card title="Discounts & Acquisition">
          <div className="space-y-4">
            <Input
              label="Discounts"
              type="number"
              step="0.01"
              value={inputs.discounts}
              onChange={(e) => handleInputChange('discounts', e.target.value)}
              helpText="Promotional discounts applied"
            />
            <Input
              label="Customer Acquisition Cost (CAC)"
              type="number"
              step="0.01"
              value={inputs.cac}
              onChange={(e) => handleInputChange('cac', e.target.value)}
              helpText="Ad spend per customer"
            />
            <Input
              label="Expected Refund Rate (%)"
              type="number"
              step="0.1"
              value={inputs.refundRate}
              onChange={(e) => handleInputChange('refundRate', e.target.value)}
              helpText="Percentage of orders expected to be refunded"
            />
          </div>
        </Card>
      </div>
      
      <div id="profit-results" className="mt-6">
        <ResultsPanel
          title="Profit Analysis"
          results={[
            { label: 'Gross Revenue', value: formatCurrency(results.grossRevenue) },
            { label: 'Net Revenue (after discounts & refunds)', value: formatCurrency(results.netRevenue) },
            { label: 'Gross Profit', value: formatCurrency(results.grossProfit), helpText: 'Revenue - COGS' },
            { label: 'Gross Margin', value: formatPercent(results.grossMargin) },
            { 
              label: 'Contribution Margin', 
              value: formatCurrency(results.contributionMargin), 
              isHighlight: true,
              helpText: 'After all variable costs, before CAC' 
            },
            { label: 'Contribution Margin %', value: formatPercent(results.contributionMarginPercent) },
            { 
              label: 'Net Profit', 
              value: formatCurrency(results.netProfit), 
              isHighlight: true,
              helpText: 'Final profit after CAC' 
            },
            { label: 'Net Margin', value: formatPercent(results.netMarginPercent) },
            { label: 'Break-even Revenue', value: formatCurrency(results.breakEvenRevenue), helpText: 'Revenue needed to cover all costs' }
          ]}
        />
      </div>
      
      <div className="mt-6">
        <ExportButtons
          onExportCSV={handleExportCSV}
          onExportJSON={handleExportJSON}
          onPrint={() => printToPDF('profit-results')}
        />
      </div>
    </div>
  )
}

