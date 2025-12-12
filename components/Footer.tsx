import Link from 'next/link';
import { SITE, CONTACT } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{
      padding: '3rem 2rem',
      background: '#2C3E50',
      color: '#fff',
      marginTop: '0'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '2rem'
      }}>
        <div>
          <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              width: '28px',
              height: '28px',
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.8rem'
            }}>N</span>
            {SITE.name}
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#ccc', maxWidth: '250px' }}>
            {SITE.tagline}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.5rem' }}>
            {SITE.domain}
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Platform</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <Link href="/feed" style={{ color: '#1ABC9C', textDecoration: 'none', fontSize: '0.9rem' }}>Feed</Link>
            <Link href="/reels" style={{ color: '#1ABC9C', textDecoration: 'none', fontSize: '0.9rem' }}>Reels</Link>
            <Link href="/daily-prompts" style={{ color: '#1ABC9C', textDecoration: 'none', fontSize: '0.9rem' }}>Daily Prompts</Link>
            <Link href="/messages" style={{ color: '#1ABC9C', textDecoration: 'none', fontSize: '0.9rem' }}>Messages</Link>
          </nav>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Company</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <Link href="/about" style={{ color: '#1ABC9C', textDecoration: 'none', fontSize: '0.9rem' }}>About</Link>
            <Link href="/privacy" style={{ color: '#1ABC9C', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: '#1ABC9C', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</Link>
            <Link href="/contact" style={{ color: '#1ABC9C', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</Link>
          </nav>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Contact Us</h4>
          <div style={{ fontSize: '0.85rem', color: '#ccc' }}>
            {CONTACT.emails.map((e, i) => <div key={i}>{e}</div>)}
            <div style={{ marginTop: '0.5rem' }}>{CONTACT.phones.join(' / ')}</div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: '#888', borderTop: '1px solid #3d5a73', paddingTop: '1.5rem' }}>
        2024 {SITE.name} ({SITE.shortName}). All rights reserved.
      </div>
    </footer>
  );
}