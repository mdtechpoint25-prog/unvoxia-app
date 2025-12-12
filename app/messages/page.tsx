'use client';

import Link from 'next/link';

export default function MessagesPage() {
  return (
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Messages</h2>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Connect with others anonymously through private messages.
      </p>

      <div style={{
        background: 'linear-gradient(135deg, #4DA8DA 0%, #9B59B6 100%)',
        borderRadius: '16px',
        padding: '3rem 2rem',
        textAlign: 'center',
        color: '#fff'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>??</div>
        <h3 style={{ marginBottom: '0.5rem' }}>Coming Soon</h3>
        <p style={{ opacity: 0.9, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
          Anonymous messaging with end-to-end encryption. Connect safely with others who understand.
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          maxWidth: '300px',
          margin: '0 auto',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>&#10003;</span> Anonymous usernames only
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>&#10003;</span> Mutual consent required
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>&#10003;</span> End-to-end encryption
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>&#10003;</span> Text, images & videos
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#888', marginBottom: '1rem' }}>
          In the meantime, connect with the community through:
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/feed" style={{
            padding: '0.75rem 1.5rem',
            background: '#1ABC9C',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600
          }}>
            Community Feed
          </Link>
          <Link href="/daily-prompts" style={{
            padding: '0.75rem 1.5rem',
            background: '#9B59B6',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600
          }}>
            Daily Reflections
          </Link>
        </div>
      </div>
    </main>
  );
}