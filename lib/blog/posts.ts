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
