'use client';

import { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import DownloadButton from '@/components/shared/DownloadButton';
import ProgressBar from '@/components/shared/ProgressBar';
import { splitIntoSinglePages, extractPages } from '@/lib/pdf/split';
import { downloadPDF } from '@/lib/pdf/merge';
import { Scissors } from 'lucide-react';

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [splitPdfs, setSplitPdfs] = useState<Uint8Array[]>([]);
  const [pageRange, setPageRange] = useState('');

  const handleFileSelected = (files: File[]) => {
    setFile(files[0]);
    setSplitPdfs([]);
  };

  const handleSplitAll = async () => {
    if (!file) return;

    setProcessing(true);
    setProgress(0);

    try {
      setProgress(30);
      const pdfs = await splitIntoSinglePages(file);
      setProgress(100);
      setSplitPdfs(pdfs);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('Failed to split PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleExtractPages = async () => {
    if (!file || !pageRange) return;

    setProcessing(true);
    setProgress(0);

    try {
      const pages = pageRange.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p));
      setProgress(30);
      const extracted = await extractPages(file, pages);
      setProgress(100);
      setSplitPdfs([extracted]);
    } catch (error) {
      console.error('Error extracting pages:', error);
      alert('Failed to extract pages. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = (index: number) => {
    if (splitPdfs[index]) {
      downloadPDF(splitPdfs[index], `page-${index + 1}.pdf`);
    }
  };

  const handleDownloadAll = () => {
    splitPdfs.forEach((pdf, index) => {
      setTimeout(() => downloadPDF(pdf, `page-${index + 1}.pdf`), index * 100);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-tool-split/10 to-tool-split/5 rounded-lg border border-tool-split/20">
        <Scissors className="h-8 w-8 text-tool-split" />
        <div>
          <h2 className="text-xl font-bold text-foreground">Split PDF File</h2>
          <p className="text-sm text-muted-foreground">Extract pages or split into separate documents</p>
        </div>
      </div>

      <FileUpload
        accept=".pdf"
        multiple={false}
        onFilesSelected={handleFileSelected}
        label="Select a PDF file to split"
      />

      {file && !splitPdfs.length && (
        <div className="space-y-4">
          <button
            onClick={handleSplitAll}
            disabled={processing}
            className="w-full py-3 px-6 bg-gradient-to-r from-tool-split to-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {processing ? 'Splitting...' : 'Split into Single Pages'}
          </button>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter page numbers (e.g., 1,3,5)"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleExtractPages}
              disabled={processing || !pageRange}
              className="px-6 py-2 bg-tool-split text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Extract Pages
            </button>
          </div>
        </div>
      )}

      {processing && <ProgressBar progress={progress} label="Processing PDF" />}

      {splitPdfs.length > 0 && (
        <div className="p-6 bg-success/10 border border-success/20 rounded-lg space-y-4">
          <p className="text-success font-semibold">✓ PDF split successfully! ({splitPdfs.length} files)</p>
          {splitPdfs.length > 1 && (
            <button
              onClick={handleDownloadAll}
              className="w-full py-3 px-6 bg-gradient-to-r from-success to-accent text-white font-semibold rounded-lg hover:opacity-90 transition-all"
            >
              Download All Pages
            </button>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {splitPdfs.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDownload(index)}
                className="py-2 px-4 bg-muted hover:bg-muted/70 rounded-lg text-sm font-medium transition-all"
              >
                Page {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

