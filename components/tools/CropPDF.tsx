'use client';

import { useState } from 'react';
import { Crop } from 'lucide-react';
import FileUpload from '../shared/FileUpload';
import ProgressBar from '../shared/ProgressBar';
import { cropPdf, CropOptions } from '@/lib/pdf/cropPdf';
import { downloadPDF } from '@/lib/pdf/merge';

export default function CropPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [options, setOptions] = useState<CropOptions>({
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
    unit: 'mm',
  });

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setFile(files[0]);
      setError('');
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const handleCrop = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    setProcessing(true);
    setProgress(30);
    setError('');

    try {
      setProgress(60);
      const pdfBytes = await cropPdf(file, options);
      setProgress(90);
      
      downloadPDF(pdfBytes, `${file.name.replace('.pdf', '')}_cropped.pdf`);
      setProgress(100);

      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to crop PDF');
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
          <Crop className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Crop PDF</h1>
        <p className="text-muted-foreground">Adjust page margins and crop PDF pages</p>
      </div>

      {!file ? (
        <FileUpload
          onFilesSelected={handleFileSelect}
          accept=".pdf"
          multiple={false}
          label="Upload PDF File to crop"
        />
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>File:</strong> {file.name}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Top Margin
              </label>
              <input
                type="number"
                value={options.top}
                onChange={(e) => setOptions({ ...options, top: parseFloat(e.target.value) || 0 })}
                min="0"
                step="1"
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                disabled={processing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Right Margin
              </label>
              <input
                type="number"
                value={options.right}
                onChange={(e) => setOptions({ ...options, right: parseFloat(e.target.value) || 0 })}
                min="0"
                step="1"
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                disabled={processing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bottom Margin
              </label>
              <input
                type="number"
                value={options.bottom}
                onChange={(e) => setOptions({ ...options, bottom: parseFloat(e.target.value) || 0 })}
                min="0"
                step="1"
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                disabled={processing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Left Margin
              </label>
              <input
                type="number"
                value={options.left}
                onChange={(e) => setOptions({ ...options, left: parseFloat(e.target.value) || 0 })}
                min="0"
                step="1"
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                disabled={processing}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Unit
            </label>
            <select
              value={options.unit}
              onChange={(e) => setOptions({ ...options, unit: e.target.value as CropOptions['unit'] })}
              className="w-full md:w-48 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              disabled={processing}
            >
              <option value="mm">Millimeters (mm)</option>
              <option value="in">Inches (in)</option>
              <option value="pt">Points (pt)</option>
            </select>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {processing && <ProgressBar progress={progress} />}

          <div className="flex gap-4">
            <button
              onClick={handleCrop}
              disabled={processing}
              className="flex-1 bg-primary hover:bg-button-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Cropping...' : 'Crop PDF'}
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

