'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Logo from './Logo';

interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  message: string;
  time: string;
  read: boolean;
}

export function AppHeader() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mock notifications
  const notifications: NotificationItem[] = [
    { id: '1', type: 'like', message: 'Someone supported your post', time: '2m ago', read: false },
    { id: '2', type: 'comment', message: 'New reply on your story', time: '15m ago', read: false },
    { id: '3', type: 'follow', message: 'You have a new connection', time: '1h ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hide on certain pages
  const hiddenPaths = ['/login', '/signup', '/welcome', '/setup', '/breathe', '/release', '/', '/splash'];
  const shouldHide = hiddenPaths.some(path => pathname === path);

  if (shouldHide) return null;

  return (
    <header className="app-header">
      <div className="header-left">
        <Link href="/foryou" className="logo-link">
          <Logo size={36} showText={false} variant="icon" />
        </Link>
        
        <div className="search-container">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search NOMA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <nav className="header-center">
        <Link href="/foryou" className={`nav-tab ${pathname === '/foryou' ? 'active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={pathname === '/foryou' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
        </Link>
        <Link href="/explore" className={`nav-tab ${pathname === '/explore' ? 'active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={pathname === '/explore' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </Link>
        <Link href="/circles" className={`nav-tab ${pathname?.startsWith('/circles') ? 'active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={pathname?.startsWith('/circles') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </Link>
        <Link href="/messages" className={`nav-tab ${pathname?.startsWith('/messages') ? 'active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={pathname?.startsWith('/messages') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </Link>
        <Link href="/reels" className={`nav-tab ${pathname === '/reels' ? 'active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={pathname === '/reels' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
            <line x1="7" y1="2" x2="7" y2="22"/>
            <line x1="17" y1="2" x2="17" y2="22"/>
          </svg>
        </Link>
      </nav>

      <div className="header-right">
        <Link href="/create" className="create-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </Link>

        {/* Notifications */}
        <div className="dropdown-container" ref={notifRef}>
          <button 
            className={`icon-btn ${showNotifications ? 'active' : ''}`}
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>
          
          {showNotifications && (
            <div className="dropdown notifications-dropdown">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <Link href="/notifications">See all</Link>
              </div>
              <div className="dropdown-list">
                {notifications.map(notif => (
                  <div key={notif.id} className={`notif-item ${!notif.read ? 'unread' : ''}`}>
                    <div className="notif-icon">
                      {notif.type === 'like' && '❤️'}
                      {notif.type === 'comment' && '💬'}
                      {notif.type === 'follow' && '👤'}
                      {notif.type === 'mention' && '@'}
                    </div>
                    <div className="notif-content">
                      <p>{notif.message}</p>
                      <span className="notif-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="dropdown-container" ref={profileRef}>
          <button 
            className={`profile-btn ${showProfile ? 'active' : ''}`}
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
          >
            <div className="avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          </button>
          
          {showProfile && (
            <div className="dropdown profile-dropdown">
              <Link href="/profile" className="dropdown-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                View Profile
              </Link>
              <Link href="/settings" className="dropdown-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6"/>
                </svg>
                Settings
              </Link>
              <Link href="/saved" className="dropdown-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                Saved Posts
              </Link>
              <hr className="dropdown-divider" />
              <Link href="/privacy" className="dropdown-item">Privacy & Safety</Link>
              <Link href="/terms" className="dropdown-item">Terms</Link>
              <Link href="/about" className="dropdown-item">About NOMA</Link>
              <hr className="dropdown-divider" />
              <button className="dropdown-item logout-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .app-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 56px;
          background: var(--bg-surface, #111);
          border-bottom: 1px solid var(--border-subtle, #222);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
          z-index: 1000;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .logo-link {
          display: flex;
          align-items: center;
        }

        .search-container {
          position: relative;
          max-width: 280px;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted, #666);
        }

        .search-input {
          width: 100%;
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          background: var(--bg-primary, #1a1a1a);
          border: 1px solid var(--border-subtle, #333);
          border-radius: 20px;
          color: var(--text-primary, #fff);
          font-size: 0.9rem;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          border-color: var(--accent, #f4ffac);
          box-shadow: 0 0 0 2px rgba(244, 255, 172, 0.1);
        }

        .search-input::placeholder {
          color: var(--text-muted, #666);
        }

        .header-center {
          display: flex;
          gap: 0.25rem;
        }

        .nav-tab {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 48px;
          border-radius: 8px;
          color: var(--text-secondary, #888);
          transition: all 0.2s;
          position: relative;
        }

        .nav-tab:hover {
          background: var(--bg-primary, #1a1a1a);
          color: var(--accent, #f4ffac);
        }

        .nav-tab.active {
          color: var(--accent, #f4ffac);
        }

        .nav-tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 12px;
          right: 12px;
          height: 3px;
          background: var(--accent, #f4ffac);
          border-radius: 3px 3px 0 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          justify-content: flex-end;
        }

        .create-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: var(--accent, #f4ffac);
          color: var(--bg-primary, #000);
          border-radius: 8px;
          transition: all 0.2s;
        }

        .create-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(244, 255, 172, 0.3);
        }

        .icon-btn, .profile-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--bg-primary, #1a1a1a);
          border: none;
          border-radius: 50%;
          color: var(--text-primary, #fff);
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .icon-btn:hover, .profile-btn:hover,
        .icon-btn.active, .profile-btn.active {
          background: var(--bg-surface, #222);
        }

        .badge {
          position: absolute;
          top: -2px;
          right: -2px;
          min-width: 18px;
          height: 18px;
          background: #ef4444;
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 5px;
        }

        .avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--accent, #f4ffac), #a8e6a1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--bg-primary, #000);
        }

        .dropdown-container {
          position: relative;
        }

        .dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--bg-surface, #1a1a1a);
          border: 1px solid var(--border-subtle, #333);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          min-width: 280px;
          overflow: hidden;
          animation: fadeIn 0.15s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--border-subtle, #333);
        }

        .dropdown-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary, #fff);
        }

        .dropdown-header a {
          font-size: 0.85rem;
          color: var(--accent, #f4ffac);
        }

        .dropdown-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .notif-item {
          display: flex;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          transition: background 0.2s;
          cursor: pointer;
        }

        .notif-item:hover {
          background: var(--bg-primary, #111);
        }

        .notif-item.unread {
          background: rgba(244, 255, 172, 0.05);
        }

        .notif-icon {
          width: 40px;
          height: 40px;
          background: var(--bg-primary, #222);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }

        .notif-content p {
          font-size: 0.9rem;
          color: var(--text-primary, #fff);
          margin-bottom: 0.25rem;
        }

        .notif-time {
          font-size: 0.75rem;
          color: var(--text-muted, #666);
        }

        .profile-dropdown {
          padding: 0.5rem 0;
          min-width: 240px;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: var(--text-primary, #fff);
          font-size: 0.9rem;
          transition: background 0.2s;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .dropdown-item:hover {
          background: var(--bg-primary, #111);
        }

        .dropdown-divider {
          border: none;
          border-top: 1px solid var(--border-subtle, #333);
          margin: 0.5rem 0;
        }

        .logout-btn {
          color: #ef4444;
        }

        @media (max-width: 900px) {
          .header-center { display: none; }
          .search-container { max-width: 200px; }
        }

        @media (max-width: 600px) {
          .app-header { padding: 0 0.75rem; }
          .search-container { display: none; }
        }
      `}</style>
    </header>
  );
}
