import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog/posts';
import AdBanner from '@/components/ads/AdBanner';

export const metadata: Metadata = {
  title: 'PDF Tools Blog - Tips, Tutorials & Guides',
  description: 'Learn how to manage your PDF files efficiently. Tutorials on merging, splitting, compressing PDFs, and more.',
  keywords: 'pdf tips, pdf tutorials, how to edit pdf, pdf management guides',
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">PDF Tools Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, tricks, and comprehensive guides for managing your PDF documents.
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
              className="group flex flex-col bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readingTime} read</span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article <span>→</span>
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

