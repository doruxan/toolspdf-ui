# SEO Log
#
# Purpose: track weekly SEO changes to avoid duplicate topics/FAQs and keep edits small and intentional.
#
# Entries (append newest at top, following the required format):
# - Week of: YYYY-MM-DD
# - Strategy: A/B/C/D/E/F
# - Pages changed: [list slugs/paths]
# - What changed (3 bullets max)
# - Internal links added: X
# - New FAQs added: X
# - New post created: (yes/no, slug)
# - Notes for next week (1–2 lines): what NOT to repeat, what to do next

- Week of: 2026-01-01
- Strategy: E (Schema.org Compliance - Remove Fake Ratings)
- Pages changed: [All tools site-wide via lib/seo/schemas.ts]
- What changed (3 bullets max)
  - Removed fake AggregateRating schema (ratingValue: 4.8, ratingCount: 1250) from SoftwareApplication schema in generateSoftwareAppSchema function
  - Aligns with Google's guidelines against deceptive structured data and fake reviews/ratings
  - Tools now present as free software applications without misleading rating data, maintaining trust and avoiding potential search ranking penalties
- Internal links added: 0
- New FAQs added: 0
- New post created: no
- Notes for next week (1–2 lines): All tools now have clean schema markup without fake ratings. If implementing a real review system in the future, ensure it collects genuine user feedback with proper verification and displays actual rating data with review dates and user attribution.

- Week of: 2026-01-01
- Strategy: C (FAQ Schema Enhancement - Top 20 Tools)
- Pages changed: [/merge-pdf, /compress-pdf, /split-pdf, /pdf-to-jpg, /jpg-to-pdf, /json-formatter, /csv-to-json, /json-schema-validator, /iban-validator, /batch-iban-validator, /shopify-profit-calculator, /shopify-fees-calculator, /case-converter, /base64-encoder, /url-encoder, /word-counter, /password-generator, /uuid-generator, /hash-generator, /regex-tester]
- What changed (3 bullets max)
  - Added tool-specific FAQ schemas (schema.org/FAQPage) to top 20 highest-traffic tools across all categories for FAQ rich snippet eligibility in Google search results
  - Each tool now includes 6 contextual FAQs (720 words total per page) with operator-to-operator tone: technical accuracy, real-world scenarios with specific numbers, common troubleshooting issues, use case guidance, security considerations, and practical examples
  - FAQ content targets long-tail keywords and conversational search queries (e.g., "What is MOD-97 checksum?", "How long should my password be?", "Can regex validate all formats?"), improving coverage for voice search and Google featured snippets
- Internal links added: 0 (focused on FAQ-rich content)
- New FAQs added: 120 (6 FAQs × 20 tools)
- New post created: no
- Notes for next week (1–2 lines): All top 20 tools now have comprehensive FAQ schemas targeting featured snippet opportunities. Next focus: Monitor Search Console for FAQ rich snippet performance, then expand FAQ schemas to remaining 45 tools. Consider adding "People Also Ask" tracking to identify additional FAQ opportunities.

- Week of: 2026-01-01
- Strategy: C (IBAN Tools SEO Enhancement - Completed 7/7 Tools)
- Pages changed: [/iban-validator, /iban-parser, /iban-generator, /iban-country-info, /iban-check-calculator, /iban-formatter, /batch-iban-validator]
- What changed (3 bullets max)
  - Added HowTo structured data (schema.org/HowTo) to all 7 IBAN tools for rich snippet eligibility in Google search results
  - Implemented consistent 3-column grid layout (lg:grid-cols-4) with AdSidebar for better ad monetization across all IBAN tool pages
  - Added comprehensive educational content (400-600 words per page) following operator-to-operator tone: "How to Use" sections with 5-step guides, "Why Use?" sections with 6 key benefits, detailed "Features" lists, "What is [Concept]?" explanations with real-world banking scenarios and specific numbers, practical "Use Cases" for business workflows, and "Privacy & Security" assurances
