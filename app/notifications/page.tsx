'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'reaction' | 'comment' | 'message';
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

    fetchNotifications();
  }, []);

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
      case 'reaction': return '??';
      case 'comment': return '??';
      case 'message': return '??';
      default: return '??';
    }
  };

  if (!isLoggedIn) {
    return (
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{
          background: '#f5f5f5',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>??</div>
          <h3 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Sign in to view notifications</h3>
          <p style={{ color: '#888', marginBottom: '1rem' }}>
            Log in to see reactions, comments, and messages.
          </p>
          <Link href="/login" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#1ABC9C',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600
          }}>
            Log In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ color: '#2C3E50', marginBottom: '1.5rem' }}>Notifications</h2>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <div style={{
          background: '#f5f5f5',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>??</div>
          <p style={{ color: '#888' }}>No notifications yet.</p>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            When someone reacts or comments on your posts, you'll see it here.
          </p>
        </div>
      ) : (
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          {notifications.map((notif) => (
            <Link
              key={notif.id}
              href={notif.link}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                borderBottom: '1px solid #f5f5f5',
                textDecoration: 'none',
                background: notif.read ? 'transparent' : '#f0fdf4'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                flexShrink: 0
              }}>
                {getIcon(notif.type)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: '#2C3E50', fontSize: '0.95rem' }}>
                  {notif.message}
                </p>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>
                  {formatTime(notif.created_at)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
