// pdf-lib imported dynamically for better performance

export async function splitPDF(
  file: File,
  ranges: { start: number; end: number }[]
): Promise<Uint8Array[]> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const results: Uint8Array[] = [];

  for (const range of ranges) {
    const newPdf = await PDFDocument.create();
    const pageIndices = Array.from(
      { length: range.end - range.start + 1 },
      (_, i) => range.start - 1 + i
    );
    const copiedPages = await newPdf.copyPages(pdf, pageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));
    results.push(await newPdf.save());
  }

  return results;
}

export async function extractPages(file: File, pageNumbers: number[]): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();

  const pageIndices = pageNumbers.map((num) => num - 1);
  const copiedPages = await newPdf.copyPages(pdf, pageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return await newPdf.save();
}

export async function splitIntoSinglePages(file: File): Promise<Uint8Array[]> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const results: Uint8Array[] = [];
  const totalPages = pdf.getPageCount();

  for (let i = 0; i < totalPages; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(copiedPage);
    results.push(await newPdf.save());
  }

  return results;
}

