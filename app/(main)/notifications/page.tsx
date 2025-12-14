'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'reaction' | 'comment' | 'follow' | 'message';
  actorUsername: string;
  postPreview?: string;
  message?: string;
  isRead: boolean;
  createdAt: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'reaction',
    actorUsername: 'healingjourney_21',
    postPreview: 'I smile at work every day...',
    isRead: false,
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: '2',
    type: 'comment',
    actorUsername: 'kindspirit_22',
    postPreview: 'I smile at work every day...',
    message: 'This hits so close to home. You\'re not alone...',
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: '3',
    type: 'follow',
    actorUsername: 'quietmind_402',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: '4',
    type: 'reaction',
    actorUsername: 'gentlesoul_91',
    postPreview: 'Sometimes the hardest thing is admitting...',
    isRead: true,
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
  {
    id: '5',
    type: 'message',
    actorUsername: 'anonymous_heart',
    message: 'Sent you a message request',
    isRead: true,
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
  },
  {
    id: '6',
    type: 'follow',
    actorUsername: 'broken_but_breathing',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
];

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString();
}

function getNotificationIcon(type: string): string {
  switch (type) {
    case 'reaction': return '❤️';
    case 'comment': return '💬';
    case 'follow': return '👤';
    case 'message': return '✉️';
    default: return '🔔';
  }
}

function getNotificationText(notification: Notification): string {
  switch (notification.type) {
    case 'reaction':
      return `felt your post`;
    case 'comment':
      return `responded to your post`;
    case 'follow':
      return `started following you`;
    case 'message':
      return `wants to send you a message`;
    default:
      return '';
  }
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<'all' | 'messages'>('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const filteredNotifications = activeTab === 'messages'
    ? notifications.filter(n => n.type === 'message')
    : notifications;

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
          position: 'sticky',
          top: 0,
          background: '#0f172a',
          zIndex: 10,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <h1 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
          Inbox
          {unreadCount > 0 && (
            <span
              style={{
                marginLeft: '8px',
                padding: '2px 8px',
                background: '#ef4444',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 500,
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              {unreadCount}
            </span>
          )}
        </h1>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{
              background: 'none',
              border: 'none',
              color: '#0d9488',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Mark all read
          </button>
        )}
      </header>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease 0.1s',
        }}
      >
        {(['all', 'messages'] as const).map((tab) => (
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
              transition: 'all 0.2s ease',
            }}
          >
            {tab === 'all' ? 'Activity' : 'Messages'}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div>
        {filteredNotifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <span style={{ fontSize: '3rem', display: 'block', animation: 'float 3s ease-in-out infinite' }}>🔔</span>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '16px' }}>
              {activeTab === 'messages' ? 'No message requests yet' : 'No notifications yet'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <button
              key={notification.id}
              onClick={() => {
                markAsRead(notification.id);
                // Navigate based on type
                if (notification.type === 'follow') {
                  router.push(`/profile/${notification.actorUsername}`);
                } else if (notification.type === 'message') {
                  router.push('/messages');
                }
              }}
              style={{
                width: '100%',
                display: 'flex',
                gap: '12px',
                padding: '16px 20px',
                background: notification.isRead ? 'transparent' : 'rgba(13, 148, 136, 0.05)',
                border: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                animation: isVisible ? `slideIn 0.4s ease ${0.1 + index * 0.05}s backwards` : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = notification.isRead ? 'transparent' : 'rgba(13, 148, 136, 0.05)';
              }}
            >
              {/* Avatar with icon overlay */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                  }}
                >
                  👤
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                    @{notification.actorUsername}
                  </span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>
                    {formatTime(notification.createdAt)}
                  </span>
                  {!notification.isRead && (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#0d9488',
                      }}
                    />
                  )}
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
                  {getNotificationText(notification)}
                </p>
                {notification.postPreview && (
                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.4)',
                      fontSize: '0.85rem',
                      margin: '4px 0 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    "{notification.postPreview}"
                  </p>
                )}
                {notification.message && notification.type === 'comment' && (
                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.85rem',
                      margin: '4px 0 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    "{notification.message}"
                  </p>
                )}
              </div>
            </button>
          ))
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
          { path: '/notifications', icon: '🔔', label: 'Inbox', active: true },
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

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
