import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../utils/mdx';

export default async function HomePage() {
  try {
    const allPosts = await getAllPosts();
    const featuredPosts = allPosts.slice(0, 3);

    return (
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-gray-50 py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Faydalı Blog'a Hoş Geldiniz
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mb-8">
                Teknoloji, web geliştirme ve daha fazlası hakkında düşünceler ve faydalı bilgiler.
              </p>
              <Link href="/blog" className="btn btn-primary">
                Yazıları Keşfet
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Öne Çıkan Yazılar</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.length > 0 ? (
                featuredPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="card hover:shadow-md transition-shadow">
                    <div className="aspect-video relative bg-gray-100">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Görsel
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime} okuma</span>
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="text-blue-600 font-medium">Devamını Oku →</div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-600">Henüz yazı yok. Yakında yeni yazılar eklenecek.</p>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Yeni Yazılardan Haberdar Olun</h2>
              <p className="text-gray-600 mb-6">
                En son yazılarımızdan ve güncellemelerimizden haberdar olmak için bültenimize abone olun.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400/50 min-w-0 sm:min-w-[300px]" 
                />
                <button className="btn btn-primary">
                  Abone Ol
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error rendering HomePage:", error);
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
