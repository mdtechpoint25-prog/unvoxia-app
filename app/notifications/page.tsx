'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
  link: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    try {
      const cookies = document.cookie.split(';');
      const sessionCookie = cookies.find(c => c.trim().startsWith('session='));
      if (sessionCookie) {
        setIsLoggedIn(true);
      }
    } catch {}

    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (res.ok) {
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      console.error('Fetch notifications error:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true })
      });
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (err) {
      console.error('Mark as read error:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications/mark-all-read', {
        method: 'POST'
      });
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Mark all as read error:', err);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'reaction': return '❤️';
      case 'comment': return '💬';
      case 'chat_request': return '✉️';
      case 'badge': return '🏆';
      case 'system': return '📢';
      default: return '🔔';
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'reaction': return 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
      case 'comment': return 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)';
      case 'chat_request': return 'linear-gradient(135deg, #9B59B6 0%, #8e44ad 100%)';
      case 'badge': return 'linear-gradient(135deg, #f39c12 0%, #d68910 100%)';
      default: return 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isLoggedIn) {
    return (
      <main style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f9fafb 0%, #fff 100%)',
        paddingTop: '6rem'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔑</div>
            <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem', fontWeight: 600 }}>
              Sign in to view notifications
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Log in to see reactions, comments, and chat requests.
            </p>
            <Link href="/login" style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
              color: '#fff',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 600
            }}>
              Log In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f9fafb 0%, #fff 100%)',
      paddingTop: '6rem'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 style={{ color: '#1a1a2e', margin: 0, fontWeight: 700 }}>
              Notifications
              {unreadCount > 0 && (
                <span style={{
                  marginLeft: '0.75rem',
                  padding: '0.25rem 0.75rem',
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  color: '#fff',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}>
                  {unreadCount} new
                </span>
              )}
            </h2>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              style={{
                padding: '0.5rem 1rem',
                background: '#f5f5f5',
                color: '#4a5568',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              Mark all read
            </button>
          )}
        </div>

        {loading ? (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '3px solid #e5e7eb',
              borderTopColor: '#1ABC9C',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ color: '#6b7280' }}>Loading notifications...</p>
            <style jsx>{`
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
          </div>
        ) : notifications.length === 0 ? (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem', fontWeight: 600 }}>
              No notifications yet
            </h3>
            <p style={{ color: '#6b7280' }}>
              When someone reacts, comments, or sends you a chat request, you'll see it here.
            </p>
          </div>
        ) : (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}>
            {notifications.map((notif, index) => (
              <div
                key={notif.id}
                onClick={() => !notif.read && markAsRead(notif.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.875rem',
                  padding: '1rem 1.25rem',
                  borderBottom: index < notifications.length - 1 ? '1px solid #f3f4f6' : 'none',
                  background: notif.read ? 'transparent' : 'linear-gradient(135deg, rgba(26, 188, 156, 0.05) 0%, rgba(155, 89, 182, 0.05) 100%)',
                  cursor: notif.link ? 'pointer' : 'default',
                  transition: 'background 0.2s ease'
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: getIconBg(notif.type),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0
                }}>
                  {getIcon(notif.type)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.5rem'
                  }}>
                    <strong style={{ 
                      color: '#1a1a2e',
                      fontSize: '0.95rem'
                    }}>
                      {notif.title}
                    </strong>
                    <span style={{ 
                      color: '#9ca3af',
                      fontSize: '0.75rem',
                      flexShrink: 0
                    }}>
                      {formatTime(notif.created_at)}
                    </span>
                  </div>
                  <p style={{ 
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    margin: '0.25rem 0 0',
                    lineHeight: 1.4
                  }}>
                    {notif.message}
                  </p>
                  {notif.link && (
                    <Link 
                      href={notif.link}
                      style={{
                        display: 'inline-block',
                        marginTop: '0.5rem',
                        color: '#1ABC9C',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        textDecoration: 'none'
                      }}
                    >
                      View ?
                    </Link>
                  )}
                </div>
                {!notif.read && (
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#1ABC9C',
                    flexShrink: 0,
                    marginTop: '0.5rem'
                  }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
