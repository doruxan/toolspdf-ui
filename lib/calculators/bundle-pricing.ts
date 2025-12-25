export interface BundlePricingInputs {
  singlePrice: number
  bundleSize: number
  cogsPerUnit: number
  shippingPerUnit: number
  bundleShippingCost: number
  targetMargin: number
  paymentFeePercent: number
  paymentFeeFixed: number
}

export interface BundlePricingResults {
  singleUnitProfit: number
  singleUnitMargin: number
  bundleCost: number
  minBundlePrice: number
  suggestedBundlePrice: number
  bundleDiscount: number
  bundleDiscountPercent: number
  bundleProfit: number
  bundleMargin: number
  profitPerUnit: number
  comparison: {
    revenueIncrease: number
    profitIncrease: number
    avgOrderValueIncrease: number
  }
}

export function calculateBundlePricing(inputs: BundlePricingInputs): BundlePricingResults {
  const {
    singlePrice,
    bundleSize,
    cogsPerUnit,
    shippingPerUnit,
    bundleShippingCost,
    targetMargin,
    paymentFeePercent,
    paymentFeeFixed
  } = inputs
  
  // Single unit economics
  const singlePaymentFee = (singlePrice * paymentFeePercent / 100) + paymentFeeFixed
  const singleCost = cogsPerUnit + shippingPerUnit + singlePaymentFee
  const singleUnitProfit = singlePrice - singleCost
  const singleUnitMargin = singlePrice > 0 ? (singleUnitProfit / singlePrice) * 100 : 0
  
  // Bundle cost calculation
  const bundleCOGS = cogsPerUnit * bundleSize
  const bundleCost = bundleCOGS + bundleShippingCost
  
  // Minimum bundle price to achieve target margin (before payment fees)
  const minBundlePriceBeforeFees = bundleCost / (1 - targetMargin / 100)
  
  // Adjust for payment fees
  const minBundlePrice = (minBundlePriceBeforeFees + paymentFeeFixed) / (1 - paymentFeePercent / 100)
  
  // Suggested bundle price (rounded up to nearest $5)
  const suggestedBundlePrice = Math.ceil(minBundlePrice / 5) * 5
  
  // Bundle economics with suggested price
  const bundlePaymentFee = (suggestedBundlePrice * paymentFeePercent / 100) + paymentFeeFixed
  const totalBundleCost = bundleCost + bundlePaymentFee
  const bundleProfit = suggestedBundlePrice - totalBundleCost
  const bundleMargin = suggestedBundlePrice > 0 ? (bundleProfit / suggestedBundlePrice) * 100 : 0
  const profitPerUnit = bundleProfit / bundleSize
  
  // Discount calculation
  const individualPrice = singlePrice * bundleSize
  const bundleDiscount = individualPrice - suggestedBundlePrice
  const bundleDiscountPercent = individualPrice > 0 ? (bundleDiscount / individualPrice) * 100 : 0
  
  // Comparison vs selling individual units
  const individualProfit = singleUnitProfit * bundleSize
  const revenueIncrease = suggestedBundlePrice - (singlePrice * bundleSize)
  const profitIncrease = bundleProfit - individualProfit
  const avgOrderValueIncrease = suggestedBundlePrice - singlePrice
  
  return {
    singleUnitProfit,
    singleUnitMargin,
    bundleCost,
    minBundlePrice,
    suggestedBundlePrice,
    bundleDiscount,
    bundleDiscountPercent,
    bundleProfit,
    bundleMargin,
    profitPerUnit,
    comparison: {
      revenueIncrease,
      profitIncrease,
      avgOrderValueIncrease
    }
  }
}


