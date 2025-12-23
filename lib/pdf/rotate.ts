import { PDFDocument, degrees } from 'pdf-lib';

export async function rotatePDF(
  file: File,
  rotation: 90 | 180 | 270,
  pageNumbers?: number[]
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  const pagesToRotate = pageNumbers
    ? pageNumbers.map((num) => num - 1)
    : Array.from({ length: pages.length }, (_, i) => i);

  pagesToRotate.forEach((pageIndex) => {
    if (pageIndex >= 0 && pageIndex < pages.length) {
      const page = pages[pageIndex];
      page.setRotation(degrees(rotation));
    }
  });

  return await pdf.save();
}

export async function rotateAllPages(file: File, rotation: 90 | 180 | 270): Promise<Uint8Array> {
  return rotatePDF(file, rotation);
}

