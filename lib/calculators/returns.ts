export interface ReturnsInputs {
  monthlyOrders: number
  averageOrderValue: number
  returnRate: number
  recoveryRate: number
  outboundShipping: number
  returnShippingCost: number
  processingCostPerReturn: number
  restockingFeePercent: number
}

export interface ReturnsResults {
  expectedReturns: number
  totalReturnCost: number
  costPerReturn: number
  costPerOrder: number
  monthlyImpact: number
  annualImpact: number
  breakdown: {
    lostShipping: number
    returnShipping: number
    processingCosts: number
    productValueLoss: number
    restockingFees: number
  }
  recommendations: string[]
}

export function calculateReturns(inputs: ReturnsInputs): ReturnsResults {
  const {
    monthlyOrders,
    averageOrderValue,
    returnRate,
    recoveryRate,
    outboundShipping,
    returnShippingCost,
    processingCostPerReturn,
    restockingFeePercent
  } = inputs
  
  // Expected returns
  const expectedReturns = monthlyOrders * (returnRate / 100)
  
  // Cost breakdown
  const lostShipping = expectedReturns * outboundShipping
  const returnShipping = expectedReturns * returnShippingCost
  const processingCosts = expectedReturns * processingCostPerReturn
  
  // Product value loss (unrecovered value)
  const productValueLoss = expectedReturns * averageOrderValue * (1 - recoveryRate / 100)
  
  // Restocking fees collected (offset)
  const restockingFees = expectedReturns * averageOrderValue * (restockingFeePercent / 100)
  
  // Total cost
  const totalReturnCost = lostShipping + returnShipping + processingCosts + productValueLoss - restockingFees
  
  // Per-return and per-order metrics
  const costPerReturn = expectedReturns > 0 ? totalReturnCost / expectedReturns : 0
  const costPerOrder = monthlyOrders > 0 ? totalReturnCost / monthlyOrders : 0
  
  // Impact calculations
  const monthlyImpact = totalReturnCost
  const annualImpact = monthlyImpact * 12
  
  // Recommendations
  const recommendations: string[] = []
  
  if (returnRate > 15) {
    recommendations.push('Return rate exceeds 15%. Review product descriptions, sizing guides, and photography for accuracy.')
  }
  
  if (recoveryRate < 70) {
    recommendations.push('Recovery rate is low. Consider improving resale channels or donation strategies.')
  }
  
  if (returnShippingCost > outboundShipping * 0.5) {
    recommendations.push('Return shipping costs are high relative to outbound. Negotiate better rates or consider free return alternatives.')
  }
  
  if (costPerOrder > averageOrderValue * 0.1) {
    recommendations.push('Return costs exceed 10% of AOV. This significantly impacts profitability. Prioritize return reduction strategies.')
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Return metrics are within acceptable ranges. Continue monitoring and optimizing.')
  }
  
  return {
    expectedReturns,
    totalReturnCost,
    costPerReturn,
    costPerOrder,
    monthlyImpact,
    annualImpact,
    breakdown: {
      lostShipping,
      returnShipping,
      processingCosts,
      productValueLoss,
      restockingFees
    },
    recommendations
  }
}


