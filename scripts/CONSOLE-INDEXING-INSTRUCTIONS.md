# 🚀 Google Search Console - Automated Indexing (Console Script)

Since the Google Indexing API has limitations, this script automates the manual "Request Indexing" process directly in the Google Search Console UI.

---

## ⚡ Quick Start (3 Steps)

### Step 1: Open Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: **`sc-domain:rawtools.io`** or **`https://rawtools.io`**
3. Click **"URL Inspection"** in the left sidebar (🔍 icon at the top)

### Step 2: Open Browser Console
- **Windows/Linux**: Press `Ctrl + Shift + J` or `F12`
- **Mac**: Press `Cmd + Option + J`
- Make sure you're on the **"Console"** tab

### Step 3: Paste and Run the Script
1. Open the file: `scripts/console-request-indexing.js`
2. Copy the **entire contents** of the file
3. Paste it into the console
4. Press **Enter**

---

## 📊 What Happens Next

1. **A progress modal appears** in the top-right corner showing:
   - Total URLs to process
   - Success/Error counts
   - Current URL being processed
   - Activity log

2. **The script automatically**:
   - Enters each URL into the inspection tool
   - Clicks the "Inspect" button
   - Waits for results
   - Clicks "Request Indexing" when available
   - Moves to the next URL

3. **Timeline**: Processing ~90 URLs takes about **15-30 minutes** (with 8-second delays to avoid rate limiting)

---

## ⚙️ Controls

- **⏸ Pause**: Pause the process (resume anytime)
- **⏹ Stop**: Stop completely (progress will be lost)
- **× Close**: Close the modal and stop the process

---

## ⚠️ Important Notes

### Keep the Tab Open
- **Do NOT close** the Search Console tab
- **Do NOT navigate away** from the page
- **Do NOT refresh** the page (unless you want to stop)
- You CAN switch to other tabs/windows while it runs

### Rate Limiting
- Google Search Console has rate limits (usually ~100-200 requests/day)
- The script adds 8-second delays between URLs to be safe
- If you hit a limit, you'll see "Request Indexing" button not found
- **Solution**: Run the script again tomorrow for remaining URLs

### Why Some URLs Might Fail
- ✅ **Already indexed**: Google already knows about it (good!)
- ✅ **Blocked by robots.txt**: Intentionally blocked (check your robots.txt)
- ❌ **Quota exceeded**: Hit the daily limit (wait 24 hours)
- ❌ **Not found**: URL doesn't exist or returns 404
- ❌ **Redirect**: URL redirects to another page

---

## 📝 How to Track Progress

### Option 1: Watch the Modal
The floating modal shows real-time progress and logs every action.

### Option 2: Console Logs
All logs are also printed to the browser console with color coding:
- 🟢 **Green**: Success messages
- 🔴 **Red**: Errors
- 🟠 **Orange**: Warnings
- 🔵 **Blue**: Info messages

### Option 3: Verify in Search Console
After the script finishes:
1. Go to **Coverage** report in Search Console (left sidebar)
2. Check the **"Valid"** count increase over the next 1-2 days
3. Or manually inspect individual URLs to see their status

---

## 🛠️ Troubleshooting

### Error: "Could not find URL input field"
**Solution**: Make sure you're on the URL Inspection page
- Click "URL Inspection" in the left sidebar
- You should see a large input field at the top

### Error: "Could not find Inspect button"
**Solution**: The page layout might have changed
- Try manually inspecting one URL first to see if Search Console is working
- Google may have changed their UI - open an issue if this persists

### Error: "Could not find Request Indexing button"
**Possible reasons**:
1. **URL is already indexed** - Check manually, if it says "URL is on Google", you're good!
2. **Quota limit reached** - Wait 24 hours and run again
3. **URL has issues** - Check for 404s, redirects, or robots.txt blocks
4. **Page still loading** - The script might be too fast, try increasing wait times

### Script Stops or Hangs
1. **Refresh the page** (this will stop the script)
2. **Restart from Step 1** above
3. The script will process all URLs from the beginning (Google won't re-index if not needed)

### Browser Tab Crashes
If your browser crashes or runs out of memory:
1. Close other tabs to free up memory
2. **Edit the script**: Split the `URLS` array into smaller batches
3. Run each batch separately

---

## 🔧 Customization

### Change the URLs List
Edit `scripts/console-request-indexing.js` and modify the `URLS` array:

```javascript
const URLS = [
  'https://rawtools.io/',
  'https://rawtools.io/your-new-page',
  // Add more URLs...
];
```

### Adjust Timing
If you're hitting rate limits or want faster processing:

```javascript
const DELAY_BETWEEN_URLS = 8000; // Change to 10000 for slower, 5000 for faster
const WAIT_FOR_INSPECTION = 20000; // Max wait for inspection results
const WAIT_AFTER_REQUEST = 4000; // Wait after clicking "Request Indexing"
```

### Process Only Specific Categories
Comment out categories you don't want to process:

```javascript
const URLS = [
  'https://rawtools.io/',
  // PDF Tools
  'https://rawtools.io/merge-pdf',
  // ...
  
  // JSON Tools - SKIP THESE
  // 'https://rawtools.io/csv-to-json',
  // 'https://rawtools.io/json-formatter',
];
```

---

## 📈 Expected Results

### Immediate
- ✅ Script completes successfully
- ✅ Progress modal shows high success count
- ✅ Console logs show green success messages

### Within 1-2 Days
- 📈 Coverage report in Search Console shows more "Valid" URLs
- 🔍 Manual URL inspection shows "URL is on Google" or "Indexing requested"

### Within 1-2 Weeks
- 🔎 URLs start appearing in Google Search results
- 📊 Impressions increase in Performance report
- 🚀 Organic traffic starts to grow

---

## 🔐 Privacy & Security

- ✅ **All processing happens in your browser**
- ✅ **No data is sent to external servers**
- ✅ **Uses Google's own Search Console interface**
- ✅ **No credentials are stored or logged**
- ✅ **Open source - you can review the code**

---

## 🆘 Getting Help

If you encounter issues:

1. **Check the console** for detailed error messages
2. **Try manually inspecting** one URL to verify Search Console is working
3. **Wait 24 hours** if you suspect rate limiting
4. **Check Google Search Console Help** for account-specific issues
5. **Open an issue** in the repository with:
   - Browser and version
   - Console error messages (screenshot)
   - Description of what went wrong

---

## 📚 Alternative Methods

If this script doesn't work for you, try:

1. **Google Indexing API** (requires setup):
   - See `scripts/INDEXING_API_SETUP.md`
   - Better for automation and large-scale indexing
   - Requires service account and OAuth setup

2. **Manual Submission**:
   - Use Search Console's URL Inspection tool
   - Request indexing for your top 10-20 most important pages
   - Slow but 100% reliable

3. **Sitemap Submission**:
   - Google automatically crawls your sitemap
   - Slower but zero effort after initial submission
   - Already done if you submitted `https://rawtools.io/sitemap.xml`

---

## ✅ Success Checklist

After running the script:

- [ ] Script completed without major errors
- [ ] Success count is > 80% of total URLs
- [ ] Progress modal showed "Process Complete"
- [ ] No console errors in red (warnings in orange are OK)
- [ ] You can close the tab now
- [ ] Check Search Console Coverage report in 1-2 days
- [ ] Monitor impressions in Performance report over 1-2 weeks

---

**Ready?** Follow the 3 steps at the top and let it run! ☕

The script will handle everything automatically. Grab a coffee and check back in 20-30 minutes! 🚀

