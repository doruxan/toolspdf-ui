export interface FormatOptions {
  indentSize?: number;
  useTabs?: boolean;
}

export interface FormatResult {
  success: boolean;
  formatted?: string;
  error?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  errorPosition?: { line: number; column: number };
}

export function formatJson(
  jsonString: string,
  options: FormatOptions = {}
): FormatResult {
  try {
    const { indentSize = 2, useTabs = false } = options;
    
    // First validate
    const validation = validateJson(jsonString);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    const parsed = JSON.parse(jsonString);
    const indent = useTabs ? '\t' : ' '.repeat(indentSize);
    const formatted = JSON.stringify(parsed, null, indent);

    return {
      success: true,
      formatted,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to format JSON',
    };
  }
}

export function minifyJson(jsonString: string): FormatResult {
  try {
    // Validate first
    const validation = validateJson(jsonString);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    const parsed = JSON.parse(jsonString);
    const minified = JSON.stringify(parsed);

    return {
      success: true,
      formatted: minified,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to minify JSON',
    };
  }
}

export function validateJson(jsonString: string): ValidationResult {
  if (!jsonString || jsonString.trim().length === 0) {
    return {
      isValid: false,
      error: 'Empty input',
    };
  }

  try {
    JSON.parse(jsonString);
    return {
      isValid: true,
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Try to extract line and column from error message
      const match = error.message.match(/position (\d+)/);
      if (match) {
        const position = parseInt(match[1], 10);
        const lines = jsonString.substring(0, position).split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        
        return {
          isValid: false,
          error: error.message,
          errorPosition: { line, column },
        };
      }
      
      return {
        isValid: false,
        error: error.message,
      };
    }
    
    return {
      isValid: false,
      error: 'Invalid JSON',
    };
  }
}

export function sortJsonKeys(jsonString: string): FormatResult {
  try {
    const parsed = JSON.parse(jsonString);
    
    const sortKeys = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(sortKeys);
      }
      if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj)
          .sort()
          .reduce((result: any, key) => {
            result[key] = sortKeys(obj[key]);
            return result;
          }, {});
      }
      return obj;
    };

    const sorted = sortKeys(parsed);
    const formatted = JSON.stringify(sorted, null, 2);

    return {
      success: true,
      formatted,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sort JSON keys',
    };
  }
}

