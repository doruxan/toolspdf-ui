# Testing Your PDF Tools - Quick Guide

## 🎯 Overview

All PDF tools have been tested and verified with a comprehensive test suite. This guide shows you how to run the tests yourself.

## ✅ Test Files Already Generated

Test PDFs and images have been pre-generated and are located in:
```
public/test-fixtures/
├── sample-1.pdf      (1 page)
├── sample-2.pdf      (3 pages)
├── sample-3.pdf      (2 pages)
├── large.pdf         (10 pages)
├── image-1.bmp       (red, 800x600)
├── image-2.bmp       (blue, 800x600)
└── image-3.bmp       (green, 800x600)
```

## 🚀 How to Run Tests

### Method 1: Automated Test Page (Recommended)

1. **Start the dev server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open the test page**:
   ```
   http://localhost:3000/test
   ```

3. **Run tests**:
   - Click **"Run All Tests"** to test all 9 tools at once
   - Or click individual **"Run"** buttons to test specific tools

4. **View results**:
   - ✅ Green = Test Passed
   - ❌ Red = Test Failed
   - ⏳ Gray = Not run yet
   - 🔄 Yellow = Running

### Method 2: Manual Testing

You can also test tools manually using the actual tool pages:

1. Download test files from `/test-fixtures/` folder
2. Navigate to any tool (e.g., `/merge-pdf`)
3. Upload the test files
4. Use the tool normally
5. Verify the output

## 📋 What Each Test Does

| Test | Input Files | What It Checks |
|------|------------|----------------|
| **Merge PDF** | sample-1.pdf + sample-3.pdf | Combines PDFs correctly |
| **Split PDF** | sample-2.pdf (3 pages) | Splits into 3 separate PDFs |
| **Compress PDF** | large.pdf | Reduces file size |
| **PDF to JPG** | sample-2.pdf | Converts 3 pages to 3 images |
| **JPG to PDF** | image-1.bmp + image-2.bmp | Converts images to 2-page PDF |
| **Rotate PDF** | sample-1.pdf | Rotates pages 90° |
| **Unlock PDF** | sample-1.pdf | Removes restrictions |
| **Protect PDF** | sample-1.pdf | Adds password protection |
| **Watermark PDF** | sample-1.pdf | Adds text watermark |

## 🔍 Interpreting Results

### ✅ All Tests Pass
Your PDF tools are working perfectly! You can:
- Deploy to production
- Test manually with your own files for extra confidence
- Share with users

### ❌ Some Tests Fail
If tests fail:
1. **Check browser console** (F12) for error details
2. **Verify test files exist** in `/public/test-fixtures/`
3. **Try regenerating files**:
   ```bash
   npm run generate-all-tests
   ```
4. **Test manually** to isolate the issue
5. **Check the specific tool's code** in `components/tools/`

## 🔄 Regenerating Test Files

If needed, regenerate test files:

```bash
# Regenerate all test files
npm run generate-all-tests

# Or individually:
npm run generate-test-pdfs    # PDFs only
npm run generate-test-images  # Images only
```

## 🎨 Test Page Features

The automated test page (`/test`) includes:

- **Stats Dashboard**: Shows total, passed, failed, and pending tests
- **One-Click Testing**: Run all tests with a single button
- **Individual Tests**: Test specific tools independently
- **Real-Time Results**: See results update as tests run
- **Duration Tracking**: See how long each test takes
- **Reset Function**: Clear results and start over

## 📊 Expected Test Times

Typical test durations (may vary by device):
- Merge PDF: 100-300ms
- Split PDF: 200-500ms
- Compress PDF: 300-700ms
- PDF to JPG: 500-1000ms (rendering required)
- JPG to PDF: 300-600ms
- Rotate PDF: 100-300ms
- Unlock PDF: 100-200ms
- Protect PDF: 100-200ms
- Watermark PDF: 200-400ms

**Total for all 9 tests**: ~5-10 seconds

## 🐛 Troubleshooting

### Test files not loading?
- Ensure dev server is running
- Check `/public/test-fixtures/` directory exists
- Verify files are present in the directory

### Tests taking too long?
- Close other browser tabs
- Check CPU/memory usage
- Try running tests individually instead of all at once

### Console errors?
- Check browser DevTools console (F12)
- Look for specific error messages
- Verify PDF library versions match package.json

### Blank page at /test?
- Hard refresh (Ctrl+Shift+R)
- Check for JavaScript errors
- Ensure all components compiled correctly

## 📱 Testing on Mobile

To test on mobile devices:

1. Start dev server on your computer
2. Get your local IP address:
   ```bash
   # Usually shown when you run npm run dev
   # e.g., http://192.168.1.100:3000
   ```
3. Open that URL on your mobile device
4. Navigate to `/test` page
5. Run tests (may be slower on mobile)

## ✨ Pro Tips

1. **Keep Console Open**: Browser console shows detailed logs
2. **Test Individually First**: Easier to debug if you test one at a time
3. **Check File Sizes**: Monitor memory usage with large PDFs
4. **Use Real Files Too**: Test with your own PDFs for real-world validation
5. **Regular Testing**: Run tests after any code changes

## 📚 More Information

- **Full Test Docs**: See `tests/README.md` for detailed documentation
- **Adding Tests**: Guide in test documentation
- **Tool Components**: Located in `components/tools/`
- **PDF Utilities**: Located in `lib/pdf/`

## 🎉 Quick Checklist

Before deploying:
- [ ] Run all tests on the test page
- [ ] All 9 tests show ✅ (green/passed)
- [ ] No errors in browser console
- [ ] Test at least one tool manually with your own files
- [ ] Verify on both desktop and mobile
- [ ] Check that files download correctly

---

**Ready to test?** Just visit **http://localhost:3000/test** and click "Run All Tests"! 🚀

