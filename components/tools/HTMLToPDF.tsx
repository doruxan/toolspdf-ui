'use client';

import { useState } from 'react';
import { FileCode, Download } from 'lucide-react';
import ProgressBar from '../shared/ProgressBar';
import { htmlToPdf, HtmlToPdfOptions } from '@/lib/pdf/htmlToPdf';
import { downloadPDF } from '@/lib/pdf/merge';

export default function HTMLToPDF() {
  const [htmlContent, setHtmlContent] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [options, setOptions] = useState<HtmlToPdfOptions>({
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 20,
    fontSize: 12,
    lineHeight: 1.5,
  });

  const handleConvert = async () => {
    if (!htmlContent.trim()) {
      setError('Please enter some HTML or text content');
      return;
    }

    setProcessing(true);
    setProgress(30);
    setError('');

    try {
      setProgress(60);
      const pdfBytes = await htmlToPdf(htmlContent, options);
      setProgress(90);
      
      downloadPDF(pdfBytes, 'converted_document.pdf');
      setProgress(100);

      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert to PDF');
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-4">
          <FileCode className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">HTML to PDF</h1>
        <p className="text-muted-foreground">Convert HTML or text content to PDF document</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            HTML or Text Content
          </label>
          <textarea
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            placeholder="Enter your HTML or plain text here..."
            rows={12}
            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground font-mono text-sm"
            disabled={processing}
          />
          <p className="text-sm text-muted-foreground mt-2">
            You can paste HTML code or plain text. Basic HTML tags like &lt;p&gt;, &lt;br&gt;, &lt;h1&gt; are supported.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Page Size
            </label>
            <select
              value={options.pageSize}
              onChange={(e) => setOptions({ ...options, pageSize: e.target.value as 'a4' | 'letter' })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              disabled={processing}
            >
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Orientation
            </label>
            <select
              value={options.orientation}
              onChange={(e) => setOptions({ ...options, orientation: e.target.value as 'portrait' | 'landscape' })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              disabled={processing}
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
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
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {processing && <ProgressBar progress={progress} />}

        <div className="flex gap-4">
          <button
            onClick={handleConvert}
            disabled={processing}
            className="flex-1 bg-primary hover:bg-button-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            {processing ? 'Converting...' : 'Convert to PDF'}
          </button>
          <button
            onClick={() => {
              setHtmlContent('');
              setError('');
            }}
            disabled={processing}
            className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

