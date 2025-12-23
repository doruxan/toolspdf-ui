'use client';

import { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import DownloadButton from '@/components/shared/DownloadButton';
import ProgressBar from '@/components/shared/ProgressBar';
import { addTextWatermark } from '@/lib/pdf/watermark';
import { downloadPDF } from '@/lib/pdf/merge';
import { Droplet } from 'lucide-react';

export default function WatermarkPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [watermarkedPdf, setWatermarkedPdf] = useState<Uint8Array | null>(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [opacity, setOpacity] = useState(0.3);

  const handleFileSelected = (files: File[]) => {
    setFile(files[0]);
    setWatermarkedPdf(null);
  };

  const handleAddWatermark = async () => {
    if (!file || !watermarkText) {
      alert('Please enter watermark text');
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      setProgress(30);
      const watermarked = await addTextWatermark(file, {
        text: watermarkText,
        opacity: opacity,
        rotation: 45,
        fontSize: 48,
      });
      setProgress(100);
      setWatermarkedPdf(watermarked);
    } catch (error) {
      console.error('Error adding watermark:', error);
      alert('Failed to add watermark. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (watermarkedPdf) {
      downloadPDF(watermarkedPdf, 'watermarked.pdf');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-tool-watermark/10 to-tool-watermark/5 rounded-lg border border-tool-watermark/20">
        <Droplet className="h-8 w-8 text-tool-watermark" />
        <div>
          <h2 className="text-xl font-bold text-foreground">Add Watermark to PDF</h2>
          <p className="text-sm text-muted-foreground">Add text watermark to your PDF pages</p>
        </div>
      </div>

      <FileUpload
        accept=".pdf"
        multiple={false}
        onFilesSelected={handleFileSelected}
        label="Select a PDF file"
      />

      {file && !watermarkedPdf && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Watermark Text:</label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              placeholder="Enter watermark text"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Opacity: {Math.round(opacity * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={handleAddWatermark}
            disabled={processing || !watermarkText}
            className="w-full py-3 px-6 bg-gradient-to-r from-tool-watermark to-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {processing ? 'Adding Watermark...' : 'Add Watermark'}
          </button>
        </div>
      )}

      {processing && <ProgressBar progress={progress} label="Adding watermark" />}

      {watermarkedPdf && (
        <div className="p-6 bg-success/10 border border-success/20 rounded-lg space-y-4">
          <p className="text-success font-semibold">✓ Watermark added successfully!</p>
          <DownloadButton onClick={handleDownload} label="Download Watermarked PDF" />
        </div>
      )}
    </div>
  );
}