- Internal links added: 0 (focused on on-page content depth)
- New FAQs added: 0 (tool-specific FAQ schemas to be added in next phase)
- New post created: no
- Notes for next week (1–2 lines): All IBAN tools now have comprehensive SEO content with HowTo schemas and consistent 3-column layout. Next focus: Add tool-specific FAQ schemas to top 20 tools across all categories for FAQ rich snippet eligibility. Consider creating IBAN workflow blog posts (e.g., "IBAN validation workflow for payment systems", "Batch IBAN processing best practices").

- Week of: 2025-12-31
- Strategy: C (Phase 1 SEO Enhancement - PDF & Shopify Tools)
- Pages changed: [All 16 PDF tools: /merge-pdf, /split-pdf, /compress-pdf, /rotate-pdf, /organize-pdf, /pdf-to-jpg, /jpg-to-pdf, /protect-pdf, /unlock-pdf, /watermark-pdf, /extract-pages, /remove-pages, /redact-pdf, /crop-pdf, /add-page-numbers, /html-to-pdf; All 8 Shopify tools: /shopify-profit-calculator, /shopify-fees-calculator, /shopify-bundle-pricing-calculator, /shopify-break-even-roas-calculator, /shopify-ltv-cac-calculator, /shopify-return-refund-impact-calculator, /shopify-invoice-generator, /shopify-speed-checklist]
- What changed (3 bullets max)
  - Added HowTo structured data (schema.org/HowTo) to all 24 tool pages (16 PDF + 8 Shopify) for rich snippet eligibility and improved search visibility
  - Implemented 3-column grid layout with AdSidebar for better ad monetization and added 400-600 words of educational content per page: "How to Use" step-by-step guides, "Why Use?" sections with 6 key benefits, "Features" with detailed capabilities, "What is [Concept]?" educational explanations with real-world scenarios, "Use Cases" for practical applications, and "Privacy & Security" assurances
  - Added Twitter Card and OpenGraph metadata (og:url, og:siteName, og:images, twitter:card, twitter:images) to all tools for rich social media link previews on platforms like Twitter/X, LinkedIn, Facebook, Slack, WhatsApp, Teams, and Discord
- Internal links added: 0 (focused on on-page content depth)
- New FAQs added: 0 (category-level FAQs already present in config)
- New post created: no
- Notes for next week (1–2 lines): All JSON, String, PDF, and Shopify tools now have comprehensive SEO content with HowTo schemas and social metadata. Next focus: Create blog posts for high-value PDF and Shopify workflows (e.g., "PDF merge best practices for legal docs", "How to calculate Shopify profitability", "ROAS optimization strategies"). Consider IBAN tools SEO enhancement if needed.

- Week of: 2025-12-31
- Strategy: C (Enhanced existing tools with educational SEO content)
- Pages changed: [All JSON tools: /csv-to-json, /excel-to-json, /json-formatter, /json-minifier, /json-validator, /json-mapper, /json-diff, /json-schema-validator, /json-to-csv; All 25 String tools: /case-converter, /word-counter, /character-counter, /base64-encoder, /url-encoder, /html-entity-encoder, /hash-generator, /regex-tester, /find-replace, /line-sorter, /duplicate-remover, /text-diff, /emoji-extractor, /lorem-ipsum-generator, /uuid-generator, /password-generator, /slug-generator, /jwt-decoder, /binary-converter, /markdown-to-html, /html-to-text, /string-reverser, /whitespace-remover, /remove-accents, /bracket-matcher]
- What changed (3 bullets max)
  - Added HowTo structured data (schema.org/HowTo) to all 34 tool pages (9 JSON + 25 String) for rich snippet eligibility in Google search results
  - Added comprehensive educational sections to each tool page: "How to" step-by-step guides, "Features" sections with 6 key capabilities, "Why use this tool?" explanations with real-world examples and scenarios, use case lists
  - Increased average content per tool page from ~100 words to 400-600 words with practical operator-to-operator explanations, no hype language, all while maintaining mobile-first responsive design
