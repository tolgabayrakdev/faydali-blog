import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByCategory } from '@/lib/posts'

const categoryNames = {
  'hayat-ipuclari': 'Hayat Kolaylaştıran İpuçları',
  'saglik-beslenme': 'Sağlık & Beslenme',
  'ev-dekorasyon': 'Ev & Dekorasyon',
  'para-finans': 'Para & Finans'
}

export async function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const categoryName = categoryNames[slug]
  
  if (!categoryName) {
    return {
      title: 'Kategori Bulunamadı',
    }
  }

  return {
    title: `${categoryName} - Faydalı Blog`,
    description: `${categoryName} kategorisindeki tüm faydalı yazılar`,
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params
  const categoryName = categoryNames[slug]
  
  if (!categoryName) {
    notFound()
  }

  const posts = await getPostsByCategory(slug)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">{categoryName}</h1>
        <p className="text-center text-gray-600 mt-2">
          Bu kategorideki tüm yazılar
        </p>
      </header>

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

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Bu kategoride henüz yazı bulunmuyor.</p>
            <Link href="/" className="text-blue-600 hover:underline mt-2 inline-block">
              Ana Sayfaya Dön
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 