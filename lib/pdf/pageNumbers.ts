import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface PageNumberOptions {
  position: 'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right' | 'top-left';
  fontSize: number;
  format: 'number' | 'page-x' | 'page-x-of-y';
  startPage: number;
}

export async function addPageNumbers(
  file: File, 
  options: PageNumberOptions = {
    position: 'bottom-center',
    fontSize: 12,
    format: 'number',
    startPage: 1,
  }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;

  pages.forEach((page, index) => {
    const pageNumber = index + options.startPage;
    let text = '';

    // Format the page number text
    switch (options.format) {
      case 'number':
        text = `${pageNumber}`;
        break;
      case 'page-x':
        text = `Page ${pageNumber}`;
        break;
      case 'page-x-of-y':
        text = `Page ${pageNumber} of ${totalPages}`;
        break;
    }

    const textWidth = font.widthOfTextAtSize(text, options.fontSize);
    const { width, height } = page.getSize();
    const margin = 30;

    let x = 0;
    let y = 0;

    // Calculate position
    switch (options.position) {
      case 'bottom-center':
        x = (width - textWidth) / 2;
        y = margin;
        break;
      case 'bottom-right':
        x = width - textWidth - margin;
        y = margin;
        break;
      case 'bottom-left':
        x = margin;
        y = margin;
        break;
      case 'top-center':
        x = (width - textWidth) / 2;
        y = height - margin - options.fontSize;
        break;
      case 'top-right':
        x = width - textWidth - margin;
        y = height - margin - options.fontSize;
        break;
      case 'top-left':
        x = margin;
        y = height - margin - options.fontSize;
        break;
    }

    page.drawText(text, {
      x,
      y,
      size: options.fontSize,
      font,
      color: rgb(0, 0, 0),
    });
  });

  return pdfDoc.save();
}

