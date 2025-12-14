'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface NavItem {
  path: string;
  icon: string;
  activeIcon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/foryou', icon: '🏠', activeIcon: '🏡', label: 'Home' },
  { path: '/circles', icon: '🌀', activeIcon: '🌀', label: 'Circles' },
  { path: '/create', icon: '➕', activeIcon: '➕', label: 'Share' },
  { path: '/notifications', icon: '🔔', activeIcon: '🔔', label: 'Inbox' },
  { path: '/profile', icon: '👤', activeIcon: '👤', label: 'Profile' },
];

export default function AnimatedBottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [rippleIndex, setRippleIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePress = (index: number, path: string) => {
    setPressedIndex(index);
    setRippleIndex(index);
    
    // Navigate after brief animation
    setTimeout(() => {
      router.push(path);
      setPressedIndex(null);
    }, 100);

    // Clear ripple after animation
    setTimeout(() => setRippleIndex(null), 400);
  };

  const isActive = (path: string) => {
    if (path === '/foryou') return pathname === '/foryou' || pathname === '/';
    if (path === '/profile') return pathname?.startsWith('/profile');
    return pathname === path || pathname?.startsWith(path + '/');
  };

  if (!mounted) return null;

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 100,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {NAV_ITEMS.map((item, index) => {
        const active = isActive(item.path);
        const isPressed = pressedIndex === index;
        const hasRipple = rippleIndex === index;
        const isCreateButton = item.path === '/create';

        return (
          <button
            key={item.path}
            onClick={() => handlePress(index, item.path)}
            onMouseDown={() => setPressedIndex(index)}
            onMouseUp={() => setPressedIndex(null)}
            onMouseLeave={() => setPressedIndex(null)}
            onTouchStart={() => setPressedIndex(index)}
            onTouchEnd={() => setPressedIndex(null)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isCreateButton ? '0' : '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px',
              position: 'relative',
              overflow: 'hidden',
              transform: isPressed ? 'scale(0.9)' : 'scale(1)',
              transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Ripple effect */}
            {hasRipple && (
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '60px',
                  height: '60px',
                  background: active ? 'rgba(13, 148, 136, 0.3)' : 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'navRipple 0.4s ease-out forwards',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Icon container */}
            {isCreateButton ? (
              // Special create button
              <div
                style={{
                  width: '48px',
                  height: '36px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  boxShadow: '0 4px 15px rgba(13, 148, 136, 0.4)',
                  transform: isPressed ? 'scale(0.95)' : 'scale(1)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {item.icon}
              </div>
            ) : (
              // Regular nav icon
              <div
                style={{
                  fontSize: '1.5rem',
                  filter: active ? 'none' : 'grayscale(50%)',
                  opacity: active ? 1 : 0.6,
                  transform: active ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {active ? item.activeIcon : item.icon}
              </div>
            )}

            {/* Label */}
            {!isCreateButton && (
              <span
                style={{
                  fontSize: '0.65rem',
                  color: active ? '#0d9488' : 'rgba(255, 255, 255, 0.5)',
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                {item.label}
              </span>
            )}

            {/* Active indicator dot */}
            {active && !isCreateButton && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#0d9488',
                  animation: 'scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                }}
              />
            )}
          </button>
        );
      })}

      <style jsx>{`
        @keyframes navRipple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  );
}
