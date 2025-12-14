'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TrendingTag {
  name: string;
  postCount: number;
}

interface Circle {
  id: string;
  name: string;
  description: string;
  icon: string;
  memberCount: number;
}

const trendingTags: TrendingTag[] = [
  { name: 'healing', postCount: 12453 },
  { name: 'burnout', postCount: 8921 },
  { name: 'loneliness', postCount: 7654 },
  { name: 'growth', postCount: 6234 },
  { name: 'anxiety', postCount: 5891 },
  { name: 'hope', postCount: 4567 },
  { name: 'relationships', postCount: 4123 },
  { name: 'selfcare', postCount: 3892 },
];

const circles: Circle[] = [
  { id: 'circle-love', name: 'Love & Relationships', description: 'Matters of the heart', icon: '❤️', memberCount: 24567 },
  { id: 'circle-mental', name: 'Mental Health', description: 'Depression, anxiety, and healing', icon: '🧠', memberCount: 31245 },
  { id: 'circle-work', name: 'Work & Career', description: 'Job stress, burnout, and growth', icon: '💼', memberCount: 18934 },
  { id: 'circle-family', name: 'Family & Home', description: 'Parents, siblings, and family', icon: '🏠', memberCount: 15678 },
  { id: 'circle-life', name: 'Life Direction', description: 'Finding purpose and meaning', icon: '🧭', memberCount: 12345 },
  { id: 'circle-secrets', name: 'Secrets & Confessions', description: 'Things you\'ve never told anyone', icon: '🔒', memberCount: 28901 },
];

function formatCount(count: number): string {
  if (count < 1000) return count.toString();
  if (count < 10000) return (count / 1000).toFixed(1) + 'K';
  return Math.floor(count / 1000) + 'K';
}

export default function ExplorePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        paddingBottom: '80px',
      }}
    >
      {/* Search Header */}
      <header
        style={{
          padding: '16px 20px',
          position: 'sticky',
          top: 0,
          background: '#0f172a',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts, tags, or voices..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
            >
              ×
            </button>
          )}
        </div>
      </header>

      <div style={{ padding: '0 20px' }}>
        {/* Trending Tags */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>
            Trending Now
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {trendingTags.map((tag, index) => (
              <Link
                key={tag.name}
                href={`/explore?tag=${tag.name}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: index < 3 ? 'rgba(13, 148, 136, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: index < 3 ? '1px solid rgba(13, 148, 136, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  textDecoration: 'none',
                }}
              >
                <span style={{ color: index < 3 ? '#0d9488' : 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                  #{tag.name}
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem' }}>
                  {formatCount(tag.postCount)}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Circles */}
        <section>
          <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>
            Circles
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {circles.map((circle) => (
              <Link
                key={circle.id}
                href={`/circles/${circle.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(124, 58, 237, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}
                >
                  {circle.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, margin: '0 0 4px' }}>
                    {circle.name}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem', margin: 0 }}>
                    {circle.description}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem' }}>
                    {formatCount(circle.memberCount)}
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.7rem' }}>
                    members
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Type */}
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>
            Browse by Type
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { type: 'experience', icon: '📖', label: 'Experiences', color: '#0d9488' },
              { type: 'question', icon: '❓', label: 'Questions', color: '#7c3aed' },
              { type: 'advice', icon: '💡', label: 'Advice', color: '#3b82f6' },
              { type: 'release', icon: '🌊', label: 'Releases', color: '#ef4444' },
            ].map((item) => (
              <Link
                key={item.type}
                href={`/explore?type=${item.type}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '20px',
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: '12px',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <span style={{ color: item.color, fontSize: '0.9rem', fontWeight: 500 }}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
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
          { path: '/explore', icon: '🔍', label: 'Explore', active: true },
          { path: '/notifications', icon: '🔔', label: 'Inbox' },
          { path: '/profile', icon: '👤', label: 'Profile' },
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
