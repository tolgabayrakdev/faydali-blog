import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { promises as fsPromises } from 'fs';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    const files = await fsPromises.readdir(contentDirectory);
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error getting post slugs:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<{ meta: PostMeta; content: string } | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    
    // Check if file exists
    try {
      await fsPromises.access(filePath);
    } catch {
      console.log(`File not found: ${filePath}`);
      return null;
    }
    
    const fileContent = await fsPromises.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      meta: {
        slug,
        title: data.title || '',
        date: data.date || '',
        category: data.category || '',
        excerpt: data.excerpt || '',
        readTime: data.readTime || '',
      },
      content
    };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const slugs = await getPostSlugs();
    const postsPromises = slugs.map(slug => getPostBySlug(slug));
    const postsResults = await Promise.all(postsPromises);
    
    // Filter out null results and extract meta
    const posts = postsResults
      .filter((post): post is { meta: PostMeta; content: string } => post !== null)
      .map(post => post.meta)
      .sort((post1, post2) => (new Date(post2.date).getTime() - new Date(post1.date).getTime()));
    
    return posts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
} 