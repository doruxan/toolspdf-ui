'use client'

import { useState } from 'react'
import { Input } from '@/components/shared/Input'
import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { ExportButtons } from '@/components/shared/ExportButtons'
import { generateInvoice, InvoiceData, InvoiceInputs, addLineItem, removeLineItem } from '@/lib/generators/invoice'
import { formatCurrency } from '@/lib/utils/formatting'
import { exportToJSON } from '@/lib/exports/json'
import { printToPDF } from '@/lib/exports/pdf'

interface LineItemInput {
  description: string
  quantity: number
  unitPrice: number
}

export function InvoiceGenerator() {
  const [sellerName, setSellerName] = useState('')
  const [sellerAddress, setSellerAddress] = useState('')
  const [sellerEmail, setSellerEmail] = useState('')
  const [buyerName, setBuyerName] = useState('')
  const [buyerAddress, setBuyerAddress] = useState('')
  const [lineItems, setLineItems] = useState<LineItemInput[]>([
    { description: '', quantity: 1, unitPrice: 0 }
  ])
  const [taxRate, setTaxRate] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [invoice, setInvoice] = useState<InvoiceData | null>(null)
  
  const addNewLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, unitPrice: 0 }])
  }
  
  const removeLineItemAt = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index))
  }
  
  const updateLineItem = (index: number, field: keyof LineItemInput, value: string | number) => {
    const updated = [...lineItems]
    updated[index] = { ...updated[index], [field]: value }
    setLineItems(updated)
  }
  
  const generateInvoicePreview = () => {
    const inputs: InvoiceInputs = {
      sellerName,
      sellerAddress,
      sellerEmail,
      buyerName,
      buyerAddress,
      lineItems: lineItems.filter(item => item.description && item.quantity > 0),
      taxRate,
      shippingCost,
      discount
    }
    
    const generated = generateInvoice(inputs)
    setInvoice(generated)
  }
  
  const handleExportJSON = () => {
    if (invoice) {
      exportToJSON(invoice, `invoice-${invoice.invoiceNumber}`)
    }
  }
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Seller Information">
          <div className="space-y-4">
            <Input label="Business Name" value={sellerName} onChange={(e) => setSellerName(e.target.value)} required />
            <Input label="Address" value={sellerAddress} onChange={(e) => setSellerAddress(e.target.value)} required />
            <Input label="Email" type="email" value={sellerEmail} onChange={(e) => setSellerEmail(e.target.value)} required />
          </div>
        </Card>
        
        <Card title="Buyer Information">
          <div className="space-y-4">
            <Input label="Customer Name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} required />
            <Input label="Address" value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} required />
          </div>
        </Card>
      </div>
      
      <Card title="Line Items" className="mt-6">
        <div className="space-y-4">
          {lineItems.map((item, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  label={index === 0 ? 'Description' : ''}
                  value={item.description}
                  onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                  placeholder="Product or service"
                />
              </div>
              <div className="w-24">
                <Input
                  label={index === 0 ? 'Qty' : ''}
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="w-32">
                <Input
                  label={index === 0 ? 'Unit Price' : ''}
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => updateLineItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLineItemAt(index)}
                disabled={lineItems.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button variant="secondary" size="sm" onClick={addNewLineItem}>
            + Add Line Item
          </Button>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <Input label="Tax Rate (%)" type="number" step="0.1" value={taxRate}
          onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)} />
        <Input label="Shipping Cost" type="number" step="0.01" value={shippingCost}
          onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)} />
        <Input label="Discount" type="number" step="0.01" value={discount}
          onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} />
      </div>
      
      <div className="mt-6">
        <Button onClick={generateInvoicePreview}>Generate Invoice</Button>
      </div>
      
      {invoice && (
        <Card title="Invoice Preview" className="mt-6" id="invoice-preview">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-lg">{invoice.seller.name}</h3>
                <p className="text-sm text-gray-600">{invoice.seller.address}</p>
                <p className="text-sm text-gray-600">{invoice.seller.email}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">Invoice #{invoice.invoiceNumber}</p>
                <p className="text-sm text-gray-600">Date: {invoice.invoiceDate}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Bill To:</h4>
              <p className="font-medium">{invoice.buyer.name}</p>
              <p className="text-sm text-gray-600">{invoice.buyer.address}</p>
            </div>
            
            <table className="w-full border-t">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Qty</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.lineItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{item.description}</td>
                    <td className="text-right">{item.quantity}</td>
                    <td className="text-right">{formatCurrency(item.unitPrice)}</td>
                    <td className="text-right">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(invoice.subtotal)}</span>
                </div>
                {invoice.taxAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Tax ({invoice.taxRate}%):</span>
                    <span>{formatCurrency(invoice.taxAmount)}</span>
                  </div>
                )}
                {invoice.shippingCost > 0 && (
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{formatCurrency(invoice.shippingCost)}</span>
                  </div>
                )}
                {invoice.discount > 0 && (
                  <div className="flex justify-between text-error-600">
                    <span>Discount:</span>
                    <span>-{formatCurrency(invoice.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(invoice.total)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <ExportButtons onExportJSON={handleExportJSON} onPrint={() => printToPDF('invoice-preview')} />
          </div>
        </Card>
      )}
    </div>
  )
}

