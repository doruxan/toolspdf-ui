import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TestRunner from '@/components/test/TestRunner';
import { FlaskConical, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Test Suite - PDF Tools',
  description: 'Automated testing for all PDF tool features',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestPage() {
  // Restrict access to test page in production
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <FlaskConical className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">PDF Tools Test Suite</h1>
              <p className="text-lg text-muted-foreground mt-1">
                Automated testing for all 16 PDF tool features
              </p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-semibold mb-1">How to use this test suite:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-200">
                  <li>Click <strong>"Run All Tests"</strong> to test all tools at once</li>
                  <li>Click individual <strong>"Run"</strong> buttons to test specific tools</li>
                  <li>Tests use pre-generated sample PDFs and images from <code>/test-fixtures</code></li>
                  <li>All processing happens in your browser (no server uploads)</li>
                  <li>Check browser console for detailed logs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Test Runner */}
        <TestRunner />

        {/* Test Files Info */}
        <div className="mt-12 p-6 bg-muted/30 border border-border rounded-lg">
          <h2 className="text-xl font-bold text-foreground mb-4">Test Fixtures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-2">PDF Files:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <code>sample-1.pdf</code> - Single page PDF</li>
                <li>• <code>sample-2.pdf</code> - 3-page PDF for split tests</li>
                <li>• <code>sample-3.pdf</code> - 2-page PDF for merge tests</li>
                <li>• <code>large.pdf</code> - 10-page PDF for compression</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Image Files:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <code>image-1.bmp</code> - Red colored image (800x600)</li>
                <li>• <code>image-2.bmp</code> - Blue colored image (800x600)</li>
                <li>• <code>image-3.bmp</code> - Green colored image (800x600)</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            All test files are located in <code>/public/test-fixtures/</code> and were generated programmatically.
          </p>
        </div>

        {/* Test Descriptions */}
        <div className="mt-8 p-6 bg-background border border-border rounded-lg">
          <h2 className="text-xl font-bold text-foreground mb-4">What Each Test Validates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-primary mb-1">Merge PDF</h4>
              <p className="text-muted-foreground">Combines sample-1.pdf + sample-3.pdf</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Split PDF</h4>
              <p className="text-muted-foreground">Splits sample-2.pdf into 3 pages</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Compress PDF</h4>
              <p className="text-muted-foreground">Compresses large.pdf file</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">PDF to JPG</h4>
              <p className="text-muted-foreground">Converts sample-2.pdf to 3 images</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">JPG to PDF</h4>
              <p className="text-muted-foreground">Combines image-1.bmp + image-2.bmp</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Rotate PDF</h4>
              <p className="text-muted-foreground">Rotates sample-1.pdf by 90°</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Unlock PDF</h4>
              <p className="text-muted-foreground">Tests unlock on sample-1.pdf</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Protect PDF</h4>
              <p className="text-muted-foreground">Adds password to sample-1.pdf</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Watermark PDF</h4>
              <p className="text-muted-foreground">Adds watermark to sample-1.pdf</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Remove Pages</h4>
              <p className="text-muted-foreground">Removes page 2 from sample-2.pdf</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Extract Pages</h4>
              <p className="text-muted-foreground">Extracts pages 1 and 3</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Add Page Numbers</h4>
              <p className="text-muted-foreground">Numbers sample-2.pdf pages</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Organize PDF</h4>
              <p className="text-muted-foreground">Reverses page order (3,2,1)</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">HTML to PDF</h4>
              <p className="text-muted-foreground">Converts HTML test content</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Crop PDF</h4>
              <p className="text-muted-foreground">Crops 10mm margins on sample-1.pdf</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Redact PDF</h4>
              <p className="text-muted-foreground">Redacts area on sample-1.pdf</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

