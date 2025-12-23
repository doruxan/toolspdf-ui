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
      
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 border-b border-border">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/blog" className="hover:text-primary transition-colors font-medium">← Back to Blog</Link>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readingTime} read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm">
            <span className="text-foreground font-medium">By {post.author}</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
              {post.keywords[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <AdBanner dataAdSlot="1234567890" className="mb-8" />
            
            <article className="blog-content bg-background p-8 rounded-xl border border-border shadow-sm">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            <div className="mt-16 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">Explore Our Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/merge-pdf" className="group p-6 border-2 border-border rounded-xl hover:border-primary hover:shadow-lg transition-all bg-background">
                  <div className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Merge PDF</div>
                  <div className="text-sm text-muted-foreground mt-1">Combine multiple PDFs into one</div>
                </Link>
                <Link href="/compress-pdf" className="group p-6 border-2 border-border rounded-xl hover:border-primary hover:shadow-lg transition-all bg-background">
                  <div className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Compress PDF</div>
                  <div className="text-sm text-muted-foreground mt-1">Reduce PDF file size</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="0987654321" />
            
            <div className="mt-8 p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border-2 border-border sticky top-24">
              <h3 className="font-bold text-foreground mb-3 text-lg">📑 Quick Info</h3>
              <div className="text-sm space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-primary">📅</span>
                  <div>
                    <div className="font-medium text-foreground">Published</div>
                    <div className="text-muted-foreground">{post.date}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">⏱️</span>
                  <div>
                    <div className="font-medium text-foreground">Reading Time</div>
                    <div className="text-muted-foreground">{post.readingTime}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✍️</span>
                  <div>
                    <div className="font-medium text-foreground">Author</div>
                    <div className="text-muted-foreground">{post.author}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

