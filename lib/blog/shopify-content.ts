// Helper to convert Shopify blog post sections to HTML
import { BLOG_POSTS as SHOPIFY_POSTS } from '@/content/blog/shopify-posts';

export function convertShopifyPostToHTML(slug: string): string | undefined {
  const post = SHOPIFY_POSTS.find(p => p.slug === slug);
  if (!post) return undefined;

  let html = '';
  for (const section of post.sections) {
    html += `<h2>${section.heading}</h2>\n`;
    for (const paragraph of section.paragraphs) {
      html += `<p>${paragraph}</p>\n`;
    }
  }
  return html;
}

export function getShopifyPostBySlug(slug: string) {
  return SHOPIFY_POSTS.find(p => p.slug === slug);
}

export { SHOPIFY_POSTS };

