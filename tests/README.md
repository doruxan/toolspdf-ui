# PDF Tools - Test Suite Documentation

Complete testing infrastructure for all 9 PDF tool features with automated sample file generation.

## 📁 Test Structure

```
tests/
├── README.md                    # This file
public/test-fixtures/            # Generated test files
├── sample-1.pdf                 # Single page PDF (1 page)
├── sample-2.pdf                 # Multi-page PDF (3 pages)
├── sample-3.pdf                 # Another PDF (2 pages)
├── large.pdf                    # Large PDF (10 pages)
├── image-1.bmp                  # Red image (800x600)
├── image-2.bmp                  # Blue image (800x600)
└── image-3.bmp                  # Green image (800x600)

scripts/
├── generateTestFixtures.ts      # PDF generator script
└── generateTestImages.ts        # Image generator script

app/test/
└── page.tsx                     # Test UI page

components/test/
└── TestRunner.tsx               # Test execution component
```

## 🚀 Quick Start

### 1. Generate Test Files (Already Done)

The test files have been generated and are located in `/public/test-fixtures/`.

If you need to regenerate them:

```bash
# Generate PDFs
npx tsx scripts/generateTestFixtures.ts

# Generate Images
npx tsx scripts/generateTestImages.ts
```

### 2. Run the Development Server

```bash
npm run dev
```

### 3. Open the Test Page

Navigate to: **http://localhost:3000/test**

### 4. Run Tests

- Click **"Run All Tests"** to test all 9 tools at once
- Click individual **"Run"** buttons to test specific tools
- View results in real-time with pass/fail indicators
- Check browser console for detailed logs

## 🧪 Test Cases

### 1. Merge PDF Test
**Purpose**: Verify PDF merging functionality  
**Input**: `sample-1.pdf` (1 page) + `sample-3.pdf` (2 pages)  
**Expected**: Combined PDF with 3 pages  
**Validates**: 
- Files are merged correctly
- Page order is preserved
- Output is valid PDF

### 2. Split PDF Test
**Purpose**: Verify PDF splitting into single pages  
**Input**: `sample-2.pdf` (3 pages)  
**Expected**: 3 separate single-page PDFs  
**Validates**:
- Correct number of output files
- Each output is valid PDF
- Pages are split correctly

### 3. Compress PDF Test
**Purpose**: Verify PDF compression  
**Input**: `large.pdf` (10 pages, larger file)  
**Expected**: Smaller PDF file  
**Validates**:
- Output size < input size (or similar)
- Content preserved
- Valid PDF output

### 4. PDF to JPG Test
**Purpose**: Verify PDF to image conversion  
**Input**: `sample-2.pdf` (3 pages)  
**Expected**: 3 JPG images  
**Validates**:
- Correct number of images
- Images are valid
- Each page converted

### 5. JPG to PDF Test
**Purpose**: Verify image to PDF conversion  
**Input**: `image-1.bmp` + `image-2.bmp`  
**Expected**: PDF with 2 pages  
**Validates**:
- Images converted to PDF
- Correct page count
- Valid PDF output

### 6. Rotate PDF Test
**Purpose**: Verify PDF rotation  
**Input**: `sample-1.pdf`, rotation: 90°  
**Expected**: Rotated PDF  
**Validates**:
- PDF is rotated
- Content preserved
- Valid PDF output

### 7. Unlock PDF Test
**Purpose**: Verify PDF unlocking  
**Input**: `sample-1.pdf` (unprotected, but tests unlock logic)  
**Expected**: Unlocked PDF  
**Validates**:
- Unlock process completes
- Valid PDF output
- No errors thrown

### 8. Protect PDF Test
**Purpose**: Verify PDF password protection  
**Input**: `sample-1.pdf`, password: "test123"  
**Expected**: Password-protected PDF  
**Validates**:
- Protection applied
- Valid PDF output
- No errors thrown

### 9. Watermark PDF Test
**Purpose**: Verify watermark addition  
**Input**: `sample-1.pdf`, text: "TEST WATERMARK"  
**Expected**: PDF with watermark  
**Validates**:
- Watermark applied
- Valid PDF output
- No errors thrown

## 📊 Test Results

### Success Criteria

Each test passes if:
1. No JavaScript errors occur
2. Output is generated (not empty)
3. Output meets expected criteria (e.g., correct page count)
4. Process completes within reasonable time

### Test Status Indicators

- ⏳ **Pending**: Test hasn't run yet
- 🔄 **Running**: Test is currently executing
- ✅ **Passed**: Test completed successfully
- ❌ **Failed**: Test encountered an error

## 🔧 Troubleshooting

### Tests Failing?

1. **Check Browser Console**: Look for JavaScript errors
2. **Verify Test Files**: Ensure files exist in `/public/test-fixtures/`
3. **Regenerate Files**: Run the generator scripts again
4. **Clear Cache**: Hard refresh the page (Ctrl+Shift+R)
5. **Check PDF Libraries**: Ensure pdf-lib and PDF.js are installed

