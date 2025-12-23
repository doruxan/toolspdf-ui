'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Play, RotateCcw } from 'lucide-react';
import { mergePDFs, downloadPDF } from '@/lib/pdf/merge';
import { splitIntoSinglePages } from '@/lib/pdf/split';
import { compressPDF } from '@/lib/pdf/compress';
import { pdfToImages } from '@/lib/pdf/convert';
import { imagesToPDF } from '@/lib/pdf/convert';
import { rotateAllPages } from '@/lib/pdf/rotate';
import { removePDFPassword } from '@/lib/pdf/security';
import { protectPDF } from '@/lib/pdf/security';
import { addTextWatermark } from '@/lib/pdf/watermark';
import { removePages } from '@/lib/pdf/removePages';
import { extractPages } from '@/lib/pdf/extractPages';
import { addPageNumbers } from '@/lib/pdf/pageNumbers';
import { reorderPages, reversePages } from '@/lib/pdf/organizePdf';
import { htmlToPdf } from '@/lib/pdf/htmlToPdf';
import { cropPdf } from '@/lib/pdf/cropPdf';
import { redactPdf } from '@/lib/pdf/redactPdf';

type TestStatus = 'pending' | 'running' | 'passed' | 'failed';

interface TestResult {
  id: string;
  name: string;
  status: TestStatus;
  message: string;
  duration?: number;
}

