'use client';

import { useState } from 'react';
import { ArrowUpDown, Upload } from 'lucide-react';
import FileUpload from '../shared/FileUpload';
import ProgressBar from '../shared/ProgressBar';
import { reorderPages, reversePages } from '@/lib/pdf/organizePdf';
import { downloadPDF } from '@/lib/pdf/merge';

export default function OrganizePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [newOrder, setNewOrder] = useState('');
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
        const pageCount = pdfDoc.getPageCount();
        setTotalPages(pageCount);
        // Set default order
        setNewOrder(Array.from({ length: pageCount }, (_, i) => i + 1).join(', '));
      } catch (err) {
        setError('Failed to read PDF file');
      }
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const handleReorder = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    if (!newOrder.trim()) {
      setError('Please enter the new page order');
      return;
    }

    setProcessing(true);
    setProgress(30);
    setError('');

    try {
      const pageNumbers = newOrder.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
      
      if (pageNumbers.length === 0) {
        setError('No valid page numbers provided');
        setProcessing(false);
        return;
      }

      setProgress(60);
      const pdfBytes = await reorderPages(file, pageNumbers);
      setProgress(90);
      
      downloadPDF(pdfBytes, `${file.name.replace('.pdf', '')}_reordered.pdf`);
      setProgress(100);

      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder pages');
      setProcessing(false);
      setProgress(0);
    }
  };

  const handleReverse = async () => {
    if (!file) return;

    setProcessing(true);
    setProgress(30);
    setError('');

    try {
      setProgress(60);
      const pdfBytes = await reversePages(file);
      setProgress(90);
      
      downloadPDF(pdfBytes, `${file.name.replace('.pdf', '')}_reversed.pdf`);
      setProgress(100);

      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reverse pages');
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mb-4">
          <ArrowUpDown className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Organize PDF Pages</h1>
        <p className="text-muted-foreground">Reorder or reverse pages in your PDF document</p>
      </div>

      {!file ? (
        <FileUpload
          onFilesSelected={handleFileSelect}
          accept=".pdf"
          multiple={false}
          icon={Upload}
          title="Upload PDF File"
          description="Select a PDF file to organize"
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
              New Page Order
            </label>
            <input
              type="text"
              value={newOrder}
              onChange={(e) => setNewOrder(e.target.value)}
              placeholder="e.g., 3, 1, 2, 4, 5"
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              disabled={processing}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Enter page numbers in your desired order, separated by commas
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
              onClick={handleReorder}
              disabled={processing}
              className="flex-1 bg-primary hover:bg-button-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Reordering...' : 'Reorder Pages'}
            </button>
            <button
              onClick={handleReverse}
              disabled={processing}
              className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reverse All
            </button>
            <button
              onClick={() => {
                setFile(null);
                setNewOrder('');
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