### Common Issues

**"Failed to fetch test file"**
- Ensure dev server is running
- Verify files exist in `/public/test-fixtures/`
- Check file permissions

**"Merge produced empty PDF"**
- Check if pdf-lib is properly installed
- Verify sample PDFs are valid
- Check browser console for detailed errors

**"Expected X images, got Y"**
- PDF.js worker may not be loading correctly
- Check network tab for worker script
- Verify PDF.js version compatibility

## 📝 Adding New Tests

### 1. Create Test Fixture

Generate a new test file:

```typescript
// In scripts/generateTestFixtures.ts
const newPDF = await PDFDocument.create();
// ... add content ...
const bytes = await newPDF.save();
fs.writeFileSync(path.join(outputDir, 'new-test.pdf'), bytes);
```

### 2. Add Test Case

In `components/test/TestRunner.tsx`:

```typescript
// Add to results array
{ id: 'new-test', name: 'New Test', status: 'pending', message: 'Waiting to run' }

// Add test function
const testNewFeature = async () => {
  const file = await fetchTestFile('new-test.pdf');
  // ... perform test ...
  if (/* test condition */) throw new Error('Test failed');
};

// Add to switch statement
case 'new-test':
  await testNewFeature();
  break;
```

### 3. Update Documentation

Add test description to `app/test/page.tsx` and this README.

## 🎯 Best Practices

### Writing Tests

1. **Be Specific**: Test one thing per test case
2. **Use Assertions**: Check actual vs expected results
3. **Handle Errors**: Use try-catch and meaningful error messages
4. **Clean Up**: Ensure tests don't leave side effects
5. **Document**: Explain what each test validates

### Test Files

1. **Keep Small**: Use minimal file sizes for faster tests
2. **Be Varied**: Test different scenarios (1 page, multi-page, etc.)
3. **Name Clearly**: Use descriptive filenames
4. **Version Control**: Commit test files to repository

## 📈 Performance Tips

### Optimize Test Speed

1. **Run Individually**: Test specific tools during development
2. **Parallel Execution**: Tests run sequentially; could be parallelized
3. **Smaller Files**: Use minimal test files for faster processing
4. **Caching**: Browser caches test files after first load

### Memory Management

- Tests process files in memory
- Large files may slow down browser
- Close test page when done to free memory
- Restart browser if experiencing issues

## 🔍 Debugging Tests

### Enable Detailed Logging

Check browser console for:
- Test execution flow
- PDF library operations
- File loading status
- Error stack traces

### Inspect Test Files

You can manually download test files:
- Navigate to: http://localhost:3000/test-fixtures/sample-1.pdf
- Open in PDF viewer to verify contents
- Check file sizes and properties

### Step-by-Step Debugging

1. Run individual test (not "Run All")
2. Open browser DevTools (F12)
3. Go to Console tab
4. Click "Run" button for failing test
5. Examine error messages and stack trace
6. Check Network tab for file loading issues

## 📦 Test File Details

### PDF Files

| File | Pages | Purpose | Size |
|------|-------|---------|------|
| sample-1.pdf | 1 | Basic tests | ~5 KB |
| sample-2.pdf | 3 | Split/Convert | ~10 KB |
| sample-3.pdf | 2 | Merge tests | ~7 KB |
| large.pdf | 10 | Compression | ~40 KB |

### Image Files

| File | Format | Size | Color | Purpose |
|------|--------|------|-------|---------|
| image-1.bmp | BMP | 800x600 | Red | Convert to PDF |
| image-2.bmp | BMP | 800x600 | Blue | Convert to PDF |
| image-3.bmp | BMP | 800x600 | Green | Multi-image test |

## 🚨 Known Limitations

1. **PDF Encryption**: Browser-based encryption has limitations
2. **Large Files**: Very large PDFs may be slow to process
3. **Browser Support**: Requires modern browser with WebAssembly
4. **Network**: Test files must be served via HTTP (not file://)

## 📚 Related Documentation

- [Main README](../README.md) - Project overview
- [Implementation Summary](../IMPLEMENTATION_SUMMARY.md) - Build details
- [Quick Start Guide](../QUICK_START.md) - Deployment guide

## 🤝 Contributing

To contribute new tests:

1. Create test fixture files
2. Add test case to TestRunner
3. Update documentation
4. Test thoroughly
5. Submit PR with clear description

## ✅ Test Checklist

Before deploying:

- [ ] All 9 tests pass
- [ ] No console errors
- [ ] Tests complete in reasonable time
- [ ] Test files are accessible
- [ ] Documentation is up to date

---

**Happy Testing! 🧪**

For questions or issues, check the main project README or open an issue.

