/**
 * Google Search Console - Automated Indexing Request Script
 * 
 * INSTRUCTIONS:
 * 1. Go to Google Search Console: https://search.google.com/search-console
 * 2. Select your property (sc-domain:rawtools.io or https://rawtools.io)
 * 3. Go to URL Inspection tool (left sidebar)
 * 4. Open the browser console (F12 or Cmd+Option+J / Ctrl+Shift+J)
 * 5. Paste this entire script and press Enter
 * 6. The script will automatically inspect and request indexing for all URLs
 * 
 * HOW IT WORKS:
 * - Uses the same internal API that Google Search Console uses
 * - Monitors the page for the "Request Indexing" button and clicks it automatically
 * - No page reloads - everything happens in the current tab
 * 
 * IMPORTANT:
 * - Keep the console window open
 * - Don't navigate away or close the tab
 * - The process can take 15-30 minutes for all URLs
 * - If you need to stop, click the Stop button in the modal or refresh the page
 */

(async function() {
  'use strict';
  
  // ===== CONFIGURATION =====
  const URLS = [
    'https://rawtools.io/',
    'https://rawtools.io/merge-pdf',
    'https://rawtools.io/split-pdf',
    'https://rawtools.io/compress-pdf',
    'https://rawtools.io/pdf-to-jpg',
    'https://rawtools.io/jpg-to-pdf',
    'https://rawtools.io/rotate-pdf',
    'https://rawtools.io/unlock-pdf',
    'https://rawtools.io/protect-pdf',
    'https://rawtools.io/watermark-pdf',
    'https://rawtools.io/remove-pages',
    'https://rawtools.io/extract-pages',
    'https://rawtools.io/add-page-numbers',
    'https://rawtools.io/organize-pdf',
    'https://rawtools.io/html-to-pdf',
    'https://rawtools.io/crop-pdf',
    'https://rawtools.io/redact-pdf',
    // IBAN Tools
    'https://rawtools.io/iban-validator',
    'https://rawtools.io/iban-generator',
    'https://rawtools.io/iban-parser',
    'https://rawtools.io/iban-formatter',
    'https://rawtools.io/batch-iban-validator',
    'https://rawtools.io/iban-check-calculator',
    'https://rawtools.io/iban-country-info',
    // JSON Tools
    'https://rawtools.io/csv-to-json',
    'https://rawtools.io/excel-to-json',
    'https://rawtools.io/json-formatter',
    'https://rawtools.io/json-minifier',
    'https://rawtools.io/json-mapper',
    'https://rawtools.io/json-schema-validator',
    'https://rawtools.io/json-diff',
    'https://rawtools.io/json-escape',
    'https://rawtools.io/json-query',
    // Shopify Tools
    'https://rawtools.io/shopify-profit-calculator',
    'https://rawtools.io/shopify-fees-calculator',
    'https://rawtools.io/shopify-ltv-cac-calculator',
    'https://rawtools.io/shopify-bundle-pricing-calculator',
    'https://rawtools.io/shopify-break-even-roas-calculator',
    'https://rawtools.io/shopify-return-refund-impact-calculator',
    'https://rawtools.io/shopify-invoice-generator',
    'https://rawtools.io/shopify-speed-checklist',
    // String Tools
    'https://rawtools.io/case-converter',
    'https://rawtools.io/word-counter',
    'https://rawtools.io/base64-encoder',
    'https://rawtools.io/url-encoder',
    'https://rawtools.io/hash-generator',
    'https://rawtools.io/lorem-ipsum-generator',
    'https://rawtools.io/find-replace',
    'https://rawtools.io/line-sorter',
    'https://rawtools.io/duplicate-remover',
    'https://rawtools.io/uuid-generator',
    'https://rawtools.io/password-generator',
    'https://rawtools.io/slug-generator',
    'https://rawtools.io/jwt-decoder',
    'https://rawtools.io/html-entity-encoder',
    'https://rawtools.io/text-diff',
    'https://rawtools.io/regex-tester',
    'https://rawtools.io/string-reverser',
    'https://rawtools.io/whitespace-remover',
    'https://rawtools.io/binary-converter',
    'https://rawtools.io/remove-accents',
    'https://rawtools.io/markdown-to-html',
    'https://rawtools.io/html-to-text',
    'https://rawtools.io/character-counter',
    'https://rawtools.io/bracket-matcher',
    'https://rawtools.io/emoji-extractor',
    // Blog
    'https://rawtools.io/blog',
    'https://rawtools.io/blog/how-shopify-stores-actually-calculate-profit',
    'https://rawtools.io/blog/how-to-create-shopify-invoices-that-look-professional',
    'https://rawtools.io/blog/shopify-fees-explained-what-shopify-actually-takes-per-sale',
    'https://rawtools.io/blog/ltv-cac-for-shopify-what-to-model-before-you-scale-ads',
    'https://rawtools.io/blog/shopify-bundle-pricing-how-to-price-multipacks-without-killing-margin',
    'https://rawtools.io/blog/break-even-roas-shopify-how-to-set-real-roas-targets',
    'https://rawtools.io/blog/returns-and-refunds-shopify-how-to-model-the-real-profit-impact',
    'https://rawtools.io/blog/shopify-store-name-how-to-pick-a-name-you-wont-regret',
    'https://rawtools.io/blog/shopify-product-descriptions-how-to-write-ones-that-convert-without-hype',
    'https://rawtools.io/blog/shopify-speed-checklist-what-to-fix-before-you-buy-another-app',
    'https://rawtools.io/blog/shopify-theme-detector-what-you-can-and-cant-detect',
    'https://rawtools.io/blog/how-to-merge-pdf-files-free-2025',
    'https://rawtools.io/blog/how-to-compress-pdf-files-free-secure',
    'https://rawtools.io/blog/iban-vs-swift-bic-vs-account-number-what-you-need-for-international-transfers',
    'https://rawtools.io/blog/how-to-parse-an-iban-extract-bank-code-branch-and-account-number',
    'https://rawtools.io/blog/iban-check-digits-mod-97-explained-what-it-detects-and-how-to-fix-failures',
    'https://rawtools.io/blog/json-schema-validation-how-to-catch-bad-api-payloads',
    'https://rawtools.io/blog/how-to-diff-two-json-files-and-see-what-changed',
    'https://rawtools.io/blog/jsonpath-in-practice-query-json-with-jsonpath',
    'https://rawtools.io/blog/category/pdf',
    'https://rawtools.io/blog/category/ecommerce',
    'https://rawtools.io/blog/category/productivity',
    'https://rawtools.io/blog/category/json',
    // Other Pages
    'https://rawtools.io/about',
    'https://rawtools.io/contact',
    'https://rawtools.io/privacy',
    'https://rawtools.io/terms',
  ];

  const DELAY_BETWEEN_URLS = 8000; // 8 seconds between each URL (to avoid rate limiting)
  const WAIT_FOR_INSPECTION = 20000; // 20 seconds max wait for inspection results
  const WAIT_AFTER_REQUEST = 4000; // 4 seconds after clicking request button

  // ===== STYLING =====
  const styles = `
    #indexing-progress-modal {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 400px;
      max-height: 600px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
      border: 2px solid #1a73e8;
    }
    #indexing-progress-header {
      background: linear-gradient(135deg, #1a73e8, #174ea6);
      color: white;
      padding: 16px 20px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #indexing-progress-close {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    #indexing-progress-close:hover {
      background: rgba(255,255,255,0.3);
    }
    #indexing-progress-body {
      padding: 20px;
      max-height: 500px;
      overflow-y: auto;
    }
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }
    .stat-card {
      background: #f8f9fa;
      padding: 12px;
      border-radius: 8px;
      text-align: center;
    }
    .stat-value {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .stat-label {
      font-size: 12px;
      color: #5f6368;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .progress-bar-container {
      background: #e8eaed;
      height: 32px;
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 20px;
      position: relative;
    }
    .progress-bar-fill {
      background: linear-gradient(90deg, #1a73e8, #174ea6);
      height: 100%;
      transition: width 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: 600;
    }
    .current-url {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 16px;
      font-size: 12px;
      word-break: break-all;
    }
    .current-url-label {
      font-weight: 600;
      margin-bottom: 4px;
      color: #856404;
    }
    .log-container {
      max-height: 200px;
      overflow-y: auto;
      background: #f8f9fa;
      border-radius: 6px;
      padding: 12px;
      font-size: 11px;
      font-family: 'Courier New', monospace;
    }
    .log-entry {
      padding: 4px 0;
      border-bottom: 1px solid #e8eaed;
    }
    .log-entry:last-child {
      border-bottom: none;
    }
    .log-success { color: #0f9d58; }
    .log-error { color: #d93025; }
    .log-warning { color: #f9ab00; }
    .log-info { color: #1a73e8; }
    .control-buttons {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }
    .control-button {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-stop {
      background: #d93025;
      color: white;
    }
    .btn-stop:hover {
      background: #b91d12;
    }
    .btn-pause {
      background: #f9ab00;
      color: white;
    }
    .btn-pause:hover {
      background: #e69700;
    }
    .btn-resume {
      background: #0f9d58;
      color: white;
    }
    .btn-resume:hover {
      background: #0d8847;
    }
  `;

  // ===== UTILITY FUNCTIONS =====
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getPropertyId() {
    // Try to extract property ID from URL or page
    const urlParams = new URLSearchParams(window.location.search);
    const resourceId = urlParams.get('resource_id');
    if (resourceId) return resourceId;

    // Try to find it in the page
    const match = window.location.href.match(/resource_id=([^&]+)/);
    return match ? match[1] : null;
  }

  // ===== UI CREATION =====
  function createProgressModal() {
    // Add styles
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'indexing-progress-modal';
    modal.innerHTML = `
      <div id="indexing-progress-header">
        <span>🚀 Indexing Progress</span>
        <button id="indexing-progress-close">×</button>
      </div>
      <div id="indexing-progress-body">
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-value" id="stat-total">0</div>
            <div class="stat-label">Total</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="color: #0f9d58;" id="stat-success">0</div>
            <div class="stat-label">Success</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="color: #d93025;" id="stat-error">0</div>
            <div class="stat-label">Errors</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="color: #1a73e8;" id="stat-remaining">0</div>
            <div class="stat-label">Remaining</div>
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" id="progress-bar-fill" style="width: 0%">0%</div>
        </div>
        <div class="current-url" id="current-url-display">
          <div class="current-url-label">Current URL:</div>
          <div id="current-url-text">Initializing...</div>
        </div>
        <div class="control-buttons">
          <button class="control-button btn-pause" id="btn-pause">⏸ Pause</button>
          <button class="control-button btn-stop" id="btn-stop">⏹ Stop</button>
        </div>
        <div style="margin-top: 16px; font-size: 12px; font-weight: 600; color: #5f6368;">Activity Log:</div>
        <div class="log-container" id="log-container"></div>
      </div>
    `;
    document.body.appendChild(modal);

    return modal;
  }

  // ===== STATE MANAGEMENT =====
  let state = {
    currentIndex: 0,
    successCount: 0,
    errorCount: 0,
    isPaused: false,
    shouldStop: false,
    logs: []
  };

  function updateUI() {
    const total = URLS.length;
    const processed = state.currentIndex;
    const remaining = total - processed;
    const progress = Math.round((processed / total) * 100);

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-success').textContent = state.successCount;
    document.getElementById('stat-error').textContent = state.errorCount;
    document.getElementById('stat-remaining').textContent = remaining;
    document.getElementById('progress-bar-fill').style.width = progress + '%';
    document.getElementById('progress-bar-fill').textContent = `${processed}/${total} (${progress}%)`;
  }

  function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    state.logs.push({ message: logEntry, type });
    
    console.log(`%c${logEntry}`, `color: ${
      type === 'success' ? '#0f9d58' :
      type === 'error' ? '#d93025' :
      type === 'warning' ? '#f9ab00' :
      '#1a73e8'
    }; font-weight: bold;`);

    const logContainer = document.getElementById('log-container');
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    entry.textContent = logEntry;
    logContainer.appendChild(entry);
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  function updateCurrentUrl(url) {
    document.getElementById('current-url-text').textContent = url || 'None';
  }

  // ===== CORE INDEXING LOGIC =====
  function findInputField() {
    // Try multiple selectors for the URL input field
    const selectors = [
      'input[type="text"]',
      'input[placeholder*="URL"]',
      'input[placeholder*="url"]',
      'input[jsname]',
      'input[aria-label*="URL"]',
      'input[aria-label*="url"]',
    ];

    for (const selector of selectors) {
      const inputs = Array.from(document.querySelectorAll(selector));
      for (const input of inputs) {
        // Check if it's visible and likely the URL inspection input
        const rect = input.getBoundingClientRect();
        if (rect.width > 200 && rect.height > 20) {
          return input;
        }
      }
    }
    return null;
  }

  function findInspectButton() {
    const buttons = Array.from(document.querySelectorAll('button, div[role="button"]'));
    return buttons.find(btn => {
      const text = btn.textContent?.toLowerCase() || '';
      const ariaLabel = btn.getAttribute('aria-label')?.toLowerCase() || '';
      return text.includes('inspect') || text.includes('test') || 
             ariaLabel.includes('inspect') || ariaLabel.includes('test');
    });
  }

  function findRequestIndexingButton() {
    const buttons = Array.from(document.querySelectorAll('button, div[role="button"], a[role="button"]'));
    return buttons.find(btn => {
      const text = btn.textContent?.toLowerCase() || '';
      const ariaLabel = btn.getAttribute('aria-label')?.toLowerCase() || '';
      return text.includes('request indexing') || ariaLabel.includes('request indexing');
    });
  }

  async function waitForElement(finderFunction, maxWaitTime = 30000, checkInterval = 500) {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitTime) {
      const element = finderFunction();
      if (element) {
        return element;
      }
      await sleep(checkInterval);
    }
    return null;
  }

  async function requestIndexingForUrl(url) {
    try {
      log(`📍 Processing: ${url}`, 'info');
      updateCurrentUrl(url);

      // Step 1: Find and fill the URL input field
      log('🔍 Looking for URL input field...', 'info');
      const inputField = findInputField();
      
      if (!inputField) {
        log('❌ Could not find URL input field. Make sure you\'re on the URL Inspection page.', 'error');
        state.errorCount++;
        return false;
      }

      // Clear and fill the input
      inputField.value = '';
      inputField.focus();
      inputField.value = url;
      
      // Trigger input events to make sure the page recognizes the change
      inputField.dispatchEvent(new Event('input', { bubbles: true }));
      inputField.dispatchEvent(new Event('change', { bubbles: true }));
      
      await sleep(500);
      log('✅ URL entered into input field', 'success');

      // Step 2: Click the inspect/test button
      log('🔍 Looking for Inspect button...', 'info');
      const inspectButton = findInspectButton();
      
      if (!inspectButton) {
        log('❌ Could not find Inspect button', 'error');
        state.errorCount++;
        return false;
      }

      inspectButton.click();
      log('✅ Clicked Inspect button', 'success');
      log('⏳ Waiting for inspection results...', 'info');

      // Step 3: Wait for the inspection to complete and find "Request Indexing" button
      await sleep(3000); // Give it a few seconds to start
      
      const requestButton = await waitForElement(findRequestIndexingButton, WAIT_FOR_INSPECTION);
      
      if (!requestButton) {
        log('⚠️ Could not find "Request Indexing" button', 'warning');
        log('💡 This URL might already be indexed, blocked by robots.txt, or there\'s a quota limit', 'info');
        state.errorCount++;
        return false;
      }

      log('✅ Found "Request Indexing" button!', 'success');
      await sleep(1000);

      // Step 4: Click "Request Indexing"
      requestButton.click();
      log('✅ Clicked "Request Indexing"', 'success');
      
      // Wait for the confirmation
      await sleep(WAIT_AFTER_REQUEST);

      state.successCount++;
      log(`🎉 Successfully requested indexing for: ${url}`, 'success');
      return true;

    } catch (error) {
      log(`❌ Error processing ${url}: ${error.message}`, 'error');
      console.error('Full error:', error);
      state.errorCount++;
      return false;
    }
  }

  // ===== MAIN EXECUTION =====
  async function run() {
    log('🚀 Starting Google Search Console Indexing Automation', 'success');
    log(`📊 Total URLs to process: ${URLS.length}`, 'info');
    log('⚠️ IMPORTANT: Keep this tab open and don\'t navigate away!', 'warning');

    const modal = createProgressModal();
    updateUI();

    // Setup event listeners
    document.getElementById('indexing-progress-close').onclick = () => {
      if (confirm('Are you sure you want to close? This will stop the indexing process.')) {
        state.shouldStop = true;
        modal.remove();
      }
    };

    document.getElementById('btn-pause').onclick = () => {
      state.isPaused = !state.isPaused;
      const btn = document.getElementById('btn-pause');
      if (state.isPaused) {
        btn.textContent = '▶️ Resume';
        btn.className = 'control-button btn-resume';
        log('⏸️ Paused. Click Resume to continue.', 'warning');
      } else {
        btn.textContent = '⏸ Pause';
        btn.className = 'control-button btn-pause';
        log('▶️ Resumed.', 'success');
      }
    };

    document.getElementById('btn-stop').onclick = () => {
      if (confirm('Are you sure you want to stop? Progress will be lost.')) {
        state.shouldStop = true;
        log('⏹️ Stopped by user.', 'error');
      }
    };

    // Process each URL
    for (let i = 0; i < URLS.length; i++) {
      if (state.shouldStop) {
        log('⏹️ Process stopped.', 'error');
        break;
      }

      // Handle pause
      while (state.isPaused && !state.shouldStop) {
        await sleep(500);
      }

      state.currentIndex = i;
      const url = URLS[i];
      
      await requestIndexingForUrl(url);
      updateUI();

      // Don't delay after the last URL
      if (i < URLS.length - 1) {
        log(`⏳ Waiting ${DELAY_BETWEEN_URLS/1000}s before next URL...`, 'info');
        await sleep(DELAY_BETWEEN_URLS);
      }
    }

    // Final summary
    log('', 'info');
    log('✨ ========== PROCESS COMPLETE ========== ✨', 'success');
    log(`📈 Total processed: ${state.currentIndex}/${URLS.length}`, 'info');
    log(`✅ Successful: ${state.successCount}`, 'success');
    log(`❌ Errors: ${state.errorCount}`, 'error');
    log('', 'info');
    log('💡 Check Google Search Console for indexing status in 1-2 days', 'info');

    updateCurrentUrl('✅ Complete!');
  }

  // ===== ERROR MESSAGE FOR NON-SEARCH CONSOLE PAGES =====
  if (!window.location.href.includes('search.google.com/search-console')) {
    console.error('%c⚠️ ERROR: This script must be run from Google Search Console', 'color: #d93025; font-size: 16px; font-weight: bold;');
    console.log('%c📍 Go to: https://search.google.com/search-console', 'color: #1a73e8; font-size: 14px;');
    console.log('%c   1. Select your property (rawtools.io)', 'color: #5f6368; font-size: 12px;');
    console.log('%c   2. Paste this script again', 'color: #5f6368; font-size: 12px;');
    alert('⚠️ This script must be run from Google Search Console.\n\nGo to: https://search.google.com/search-console');
    return;
  }

  // Start the process
  run();

})();

