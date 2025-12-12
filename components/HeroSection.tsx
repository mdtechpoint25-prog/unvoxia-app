import Link from 'next/link';
import { SITE } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section style={{
      padding: '5rem 2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
      color: '#fff'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
        fontSize: '2.5rem',
        fontWeight: 700
      }}>N</div>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 700 }}>
        Welcome to {SITE.name}
      </h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', opacity: 0.95 }}>
        {SITE.tagline}
      </p>
      <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
        A modern digital platform built to simplify the way you work, learn, collaborate, and manage your daily tasks. 
        Whether you are a freelancer, student, creator, or business - NOMA provides tools that streamline communication, 
        enhance productivity, and deliver real results.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/signup" style={{
          padding: '0.85rem 2.5rem',
          background: '#fff',
          color: '#1ABC9C',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '1.1rem'
        }}>
          Create Account
        </Link>
        <Link href="/about" style={{
          padding: '0.85rem 2.5rem',
          background: 'transparent',
          color: '#fff',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '1.1rem',
          border: '2px solid rgba(255,255,255,0.5)'
        }}>
          Explore Features
        </Link>
      </div>
    </section>
  );
}