- Internal links added: 0 (focused on on-page content depth)
- New FAQs added: 0 (category-level FAQs already present in config)
- New post created: no
- Notes for next week (1–2 lines): All JSON and String tools now have rich educational content. Next focus: Create blog posts linking workflows (e.g., "CSV to JSON to Shopify Import", "Regex patterns for data validation", "JWT debugging workflow"). Consider adding more cross-tool workflow guides.

- Week of: 2025-12-31
- Strategy: A (New category addition - String Tools)
- Pages changed: [/, /case-converter, /word-counter, /base64-encoder, /url-encoder, /hash-generator, /lorem-ipsum-generator, /find-replace, /line-sorter, /duplicate-remover, /uuid-generator, /password-generator, /slug-generator, /jwt-decoder, /html-entity-encoder, /text-diff, /regex-tester, /string-reverser, /whitespace-remover, /binary-converter, /remove-accents, /markdown-to-html, /html-to-text, /character-counter, /bracket-matcher, /emoji-extractor, /string-tools, layout.tsx, Hero.tsx, Footer.tsx, schemas.ts, config/tools.ts]
- What changed (3 bullets max)
  - Added complete String Tools category with 25 production-grade tools: case converter (12 formats), base64/URL encoders, hash generator (MD5/SHA-256/SHA-512), regex tester, JWT decoder, text diff, and 18 more
  - Updated all global SEO metadata to reflect 65+ total tools (16 PDF + 9 JSON + 7 IBAN + 8 Shopify + 25 String), including homepage, hero, footer, organization schema
  - All tools use lazy-loaded libraries (crypto-js, diff-match-patch, marked) to maintain blazing-fast page load speeds (~90KB total bundle split across 3 tools)
- Internal links added: 25 (footer navigation column)
- New FAQs added: 4 (string tools category)
- New post created: no
- Notes for next week (1–2 lines): Create String-focused blog posts for developer workflows (regex patterns library, JWT debugging guide, base64 encoding use cases). Consider cross-linking string tools with JSON tools for data transformation workflows.

- Week of: 2025-12-26
- Strategy: F
- Pages changed: [rawtools/lib/blog/posts.ts, rawtools/app/blog/page.tsx, /blog/json-schema-validation-how-to-catch-bad-api-payloads, /blog/how-to-diff-two-json-files-and-see-what-changed, /blog/jsonpath-in-practice-query-json-with-jsonpath]
- What changed (3 bullets max)
  - Added 3 JSON-focused blog posts targeting schema validation, JSON diffs, and JSONPath querying
  - Each post links to the relevant JSON tool and related utilities (formatter/minifier/escape/mapper/converters) to form an internal “JSON workflows” cluster
  - Updated blog index metadata to include JSON guides for better topical coverage
- Internal links added: 34
- New FAQs added: 21
- New post created: yes, json-schema-validation-how-to-catch-bad-api-payloads; how-to-diff-two-json-files-and-see-what-changed; jsonpath-in-practice-query-json-with-jsonpath
- Notes for next week (1–2 lines): Don’t repeat JSON schema/diff/JSONPath angles; next JSON angles could be “CSV to JSON for Shopify exports” or “safe JSON escaping for logging/config”.

- Week of: 2025-12-30
- Strategy: F
- Pages changed: [rawtools/lib/blog/posts.ts, rawtools/app/blog/[slug]/page.tsx, /blog/how-to-remove-pages-from-a-pdf-without-breaking-the-rest]
- What changed (3 bullets max)
  - Added a new PDF post focused on removing pages safely (delete vs extract) with a concrete 42-page scenario and a clear operator workflow
  - Linked to /remove-pages as the primary CTA and cross-linked to /extract-pages, /split-pdf, /redact-pdf, and /unlock-pdf for workflow adjacency
  - Added canonical metadata for blog post pages to reduce duplicate URL signals
