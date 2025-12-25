'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface PDFViewerProps {
  file: File | null;
  className?: string;
}

export default function PDFViewer({ file, className = '' }: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [pdfDoc, setPdfDoc] = useState<any>(null);

  useEffect(() => {
    if (!file) return;

    const loadPDF = async () => {
      try {
        // Dynamic import of pdfjs-dist
        const pdfjsLib = await import('pdfjs-dist');
        
        // Use worker from public folder
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.min.mjs';

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setPageNum(1);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPDF();
  }, [file]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    const renderPage = async () => {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current!;
      const context = canvas.getContext('2d')!;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    };

    renderPage();
  }, [pdfDoc, pageNum, scale]);

  if (!file) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg p-8 ${className}`}>
        <p className="text-muted-foreground">No PDF loaded</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Controls */}
      <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPageNum(Math.max(1, pageNum - 1))}
            disabled={pageNum <= 1}
            className="p-2 hover:bg-background rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium">
            Page {pageNum} of {numPages}
          </span>
          <button
            onClick={() => setPageNum(Math.min(numPages, pageNum + 1))}
            disabled={pageNum >= numPages}
            className="p-2 hover:bg-background rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(Math.max(0.5, scale - 0.25))}
            className="p-2 hover:bg-background rounded-md"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale(Math.min(2, scale + 0.25))}
            className="p-2 hover:bg-background rounded-md"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="overflow-auto bg-muted rounded-lg p-4">
        <canvas ref={canvasRef} className="mx-auto shadow-lg" />
      </div>
    </div>
  );
}

