'use client';

import { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import DownloadButton from '@/components/shared/DownloadButton';
import ProgressBar from '@/components/shared/ProgressBar';
import { mergePDFs, downloadPDF } from '@/lib/pdf/merge';
import { Layers } from 'lucide-react';

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mergedPdf, setMergedPdf] = useState<Uint8Array | null>(null);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setMergedPdf(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 PDF files to merge');
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      setProgress(30);
      const merged = await mergePDFs(files);
      setProgress(100);
      setMergedPdf(merged);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Failed to merge PDFs. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (mergedPdf) {
      downloadPDF(mergedPdf, 'merged.pdf');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-tool-merge/10 to-tool-merge/5 rounded-lg border border-tool-merge/20">
        <Layers className="h-8 w-8 text-tool-merge" />
        <div>
          <h2 className="text-xl font-bold text-foreground">Merge PDF Files</h2>
          <p className="text-sm text-muted-foreground">Combine multiple PDF files into one document</p>
        </div>
      </div>

      <FileUpload
        accept=".pdf"
        multiple={true}
        maxFiles={20}
        onFilesSelected={handleFilesSelected}
        label="Select PDF files to merge"
      />

      {files.length > 0 && !mergedPdf && (
        <button
          onClick={handleMerge}
          disabled={processing}
          className="w-full py-3 px-6 bg-gradient-to-r from-tool-merge to-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {processing ? 'Merging PDFs...' : `Merge ${files.length} PDF Files`}
        </button>
      )}

      {processing && <ProgressBar progress={progress} label="Merging PDFs" />}

      {mergedPdf && (
        <div className="p-6 bg-success/10 border border-success/20 rounded-lg space-y-4">
          <p className="text-success font-semibold">✓ PDFs merged successfully!</p>
          <DownloadButton onClick={handleDownload} label="Download Merged PDF" />
        </div>
      )}
    </div>
  );
}

