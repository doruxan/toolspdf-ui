// IBAN formatting, parsing, and generation utilities

import { getCountrySpec, getAllCountryCodes, IBANCountrySpec } from './countries';
import { calculateCheckDigits, extractComponents, IBANComponents } from './core';

/**
 * Format IBAN with spaces (print format)
 * Default: groups of 4 characters
 */
export function formatIBAN(iban: string, groupSize: number = 4): string {
  const cleanIBAN = iban.replace(/\s/g, '').toUpperCase();
  
  // Split into groups
  const groups: string[] = [];
  for (let i = 0; i < cleanIBAN.length; i += groupSize) {
    groups.push(cleanIBAN.substring(i, i + groupSize));
  }
  
  return groups.join(' ');
}

/**
 * Format IBAN in electronic format (no spaces)
 */
export function formatIBANElectronic(iban: string): string {
  return iban.replace(/\s/g, '').toUpperCase();
}

/**
 * Format IBAN with country-specific grouping
 */
export function formatIBANCountrySpecific(iban: string): string {
  const cleanIBAN = formatIBANElectronic(iban);
  const countryCode = cleanIBAN.substring(0, 2);
  const country = getCountrySpec(countryCode);

  if (!country) {
    return formatIBAN(cleanIBAN); // Default formatting
  }

  // Parse BBAN format to determine grouping
  // Format like "4n 4n 12c" means groups of 4, 4, and 12
  const formatParts = country.bbanFormat.split(' ');
  const groups: string[] = [];
  
  // Always start with country code + check digits as first group
  groups.push(cleanIBAN.substring(0, 4));
  
  let position = 4;
  for (const part of formatParts) {
    const length = parseInt(part.match(/\d+/)?.[0] || '0', 10);
    if (length > 0) {
      groups.push(cleanIBAN.substring(position, position + length));
      position += length;
    }
  }
  
  return groups.join(' ');
}

/**
 * Remove formatting from IBAN (normalize)
 */
export function normalizeIBAN(iban: string): string {
  return iban.replace(/\s/g, '').toUpperCase();
}

/**
 * Parse IBAN into components with labels
 */
export interface ParsedIBAN extends IBANComponents {
  formatted: string;
  electronicFormat: string;
  country?: IBANCountrySpec;
}

export function parseIBAN(iban: string): ParsedIBAN | null {
  const cleanIBAN = normalizeIBAN(iban);
  
  if (cleanIBAN.length < 15) {
    return null;
  }

  const countryCode = cleanIBAN.substring(0, 2);
  const country = getCountrySpec(countryCode);
  const components = extractComponents(cleanIBAN, country);

  return {
    ...components,
    formatted: formatIBANCountrySpecific(cleanIBAN),
    electronicFormat: cleanIBAN,
    country
  };
}

/**
 * Generate a valid random IBAN for a given country
 */
export function generateRandomIBAN(countryCode: string): string | null {
  const country = getCountrySpec(countryCode);
  
  if (!country) {
    return null;
  }

  // Generate random BBAN based on format
  const bban = generateRandomBBAN(country);
  
  // Calculate check digits
  const checkDigits = calculateCheckDigits(countryCode, bban);
  
  return countryCode + checkDigits + bban;
}

/**
 * Generate random BBAN based on country format
 */
function generateRandomBBAN(country: IBANCountrySpec): string {
  const bbanLength = country.length - 4; // Subtract country code and check digits
  let bban = '';

  // Parse format specification
  const formatParts = country.bbanFormat.split(' ');
  
  for (const part of formatParts) {
    const match = part.match(/(\d+)([nac])/);
    if (!match) continue;

    const length = parseInt(match[1], 10);
    const type = match[2];

    switch (type) {
      case 'n': // Numeric
        bban += generateRandomDigits(length);
        break;
      case 'a': // Alphabetic
        bban += generateRandomLetters(length);
        break;
      case 'c': // Alphanumeric
        bban += generateRandomAlphanumeric(length);
        break;
    }
  }

  // Ensure correct length
  if (bban.length > bbanLength) {
    bban = bban.substring(0, bbanLength);
  } else if (bban.length < bbanLength) {
    bban = bban.padEnd(bbanLength, '0');
  }

  return bban;
}

/**
 * Generate random digits
 */
function generateRandomDigits(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

/**
 * Generate random uppercase letters
 */
function generateRandomLetters(length: number): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += letters[Math.floor(Math.random() * letters.length)];
  }
  return result;
}

/**
 * Generate random alphanumeric characters
 */
