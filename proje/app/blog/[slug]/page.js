import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts } from '@/lib/posts'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
    }
  }

  return {
    title: `${post.title} - Faydalı Blog`,
    description: post.description,
  }
}

export default async function BlogPost({ params }) {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
      notFound()
    }

    const { content } = await compileMDX({
      source: post.content,
      options: { parseFrontmatter: true }
    })

    return (
      <article className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-gray-600">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'd MMMM yyyy', { locale: tr })}
            </time>
            <span className="mx-2">•</span>
            <span>{post.category}</span>
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          {content}
        </div>
      </article>
    )
  } catch (error) {
    console.error('Blog post error:', error)
    notFound()
  }
} 