async function fetchTestFile(filename: string): Promise<File> {
  const response = await fetch(`/test-fixtures/${filename}`);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

export default function TestRunner() {
  const [results, setResults] = useState<TestResult[]>([
    { id: 'merge', name: 'Merge PDF', status: 'pending', message: 'Waiting to run' },
    { id: 'split', name: 'Split PDF', status: 'pending', message: 'Waiting to run' },
    { id: 'compress', name: 'Compress PDF', status: 'pending', message: 'Waiting to run' },
    { id: 'pdf-to-jpg', name: 'PDF to JPG', status: 'pending', message: 'Waiting to run' },
    { id: 'jpg-to-pdf', name: 'JPG to PDF', status: 'pending', message: 'Waiting to run' },
    { id: 'rotate', name: 'Rotate PDF', status: 'pending', message: 'Waiting to run' },
    { id: 'unlock', name: 'Unlock PDF', status: 'pending', message: 'Waiting to run' },
    { id: 'protect', name: 'Protect PDF', status: 'pending', message: 'Waiting to run' },
    { id: 'watermark', name: 'Watermark PDF', status: 'pending', message: 'Waiting to run' },
    { id: 'remove-pages', name: 'Remove Pages', status: 'pending', message: 'Waiting to run' },
    { id: 'extract-pages', name: 'Extract Pages', status: 'pending', message: 'Waiting to run' },
    { id: 'add-page-numbers', name: 'Add Page Numbers', status: 'pending', message: 'Waiting to run' },
    { id: 'organize-pdf', name: 'Organize PDF', status: 'pending', message: 'Waiting to run' },
    { id: 'html-to-pdf', name: 'HTML to PDF', status: 'pending', message: 'Waiting to run' },
    { id: 'crop-pdf', name: 'Crop PDF', status: 'pending', message: 'Waiting to run' },
    { id: 'redact-pdf', name: 'Redact PDF', status: 'pending', message: 'Waiting to run' },
  ]);

  const updateResult = (id: string, updates: Partial<TestResult>) => {
    setResults(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const runTest = async (testId: string) => {
    const startTime = Date.now();
    updateResult(testId, { status: 'running', message: 'Running test...' });

    try {
      switch (testId) {
        case 'merge':
          await testMergePDF();
          break;
        case 'split':
          await testSplitPDF();
          break;
        case 'compress':
          await testCompressPDF();
          break;
        case 'pdf-to-jpg':
          await testPDFToJPG();
          break;
        case 'jpg-to-pdf':
          await testJPGToPDF();
          break;
        case 'rotate':
          await testRotatePDF();
          break;
        case 'unlock':
          await testUnlockPDF();
          break;
        case 'protect':
          await testProtectPDF();
          break;
        case 'watermark':
          await testWatermarkPDF();
          break;
        case 'remove-pages':
          await testRemovePages();
          break;
        case 'extract-pages':
          await testExtractPages();
          break;
        case 'add-page-numbers':
          await testAddPageNumbers();
          break;
        case 'organize-pdf':
          await testOrganizePDF();
          break;
        case 'html-to-pdf':
          await testHTMLToPDF();
          break;
        case 'crop-pdf':
          await testCropPDF();
          break;
        case 'redact-pdf':
          await testRedactPDF();
          break;
      }
      
      const duration = Date.now() - startTime;
      updateResult(testId, { 
        status: 'passed', 
        message: `Test passed successfully!`, 
        duration 
      });
    } catch (error) {
      const duration = Date.now() - startTime;
      updateResult(testId, { 
        status: 'failed', 
        message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration 
      });
    }
  };

  const testMergePDF = async () => {
    const file1 = await fetchTestFile('sample-1.pdf');
    const file2 = await fetchTestFile('sample-3.pdf');
    const merged = await mergePDFs([file1, file2]);
    if (merged.length === 0) throw new Error('Merge produced empty PDF');
  };

  const testSplitPDF = async () => {
    const file = await fetchTestFile('sample-2.pdf');
    const split = await splitIntoSinglePages(file);
    if (split.length !== 3) throw new Error(`Expected 3 pages, got ${split.length}`);
  };

  const testCompressPDF = async () => {
    const file = await fetchTestFile('large.pdf');
    const originalSize = file.size;
    const compressed = await compressPDF(file);
    if (compressed.length >= originalSize) {
      console.warn('Compression did not reduce size significantly');
    }
    if (compressed.length === 0) throw new Error('Compression produced empty PDF');
  };

  const testPDFToJPG = async () => {
    const file = await fetchTestFile('sample-2.pdf');
    const images = await pdfToImages(file);
    if (images.length !== 3) throw new Error(`Expected 3 images, got ${images.length}`);
  };

  const testJPGToPDF = async () => {
    const img1 = await fetchTestFile('image-1.bmp');
    const img2 = await fetchTestFile('image-2.bmp');
    const pdf = await imagesToPDF([img1, img2]);
    if (pdf.length === 0) throw new Error('Conversion produced empty PDF');
  };

  const testRotatePDF = async () => {
    const file = await fetchTestFile('sample-1.pdf');
    const rotated = await rotateAllPages(file, 90);
    if (rotated.length === 0) throw new Error('Rotation produced empty PDF');
  };

  const testUnlockPDF = async () => {
    const file = await fetchTestFile('sample-1.pdf');
    const unlocked = await removePDFPassword(file);
    if (unlocked.length === 0) throw new Error('Unlock produced empty PDF');
  };

  const testProtectPDF = async () => {
    const file = await fetchTestFile('sample-1.pdf');
    const protected_pdf = await protectPDF(file, 'test123');
    if (protected_pdf.length === 0) throw new Error('Protection produced empty PDF');
  };

  const testWatermarkPDF = async () => {
    const file = await fetchTestFile('sample-1.pdf');
    const watermarked = await addTextWatermark(file, {
      text: 'TEST WATERMARK',
      opacity: 0.3,
      rotation: 45,
      fontSize: 48,
    });
    if (watermarked.length === 0) throw new Error('Watermark produced empty PDF');
  };

  const testRemovePages = async () => {
    const file = await fetchTestFile('sample-2.pdf');
    const removed = await removePages(file, [2]); // Remove page 2 from 3-page PDF
    if (removed.length === 0) throw new Error('Remove pages produced empty PDF');
  };

  const testExtractPages = async () => {
    const file = await fetchTestFile('sample-2.pdf');
    const extracted = await extractPages(file, [1, 3]); // Extract pages 1 and 3
    if (extracted.length === 0) throw new Error('Extract pages produced empty PDF');
  };

  const testAddPageNumbers = async () => {
    const file = await fetchTestFile('sample-2.pdf');
    const numbered = await addPageNumbers(file, {
      position: 'bottom-center',
      fontSize: 12,
      format: 'number',
      startPage: 1,
    });
    if (numbered.length === 0) throw new Error('Add page numbers produced empty PDF');
  };

  const testOrganizePDF = async () => {
    const file = await fetchTestFile('sample-2.pdf');
    const reordered = await reorderPages(file, [3, 2, 1]); // Reverse the 3 pages
    if (reordered.length === 0) throw new Error('Organize PDF produced empty PDF');
  };

  const testHTMLToPDF = async () => {
    const htmlContent = '<h1>Test Document</h1><p>This is a test paragraph.</p>';
    const pdf = await htmlToPdf(htmlContent, {
      pageSize: 'a4',
      orientation: 'portrait',
      margin: 20,
      fontSize: 12,
      lineHeight: 1.5,
    });
    if (pdf.length === 0) throw new Error('HTML to PDF produced empty PDF');
  };

  const testCropPDF = async () => {
    const file = await fetchTestFile('sample-1.pdf');
    const cropped = await cropPdf(file, {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
      unit: 'mm',
    });
    if (cropped.length === 0) throw new Error('Crop PDF produced empty PDF');
  };

  const testRedactPDF = async () => {
    const file = await fetchTestFile('sample-1.pdf');
    const redacted = await redactPdf(file, [
      { pageNumber: 1, x: 50, y: 700, width: 200, height: 20 }
    ]);
    if (redacted.length === 0) throw new Error('Redact PDF produced empty PDF');
  };

  const runAllTests = async () => {
    for (const result of results) {
      await runTest(result.id);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const resetTests = () => {
    setResults(prev => prev.map(r => ({
      ...r,
      status: 'pending',
      message: 'Waiting to run',
      duration: undefined,
    })));
  };

  const passedCount = results.filter(r => r.status === 'passed').length;
  const failedCount = results.filter(r => r.status === 'failed').length;
  const totalCount = results.length;

  const getStatusIcon = (status: TestStatus) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="h-6 w-6 text-success" />;
      case 'failed':
        return <XCircle className="h-6 w-6 text-error" />;
      case 'running':
        return <Clock className="h-6 w-6 text-warning animate-spin" />;
      default:
        return <Clock className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: TestStatus) => {
    switch (status) {
      case 'passed':
        return 'bg-success/10 border-success/20';
      case 'failed':
        return 'bg-error/10 border-error/20';
      case 'running':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'bg-muted/30 border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{totalCount}</div>
          <div className="text-sm text-muted-foreground">Total Tests</div>
        </div>
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="text-2xl font-bold text-success">{passedCount}</div>
          <div className="text-sm text-muted-foreground">Passed</div>
        </div>
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="text-2xl font-bold text-error">{failedCount}</div>
          <div className="text-sm text-muted-foreground">Failed</div>
        </div>
        <div className="p-4 bg-muted/30 border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground">
            {totalCount - passedCount - failedCount}
          </div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={runAllTests}
          disabled={results.some(r => r.status === 'running')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Play className="h-5 w-5" />
          Run All Tests
        </button>
        <button
          onClick={resetTests}
          disabled={results.some(r => r.status === 'running')}
          className="flex items-center gap-2 px-6 py-3 bg-muted hover:bg-muted/70 text-foreground font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <RotateCcw className="h-5 w-5" />
          Reset Tests
        </button>
      </div>

      {/* Test Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {results.map((result) => (
          <div
            key={result.id}
            className={`p-4 border-2 rounded-lg transition-all ${getStatusColor(result.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(result.status)}
                <div>
                  <h3 className="font-bold text-foreground">{result.name}</h3>
                  <p className="text-xs text-muted-foreground">ID: {result.id}</p>
                </div>
              </div>
              <button
                onClick={() => runTest(result.id)}
                disabled={result.status === 'running'}
                className="px-3 py-1 text-sm bg-background hover:bg-muted rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Run
              </button>
            </div>
            <div className="text-sm text-muted-foreground mb-2">{result.message}</div>
            {result.duration && (
              <div className="text-xs text-muted-foreground">
                Duration: {result.duration}ms
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

