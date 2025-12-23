import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolspdf.io'; // Updated to the chosen domain
  const currentDate = new Date();

  const tools = [
    'merge-pdf',
    'split-pdf',
    'compress-pdf',
    'pdf-to-jpg',
    'jpg-to-pdf',
    'rotate-pdf',
    'unlock-pdf',
    'protect-pdf',
    'watermark-pdf',
    'remove-pages',
    'extract-pages',
    'add-page-numbers',
    'organize-pdf',
    'html-to-pdf',
    'crop-pdf',
    'redact-pdf',
  ];

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogPosts = getAllBlogPosts();
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...toolPages,
    ...blogPages,
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}

