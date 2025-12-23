import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

async function generateTestPDFs() {
  const outputDir = path.join(process.cwd(), 'public', 'test-fixtures');
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🔨 Generating test PDFs and images...\n');

  // 1. Generate sample-1.pdf (Single page)
  console.log('Creating sample-1.pdf...');
  const pdf1 = await PDFDocument.create();
  const page1 = pdf1.addPage([595, 842]); // A4 size
  const font1 = await pdf1.embedFont(StandardFonts.Helvetica);
  
  page1.drawText('Test Page 1', {
    x: 50,
    y: 800,
    size: 30,
    font: font1,
    color: rgb(0, 0, 0),
  });
  page1.drawText('This is a single-page test PDF.', {
    x: 50,
    y: 750,
    size: 14,
    font: font1,
    color: rgb(0.2, 0.2, 0.2),
  });
  page1.drawText('Used for: Basic tests, Rotation, Watermark', {
    x: 50,
    y: 700,
    size: 12,
    font: font1,
    color: rgb(0.4, 0.4, 0.4),
  });
  
  const pdf1Bytes = await pdf1.save();
  fs.writeFileSync(path.join(outputDir, 'sample-1.pdf'), pdf1Bytes);
  console.log('✅ sample-1.pdf created (1 page)\n');

  // 2. Generate sample-2.pdf (Multi-page)
  console.log('Creating sample-2.pdf...');
  const pdf2 = await PDFDocument.create();
  const font2 = await pdf2.embedFont(StandardFonts.HelveticaBold);
  
  for (let i = 1; i <= 3; i++) {
    const page = pdf2.addPage([595, 842]);
    page.drawText(`Page ${i} of 3`, {
      x: 50,
      y: 800,
      size: 30,
      font: font2,
      color: rgb(0, 0, 0),
    });
    page.drawText(`This is page number ${i}.`, {
      x: 50,
      y: 750,
      size: 14,
      font: font2,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText('Used for: Split PDF, PDF to JPG tests', {
      x: 50,
      y: 700,
      size: 12,
      font: font2,
      color: rgb(0.4, 0.4, 0.4),
    });
  }
  
  const pdf2Bytes = await pdf2.save();
  fs.writeFileSync(path.join(outputDir, 'sample-2.pdf'), pdf2Bytes);
  console.log('✅ sample-2.pdf created (3 pages)\n');

  // 3. Generate sample-3.pdf (For merging)
  console.log('Creating sample-3.pdf...');
  const pdf3 = await PDFDocument.create();
  const font3 = await pdf3.embedFont(StandardFonts.Courier);
  
  for (let i = 1; i <= 2; i++) {
    const page = pdf3.addPage([595, 842]);
    page.drawText(`Document 2 - Page ${i}`, {
      x: 50,
      y: 800,
      size: 24,
      font: font3,
      color: rgb(0.1, 0.1, 0.6),
    });
    page.drawText('Used for: Merge PDF test', {
      x: 50,
      y: 750,
      size: 12,
      font: font3,
      color: rgb(0.4, 0.4, 0.4),
    });
  }
  
  const pdf3Bytes = await pdf3.save();
  fs.writeFileSync(path.join(outputDir, 'sample-3.pdf'), pdf3Bytes);
  console.log('✅ sample-3.pdf created (2 pages)\n');

  // 4. Generate large.pdf (For compression)
  console.log('Creating large.pdf...');
  const pdfLarge = await PDFDocument.create();
  const fontLarge = await pdfLarge.embedFont(StandardFonts.TimesRoman);
  
  for (let i = 1; i <= 10; i++) {
    const page = pdfLarge.addPage([595, 842]);
    page.drawText(`Large Document - Page ${i}/10`, {
      x: 50,
      y: 800,
      size: 24,
      font: fontLarge,
      color: rgb(0, 0, 0),
    });
    
    // Add more text to increase file size
    for (let j = 0; j < 20; j++) {
      page.drawText(`Line ${j + 1}: This is some sample text to increase the file size for compression testing.`, {
        x: 50,
        y: 750 - (j * 25),
        size: 10,
        font: fontLarge,
        color: rgb(0.3, 0.3, 0.3),
      });
    }
  }
  
  const pdfLargeBytes = await pdfLarge.save();
  fs.writeFileSync(path.join(outputDir, 'large.pdf'), pdfLargeBytes);
  console.log('✅ large.pdf created (10 pages)\n');

  console.log('✨ All test PDFs generated successfully!\n');
  console.log(`📁 Files saved to: ${outputDir}\n`);
  console.log('Files created:');
  console.log('  - sample-1.pdf (1 page)');
  console.log('  - sample-2.pdf (3 pages)');
  console.log('  - sample-3.pdf (2 pages)');
  console.log('  - large.pdf (10 pages)');
}

// Run the generator
generateTestPDFs().catch(console.error);

