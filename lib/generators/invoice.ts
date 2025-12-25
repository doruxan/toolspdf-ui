export interface InvoiceLineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface InvoiceData {
  invoiceNumber: string
  invoiceDate: string
  dueDate?: string
  seller: {
    name: string
    address: string
    email: string
    phone?: string
    taxId?: string
  }
  buyer: {
    name: string
    address: string
    email?: string
  }
  lineItems: InvoiceLineItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  shippingCost: number
  discount: number
  total: number
  currency: string
  notes?: string
  paymentTerms?: string
}

export interface InvoiceInputs {
  invoiceNumber?: string
  invoiceDate?: string
  dueDate?: string
  sellerName: string
  sellerAddress: string
  sellerEmail: string
  sellerPhone?: string
  sellerTaxId?: string
  buyerName: string
  buyerAddress: string
  buyerEmail?: string
  lineItems: Array<{
    description: string
    quantity: number
    unitPrice: number
  }>
  taxRate?: number
  shippingCost?: number
  discount?: number
  currency?: string
  notes?: string
  paymentTerms?: string
}

export function generateInvoice(inputs: InvoiceInputs): InvoiceData {
  const {
    invoiceNumber,
    invoiceDate,
    dueDate,
    sellerName,
    sellerAddress,
    sellerEmail,
    sellerPhone,
    sellerTaxId,
    buyerName,
    buyerAddress,
    buyerEmail,
    lineItems,
    taxRate = 0,
    shippingCost = 0,
    discount = 0,
    currency = 'USD',
    notes,
    paymentTerms
  } = inputs
  
  // Generate invoice number if not provided
  const finalInvoiceNumber = invoiceNumber || `INV-${Date.now()}`
  
  // Use current date if not provided
  const finalInvoiceDate = invoiceDate || new Date().toISOString().split('T')[0]
  
  // Process line items
  const processedLineItems: InvoiceLineItem[] = lineItems.map((item, index) => {
    const total = item.quantity * item.unitPrice
    return {
      id: `item-${index + 1}`,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total
    }
  })
  
  // Calculate totals
  const subtotal = processedLineItems.reduce((sum, item) => sum + item.total, 0)
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount + shippingCost - discount
  
  return {
    invoiceNumber: finalInvoiceNumber,
    invoiceDate: finalInvoiceDate,
    dueDate,
    seller: {
      name: sellerName,
      address: sellerAddress,
      email: sellerEmail,
      phone: sellerPhone,
      taxId: sellerTaxId
    },
    buyer: {
      name: buyerName,
      address: buyerAddress,
      email: buyerEmail
    },
    lineItems: processedLineItems,
    subtotal,
    taxRate,
    taxAmount,
    shippingCost,
    discount,
    total,
    currency,
    notes,
    paymentTerms
  }
}

export function addLineItem(
  invoice: InvoiceData,
  description: string,
  quantity: number,
  unitPrice: number
): InvoiceData {
  const newItem: InvoiceLineItem = {
    id: `item-${invoice.lineItems.length + 1}`,
    description,
    quantity,
    unitPrice,
    total: quantity * unitPrice
  }
  
  const updatedLineItems = [...invoice.lineItems, newItem]
  const subtotal = updatedLineItems.reduce((sum, item) => sum + item.total, 0)
  const taxAmount = subtotal * (invoice.taxRate / 100)
  const total = subtotal + taxAmount + invoice.shippingCost - invoice.discount
  
  return {
    ...invoice,
    lineItems: updatedLineItems,
    subtotal,
    taxAmount,
    total
  }
}

export function removeLineItem(invoice: InvoiceData, itemId: string): InvoiceData {
  const updatedLineItems = invoice.lineItems.filter(item => item.id !== itemId)
  const subtotal = updatedLineItems.reduce((sum, item) => sum + item.total, 0)
  const taxAmount = subtotal * (invoice.taxRate / 100)
  const total = subtotal + taxAmount + invoice.shippingCost - invoice.discount
  
  return {
    ...invoice,
    lineItems: updatedLineItems,
    subtotal,
    taxAmount,
    total
  }
}


