import Link from 'next/link';
import { SITE } from '@/lib/constants';

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <Link href="/" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '1.25rem',
        color: '#2C3E50'
      }}>
        <span style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.9rem'
        }}>N</span>
        {SITE.shortName || SITE.name}
      </Link>
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href="/feed" style={{ color: '#2C3E50', textDecoration: 'none' }}>Feed</Link>
        <Link href="/reels" style={{ color: '#2C3E50', textDecoration: 'none' }}>Reels</Link>
        <Link href="/daily-prompts" style={{ color: '#2C3E50', textDecoration: 'none' }}>Prompts</Link>
        <Link href="/messages" style={{ color: '#2C3E50', textDecoration: 'none' }}>Messages</Link>
        <Link href="/notifications" style={{ color: '#2C3E50', textDecoration: 'none' }}>??</Link>
        <Link href="/signup" style={{
          padding: '0.5rem 1rem',
          background: '#1ABC9C',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600
        }}>Sign Up</Link>
        <Link href="/login" style={{ color: '#1ABC9C', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
      </nav>
    </header>
  );
}