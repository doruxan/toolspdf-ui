import * as fs from 'fs';
import * as path from 'path';

// Simple function to create a colored PNG image as a data URL
function createColoredImage(width: number, height: number, r: number, g: number, b: number): Buffer {
  // PNG file structure (simplified solid color image)
  const bytesPerPixel = 3;
  const imageDataSize = width * height * bytesPerPixel;
  
  // Create a simple BMP file (easier than PNG for generation)
  const fileSize = 54 + imageDataSize;
  const buffer = Buffer.alloc(fileSize);
  
  // BMP Header
  buffer.write('BM', 0);
  buffer.writeUInt32LE(fileSize, 2);
  buffer.writeUInt32LE(54, 10); // Offset to pixel data
  
  // DIB Header
  buffer.writeUInt32LE(40, 14); // Header size
  buffer.writeInt32LE(width, 18);
  buffer.writeInt32LE(height, 22);
  buffer.writeUInt16LE(1, 26); // Color planes
  buffer.writeUInt16LE(24, 28); // Bits per pixel
  buffer.writeUInt32LE(imageDataSize, 34);
  
  // Pixel data (BGR format, bottom-up)
  let offset = 54;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      buffer[offset++] = b; // Blue
      buffer[offset++] = g; // Green
      buffer[offset++] = r; // Red
    }
  }
  
  return buffer;
}

async function generateTestImages() {
  const outputDir = path.join(process.cwd(), 'public', 'test-fixtures');
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🎨 Generating test images...\n');

  // Generate image-1.jpg (Red image)
  console.log('Creating image-1.jpg (red)...');
  const img1 = createColoredImage(800, 600, 255, 100, 100);
  fs.writeFileSync(path.join(outputDir, 'image-1.bmp'), img1);
  console.log('✅ image-1.bmp created (800x600, red)\n');

  // Generate image-2.png (Blue image)
  console.log('Creating image-2.bmp (blue)...');
  const img2 = createColoredImage(800, 600, 100, 100, 255);
  fs.writeFileSync(path.join(outputDir, 'image-2.bmp'), img2);
  console.log('✅ image-2.bmp created (800x600, blue)\n');

  // Generate image-3.jpg (Green image)
  console.log('Creating image-3.bmp (green)...');
  const img3 = createColoredImage(800, 600, 100, 255, 100);
  fs.writeFileSync(path.join(outputDir, 'image-3.bmp'), img3);
  console.log('✅ image-3.bmp created (800x600, green)\n');

  console.log('✨ All test images generated successfully!\n');
  console.log(`📁 Files saved to: ${outputDir}\n`);
  console.log('Files created:');
  console.log('  - image-1.bmp (red)');
  console.log('  - image-2.bmp (blue)');
  console.log('  - image-3.bmp (green)');
  console.log('\nNote: Using BMP format for simplicity. Can be used with image-to-PDF converter.');
}

// Run the generator
generateTestImages().catch(console.error);

