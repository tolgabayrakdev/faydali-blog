import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default async function Home() {
  const categories = [
    { name: 'Hayat Kolaylaştıran İpuçları', slug: 'hayat-ipuclari' },
    { name: 'Sağlık & Beslenme', slug: 'saglik-beslenme' },
    { name: 'Ev & Dekorasyon', slug: 'ev-dekorasyon' },
    { name: 'Para & Finans', slug: 'para-finans' },
  ]

  const posts = await getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Faydalı Blog</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/kategori/${category.slug}`}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                <span className="mx-2">•</span>
                <span>{post.category}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
