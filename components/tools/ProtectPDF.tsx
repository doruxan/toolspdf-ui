'use client';

import { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import DownloadButton from '@/components/shared/DownloadButton';
import ProgressBar from '@/components/shared/ProgressBar';
import { protectPDF } from '@/lib/pdf/security';
import { downloadPDF } from '@/lib/pdf/merge';
import { Lock } from 'lucide-react';

export default function ProtectPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [protectedPdf, setProtectedPdf] = useState<Uint8Array | null>(null);
  const [password, setPassword] = useState('');

  const handleFileSelected = (files: File[]) => {
    setFile(files[0]);
    setProtectedPdf(null);
  };

  const handleProtect = async () => {
    if (!file || !password) {
      alert('Please enter a password');
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      setProgress(30);
      const protected_pdf = await protectPDF(file, password);
      setProgress(100);
      setProtectedPdf(protected_pdf);
    } catch (error) {
      console.error('Error protecting PDF:', error);
      alert('Failed to protect PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (protectedPdf) {
      downloadPDF(protectedPdf, 'protected.pdf');
      setPassword(''); // Clear password after download
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-tool-protect/10 to-tool-protect/5 rounded-lg border border-tool-protect/20">
        <Lock className="h-8 w-8 text-tool-protect" />
        <div>
          <h2 className="text-xl font-bold text-foreground">Protect PDF File</h2>
          <p className="text-sm text-muted-foreground">Add password protection to your PDF</p>
        </div>
      </div>

      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <p className="text-sm text-warning">
          ⚠️ Note: PDF encryption in the browser has limitations. For maximum security, 
          consider using desktop software for password protection.
        </p>
      </div>

      <FileUpload
        accept=".pdf"
        multiple={false}
        onFilesSelected={handleFileSelected}
        label="Select a PDF file to protect"
      />

      {file && !protectedPdf && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Enter Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a strong password"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={handleProtect}
            disabled={processing || !password}
            className="w-full py-3 px-6 bg-gradient-to-r from-tool-protect to-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {processing ? 'Protecting...' : 'Protect PDF'}
          </button>
        </div>
      )}

      {processing && <ProgressBar progress={progress} label="Protecting PDF" />}

      {protectedPdf && (
        <div className="p-6 bg-success/10 border border-success/20 rounded-lg space-y-4">
          <p className="text-success font-semibold">✓ PDF protected successfully!</p>
          <p className="text-sm text-muted-foreground">Remember your password - you'll need it to open the PDF.</p>
          <DownloadButton onClick={handleDownload} label="Download Protected PDF" />
        </div>
      )}
    </div>
  );
}

