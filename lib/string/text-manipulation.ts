export type SortOrder = 'asc' | 'desc';
export type SortType = 'alphabetical' | 'numerical' | 'length' | 'random';

export function sortLines(text: string, type: SortType, order: SortOrder = 'asc'): string {
  const lines = text.split('\n');
  
  let sorted: string[];
  
  switch (type) {
    case 'alphabetical':
      sorted = lines.sort((a, b) => {
        const comparison = a.localeCompare(b);
        return order === 'asc' ? comparison : -comparison;
      });
      break;
      
    case 'numerical':
      sorted = lines.sort((a, b) => {
        const numA = parseFloat(a) || 0;
        const numB = parseFloat(b) || 0;
        const comparison = numA - numB;
        return order === 'asc' ? comparison : -comparison;
      });
      break;
      
    case 'length':
      sorted = lines.sort((a, b) => {
        const comparison = a.length - b.length;
        return order === 'asc' ? comparison : -comparison;
      });
      break;
      
    case 'random':
      sorted = lines.sort(() => Math.random() - 0.5);
      break;
      
    default:
      sorted = lines;
  }
  
  return sorted.join('\n');
}

export type DuplicateKeep = 'first' | 'last' | 'none';

export function removeDuplicateLines(text: string, keep: DuplicateKeep = 'first'): string {
  const lines = text.split('\n');
  const seen = new Set<string>();
  const result: string[] = [];
  
  if (keep === 'first') {
    for (const line of lines) {
      if (!seen.has(line)) {
        seen.add(line);
        result.push(line);
      }
    }
  } else if (keep === 'last') {
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      if (!seen.has(line)) {
        seen.add(line);
        result.unshift(line);
      }
    }
  } else {
    // keep === 'none' - remove all duplicates
    const counts = new Map<string, number>();
    for (const line of lines) {
      counts.set(line, (counts.get(line) || 0) + 1);
    }
    for (const line of lines) {
      if (counts.get(line) === 1 && !seen.has(line)) {
        seen.add(line);
        result.push(line);
      }
    }
  }
  
  return result.join('\n');
}

export function reverseText(text: string): string {
  return text.split('').reverse().join('');
}

export function reverseWords(text: string): string {
  return text.split(/\s+/).reverse().join(' ');
}

export function reverseLines(text: string): string {
  return text.split('\n').reverse().join('\n');
}

export type WhitespaceAction = 'trim' | 'normalize' | 'remove-all' | 'remove-extra';

export function processWhitespace(text: string, action: WhitespaceAction): string {
  switch (action) {
    case 'trim':
      return text.split('\n').map(line => line.trim()).join('\n');
      
    case 'normalize':
      return text.replace(/\s+/g, ' ').trim();
      
    case 'remove-all':
      return text.replace(/\s/g, '');
      
    case 'remove-extra':
      return text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n').trim();
      
    default:
      return text;
  }
}

export interface FindReplaceOptions {
  caseSensitive?: boolean;
  wholeWord?: boolean;
  useRegex?: boolean;
  global?: boolean;
}

export function findReplace(
  text: string,
  find: string,
  replace: string,
  options: FindReplaceOptions = {}
): string {
  const {
    caseSensitive = false,
    wholeWord = false,
    useRegex = false,
    global = true,
  } = options;

  if (!find) return text;

  if (useRegex) {
    try {
      const flags = (global ? 'g' : '') + (caseSensitive ? '' : 'i');
      const regex = new RegExp(find, flags);
      return text.replace(regex, replace);
    } catch (error) {
      throw new Error('Invalid regular expression');
    }
  }

  let searchPattern = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  if (wholeWord) {
    searchPattern = `\\b${searchPattern}\\b`;
  }

  const flags = (global ? 'g' : '') + (caseSensitive ? '' : 'i');
  const regex = new RegExp(searchPattern, flags);
  
  return text.replace(regex, replace);
}

export function countOccurrences(
  text: string,
  search: string,
  caseSensitive: boolean = false
): number {
  if (!search) return 0;
  
  const flags = caseSensitive ? 'g' : 'gi';
  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, flags);
  
  return (text.match(regex) || []).length;
}

