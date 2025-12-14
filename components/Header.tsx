'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import { ThemeToggle } from './ThemeProvider';

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
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Logo size={44} showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons + Theme Toggle */}
          <div className="desktop-nav auth-buttons">
            <ThemeToggle />
            <Link href="/login" className="sign-in-link">
              Sign in
            </Link>
            <Link href="/signup" className="cta-button">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-controls">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M6 6L18 18M6 18L18 6" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu" onClick={() => setMobileOpen(false)}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
            >
              {link.label}
            </Link>
          ))}
          <div className="mobile-auth">
            <Link href="/login" className="btn btn-secondary">
              Sign in
            </Link>
            <Link href="/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.25rem 0;
          background: transparent;
          transition: all 0.3s ease;
        }

        .site-header.scrolled {
          padding: 0.75rem 0;
          background: var(--bg-surface);
          backdrop-filter: blur(20px);
          box-shadow: var(--shadow-md);
          border-bottom: 1px solid var(--border-subtle);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .auth-buttons {
          gap: 0.75rem;
        }

        .nav-link {
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.9375rem;
          text-decoration: none;
          position: relative;
          padding: 0.25rem 0;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: var(--accent);
        }

        .sign-in-link {
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.9375rem;
          text-decoration: none;
          padding: 0.5rem 0.875rem;
          transition: color 0.2s ease;
        }

        .sign-in-link:hover {
          color: var(--accent);
        }

        .cta-button {
          background: var(--accent);
          color: var(--bg-primary);
          font-weight: 600;
          font-size: 0.9375rem;
          text-decoration: none;
          padding: 0.5rem 1.125rem;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
        }

        .cta-button:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        .mobile-controls {
          display: none;
          align-items: center;
          gap: 0.5rem;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: var(--text-primary);
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--bg-surface);
          backdrop-filter: blur(20px);
          z-index: 99;
          padding-top: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .mobile-nav-link {
          color: var(--text-primary);
          font-weight: 500;
          font-size: 1.125rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .mobile-nav-link:hover {
          color: var(--accent);
        }

        .mobile-auth {
          margin-top: 1rem;
          display: flex;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-controls {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}