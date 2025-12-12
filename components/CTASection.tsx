import Link from 'next/link';

export default function CTASection() {
  return (
    <section style={{
      padding: '3rem 2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #FF6B35 0%, #FF6F91 100%)',
      color: '#fff'
    }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
        Join Unvoxia Today - Share, Heal, Inspire
      </h2>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/signup" style={{
          padding: '0.75rem 2rem',
          background: '#1ABC9C',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600
        }}>
          Sign Up
        </Link>
        <Link href="/feed" style={{
          padding: '0.75rem 2rem',
          background: '#fff',
          color: '#FF6B35',
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
