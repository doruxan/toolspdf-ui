// Remove Accents/Diacritics
export function removeAccents(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Detect and extract emojis
const EMOJI_REGEX = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;

export function extractEmojis(text: string): string[] {
  const matches = text.match(EMOJI_REGEX);
  return matches || [];
}

export function removeEmojis(text: string): string {
  return text.replace(EMOJI_REGEX, '');
}

export function countEmojis(text: string): number {
  return extractEmojis(text).length;
}

// Zero-width character detection
const ZERO_WIDTH_CHARS = [
  '\u200B', // Zero Width Space
  '\u200C', // Zero Width Non-Joiner
  '\u200D', // Zero Width Joiner
  '\uFEFF', // Zero Width No-Break Space
  '\u2060', // Word Joiner
];

export function detectZeroWidthChars(text: string): {
  found: boolean;
  positions: { index: number; char: string; name: string }[];
} {
  const positions: { index: number; char: string; name: string }[] = [];
  
  const charNames: Record<string, string> = {
    '\u200B': 'Zero Width Space',
    '\u200C': 'Zero Width Non-Joiner',
    '\u200D': 'Zero Width Joiner',
    '\uFEFF': 'Zero Width No-Break Space (BOM)',
    '\u2060': 'Word Joiner',
  };
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (ZERO_WIDTH_CHARS.includes(char)) {
      positions.push({
        index: i,
        char: char,
        name: charNames[char] || 'Unknown Zero-Width Character',
      });
    }
  }
  
  return {
    found: positions.length > 0,
    positions,
  };
}

export function removeZeroWidthChars(text: string): string {
  let result = text;
  for (const char of ZERO_WIDTH_CHARS) {
    result = result.replace(new RegExp(char, 'g'), '');
  }
  return result;
}

// Bracket/Parenthesis Matcher
export interface BracketMatch {
  isBalanced: boolean;
  errors: { position: number; message: string }[];
}

const BRACKET_PAIRS: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

export function checkBrackets(text: string): BracketMatch {
  const stack: { char: string; position: number }[] = [];
  const errors: { position: number; message: string }[] = [];
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (BRACKET_PAIRS[char]) {
      // Opening bracket
      stack.push({ char, position: i });
    } else if (Object.values(BRACKET_PAIRS).includes(char)) {
      // Closing bracket
      if (stack.length === 0) {
        errors.push({
          position: i,
          message: `Unexpected closing bracket '${char}' at position ${i}`,
        });
      } else {
        const last = stack.pop()!;
        const expected = BRACKET_PAIRS[last.char];
        
        if (expected !== char) {
          errors.push({
            position: i,
            message: `Mismatched brackets: expected '${expected}' but found '${char}' at position ${i}`,
          });
        }
      }
    }
  }
  
  // Check for unclosed brackets
  for (const { char, position } of stack) {
    errors.push({
      position,
      message: `Unclosed bracket '${char}' at position ${position}`,
    });
  }
  
  return {
    isBalanced: errors.length === 0,
    errors,
  };
}

// Get Unicode information
export interface UnicodeInfo {
  char: string;
  codePoint: string;
  decimal: number;
  hex: string;
  name: string;
}

export function getUnicodeInfo(text: string): UnicodeInfo[] {
  const result: UnicodeInfo[] = [];
  
  for (const char of text) {
    const codePoint = char.codePointAt(0) || 0;
    result.push({
      char,
      codePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`,
      decimal: codePoint,
      hex: `0x${codePoint.toString(16).toUpperCase()}`,
      name: getCharacterName(char),
    });
  }
  
  return result;
}

function getCharacterName(char: string): string {
  // Basic character names (can be expanded)
  const codePoint = char.codePointAt(0) || 0;
  
  if (codePoint >= 0x0020 && codePoint <= 0x007E) {
    return 'Basic Latin';
  } else if (codePoint >= 0x0080 && codePoint <= 0x00FF) {
    return 'Latin-1 Supplement';
  } else if (codePoint >= 0x1F600 && codePoint <= 0x1F64F) {
    return 'Emoticons';
  } else if (codePoint >= 0x1F300 && codePoint <= 0x1F5FF) {
    return 'Miscellaneous Symbols and Pictographs';
  }
  
  return 'Unicode Character';
}

