import Link from 'next/link';
import { CONTACT } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{
      padding: '2rem',
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
          <h4 style={{ marginBottom: '0.5rem' }}>Unvoxia</h4>
          <p style={{ fontSize: '0.9rem', color: '#ccc' }}>
            Share Your Voice. Heal. Connect. Anonymously.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Links</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <Link href="/about" style={{ color: '#1ABC9C', textDecoration: 'none' }}>About</Link>
            <Link href="/privacy" style={{ color: '#1ABC9C', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ color: '#1ABC9C', textDecoration: 'none' }}>Terms</Link>
            <Link href="/contact" style={{ color: '#1ABC9C', textDecoration: 'none' }}>Contact</Link>
          </nav>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Contact</h4>
          <p style={{ fontSize: '0.85rem', color: '#ccc' }}>
            {CONTACT.emails.map((e, i) => <span key={i}>{e}<br /></span>)}
            {CONTACT.phones.join(' / ')}
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: '#888' }}>
        2024 Unvoxia. All rights reserved.
      </div>
    </footer>
  );
}