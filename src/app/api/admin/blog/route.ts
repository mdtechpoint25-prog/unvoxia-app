import { NextResponse } from 'next/server';
import { queryDatabase } from '@/lib/db';

export async function GET() {
  try {
    const posts = await queryDatabase(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    );
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, author, excerpt, content, featured_image, category, is_published, published_at } = body;
    
    const result = await queryDatabase(
      `INSERT INTO blog_posts (title, slug, author, excerpt, content, featured_image, category, is_published, published_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, slug, author, excerpt, content, featured_image, category, is_published, published_at]
    );
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
