// pdf-lib imported dynamically for better performance

export async function compressPDF(file: File): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  // Remove metadata to reduce size
  pdf.setTitle('');
  pdf.setAuthor('');
  pdf.setSubject('');
  pdf.setKeywords([]);
  pdf.setProducer('');
  pdf.setCreator('');

  // Save with compression
  const pdfBytes = await pdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  return pdfBytes;
}

export function calculateCompressionRatio(originalSize: number, compressedSize: number): number {
  return ((originalSize - compressedSize) / originalSize) * 100;
}

