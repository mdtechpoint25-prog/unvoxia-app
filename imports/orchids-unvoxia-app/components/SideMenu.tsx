'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface MenuItem {
  href: string;
  label: string;
  icon: (active: boolean) => JSX.Element;
  group?: string;
}

export function SideMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      href: '/foryou',
      label: 'For You',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
      ),
      group: 'main'
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
      group: 'main'
    },
    {
      href: '/reels',
      label: 'Reels',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
          <line x1="7" y1="2" x2="7" y2="22"/>
          <line x1="17" y1="2" x2="17" y2="22"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
        </svg>
      ),
      group: 'main'
    },
    {
      href: '/authentic-feed',
      label: 'Authentic Feed',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      group: 'main'
    },
    {
      href: '/circles',
      label: 'Communities',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      group: 'community'
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
      group: 'community'
    },
    {
      href: '/messages',
      label: 'Messages',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      group: 'social'
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
      group: 'social'
    },
    {
      href: '/profile',
      label: 'Profile',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      group: 'account'
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"/>
        </svg>
      ),
      group: 'account'
    },
    {
      href: '/saved',
      label: 'Saved Posts',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      group: 'account'
    },
    {
      href: '/about',
      label: 'About',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      ),
      group: 'info'
    },
    {
      href: '/privacy',
      label: 'Privacy',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      group: 'info'
    },
    {
      href: '/terms',
      label: 'Terms',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      ),
      group: 'info'
    }
  ];

  const groupedItems = menuItems.reduce((acc, item) => {
    const group = item.group || 'other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const groupTitles: Record<string, string> = {
    main: 'Discover',
    community: 'Community',
    social: 'Social',
    account: 'Account',
    info: 'Information'
  };

  return (
    <>
      {/* Menu Toggle Button - Fixed Top Left */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="menu-toggle"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isOpen ? (
            <path d="M6 6L18 18M6 18L18 6" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="menu-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Menu */}
      <aside className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2>Menu</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="close-btn"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6L18 18M6 18L18 6" />
            </svg>
          </button>
        </div>

        <nav className="menu-content">
          {Object.entries(groupedItems).map(([group, items]) => (
            <div key={group} className="menu-group">
              <h3 className="group-title">{groupTitles[group] || group}</h3>
              <ul className="menu-list">
                {items.map((item) => {
                  const isActive = pathname?.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`menu-link ${isActive ? 'active' : ''}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon(isActive)}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <style jsx>{`
        .menu-toggle {
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 999;
          background: rgba(26, 26, 26, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
        }

        .menu-toggle:hover {
          background: rgba(26, 188, 156, 0.2);
          border-color: #1ABC9C;
        }

        .menu-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        .side-menu {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          background: #0a0a0a;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 1001;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .side-menu.open {
          transform: translateX(0);
        }

        .menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .menu-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .menu-content {
          flex: 1;
          padding: 1rem 0;
          overflow-y: auto;
        }

        .menu-group {
          margin-bottom: 1.5rem;
        }

        .group-title {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #666;
          padding: 0 1.25rem;
          margin-bottom: 0.5rem;
        }

        .menu-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .menu-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          color: #ccc;
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
        }

        .menu-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 0;
          background: #1ABC9C;
          border-radius: 0 2px 2px 0;
          transition: height 0.2s;
        }

        .menu-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .menu-link.active {
          color: #1ABC9C;
          background: rgba(26, 188, 156, 0.1);
        }

        .menu-link.active::before {
          height: 24px;
        }

        .menu-link span {
          font-size: 0.9375rem;
          font-weight: 500;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .side-menu {
            width: 260px;
          }
        }

        /* Hide on mobile bottom nav pages */
        @media (max-width: 767px) {
          .menu-toggle {
            display: none;
          }
        }

        @media (min-width: 768px) {
          .menu-toggle {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
