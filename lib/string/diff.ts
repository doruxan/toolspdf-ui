// Lazy-loaded diff-match-patch for text comparison

export interface DiffResult {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
}

export async function computeTextDiff(text1: string, text2: string): Promise<DiffResult[]> {
  try {
    // Lazy load the diff-match-patch library
    const DiffMatchPatch = (await import('diff-match-patch')).default;
    const dmp = new DiffMatchPatch();
    
    const diffs = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diffs);
    
    return diffs.map(([operation, text]) => {
      let type: 'added' | 'removed' | 'unchanged';
      
      if (operation === 1) {
        type = 'added';
      } else if (operation === -1) {
        type = 'removed';
      } else {
        type = 'unchanged';
      }
      
      return { type, value: text };
    });
  } catch (error) {
    throw new Error('Failed to compute text difference');
  }
}

export interface LineDiff {
  line: string;
  type: 'added' | 'removed' | 'unchanged';
  lineNumber1?: number;
  lineNumber2?: number;
}

export function computeLineDiff(text1: string, text2: string): LineDiff[] {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  
  const result: LineDiff[] = [];
  let i = 0;
  let j = 0;
  
  while (i < lines1.length || j < lines2.length) {
    if (i < lines1.length && j < lines2.length && lines1[i] === lines2[j]) {
      result.push({
        line: lines1[i],
        type: 'unchanged',
        lineNumber1: i + 1,
        lineNumber2: j + 1,
      });
      i++;
      j++;
    } else if (i < lines1.length && (j >= lines2.length || !lines2.includes(lines1[i]))) {
      result.push({
        line: lines1[i],
        type: 'removed',
        lineNumber1: i + 1,
      });
      i++;
    } else if (j < lines2.length) {
      result.push({
        line: lines2[j],
        type: 'added',
        lineNumber2: j + 1,
      });
      j++;
    }
  }
  
  return result;
}

export interface DiffStats {
  additions: number;
  deletions: number;
  unchanged: number;
  total: number;
}

export function calculateDiffStats(diffs: DiffResult[]): DiffStats {
  const stats: DiffStats = {
    additions: 0,
    deletions: 0,
    unchanged: 0,
    total: 0,
  };
  
  for (const diff of diffs) {
    const length = diff.value.length;
    stats.total += length;
    
    if (diff.type === 'added') {
      stats.additions += length;
    } else if (diff.type === 'removed') {
      stats.deletions += length;
    } else {
      stats.unchanged += length;
    }
  }
  
  return stats;
}

