// pdf-lib imported dynamically for better performance

export interface WatermarkOptions {
  text: string;
  opacity?: number;
  rotation?: number;
  fontSize?: number;
  color?: { r: number; g: number; b: number };
}

export async function addTextWatermark(
  file: File,
  options: WatermarkOptions
): Promise<Uint8Array> {
  const { PDFDocument, rgb, StandardFonts, degrees } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);

  const {
    text,
    opacity = 0.3,
    rotation = 45,
    fontSize = 48,
    color = { r: 0.5, g: 0.5, b: 0.5 },
  } = options;

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = fontSize;

    page.drawText(text, {
      x: width / 2 - textWidth / 2,
      y: height / 2 - textHeight / 2,
      size: fontSize,
      font: font,
      color: rgb(color.r, color.g, color.b),
      opacity: opacity,
      rotate: degrees(rotation),
    });
  });

  return await pdf.save();
}

export async function addImageWatermark(
  file: File,
  imageFile: File,
  options: { opacity?: number; scale?: number }
): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  const imageArrayBuffer = await imageFile.arrayBuffer();
  const imageType = imageFile.type;

  let image;
  if (imageType === 'image/png') {
    image = await pdf.embedPng(imageArrayBuffer);
  } else if (imageType === 'image/jpeg' || imageType === 'image/jpg') {
    image = await pdf.embedJpg(imageArrayBuffer);
  } else {
    throw new Error('Unsupported image format. Please use PNG or JPEG.');
  }

  const { opacity = 0.3, scale = 0.3 } = options;

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    const imageWidth = image.width * scale;
    const imageHeight = image.height * scale;

    page.drawImage(image, {
      x: width / 2 - imageWidth / 2,
      y: height / 2 - imageHeight / 2,
      width: imageWidth,
      height: imageHeight,
      opacity: opacity,
    });
  });

  return await pdf.save();
}

