import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog/posts';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateArticleSchema } from '@/lib/seo/schemas';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - PDF Tools Blog`,
    description: post.excerpt,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    url: `https://toolspdf.io/blog/${post.slug}`,
    datePublished: post.date,
    author: post.author,
  });

  return (
    <div className="w-full bg-background">
      <StructuredData data={articleSchema} />
      
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readingTime} read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <AdBanner dataAdSlot="1234567890" className="mb-8" />
            
            <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">Explore Our Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/merge-pdf" className="p-4 border border-border rounded-lg hover:border-primary transition-colors bg-card">
                  <div className="font-bold text-foreground">Merge PDF</div>
                  <div className="text-sm text-muted-foreground">Combine multiple PDFs into one</div>
                </Link>
                <Link href="/compress-pdf" className="p-4 border border-border rounded-lg hover:border-primary transition-colors bg-card">
                  <div className="font-bold text-foreground">Compress PDF</div>
                  <div className="text-sm text-muted-foreground">Reduce PDF file size</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="0987654321" />
            
            <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border sticky top-24">
              <h3 className="font-bold text-foreground mb-4">Table of Contents</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Scroll through the article to learn more about this topic.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

