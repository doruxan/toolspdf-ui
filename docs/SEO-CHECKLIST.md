# SEO Implementation Checklist
**Print this and check off as you go** ✓

---

## 📋 Pre-Launch Checklist

### Foundation Files
- [ ] `config/tools.ts` - Single source of truth created
- [ ] `lib/seo/schemas.ts` - All schema generators implemented
- [ ] `lib/seo/metadata.ts` - Metadata helpers created
- [ ] `app/sitemap.ts` - Dynamic sitemap configured
- [ ] `app/robots.ts` - Robots file configured
- [ ] `app/layout.tsx` - Global metadata set
- [ ] Route groups set up for flat URLs

### Every Tool Page Has:
- [ ] `generateMetadata()` function
- [ ] Unique title (50-60 chars)
- [ ] Unique description (150-160 chars)
- [ ] Canonical URL
- [ ] OpenGraph metadata
- [ ] Twitter Card metadata
- [ ] SoftwareApplication schema
- [ ] HowTo schema (4 steps)
- [ ] Breadcrumb schema
- [ ] 400-600 words content
- [ ] H1 (tool name)
- [ ] H2: "How to Use"
- [ ] H2: "Features" (4-6 features as H3s)
- [ ] H2: "Why Use This Tool?" (3-4 benefits as H3s)
- [ ] H2: "Common Use Cases" (4-6 examples)
- [ ] H2: "Privacy & Security" (if relevant)
- [ ] H2: "Related Tools" (3-5 links)
- [ ] Real-world examples with numbers
- [ ] Descriptive anchor text for links

### Every Category Page Has:
- [ ] `generateMetadata()` function
- [ ] CollectionPage schema
- [ ] FAQPage schema (3-5 FAQs)
- [ ] Breadcrumb schema
- [ ] Tool grid/list
- [ ] Category description (100+ words)

### Every Blog Post Has:
- [ ] `generateMetadata()` function
- [ ] Article/BlogPosting schema
- [ ] Breadcrumb schema
- [ ] Author metadata
- [ ] datePublished
- [ ] dateModified
- [ ] 800+ words content
- [ ] Internal links to tools
- [ ] FAQs (optional but recommended)

### Technical SEO
- [ ] All pages use flat URLs (no nested paths)
- [ ] All images use next/image
- [ ] All images have alt text
- [ ] All images have width/height
- [ ] Heavy libraries lazy loaded
- [ ] Fonts optimized (next/font)
- [ ] No console errors
- [ ] No 404 errors
- [ ] Mobile responsive
- [ ] Fast load times (< 3s)

### Performance (Core Web Vitals)
- [ ] LCP < 2.5 seconds
- [ ] INP < 200 milliseconds
- [ ] CLS < 0.1
- [ ] Images optimized & compressed
- [ ] Third-party scripts minimized
- [ ] Critical CSS inlined
- [ ] Lazy loading implemented

---

## 🧪 Testing Checklist

### Schema Validation
- [ ] Test homepage in Rich Results Test
- [ ] Test 3 tool pages in Rich Results Test
- [ ] Test 1 category page in Rich Results Test
- [ ] Test 1 blog post in Rich Results Test
- [ ] All schemas valid (no errors)
- [ ] Breadcrumbs display correctly

### Metadata Validation
- [ ] Check 5 random pages have unique titles
- [ ] Check 5 random pages have unique descriptions
- [ ] Verify canonical URLs have no query params
- [ ] Test OpenGraph with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### SEO Basics
- [ ] `/sitemap.xml` generates correctly
- [ ] `/robots.txt` is accessible
- [ ] All internal links work (no 404s)
- [ ] All external links open in new tab
- [ ] Logo links to homepage
- [ ] Contact page exists
- [ ] Privacy policy exists
- [ ] Terms of service exists

### Content Quality
- [ ] No spelling errors
- [ ] No grammar errors
- [ ] No "lorem ipsum" placeholder text
- [ ] All dates are accurate
- [ ] All statistics are cited
- [ ] Consistent brand voice
- [ ] Consistent formatting

