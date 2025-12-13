'use client';

const features = [
  {
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    title: 'Anonymous Sharing',
    description: 'Express your deepest feelings, struggles, and confessions completely anonymously. Your identity is protected, your voice is heard.',
    color: '#1ABC9C',
    image: '/images/feature-tasks.svg'
  },
  {
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    title: 'Compassionate Support',
    description: 'Receive encouragement, guidance, and emotional support from caring community members and mentors.',
    color: '#9B59B6',
    image: '/images/feature-tasks.svg'
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Safe & Protected',
    description: 'No bullying, no judgement, no identity exposure. A strictly moderated space where emotional safety is our priority.',
    color: '#4DA8DA',
    image: '/images/feature-messages.svg'
  },
  {
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    title: 'Daily Healing Prompts',
    description: 'Guided questions and reflection exercises to help you process emotions, track healing, and find clarity.',
    color: '#FF6B35',
    image: '/images/feature-reels.svg'
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    title: 'Supportive Community',
    description: 'Connect with others who understand. Share support, find mentors, and build a tribe of healing.',
    color: '#FF6F91',
    image: '/images/feature-tasks.svg'
  },
  {
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    title: 'Motivation & Direction',
    description: 'Find purpose, build confidence, and discover your path forward with guidance and inspirational content.',
    color: '#1ABC9C',
    image: '/images/feature-tasks.svg'
  }
];

export default function FeaturesBlocks() {
  return (
    <section style={{
      padding: '6rem 0',
      background: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decoration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1000px',
        height: '1000px',
        background: 'radial-gradient(circle, rgba(26, 188, 156, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        position: 'relative'
      }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.1) 0%, rgba(155, 89, 182, 0.1) 100%)',
            padding: '0.5rem 1.25rem',
            borderRadius: '50px',
            marginBottom: '1rem'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ABC9C" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}>
              SAFE SPACE FEATURES
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#1a1a2e',
            marginBottom: '1rem'
          }}>
            Your Journey to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Emotional Freedom
            </span>
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Everything you need to express yourself safely, receive compassionate support, 
            and begin your healing journey in a judgement-free environment.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid #e5e7eb',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Hover Gradient Background */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${feature.color}05 0%, ${feature.color}10 100%)`,
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} className="card-bg" />

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon Container */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${feature.color}15 0%, ${feature.color}25 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  transition: 'all 0.3s ease'
                }} className="icon-container">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={feature.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={feature.icon} />
                  </svg>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  marginBottom: '0.75rem',
                  transition: 'color 0.3s ease'
                }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  margin: 0,
                  marginBottom: '1.5rem'
                }}>
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: feature.color,
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }} className="learn-more">
                  <span>Learn more</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Bottom Gradient Line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${feature.color} 0%, transparent 100%)`,
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.3s ease'
              }} className="bottom-line" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
          border-color: transparent;
        }
        .feature-card:hover .card-bg {
          opacity: 1;
        }
        .feature-card:hover .icon-container {
          transform: scale(1.1);
        }
        .feature-card:hover .bottom-line {
          transform: scaleX(1);
        }
        .feature-card:hover .learn-more {
          gap: 0.75rem;
        }
        .learn-more {
          transition: gap 0.3s ease;
        }
      `}</style>
    </section>
  );
}

