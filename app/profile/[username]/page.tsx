'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/components/PostCard';

interface UserProfile {
  username: string;
  avatar_url: string | null;
  created_at: string;
  badges: string[] | null;
}

interface UserStats {
  posts: number;
  comments: number;
  reactions: number;
}

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

const BADGE_ICONS: Record<string, string> = {
  'First Post': '??',
  'Daily Reflection': '??',
  'Supportive Comment': '??',
  'Community Helper': '??',
  'Inspiration': '?'
};

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({ posts: 0, comments: 0, reactions: 0 });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/users/${params.username}`);
        const data = await res.json();
        if (res.ok) {
          setProfile({
            username: data.username,
            avatar_url: data.avatar_url,
            created_at: data.created_at,
            badges: data.badges
          });
          setStats(data.stats || { posts: 0, comments: 0, reactions: 0 });
          setPosts(data.posts || []);
        }
      } catch (err) {
        console.error('Fetch profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [params.username]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ color: '#888', textAlign: 'center' }}>Loading profile...</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h2 style={{ color: '#2C3E50' }}>User Not Found</h2>
        <p style={{ color: '#888' }}>The user @{params.username} does not exist.</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
        borderRadius: '16px',
        padding: '2rem',
        color: '#fff',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#fff',
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: '#9B59B6'
        }}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          ) : (
            profile.username.charAt(0).toUpperCase()
          )}
        </div>
        <h2 style={{ margin: '0 0 0.5rem' }}>@{profile.username}</h2>
        <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
          Member since {profile.created_at ? formatDate(profile.created_at) : 'recently'}
        </p>

        {profile.badges && profile.badges.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
            {profile.badges.map((badge, i) => (
              <span key={i} style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '0.25rem 0.75rem',
                borderRadius: '16px',
                fontSize: '0.85rem'
              }}>
                {BADGE_ICONS[badge] || '??'} {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: '#f5f5f5',
          borderRadius: '12px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2C3E50' }}>{stats.posts}</div>
          <div style={{ fontSize: '0.85rem', color: '#888' }}>Posts</div>
        </div>
        <div style={{
          background: '#f5f5f5',
          borderRadius: '12px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2C3E50' }}>{stats.comments}</div>
          <div style={{ fontSize: '0.85rem', color: '#888' }}>Comments</div>
        </div>
        <div style={{
          background: '#f5f5f5',
          borderRadius: '12px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2C3E50' }}>{stats.reactions}</div>
          <div style={{ fontSize: '0.85rem', color: '#888' }}>Reactions</div>
        </div>
      </div>

      <h3 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Posts</h3>
      {posts.length === 0 ? (
        <p style={{ color: '#888' }}>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            username={post.users?.username || profile.username}
            avatar={post.users?.avatar_url}
            timestamp={post.created_at}
            category={post.category || 'Reflection'}
            content={post.content}
            mediaUrl={post.media_url}
            commentsCount={post.comments_count || 0}
            initialReactions={[]}
            interactive={true}
          />
        ))
      )}
    </main>
  );
}