- Internal links added: 5
- New FAQs added: 5
- New post created: yes, how-to-remove-pages-from-a-pdf-without-breaking-the-rest
- Notes for next week (1–2 lines): Don’t repeat “remove pages” angle; next PDF angles could be “extract pages for compliance packets” or “protect vs redact for sharing”.

# - Week of: 2025-12-26
# - Strategy: A (New category addition)
# - Pages changed: [/, /csv-to-json, /excel-to-json, /json-formatter, /json-minifier, /json-mapper, /json-schema-validator, /json-diff, /json-escape, /json-query, layout.tsx, Hero.tsx, Footer.tsx, schemas.ts, config/blog.ts]
# - What changed (3 bullets max)
#   - Added complete JSON tools category with 9 production-grade tools: CSV/Excel converters, formatter, minifier, mapper, schema validator, diff, escape/unescape, and JSONPath query
#   - Updated all global SEO metadata to reflect 40 total tools (16 PDF + 9 JSON + 7 IBAN + 8 Shopify)
#   - Added JSON tools column to footer navigation, updated hero description, organization schema, and collection schema
# - Internal links added: 9 (footer)
# - New FAQs added: 0
# - New post created: no
# - Notes for next week (1–2 lines): Create JSON-focused blog posts for key use cases (CSV import/export, API data parsing, JSON validation best practices). Consider adding "data transformation" category or merging with existing tools.

# - Week of: 2025-12-25
# - Strategy: D
# - Pages changed: [rawtools/lib/blog/posts.ts, /blog/iban-vs-swift-bic-vs-account-number-what-you-need-for-international-transfers, /blog/how-to-parse-an-iban-extract-bank-code-branch-and-account-number, /blog/iban-check-digits-mod-97-explained-what-it-detects-and-how-to-fix-failures]
# - What changed (3 bullets max)
#   - Added 3 IBAN-focused blog posts: identifiers (IBAN vs SWIFT/BIC), parsing components, and MOD-97 check digits troubleshooting
#   - Added internal links to relevant IBAN tools across the posts (/iban-validator, /iban-parser, /iban-country-info, /iban-formatter, /batch-iban-validator, /iban-check-calculator)
#   - Created initial SEO log + inventory list to prevent duplicate topics
# - Internal links added: 14
# - New FAQs added: 19
# - New post created: yes, iban-vs-swift-bic-vs-account-number-what-you-need-for-international-transfers; how-to-parse-an-iban-extract-bank-code-branch-and-account-number; iban-check-digits-mod-97-explained-what-it-detects-and-how-to-fix-failures
# - Notes for next week (1–2 lines): Don’t repeat IBAN identifiers/parsing/checksum angles; next IBAN angles could be batch validation workflows or formatting rules.

# Existing blog posts inventory (as of 2025-12-25):
# - how-shopify-stores-actually-calculate-profit
# - how-to-create-shopify-invoices-that-look-professional
# - shopify-fees-explained-what-shopify-actually-takes-per-sale
# - ltv-cac-for-shopify-what-to-model-before-you-scale-ads
# - shopify-bundle-pricing-how-to-price-multipacks-without-killing-margin
# - break-even-roas-shopify-how-to-set-real-roas-targets
# - returns-and-refunds-shopify-how-to-model-the-real-profit-impact
# - shopify-store-name-how-to-pick-a-name-you-wont-regret
# - shopify-product-descriptions-how-to-write-ones-that-convert-without-hype
# - shopify-speed-checklist-what-to-fix-before-you-buy-another-app
# - shopify-theme-detector-what-you-can-and-cant-detect
# - how-to-merge-pdf-files-free-2025
# - how-to-compress-pdf-files-free-secure


