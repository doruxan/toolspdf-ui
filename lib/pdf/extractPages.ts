// pdf-lib imported dynamically for better performance

export async function extractPages(file: File, pagesToExtract: number[]): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();
  const totalPages = sourcePdf.getPageCount();

  // Validate page numbers
  for (const pageNum of pagesToExtract) {
    if (pageNum < 1 || pageNum > totalPages) {
      throw new Error(`Invalid page number: ${pageNum}. PDF has ${totalPages} pages.`);
    }
  }

  // Copy specified pages (pdf-lib uses 0-based indexing)
  const pageIndices = pagesToExtract.map(p => p - 1);
  const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
  
  copiedPages.forEach((page) => {
    newPdf.addPage(page);
  });

  return newPdf.save();
}

export function parsePageNumbers(input: string, totalPages: number): number[] {
  const pages = new Set<number>();
  const parts = input.split(',');

  for (const part of parts) {
    const trimmed = part.trim();
    
    // Handle range (e.g., "1-5")
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map((n) => parseInt(n.trim()));
      if (isNaN(start) || isNaN(end)) continue;
      for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
        pages.add(i);
      }
    } else {
      // Handle single page
      const pageNum = parseInt(trimmed);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        pages.add(pageNum);
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

