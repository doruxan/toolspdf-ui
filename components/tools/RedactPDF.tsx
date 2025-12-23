'use client';

import { useState } from 'react';
import { EyeOff, Upload } from 'lucide-react';
import FileUpload from '../shared/FileUpload';
import ProgressBar from '../shared/ProgressBar';
import { redactPdf, RedactionArea } from '@/lib/pdf/redactPdf';
import { downloadPDF } from '@/lib/pdf/merge';

export default function RedactPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [redactions, setRedactions] = useState<RedactionArea[]>([]);
  const [currentRedaction, setCurrentRedaction] = useState<Partial<RedactionArea>>({
    pageNumber: 1,
    x: 50,
    y: 700,
    width: 200,
    height: 20,
  });

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setFile(files[0]);
      setError('');
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const addRedaction = () => {
    if (currentRedaction.pageNumber && currentRedaction.x !== undefined && 
        currentRedaction.y !== undefined && currentRedaction.width && currentRedaction.height) {
      setRedactions([...redactions, currentRedaction as RedactionArea]);
      // Reset for next redaction
      setCurrentRedaction({
        ...currentRedaction,
        pageNumber: currentRedaction.pageNumber,
      });
    }
  };

  const removeRedaction = (index: number) => {
    setRedactions(redactions.filter((_, i) => i !== index));
  };

  const handleRedact = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    if (redactions.length === 0) {
      setError('Please add at least one redaction area');
      return;
    }

    setProcessing(true);
    setProgress(30);
    setError('');

    try {
      setProgress(60);
      const pdfBytes = await redactPdf(file, redactions);
      setProgress(90);
      
      downloadPDF(pdfBytes, `${file.name.replace('.pdf', '')}_redacted.pdf`);
      setProgress(100);

      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to redact PDF');
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-900/20 rounded-full mb-4">
          <EyeOff className="w-8 h-8 text-gray-600 dark:text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Redact PDF</h1>
        <p className="text-muted-foreground">Cover sensitive information with black boxes</p>
      </div>

      {!file ? (
        <FileUpload
          onFilesSelected={handleFileSelect}
          accept=".pdf"
          multiple={false}
          icon={Upload}
          title="Upload PDF File"
          description="Select a PDF file to redact"
        />
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>File:</strong> {file.name}
            </p>
          </div>

          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <h3 className="font-semibold text-foreground mb-4">Add Redaction Area</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Page #</label>
                <input
                  type="number"
                  value={currentRedaction.pageNumber}
                  onChange={(e) => setCurrentRedaction({ ...currentRedaction, pageNumber: parseInt(e.target.value) || 1 })}
                  min="1"
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  disabled={processing}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">X Position</label>
                <input
                  type="number"
                  value={currentRedaction.x}
                  onChange={(e) => setCurrentRedaction({ ...currentRedaction, x: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  disabled={processing}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Y Position</label>
                <input
                  type="number"
                  value={currentRedaction.y}
                  onChange={(e) => setCurrentRedaction({ ...currentRedaction, y: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  disabled={processing}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Width</label>
                <input
                  type="number"
                  value={currentRedaction.width}
                  onChange={(e) => setCurrentRedaction({ ...currentRedaction, width: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  disabled={processing}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Height</label>
                <input
                  type="number"
                  value={currentRedaction.height}
                  onChange={(e) => setCurrentRedaction({ ...currentRedaction, height: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  disabled={processing}
                />
              </div>
            </div>
            <button
              onClick={addRedaction}
              disabled={processing}
              className="w-full bg-secondary hover:bg-secondary/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Redaction
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              Coordinates are in points (72 points = 1 inch). Y=0 is at the bottom of the page.
            </p>
          </div>

          {redactions.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-2">Redactions ({redactions.length})</h3>
              <div className="space-y-2">
                {redactions.map((redaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                    <span className="text-sm text-foreground">
                      Page {redaction.pageNumber}: ({redaction.x}, {redaction.y}) - {redaction.width}x{redaction.height}
                    </span>
                    <button
                      onClick={() => removeRedaction(index)}
                      disabled={processing}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {processing && <ProgressBar progress={progress} />}

          <div className="flex gap-4">
            <button
              onClick={handleRedact}
              disabled={processing}
              className="flex-1 bg-primary hover:bg-button-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Redacting...' : 'Apply Redactions'}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setRedactions([]);
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

