'use client';

import { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import DownloadButton from '@/components/shared/DownloadButton';
import ProgressBar from '@/components/shared/ProgressBar';
import { removePDFPassword } from '@/lib/pdf/security';
import { downloadPDF } from '@/lib/pdf/merge';
import { Unlock } from 'lucide-react';

export default function UnlockPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [unlockedPdf, setUnlockedPdf] = useState<Uint8Array | null>(null);

  const handleFileSelected = (files: File[]) => {
    setFile(files[0]);
    setUnlockedPdf(null);
  };

  const handleUnlock = async () => {
    if (!file) return;

    setProcessing(true);
    setProgress(0);

    try {
      setProgress(30);
      const unlocked = await removePDFPassword(file);
      setProgress(100);
      setUnlockedPdf(unlocked);
    } catch (error) {
      console.error('Error unlocking PDF:', error);
      alert('Failed to unlock PDF. The file may be encrypted with a password.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (unlockedPdf) {
      downloadPDF(unlockedPdf, 'unlocked.pdf');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-tool-unlock/10 to-tool-unlock/5 rounded-lg border border-tool-unlock/20">
        <Unlock className="h-8 w-8 text-tool-unlock" />
        <div>
          <h2 className="text-xl font-bold text-foreground">Unlock PDF File</h2>
          <p className="text-sm text-muted-foreground">Remove password protection from PDF</p>
        </div>
      </div>

      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <p className="text-sm text-warning">
          ⚠️ Note: This tool can only remove restrictions from PDFs where you have the password or owner permissions. 
          It cannot crack encrypted PDFs.
        </p>
      </div>

      <FileUpload
        accept=".pdf"
        multiple={false}
        onFilesSelected={handleFileSelected}
        label="Select a password-protected PDF"
      />

      {file && !unlockedPdf && (
        <button
          onClick={handleUnlock}
          disabled={processing}
          className="w-full py-3 px-6 bg-gradient-to-r from-tool-unlock to-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {processing ? 'Unlocking...' : 'Unlock PDF'}
        </button>
      )}

      {processing && <ProgressBar progress={progress} label="Unlocking PDF" />}

      {unlockedPdf && (
        <div className="p-6 bg-success/10 border border-success/20 rounded-lg space-y-4">
          <p className="text-success font-semibold">✓ PDF unlocked successfully!</p>
          <DownloadButton onClick={handleDownload} label="Download Unlocked PDF" />
        </div>
      )}
    </div>
  );
}

