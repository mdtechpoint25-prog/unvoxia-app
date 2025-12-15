import { NextResponse } from 'next/server';
import { queryDatabase } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, slug, author, excerpt, content, featured_image, category, is_published, published_at } = body;
    
    const result = await queryDatabase(
      `UPDATE blog_posts 
       SET title = $1, slug = $2, author = $3, excerpt = $4, content = $5, 
           featured_image = $6, category = $7, is_published = $8, published_at = $9, 
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $10 RETURNING *`,
      [title, slug, author, excerpt, content, featured_image, category, is_published, published_at, params.id]
    );
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await queryDatabase('DELETE FROM blog_posts WHERE id = $1', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
