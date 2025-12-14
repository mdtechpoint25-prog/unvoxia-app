'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  data?: any;
}

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
    case 'warning': return '⚠️';
    case 'system': return '🔔';
    default: return '🔔';
  }
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'messages'>('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notifications');
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch notifications');
      }
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      setError('Failed to load notifications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const markAllRead = async () => {
    try {
      await fetch('/api/notifications/mark-all-read', { method: 'POST' });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  const filteredNotifications = activeTab === 'messages'
    ? notifications.filter(n => n.type === 'message')
    : notifications;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
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
          borderBottom: '1px solid var(--border-subtle)',
          position: 'sticky',
          top: 0,
          background: 'rgba(26, 26, 26, 0.9)',
          backdropFilter: 'blur(20px)',
          zIndex: 10,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
          Inbox
          {unreadCount > 0 && (
            <span
              style={{
                marginLeft: '10px',
                padding: '4px 10px',
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: 600,
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
              background: 'var(--overlay-low)',
              border: 'none',
              color: 'var(--accent)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '100px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
          >
            Mark all read
          </button>
        )}
      </header>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-subtle)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease 0.1s',
          padding: '0 16px',
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
              borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
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
      <div style={{ padding: '12px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="animate-spin" style={{ width: '32px', height: '32px', border: '3px solid var(--overlay-medium)', borderTopColor: 'var(--accent)', borderRadius: '50%', margin: '0 auto' }} />
            <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>Loading notifications...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <span style={{ fontSize: '3rem', display: 'block' }}>⚠️</span>
            <p style={{ color: 'var(--error)', marginTop: '16px' }}>{error}</p>
            <button onClick={fetchNotifications} style={{ marginTop: '12px', padding: '10px 20px', background: 'var(--accent)', border: 'none', borderRadius: '100px', color: 'var(--bg-primary)', cursor: 'pointer', fontWeight: 600 }}>
              Retry
            </button>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '16px' }}>🔔</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              {activeTab === 'messages' ? 'No message requests yet' : 'No notifications yet'}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '8px' }}>
              When you get notifications, they'll show up here
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <div
              key={notification.id}
              style={{
                width: '100%',
                display: 'flex',
                gap: '14px',
                padding: '16px',
                background: notification.read ? 'var(--bg-surface)' : 'rgba(212, 168, 85, 0.05)',
                borderRadius: '16px',
                marginBottom: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                border: '1px solid var(--border-subtle)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                animation: isVisible ? `slideIn 0.4s ease ${0.1 + index * 0.05}s backwards` : 'none',
              }}
              onClick={() => {
                markAsRead(notification.id);
                if (notification.type === 'follow' && notification.data?.username) {
                  router.push(`/profile/${notification.data.username}`);
                } else if (notification.type === 'message') {
                  router.push('/messages');
                }
              }}
            >
              {/* Avatar with icon overlay */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, var(--accent), var(--accent-bright))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}
                >
                  👤
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    right: '-4px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--bg-primary)',
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
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                    {notification.title}
                  </span>
                  {!notification.read && (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                      }}
                    />
                  )}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                  {notification.message}
                </p>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '6px', display: 'block' }}>
                  {formatTime(notification.created_at)}
                </span>
              </div>

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }}
                style={{
                  background: 'var(--overlay-low)',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '8px',
                  fontSize: '1rem',
                  borderRadius: '10px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ×
              </button>
            </div>
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
          height: '70px',
          background: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 100,
          padding: '0 20px',
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
              background: item.active ? 'var(--overlay-low)' : 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 20px',
              borderRadius: '12px',
              opacity: item.active ? 1 : 0.6,
              transition: 'all 0.2s ease',
            }}
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
