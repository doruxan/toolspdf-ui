#!/usr/bin/env node
/**
 * Batch update all tool pages with enhanced OpenGraph and Twitter metadata
 * 
 * Adds to all 65 tool pages:
 * - og:images array with RawTools logo
 * - og:url (tool-specific)
 * - og:siteName: 'RawTools'
 * - twitter.images array with logo
 * 
 * Usage: node scripts/add-og-metadata.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://rawtools.io';
const SITE_NAME = 'RawTools';
const OG_IMAGE = '/og-image.svg';
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

// Tool directories to search
const TOOL_DIRS = [
  'app/(string)',
  'app/(json)',
  'app/(pdf)',
  'app/(iban)',
  'app/(ecommerce)',
];

/**
 * Find all page.tsx files in tool directories
 */
function findToolPages() {
  const toolPages = [];
  
  for (const dir of TOOL_DIRS) {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) continue;
    
    const subdirs = fs.readdirSync(fullPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const subdir of subdirs) {
      const pagePath = path.join(fullPath, subdir, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        toolPages.push(pagePath);
      }
    }
  }
  
  return toolPages;
}

/**
 * Extract the tool slug from the file path
 */
function getToolSlug(filePath) {
  // Normalize path to use forward slashes
  const normalized = filePath.replace(/\\/g, '/');
  const match = normalized.match(/app\/\([^)]+\)\/([^/]+)\/page\.tsx$/);
  return match ? match[1] : null;
}

/**
 * Check if file already has the metadata we're adding
 */
function hasMetadata(content) {
  // Check if openGraph has images array with OG_IMAGE
  const hasOgImages = content.includes(`images: [{`) && content.includes(`url: '${OG_IMAGE}'`);
  
  // Check if openGraph has siteName  
  const hasSiteName = /openGraph:\s*\{[^}]*siteName:/s.test(content);
  
  // Check if twitter has images array
  const hasTwitterImages = /twitter:\s*\{[^}]*images:/s.test(content);
  
  return hasOgImages && hasSiteName && hasTwitterImages;
}

/**
 * Add og:url, og:siteName, and og:images to openGraph object
 */
function enhanceOpenGraph(content, slug) {
  const toolUrl = `${SITE_URL}/${slug}`;
  
  // Pattern 1: openGraph object with type: 'website' and closing brace on next line
  const pattern1 = /(openGraph:\s*\{[^}]*type:\s*['"]website['"],?\s*)\},/s;
  
  if (pattern1.test(content)) {
    content = content.replace(pattern1, (match, before) => {
      return `${before}
    url: '${toolUrl}',
    siteName: '${SITE_NAME}',
    images: [{
      url: '${OG_IMAGE}',
      width: ${OG_IMAGE_WIDTH},
      height: ${OG_IMAGE_HEIGHT},
      alt: '${SITE_NAME} Logo',
    }],
  },`;
    });
  }
  
  // Pattern 2: openGraph with url already present
  const pattern2 = /(openGraph:\s*\{[^}]*url:\s*['"][^'"]+['"],?\s*)\},/s;
  
  if (pattern2.test(content) && !content.includes('siteName:')) {
    content = content.replace(pattern2, (match, before) => {
      return `${before}
    siteName: '${SITE_NAME}',
    images: [{
      url: '${OG_IMAGE}',
      width: ${OG_IMAGE_WIDTH},
      height: ${OG_IMAGE_HEIGHT},
      alt: '${SITE_NAME} Logo',
    }],
  },`;
    });
  }
  
  return content;
}

/**
 * Add images array to twitter object
 */
function enhanceTwitterCard(content) {
  // Pattern: twitter object with description, before closing brace
  const pattern = /(twitter:\s*\{[^}]*description:\s*['"][^'"]+['"],?\s*)\},/s;
  
  if (pattern.test(content) && !content.includes('twitter:') || !content.match(/twitter:\s*\{[^}]*images:/s)) {
    content = content.replace(pattern, (match, before) => {
      return `${before}
    images: ['${OG_IMAGE}'],
  },`;
    });
  }
  
  return content;
}

/**
 * Process a single file
 */
function processFile(filePath) {
  const slug = getToolSlug(filePath);
  if (!slug) {
    console.log(`⚠️  Skipping ${filePath} - could not extract slug`);
    return { success: false, reason: 'no-slug' };
  }
  
  // Skip category pages (e.g., string-tools, json-tools)
  if (slug.endsWith('-tools')) {
    console.log(`⏭️  Skipping category page: ${slug}`);
    return { success: false, reason: 'category-page' };
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Check if already has metadata
  if (hasMetadata(content)) {
    console.log(`✓  Already enhanced: ${slug}`);
    return { success: false, reason: 'already-enhanced' };
  }
  
  // Enhance OpenGraph
  content = enhanceOpenGraph(content, slug);
  
  // Enhance Twitter Card
  content = enhanceTwitterCard(content);
  
  // Check if anything changed
  if (content === originalContent) {
    console.log(`⚠️  No changes made: ${slug}`);
    return { success: false, reason: 'no-changes' };
  }
  
  // Write back to file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Enhanced: ${slug}`);
  
  return { success: true };
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting batch metadata enhancement...\n');
  console.log(`📝 Configuration:`);
  console.log(`   Site URL: ${SITE_URL}`);
  console.log(`   Site Name: ${SITE_NAME}`);
  console.log(`   OG Image: ${OG_IMAGE}`);
  console.log(`   Image Size: ${OG_IMAGE_WIDTH}x${OG_IMAGE_HEIGHT}\n`);
  
  const stats = {
    total: 0,
    enhanced: 0,
    skipped: 0,
    errors: 0,
  };
  
  // Find all tool pages
  const allFiles = findToolPages();
  
  console.log(`📂 Found ${allFiles.length} tool pages\n`);
  stats.total = allFiles.length;
  
  // Process each file
  for (const filePath of allFiles) {
    try {
      const result = processFile(filePath);
      if (result.success) {
        stats.enhanced++;
      } else {
        stats.skipped++;
      }
    } catch (error) {
      stats.errors++;
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Enhanced: ${stats.enhanced}`);
  console.log(`⏭️  Skipped: ${stats.skipped}`);
  console.log(`❌ Errors: ${stats.errors}`);
  console.log(`📁 Total: ${stats.total}`);
  console.log('='.repeat(60));
  
  if (stats.enhanced > 0) {
    console.log('\n✨ Success! Run "npm run build" to verify.');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { processFile, enhanceOpenGraph, enhanceTwitterCard };

