'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Circle metadata
const CIRCLES: Record<string, { name: string; emoji: string }> = {
  'love-relationships': { name: 'Love & Relationships', emoji: '💔' },
  'mental-health': { name: 'Depression Support', emoji: '🧠' },
  'job-stress': { name: 'Job & Purpose', emoji: '💼' },
  'secrets': { name: 'Identity', emoji: '🧩' },
  'healing-growth': { name: 'Healing Journey', emoji: '🌱' },
  'loneliness': { name: 'Loneliness', emoji: '😔' },
  'home-trauma': { name: 'Family & Trauma', emoji: '🏠' },
  'discrimination': { name: 'Injustice', emoji: '⚖️' },
};

// Mock posts for demo
const MOCK_POSTS = [
  {
    id: 1,
    content: 'I still think about them every night. Three years later and the pain hasn\'t faded. I wonder if it ever will.',
    timestamp: '2h ago',
    reactions: 234,
    comments: 45,
  },
  {
    id: 2,
    content: 'Today I finally blocked their number. It took everything I had, but I did it. Small victories matter.',
    timestamp: '4h ago',
    reactions: 567,
    comments: 89,
  },
  {
    id: 3,
    content: 'Why do I keep falling for people who can\'t love me back? There must be something wrong with me.',
    timestamp: '6h ago',
    reactions: 189,
    comments: 67,
  },
  {
    id: 4,
    content: 'Sometimes I think the loneliest place is lying next to someone who doesn\'t see you anymore.',
    timestamp: '8h ago',
    reactions: 423,
    comments: 112,
  },
  {
    id: 5,
    content: 'I\'m learning that closure isn\'t something they give you. It\'s something you give yourself.',
    timestamp: '12h ago',
    reactions: 892,
    comments: 156,
  },
];

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export default function CircleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const circleId = params?.circleId as string;
  const circle = CIRCLES[circleId];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [reactedPosts, setReactedPosts] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  // Handle scroll snap
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isScrolling.current) return;
    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const height = container.clientHeight;
    const newIndex = Math.round(scrollTop / height);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < posts.length) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, posts.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleReact = (postId: number) => {
    setReactedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        setPosts(posts.map(p => p.id === postId ? { ...p, reactions: p.reactions - 1 } : p));
      } else {
        newSet.add(postId);
        setPosts(posts.map(p => p.id === postId ? { ...p, reactions: p.reactions + 1 } : p));
      }
      return newSet;
    });
  };

  const handleSave = (postId: number) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  if (!circle) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0f172a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <p style={{ color: '#fff' }}>Circle not found</p>
        <button
          onClick={() => router.push('/circles')}
          style={{
            padding: '12px 24px',
            background: '#0d9488',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Back to Circles
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        height: '100vh',
        background: '#0f172a',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '16px 20px',
          background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.9) 0%, transparent 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <button
          onClick={() => router.push('/circles')}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          ←
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>{circle.emoji}</span>
          <h1
            style={{
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {circle.name}
          </h1>
        </div>
      </div>

      {/* Vertical Scroll Feed */}
      <div
        ref={containerRef}
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {posts.map((post, index) => (
          <div
            key={post.id}
            style={{
              height: '100vh',
              scrollSnapAlign: 'start',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 20px',
              position: 'relative',
            }}
          >
            {/* Post Content */}
            <div
              style={{
                maxWidth: '340px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  color: '#fff',
                  fontSize: '1.4rem',
                  lineHeight: 1.6,
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                &ldquo;{post.content}&rdquo;
              </p>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.8rem',
                  marginTop: '24px',
                }}
              >
                {post.timestamp}
              </p>
            </div>

            {/* Action Stack */}
            <div
              style={{
                position: 'absolute',
                right: '16px',
                bottom: '140px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'center',
              }}
            >
              {/* React */}
              <button
                onClick={() => handleReact(post.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: '1.8rem',
                    filter: reactedPosts.has(post.id) ? 'none' : 'grayscale(100%)',
                    transition: 'filter 0.2s',
                  }}
                >
                  🤍
                </span>
                <span style={{ color: '#fff', fontSize: '0.75rem' }}>
                  {formatCount(post.reactions)}
                </span>
              </button>

              {/* Comments */}
              <button
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>💬</span>
                <span style={{ color: '#fff', fontSize: '0.75rem' }}>
                  {formatCount(post.comments)}
                </span>
              </button>

              {/* Save */}
              <button
                onClick={() => handleSave(post.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: '1.8rem',
                    color: savedPosts.has(post.id) ? '#0d9488' : '#fff',
                  }}
                >
                  🔖
                </span>
                <span style={{ color: '#fff', fontSize: '0.75rem' }}>Save</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Share to Circle Button */}
      <button
        onClick={() => router.push(`/create?circle=${circleId}`)}
        style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '14px 28px',
          background: '#0d9488',
          border: 'none',
          borderRadius: '28px',
          color: '#fff',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 20px rgba(13, 148, 136, 0.4)',
          zIndex: 100,
        }}
      >
        <span>✍️</span>
        Share to this Circle
      </button>

      {/* Bottom Nav */}
      <BottomNav circleId={circleId} />
    </div>
  );
}

function BottomNav({ circleId }: { circleId: string }) {
  const router = useRouter();
  const navItems = [
    { path: '/foryou', icon: '🏠', label: 'Home' },
    { path: '/circles', icon: '🌀', label: 'Circles', active: true },
    { path: '/notifications', icon: '🔔', label: 'Inbox' },
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
            opacity: item.active ? 1 : 0.6,
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
          <span style={{ fontSize: '0.65rem', color: '#fff' }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
