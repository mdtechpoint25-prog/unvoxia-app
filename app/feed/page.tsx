'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/components/PostCard';
import CreatePostForm from '@/components/CreatePostForm';
import CategoryFilter from '@/components/CategoryFilter';

interface Post {
  id: string;
  content: string;
  category: string;
  media_url: string | null;
  created_at: string;
  comments_count: number;
  users: {
    username: string;
    avatar_url: string | null;
  };
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [currentUserId, setCurrentUserId] = useState<string | undefined>();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url = category === 'all' 
        ? '/api/posts' 
        : `/api/posts?category=${encodeURIComponent(category)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) setPosts(data.posts);
    } catch (err) {
      console.error('Fetch posts error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // Try to get current user from session cookie
    try {
      const cookies = document.cookie.split(';');
      const sessionCookie = cookies.find(c => c.trim().startsWith('session='));
      if (sessionCookie) {
        const session = JSON.parse(atob(sessionCookie.split('=')[1]));
        setCurrentUserId(session.userId);
      }
    } catch {}
  }, [category]);

  return (
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ color: '#2C3E50', marginBottom: '1.5rem' }}>Community Feed</h2>
      
      <CreatePostForm onPostCreated={fetchPosts} />
      
      <CategoryFilter 
        selected={category} 
        onSelect={(cat) => setCategory(cat)} 
      />

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>
          No posts yet. Be the first to share!
        </p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            username={post.users?.username || 'Anonymous'}
            avatar={post.users?.avatar_url}
            timestamp={post.created_at}
            category={post.category || 'Reflection'}
            content={post.content}
            mediaUrl={post.media_url}
            commentsCount={post.comments_count || 0}
            initialReactions={[]}
            currentUserId={currentUserId}
            interactive={true}
          />
        ))
      )}
    </main>
  );
}