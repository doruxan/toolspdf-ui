export interface LtvCacInputs {
  averageOrderValue: number
  purchaseFrequency: number
  customerLifespan: number
  grossMarginPercent: number
  cac: number
  discountPercent: number
  refundRate: number
}

export interface LtvCacResults {
  revenueLTV: number
  grossProfitLTV: number
  netProfitLTV: number
  cac: number
  ltvCacRatio: number
  paybackPeriod: number
  roi: number
  customerValue: {
    firstOrder: number
    repeatOrders: number
    totalOrders: number
  }
  isHealthy: boolean
  recommendation: string
}

export function calculateLtvCac(inputs: LtvCacInputs): LtvCacResults {
  const {
    averageOrderValue,
    purchaseFrequency,
    customerLifespan,
    grossMarginPercent,
    cac,
    discountPercent,
    refundRate
  } = inputs
  
  // Total number of orders over lifetime
  const totalOrders = purchaseFrequency * customerLifespan
  
  // Revenue LTV
  const revenueLTV = averageOrderValue * totalOrders
  
  // Adjust for discounts and refunds
  const netOrderValue = averageOrderValue * (1 - discountPercent / 100) * (1 - refundRate / 100)
  const netRevenueLTV = netOrderValue * totalOrders
  
  // Gross profit LTV
  const grossProfitLTV = netRevenueLTV * (grossMarginPercent / 100)
  
  // Net profit LTV (after CAC)
  const netProfitLTV = grossProfitLTV - cac
  
  // LTV:CAC ratio
  const ltvCacRatio = cac > 0 ? grossProfitLTV / cac : 0
  
  // Payback period (months to recover CAC)
  const monthlyProfit = grossProfitLTV / (customerLifespan * 12)
  const paybackPeriod = cac > 0 && monthlyProfit > 0 ? cac / monthlyProfit : 0
  
  // ROI
  const roi = cac > 0 ? ((grossProfitLTV - cac) / cac) * 100 : 0
  
  // Customer value breakdown
  const firstOrderProfit = netOrderValue * (grossMarginPercent / 100)
  const repeatOrders = totalOrders - 1
  const repeatOrdersProfit = repeatOrders * netOrderValue * (grossMarginPercent / 100)
  
  // Health assessment
  const isHealthy = ltvCacRatio >= 3 && paybackPeriod <= 12
  
  let recommendation = ''
  if (ltvCacRatio < 1) {
    recommendation = 'Critical: LTV is lower than CAC. Business model needs immediate revision.'
  } else if (ltvCacRatio < 3) {
    recommendation = 'Caution: LTV:CAC ratio is below 3:1. Consider reducing CAC or improving retention.'
  } else if (paybackPeriod > 12) {
    recommendation = 'Warning: Payback period exceeds 12 months. Cash flow may be constrained.'
  } else {
    recommendation = 'Healthy: LTV:CAC ratio and payback period are within acceptable ranges.'
  }
  
  return {
    revenueLTV,
    grossProfitLTV,
    netProfitLTV,
    cac,
    ltvCacRatio,
    paybackPeriod,
    roi,
    customerValue: {
      firstOrder: firstOrderProfit,
      repeatOrders: repeatOrdersProfit,
      totalOrders
    },
    isHealthy,
    recommendation
  }
}


