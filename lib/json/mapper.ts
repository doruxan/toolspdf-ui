export interface TreeNode {
  key: string;
  path: string;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  value?: any;
  children?: TreeNode[];
  isExpanded?: boolean;
}

export interface SchemaNode {
  key: string;
  path: string;
  type: TreeNode['type'];
  frequency?: { present: number; total: number };
  isOptional?: boolean;
  children?: SchemaNode[];
  isExpanded?: boolean;
  arrayCount?: number;
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

/**
 * Build a merged schema tree from JSON data, combining all array items into a single template
 */
export function buildMergedSchemaTree(jsonData: any, parentPath: string = ''): SchemaNode[] {
  const nodes: SchemaNode[] = [];

  if (jsonData === null) {
    return [{
      key: 'null',
      path: parentPath,
      type: 'null',
      isExpanded: false,
    }];
  }

  if (Array.isArray(jsonData)) {
    if (jsonData.length === 0) {
      return [{
        key: '[empty]',
        path: parentPath,
        type: 'array',
        arrayCount: 0,
        isExpanded: false,
      }];
    }

    // Merge all array items into a single schema
    const mergedSchema = mergeArrayItems(jsonData);
    const path = parentPath ? `${parentPath}[*]` : '[*]';
    
    return [{
      key: '[item]',
      path,
      type: 'object',
      arrayCount: jsonData.length,
      isExpanded: false,
      children: buildSchemaFromMerged(mergedSchema, path, jsonData.length),
    }];
  }

  if (typeof jsonData === 'object') {
    for (const key in jsonData) {
      if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
        const value = jsonData[key];
        const path = parentPath ? `${parentPath}.${key}` : key;
        const type = getType(value);

        if (Array.isArray(value)) {
          nodes.push({
            key,
            path,
            type: 'array',
            arrayCount: value.length,
            isExpanded: false,
            children: value.length > 0 ? buildMergedSchemaTree(value, path) : undefined,
          });
        } else if (type === 'object') {
          nodes.push({
            key,
            path,
            type,
            isExpanded: false,
            children: buildMergedSchemaTree(value, path),
          });
        } else {
          nodes.push({
            key,
            path,
            type,
            isExpanded: false,
          });
        }
      }
    }
  }

  return nodes;
}

/**
 * Merge all items in an array to find all possible properties
 */
function mergeArrayItems(array: any[]): Record<string, any> {
  const merged: Record<string, { values: any[]; count: number }> = {};
  
  for (const item of array) {
    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          if (!merged[key]) {
            merged[key] = { values: [], count: 0 };
          }
          merged[key].values.push(item[key]);
          merged[key].count++;
        }
      }
    }
  }
  
  return merged;
}

/**
 * Build schema nodes from merged array data
 */
function buildSchemaFromMerged(
  merged: Record<string, { values: any[]; count: number }>,
  parentPath: string,
  totalItems: number
): SchemaNode[] {
  const nodes: SchemaNode[] = [];
  
  for (const key in merged) {
    const { values, count } = merged[key];
    const path = `${parentPath}.${key}`;
    const isOptional = count < totalItems;
    
    // Determine the type by looking at the first non-null value
    const sampleValue = values.find(v => v !== null && v !== undefined) || values[0];
    const type = getType(sampleValue);
    
    const node: SchemaNode = {
      key,
      path,
      type,
      frequency: { present: count, total: totalItems },
      isOptional,
      isExpanded: false,
    };
    
    // Recursively handle nested objects and arrays
    if (type === 'array' && Array.isArray(sampleValue)) {
      node.arrayCount = sampleValue.length;
      if (sampleValue.length > 0) {
        node.children = buildMergedSchemaTree(sampleValue, path);
      }
    } else if (type === 'object') {
      // Merge all object values at this property
      const allObjects = values.filter(v => typeof v === 'object' && v !== null && !Array.isArray(v));
      if (allObjects.length > 0) {
        const mergedObjects = mergeArrayItems(allObjects);
        node.children = buildSchemaFromMerged(mergedObjects, path, allObjects.length);
      }
    }
    
    nodes.push(node);
  }
  
  return nodes;
}

/**
 * Extract properties using wildcard paths (e.g., users[*].name)
 */
export function extractPropertiesWithWildcard(jsonData: any, paths: string[]): MapResult {
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
        // Check if path contains [*] wildcard
        if (path.includes('[*]')) {
          extractWildcardPath(jsonData, path, result);
        } else {
          const value = getValueByPath(jsonData, path);
          setValueByPath(result, path, value);
        }
      } catch (error) {
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

/**
 * Extract values using wildcard notation (e.g., users[*].name)
 */
function extractWildcardPath(source: any, path: string, target: any): void {
  const parts = path.split('[*]');
  
  if (parts.length < 2) {
    // No wildcard, use regular extraction
    const value = getValueByPath(source, path);
    setValueByPath(target, path, value);
    return;
  }
  
  // Get to the array
  const arrayPath = parts[0];
  const array = arrayPath ? getValueByPath(source, arrayPath) : source;
  
  if (!Array.isArray(array)) {
    return;
  }
  
  // Remaining path after [*]
  const remainingPath = parts.slice(1).join('[*]');
  const results: any[] = [];
  
  for (const item of array) {
    try {
      if (remainingPath) {
        // Remove leading dot if present
        const cleanPath = remainingPath.startsWith('.') ? remainingPath.slice(1) : remainingPath;
        if (cleanPath.includes('[*]')) {
          // Nested wildcards
          const nestedResult: any = {};
          extractWildcardPath(item, cleanPath, nestedResult);
          results.push(nestedResult);
        } else {
          const value = cleanPath ? getValueByPath(item, cleanPath) : item;
          results.push(value);
        }
      } else {
        results.push(item);
      }
    } catch (error) {
      // Skip items that don't have the property
      results.push(undefined);
    }
  }
  
  // Set the results in the target
  if (arrayPath) {
    setValueByPath(target, arrayPath, results);
  } else {
    // If no array path, the root is the array
    Object.assign(target, results);
  }
}

