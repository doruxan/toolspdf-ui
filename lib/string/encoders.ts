// Base64 Encoding/Decoding
export function encodeBase64(text: string): string {
  try {
    // Use Buffer in Node.js environment or btoa in browser
    if (typeof window === 'undefined') {
      return Buffer.from(text, 'utf-8').toString('base64');
    }
    return btoa(unescape(encodeURIComponent(text)));
  } catch (error) {
    throw new Error('Failed to encode to Base64');
  }
}

export function decodeBase64(encoded: string): string {
  try {
    if (typeof window === 'undefined') {
      return Buffer.from(encoded, 'base64').toString('utf-8');
    }
    return decodeURIComponent(escape(atob(encoded)));
  } catch (error) {
    throw new Error('Invalid Base64 string');
  }
}

export function isValidBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

// URL Encoding/Decoding
export function encodeURL(text: string): string {
  return encodeURIComponent(text);
}

export function decodeURL(encoded: string): string {
  try {
    return decodeURIComponent(encoded);
  } catch (error) {
    throw new Error('Invalid URL-encoded string');
  }
}

export function encodeURLFull(url: string): string {
  return encodeURI(url);
}

export function decodeURLFull(url: string): string {
  try {
    return decodeURI(url);
  } catch (error) {
    throw new Error('Invalid URL');
  }
}

// HTML Entity Encoding/Decoding
const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
};

const htmlEntitiesReverse: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x2F;': '/',
};

export function encodeHTMLEntities(text: string): string {
  return text.replace(/[&<>"'\/]/g, (char) => htmlEntities[char] || char);
}

export function decodeHTMLEntities(text: string): string {
  return text.replace(/&[#\w]+;/g, (entity) => {
    if (htmlEntitiesReverse[entity]) {
      return htmlEntitiesReverse[entity];
    }
    // Handle numeric entities
    if (entity.startsWith('&#')) {
      const code = entity.startsWith('&#x') 
        ? parseInt(entity.slice(3, -1), 16)
        : parseInt(entity.slice(2, -1), 10);
      return String.fromCharCode(code);
    }
    return entity;
  });
}

// Unicode Escape/Unescape
export function escapeUnicode(text: string): string {
  return text
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code > 127) {
        return '\\u' + ('0000' + code.toString(16)).slice(-4);
      }
      return char;
    })
    .join('');
}

export function unescapeUnicode(text: string): string {
  return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

