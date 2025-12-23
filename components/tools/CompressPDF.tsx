'use client';

import { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import DownloadButton from '@/components/shared/DownloadButton';
import ProgressBar from '@/components/shared/ProgressBar';
import { compressPDF, calculateCompressionRatio } from '@/lib/pdf/compress';
import { downloadPDF } from '@/lib/pdf/merge';
import { Minimize2 } from 'lucide-react';

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedPdf, setCompressedPdf] = useState<Uint8Array | null>(null);
  const [compressionRatio, setCompressionRatio] = useState(0);

  const handleFileSelected = (files: File[]) => {
    setFile(files[0]);
    setCompressedPdf(null);
  };

  const handleCompress = async () => {
    if (!file) return;

    setProcessing(true);
    setProgress(0);

    try {
      setProgress(30);
      const compressed = await compressPDF(file);
      setProgress(100);
      setCompressedPdf(compressed);
      
      const ratio = calculateCompressionRatio(file.size, compressed.length);
      setCompressionRatio(ratio);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('Failed to compress PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (compressedPdf) {
      downloadPDF(compressedPdf, 'compressed.pdf');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-tool-compress/10 to-tool-compress/5 rounded-lg border border-tool-compress/20">
        <Minimize2 className="h-8 w-8 text-tool-compress" />
        <div>
          <h2 className="text-xl font-bold text-foreground">Compress PDF File</h2>
          <p className="text-sm text-muted-foreground">Reduce PDF file size without losing quality</p>
        </div>
      </div>

      <FileUpload
        accept=".pdf"
        multiple={false}
        onFilesSelected={handleFileSelected}
        label="Select a PDF file to compress"
      />

      {file && !compressedPdf && (
        <button
          onClick={handleCompress}
          disabled={processing}
          className="w-full py-3 px-6 bg-gradient-to-r from-tool-compress to-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {processing ? 'Compressing...' : 'Compress PDF'}
        </button>
      )}

      {processing && <ProgressBar progress={progress} label="Compressing PDF" />}

      {compressedPdf && (
        <div className="p-6 bg-success/10 border border-success/20 rounded-lg space-y-4">
          <p className="text-success font-semibold">✓ PDF compressed successfully!</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Original Size:</p>
              <p className="font-semibold">{(file!.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <div>
              <p className="text-muted-foreground">Compressed Size:</p>
              <p className="font-semibold">{(compressedPdf.length / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Compression Ratio:</p>
              <p className="font-semibold text-success">{compressionRatio.toFixed(1)}% reduction</p>
            </div>
          </div>
          <DownloadButton onClick={handleDownload} label="Download Compressed PDF" />
        </div>
      )}
    </div>
  );
}

