'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';

interface MenuItem {
  href: string;
  label: string;
  icon: (active: boolean) => JSX.Element;
  badge?: number;
}

export function SideMenu() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    shortcuts: true,
    explore: true,
  });

  // Hide on certain pages
  const hiddenPaths = ['/login', '/signup', '/welcome', '/setup', '/breathe', '/release', '/', '/splash'];
  const shouldHide = hiddenPaths.some(path => pathname === path);

  if (shouldHide) return null;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const mainMenuItems: MenuItem[] = [
    {
      href: '/foryou',
      label: 'For You',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
      ),
    },
    {
      href: '/explore',
      label: 'Explore',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      ),
    },
    {
      href: '/reels',
      label: 'Reels',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
          <line x1="7" y1="2" x2="7" y2="22"/>
          <line x1="17" y1="2" x2="17" y2="22"/>
        </svg>
      ),
    },
    {
      href: '/stories',
      label: 'Stories',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
    },
    {
      href: '/authentic-feed',
      label: 'Authentic Feed',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
  ];

  const socialItems: MenuItem[] = [
    {
      href: '/messages',
      label: 'Messages',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      badge: 3,
    },
    {
      href: '/notifications',
      label: 'Notifications',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
      badge: 5,
    },
  ];

  const shortcutItems: MenuItem[] = [
    {
      href: '/circles',
      label: 'Communities',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      href: '/experiences',
      label: 'Experiences',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      ),
    },
    {
      href: '/daily-prompts',
      label: 'Daily Prompts',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
    },
    {
      href: '/saved',
      label: 'Saved',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
  ];

  const accountItems: MenuItem[] = [
    {
      href: '/profile',
      label: 'My Profile',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      ),
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
    return (
      <li key={item.href}>
        <Link href={item.href} className={`menu-item ${isActive ? 'active' : ''}`}>
          <span className="menu-icon">{item.icon(isActive || false)}</span>
          <span className="menu-label">{item.label}</span>
          {item.badge && item.badge > 0 && (
            <span className="menu-badge">{item.badge}</span>
          )}
        </Link>
      </li>
    );
  };

  return (
    <>
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <Link href="/foryou">
            <Logo size={32} showText variant="full" />
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <ul className="menu-section">
            {mainMenuItems.map(renderMenuItem)}
          </ul>

          <div className="section-divider" />

          {/* Social */}
          <ul className="menu-section">
            {socialItems.map(renderMenuItem)}
          </ul>

          <div className="section-divider" />

          {/* Shortcuts - Collapsible */}
          <div className="collapsible-section">
            <button 
              className="section-header" 
              onClick={() => toggleSection('shortcuts')}
            >
              <span>Your Shortcuts</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className={`chevron ${expandedSections.shortcuts ? 'expanded' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {expandedSections.shortcuts && (
              <ul className="menu-section">
                {shortcutItems.map(renderMenuItem)}
              </ul>
            )}
          </div>

          <div className="section-divider" />

          {/* Account */}
          <ul className="menu-section">
            {accountItems.map(renderMenuItem)}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="sidebar-footer">
          <div className="footer-links">
            <Link href="/about">About</Link>
            <span>·</span>
            <Link href="/blog">Blog</Link>
            <span>·</span>
            <Link href="/faq">FAQ</Link>
            <span>·</span>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-links">
            <Link href="/privacy">Privacy</Link>
            <span>·</span>
            <Link href="/terms">Terms</Link>
          </div>
          <p className="copyright">© 2025 NOMA</p>
        </div>
      </aside>

      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 56px;
          left: 0;
          bottom: 0;
          width: 240px;
          background: var(--bg-primary, #0a0a0a);
          border-right: 1px solid var(--border-subtle, #1a1a1a);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          z-index: 100;
          transition: transform 0.3s ease;
        }

        .sidebar-logo {
          display: none;
          padding: 1rem;
          border-bottom: 1px solid var(--border-subtle, #1a1a1a);
        }

        .sidebar-nav {
          flex: 1;
          padding: 0.5rem 0;
          overflow-y: auto;
        }

        .menu-section {
          list-style: none;
          margin: 0;
          padding: 0.25rem 0.5rem;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.625rem 0.75rem;
          border-radius: 8px;
          color: var(--text-secondary, #a0a0a0);
          text-decoration: none;
          transition: all 0.15s ease;
          font-size: 0.9375rem;
          font-weight: 500;
        }

        .menu-item:hover {
          background: var(--bg-surface, #1a1a1a);
          color: var(--text-primary, #fff);
        }

        .menu-item.active {
          background: rgba(244, 255, 172, 0.1);
          color: var(--accent, #f4ffac);
        }

        .menu-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .menu-label {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .menu-badge {
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          background: #ef4444;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-divider {
          height: 1px;
          background: var(--border-subtle, #1a1a1a);
          margin: 0.5rem 1rem;
        }

        .collapsible-section {
          padding: 0 0.5rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: none;
          border: none;
          color: var(--text-muted, #666);
          font-size: 0.8125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: color 0.15s;
        }

        .section-header:hover {
          color: var(--text-secondary, #a0a0a0);
        }

        .chevron {
          transition: transform 0.2s ease;
        }

        .chevron.expanded {
          transform: rotate(180deg);
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--border-subtle, #1a1a1a);
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--text-muted, #666);
          margin-bottom: 0.5rem;
        }

        .footer-links a {
          color: var(--text-muted, #666);
          text-decoration: none;
          transition: color 0.15s;
        }

        .footer-links a:hover {
          color: var(--text-secondary, #a0a0a0);
        }

        .copyright {
          font-size: 0.6875rem;
          color: var(--text-muted, #555);
          margin: 0;
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </>
  );
}
