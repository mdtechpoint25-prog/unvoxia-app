'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/foryou',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      label: 'For You'
    },
    {
      href: '/explore',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      ),
      label: 'Explore'
    },
    {
      href: '/create',
      icon: (active: boolean) => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      ),
      label: 'Create',
      isSpecial: true
    },
    {
      href: '/notifications',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
      label: 'Alerts'
    },
    {
      href: '/profile',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      label: 'Profile'
    }
  ];

  // Hide on certain pages
  const hiddenPaths = ['/login', '/signup', '/welcome', '/setup', '/breathe', '/release', '/experiences', '/stories', '/story'];
  const shouldHide = hiddenPaths.some(path => pathname?.startsWith(path)) || pathname === '/';

  if (shouldHide) return null;

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = pathname?.startsWith(item.href);
        
        return (
          <Link 
            key={item.href}
            href={item.href}
            className={`nav-item ${isActive ? 'active' : ''} ${item.isSpecial ? 'special' : ''}`}
          >
            {item.icon(isActive)}
            <span className="nav-label">{item.label}</span>
          </Link>
        );
      })}

      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #000;
          border-top: 1px solid #1f1f1f;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0.5rem 0.5rem calc(0.5rem + env(safe-area-inset-bottom));
          z-index: 1000;
          backdrop-filter: blur(10px);
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 0.75rem;
          border-radius: 12px;
          color: #666;
          text-decoration: none;
          transition: all 0.2s;
          min-width: 64px;
        }

        .nav-item:hover {
          color: #888;
        }

        .nav-item.active {
          color: #1ABC9C;
        }

        .nav-item.special {
          transform: scale(1.1);
          color: #1ABC9C;
        }

        .nav-item.special.active {
          background: linear-gradient(135deg, rgba(26, 188, 156, 0.1), rgba(155, 89, 182, 0.1));
        }

        .nav-label {
          font-size: 0.688rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        @media (max-width: 380px) {
          .nav-item {
            min-width: 56px;
            padding: 0.5rem 0.5rem;
          }
          
          .nav-label {
            font-size: 0.625rem;
          }
        }

        @media (min-width: 768px) {
          .bottom-nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
