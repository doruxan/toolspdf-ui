# Updated Test Suite Documentation

## Overview

The test suite has been expanded from **9 tests to 16 tests** to cover all the new PDF tools added to the platform.

## Test Coverage (16 Tools)

### Original Tools (9)
1. ✅ **Merge PDF** - Combines sample-1.pdf + sample-3.pdf
2. ✅ **Split PDF** - Splits sample-2.pdf into 3 separate pages
3. ✅ **Compress PDF** - Compresses large.pdf (10 pages)
4. ✅ **PDF to JPG** - Converts sample-2.pdf to 3 images
5. ✅ **JPG to PDF** - Combines image-1.bmp + image-2.bmp
6. ✅ **Rotate PDF** - Rotates sample-1.pdf by 90°
7. ✅ **Unlock PDF** - Tests unlock functionality on sample-1.pdf
8. ✅ **Protect PDF** - Adds password protection to sample-1.pdf
9. ✅ **Watermark PDF** - Adds watermark to sample-1.pdf

### New Tools (7)
10. ✅ **Remove Pages** - Removes page 2 from sample-2.pdf (3-page PDF)
11. ✅ **Extract Pages** - Extracts pages 1 and 3 from sample-2.pdf
12. ✅ **Add Page Numbers** - Adds page numbers to sample-2.pdf (bottom-center, format: number)
13. ✅ **Organize PDF** - Reorders pages in reverse (3,2,1) on sample-2.pdf
14. ✅ **HTML to PDF** - Converts test HTML content to PDF
15. ✅ **Crop PDF** - Crops 10mm margins on all sides of sample-1.pdf
16. ✅ **Redact PDF** - Redacts a specific area (50, 700, 200x20) on sample-1.pdf

## Test Execution

### Access the Test Suite
```
http://localhost:3000/test
```

**Note:** The `/test` route is:
- ✅ Only accessible in **development mode**
- ❌ Automatically returns 404 in production
- 🔒 Protected by middleware and page-level checks

### Running Tests

**Option 1: Run All Tests**
Click the "Run All Tests" button to execute all 16 tests sequentially.

**Option 2: Run Individual Tests**
Click the "Run" button on any individual test card.

**Option 3: Reset**
Click "Reset Tests" to clear all results and start fresh.

## Test Implementation Details

### Test Functions Added

```typescript
// Remove Pages Test
const testRemovePages = async () => {
  const file = await fetchTestFile('sample-2.pdf');
  const removed = await removePages(file, [2]); // Remove page 2
  if (removed.length === 0) throw new Error('Remove pages produced empty PDF');
};

// Extract Pages Test
const testExtractPages = async () => {
  const file = await fetchTestFile('sample-2.pdf');
  const extracted = await extractPages(file, [1, 3]); // Extract pages 1 and 3
  if (extracted.length === 0) throw new Error('Extract pages produced empty PDF');
};

// Add Page Numbers Test
const testAddPageNumbers = async () => {
  const file = await fetchTestFile('sample-2.pdf');
  const numbered = await addPageNumbers(file, {
    position: 'bottom-center',
    fontSize: 12,
    format: 'number',
    startPage: 1,
  });
  if (numbered.length === 0) throw new Error('Add page numbers produced empty PDF');
};

// Organize PDF Test
const testOrganizePDF = async () => {
  const file = await fetchTestFile('sample-2.pdf');
  const reordered = await reorderPages(file, [3, 2, 1]); // Reverse order
  if (reordered.length === 0) throw new Error('Organize PDF produced empty PDF');
};

// HTML to PDF Test
const testHTMLToPDF = async () => {
  const htmlContent = '<h1>Test Document</h1><p>This is a test paragraph.</p>';
  const pdf = await htmlToPdf(htmlContent, {
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 20,
    fontSize: 12,
    lineHeight: 1.5,
  });
  if (pdf.length === 0) throw new Error('HTML to PDF produced empty PDF');
};

// Crop PDF Test
const testCropPDF = async () => {
  const file = await fetchTestFile('sample-1.pdf');
  const cropped = await cropPdf(file, {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
    unit: 'mm',
  });
  if (cropped.length === 0) throw new Error('Crop PDF produced empty PDF');
};

// Redact PDF Test
const testRedactPDF = async () => {
  const file = await fetchTestFile('sample-1.pdf');
  const redacted = await redactPdf(file, [
    { pageNumber: 1, x: 50, y: 700, width: 200, height: 20 }
  ]);
  if (redacted.length === 0) throw new Error('Redact PDF produced empty PDF');
};
```

## Test Fixtures Used

### PDF Files
- **sample-1.pdf** - 1 page (used for: rotate, unlock, protect, watermark, crop, redact)
- **sample-2.pdf** - 3 pages (used for: split, pdf-to-jpg, remove-pages, extract-pages, add-page-numbers, organize-pdf)
- **sample-3.pdf** - 2 pages (used for: merge)
- **large.pdf** - 10 pages (used for: compress)

### Image Files
- **image-1.bmp** - Red colored (800x600)
- **image-2.bmp** - Blue colored (800x600)
- **image-3.bmp** - Green colored (800x600)

## Test Results Display

Each test shows:
- ✅ **Status Icon** (Pending, Running, Passed, Failed)
- 📝 **Test Name** (e.g., "Remove Pages")
- 🆔 **Test ID** (e.g., "remove-pages")
- 💬 **Status Message** (Success/Error details)
- ⏱️ **Duration** (milliseconds)

## Statistics Dashboard

The test suite displays real-time stats:
- 📊 **Total Tests**: 16
- ✅ **Passed**: Count of successful tests
- ❌ **Failed**: Count of failed tests
- ⏳ **Pending**: Count of tests not yet run

## Development Workflow

1. **Add New Tool**: Create lib function + React component + page
2. **Add Test**: Update `TestRunner.tsx`:
   - Import the new function
   - Add test case to `results` array
   - Create test function
   - Add to switch statement
3. **Update Documentation**: Add description to test page
4. **Run & Verify**: Test in development mode

## Browser Compatibility

All tests run client-side using:
- **pdf-lib** - PDF manipulation
- **PDF.js** - PDF rendering
- **jsPDF** - PDF generation
- Browser APIs (Canvas, Blob, File)

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Next Steps

To add more tests:
1. Create test fixtures if needed
2. Add test case to `results` array
3. Implement test function
4. Update switch statement
5. Update test descriptions on page

---

**Test Suite Version**: 2.0  
**Last Updated**: December 2024  
**Total Test Coverage**: 16/16 Tools (100%)

