import { PDFDocument } from 'pdf-lib';

export async function removePages(file: File, pagesToRemove: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  // Sort pages to remove in descending order to avoid index shifting
  const sortedPages = pagesToRemove.sort((a, b) => b - a);

  // Validate page numbers
  for (const pageNum of sortedPages) {
    if (pageNum < 1 || pageNum > totalPages) {
      throw new Error(`Invalid page number: ${pageNum}. PDF has ${totalPages} pages.`);
    }
  }

  // Remove pages (pdf-lib uses 0-based indexing)
  for (const pageNum of sortedPages) {
    pdfDoc.removePage(pageNum - 1);
  }

  return pdfDoc.save();
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

