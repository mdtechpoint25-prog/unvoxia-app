'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Circle data
const CIRCLES = [
  { id: 'love-relationships', name: 'Love & Relationships', emoji: '💔', count: 2347 },
  { id: 'mental-health', name: 'Depression Support', emoji: '🧠', count: 5123 },
  { id: 'job-stress', name: 'Job & Purpose', emoji: '💼', count: 1892 },
  { id: 'secrets', name: 'Identity', emoji: '🧩', count: 892 },
  { id: 'healing-growth', name: 'Healing Journey', emoji: '🌱', count: 3412 },
  { id: 'loneliness', name: 'Loneliness', emoji: '😔', count: 1567 },
  { id: 'home-trauma', name: 'Family & Trauma', emoji: '🏠', count: 2089 },
  { id: 'discrimination', name: 'Injustice', emoji: '⚖️', count: 743 },
];

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export default function CirclesPage() {
  const router = useRouter();
  const [joinedCircles, setJoinedCircles] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [animatingJoin, setAnimatingJoin] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleJoin = (circleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimatingJoin(circleId);
    
    setJoinedCircles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(circleId)) {
        newSet.delete(circleId);
      } else {
        newSet.add(circleId);
      }
      return newSet;
    });
    
    setTimeout(() => setAnimatingJoin(null), 400);
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
          transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Safe Circles
        </h1>
        <p
          style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.85rem',
            marginTop: '4px',
          }}
        >
          Find your community
        </p>
      </div>

      {/* Trust Badge */}
      <div
        style={{
          margin: '16px 20px',
          padding: '12px 16px',
          background: 'rgba(13, 148, 136, 0.1)',
          borderRadius: '12px',
          borderLeft: '3px solid #0d9488',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: '0.1s',
        }}
      >
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.8rem',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ animation: 'pulse 2s ease-in-out infinite' }}>🔒</span>
          Everything shared in Circles is anonymous
        </p>
      </div>

      {/* Circle List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '0 20px',
        }}
      >
        {CIRCLES.map((circle, index) => {
          const isJoined = joinedCircles.has(circle.id);
          const isAnimating = animatingJoin === circle.id;
          return (
            <button
              key={circle.id}
              onClick={() => router.push(`/circles/${circle.id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                animation: isVisible ? `fadeInUp 0.4s ease ${0.15 + index * 0.05}s backwards` : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(13, 148, 136, 0.3)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              {/* Circle Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0,
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {circle.emoji}
              </div>

              {/* Circle Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 600,
                    margin: '0 0 4px',
                  }}
                >
                  {circle.name}
                </h3>
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.8rem',
                    margin: 0,
                  }}
                >
                  {formatCount(circle.count)} sharing
                </p>
              </div>

              {/* Join Button */}
              <button
                onClick={(e) => handleJoin(circle.id, e)}
                style={{
                  padding: '8px 16px',
                  background: isJoined ? 'transparent' : '#0d9488',
                  border: isJoined ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                  borderRadius: '20px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isAnimating ? 'scale(1.15)' : 'scale(1)',
                  boxShadow: !isJoined ? '0 4px 12px rgba(13, 148, 136, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isJoined) {
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(13, 148, 136, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isJoined) {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.3)';
                  }
                }}
              >
                {isJoined ? '✓ Joined' : 'Join'}
              </button>
            </button>
          );
        })}
      </div>

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
          50% { transform: translateY(-3px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

function BottomNav() {
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
