import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog/posts';
import AdBanner from '@/components/ads/AdBanner';

export const metadata: Metadata = {
  title: 'RawTools Blog - PDF, E-commerce & IBAN Guides',
  description: 'Expert guides and tutorials for PDF tools, Shopify calculators, and IBAN validation. Learn best practices, tips, and tricks from industry professionals.',
  keywords: 'pdf tools guide, shopify calculator tutorial, iban validation, ecommerce tips, pdf management, banking tools',
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">RawTools Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert guides for PDF tools, Shopify calculators, and IBAN validation. Learn best practices and advanced techniques.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <AdBanner dataAdSlot="1234567890" className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-background border-2 border-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary hover:-translate-y-1"
            >
              <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-medium mb-4">
                  {post.keywords && post.keywords.length > 0 && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">{post.keywords[0]}</span>
                  )}
                  {post.readingTime && (
                    <span className="text-muted-foreground">{post.readingTime}</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 flex-1 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <span className="font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Check back soon for our first articles!</p>
          </div>
        )}
      </div>
    </div>
  );
}

