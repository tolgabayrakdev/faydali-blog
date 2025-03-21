import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { getPostBySlug, getPostSlugs } from '../../../utils/mdx';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  try {
    const post = await getPostBySlug((await params).slug);
    
    if (!post) {
      return {
        title: 'Blog Yazısı Bulunamadı | Faydalı Blog',
        description: 'Aradığınız blog yazısı bulunamadı.',
      };
    }
    
    return {
      title: `${post.meta.title} | Faydalı Blog`,
      description: post.meta.excerpt,
      openGraph: {
        title: post.meta.title,
        description: post.meta.excerpt,
        type: 'article',
        publishedTime: post.meta.date,
        authors: ['Faydalı Blog'],
      },
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    return {
      title: 'Blog Yazısı | Faydalı Blog',
      description: 'Blog yazısı bulunamadı.',
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  try {
    const post = await getPostBySlug((await params).slug);
    
    if (!post) {
      notFound();
    }
    
    return (
      <article className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog" 
            className="text-blue-600 inline-flex items-center mb-8 hover:underline"
          >
            ← Tüm Yazılar
          </Link>

          <header className="mb-8 pb-8 border-b border-gray-200">
            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
              {post.meta.category}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.meta.title}</h1>
            <div className="text-gray-600">
              {post.meta.date}
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Yorumlar</h3>
            <p className="text-gray-600 italic">Henüz yorum yok. İlk yorumu sen yap!</p>
            
            <form className="mt-6">
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Yorumunuz
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  placeholder="Düşüncelerinizi paylaşın..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    İsim
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Yorum Gönder
              </button>
            </form>
          </div>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Blog post error:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getPostSlugs();
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('Generate static params error:', error);
    return [];
  }
}

export const dynamicParams = false;