// UUID Generator
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateMultipleUUIDs(count: number): string[] {
  return Array.from({ length: count }, () => generateUUID());
}

// Password Generator
export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function generatePassword(options: PasswordOptions): string {
  const { length, uppercase, lowercase, numbers, symbols } = options;
  
  if (length < 1) {
    throw new Error('Password length must be at least 1');
  }
  
  let charset = '';
  const requiredChars: string[] = [];
  
  if (uppercase) {
    charset += UPPERCASE;
    requiredChars.push(UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]);
  }
  if (lowercase) {
    charset += LOWERCASE;
    requiredChars.push(LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]);
  }
  if (numbers) {
    charset += NUMBERS;
    requiredChars.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
  }
  if (symbols) {
    charset += SYMBOLS;
    requiredChars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }
  
  if (charset.length === 0) {
    throw new Error('At least one character type must be selected');
  }
  
  // Generate random characters for remaining length
  const remainingLength = Math.max(0, length - requiredChars.length);
  const randomChars = Array.from({ length: remainingLength }, () => {
    return charset[Math.floor(Math.random() * charset.length)];
  });
  
  // Combine required and random characters, then shuffle
  const allChars = [...requiredChars, ...randomChars];
  const shuffled = allChars.sort(() => Math.random() - 0.5);
  
  return shuffled.join('').slice(0, length);
}

export function estimatePasswordStrength(password: string): {
  score: number;
  label: string;
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];
  
  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters');
  } else if (password.length < 12) {
    score += 1;
  } else if (password.length < 16) {
    score += 2;
  } else {
    score += 3;
  }
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Add lowercase letters');
  
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Add uppercase letters');
  
  if (/\d/.test(password)) score += 1;
  else feedback.push('Add numbers');
  
  if (/[^a-zA-Z\d]/.test(password)) score += 1;
  else feedback.push('Add special characters');
  
  let label = 'Weak';
  if (score >= 7) label = 'Very Strong';
  else if (score >= 5) label = 'Strong';
  else if (score >= 3) label = 'Medium';
  
  return { score, label, feedback };
}

// Lorem Ipsum Generator
const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',
];

export function generateLoremIpsum(wordCount: number): string {
  const words: string[] = [];
  
  for (let i = 0; i < wordCount; i++) {
    words.push(LOREM_WORDS[i % LOREM_WORDS.length]);
  }
  
  return words.join(' ');
}

export function generateLoremParagraphs(paragraphCount: number, sentencesPerParagraph: number = 5): string {
  const paragraphs: string[] = [];
  
  for (let i = 0; i < paragraphCount; i++) {
    const sentences: string[] = [];
    
    for (let j = 0; j < sentencesPerParagraph; j++) {
      const wordCount = Math.floor(Math.random() * 8) + 5; // 5-12 words per sentence
      const words = generateLoremIpsum(wordCount);
      const sentence = words.charAt(0).toUpperCase() + words.slice(1) + '.';
      sentences.push(sentence);
    }
    
    paragraphs.push(sentences.join(' '));
  }
  
  return paragraphs.join('\n\n');
}

// Slug Generator
export function generateSlug(text: string, options: { lowercase?: boolean; maxLength?: number } = {}): string {
  const { lowercase = true, maxLength } = options;
  
  let slug = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  
  if (lowercase) {
    slug = slug.toLowerCase();
  }
  
  if (maxLength && slug.length > maxLength) {
    slug = slug.substring(0, maxLength).replace(/-+$/, '');
  }
  
  return slug;
}

