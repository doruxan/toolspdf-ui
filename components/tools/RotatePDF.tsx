'use client';

import { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import DownloadButton from '@/components/shared/DownloadButton';
import ProgressBar from '@/components/shared/ProgressBar';
import { rotateAllPages } from '@/lib/pdf/rotate';
import { downloadPDF } from '@/lib/pdf/merge';
import { RotateCw } from 'lucide-react';

export default function RotatePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rotatedPdf, setRotatedPdf] = useState<Uint8Array | null>(null);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);

  const handleFileSelected = (files: File[]) => {
    setFile(files[0]);
    setRotatedPdf(null);
  };

  const handleRotate = async () => {
    if (!file) return;

    setProcessing(true);
    setProgress(0);

    try {
      setProgress(30);
      const rotated = await rotateAllPages(file, rotation);
      setProgress(100);
      setRotatedPdf(rotated);
    } catch (error) {
      console.error('Error rotating PDF:', error);
      alert('Failed to rotate PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (rotatedPdf) {
      downloadPDF(rotatedPdf, 'rotated.pdf');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-tool-rotate/10 to-tool-rotate/5 rounded-lg border border-tool-rotate/20">
        <RotateCw className="h-8 w-8 text-tool-rotate" />
        <div>
          <h2 className="text-xl font-bold text-foreground">Rotate PDF Pages</h2>
          <p className="text-sm text-muted-foreground">Rotate all pages in your PDF document</p>
        </div>
      </div>

      <FileUpload
        accept=".pdf"
        multiple={false}
        onFilesSelected={handleFileSelected}
        label="Select a PDF file to rotate"
      />

      {file && !rotatedPdf && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Select Rotation:</label>
            <div className="grid grid-cols-3 gap-3">
              {[90, 180, 270].map((deg) => (
                <button
                  key={deg}
                  onClick={() => setRotation(deg as 90 | 180 | 270)}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    rotation === deg
                      ? 'bg-tool-rotate text-white'
                      : 'bg-muted hover:bg-muted/70 text-foreground'
                  }`}
                >
                  {deg}°
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRotate}
            disabled={processing}
            className="w-full py-3 px-6 bg-gradient-to-r from-tool-rotate to-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {processing ? 'Rotating...' : `Rotate PDF ${rotation}°`}
          </button>
        </div>
      )}

      {processing && <ProgressBar progress={progress} label="Rotating PDF" />}

      {rotatedPdf && (
        <div className="p-6 bg-success/10 border border-success/20 rounded-lg space-y-4">
          <p className="text-success font-semibold">✓ PDF rotated successfully!</p>
          <DownloadButton onClick={handleDownload} label="Download Rotated PDF" />
        </div>
      )}
    </div>
  );
}

