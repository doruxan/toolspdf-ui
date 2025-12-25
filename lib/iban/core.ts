// Core IBAN validation logic using MOD-97 algorithm
// Based on ISO 13616 standard

import { getCountrySpec, IBANCountrySpec } from './countries';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
  country?: IBANCountrySpec;
  components?: IBANComponents;
}

export interface IBANComponents {
  countryCode: string;
  checkDigits: string;
  bban: string;
  bankIdentifier?: string;
  branchIdentifier?: string;
  accountNumber?: string;
}

/**
 * Validate IBAN format and checksum
 */
export function validateIBAN(iban: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Remove spaces and convert to uppercase
  const cleanIBAN = iban.replace(/\s/g, '').toUpperCase();

  // Check minimum length
  if (cleanIBAN.length < 15) {
    errors.push('IBAN is too short (minimum 15 characters)');
    return { isValid: false, errors, warnings };
  }

  if (cleanIBAN.length > 34) {
    errors.push('IBAN is too long (maximum 34 characters)');
    return { isValid: false, errors, warnings };
  }

  // Check format: starts with 2 letters followed by 2 digits
  if (!/^[A-Z]{2}\d{2}/.test(cleanIBAN)) {
    errors.push('IBAN must start with 2 letters (country code) followed by 2 digits (check digits)');
    return { isValid: false, errors, warnings };
  }

  // Check if only alphanumeric characters
  if (!/^[A-Z0-9]+$/.test(cleanIBAN)) {
    errors.push('IBAN contains invalid characters (only A-Z and 0-9 allowed)');
    return { isValid: false, errors, warnings };
  }

  // Extract country code
  const countryCode = cleanIBAN.substring(0, 2);
  const country = getCountrySpec(countryCode);

  if (!country) {
    errors.push(`Unknown country code: ${countryCode}`);
    return { isValid: false, errors, warnings, components: extractComponents(cleanIBAN) };
  }

  // Check length for this country
  if (cleanIBAN.length !== country.length) {
    errors.push(`Invalid length for ${country.country} (expected ${country.length}, got ${cleanIBAN.length})`);
    return { isValid: false, errors, warnings, country };
  }

  // Validate against country-specific regex pattern
  if (!country.regex.test(cleanIBAN)) {
    errors.push(`IBAN does not match the format for ${country.country}`);
    return { isValid: false, errors, warnings, country };
  }

  // Validate checksum using MOD-97 algorithm
  if (!validateChecksum(cleanIBAN)) {
    errors.push('Invalid checksum - IBAN failed MOD-97 validation');
    return { isValid: false, errors, warnings, country };
  }

  // Extract components
  const components = extractComponents(cleanIBAN, country);

  return {
    isValid: true,
    errors: [],
    warnings: warnings.length > 0 ? warnings : undefined,
    country,
    components
  };
}

/**
 * Calculate MOD-97 checksum for IBAN validation
 */
export function validateChecksum(iban: string): boolean {
  const cleanIBAN = iban.replace(/\s/g, '').toUpperCase();
  
  // Move first 4 characters to the end
  const rearranged = cleanIBAN.substring(4) + cleanIBAN.substring(0, 4);
  
  // Replace letters with numbers (A=10, B=11, ..., Z=35)
  const numericString = rearranged.replace(/[A-Z]/g, (char) =>
    (char.charCodeAt(0) - 55).toString()
  );
  
  // Calculate MOD 97
  const remainder = mod97(numericString);
  
  return remainder === 1;
}

/**
 * Calculate MOD 97 for large numbers (as strings)
 */
function mod97(numericString: string): number {
  let remainder = 0;
  
  for (let i = 0; i < numericString.length; i++) {
    remainder = (remainder * 10 + parseInt(numericString[i], 10)) % 97;
  }
  
  return remainder;
}

/**
 * Calculate check digits for an IBAN
 */
export function calculateCheckDigits(countryCode: string, bban: string): string {
  // Create IBAN with check digits set to 00
  const ibanWithZeros = countryCode + '00' + bban;
  
  // Move first 4 characters to the end
  const rearranged = ibanWithZeros.substring(4) + ibanWithZeros.substring(0, 4);
  
  // Replace letters with numbers
  const numericString = rearranged.replace(/[A-Z]/g, (char) =>
    (char.charCodeAt(0) - 55).toString()
  );
  
  // Calculate MOD 97
  const remainder = mod97(numericString);
  
  // Check digit is 98 - remainder
  const checkDigit = 98 - remainder;
  
  // Pad with leading zero if needed
  return checkDigit.toString().padStart(2, '0');
}

/**
 * Extract IBAN components (country, check digits, bank code, etc.)
 */
export function extractComponents(iban: string, country?: IBANCountrySpec): IBANComponents {
  const cleanIBAN = iban.replace(/\s/g, '').toUpperCase();
  
  const components: IBANComponents = {
    countryCode: cleanIBAN.substring(0, 2),
    checkDigits: cleanIBAN.substring(2, 4),
    bban: cleanIBAN.substring(4)
  };

  if (country) {
    // Extract bank identifier
    const bban = components.bban;
    const bankStart = country.bankIdentifier.position;
    const bankEnd = bankStart + country.bankIdentifier.length;
    components.bankIdentifier = bban.substring(bankStart, bankEnd);

    // Extract branch identifier if exists
    if (country.branchIdentifier) {
      const branchStart = country.branchIdentifier.position;
      const branchEnd = branchStart + country.branchIdentifier.length;
      components.branchIdentifier = bban.substring(branchStart, branchEnd);
    }

    // Extract account number (everything after bank and branch codes)
    let accountStart = bankEnd;
    if (country.branchIdentifier) {
      accountStart = Math.max(accountStart, country.branchIdentifier.position + country.branchIdentifier.length);
    }
    components.accountNumber = bban.substring(accountStart);
  }

  return components;
}

/**
 * Quick validation - just check format without detailed errors
 */
export function isValidIBAN(iban: string): boolean {
  const result = validateIBAN(iban);
  return result.isValid;
}

/**
 * Batch validation - validate multiple IBANs
 */
export interface BatchValidationResult {
  iban: string;
  result: ValidationResult;
}

export function validateIBANBatch(ibans: string[]): BatchValidationResult[] {
  return ibans.map(iban => ({
    iban,
    result: validateIBAN(iban)
  }));
}

/**
 * Get validation summary for batch
 */
export interface BatchSummary {
  total: number;
  valid: number;
  invalid: number;
  validPercentage: number;
}

export function getBatchSummary(results: BatchValidationResult[]): BatchSummary {
  const total = results.length;
  const valid = results.filter(r => r.result.isValid).length;
  const invalid = total - valid;
  const validPercentage = total > 0 ? (valid / total) * 100 : 0;

  return { total, valid, invalid, validPercentage };
}

