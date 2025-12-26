'use client';

import { useState, useCallback, JSX } from 'react';
import { extractPropertiesWithWildcard, buildMergedSchemaTree, SchemaNode } from '@/lib/json/mapper';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { Alert } from '@/components/shared/Alert';
import { ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';

export default function JSONMapper() {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [mode, setMode] = useState<'text' | 'visual'>('visual');
  const [pathsText, setPathsText] = useState('');
  const [tree, setTree] = useState<SchemaNode[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
  const [error, setError] = useState('');

  const handleFileUpload = useCallback((value: string) => {
    setInputData(value);
    setOutputData('');
    setError('');
    
    try {
      const jsonData = JSON.parse(value);
      const treeNodes = buildMergedSchemaTree(jsonData);
      setTree(treeNodes);
    } catch (e) {
      setError('Invalid JSON');
      setTree([]);
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

      const result = extractPropertiesWithWildcard(jsonData, paths);

      if (!result.success) {
        setError(result.error || 'Failed to extract properties');
        return;
      }

      setOutputData(JSON.stringify(result.data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Extraction failed');
    }
  }, [inputData, mode, pathsText, selectedPaths]);

  const toggleExpand = (path: string, nodes: SchemaNode[]): SchemaNode[] => {
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

  const renderTree = (nodes: SchemaNode[], level: number = 0): JSX.Element[] => {
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
          
          {node.arrayCount !== undefined && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
              [{node.arrayCount} items]
            </span>
          )}
          
          {node.frequency && (
            <span className={`text-xs px-2 py-0.5 rounded ${
              node.isOptional 
                ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
            }`}>
              {node.frequency.present}/{node.frequency.total}
              {node.isOptional && <AlertTriangle className="inline h-3 w-3 ml-1" />}
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

      {/* Input and Selector Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JSONTextarea
          value={inputData}
          onChange={handleFileUpload}
          label="JSON Input"
          placeholder="Paste your JSON here or drag and drop a file..."
          accept=".json,.txt"
          minHeight="min-h-96"
        />

        {mode === 'text' ? (
          <div>
            <label className="block text-sm font-medium mb-2">
              Property Paths (comma or newline separated)
            </label>
            <textarea
              value={pathsText}
              onChange={(e) => setPathsText(e.target.value)}
              placeholder={`users[*].name\nusers[*].email\nitems[*].price\naddress.city`}
              className="w-full min-h-96 p-4 border-2 rounded-lg font-mono text-sm bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-y"
              spellCheck={false}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Use [*] for arrays. Examples: users[*].name, items[*].id
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Properties from Schema
            </label>
            <div className="border-2 rounded-lg p-4 min-h-96 max-h-96 overflow-y-auto bg-muted/50 border-border">
              {tree.length > 0 ? (
                renderTree(tree)
              ) : (
                <p className="text-sm text-muted-foreground">
                  Enter valid JSON to see the merged schema tree
                </p>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {selectedPaths.size} properties
              {selectedPaths.size > 0 && (
                <button
                  onClick={() => setSelectedPaths(new Set())}
                  className="ml-2 text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Extract Button */}
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
            setTree([]);
          }}
        >
          Clear
        </Button>
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      {/* Output */}
      {outputData && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Extracted JSON Output</label>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigator.clipboard.writeText(outputData)}
            >
              Copy Output
            </Button>
          </div>
          <JSONTextarea
            value={outputData}
            onChange={() => {}}
            placeholder="Extracted JSON will appear here..."
            readOnly
            minHeight="min-h-96"
          />
        </div>
      )}
    </div>
  );
}
