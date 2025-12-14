'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Avatar mapping
const AVATARS: Record<string, string> = {
  spiral: '🌀', butterfly: '🦋', wave: '🌊', flower: '🌸',
  moon: '🌙', star: '⭐', flame: '🔥', sparkle: '✨',
  leaf: '🍃', mask: '🎭', gem: '💎', rainbow: '🌈',
  cloud: '☁️', heart: '💜', feather: '🪶', lotus: '🪷',
};

// Mock data
const MOCK_REQUESTS = [
  {
    id: 1,
    avatar: 'wave',
    username: 'anonymous_123',
    message: 'Hi, your post really resonated with me...',
    timestamp: '2h ago',
  },
  {
    id: 2,
    avatar: 'butterfly',
    username: 'healing_soul',
    message: 'I went through something similar...',
    timestamp: '1d ago',
  },
];

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    avatar: 'moon',
    username: 'quietmind_402',
    lastMessage: 'Thank you for sharing that. It helped me understand...',
    timestamp: '2h ago',
    unread: 2,
  },
  {
    id: 2,
    avatar: 'star',
    username: 'nightowl_99',
    lastMessage: 'Take care of yourself 💚',
    timestamp: '1d ago',
    unread: 0,
  },
  {
    id: 3,
    avatar: 'leaf',
    username: 'growthjourney',
    lastMessage: 'Yes, exactly! That\'s how I felt too',
    timestamp: '3d ago',
    unread: 0,
  },
];

export default function MessagesPage() {
  const router = useRouter();
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [conversations] = useState(MOCK_CONVERSATIONS);
  const [isVisible, setIsVisible] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = (requestId: number) => {
    setRemovingId(requestId);
    setTimeout(() => {
      setRequests(requests.filter((r) => r.id !== requestId));
      setRemovingId(null);
    }, 300);
  };

  const handleDecline = (requestId: number) => {
    setRemovingId(requestId);
    setTimeout(() => {
      setRequests(requests.filter((r) => r.id !== requestId));
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
          transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
          opacity: isVisible ? 1 : 0,
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
          Messages
        </h1>
      </div>

      {/* Consent Notice */}
      <div
        style={{
          margin: '16px 20px',
          padding: '12px 16px',
          background: 'rgba(124, 58, 237, 0.1)',
          borderRadius: '12px',
          borderLeft: '3px solid #7c3aed',
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
          <span style={{ animation: 'pulse 2s ease-in-out infinite' }}>🛡️</span>
          Messages require consent. You control who can talk to you.
        </p>
      </div>

      {/* Requests Section */}
      {requests.length > 0 && (
        <div 
          style={{ 
            padding: '0 20px', 
            marginBottom: '24px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: '0.15s',
          }}
        >
          <h2
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            Requests ({requests.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {requests.map((request, index) => (
              <div
                key={request.id}
                style={{
                  padding: '16px',
                  background: 'rgba(124, 58, 237, 0.08)',
                  borderRadius: '16px',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                  opacity: removingId === request.id ? 0 : 1,
                  transform: removingId === request.id ? 'translateX(-100%)' : 'translateX(0)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: isVisible ? `fadeInUp 0.4s ease ${0.2 + index * 0.1}s backwards` : 'none',
                }}
              >
                <div style={{ display: 'flex', gap: '12px' }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                      flexShrink: 0,
                      animation: 'float 3s ease-in-out infinite',
                    }}
                  >
                    {AVATARS[request.avatar] || '🌀'}
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>
                        @{request.username}
                      </span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.7rem' }}>
                        {request.timestamp}
                      </span>
                    </div>
                    <p
                      style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.85rem',
                        margin: '6px 0 12px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {request.message}
                    </p>
                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleAccept(request.id)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: '#0d9488',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(13, 148, 136, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.3)';
                        }}
                        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
                        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(request.id)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: 'none',
                          borderRadius: '8px',
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
                        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
                        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversations Section */}
      <div 
        style={{ 
          padding: '0 20px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: '0.25s',
        }}
      >
        <h2
          style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}
        >
          Conversations
        </h2>
        {conversations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <span style={{ fontSize: '3rem', display: 'block', animation: 'float 3s ease-in-out infinite' }}>💬</span>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '16px' }}>
              No conversations yet
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {conversations.map((convo, index) => (
              <button
                key={convo.id}
                onClick={() => router.push(`/messages/${convo.id}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: 'none',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: isVisible ? `fadeInUp 0.4s ease ${0.3 + index * 0.08}s backwards` : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
                onMouseUp={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    flexShrink: 0,
                    position: 'relative',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  {AVATARS[convo.avatar] || '🌀'}
                  {convo.unread > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: '18px',
                        height: '18px',
                        background: '#0d9488',
                        borderRadius: '50%',
                        fontSize: '0.65rem',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        animation: 'pulse 2s ease-in-out infinite',
                        boxShadow: '0 0 10px rgba(13, 148, 136, 0.5)',
                      }}
                    >
                      {convo.unread}
                    </span>
                  )}
                </div>
                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        color: '#fff',
                        fontSize: '0.95rem',
                        fontWeight: convo.unread > 0 ? 600 : 400,
                      }}
                    >
                      @{convo.username}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.7rem' }}>
                      {convo.timestamp}
                    </span>
                  </div>
                  <p
                    style={{
                      color: convo.unread > 0 ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                      fontSize: '0.85rem',
                      margin: '4px 0 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {convo.lastMessage}
                  </p>
                </div>
                {/* Arrow indicator */}
                <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '1rem' }}>›</span>
              </button>
            ))}
          </div>
        )}
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
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
          <span style={{ fontSize: '0.65rem', color: '#fff' }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
