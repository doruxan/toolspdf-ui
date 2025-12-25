import { BLOG_POSTS as SHOPIFY_POSTS } from '@/content/blog/shopify-posts';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string; // Full HTML content for detailed posts
  date: string;
  author: string;
  readingTime?: string;
  keywords?: string[];
  category: 'pdf' | 'ecommerce' | 'productivity';
  image?: string;
  relatedToolHref?: string;
}

// Convert Shopify blog post sections to HTML
function convertShopifyPostToHTML(sections: Array<{ heading: string; paragraphs: string[] }>): string {
  let html = '';
  for (const section of sections) {
    html += `<h2>${section.heading}</h2>\n`;
    for (const paragraph of section.paragraphs) {
      html += `<p>${paragraph}</p>\n`;
    }
  }
  return html;
}

// Convert Shopify posts to BlogPost format
const shopifyBlogPosts: BlogPost[] = SHOPIFY_POSTS.map(post => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.description,
  content: convertShopifyPostToHTML(post.sections),
  date: post.datePublished,
  author: 'RawTools Team',
  readingTime: '8 min',
  keywords: [post.primaryKeyword],
  category: 'ecommerce' as const,
  relatedToolHref: post.relatedToolHref,
}));

// PDF blog posts with full content
const pdfBlogPosts: BlogPost[] = [
  {
    slug: 'how-to-merge-pdf-files-free-2025',
    title: 'How to Merge PDF Files for Free in 2025 (No Watermarks)',
    excerpt: 'Learn the easiest way to combine multiple PDF files into one document without downloading software or paying for expensive subscriptions.',
    date: '2025-01-15',
    author: 'RawTools Team',
    readingTime: '5 min',
    keywords: ['merge pdf', 'combine pdf', 'free pdf merger', 'how to merge pdfs'],
    category: 'pdf',
    content: `
      <h2>Why Merge PDF Files?</h2>
      <p>Merging PDF files is one of the most common tasks for students, professionals, and anyone dealing with digital documents. Whether you're combining invoices for your accountant, putting together a portfolio, or merging chapters of a thesis, having a single, organized file is always better than sending multiple attachments.</p>
      
      <h3>Common Scenarios:</h3>
      <ul>
        <li><strong>Business:</strong> Combining monthly invoices into a single expense report.</li>
        <li><strong>Education:</strong> Merging group project parts into one final submission.</li>
        <li><strong>Personal:</strong> Putting all your travel tickets and bookings into one itinerary PDF.</li>
      </ul>

      <h2>The Problem with Most "Free" Tools</h2>
      <p>If you've searched for "merge pdf online," you've probably encountered these frustrations:</p>
      <ul>
        <li><strong>Hidden Fees:</strong> You upload your files, but can't download the result without paying.</li>
        <li><strong>Watermarks:</strong> Your professional document gets stamped with a giant ugly logo.</li>
        <li><strong>File Limits:</strong> You can only merge 2 files or have a strict size limit.</li>
        <li><strong>Privacy Risks:</strong> Your sensitive documents are uploaded to unknown servers.</li>
      </ul>

      <h2>The Solution: Client-Side Merging</h2>
      <p>Our <a href="/merge-pdf">Merge PDF tool</a> solves all these problems by processing your files <strong>directly in your browser</strong>. This means:</p>
      <ul>
        <li>✅ Your files <strong>never</strong> leave your device.</li>
        <li>✅ It's 100% free with no hidden costs.</li>
        <li>✅ There are no watermarks added.</li>
        <li>✅ It's lightning fast because there's no uploading or downloading.</li>
      </ul>

      <h2>Step-by-Step Guide to Merging PDFs</h2>
      <ol>
        <li>Go to the <a href="/merge-pdf">Merge PDF tool</a>.</li>
        <li><strong>Drag and drop</strong> your PDF files into the upload area.</li>
        <li><strong>Reorder</strong> the files if needed by dragging them.</li>
        <li>Click the <strong>"Merge PDF Files"</strong> button.</li>
        <li><strong>Instantly</strong> download your combined PDF.</li>
      </ol>

      <h2>Tips for Successful Merging</h2>
      <ul>
        <li><strong>Order Matters:</strong> Make sure you select your files in the order you want them to appear in the final document.</li>
        <li><strong>Check File Sizes:</strong> While our tool handles large files well, extremely massive PDFs might require more memory from your browser.</li>
        <li><strong>Secure Your Documents:</strong> After merging, consider using our <a href="/protect-pdf">Protect PDF tool</a> if the document contains sensitive information.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Merging PDFs doesn't have to be complicated, expensive, or risky. With modern web technologies, you can combine documents securely and for free right from your browser.</p>
      <p><strong>Ready to organize your files?</strong> <a href="/merge-pdf">Try the Merge PDF tool now!</a></p>
    `,
    relatedToolHref: '/merge-pdf',
  },
  {
    slug: 'how-to-compress-pdf-files-free-secure',
    title: 'How to Compress PDF Files for Email & Uploads (Free & Secure)',
    excerpt: 'File too large to send? Learn how to reduce PDF file size efficiently without losing quality. Perfect for email attachments and portal uploads.',
    date: '2025-01-28',
    author: 'RawTools Team',
    readingTime: '5 min',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'pdf compressor free', 'smaller pdf'],
    category: 'pdf',
    content: `
      <h2>The "File Too Large" Nightmare</h2>
      <p>We've all seen it: you try to send an important email or upload an application form, and you get the dreaded error message: <strong>"File size exceeds the limit."</strong> Email providers often cap attachments at 25MB, and government or job portals can be even stricter, sometimes limiting uploads to just 2MB or 5MB.</p>
      
      <h2>Why Are PDFs So Big?</h2>
      <p>PDFs can become bloated for several reasons:</p>
      <ul>
        <li><strong>High-Resolution Images:</strong> Scanned documents or photos are the usual suspects.</li>
        <li><strong>Embedded Fonts:</strong> Storing every character style takes up space.</li>
        <li><strong>Hidden Metadata:</strong> Information you don't see but that adds weight.</li>
      </ul>

      <h2>How Compression Works</h2>
      <p>PDF compression works by optimizing these elements. It might slightly lower the resolution of images (often imperceptibly to the human eye), remove redundant data, and simplify internal structures. The goal is to get the <strong>smallest file size with the best possible quality</strong>.</p>

      <h2>The Secure Way to Shrink Your PDF</h2>
      <p>Many online compressors ask you to upload your sensitive documents to their servers. With our <a href="/compress-pdf">Compress PDF tool</a>, you don't have to take that risk.</p>
      
      <h3>Step-by-Step Guide:</h3>
      <ol>
        <li>Navigate to the <a href="/compress-pdf">Compress PDF tool</a>.</li>
        <li>Select or drag-and-drop your oversized PDF file.</li>
        <li>Our smart engine will analyze the file and apply compression algorithms directly in your browser.</li>
        <li><strong>Instantly</strong> download your optimized, lighter PDF.</li>
      </ol>

      <h2>Why Use Our Compressor?</h2>
      <ul>
        <li><strong>100% Private:</strong> Files never leave your device.</li>
        <li><strong>No Quality Loss:</strong> We use smart compression to keep text sharp.</li>
        <li><strong>Unlimited:</strong> Compress as many files as you need, for free.</li>
        <li><strong>Fast:</strong> No upload/download wait times.</li>
      </ul>

      <h2>Common Use Cases</h2>
      <ul>
        <li><strong>Email Attachments:</strong> Fit more documents into a single email.</li>
        <li><strong>Job Applications:</strong> Meet strict upload limits for resumes and portfolios.</li>
        <li><strong>Storage Space:</strong> Save space on your hard drive or cloud storage.</li>
        <li><strong>Faster Loading:</strong> Smaller PDFs load faster for web viewing.</li>
      </ul>

      <p>Don't let file size limits slow you down. <a href="/compress-pdf">Shrink your PDF now</a> and send it on its way!</p>
    `,
    relatedToolHref: '/compress-pdf',
  },
  {
    slug: 'iban-vs-swift-bic-vs-account-number-what-you-need-for-international-transfers',
    title: 'IBAN vs SWIFT/BIC vs account number: what you actually need for an international transfer',
    excerpt:
      'A practical guide to the three banking identifiers people mix up. Learn when you need an IBAN, when you need a SWIFT/BIC, and what “account number” means across countries.',
    date: '2025-12-25',
    author: 'RawTools Team',
    readingTime: '9 min',
    keywords: ['iban vs swift', 'swift bic', 'international transfer details', 'what is an iban'],
    category: 'productivity',
    content: `
      <h2>The short answer</h2>
      <p>Most of the time, you need <strong>either</strong> an IBAN (common across Europe and many other countries) <strong>or</strong> a local account number + routing details (common in the US and some other regions). You may also need a <strong>SWIFT/BIC</strong> when the payment goes through the international SWIFT network (especially for cross-border wires).</p>
      <p>If you’re stuck, the right question isn’t “Which one is correct?” It’s: <strong>Which payment rail are you using?</strong> SEPA credit transfer, domestic transfer, or international wire.</p>

      <h2>What an IBAN is (and what it isn’t)</h2>
      <p>An <strong>IBAN</strong> (International Bank Account Number) is a standardized identifier that includes a country code, check digits, and a country-specific account structure. It’s designed to reduce errors in cross-border payments by making the destination account unambiguous.</p>
      <p>Important: an IBAN is not “a bank code.” It contains bank and branch identifiers in many countries, but it’s ultimately an <em>account identifier</em> that’s safe to copy/paste and validate.</p>
      <p>If you have an IBAN and it passes checksum validation, you’ve eliminated most transcription mistakes. It still does <em>not</em> prove the account exists or belongs to a specific person—only that the number is structurally valid.</p>

      <h2>What a SWIFT/BIC is (and why banks ask for it)</h2>
      <p>A <strong>SWIFT/BIC</strong> (Bank Identifier Code) identifies a bank (and sometimes a branch) in the SWIFT network. Think of it as a “bank address” used for routing, not an account number.</p>
      <p>Many international wires require a SWIFT/BIC because the sending bank needs to know which institution to route through. In some cases, intermediaries are involved, and the SWIFT/BIC helps define the path.</p>
      <p>Common confusion: people assume SWIFT replaces IBAN. In reality, for many destinations you need <strong>both</strong>: IBAN for the beneficiary account + SWIFT/BIC for the beneficiary bank.</p>

      <h2>What “account number” means (and why it varies)</h2>
      <p>“Account number” is a generic label. In some countries it’s a simple numeric string. In others it includes check digits, bank identifiers, or branch codes. In the US, for example, payments often require <strong>account number + routing number</strong> (ACH) rather than an IBAN.</p>
      <p>This is why forms can feel inconsistent: a “bank transfer” form might ask for “account number” for domestic rails, but ask for “IBAN” for international destinations.</p>

      <h2>Which one do you need? Use the payment-rail rule</h2>
      <h3>1) SEPA transfer (EUR within SEPA)</h3>
      <p>For SEPA credit transfers, you typically need:</p>
      <ul>
        <li><strong>IBAN</strong> (required)</li>
        <li><strong>BIC/SWIFT</strong> (sometimes optional; depends on bank and corridor)</li>
      </ul>
      <p>SEPA is designed to make cross-border EUR payments feel domestic. If the recipient is in a SEPA country and you’re sending EUR, IBAN is the key field that must be correct.</p>

      <h3>2) International wire (non-SEPA or cross-currency)</h3>
      <p>For international wires, you commonly need:</p>
      <ul>
        <li><strong>SWIFT/BIC</strong> (beneficiary bank)</li>
        <li><strong>IBAN</strong> (if the destination country uses IBAN)</li>
        <li><strong>Account number + bank/branch details</strong> (if the destination does not use IBAN)</li>
      </ul>
      <p>When in doubt, assume SWIFT/BIC is required for true international wires, and the beneficiary account identifier depends on the destination country.</p>

      <h3>3) Domestic transfer</h3>
      <p>Domestic rails vary widely. Examples:</p>
      <ul>
        <li><strong>US (ACH)</strong>: routing number + account number</li>
        <li><strong>UK</strong>: sort code + account number (or IBAN for international)</li>
        <li><strong>Many EU countries</strong>: IBAN is commonly used even for domestic</li>
      </ul>
      <p>Domestic transfer forms usually won’t ask for SWIFT unless the payment is routed internationally.</p>

      <h2>Common mistakes that cause failed payments</h2>
      <ul>
        <li><strong>Mixing rails:</strong> entering an IBAN into a form that expects a domestic account number (or vice versa).</li>
        <li><strong>Copying spaces/hidden characters:</strong> some systems reject IBANs with unusual whitespace. (Good systems normalize it, but not all do.)</li>
        <li><strong>Using the wrong SWIFT/BIC:</strong> some banks have multiple BICs by region or branch.</li>
        <li><strong>Ignoring country-specific length:</strong> “looks right” is not validation—each country has a fixed IBAN length.</li>
        <li><strong>Assuming validity means ownership:</strong> IBAN checksum can pass even if the account is closed or not owned by the intended recipient.</li>
      </ul>

      <h2>A quick workflow before you send money</h2>
      <ol>
        <li><strong>Validate the IBAN</strong> before you submit the payment form.</li>
        <li><strong>Parse it</strong> if you need to double-check bank/branch identifiers.</li>
        <li><strong>Look up the country rules</strong> if the IBAN seems unusual (length/grouping differs by country).</li>
      </ol>
      <p>Use these tools to do that quickly:</p>
      <ul>
        <li><a href="/iban-validator">IBAN Validator</a> (checksum + country format)</li>
        <li><a href="/iban-parser">IBAN Parser</a> (extract bank/branch/account components)</li>
        <li><a href="/iban-country-info">IBAN Country Lookup</a> (formats, examples, SEPA indicator)</li>
      </ul>

      <h2>FAQs</h2>
      <h3>Do I always need a SWIFT/BIC if I have an IBAN?</h3>
      <p>No. Some SEPA transfers only require IBAN, and some banks can route without asking for BIC. For international wires, SWIFT/BIC is commonly required even when IBAN is provided.</p>

      <h3>Can an IBAN be valid but still fail a transfer?</h3>
      <p>Yes. Validation checks structure and checksum, not whether the account exists, is open, or matches the recipient name. Transfers can also fail due to compliance checks, currency corridor restrictions, or incorrect bank routing details.</p>

      <h3>Is SWIFT the same as BIC?</h3>
      <p>People use the terms interchangeably. BIC is the code format; SWIFT is the network that issues and routes using those codes. Forms may label the field as SWIFT, BIC, or SWIFT/BIC.</p>

      <h3>Why do some forms ask for “IBAN” and “account number”?</h3>
      <p>Because the form supports multiple destination types. If the destination country uses IBAN, that’s typically the account identifier. If it doesn’t, the form falls back to domestic account number + routing details.</p>

      <h3>Should I store IBANs with spaces?</h3>
      <p>For storage, electronic format (no spaces) is the safest. For display to humans, spaced/grouped format is easier to read. If you need to convert, use the <a href="/iban-formatter">IBAN Formatter</a>.</p>

      <h3>What’s the fastest way to check if an IBAN is correct?</h3>
      <p>Run it through the <a href="/iban-validator">IBAN Validator</a>. It checks country length, allowed characters, country format, and the MOD-97 checksum.</p>

      <h3>Does IBAN validation tell me which bank it is?</h3>
      <p>Not reliably as a “bank name.” Many countries embed a bank identifier inside the IBAN, which you can extract with the <a href="/iban-parser">IBAN Parser</a>, but mapping that identifier to a bank name is a separate dataset and may not be universal.</p>
    `,
    relatedToolHref: '/iban-validator',
  },
  {
    slug: 'how-to-parse-an-iban-extract-bank-code-branch-and-account-number',
    title: 'How to parse an IBAN: extracting bank code, branch code, and account number (country-by-country caveats)',
    excerpt:
      'A practical guide to breaking an IBAN into components. Learn what’s reliably extractable, what varies by country, and how to avoid common parsing mistakes.',
    date: '2025-12-25',
    author: 'RawTools Team',
    readingTime: '10 min',
    keywords: ['iban parser', 'extract bank code from iban', 'iban components', 'parse iban'],
    category: 'productivity',
    content: `
      <h2>Parsing an IBAN is straightforward, but not universal</h2>
      <p>An IBAN has a standard high-level structure: <strong>country code (2 letters)</strong>, <strong>check digits (2 digits)</strong>, then a country-specific BBAN (basic bank account number) structure. The tricky part is the BBAN: the meaning and positions of “bank code,” “branch code,” and “account number” depend on the country.</p>
      <p>So the reliable workflow is:</p>
      <ol>
        <li>Normalize the IBAN (remove spaces, uppercase).</li>
        <li>Validate country + length + checksum (MOD-97).</li>
        <li>Use country metadata to slice the BBAN into its components.</li>
      </ol>

      <h2>Step 1: Normalize before you do anything</h2>
      <p>Users paste IBANs with spaces, line breaks, or odd whitespace. Normalize by removing whitespace and uppercasing before validation or parsing. This avoids “false invalid” issues in systems that don’t normalize correctly.</p>

      <h2>Step 2: Validate first (or your parsing can mislead you)</h2>
      <p>IBAN parsing should happen after validation. If the IBAN is the wrong length for the country, or the checksum fails, any extracted “bank code” is just a substring with no guarantee it was intended to be that value.</p>
      <p>Use the <a href="/iban-validator">IBAN Validator</a> to check the number before you rely on parsed components.</p>

      <h2>Step 3: Understand the three common component types</h2>
      <h3>Country code + check digits</h3>
      <p>These are always present and always in the same positions:</p>
      <ul>
        <li><strong>Country code</strong>: characters 1–2</li>
        <li><strong>Check digits</strong>: characters 3–4 (MOD-97)</li>
      </ul>

      <h3>Bank identifier</h3>
      <p>Many countries embed a bank identifier inside the BBAN. The <em>position</em> and <em>length</em> are country-specific. Sometimes it’s all digits; sometimes it can include letters.</p>

      <h3>Branch identifier</h3>
      <p>Some countries include a branch identifier in addition to the bank identifier. Others do not. Don’t assume it exists. When it does exist, it’s also defined by country-specific positions.</p>

      <h3>Account number (or the remainder)</h3>
      <p>After bank and branch identifiers, the remainder is typically the account identifier. But again: some countries include internal check digits or sub-fields. “Account number” can be an oversimplification.</p>

      <h2>A concrete example: Germany vs UK vs France</h2>
      <p>These examples show why you can’t use a single global slicing rule.</p>
      <ul>
        <li><strong>Germany (DE)</strong>: bank identifier is an 8-digit bank code (BLZ), then a 10-digit account number.</li>
        <li><strong>United Kingdom (GB)</strong>: bank identifier is 4 letters (bank), branch identifier is 6 digits (sort code), then an 8-digit account number.</li>
        <li><strong>France (FR)</strong>: bank identifier + branch identifier are numeric (5+5), but the account part can be alphanumeric and includes a local RIB key.</li>
      </ul>
      <p>If you need to sanity-check the country rules quickly, use <a href="/iban-country-info">IBAN Country Lookup</a> and compare the expected length and BBAN format.</p>

      <h2>What you can and can’t reliably extract</h2>
      <h3>Reliable</h3>
      <ul>
        <li>Country code</li>
        <li>Check digits</li>
        <li>BBAN substring</li>
        <li>Bank/branch identifiers <em>when</em> the country spec defines them</li>
      </ul>

      <h3>Not reliable without another dataset</h3>
      <ul>
        <li><strong>Bank name</strong> from bank identifier (requires a mapping table per country)</li>
        <li><strong>Account owner</strong> or existence (validation doesn’t prove ownership)</li>
        <li><strong>Whether the account can receive certain transfer types</strong> (depends on bank and compliance rules)</li>
      </ul>

      <h2>Common parsing mistakes (and how to avoid them)</h2>
      <ul>
        <li><strong>Skipping validation:</strong> parse only after country + length + checksum checks.</li>
        <li><strong>Hardcoding positions:</strong> use per-country specs, not one slicing rule.</li>
        <li><strong>Assuming “account number” is numeric:</strong> some countries have alphanumeric account parts.</li>
        <li><strong>Confusing display formatting with structure:</strong> spaces are for readability; they don’t define fields.</li>
      </ul>

      <h2>A practical workflow for teams cleaning banking data</h2>
      <ol>
        <li>Validate IBANs and flag failures (<a href="/batch-iban-validator">Batch IBAN Validator</a>).</li>
        <li>For valid IBANs, parse components (<a href="/iban-parser">IBAN Parser</a>).</li>
        <li>If you need consistent display or storage formats, normalize formatting (<a href="/iban-formatter">IBAN Formatter</a>).</li>
      </ol>

      <h2>FAQs</h2>
      <h3>Can I extract a bank name from an IBAN?</h3>
      <p>Not directly. You can extract a bank identifier for many countries, but turning that into a bank name requires a country-specific mapping dataset.</p>

      <h3>Why does my parsed “bank code” look different from what the bank shows?</h3>
      <p>Banks often display local routing details differently (with separators or different naming). IBAN parsing is based on country registry specs, not bank UI conventions.</p>

      <h3>Do all IBAN countries include branch codes?</h3>
      <p>No. Some include branch identifiers; others don’t. Always check the country’s BBAN format before assuming a branch field exists.</p>

      <h3>Is the BBAN the same as the account number?</h3>
      <p>No. BBAN is the entire country-specific part after the first 4 IBAN characters. It often includes bank/branch identifiers plus the account portion.</p>

      <h3>Should I parse before storing IBANs?</h3>
      <p>Store the normalized IBAN first (electronic format). Parse on demand for display or downstream logic. If you need formatting conversions, use <a href="/iban-formatter">IBAN Formatter</a>.</p>

      <h3>What’s the safest first check before parsing?</h3>
      <p>Run the IBAN through <a href="/iban-validator">IBAN Validator</a> to ensure the country length and MOD-97 checksum are correct.</p>
    `,
    relatedToolHref: '/iban-parser',
  },
  {
    slug: 'iban-check-digits-mod-97-explained-what-it-detects-and-how-to-fix-failures',
    title: 'IBAN check digits explained (MOD-97): what it detects, what it can’t, and how to troubleshoot failures',
    excerpt:
      'MOD-97 is the checksum behind IBAN validation. Learn how it works, why it catches most typos, and how to diagnose common “invalid IBAN” cases.',
    date: '2025-12-25',
    author: 'RawTools Team',
    readingTime: '9 min',
    keywords: ['iban check digits', 'mod 97', 'iban checksum', 'validate iban checksum'],
    category: 'productivity',
    content: `
      <h2>What IBAN check digits are doing</h2>
      <p>An IBAN includes two check digits (characters 3–4) that are calculated using the <strong>MOD-97</strong> algorithm. Their job is simple: detect accidental errors like mistyped characters, swapped digits, or copy/paste mistakes.</p>
      <p>If a system says “invalid IBAN,” the most common cause is that the checksum doesn’t match the rest of the characters.</p>

      <h2>MOD-97 in plain language</h2>
      <p>At a high level, the IBAN is transformed into a very large number. If that number mod 97 equals 1, the IBAN passes checksum validation.</p>
      <p>The transformation has three key steps:</p>
      <ol>
        <li>Move the first 4 characters to the end.</li>
        <li>Convert letters A–Z into numbers 10–35.</li>
        <li>Compute the remainder when dividing by 97.</li>
      </ol>

      <h2>Why it catches most mistakes</h2>
      <p>Checksums are designed for error detection, not security. MOD-97 is strong against common data entry errors, including:</p>
      <ul>
        <li>Single-character errors (one wrong digit/letter)</li>
        <li>Many adjacent transpositions (swapping two neighbors)</li>
        <li>Common copy/paste corruption (extra whitespace isn’t a problem if normalized)</li>
      </ul>
      <p>It does <strong>not</strong> prove the account exists, is open, or belongs to the intended recipient. It only proves internal consistency.</p>

      <h2>How check digits are calculated (the “98 minus remainder” rule)</h2>
      <p>To calculate check digits for a country + BBAN:</p>
      <ol>
        <li>Start with: COUNTRY + <strong>00</strong> + BBAN</li>
        <li>Rearrange + letter-to-number conversion</li>
        <li>Compute remainder = mod 97</li>
        <li>Check digits = <strong>98 - remainder</strong> (left-pad to 2 digits)</li>
      </ol>
      <p>This is why you’ll sometimes see “check digits are 98 - (mod 97)” in specs.</p>

      <h2>Troubleshooting: why a checksum might fail</h2>
      <h3>1) Wrong country code (or copied from a template)</h3>
      <p>If the first two letters are wrong, the entire checksum changes. This happens when someone copies a sample IBAN and only edits the “account number” portion.</p>

      <h3>2) Wrong length for the country</h3>
      <p>Each IBAN country has a fixed length. If the length is wrong, the IBAN is invalid even before checksum. Use <a href="/iban-country-info">IBAN Country Lookup</a> to confirm the expected length.</p>

      <h3>3) Letter O vs number 0 (and similar lookalikes)</h3>
      <p>Some characters are easy to confuse. O/0 and I/1 are common. A checksum failure is often your first signal that one character is wrong.</p>

      <h3>4) Mixed whitespace / hidden characters</h3>
      <p>Most validators normalize whitespace, but not all payment forms do. If one system accepts the IBAN and another rejects it, try electronic format (no spaces) via <a href="/iban-formatter">IBAN Formatter</a>.</p>

      <h2>How to fix a failing IBAN (without guessing)</h2>
      <ol>
        <li>Run it through <a href="/iban-validator">IBAN Validator</a> to see whether the issue is length, format, or checksum.</li>
        <li>If you trust the BBAN portion and country code, use <a href="/iban-check-calculator">Check Digit Calculator</a> to compute the expected check digits and compare.</li>
        <li>If you need to sanity-check which substring is “bank/branch/account,” use <a href="/iban-parser">IBAN Parser</a> (but only after validation).</li>
      </ol>

      <h2>What MOD-97 can’t protect you from</h2>
      <ul>
        <li><strong>Valid-but-wrong account:</strong> you can change multiple characters and still produce a valid checksum if you also change the check digits accordingly.</li>
        <li><strong>Fraud/social engineering:</strong> checksums don’t validate the recipient identity.</li>
        <li><strong>Policy/compliance blocks:</strong> banks may reject transfers for reasons unrelated to the IBAN.</li>
      </ul>

      <h2>FAQs</h2>
      <h3>Does MOD-97 guarantee the IBAN is real?</h3>
      <p>No. It guarantees the IBAN is internally consistent. It doesn’t verify account existence or ownership.</p>

      <h3>Why is “mod 97 = 1” the rule?</h3>
      <p>That’s the ISO 13616 specification. The check digits are chosen so that the transformed numeric representation yields a remainder of 1 when divided by 97.</p>

      <h3>Can two different IBANs both be valid?</h3>
      <p>Yes. Many different values can be valid; validity is about structure and checksum, not uniqueness or ownership.</p>

      <h3>What’s the fastest way to calculate check digits?</h3>
      <p>Use the <a href="/iban-check-calculator">Check Digit Calculator</a>. It calculates the correct digits from the country + BBAN and can show the steps.</p>

      <h3>Why does my bank app accept an IBAN but a form rejects it?</h3>
      <p>Often it’s formatting. Some forms don’t normalize whitespace or expect uppercase. Convert to electronic format with <a href="/iban-formatter">IBAN Formatter</a>.</p>

      <h3>Do I need to validate IBANs before saving them?</h3>
      <p>If the IBAN is used for payments, yes—validate at entry time to catch typos. Store the normalized value (no spaces) and display a formatted version for humans.</p>
    `,
    relatedToolHref: '/iban-check-calculator',
  },
];

// Merged blog posts from both projects
export const blogPosts: BlogPost[] = [
  ...shopifyBlogPosts,
  ...pdfBlogPosts,
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Alias for backwards compatibility
export const getBlogPost = getBlogPostBySlug;

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}
