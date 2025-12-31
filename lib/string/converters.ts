// Binary/Hex/Decimal Converters

export function textToBinary(text: string): string {
  return text
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

export function binaryToText(binary: string): string {
  try {
    return binary
      .split(/\s+/)
      .map((bin) => String.fromCharCode(parseInt(bin, 2)))
      .join('');
  } catch (error) {
    throw new Error('Invalid binary string');
  }
}

export function textToHex(text: string): string {
  return text
    .split('')
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ');
}

export function hexToText(hex: string): string {
  try {
    return hex
      .split(/\s+/)
      .map((h) => String.fromCharCode(parseInt(h, 16)))
      .join('');
  } catch (error) {
    throw new Error('Invalid hex string');
  }
}

export function decimalToBinary(decimal: number): string {
  return decimal.toString(2);
}

export function binaryToDecimal(binary: string): number {
  return parseInt(binary, 2);
}

export function decimalToHex(decimal: number): string {
  return decimal.toString(16).toUpperCase();
}

export function hexToDecimal(hex: string): number {
  return parseInt(hex, 16);
}

export function binaryToHex(binary: string): string {
  return decimalToHex(binaryToDecimal(binary));
}

export function hexToBinary(hex: string): string {
  return decimalToBinary(hexToDecimal(hex));
}

// Markdown to HTML Converter (lazy loaded)
export async function markdownToHTML(markdown: string): Promise<string> {
  try {
    const { marked } = await import('marked');
    
    // Configure marked for security
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    
    return marked.parse(markdown) as string;
  } catch (error) {
    throw new Error('Failed to convert Markdown to HTML');
  }
}

// HTML to Plain Text
export function htmlToText(html: string): string {
  // Remove script and style tags with their content
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Replace common block elements with newlines
  text = text.replace(/<\/?(div|p|br|h[1-6]|li|tr)[^>]*>/gi, '\n');
  
  // Remove all remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');
  
  // Decode HTML entities
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  text = doc.body.textContent || '';
  
  // Clean up extra whitespace
  text = text.replace(/\n\s*\n/g, '\n\n').trim();
  
  return text;
}

// JSON String Escape/Unescape
export function escapeJSONString(text: string): string {
  return JSON.stringify(text).slice(1, -1);
}

export function unescapeJSONString(text: string): string {
  try {
    return JSON.parse(`"${text}"`);
  } catch (error) {
    throw new Error('Invalid escaped JSON string');
  }
}

// SQL String Escape
export function escapeSQLString(text: string): string {
  return text.replace(/'/g, "''");
}

// CSV Escape
export function escapeCSVField(text: string): string {
  if (text.includes(',') || text.includes('"') || text.includes('\n')) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

