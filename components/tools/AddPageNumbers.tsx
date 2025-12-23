'use client';

import { useState } from 'react';
import { Hash } from 'lucide-react';
import FileUpload from '../shared/FileUpload';
import ProgressBar from '../shared/ProgressBar';
import { addPageNumbers, PageNumberOptions } from '@/lib/pdf/pageNumbers';
import { downloadPDF } from '@/lib/pdf/merge';

export default function AddPageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [options, setOptions] = useState<PageNumberOptions>({
    position: 'bottom-center',
    fontSize: 12,
    format: 'number',
    startPage: 1,
  });

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setFile(files[0]);
      setError('');
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const handleAddPageNumbers = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    setProcessing(true);
    setProgress(30);
    setError('');

    try {
      setProgress(60);
      const pdfBytes = await addPageNumbers(file, options);
      setProgress(90);
      
      downloadPDF(pdfBytes, `${file.name.replace('.pdf', '')}_numbered.pdf`);
      setProgress(100);

      // Reset after delay
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add page numbers');
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-4">
          <Hash className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Add Page Numbers</h1>
        <p className="text-muted-foreground">Add page numbers to your PDF document</p>
      </div>

      {!file ? (
        <FileUpload
          onFilesSelected={handleFileSelect}
          accept=".pdf"
          multiple={false}
          label="Upload PDF File to add page numbers"
        />
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>File:</strong> {file.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Position
              </label>
              <select
                value={options.position}
                onChange={(e) => setOptions({ ...options, position: e.target.value as PageNumberOptions['position'] })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                disabled={processing}
              >
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Format
              </label>
              <select
                value={options.format}
                onChange={(e) => setOptions({ ...options, format: e.target.value as PageNumberOptions['format'] })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                disabled={processing}
              >
                <option value="number">1, 2, 3...</option>
                <option value="page-x">Page 1, Page 2...</option>
                <option value="page-x-of-y">Page 1 of 10...</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Font Size
              </label>
              <input
                type="number"
                value={options.fontSize}
                onChange={(e) => setOptions({ ...options, fontSize: parseInt(e.target.value) || 12 })}
                min="8"
                max="24"
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                disabled={processing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Start Page Number
              </label>
              <input
                type="number"
                value={options.startPage}
                onChange={(e) => setOptions({ ...options, startPage: parseInt(e.target.value) || 1 })}
                min="1"
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                disabled={processing}
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {processing && <ProgressBar progress={progress} />}

          <div className="flex gap-4">
            <button
              onClick={handleAddPageNumbers}
              disabled={processing}
              className="flex-1 bg-primary hover:bg-button-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Adding Numbers...' : 'Add Page Numbers'}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setError('');
              }}
              disabled={processing}
              className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