### Mobile Testing
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] All buttons tappable
- [ ] No horizontal scroll
- [ ] Text is readable (min 16px)
- [ ] Forms work properly
- [ ] Images load correctly

### Performance Testing
- [ ] Run PageSpeed Insights on homepage
- [ ] Run PageSpeed Insights on 3 tool pages
- [ ] Score > 90 on desktop
- [ ] Score > 70 on mobile
- [ ] No render-blocking resources
- [ ] Images lazy load below fold
- [ ] Fonts load without FOUT/FOIT

---

## 🚀 Launch Day Checklist

### Google Search Console
- [ ] Add property
- [ ] Verify domain ownership
- [ ] Submit sitemap.xml
- [ ] Request indexing for homepage
- [ ] Request indexing for top 10 pages
- [ ] Enable email alerts
- [ ] Add team members (if applicable)

### Google Analytics
- [ ] Create GA4 property
- [ ] Install tracking code
- [ ] Verify tracking with Real-Time report
- [ ] Set up events (button clicks, tool usage)
- [ ] Set up conversions
- [ ] Link to Search Console
- [ ] Add team members (if applicable)

### Optional but Recommended
- [ ] Set up Vercel Analytics (if on Vercel)
- [ ] Set up Plausible/Fathom (privacy-friendly alternative)
- [ ] Create Google Business Profile (if applicable)
- [ ] Submit to Bing Webmaster Tools

### Social Media
- [ ] Share launch on Twitter/X
- [ ] Share launch on LinkedIn
- [ ] Post in relevant communities (Reddit, forums)
- [ ] Update social media bios with link

### Documentation
- [ ] Create SEO log file (`seo-log.md`)
- [ ] Document baseline metrics (date, tool count, etc.)
- [ ] Set calendar reminder for monthly SEO review

---

## 📊 Post-Launch Monitoring (First Week)

### Daily (First 3 Days)
- [ ] Check Search Console for crawl errors
- [ ] Monitor indexing status
- [ ] Check Analytics for traffic
- [ ] Test site on different devices
- [ ] Monitor for 404 errors or broken links

### Weekly (First Month)
- [ ] Review Search Console Performance
- [ ] Check Core Web Vitals report
- [ ] Review Analytics user flow
- [ ] Look for unexpected user behavior
- [ ] Check for accessibility issues

---

## 🔄 Monthly Maintenance Checklist

### First Monday of Each Month

#### Search Console Review (20 minutes)
- [ ] Check Coverage report for errors
- [ ] Review Enhancements (structured data)
- [ ] Check Core Web Vitals trends
- [ ] Review top queries & pages
- [ ] Check average CTR
- [ ] Look for new crawl errors
- [ ] Verify sitemap is processing

#### Analytics Review (20 minutes)
- [ ] Review traffic trends (MoM comparison)
- [ ] Top 10 landing pages
- [ ] Top exit pages
- [ ] New vs returning visitors
- [ ] Traffic by device
- [ ] Traffic by country
- [ ] Conversion rates

#### Content Updates (30 minutes)
- [ ] Find pages with high impressions, low CTR
- [ ] Update meta descriptions for low CTR pages
- [ ] Add FAQs based on support questions
- [ ] Update outdated statistics/dates
- [ ] Fix any broken internal links
- [ ] Expand thin content pages (< 400 words)

#### Performance Check (10 minutes)
- [ ] Run PageSpeed Insights on 3 random pages
- [ ] Check for new performance regressions
- [ ] Verify images are still optimized
- [ ] Check for new third-party scripts

#### Documentation (10 minutes)
- [ ] Update `seo-log.md` with changes
- [ ] Document traffic trends
- [ ] Note any A/B tests running
- [ ] Track new pages added

---

## 🎯 Quarterly Deep Dive (Every 3 Months)

### Content Audit
- [ ] List all pages with < 400 words
- [ ] List all pages with > 1 year old content
- [ ] Identify pages with declining traffic
- [ ] Find pages with low engagement (high bounce rate)
- [ ] Create improvement plan for bottom 20%

