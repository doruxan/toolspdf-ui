export interface TreeNode {
  key: string;
  path: string;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  value?: any;
  children?: TreeNode[];
  isExpanded?: boolean;
}

export interface MapResult {
  success: boolean;
  data?: any;
  error?: string;
}

export function extractProperties(jsonData: any, paths: string[]): MapResult {
  try {
    if (!jsonData || paths.length === 0) {
      return {
        success: false,
        error: 'Invalid input: jsonData and paths are required',
      };
    }

    const result: any = {};

    for (const path of paths) {
      try {
        const value = getValueByPath(jsonData, path);
        setValueByPath(result, path, value);
      } catch (error) {
        // Continue with other paths even if one fails
        console.warn(`Failed to extract path "${path}":`, error);
      }
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to extract properties',
    };
  }
}

function getValueByPath(obj: any, path: string): any {
  // Handle array notation like items[0].name
  const parts = path.match(/([^[\].]+|\[\d+\])/g) || [];
  
  let current = obj;
  
  for (const part of parts) {
    if (part.startsWith('[') && part.endsWith(']')) {
      // Array index
      const index = parseInt(part.slice(1, -1), 10);
      if (!Array.isArray(current)) {
        throw new Error(`Expected array at path ${path}`);
      }
      current = current[index];
    } else {
      // Object property
      if (current === null || current === undefined) {
        throw new Error(`Cannot access property "${part}" of ${current}`);
      }
      current = current[part];
    }
    
    if (current === undefined) {
      return undefined;
    }
  }
  
  return current;
}

function setValueByPath(obj: any, path: string, value: any): void {
  const parts = path.match(/([^[\].]+|\[\d+\])/g) || [];
  
  if (parts.length === 0) return;
  
  let current = obj;
  
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    
    if (part.startsWith('[') && part.endsWith(']')) {
      const index = parseInt(part.slice(1, -1), 10);
      if (!Array.isArray(current)) {
        throw new Error('Expected array');
      }
      
      if (!current[index]) {
        current[index] = nextPart.startsWith('[') ? [] : {};
      }
      current = current[index];
    } else {
      if (!current[part]) {
        current[part] = nextPart.startsWith('[') ? [] : {};
      }
      current = current[part];
    }
  }
  
  const lastPart = parts[parts.length - 1];
  if (lastPart.startsWith('[') && lastPart.endsWith(']')) {
    const index = parseInt(lastPart.slice(1, -1), 10);
    if (!Array.isArray(current)) {
      throw new Error('Expected array');
    }
    current[index] = value;
  } else {
    current[lastPart] = value;
  }
}

export function buildJsonTree(jsonData: any, parentPath: string = ''): TreeNode[] {
  const nodes: TreeNode[] = [];

  if (jsonData === null) {
    return [{
      key: 'null',
      path: parentPath,
      type: 'null',
      value: null,
    }];
  }

  if (Array.isArray(jsonData)) {
    return jsonData.map((item, index) => {
      const path = parentPath ? `${parentPath}[${index}]` : `[${index}]`;
      const type = getType(item);
      
      return {
        key: `[${index}]`,
        path,
        type,
        value: type !== 'object' && type !== 'array' ? item : undefined,
        children: type === 'object' || type === 'array' ? buildJsonTree(item, path) : undefined,
        isExpanded: false,
      };
    });
  }

  if (typeof jsonData === 'object') {
    for (const key in jsonData) {
      if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
        const value = jsonData[key];
        const path = parentPath ? `${parentPath}.${key}` : key;
        const type = getType(value);

        nodes.push({
          key,
          path,
          type,
          value: type !== 'object' && type !== 'array' ? value : undefined,
          children: type === 'object' || type === 'array' ? buildJsonTree(value, path) : undefined,
          isExpanded: false,
        });
      }
    }
  }

  return nodes;
}

function getType(value: any): TreeNode['type'] {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  return 'string';
}

export function flattenJson(jsonData: any, prefix: string = ''): Record<string, any> {
  const result: Record<string, any> = {};

  function flatten(obj: any, currentPrefix: string) {
    if (obj === null || obj === undefined) {
      result[currentPrefix] = obj;
      return;
    }

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        flatten(item, `${currentPrefix}[${index}]`);
      });
    } else if (typeof obj === 'object') {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const newPrefix = currentPrefix ? `${currentPrefix}.${key}` : key;
          flatten(obj[key], newPrefix);
        }
      }
    } else {
      result[currentPrefix] = obj;
    }
  }

  flatten(jsonData, prefix);
  return result;
}

