'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #1ABC9C 100%)',
      overflow: 'hidden',
      paddingTop: '5rem'
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
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26, 188, 156, 0.4) 0%, transparent 70%)',
          top: '-200px',
          right: '-100px',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155, 89, 182, 0.4) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-100px',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Left Content */}
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#1ABC9C',
              boxShadow: '0 0 10px #1ABC9C'
            }} />
            <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem', fontWeight: 500 }}>
              Authenticity Reimagined
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '1.5rem'
          }}>
            Welcome to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              NOMA
            </span>
            {' '}- A World With No Masks
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '540px'
          }}>
            NOMA is the social platform created for authenticity. No filters, no pressure, 
            no pretending - just real people sharing real thoughts and real life.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.1rem',
                padding: '1rem 2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(26, 188, 156, 0.4)'
              }}
            >
              Join NOMA
              <span>-&gt;</span>
            </Link>
            <Link
              href="#features"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.1rem',
                padding: '1rem 2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              Explore Features
            </Link>
          </div>

          <div style={{
            display: 'flex',
            gap: '3rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {[
              { value: '10K+', label: 'Real Voices' },
              { value: '50K+', label: 'Authentic Posts' },
              { value: '100%', label: 'No Filters' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginTop: '0.25rem'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.2) 0%, rgba(155, 89, 182, 0.2) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(26, 188, 156, 0.4)'
            }}>
              <span style={{
                fontSize: '8rem',
                fontWeight: 900,
                color: '#fff',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}>
                N
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section > div:last-child {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}

