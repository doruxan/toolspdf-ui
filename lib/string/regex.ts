export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export interface RegexTestResult {
  isValid: boolean;
  error?: string;
  matches: RegexMatch[];
  matchCount: number;
}

export function testRegex(pattern: string, text: string, flags: string = 'g'): RegexTestResult {
  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];
    
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        match: match[0],
        index: match.index,
        groups: match.slice(1),
      });
      
      // Prevent infinite loop on zero-width matches
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
    }
    
    return {
      isValid: true,
      matches,
      matchCount: matches.length,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid regular expression',
      matches: [],
      matchCount: 0,
    };
  }
}

export function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function highlightMatches(text: string, pattern: string, flags: string = 'gi'): string {
  try {
    const regex = new RegExp(pattern, flags);
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  } catch (error) {
    return text;
  }
}

// Common regex patterns
export const COMMON_PATTERNS = {
  email: {
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    description: 'Email address',
  },
  url: {
    pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    description: 'URL',
  },
  phone: {
    pattern: '\\+?[0-9]{1,4}?[-.\\s]?\\(?[0-9]{1,3}?\\)?[-.\\s]?[0-9]{1,4}[-.\\s]?[0-9]{1,4}[-.\\s]?[0-9]{1,9}',
    description: 'Phone number',
  },
  ipv4: {
    pattern: '\\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
    description: 'IPv4 address',
  },
  date: {
    pattern: '\\d{4}-\\d{2}-\\d{2}',
    description: 'Date (YYYY-MM-DD)',
  },
  time: {
    pattern: '([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?',
    description: 'Time (HH:MM:SS)',
  },
  hexColor: {
    pattern: '#[0-9a-fA-F]{6}',
    description: 'Hex color code',
  },
  username: {
    pattern: '@[a-zA-Z0-9_]{1,15}',
    description: 'Username (@ mention)',
  },
  hashtag: {
    pattern: '#[a-zA-Z0-9_]+',
    description: 'Hashtag',
  },
  creditCard: {
    pattern: '\\b\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}\\b',
    description: 'Credit card number',
  },
};

export function getCommonPattern(name: keyof typeof COMMON_PATTERNS): string {
  return COMMON_PATTERNS[name].pattern;
}

export function validateRegexSyntax(pattern: string): { valid: boolean; error?: string } {
  try {
    new RegExp(pattern);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid regex syntax',
    };
  }
}

