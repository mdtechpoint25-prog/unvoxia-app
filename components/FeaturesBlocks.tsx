'use client';

const features = [
  {
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    title: 'Authentic Feed',
    description: 'NOMA\'s feed is built around raw expression and individuality. No perfect influencers, no pressure to impress, and no algorithm manipulating your emotions. Posts appear based on relevance, not artificial popularity.',
    color: '#0d9488'
  },
  {
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    title: 'Scalable Reels',
    description: 'Full-screen auto-adjusting videos that dynamically scale to fill your device without stretching or cropping. Autoplay, loop smoothly, and react directly on the overlay. Real content, not exaggerated trends.',
    color: '#7c3aed'
  },
  {
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Daily Prompts',
    description: 'Every 24 hours, NOMA provides a unique thought-provoking prompt designed to promote self-awareness and emotional reflection. Responses are organized into a calendar view, creating a timeline of personal growth.',
    color: '#ea580c'
  },
  {
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    title: 'Private Messaging',
    description: 'Conversations begin only when both parties consent to connect. Chats are encrypted, and users can choose between identity-revealed chatting or anonymous mode for honest conversations.',
    color: '#0284c7'
  },
  {
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    title: 'Profiles That Tell Your Story',
    description: 'A NOMA profile isn\'t a curated highlight reel—it\'s a story. Showcases user badges, creative achievements, prompt streaks, and personal milestones. It reflects who you are, not what society expects.',
    color: '#db2777'
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Safe & Supportive',
    description: 'No bullying, no judgement, no pressure. A moderated space where authenticity is celebrated and individuality is protected. Express yourself freely without fear.',
    color: '#0d9488'
  }
];

export default function FeaturesBlocks() {
  return (
    <section id="features" style={{
      padding: '5rem 0',
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
        background: 'radial-gradient(circle, rgba(13, 148, 136, 0.02) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        position: 'relative'
      }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            display: 'inline-block',
            color: '#0d9488',
            fontWeight: 600,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}>
            Platform Features
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            Built for Authentic Expression
          </h2>
          <p style={{
            fontSize: '1.0625rem',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Every feature is engineered to allow you to express your true self without 
            fear of judgment. Authenticity is normal here, and individuality is celebrated.
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
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  marginBottom: '0.75rem'
                }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: '#64748b',
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  margin: 0,
                  marginBottom: '1.25rem'
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
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border-color: #e2e8f0;
        }
        .feature-card:hover .card-bg {
          opacity: 1;
        }
        .feature-card:hover .bottom-line {
          transform: scaleX(1);
        }
        .feature-card:hover .learn-more {
          gap: 0.625rem;
        }
        .learn-more {
          transition: gap 0.2s ease;
        }
      `}</style>
    </section>
  );
}

