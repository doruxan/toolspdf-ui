// pdf-lib imported dynamically for better performance

export interface CropOptions {
  top: number;
  right: number;
  bottom: number;
  left: number;
  unit: 'pt' | 'mm' | 'in';
}

function convertToPoints(value: number, unit: 'pt' | 'mm' | 'in'): number {
  switch (unit) {
    case 'mm':
      return value * 2.834645669; // 1mm = 2.834645669pt
    case 'in':
      return value * 72; // 1in = 72pt
    case 'pt':
    default:
      return value;
  }
}

export async function cropPdf(
  file: File,
  options: CropOptions = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    unit: 'mm',
  }
): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  // Convert margins to points
  const topPt = convertToPoints(options.top, options.unit);
  const rightPt = convertToPoints(options.right, options.unit);
  const bottomPt = convertToPoints(options.bottom, options.unit);
  const leftPt = convertToPoints(options.left, options.unit);

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    
    // Set crop box (reduces visible area)
    page.setCropBox(
      leftPt,
      bottomPt,
      width - leftPt - rightPt,
      height - topPt - bottomPt
    );
  });

  return pdfDoc.save();
}

