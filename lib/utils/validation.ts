export function validateRequired(value: string | number | undefined, fieldName: string): string | undefined {
  if (value === undefined || value === null || value === '') {
    return `${fieldName} is required`
  }
  return undefined
}

export function validateNumber(value: number, fieldName: string, min?: number, max?: number): string | undefined {
  if (isNaN(value)) {
    return `${fieldName} must be a valid number`
  }
  if (min !== undefined && value < min) {
    return `${fieldName} must be at least ${min}`
  }
  if (max !== undefined && value > max) {
    return `${fieldName} must be at most ${max}`
  }
  return undefined
}

export function validatePositive(value: number, fieldName: string): string | undefined {
  return validateNumber(value, fieldName, 0)
}

export function validatePercent(value: number, fieldName: string): string | undefined {
  return validateNumber(value, fieldName, 0, 100)
}

export function validateEmail(value: string): string | undefined {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return 'Invalid email address'
  }
  return undefined
}

export function validateUrl(value: string): string | undefined {
  try {
    new URL(value)
    return undefined
  } catch {
    return 'Invalid URL'
  }
}


