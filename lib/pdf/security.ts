// pdf-lib imported dynamically for better performance

export async function protectPDF(file: File, password: string): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  // Note: pdf-lib doesn't support encryption directly
  // This is a placeholder implementation
  // In production, you'd need a library that supports PDF encryption
  // or use a server-side solution

  // For now, we'll just save the PDF with metadata indicating it should be protected
  pdf.setTitle('Protected PDF');
  
  return await pdf.save();
}

export async function unlockPDF(file: File, password: string): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  // Note: pdf-lib has limited support for encrypted PDFs
  // This is a placeholder implementation
  // In production, you'd need a library that can decrypt PDFs
  
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { 
      ignoreEncryption: true 
    });
    
    return await pdf.save();
  } catch (error) {
    throw new Error('Unable to unlock PDF. Please ensure the password is correct.');
  }
}

export async function removePDFPassword(file: File): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer, { 
    ignoreEncryption: true 
  });
  
  return await pdf.save();
}

