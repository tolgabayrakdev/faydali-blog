import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '../../utils/mdx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Yazıları | Faydalı Blog',
  description: 'Teknoloji, web geliştirme ve daha fazlası hakkında düşünceler ve faydalı bilgiler.',
  openGraph: {
    title: 'Blog Yazıları | Faydalı Blog',
    description: 'Teknoloji, web geliştirme ve daha fazlası hakkında düşünceler ve faydalı bilgiler.',
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  try {
    const blogPosts = await getAllPosts();

    return (
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Yazıları</h1>
            <p className="text-xl text-gray-600">
              Teknoloji, web geliştirme ve daha fazlası hakkında düşünceler ve faydalı bilgiler.
            </p>
          </header>

          <div className="space-y-10">
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <article key={post.slug} className="card hover:shadow-md transition-shadow overflow-hidden">
                  <Link href={`/blog/${post.slug}`} className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-video relative bg-gray-100 flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Görsel
                      </div>
                    </div>
                    <div className="p-6 md:p-8 flex-grow">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime} okuma</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="text-blue-600 font-medium">Devamını Oku →</div>
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <div className="text-center p-10 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">Henüz yazı bulunamadı.</p>
                <Link href="/" className="text-blue-600 font-medium hover:underline">
                  Ana Sayfaya Dön
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering BlogIndexPage:", error);
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Bir hata oluştu
        </h1>
        <p className="text-gray-600 mb-8">
          Sayfa yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Sayfayı Yenile
        </button>
      </div>
    );
  }
} 