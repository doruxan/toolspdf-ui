'use client';

import { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import ProgressBar from '@/components/shared/ProgressBar';
import { pdfToImages, downloadImage } from '@/lib/pdf/convert';
import { Image as ImageIcon } from 'lucide-react';

export default function PDFToJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const handleFileSelected = (files: File[]) => {
    setFile(files[0]);
    setImages([]);
  };

  const handleConvert = async () => {
    if (!file) return;

    setProcessing(true);
    setProgress(0);

    try {
      setProgress(30);
      const convertedImages = await pdfToImages(file);
      setProgress(100);
      setImages(convertedImages);
    } catch (error) {
      console.error('Error converting PDF:', error);
      alert('Failed to convert PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = (index: number) => {
    if (images[index]) {
      downloadImage(images[index], `page-${index + 1}.jpg`);
    }
  };

  const handleDownloadAll = () => {
    images.forEach((image, index) => {
      setTimeout(() => downloadImage(image, `page-${index + 1}.jpg`), index * 100);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-tool-convert/10 to-tool-convert/5 rounded-lg border border-tool-convert/20">
        <ImageIcon className="h-8 w-8 text-tool-convert" />
        <div>
          <h2 className="text-xl font-bold text-foreground">PDF to JPG Converter</h2>
          <p className="text-sm text-muted-foreground">Convert PDF pages to JPG images</p>
        </div>
      </div>

      <FileUpload
        accept=".pdf"
        multiple={false}
        onFilesSelected={handleFileSelected}
        label="Select a PDF file to convert"
      />

      {file && !images.length && (
        <button
          onClick={handleConvert}
          disabled={processing}
          className="w-full py-3 px-6 bg-gradient-to-r from-tool-convert to-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {processing ? 'Converting...' : 'Convert to JPG'}
        </button>
      )}

      {processing && <ProgressBar progress={progress} label="Converting PDF to images" />}

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-success font-semibold">✓ Converted {images.length} page(s) successfully!</p>
          </div>
          
          <button
            onClick={handleDownloadAll}
            className="w-full py-3 px-6 bg-gradient-to-r from-success to-accent text-white font-semibold rounded-lg hover:opacity-90 transition-all"
          >
            Download All Images
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Page ${index + 1}`}
                  className="w-full"
                  width={600}
                  height={800}
                  style={{ width: '100%', height: 'auto', aspectRatio: 'auto' }}
                />
                <button
                  onClick={() => handleDownload(index)}
                  className="w-full py-2 bg-muted hover:bg-muted/70 text-sm font-medium transition-all"
                >
                  Download Page {index + 1}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

