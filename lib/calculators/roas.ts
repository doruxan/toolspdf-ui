export interface RoasInputs {
  averageOrderValue: number
  cogs: number
  shippingCost: number
  paymentFees: number
  otherVariableCosts: number
  discountPercent: number
  refundRate: number
  desiredProfitMargin: number
}

export interface RoasResults {
  revenue: number
  netRevenue: number
  totalVariableCosts: number
  contributionMargin: number
  contributionMarginPercent: number
  breakEvenRoas: number
  targetRoas: number
  maxCPA: number
  maxCPAWithProfit: number
  profitPerOrder: number
}

export function calculateRoas(inputs: RoasInputs): RoasResults {
  const {
    averageOrderValue,
    cogs,
    shippingCost,
    paymentFees,
    otherVariableCosts,
    discountPercent,
    refundRate,
    desiredProfitMargin
  } = inputs
  
  // Revenue calculations
  const revenue = averageOrderValue
  const discountAmount = revenue * (discountPercent / 100)
  const expectedRefund = revenue * (refundRate / 100)
  const netRevenue = revenue - discountAmount - expectedRefund
  
  // Cost calculations
  const totalVariableCosts = cogs + shippingCost + paymentFees + otherVariableCosts
  const contributionMargin = netRevenue - totalVariableCosts
  const contributionMarginPercent = netRevenue > 0 ? (contributionMargin / netRevenue) * 100 : 0
  
  // Break-even ROAS (revenue / ad spend when ad spend = contribution margin)
  const breakEvenRoas = contributionMargin > 0 ? revenue / contributionMargin : 0
  
  // Target ROAS with desired profit margin
  const desiredProfit = netRevenue * (desiredProfitMargin / 100)
  const allowableAdSpend = contributionMargin - desiredProfit
  const targetRoas = allowableAdSpend > 0 ? revenue / allowableAdSpend : breakEvenRoas * 2
  
  // Max CPA (contribution margin per order)
  const maxCPA = contributionMargin
  
  // Max CPA with profit margin
  const maxCPAWithProfit = allowableAdSpend
  
  // Profit per order at target ROAS
  const profitPerOrder = netRevenue - totalVariableCosts - (revenue / targetRoas)
  
  return {
    revenue,
    netRevenue,
    totalVariableCosts,
    contributionMargin,
    contributionMarginPercent,
    breakEvenRoas,
    targetRoas,
    maxCPA,
    maxCPAWithProfit,
    profitPerOrder: profitPerOrder > 0 ? profitPerOrder : 0
  }
}


