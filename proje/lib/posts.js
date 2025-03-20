import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function getAllPosts() {
  try {
    const fileNames = await fs.readdir(postsDirectory)
    const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = await fs.readFile(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        ...data,
      }
    }))

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

export async function getPostBySlug(slug) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = await fs.readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...data,
    }
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error)
    return null
  }
}

export async function getPostsByCategory(categorySlug) {
  const allPosts = await getAllPosts()
  const categoryMap = {
    'hayat-ipuclari': 'Hayat Kolaylaştıran İpuçları',
    'saglik-beslenme': 'Sağlık & Beslenme',
    'ev-dekorasyon': 'Ev & Dekorasyon',
    'para-finans': 'Para & Finans'
  }
  
  return allPosts.filter(post => post.category === categoryMap[categorySlug])
} 