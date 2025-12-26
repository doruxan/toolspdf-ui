export interface EscapeResult {
  success: boolean;
  result?: string;
  error?: string;
}

export function escapeJson(str: string): EscapeResult {
  try {
    if (typeof str !== 'string') {
      return {
        success: false,
        error: 'Input must be a string',
      };
    }

    const escaped = str
      .replace(/\\/g, '\\\\')   // Backslash
      .replace(/"/g, '\\"')     // Double quote
      .replace(/\n/g, '\\n')    // Newline
      .replace(/\r/g, '\\r')    // Carriage return
      .replace(/\t/g, '\\t')    // Tab
      .replace(/\f/g, '\\f')    // Form feed
      .replace(/\b/g, '\\b')    // Backspace
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, (char) => {
        // Control characters
        return '\\u' + ('0000' + char.charCodeAt(0).toString(16)).slice(-4);
      });

    return {
      success: true,
      result: escaped,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to escape JSON',
    };
  }
}

export function unescapeJson(str: string): EscapeResult {
  try {
    if (typeof str !== 'string') {
      return {
        success: false,
        error: 'Input must be a string',
      };
    }

    const unescaped = str
      .replace(/\\"/g, '"')     // Double quote
      .replace(/\\n/g, '\n')    // Newline
      .replace(/\\r/g, '\r')    // Carriage return
      .replace(/\\t/g, '\t')    // Tab
      .replace(/\\f/g, '\f')    // Form feed
      .replace(/\\b/g, '\b')    // Backspace
      .replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
        // Unicode escape sequences
        return String.fromCharCode(parseInt(hex, 16));
      })
      .replace(/\\\\/g, '\\');  // Backslash (must be last)

    return {
      success: true,
      result: unescaped,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to unescape JSON',
    };
  }
}

export function escapeJsonString(str: string): EscapeResult {
  try {
    // Use JSON.stringify for proper escaping
    const escaped = JSON.stringify(str);
    // Remove surrounding quotes
    const result = escaped.slice(1, -1);

    return {
      success: true,
      result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to escape string',
    };
  }
}

export function unescapeJsonString(str: string): EscapeResult {
  try {
    // Add quotes and parse
    const result = JSON.parse(`"${str}"`);

    return {
      success: true,
      result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to unescape string',
    };
  }
}

export function encodeBase64(str: string): EscapeResult {
  try {
    const encoded = btoa(unescape(encodeURIComponent(str)));
    return {
      success: true,
      result: encoded,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to encode Base64',
    };
  }
}

export function decodeBase64(str: string): EscapeResult {
  try {
    const decoded = decodeURIComponent(escape(atob(str)));
    return {
      success: true,
      result: decoded,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to decode Base64',
    };
  }
}

export function encodeUrl(str: string): EscapeResult {
  try {
    const encoded = encodeURIComponent(str);
    return {
      success: true,
      result: encoded,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to encode URL',
    };
  }
}

export function decodeUrl(str: string): EscapeResult {
  try {
    const decoded = decodeURIComponent(str);
    return {
      success: true,
      result: decoded,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to decode URL',
    };
  }
}

