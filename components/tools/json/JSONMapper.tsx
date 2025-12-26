'use client';

import { useState, useCallback, JSX } from 'react';
import { extractProperties, buildJsonTree, TreeNode } from '@/lib/json/mapper';
import FileUpload from '@/components/shared/FileUpload';
import { Button } from '@/components/shared/Button';
import { Alert } from '@/components/shared/Alert';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';

export default function JSONMapper() {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [mode, setMode] = useState<'text' | 'visual'>('text');
  const [pathsText, setPathsText] = useState('');
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
  const [error, setError] = useState('');

  const handleFileUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    const text = await file.text();
    setInputData(text);
    setOutputData('');
    setError('');
    
    try {
      const jsonData = JSON.parse(text);
      const treeNodes = buildJsonTree(jsonData);
      setTree(treeNodes);
    } catch (e) {
      setError('Invalid JSON');
    }
  }, []);

  const handleExtract = useCallback(() => {
    setError('');

    try {
      if (!inputData.trim()) {
        setError('Please provide JSON input');
        return;
      }

      const jsonData = JSON.parse(inputData);
      
      let paths: string[];
      if (mode === 'text') {
        paths = pathsText
          .split(/[,\n]/)
          .map((p) => p.trim())
          .filter((p) => p.length > 0);
      } else {
        paths = Array.from(selectedPaths);
      }

      if (paths.length === 0) {
        setError('Please select or specify at least one property path');
        return;
      }

      const result = extractProperties(jsonData, paths);

      if (!result.success) {
        setError(result.error || 'Failed to extract properties');
        return;
      }

      setOutputData(JSON.stringify(result.data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Extraction failed');
    }
  }, [inputData, mode, pathsText, selectedPaths]);

  const toggleExpand = (path: string, nodes: TreeNode[]): TreeNode[] => {
    return nodes.map((node) => {
      if (node.path === path) {
        return { ...node, isExpanded: !node.isExpanded };
      }
      if (node.children) {
        return { ...node, children: toggleExpand(path, node.children) };
      }
      return node;
    });
  };

  const handleNodeClick = (path: string) => {
    const newSelected = new Set(selectedPaths);
    if (newSelected.has(path)) {
      newSelected.delete(path);
    } else {
      newSelected.add(path);
    }
    setSelectedPaths(newSelected);
  };

  const renderTree = (nodes: TreeNode[], level: number = 0): JSX.Element[] => {
    return nodes.map((node) => (
      <div key={node.path} style={{ marginLeft: `${level * 20}px` }}>
        <div className="flex items-center gap-2 py-1 hover:bg-muted rounded px-2 cursor-pointer">
          {node.children && node.children.length > 0 && (
            <button
              onClick={() => setTree(toggleExpand(node.path, tree))}
              className="p-1 hover:bg-background rounded"
            >
              {node.isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          <input
            type="checkbox"
            checked={selectedPaths.has(node.path)}
            onChange={() => handleNodeClick(node.path)}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">{node.key}</span>
          <span className="text-xs text-muted-foreground">({node.type})</span>
          {node.value !== undefined && (
            <span className="text-xs text-muted-foreground truncate max-w-xs">
              = {JSON.stringify(node.value)}
            </span>
          )}
        </div>
        {node.children && node.isExpanded && renderTree(node.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-4">
        <Button
          variant={mode === 'text' ? 'primary' : 'secondary'}
          onClick={() => setMode('text')}
        >
          Text Input
        </Button>
        <Button
          variant={mode === 'visual' ? 'primary' : 'secondary'}
          onClick={() => setMode('visual')}
        >
          Visual Tree Selector
        </Button>
      </div>

      <FileUpload
        accept=".json,.txt"
        onFilesSelected={handleFileUpload}
        label="Upload JSON file"
      />

      <div>
        <label className="block text-sm font-medium mb-2">JSON Input</label>
        <textarea
          value={inputData}
          onChange={(e) => {
            setInputData(e.target.value);
            setError('');
            try {
              const jsonData = JSON.parse(e.target.value);
              const treeNodes = buildJsonTree(jsonData);
              setTree(treeNodes);
            } catch (e) {
              // Ignore parsing errors while typing
            }
          }}
          placeholder="Paste your JSON here..."
          className="w-full h-48 p-4 border rounded-lg font-mono text-sm"
          spellCheck={false}
        />
      </div>

      {mode === 'text' ? (
        <div>
          <label className="block text-sm font-medium mb-2">
            Property Paths (comma or newline separated)
          </label>
          <textarea
            value={pathsText}
            onChange={(e) => setPathsText(e.target.value)}
            placeholder={`user.name\nuser.email\nitems[0].price\naddress.city`}
            className="w-full h-32 p-4 border rounded-lg font-mono text-sm"
            spellCheck={false}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Examples: user.name, items[0].id, address.city
          </p>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Properties
          </label>
          <div className="border rounded-lg p-4 max-h-96 overflow-y-auto bg-muted/50">
            {tree.length > 0 ? (
              renderTree(tree)
            ) : (
              <p className="text-sm text-muted-foreground">
                Enter valid JSON to see the tree
              </p>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {selectedPaths.size} properties
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <Button onClick={handleExtract} disabled={!inputData.trim()}>
          Extract Properties
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setInputData('');
            setOutputData('');
            setPathsText('');
            setSelectedPaths(new Set());
            setError('');
          }}
        >
          Clear
        </Button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      {outputData && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Extracted JSON</label>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigator.clipboard.writeText(outputData)}
            >
              Copy to Clipboard
            </Button>
          </div>
          <textarea
            value={outputData}
            readOnly
            className="w-full h-48 p-4 border rounded-lg font-mono text-sm bg-muted"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}

