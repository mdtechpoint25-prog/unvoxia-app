'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import PostCard from '@/components/PostCard';
import ProfileSettings from '@/components/ProfileSettings';

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

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({ posts: 0, comments: 0, reactions: 0 });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startingChat, setStartingChat] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/users/${username}`);
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

        // Check if this is the current user's profile
        try {
          const cookies = document.cookie.split(';');
          const sessionCookie = cookies.find(c => c.trim().startsWith('session='));
          if (sessionCookie) {
            setIsLoggedIn(true);
            const session = JSON.parse(atob(sessionCookie.split('=')[1]));
            if (session.username === username) {
              setIsOwnProfile(true);
            }
          }
        } catch {}
      } catch (err) {
        console.error('Fetch profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const handleStartChat = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    setStartingChat(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverUsername: username,
          content: `Hi! I'd like to connect with you.`
        })
      });

      if (res.ok) {
        router.push('/messages');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to start chat');
      }
    } catch (err) {
      console.error('Start chat error:', err);
    } finally {
      setStartingChat(false);
    }
  };

  const handleSaveSettings = async (settings: { avatar_url?: string; password?: string }) => {
    const res = await fetch(`/api/users/${username}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to save settings');
    }

    // Update local profile if avatar changed
    if (settings.avatar_url && profile) {
      setProfile({ ...profile, avatar_url: settings.avatar_url });
    }
  };

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
        <p style={{ color: '#888' }}>The user @{username} does not exist.</p>
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
            profile.avatar_url.length <= 4 ? (
              <span style={{ fontSize: '2.5rem' }}>{profile.avatar_url}</span>
            ) : (
              <img src={profile.avatar_url} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            )
          ) : (
            profile.username.charAt(0).toUpperCase()
          )}
        </div>
        <h2 style={{ margin: '0 0 0.5rem' }}>@{profile.username}</h2>
        <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
          Member since {profile.created_at ? formatDate(profile.created_at) : 'recently'}
        </p>

        {!isOwnProfile && (
          <button
            onClick={handleStartChat}
            disabled={startingChat}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1.5rem',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {startingChat ? 'Starting...' : '?? Message'}
          </button>
        )}

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

      {isOwnProfile && (
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <button
            onClick={() => setActiveTab('posts')}
            style={{
              padding: '0.5rem 1.5rem',
              background: activeTab === 'posts' ? '#1ABC9C' : '#f5f5f5',
              color: activeTab === 'posts' ? '#fff' : '#2C3E50',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '0.5rem 1.5rem',
              background: activeTab === 'settings' ? '#1ABC9C' : '#f5f5f5',
              color: activeTab === 'settings' ? '#fff' : '#2C3E50',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Settings
          </button>
        </div>
      )}

      {activeTab === 'posts' ? (
        <>
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
        </>
      ) : (
        <ProfileSettings
          username={profile.username}
          avatarUrl={profile.avatar_url}
          onSave={handleSaveSettings}
        />
      )}
    </main>
  );
}