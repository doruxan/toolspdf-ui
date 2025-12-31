export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: number; // in minutes
  speakingTime: number; // in minutes
}

export function analyzeText(text: string): TextStats {
  if (!text || text.trim().length === 0) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTime: 0,
      speakingTime: 0,
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  
  // Count words (split by whitespace, filter empty strings)
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  
  // Count sentences (split by . ! ? followed by space or end of string)
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;
  
  // Count paragraphs (split by double newline)
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length;
  
  // Count lines
  const lines = text.split(/\n/).length;
  
  // Calculate reading time (average: 200 words per minute)
  const readingTime = Math.ceil(words / 200);
  
  // Calculate speaking time (average: 130 words per minute)
  const speakingTime = Math.ceil(words / 130);

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    readingTime,
    speakingTime,
  };
}

export interface CharacterFrequency {
  char: string;
  count: number;
  percentage: number;
}

export function getCharacterFrequency(text: string): CharacterFrequency[] {
  const charMap = new Map<string, number>();
  const totalChars = text.length;

  for (const char of text) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }

  const frequency: CharacterFrequency[] = Array.from(charMap.entries())
    .map(([char, count]) => ({
      char,
      count,
      percentage: (count / totalChars) * 100,
    }))
    .sort((a, b) => b.count - a.count);

  return frequency;
}

export interface WordFrequency {
  word: string;
  count: number;
  percentage: number;
}

export function getWordFrequency(text: string): WordFrequency[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 0);

  const totalWords = words.length;
  const wordMap = new Map<string, number>();

  for (const word of words) {
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  }

  const frequency: WordFrequency[] = Array.from(wordMap.entries())
    .map(([word, count]) => ({
      word,
      count,
      percentage: (count / totalWords) * 100,
    }))
    .sort((a, b) => b.count - a.count);

  return frequency;
}

export function calculateKeywordDensity(text: string, keyword: string): number {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 0);

  const keywordLower = keyword.toLowerCase();
  const keywordCount = words.filter((word) => word === keywordLower).length;

  return words.length > 0 ? (keywordCount / words.length) * 100 : 0;
}

