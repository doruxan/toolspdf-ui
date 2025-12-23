'use client';

import { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import DownloadButton from '@/components/shared/DownloadButton';
import ProgressBar from '@/components/shared/ProgressBar';
import { imagesToPDF } from '@/lib/pdf/convert';
import { downloadPDF } from '@/lib/pdf/merge';
import { FileImage } from 'lucide-react';

export default function JPGToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setPdfBytes(null);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    setProcessing(true);
    setProgress(0);

    try {
      setProgress(30);
      const pdf = await imagesToPDF(files);
      setProgress(100);
      setPdfBytes(pdf);
    } catch (error) {
      console.error('Error converting images:', error);
      alert('Failed to convert images. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (pdfBytes) {
      downloadPDF(pdfBytes, 'images.pdf');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-tool-convert/10 to-tool-convert/5 rounded-lg border border-tool-convert/20">
        <FileImage className="h-8 w-8 text-tool-convert" />
        <div>
          <h2 className="text-xl font-bold text-foreground">JPG to PDF Converter</h2>
          <p className="text-sm text-muted-foreground">Convert images (JPG, PNG) to PDF document</p>
        </div>
      </div>

      <FileUpload
        accept="image/*"
        multiple={true}
        maxFiles={50}
        onFilesSelected={handleFilesSelected}
        label="Select image files to convert"
      />

      {files.length > 0 && !pdfBytes && (
        <button
          onClick={handleConvert}
          disabled={processing}
          className="w-full py-3 px-6 bg-gradient-to-r from-tool-convert to-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {processing ? 'Converting...' : `Convert ${files.length} Image(s) to PDF`}
        </button>
      )}

      {processing && <ProgressBar progress={progress} label="Converting images to PDF" />}

      {pdfBytes && (
        <div className="p-6 bg-success/10 border border-success/20 rounded-lg space-y-4">
          <p className="text-success font-semibold">✓ Images converted successfully!</p>
          <DownloadButton onClick={handleDownload} label="Download PDF" />
        </div>
      )}
    </div>
  );
}

