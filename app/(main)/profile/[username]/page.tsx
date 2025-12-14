'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface ProfileData {
  username: string;
  bio: string;
  avatarIcon: string;
  postCount: number;
  feelsGiven: number;
  supportSent: number;
  isOwnProfile: boolean;
}

interface Post {
  id: string;
  content: string;
  postType: string;
  reactionCount: number;
  createdAt: string;
}

// Avatar emoji mapping
const AVATAR_EMOJIS: Record<string, string> = {
  spiral: '🌀', butterfly: '🦋', wave: '🌊', flower: '🌸', moon: '🌙', star: '⭐',
  flame: '🔥', sparkle: '💫', leaf: '🌿', mask: '🎭', gem: '💎', rainbow: '🌈',
  cloud: '☁️', heart: '💜', feather: '🪶', lotus: '🪷', default: '👤',
};

// Mock data
const mockProfile: ProfileData = {
  username: 'silentvoice_83',
  bio: 'Learning to speak honestly. One word at a time.',
  avatarIcon: 'spiral',
  postCount: 47,
  feelsGiven: 234,
  supportSent: 89,
  isOwnProfile: true,
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

  const [profile] = useState<ProfileData>(mockProfile);
  const [posts] = useState<Post[]>(mockPosts);

  const avatarEmoji = AVATAR_EMOJIS[profile.avatarIcon] || AVATAR_EMOJIS.default;

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
          ⚙️
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
            fontSize: '3rem',
            margin: '0 auto 16px',
          }}
        >
          {avatarEmoji}
        </div>

        {/* Username */}
        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, margin: '0 0 8px' }}>
          @{profile.username}
        </h2>

        {/* Bio */}
        {profile.bio && (
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              maxWidth: '300px',
              margin: '0 auto 24px',
            }}
          >
            {profile.bio}
          </p>
        )}

        {/* Stats - No vanity metrics, just engagement given */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginBottom: '24px',
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700 }}>
              {profile.postCount}
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>Posts</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#0d9488', fontSize: '1.25rem', fontWeight: 700 }}>
              {profile.feelsGiven}
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>Feels Given</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#7c3aed', fontSize: '1.25rem', fontWeight: 700 }}>
              {profile.supportSent}
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>Support Sent</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            href={`/profile/${username}/posts`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>📝</span>
            <span style={{ flex: 1 }}>My Posts</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
          </Link>

          <Link
            href="/saved"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>🔖</span>
            <span style={{ flex: 1 }}>Saved Posts</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
          </Link>

          <Link
            href="/circles"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>🌀</span>
            <span style={{ flex: 1 }}>My Circles</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
          </Link>

          <Link
            href="/settings"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>⚙️</span>
            <span style={{ flex: 1 }}>Settings</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
          </Link>
        </div>
      </div>

      {/* Recent Posts Preview */}
      <div style={{ padding: '24px 20px' }}>
        <h3 style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Recent Posts
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              style={{
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                borderLeft: `3px solid ${
                  post.postType === 'experience' ? '#0d9488' :
                  post.postType === 'question' ? '#7c3aed' :
                  post.postType === 'advice' ? '#3b82f6' : '#ef4444'
                }`,
              }}
            >
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', margin: 0, lineHeight: 1.4 }}>
                {post.content.length > 80 ? post.content.slice(0, 80) + '...' : post.content}
              </p>
              <div style={{ marginTop: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
                🤍 {post.reactionCount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav currentPath="/profile" />
    </div>
  );
}

// Bottom Navigation Component
function BottomNav({ currentPath }: { currentPath: string }) {
  const router = useRouter();

  const navItems = [
    { path: '/foryou', icon: '🏠', label: 'Home' },
    { path: '/explore', icon: '🔍', label: 'Explore' },
    { path: '/messages', icon: '💬', label: 'Messages' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  return (
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
        backdropFilter: 'blur(10px)',
      }}
    >
      {navItems.map((item) => (
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
            opacity: currentPath.startsWith(item.path) ? 1 : 0.6,
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
          <span style={{ fontSize: '0.65rem', color: '#fff' }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
