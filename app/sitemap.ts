import { MetadataRoute } from 'next';
import { toolCategories } from '@/config/tools';
import { getAllBlogPosts } from '@/lib/blog/posts';
import { blogCategories } from '@/config/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rawtools.io';
  const currentDate = new Date();

  // Generate tool pages from config
  const toolPages = toolCategories.flatMap((category) =>
    category.tools.map((tool) => ({
      url: `${baseUrl}${tool.href}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))
  );

  // Generate blog post pages
  const blogPosts = getAllBlogPosts();
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Generate blog category pages
  const blogCategoryPages = Object.keys(blogCategories).map((categoryId) => ({
    url: `${baseUrl}/blog/category/${categoryId}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
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
    ...blogCategoryPages,
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
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];
}
