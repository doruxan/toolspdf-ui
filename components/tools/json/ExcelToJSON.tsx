'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { excelToJson, jsonToExcel, getExcelSheetNames } from '@/lib/json/excel-converter';
import FileUpload from '@/components/shared/FileUpload';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';
import { Alert } from '@/components/shared/Alert';
import { ArrowLeftRight } from 'lucide-react';

export default function ExcelToJSON() {
  const [mode, setMode] = useState<'excel-to-json' | 'json-to-excel'>('excel-to-json');
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [excelBuffer, setExcelBuffer] = useState<ArrayBuffer | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [sheetName, setSheetName] = useState('Sheet1');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    setError('');

    if (mode === 'excel-to-json') {
      const buffer = await file.arrayBuffer();
      setExcelBuffer(buffer);
      
      const sheets = getExcelSheetNames(buffer);
      setSheetNames(sheets);
      if (sheets.length > 0) {
        setSelectedSheet(sheets[0]);
      }
    } else {
      const text = await file.text();
      setInputData(text);
    }
  }, [mode]);

  const handleConvertExcelToJSON = useCallback(async () => {
    if (!excelBuffer) {
      setError('Please upload an Excel file');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const result = excelToJson(excelBuffer, {
        sheetName: selectedSheet,
        headerRow: 1,
        skipEmptyLines: true,
      });

      if (!result.success) {
        setError(result.error || 'Failed to convert Excel to JSON');
        setProcessing(false);
        return;
      }

      setOutputData(JSON.stringify(result.data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
    } finally {
      setProcessing(false);
    }
  }, [excelBuffer, selectedSheet]);

  const handleConvertJSONToExcel = useCallback(async () => {
    if (!inputData.trim()) {
      setError('Please provide JSON input');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      let jsonData;
      try {
        jsonData = JSON.parse(inputData);
      } catch (e) {
        setError('Invalid JSON input');
        setProcessing(false);
        return;
      }

      if (!Array.isArray(jsonData)) {
        setError('JSON must be an array of objects');
        setProcessing(false);
        return;
      }

      const result = jsonToExcel(jsonData, sheetName);

      if (!result.success || !result.buffer) {
        setError(result.error || 'Failed to convert JSON to Excel');
        setProcessing(false);
        return;
      }

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

      setOutputData(`Excel file "${sheetName}.xlsx" has been downloaded`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
    } finally {
      setProcessing(false);
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

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant={mode === 'excel-to-json' ? 'primary' : 'secondary'}
          onClick={() => {
            setMode('excel-to-json');
            handleClear();
          }}
        >
          Excel to JSON
        </Button>
        <Button
          variant={mode === 'json-to-excel' ? 'primary' : 'secondary'}
          onClick={() => {
            setMode('json-to-excel');
            handleClear();
          }}
        >
          JSON to Excel
        </Button>
      </div>

      {/* Options */}
      {mode === 'excel-to-json' && sheetNames.length > 0 && (
        <Select
          label="Select Sheet"
          value={selectedSheet}
          onChange={(e) => setSelectedSheet(e.target.value)}
          options={sheetNames.map((name) => ({ value: name, label: name }))}
        />
      )}

      {mode === 'json-to-excel' && (
        <div>
          <label className="block text-sm font-medium mb-2">Sheet Name</label>
          <input
            type="text"
            value={sheetName}
            onChange={(e) => setSheetName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Sheet1"
          />
        </div>
      )}

      {/* File Upload */}
      <FileUpload
        accept={mode === 'excel-to-json' ? '.xlsx' : '.json,.txt'}
        onFilesSelected={handleFileUpload}
        label={mode === 'excel-to-json' ? 'Upload Excel file (.xlsx)' : 'Upload JSON file'}
      />

      {/* Input Area (JSON to Excel mode) */}
      {mode === 'json-to-excel' && (
        <div>
          <label className="block text-sm font-medium mb-2">JSON Input</label>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Paste your JSON array here..."
            className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
            spellCheck={false}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={mode === 'excel-to-json' ? handleConvertExcelToJSON : handleConvertJSONToExcel}
          disabled={
            processing ||
            (mode === 'excel-to-json' ? !excelBuffer : !inputData.trim())
          }
        >
          {processing ? 'Converting...' : `Convert to ${mode === 'excel-to-json' ? 'JSON' : 'Excel'}`}
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {/* Error */}
      {error && <Alert variant="error">{error}</Alert>}

      {/* Output */}
      {outputData && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">
              {mode === 'excel-to-json' ? 'JSON Output' : 'Result'}
            </label>
            {mode === 'excel-to-json' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigator.clipboard.writeText(outputData)}
              >
                Copy to Clipboard
              </Button>
            )}
          </div>
          <textarea
            value={outputData}
            readOnly
            className="w-full h-64 p-4 border rounded-lg font-mono text-sm bg-muted"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}

