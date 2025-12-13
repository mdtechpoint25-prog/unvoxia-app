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
              Safe Space for Healing
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '1.5rem'
          }}>
            Speak Without Fear.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Heal
            </span>
            {' '}Without Judgement
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '540px'
          }}>
            NOMA is a safe, anonymous healing platform where you can freely express your true feelings, 
            receive emotional support, and find healing without fear of judgement. You are heard. You are safe. You are not alone.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/share"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.1rem',
                padding: '1rem 2.5rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(26, 188, 156, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              Share What You're Feeling
              <span>→</span>
            </Link>
            <Link
              href="/circles"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.1rem',
                padding: '1rem 2.5rem',
                borderRadius: '12px',
                textDecoration: 'none',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              Join Healing Circles
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
              { value: '100%', label: 'Anonymous', icon: '🔒' },
              { value: '24/7', label: 'Always Here', icon: '💚' },
              { value: '0', label: 'Judgement', icon: '✨' }
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
                  backgroundClip: 'text',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>{stat.icon}</span>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginTop: '0.5rem'
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

