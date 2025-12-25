// pdf-lib imported dynamically for better performance

export async function reorderPages(file: File, newOrder: number[]): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();
  const totalPages = sourcePdf.getPageCount();

  // Validate that all page numbers are valid
  for (const pageNum of newOrder) {
    if (pageNum < 1 || pageNum > totalPages) {
      throw new Error(`Invalid page number: ${pageNum}. PDF has ${totalPages} pages.`);
    }
  }

  // Copy pages in the new order (pdf-lib uses 0-based indexing)
  const pageIndices = newOrder.map(p => p - 1);
  const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
  
  copiedPages.forEach((page) => {
    newPdf.addPage(page);
  });

  return newPdf.save();
}

export async function reversePages(file: File): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();
  
  const reversedOrder = Array.from({ length: totalPages }, (_, i) => totalPages - i);
  return reorderPages(file, reversedOrder);
}

