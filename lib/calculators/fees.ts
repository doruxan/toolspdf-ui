export type ShopifyPlan = 'basic' | 'shopify' | 'advanced' | 'plus'
export type PaymentProcessor = 'shopify_payments' | 'third_party'

export interface FeesInputs {
  orderValue: number
  plan: ShopifyPlan
  processor: PaymentProcessor
  currency?: string
}

export interface FeesResults {
  processingFeePercent: number
  processingFeeFixed: number
  processingFeeTotal: number
  transactionFeePercent: number
  transactionFeeTotal: number
  totalFees: number
  effectiveFeeRate: number
  netAmount: number
}

const PROCESSING_RATES: Record<ShopifyPlan, { percent: number; fixed: number }> = {
  basic: { percent: 2.9, fixed: 0.30 },
  shopify: { percent: 2.7, fixed: 0.30 },
  advanced: { percent: 2.5, fixed: 0.30 },
  plus: { percent: 2.15, fixed: 0.30 }
}

const TRANSACTION_RATES: Record<ShopifyPlan, number> = {
  basic: 2.0,
  shopify: 1.0,
  advanced: 0.5,
  plus: 0.0
}

export function calculateFees(inputs: FeesInputs): FeesResults {
  const { orderValue, plan, processor } = inputs
  
  const processingRate = PROCESSING_RATES[plan]
  const processingFeePercent = processingRate.percent
  const processingFeeFixed = processingRate.fixed
  const processingFeeTotal = (orderValue * processingFeePercent / 100) + processingFeeFixed
  
  // Transaction fees only apply when using third-party processors
  const transactionFeePercent = processor === 'third_party' ? TRANSACTION_RATES[plan] : 0
  const transactionFeeTotal = orderValue * transactionFeePercent / 100
  
  const totalFees = processingFeeTotal + transactionFeeTotal
  const effectiveFeeRate = orderValue > 0 ? (totalFees / orderValue) * 100 : 0
  const netAmount = orderValue - totalFees
  
  return {
    processingFeePercent,
    processingFeeFixed,
    processingFeeTotal,
    transactionFeePercent,
    transactionFeeTotal,
    totalFees,
    effectiveFeeRate,
    netAmount
  }
}


