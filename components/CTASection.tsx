'use client';

import Link from 'next/link';
import { SITE } from '@/lib/constants';

export default function CTASection() {
  return (
    <section style={{
      padding: '6rem 0',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #2C3E50 100%)',
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
        {/* Gradient Orbs */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26, 188, 156, 0.2) 0%, transparent 70%)',
          top: '-200px',
          right: '-100px',
          filter: 'blur(40px)'
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155, 89, 182, 0.2) 0%, transparent 70%)',
          bottom: '-150px',
          left: '-100px',
          filter: 'blur(40px)'
        }} />
        
        {/* Floating shapes */}
        <div style={{
          position: 'absolute',
          width: '60px',
          height: '60px',
          borderRadius: '12px',
          border: '2px solid rgba(26, 188, 156, 0.3)',
          top: '20%',
          left: '10%',
          transform: 'rotate(45deg)',
          animation: 'float 4s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(155, 89, 182, 0.3)',
          top: '60%',
          right: '15%',
          animation: 'float 3s ease-in-out infinite 1s'
        }} />
      </div>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 1.5rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(26, 188, 156, 0.15)',
          border: '1px solid rgba(26, 188, 156, 0.3)',
          padding: '0.5rem 1.25rem',
          borderRadius: '50px',
          marginBottom: '2rem'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ABC9C" strokeWidth="2">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color: '#1ABC9C', fontWeight: 600, fontSize: '0.875rem' }}>
            Anonymous & Safe
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          color: '#fff',
          marginBottom: '1.5rem'
        }}>
          Ready to Begin Your{' '}
          <span style={{
            background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Healing Journey?
          </span>
        </h2>
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: 1.7,
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          Join a compassionate community where you can speak your truth without fear. 
          Your healing starts here, completely anonymous and safe.
        </p>
          color: '#fff',
          marginBottom: '1.5rem',
          lineHeight: 1.2
        }}>
          Ready to Transform Your{' '}
          <span style={{
            background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Productivity?
          </span>
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.7)',
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7
        }}>
          Join thousands of users who have already discovered the power of authentic, 
          streamlined productivity with {SITE.name}.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          <Link
            href="/signup"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.125rem',
              padding: '1rem 2.5rem',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 10px 40px rgba(26, 188, 156, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            Create Free Account
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/billing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.125rem',
              padding: '1rem 2.5rem',
              borderRadius: '12px',
              textDecoration: 'none',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            View Pricing
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
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: '0.9rem' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-15px) rotate(45deg); }
        }
      `}</style>
    </section>
  );
}

