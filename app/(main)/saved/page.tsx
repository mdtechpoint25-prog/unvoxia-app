'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Mock saved posts
const MOCK_SAVED = [
  {
    id: 1,
    content: 'To whoever needs to hear this today: You are not behind. You are not failing. You are exactly where you need to be.',
    tags: ['selfcare', 'reminder'],
    savedAt: '5 days ago',
  },
  {
    id: 2,
    content: 'Sometimes healing isn\'t about becoming a new person. It\'s about becoming the person you were before all the hurt changed you.',
    tags: ['healing', 'growth'],
    savedAt: '2 weeks ago',
  },
  {
    id: 3,
    content: 'The loneliest moment in someone\'s life is when they are watching their whole world fall apart, and all they can do is stare blankly.',
    tags: ['loneliness'],
    savedAt: '3 weeks ago',
  },
  {
    id: 4,
    content: 'You don\'t have to be positive all the time. It\'s perfectly okay to feel sad, angry, annoyed, frustrated, scared and anxious.',
    tags: ['mentalhealth', 'feelings'],
    savedAt: '1 month ago',
  },
];

export default function SavedPostsPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(MOCK_SAVED);
  const [isVisible, setIsVisible] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleUnsave = (postId: number) => {
    setRemovingId(postId);
    setTimeout(() => {
      setSaved(saved.filter((p) => p.id !== postId));
      setRemovingId(null);
    }, 300);
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
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '16px 20px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '4px',
            transition: 'transform 0.2s ease',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          ←
        </button>
        <h1
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#fff',
            margin: 0,
          }}
        >
          Saved for You
        </h1>
      </div>

      {/* Privacy Note */}
      <div
        style={{
          margin: '16px 20px',
          padding: '12px 16px',
          background: 'rgba(13, 148, 136, 0.1)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: '0.1s',
        }}
      >
        <span>🔒</span>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.8rem',
            margin: 0,
          }}
        >
          Your saved posts are private. Only you can see them.
        </p>
      </div>

      {/* Saved Posts List */}
      {saved.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.4s ease 0.2s',
          }}
        >
          <span style={{ fontSize: '4rem', display: 'block', animation: 'float 3s ease-in-out infinite' }}>🔖</span>
          <h2
            style={{
              color: '#fff',
              fontSize: '1.25rem',
              marginTop: '20px',
            }}
          >
            Nothing saved yet
          </h2>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.9rem',
              marginTop: '8px',
            }}
          >
            Posts you save will appear here
          </p>
          <button
            onClick={() => router.push('/foryou')}
            style={{
              marginTop: '24px',
              padding: '12px 24px',
              background: '#0d9488',
              border: 'none',
              borderRadius: '24px',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(13, 148, 136, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(13, 148, 136, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(13, 148, 136, 0.3)';
            }}
          >
            Explore Feed
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '0 20px',
          }}
        >
          {saved.map((post, index) => (
            <div
              key={post.id}
              style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                opacity: removingId === post.id ? 0 : (isVisible ? 1 : 0),
                transform: removingId === post.id ? 'translateX(-100%)' : (isVisible ? 'translateY(0)' : 'translateY(20px)'),
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: isVisible ? `fadeInUp 0.4s ease ${0.15 + index * 0.08}s backwards` : 'none',
              }}
            >
              {/* Content */}
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  margin: '0 0 12px',
                }}
              >
                &ldquo;{post.content}&rdquo;
              </p>

              {/* Tags */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '12px',
                }}
              >
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 10px',
                      background: 'rgba(13, 148, 136, 0.15)',
                      borderRadius: '12px',
                      color: '#0d9488',
                      fontSize: '0.75rem',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.75rem',
                  }}
                >
                  Saved {post.savedAt}
                </span>
                <button
                  onClick={() => handleUnsave(post.id)}
                  style={{
                    padding: '6px 12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNav />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

function BottomNav() {
  const router = useRouter();
  const navItems = [
    { path: '/foryou', icon: '🏠', label: 'Home' },
    { path: '/circles', icon: '🌀', label: 'Circles' },
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
            opacity: 0.6,
            transition: 'all 0.2s ease',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
          <span style={{ fontSize: '0.65rem', color: '#fff' }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