function generateRandomAlphanumeric(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

/**
 * Generate multiple random IBANs for a country
 */
export function generateMultipleIBANs(countryCode: string, count: number): string[] {
  const ibans: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const iban = generateRandomIBAN(countryCode);
    if (iban) {
      ibans.push(iban);
    }
  }
  
  return ibans;
}

/**
 * Generate IBAN with specific bank/branch code
 */
export function generateIBANWithCodes(
  countryCode: string,
  bankCode?: string,
  branchCode?: string
): string | null {
  const country = getCountrySpec(countryCode);
  
  if (!country) {
    return null;
  }

  let bban = generateRandomBBAN(country);

  // Replace bank code if provided
  if (bankCode && country.bankIdentifier) {
    const start = country.bankIdentifier.position;
    const end = start + country.bankIdentifier.length;
    const paddedBankCode = bankCode.padEnd(country.bankIdentifier.length, '0').substring(0, country.bankIdentifier.length);
    bban = bban.substring(0, start) + paddedBankCode + bban.substring(end);
  }

  // Replace branch code if provided
  if (branchCode && country.branchIdentifier) {
    const start = country.branchIdentifier.position;
    const end = start + country.branchIdentifier.length;
    const paddedBranchCode = branchCode.padEnd(country.branchIdentifier.length, '0').substring(0, country.branchIdentifier.length);
    bban = bban.substring(0, start) + paddedBranchCode + bban.substring(end);
  }

  // Calculate check digits
  const checkDigits = calculateCheckDigits(countryCode, bban);
  
  return countryCode + checkDigits + bban;
}

/**
 * Convert IBAN to different formats
 */
export interface IBANFormats {
  electronic: string;
  print: string;
  countrySpecific: string;
  grouped2: string;
  grouped4: string;
}

export function convertToFormats(iban: string): IBANFormats {
  const cleanIBAN = normalizeIBAN(iban);
  
  return {
    electronic: cleanIBAN,
    print: formatIBAN(cleanIBAN, 4),
    countrySpecific: formatIBANCountrySpecific(cleanIBAN),
    grouped2: formatIBAN(cleanIBAN, 2),
    grouped4: formatIBAN(cleanIBAN, 4)
  };
}

/**
 * Get IBAN display parts for visual representation
 */
export interface IBANDisplayParts {
  countryCode: { value: string; label: string; color: string };
  checkDigits: { value: string; label: string; color: string };
  bankCode: { value: string; label: string; color: string };
  branchCode?: { value: string; label: string; color: string };
  accountNumber: { value: string; label: string; color: string };
}

export function getIBANDisplayParts(iban: string): IBANDisplayParts | null {
  const parsed = parseIBAN(iban);
  
  if (!parsed || !parsed.country) {
    return null;
  }

  const parts: IBANDisplayParts = {
    countryCode: {
      value: parsed.countryCode,
      label: 'Country Code',
      color: 'bg-blue-100 text-blue-800'
    },
    checkDigits: {
      value: parsed.checkDigits,
      label: 'Check Digits',
      color: 'bg-green-100 text-green-800'
    },
    bankCode: {
      value: parsed.bankIdentifier || '',
      label: 'Bank Code',
      color: 'bg-purple-100 text-purple-800'
    },
    accountNumber: {
      value: parsed.accountNumber || '',
      label: 'Account Number',
      color: 'bg-orange-100 text-orange-800'
    }
  };

  if (parsed.branchIdentifier) {
    parts.branchCode = {
      value: parsed.branchIdentifier,
      label: 'Branch Code',
      color: 'bg-yellow-100 text-yellow-800'
    };
  }

  return parts;
}

/**
 * Validate and format IBAN in one step
 */
export function validateAndFormat(iban: string): { isValid: boolean; formatted: string; error?: string } {
  try {
    const cleanIBAN = normalizeIBAN(iban);
    
    if (cleanIBAN.length < 15) {
      return { isValid: false, formatted: iban, error: 'IBAN too short' };
    }

    const formatted = formatIBANCountrySpecific(cleanIBAN);
    return { isValid: true, formatted };
  } catch (error) {
    return { isValid: false, formatted: iban, error: 'Invalid format' };
  }
}

/**
 * Extract country name from IBAN
 */
export function getCountryName(iban: string): string {
  const cleanIBAN = normalizeIBAN(iban);
  const countryCode = cleanIBAN.substring(0, 2);
  const country = getCountrySpec(countryCode);
  return country?.country || 'Unknown';
}

/**
 * Check if country uses SEPA
 */
export function isSEPACountry(countryCode: string): boolean {
  const country = getCountrySpec(countryCode);
  return country?.sepa || false;
}

