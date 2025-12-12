import Link from 'next/link';
import { SITE } from '@/lib/constants';

export default function CTASection() {
  return (
    <section style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #9B59B6 0%, #1ABC9C 100%)',
      color: '#fff'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', fontWeight: 700 }}>
        Start your journey with {SITE.name} today
      </h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9, maxWidth: '500px', margin: '0 auto 2rem' }}>
        Join thousands of users embracing authenticity, clarity, and real productivity.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/signup" style={{
          padding: '0.85rem 2.5rem',
          background: '#fff',
          color: '#9B59B6',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '1rem'
        }}>
          Create Your Free Account
        </Link>
        <Link href="/feed" style={{
          padding: '0.85rem 2.5rem',
          background: 'transparent',
          color: '#fff',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          border: '2px solid rgba(255,255,255,0.5)'
        }}>
          Explore the Platform
        </Link>
      </div>
    </section>
  );
}