### Technical Audit
- [ ] Run full site crawl (Screaming Frog or similar)
- [ ] Check for duplicate content
- [ ] Review internal linking structure
- [ ] Verify all images still have alt text
- [ ] Check for orphaned pages
- [ ] Review URL structure consistency

### Competitive Analysis
- [ ] Research top 3 competitors
- [ ] Compare keyword rankings
- [ ] Analyze their content structure
- [ ] Review their backlink profile
- [ ] Identify content gaps

### Schema Audit
- [ ] Test 10 random pages in Rich Results Test
- [ ] Verify all schema types still valid
- [ ] Check for new schema opportunities
- [ ] Review structured data errors in Search Console

### Performance Deep Dive
- [ ] Full Core Web Vitals analysis
- [ ] Mobile vs desktop comparison
- [ ] Third-party script audit
- [ ] Image optimization review
- [ ] Lighthouse CI setup/review

---

## 🆘 Troubleshooting Checklist

### "Page Not Indexing"
- [ ] Check `robots.txt` isn't blocking
- [ ] Verify sitemap includes page
- [ ] Check for `noindex` meta tag
- [ ] Verify canonical points to itself
- [ ] Check Search Console Coverage report
- [ ] Request indexing manually
- [ ] Wait 2-4 weeks (patience!)

### "Rich Results Not Showing"
- [ ] Test in Rich Results Test
- [ ] Verify schema is valid JSON
- [ ] Check schema matches content
- [ ] Verify no conflicting schemas
- [ ] Check Search Console Enhancements
- [ ] Wait 2-4 weeks (patience!)

### "Traffic Dropped"
- [ ] Check Search Console for manual actions
- [ ] Verify site is still indexed
- [ ] Check Analytics for tracking issues
- [ ] Review Core Web Vitals for regressions
- [ ] Check for increased competition
- [ ] Review recent content changes
- [ ] Check for technical errors (500s, redirects)

### "Core Web Vitals Failing"
- [ ] Run PageSpeed Insights
- [ ] Check LCP element (usually hero image)
- [ ] Review third-party scripts
- [ ] Optimize largest images
- [ ] Check for CLS causes (ads, embeds)
- [ ] Lazy load below-fold content
- [ ] Review font loading strategy

### "Low CTR in Search"
- [ ] Review meta descriptions
- [ ] Check if title is getting truncated
- [ ] Add compelling call-to-action
- [ ] Consider adding year to title
- [ ] Add numbers or specifics
- [ ] Check if competitors have rich results
- [ ] Consider updating URL structure

---

## 📈 Success Metrics

### Track These Monthly

**Search Performance:**
- Total impressions (month over month)
- Total clicks (month over month)
- Average CTR
- Average position
- Number of indexed pages

**Traffic:**
- Organic sessions
- New users
- Returning users
- Bounce rate
- Average session duration
- Pages per session

**Technical Health:**
- Core Web Vitals pass rate
- Crawl errors count
- Pages with valid schema
- Mobile usability issues
- Security issues

**Content:**
- Total published pages
- Average word count
- Pages with 400+ words
- Pages with internal links
- Pages with rich results

---

## 🎉 Celebration Milestones

- [ ] First 100 impressions
- [ ] First 10 clicks from organic search
- [ ] First page in top 10 results
- [ ] First page with rich results
- [ ] 100% Core Web Vitals pass rate
- [ ] 1,000 organic sessions/month
- [ ] 10,000 organic sessions/month
- [ ] Featured snippet appearance
- [ ] 50+ pages indexed
- [ ] 100+ pages indexed

---

## 📚 Resources Quick Links

**Validation Tools:**
- Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org/
- PageSpeed Insights: https://pagespeed.web.dev/
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

**Dashboards:**
- Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com/

**Learning:**
- Google Search Central: https://developers.google.com/search
- Schema.org: https://schema.org/
- Web.dev: https://web.dev/

---

**Last Updated:** _________  
**Next Review Date:** _________  
**Current Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Completed

---

**Pro Tip:** Print this checklist and keep it visible. Check items off as you complete them. Update monthly!

