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
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f9fafb 0%, #fff 100%)',
      paddingTop: '6rem'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '2rem 1.5rem' 
      }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 800, 
            color: '#1a1a2e',
            marginBottom: '0.5rem'
          }}>
            Community Feed
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            Share ideas, get inspired, and connect with the NOMA community.
          </p>
        </div>
        
        {/* Create Post Card */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          marginBottom: '1.5rem',
          border: '1px solid #e5e7eb'
        }}>
          <CreatePostForm onPostCreated={fetchPosts} />
        </div>
        
        {/* Category Filter */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          border: '1px solid #e5e7eb'
        }}>
          <CategoryFilter 
            selected={category} 
            onSelect={(cat) => setCategory(cat)} 
          />
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {loading ? (
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '3rem',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid #e5e7eb',
                borderTopColor: '#1ABC9C',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ color: '#6b7280' }}>Loading posts...</p>
              <style jsx>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : posts.length === 0 ? (
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '3rem',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.1) 0%, rgba(155, 89, 182, 0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1ABC9C" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem' }}>No posts yet</h3>
              <p style={{ color: '#6b7280' }}>Be the first to share something with the community!</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                username={post.users?.username || 'Anonymous'}
                avatar={post.users?.avatar_url}
                timestamp={post.created_at}
                category={post.category || 'Productivity'}
                content={post.content}
                mediaUrl={post.media_url}
                commentsCount={post.comments_count || 0}
                initialReactions={[]}
                currentUserId={currentUserId}
                interactive={true}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}