import Link from 'next/link';

export default function HeroSection() {
  return (
    <section style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #1ABC9C 0%, #4DA8DA 100%)',
      color: '#fff'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 700 }}>
        Share Your Voice. Heal. Connect. Anonymously.
      </h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
        A safe space to express yourself, find support, and grow - without revealing your identity.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/signup" style={{
          padding: '0.75rem 2rem',
          background: '#1ABC9C',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          border: '2px solid #fff'
        }}>
          Sign Up
        </Link>
        <Link href="/feed" style={{
          padding: '0.75rem 2rem',
          background: '#FF6B35',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600
        }}>
          Explore Feed
        </Link>
      </div>
    </section>
  );
}
