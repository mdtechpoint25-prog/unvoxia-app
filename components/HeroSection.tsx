'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #134e4a 100%)',
      overflow: 'hidden',
      paddingTop: '5rem'
    }}>
      {/* Subtle Background Elements */}
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
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, transparent 60%)',
          top: '-300px',
          right: '-200px',
          filter: 'blur(80px)'
        }} />
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 60%)',
          bottom: '-200px',
          left: '-150px',
          filter: 'blur(80px)'
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
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#14b8a6'
            }} />
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.8125rem', fontWeight: 500 }}>
              Safe Space for Healing
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#fff',
            marginBottom: '1.5rem',
            letterSpacing: '-0.025em'
          }}>
            Speak Without Fear.{' '}
            <span style={{
              color: '#14b8a6'
            }}>
              Heal
            </span>
            {' '}Without Judgement
          </h1>

          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.6)',
            lineHeight: 1.7,
            marginBottom: '2rem',
            maxWidth: '520px'
          }}>
            A safe, anonymous platform where you can freely express your feelings, 
            receive support, and find healing. You are heard. You are not alone.
          </p>

          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            <Link
              href="/share"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#0d9488',
                color: '#fff',
                fontWeight: 500,
                fontSize: '1rem',
                padding: '0.875rem 1.75rem',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Share Your Story
              <span style={{ opacity: 0.7 }}>→</span>
            </Link>
            <Link
              href="/circles"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                color: '#fff',
                fontWeight: 500,
                fontSize: '1rem',
                padding: '0.875rem 1.75rem',
                borderRadius: '8px',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >
              Join Communities
            </Link>
          </div>

          <div style={{
            display: 'flex',
            gap: '2.5rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {[
              { value: '100%', label: 'Anonymous' },
              { value: '24/7', label: 'Support' },
              { value: 'Free', label: 'Forever' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#14b8a6',
                  lineHeight: 1
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginTop: '0.375rem'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Visual Elements */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Floating Cards Animation */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '500px'
          }}>
            {/* Card 1 - Top */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '300px',
              animation: 'float 6s ease-in-out infinite'
            }}>
              <div style={{
                color: '#1ABC9C',
                fontSize: '2rem',
                marginBottom: '0.5rem'
              }}>💭</div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.9rem',
                margin: 0,
                lineHeight: 1.5
              }}>
                "Finally, a place where I can express my feelings without fear..."
              </p>
              <div style={{
                marginTop: '0.75rem',
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)'
              }}>
                - Anonymous Voice
              </div>
            </div>

            {/* Card 2 - Middle Left */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '0',
              background: 'rgba(155, 89, 182, 0.15)',
              backdropFilter: 'blur(20px)',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(155, 89, 182, 0.3)',
              maxWidth: '280px',
              animation: 'float 7s ease-in-out infinite 1s'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1ABC9C, #9B59B6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}>💚</div>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  Compassionate Response
                </span>
              </div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.85rem',
                margin: 0
              }}>
                You're not alone in this...
              </p>
            </div>

            {/* Card 3 - Middle Right */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '0',
              background: 'rgba(26, 188, 156, 0.15)',
              backdropFilter: 'blur(20px)',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(26, 188, 156, 0.3)',
              maxWidth: '260px',
              animation: 'float 8s ease-in-out infinite 2s'
            }}>
              <div style={{
                color: '#1ABC9C',
                fontSize: '1.5rem',
                marginBottom: '0.5rem'
              }}>🌟</div>
              <h4 style={{
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '0.95rem',
                margin: '0 0 0.5rem 0',
                fontWeight: 600
              }}>Healing Circles</h4>
              <p style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.8rem',
                margin: 0,
                lineHeight: 1.4
              }}>
                Join supportive communities focused on specific healing journeys
              </p>
            </div>

            {/* Card 4 - Bottom */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              padding: '1.25rem 1.75rem',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              animation: 'float 6s ease-in-out infinite 3s'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1ABC9C, #9B59B6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 4px 12px rgba(26, 188, 156, 0.4)'
              }}>🔒</div>
              <div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>100% Anonymous</div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.75rem'
                }}>Your identity is protected</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
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

