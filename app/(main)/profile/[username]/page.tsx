'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface ProfileData {
  username: string;
  bio: string;
  avatarIcon: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
  isOwnProfile: boolean;
}

interface Post {
  id: string;
  content: string;
  postType: string;
  reactionCount: number;
  createdAt: string;
}

// Mock data
const mockProfile: ProfileData = {
  username: 'silentvoice_83',
  bio: 'Learning to speak honestly. One word at a time.',
  avatarIcon: 'default',
  postCount: 47,
  followerCount: 1234,
  followingCount: 89,
  isFollowing: false,
  isOwnProfile: false,
};

const mockPosts: Post[] = [
  {
    id: '1',
    content: 'I smile at work every day, but when I get home, I feel empty and exhausted.',
    postType: 'experience',
    reactionCount: 1247,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: '2',
    content: 'Sometimes the hardest thing is admitting you need help.',
    postType: 'release',
    reactionCount: 892,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: '3',
    content: 'To anyone struggling today: you made it this far. That counts for something.',
    postType: 'advice',
    reactionCount: 2341,
    createdAt: new Date(Date.now() - 72 * 3600000).toISOString(),
  },
];

function formatCount(count: number): string {
  if (count < 1000) return count.toString();
  if (count < 10000) return (count / 1000).toFixed(1) + 'K';
  return Math.floor(count / 1000) + 'K';
}

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  const [profile, setProfile] = useState<ProfileData>(mockProfile);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'about'>('posts');

  const handleFollow = () => {
    setProfile(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      followerCount: prev.isFollowing ? prev.followerCount - 1 : prev.followerCount + 1,
    }));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        paddingBottom: '80px',
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          ←
        </button>

        <h1 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
          @{profile.username}
        </h1>

        <button
          onClick={() => router.push('/settings')}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          {profile.isOwnProfile ? '⚙️' : '⋮'}
        </button>
      </header>

      {/* Profile Info */}
      <div style={{ padding: '24px 20px', textAlign: 'center' }}>
        {/* Avatar */}
        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            margin: '0 auto 16px',
          }}
        >
          {profile.avatarIcon === 'default' ? '👤' : profile.avatarIcon}
        </div>

        {/* Username */}
        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, margin: '0 0 8px' }}>
          @{profile.username}
        </h2>

        {/* Bio */}
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.95rem',
            lineHeight: 1.5,
            maxWidth: '300px',
            margin: '0 auto 20px',
          }}
        >
          {profile.bio}
        </p>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginBottom: '20px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700 }}>
              {formatCount(profile.postCount)}
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>Posts</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700 }}>
              {formatCount(profile.followerCount)}
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>Followers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700 }}>
              {formatCount(profile.followingCount)}
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>Following</div>
          </div>
        </div>

        {/* Action Buttons */}
        {profile.isOwnProfile ? (
          <button
            onClick={() => router.push('/settings/profile')}
            style={{
              padding: '10px 40px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={handleFollow}
              style={{
                padding: '10px 32px',
                background: profile.isFollowing ? 'transparent' : '#0d9488',
                border: profile.isFollowing ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {profile.isFollowing ? 'Following' : 'Follow'}
            </button>
            <button
              onClick={() => {}}
              style={{
                padding: '10px 20px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Message
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {(['posts', 'saved', 'about'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '14px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #0d9488' : '2px solid transparent',
              color: activeTab === tab ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {tab === 'posts' ? '📝' : tab === 'saved' ? '🔖' : 'ℹ️'} {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {activeTab === 'posts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.id}`}
                style={{
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    margin: '0 0 12px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.content}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>
                    ❤️ {formatCount(post.reactionCount)}
                  </span>
                  <span
                    style={{
                      padding: '4px 8px',
                      background: 'rgba(13, 148, 136, 0.2)',
                      borderRadius: '12px',
                      color: '#0d9488',
                      fontSize: '0.7rem',
                      textTransform: 'capitalize',
                    }}
                  >
                    {post.postType}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <span style={{ fontSize: '3rem' }}>🔖</span>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '16px' }}>
              {profile.isOwnProfile ? 'Posts you save will appear here' : 'Saved posts are private'}
            </p>
          </div>
        )}

        {activeTab === 'about' && (
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem', marginBottom: '8px' }}>
                JOINED
              </h3>
              <p style={{ color: '#fff', margin: 0 }}>December 2024</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem', marginBottom: '8px' }}>
                MOST USED TAGS
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['healing', 'work', 'growth'].map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(13, 148, 136, 0.2)',
                      borderRadius: '16px',
                      color: '#0d9488',
                      fontSize: '0.85rem',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 100,
        }}
      >
        {[
          { path: '/foryou', icon: '🏠', label: 'Home' },
          { path: '/explore', icon: '🔍', label: 'Explore' },
          { path: '/notifications', icon: '🔔', label: 'Inbox' },
          { path: '/profile', icon: '👤', label: 'Profile', active: true },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px',
              opacity: item.active ? 1 : 0.6,
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
            <span style={{ fontSize: '0.65rem', color: '#fff' }}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
