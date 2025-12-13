'use client';

import Link from 'next/link';
import { HEALING_CIRCLES } from '@/lib/healing-circles';

export default function CirclesPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      padding: '6rem 1rem 3rem'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '0.75rem'
          }}>
            Healing Circles
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#7a8a9a',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Join anonymous communities where you can share experiences, receive support, 
            and connect with others who understand. No judgement. No names. Just healing.
          </p>
        </div>

        {/* Trust Message */}
        <div style={{
          background: 'rgba(26, 188, 156, 0.05)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '3rem',
          borderLeft: '4px solid #1ABC9C',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🔒</span>
            <div>
              <p style={{
                fontSize: '0.95rem',
                color: '#5a6c7d',
                margin: 0,
                lineHeight: 1.6
              }}>
                <strong>Your safety matters:</strong> Everything shared in Circles is anonymous. 
                No usernames, no profiles, no history tracking. Share freely.
              </p>
            </div>
          </div>
        </div>

        {/* Circles Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {HEALING_CIRCLES.map((circle) => (
            <div
              key={circle.id}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s ease',
                borderLeft: `4px solid ${circle.color}`,
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
              }}
            >
              <Link
                href={`/circles/${circle.id}`}
                style={{
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
              {/* Circle Icon */}
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                {circle.emoji}
              </div>

              {/* Circle Name */}
              <h3 style={{
                fontSize: '1.375rem',
                fontWeight: 700,
                color: '#2C3E50',
                marginBottom: '0.75rem',
                lineHeight: 1.3
              }}>
                {circle.name}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: '#7a8a9a',
                marginBottom: '1.25rem'
              }}>
                {circle.description}
              </p>

              {/* Enter Button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: circle.color,
                fontWeight: 600,
                fontSize: '0.95rem'
              }}>
                <span>Enter Circle</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          padding: '2rem',
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '0.75rem'
          }}>
            Don't see your topic?
          </h3>
          <p style={{
            fontSize: '1rem',
            color: '#7a8a9a',
            marginBottom: '1.5rem',
            lineHeight: 1.6
          }}>
            Share your experience in any circle, or use our general sharing space.
          </p>
          <Link
            href="/share"
            style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
              borderRadius: '50px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(26, 188, 156, 0.25)',
              transition: 'transform 0.2s ease'
            }}
          >
            Share Anonymously
          </Link>
        </div>
      </div>
    </main>
  );
}
