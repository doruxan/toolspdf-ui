import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/test', '/private'],
      },
    ],
    sitemap: 'https://toolspdf.io/sitemap.xml',
  };
}

