export interface DiffResult {
  success: boolean;
  differences?: JsonDifference[];
  error?: string;
  summary?: DiffSummary;
}

export interface JsonDifference {
  path: string;
  type: 'added' | 'removed' | 'modified' | 'unchanged';
  oldValue?: any;
  newValue?: any;
}

export interface DiffSummary {
  added: number;
  removed: number;
  modified: number;
  unchanged: number;
}

export function compareJson(json1: any, json2: any): DiffResult {
  try {
    const differences: JsonDifference[] = [];
    
    compare(json1, json2, '', differences);
    
    const summary: DiffSummary = {
      added: differences.filter(d => d.type === 'added').length,
      removed: differences.filter(d => d.type === 'removed').length,
      modified: differences.filter(d => d.type === 'modified').length,
      unchanged: differences.filter(d => d.type === 'unchanged').length,
    };

    return {
      success: true,
      differences,
      summary,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to compare JSON',
    };
  }
}

function compare(
  obj1: any,
  obj2: any,
  path: string,
  differences: JsonDifference[]
): void {
  // Handle null/undefined
  if (obj1 === null || obj1 === undefined) {
    if (obj2 === null || obj2 === undefined) {
      differences.push({ path: path || '/', type: 'unchanged' });
      return;
    }
    differences.push({
      path: path || '/',
      type: 'added',
      newValue: obj2,
    });
    return;
  }

  if (obj2 === null || obj2 === undefined) {
    differences.push({
      path: path || '/',
      type: 'removed',
      oldValue: obj1,
    });
    return;
  }

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    const maxLength = Math.max(obj1.length, obj2.length);
    
    for (let i = 0; i < maxLength; i++) {
      const currentPath = path ? `${path}[${i}]` : `[${i}]`;
      
      if (i >= obj1.length) {
        differences.push({
          path: currentPath,
          type: 'added',
          newValue: obj2[i],
        });
      } else if (i >= obj2.length) {
        differences.push({
          path: currentPath,
          type: 'removed',
          oldValue: obj1[i],
        });
      } else {
        compare(obj1[i], obj2[i], currentPath, differences);
      }
    }
    return;
  }

  // Handle objects
  if (isObject(obj1) && isObject(obj2)) {
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    
    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (!(key in obj1)) {
        differences.push({
          path: currentPath,
          type: 'added',
          newValue: obj2[key],
        });
      } else if (!(key in obj2)) {
        differences.push({
          path: currentPath,
          type: 'removed',
          oldValue: obj1[key],
        });
      } else {
        compare(obj1[key], obj2[key], currentPath, differences);
      }
    }
    return;
  }

  // Handle primitives
  if (obj1 === obj2) {
    differences.push({
      path: path || '/',
      type: 'unchanged',
    });
  } else {
    differences.push({
      path: path || '/',
      type: 'modified',
      oldValue: obj1,
      newValue: obj2,
    });
  }
}

function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

export function generateDiffHtml(differences: JsonDifference[]): string {
  let html = '<div class="json-diff">';
  
  for (const diff of differences) {
    const pathHtml = `<span class="path">${escapeHtml(diff.path)}</span>`;
    
    switch (diff.type) {
      case 'added':
        html += `<div class="diff-added">+ ${pathHtml}: ${escapeHtml(JSON.stringify(diff.newValue))}</div>`;
        break;
      case 'removed':
        html += `<div class="diff-removed">- ${pathHtml}: ${escapeHtml(JSON.stringify(diff.oldValue))}</div>`;
        break;
      case 'modified':
        html += `<div class="diff-modified">~ ${pathHtml}: ${escapeHtml(JSON.stringify(diff.oldValue))} → ${escapeHtml(JSON.stringify(diff.newValue))}</div>`;
        break;
      case 'unchanged':
        // Skip unchanged for cleaner output
        break;
    }
  }
  
  html += '</div>';
  return html;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function mergeDifferences(json1: any, json2: any, strategy: 'left' | 'right' | 'merge'): any {
  if (strategy === 'left') return json1;
  if (strategy === 'right') return json2;
  
  // Merge strategy: prefer right for conflicts, include all keys
  if (isObject(json1) && isObject(json2)) {
    const result: any = { ...json1 };
    
    for (const key in json2) {
      if (Object.prototype.hasOwnProperty.call(json2, key)) {
        if (key in json1 && isObject(json1[key]) && isObject(json2[key])) {
          result[key] = mergeDifferences(json1[key], json2[key], strategy);
        } else {
          result[key] = json2[key];
        }
      }
    }
    
    return result;
  }
  
  return json2; // Prefer right for non-objects
}

