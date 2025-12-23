'use client';

import { useState } from 'react';
import { Scissors } from 'lucide-react';
import FileUpload from '../shared/FileUpload';
import ProgressBar from '../shared/ProgressBar';
import { extractPages, parsePageNumbers } from '@/lib/pdf/extractPages';
import { downloadPDF } from '@/lib/pdf/merge';

export default function ExtractPages() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesToExtract, setPagesToExtract] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileSelect = async (files: File[]) => {
    if (files.length > 0 && files[0].type === 'application/pdf') {
      const selectedFile = files[0];
      setFile(selectedFile);
      setError('');

      // Get page count
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const { PDFDocument } = await import('pdf-lib');
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setTotalPages(pdfDoc.getPageCount());
      } catch (err) {
        setError('Failed to read PDF file');
      }
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const handleExtractPages = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    if (!pagesToExtract.trim()) {
      setError('Please enter page numbers to extract');
      return;
    }

    setProcessing(true);
    setProgress(30);
    setError('');

    try {
      const pages = parsePageNumbers(pagesToExtract, totalPages);
      
      if (pages.length === 0) {
        setError('No valid page numbers provided');
        setProcessing(false);
        return;
      }

      setProgress(60);
      const pdfBytes = await extractPages(file, pages);
      setProgress(90);
      
      downloadPDF(pdfBytes, `${file.name.replace('.pdf', '')}_extracted.pdf`);
      setProgress(100);

      // Reset after delay
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract pages');
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
          <Scissors className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Extract PDF Pages</h1>
        <p className="text-muted-foreground">Extract specific pages from your PDF document</p>
      </div>

      {!file ? (
        <FileUpload
          onFilesSelected={handleFileSelect}
          accept=".pdf"
          multiple={false}
          label="Upload PDF File to extract pages"
        />
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>File:</strong> {file.name}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Total Pages:</strong> {totalPages}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Pages to Extract
            </label>
            <input
              type="text"
              value={pagesToExtract}
              onChange={(e) => setPagesToExtract(e.target.value)}
              placeholder="e.g., 1,3,5-7"
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              disabled={processing}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Enter page numbers separated by commas, or ranges with hyphens (e.g., 1,3,5-7)
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {processing && <ProgressBar progress={progress} />}

          <div className="flex gap-4">
            <button
              onClick={handleExtractPages}
              disabled={processing}
              className="flex-1 bg-primary hover:bg-button-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Extracting Pages...' : 'Extract Pages'}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setPagesToExtract('');
                setTotalPages(0);
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

