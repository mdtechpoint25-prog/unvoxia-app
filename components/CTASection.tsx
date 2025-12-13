'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section style={{
      padding: '5rem 0',
      background: '#0f172a',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {/* Subtle gradient */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, transparent 70%)',
          top: '-200px',
          right: '-100px'
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
          bottom: '-150px',
          left: '-100px'
        }} />
      </div>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 1.5rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Heading */}
        <h2 style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          color: '#fff',
          marginBottom: '1.25rem'
        }}>
          Ready to Begin Your Healing Journey?
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          maxWidth: '560px',
          margin: '0 auto 2.5rem'
        }}>
          Join a compassionate community where you can speak your truth without fear. 
          Your healing starts here, completely anonymous and safe.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          <Link
            href="/share"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#0d9488',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '0.875rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background 0.2s ease'
            }}
          >
            Share What You're Feeling
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/circles"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '0.875rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              transition: 'border-color 0.2s ease'
            }}
          >
            Join a Healing Circle
          </Link>
        </div>

        {/* Trust Indicators */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: 'Secure & Private' },
            { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Free to Start' },
            { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', text: '10K+ Users' }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: '0.875rem' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

