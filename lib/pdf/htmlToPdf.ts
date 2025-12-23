import { jsPDF } from 'jspdf';

export interface HtmlToPdfOptions {
  pageSize: 'a4' | 'letter';
  orientation: 'portrait' | 'landscape';
  margin: number;
  fontSize: number;
  lineHeight: number;
}

export async function htmlToPdf(
  htmlContent: string,
  options: HtmlToPdfOptions = {
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 20,
    fontSize: 12,
    lineHeight: 1.5,
  }
): Promise<Uint8Array> {
  const doc = new jsPDF({
    orientation: options.orientation,
    unit: 'mm',
    format: options.pageSize,
  });

  // Strip HTML tags and convert to plain text (basic implementation)
  const plainText = htmlContent
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - (options.margin * 2);

  doc.setFontSize(options.fontSize);
  
  // Split text into lines that fit the page width
  const lines = doc.splitTextToSize(plainText, maxWidth);
  
  let y = options.margin;
  const lineHeightMm = options.fontSize * 0.35277778 * options.lineHeight; // Convert pt to mm

  lines.forEach((line: string) => {
    // Add new page if needed
    if (y + lineHeightMm > pageHeight - options.margin) {
      doc.addPage();
      y = options.margin;
    }
    
    doc.text(line, options.margin, y);
    y += lineHeightMm;
  });

  return new Uint8Array(doc.output('arraybuffer'));
}

