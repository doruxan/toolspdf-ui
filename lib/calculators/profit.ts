export interface ProfitInputs {
  revenue: number
  cogs: number
  shippingCost: number
  paymentFees: number
  transactionFees: number
  discounts: number
  cac: number
  refundRate: number
}

export interface ProfitResults {
  grossRevenue: number
  netRevenue: number
  grossProfit: number
  grossMargin: number
  contributionMargin: number
  contributionMarginPercent: number
  netProfit: number
  netMarginPercent: number
  breakEvenRevenue: number
}

export function calculateProfit(inputs: ProfitInputs): ProfitResults {
  const {
    revenue,
    cogs,
    shippingCost,
    paymentFees,
    transactionFees,
    discounts,
    cac,
    refundRate
  } = inputs
  
  // Gross revenue before discounts
  const grossRevenue = revenue
  
  // Net revenue after discounts and expected refunds
  const netRevenue = revenue - discounts - (revenue * refundRate / 100)
  
  // Gross profit (revenue - COGS)
  const grossProfit = netRevenue - cogs
  const grossMargin = netRevenue > 0 ? (grossProfit / netRevenue) * 100 : 0
  
  // Contribution margin (after variable costs but before CAC)
  const variableCosts = cogs + shippingCost + paymentFees + transactionFees
  const contributionMargin = netRevenue - variableCosts
  const contributionMarginPercent = netRevenue > 0 ? (contributionMargin / netRevenue) * 100 : 0
  
  // Net profit (after CAC)
  const netProfit = contributionMargin - cac
  const netMarginPercent = netRevenue > 0 ? (netProfit / netRevenue) * 100 : 0
  
  // Break-even revenue (revenue needed to cover all costs)
  const totalCosts = cogs + shippingCost + paymentFees + transactionFees + cac
  const breakEvenRevenue = totalCosts / (1 - refundRate / 100 - discounts / revenue)
  
  return {
    grossRevenue,
    netRevenue,
    grossProfit,
    grossMargin,
    contributionMargin,
    contributionMarginPercent,
    netProfit,
    netMarginPercent,
    breakEvenRevenue: isNaN(breakEvenRevenue) || !isFinite(breakEvenRevenue) ? totalCosts : breakEvenRevenue
  }
}


