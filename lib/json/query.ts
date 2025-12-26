import { JSONPath } from 'jsonpath-plus';

export interface QueryResult {
  success: boolean;
  results?: any[];
  error?: string;
  count?: number;
}

export function queryJson(jsonData: any, path: string): QueryResult {
  try {
    if (!path || path.trim().length === 0) {
      return {
        success: false,
        error: 'JSONPath expression is required',
      };
    }

    // Validate that path starts with $ or @
    if (!path.startsWith('$') && !path.startsWith('@')) {
      path = '$.' + path;
    }

    const results = JSONPath({
      path,
      json: jsonData,
      wrap: true, // Always return array
    });

    return {
      success: true,
      results: results || [],
      count: results ? results.length : 0,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid JSONPath expression',
    };
  }
}

export const commonQueries = {
  allValues: '$.*',
  allArrayItems: '$[*]',
  firstItem: '$[0]',
  lastItem: '$[-1]',
  recursiveSearch: '$..propertyName',
  filterGreaterThan: '$[?(@.value > 10)]',
  filterEquals: '$[?(@.status === "active")]',
  filterExists: '$[?(@.email)]',
  selectMultiple: '$["name", "email", "age"]',
};

export const queryExamples = [
  {
    name: 'Get all items',
    expression: '$.*',
    description: 'Returns all top-level values',
  },
  {
    name: 'Get array items',
    expression: '$[*]',
    description: 'Returns all items in root array',
  },
  {
    name: 'Get first item',
    expression: '$[0]',
    description: 'Returns first item in array',
  },
  {
    name: 'Get last item',
    expression: '$[-1]',
    description: 'Returns last item in array',
  },
  {
    name: 'Recursive search',
    expression: '$..email',
    description: 'Finds all "email" properties at any depth',
  },
  {
    name: 'Filter by condition',
    expression: '$[?(@.age > 18)]',
    description: 'Returns items where age is greater than 18',
  },
  {
    name: 'Filter by equality',
    expression: '$[?(@.status === "active")]',
    description: 'Returns items with status = "active"',
  },
  {
    name: 'Filter by existence',
    expression: '$[?(@.premium)]',
    description: 'Returns items that have "premium" property',
  },
  {
    name: 'Select multiple properties',
    expression: '$["name", "email"]',
    description: 'Returns only name and email from root',
  },
  {
    name: 'Array slice',
    expression: '$[0:3]',
    description: 'Returns first 3 items from array',
  },
];

export function validateJsonPath(path: string): { isValid: boolean; error?: string } {
  try {
    if (!path || path.trim().length === 0) {
      return {
        isValid: false,
        error: 'JSONPath expression cannot be empty',
      };
    }

    // Try to parse with a dummy object
    JSONPath({ path, json: { dummy: 'value' } });

    return {
      isValid: true,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid JSONPath expression',
    };
  }
}

export function explainJsonPath(path: string): string {
  const parts: string[] = [];

  if (path.startsWith('$')) {
    parts.push('Root object');
    path = path.slice(1);
  }

  if (path.startsWith('..')) {
    parts.push('Recursive descent (search at any depth)');
    path = path.slice(2);
  } else if (path.startsWith('.')) {
    path = path.slice(1);
  }

  const segments = path.split('.');
  
  for (const segment of segments) {
    if (segment.includes('[')) {
      const bracketMatch = segment.match(/([^[]*)\[([^\]]+)\]/);
      if (bracketMatch) {
        const [, prop, index] = bracketMatch;
        if (prop) parts.push(`Property: ${prop}`);
        
        if (index === '*') {
          parts.push('All array items');
        } else if (index.startsWith('?')) {
          parts.push(`Filter: ${index}`);
        } else if (index.includes(':')) {
          parts.push(`Array slice: ${index}`);
        } else {
          parts.push(`Array index: ${index}`);
        }
      }
    } else if (segment) {
      parts.push(`Property: ${segment}`);
    }
  }

  return parts.join(' → ');
}

