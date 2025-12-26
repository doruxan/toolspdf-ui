'use client';

import { useState, useCallback, useEffect } from 'react';
import { excelToJson, jsonToExcel, getExcelSheetNames } from '@/lib/json/excel-converter';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { SideBySideLayout } from '@/components/shared/SideBySideLayout';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';
import FileUpload from '@/components/shared/FileUpload';

export default function ExcelToJSON() {
  const [mode, setMode] = useState<'excel-to-json' | 'json-to-excel'>('excel-to-json');
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [excelBuffer, setExcelBuffer] = useState<ArrayBuffer | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [sheetName, setSheetName] = useState('Sheet1');
  const [error, setError] = useState('');

  // Handle Excel file upload
  const handleExcelUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    setError('');

    const buffer = await file.arrayBuffer();
    setExcelBuffer(buffer);
    
    const sheets = getExcelSheetNames(buffer);
    setSheetNames(sheets);
    if (sheets.length > 0) {
      setSelectedSheet(sheets[0]);
    }
  }, []);

  // Convert Excel to JSON when sheet is selected
  useEffect(() => {
    if (!excelBuffer || !selectedSheet) return;

    const result = excelToJson(excelBuffer, {
      sheetName: selectedSheet,
      headerRow: 1,
      skipEmptyLines: true,
    });

    if (result.success) {
      setOutputData(JSON.stringify(result.data, null, 2));
      setError('');
    } else {
      setError(result.error || 'Failed to convert Excel to JSON');
      setOutputData('');
    }
  }, [excelBuffer, selectedSheet]);

  // Real-time JSON to Excel validation
  useEffect(() => {
    if (mode !== 'json-to-excel') return;
    
    if (!inputData.trim()) {
      setError('');
      return;
    }

    try {
      const jsonData = JSON.parse(inputData);
      if (!Array.isArray(jsonData)) {
        setError('JSON must be an array of objects');
      } else {
        setError('');
      }
    } catch (e) {
      setError('Invalid JSON input');
    }
  }, [inputData, mode]);

  const handleConvertJSONToExcel = useCallback(async () => {
    if (!inputData.trim()) {
      setError('Please provide JSON input');
      return;
    }

    try {
      const jsonData = JSON.parse(inputData);

      if (!Array.isArray(jsonData)) {
        setError('JSON must be an array of objects');
        return;
      }

      const result = jsonToExcel(jsonData, sheetName);

      if (result.success && result.buffer) {
        // Create download link
        const blob = new Blob([result.buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${sheetName}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);

        setOutputData(`✓ Excel file "${sheetName}.xlsx" has been downloaded`);
        setError('');
      } else {
        setError(result.error || 'Failed to convert JSON to Excel');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
    }
  }, [inputData, sheetName]);

  const handleClear = () => {
    setInputData('');
    setOutputData('');
    setExcelBuffer(null);
    setSheetNames([]);
    setSelectedSheet('');
    setError('');
  };

  if (mode === 'excel-to-json') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <Button variant="primary" onClick={() => setMode('excel-to-json')}>
            Excel → JSON
          </Button>
          <Button variant="secondary" onClick={() => {
            setMode('json-to-excel');
            handleClear();
          }}>
            JSON → Excel
          </Button>
        </div>

        {sheetNames.length > 0 && (
          <Select
            label="Select Sheet"
            value={selectedSheet}
            onChange={(e) => setSelectedSheet(e.target.value)}
            options={sheetNames.map((name) => ({ value: name, label: name }))}
          />
        )}

        <FileUpload
          accept=".xlsx"
          onFilesSelected={handleExcelUpload}
          label="Upload Excel file (.xlsx)"
        />

        {error && (
          <div className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        {outputData && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">JSON Output</label>
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
              placeholder="JSON output will appear here..."
              readOnly
              minHeight="min-h-96"
            />
          </div>
        )}

        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>
    );
  }

  // JSON to Excel mode
  return (
    <SideBySideLayout
      options={
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Button variant="secondary" onClick={() => {
              setMode('excel-to-json');
              handleClear();
            }}>
              Excel → JSON
            </Button>
            <Button variant="primary" onClick={() => setMode('json-to-excel')}>
              JSON → Excel
            </Button>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Sheet Name</label>
            <input
              type="text"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              className="w-full p-2 border-2 rounded-lg bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Sheet1"
            />
          </div>
        </div>
      }
      leftPanel={
        <JSONTextarea
          value={inputData}
          onChange={setInputData}
          label="JSON Input (Array of Objects)"
          placeholder="Paste your JSON array here..."
          accept=".json,.txt"
          minHeight="min-h-96"
        />
      }
      rightPanel={
        <div className="space-y-4">
          <label className="block text-sm font-medium">Preview & Download</label>
          <div className="min-h-96 p-4 border-2 rounded-lg bg-muted/50 border-border">
            {outputData ? (
              <div className="text-center py-8">
                <p className="text-lg font-medium text-green-600 dark:text-green-400">{outputData}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {inputData ? 'Click "Generate Excel" to create the file' : 'Enter JSON to preview'}
              </p>
            )}
          </div>
        </div>
      }
      actions={
        <div className="flex flex-wrap gap-4">
          {error && (
            <div className="flex-1 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}
          <Button onClick={handleConvertJSONToExcel} disabled={!inputData.trim() || !!error}>
            Generate Excel File
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      }
    />
  );
}
