'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface ImmersiveHeaderProps {
  mode?: 'feed' | 'landing';
  showLogo?: boolean;
}

export default function ImmersiveHeader({ mode = 'feed', showLogo = true }: ImmersiveHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasNotifications, setHasNotifications] = useState(true);

  // Auto-hide header on scroll down, show on scroll up
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY < 50) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Keyboard shortcut to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
      // 'N' to create new post
      if (e.key === 'n' && !isMenuOpen && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          router.push('/create');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, router]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Feed Mode Header - Minimal & Transparent */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          zIndex: 100,
          background: 'transparent',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Logo - Minimal Text */}
        {showLogo && (
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            NOMA
          </span>
        )}

        {/* Notifications */}
        <button
          onClick={() => router.push('/notifications')}
          aria-label="Notifications"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {hasNotifications && (
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                background: '#ef4444',
                borderRadius: '50%',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
          )}
        </button>
      </header>

      {/* Full-Screen Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

// Menu Overlay Component
function MenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: 'Feed', path: '/foryou', icon: '◉' },
    { label: 'Circles', path: '/circles', icon: '◎' },
    { label: 'Share', path: '/create', icon: '✦' },
    { label: 'Messages', path: '/messages', icon: '◈' },
    { label: 'Profile', path: '/profile', icon: '◇' },
    { label: 'Settings', path: '/settings', icon: '⚙' },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(14, 15, 20, 0.98)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        style={{
          position: 'absolute',
          top: '12px',
          right: '16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '12px',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '1.5rem',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
      >
        ✕
      </button>

      {/* Menu Items */}
      <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
          return (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '16px 48px',
                color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                fontSize: '1.5rem',
                fontWeight: isActive ? 600 : 400,
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${index * 0.05}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isActive ? '#fff' : 'rgba(255, 255, 255, 0.6)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
        }}
      >
        SPEAK WITHOUT FEAR
      </div>
    </div>
  );
}
