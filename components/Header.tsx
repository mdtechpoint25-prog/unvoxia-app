'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const navLinks = [
  { href: '/experiences', label: 'Experiences' },
  { href: '/circles', label: 'Communities' },
  { href: '/share', label: 'Share Story' },
  { href: '/about', label: 'About' },
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
                  color: scrolled ? '#475569' : '#334155',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
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
            gap: '0.75rem'
          }} className="desktop-nav">
            <Link
              href="/login"
              style={{
                color: scrolled ? '#475569' : '#334155',
                fontWeight: 500,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                padding: '0.5rem 0.875rem',
                transition: 'color 0.2s ease'
              }}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="cta-button"
              style={{
                background: '#0d9488',
                color: '#fff',
                fontWeight: 500,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                padding: '0.5rem 1.125rem',
                borderRadius: '6px',
                transition: 'all 0.2s ease'
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={scrolled ? '#334155' : '#1e293b'} strokeWidth="2">
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
                color: '#1e293b',
                fontWeight: 500,
                fontSize: '1.125rem',
                textDecoration: 'none'
              }}
            >
              <span onClick={() => setMobileOpen(false)}>{link.label}</span>
            </Link>
          ))}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <Link href="/login" className="btn btn-secondary">
              <span onClick={() => setMobileOpen(false)}>Sign in</span>
            </Link>
            <Link href="/signup" className="btn btn-primary">
              <span onClick={() => setMobileOpen(false)}>Get Started</span>
            </Link>
          </div>
        </div>
      )}

      <style jsx global>{`
        .nav-link:hover { color: #0d9488 !important; }
        .cta-button:hover { background: #0f766e !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}