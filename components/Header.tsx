'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const navLinks = [
  { href: '/share', label: 'Share' },
  { href: '/circles', label: 'Circles' },
  { href: '/heal', label: 'Heal' },
  { href: '/journal', label: 'Journal' },
  { href: '/stories', label: 'Stories' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Logo size={44} showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  color: scrolled ? '#2C3E50' : '#1a1a2e',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '0.25rem 0',
                  transition: 'color 0.2s ease'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }} className="desktop-nav">
            <Link
              href="/login"
              style={{
                color: scrolled ? '#2C3E50' : '#1a1a2e',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                transition: 'color 0.2s ease'
              }}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="cta-button"
              style={{
                background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                padding: '0.65rem 1.5rem',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(26, 188, 156, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={scrolled ? '#2C3E50' : '#1a1a2e'} strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6L18 18M6 18L18 6" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 99,
          paddingTop: '5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: '#2C3E50',
                fontWeight: 600,
                fontSize: '1.25rem',
                textDecoration: 'none'
              }}
            >
              <span onClick={() => setMobileOpen(false)}>{link.label}</span>
            </Link>
          ))}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <Link href="/login" className="btn btn-secondary">
              <span onClick={() => setMobileOpen(false)}>Login</span>
            </Link>
            <Link href="/signup" className="btn btn-primary">
              <span onClick={() => setMobileOpen(false)}>Get Started</span>
            </Link>
          </div>
        </div>
      )}

      <style jsx global>{`
        .nav-link:hover { color: #1ABC9C !important; }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(26, 188, 156, 0.4) !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}