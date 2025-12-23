# Domain Setup Checklist for toolspdf.io

## ✅ Namecheap DNS Settings

1. Log in to Namecheap
2. Go to Domain List → Manage `toolspdf.io`
3. Click **Advanced DNS** tab
4. Add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 76.76.21.21 | Automatic |
| CNAME Record | www | cname.vercel-dns.com. | Automatic |

5. Delete any conflicting records (parking page, URL redirects)
6. Save changes

## ✅ Vercel Domain Setup

1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Domains
4. Add both:
   - toolspdf.io (set as primary)
   - www.toolspdf.io
5. Wait for SSL certificate generation (~5 minutes)

## ✅ Verification (After DNS Propagation)

Wait 15 minutes to 48 hours for DNS to propagate, then test:

\`\`\`bash
# Check DNS
nslookup toolspdf.io
nslookup www.toolspdf.io

# Test HTTPS
curl -I https://toolspdf.io
curl -I https://www.toolspdf.io
\`\`\`

## ✅ Post-Launch SEO Tasks

1. **Google Search Console**
   - Add property: https://toolspdf.io
   - Verify ownership via DNS/HTML meta tag
   - Submit sitemap: https://toolspdf.io/sitemap.xml

2. **Google Analytics**
   - Add toolspdf.io to GA4 property
   - Replace placeholder ID in app/layout.tsx

3. **Google AdSense**
   - Add toolspdf.io to your sites list
   - Replace placeholder ID in app/layout.tsx
   - Wait for approval (~24-48 hours)

4. **Update Placeholder IDs**
   - Google Analytics: Replace `G-XXXXXXXXXX` with real ID
   - Google AdSense: Replace `ca-pub-XXXXXXXXXXXXXXXX` with real ID

5. **Submit to Search Engines**
   - Google: https://search.google.com/search-console
   - Bing: https://www.bing.com/webmasters
   - Submit sitemap in both

6. **Monitor & Optimize**
   - Check Google Search Console for indexing issues
   - Monitor Core Web Vitals
   - Track keyword rankings
   - Analyze user behavior in GA4

## 🔥 Quick SEO Wins

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Create backlinks (Reddit, Twitter, LinkedIn posts)
- [ ] Add internal linking in blog posts
- [ ] Optimize images (already done with Next.js Image)
- [ ] Monitor page speed (use Lighthouse)
- [ ] Build quality backlinks
- [ ] Share tools on social media
- [ ] Create YouTube tutorials linking to your tools
- [ ] Answer questions on Reddit/Quora with tool links

## 📊 SEO Monitoring Tools

- Google Search Console: Track impressions, clicks, rankings
- Google Analytics: User behavior, traffic sources
- Ahrefs/SEMrush: Keyword research, competitor analysis
- PageSpeed Insights: Performance monitoring
- Lighthouse: SEO, accessibility, performance audits

## 🚀 Traffic Growth Strategies

1. **Content Marketing**: Regular blog posts about PDF tips
2. **Social Media**: Share on Twitter, LinkedIn, Reddit
3. **Guest Posting**: Write for other tech blogs
4. **YouTube**: Create tutorial videos
5. **Email Marketing**: Build an email list
6. **Partnerships**: Collaborate with complementary tools
7. **Product Hunt**: Launch on Product Hunt
8. **App Directories**: List on tool directories

Good luck with your launch! 🎉
