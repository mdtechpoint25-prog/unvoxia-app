'use client';

const features = [
  {
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    title: 'Smart Feed',
    description: 'Share ideas, projects, updates, and creative work with your community in a beautifully organized feed.',
    color: '#1ABC9C',
    image: '/images/feature-tasks.svg'
  },
  {
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    title: 'Task Management',
    description: 'Organize assignments, track deadlines, and manage tasks with an intuitive drag-and-drop interface.',
    color: '#9B59B6',
    image: '/images/feature-tasks.svg'
  },
  {
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    title: 'Private Messaging',
    description: 'Secure communication with consent-based chat initiation and end-to-end encrypted conversations.',
    color: '#4DA8DA',
    image: '/images/feature-messages.svg'
  },
  {
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    title: 'Media Reels',
    description: 'Share short videos and creative moments with reactions, captions, and seamless playback.',
    color: '#FF6B35',
    image: '/images/feature-reels.svg'
  },
  {
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Daily Prompts',
    description: 'Boost creativity and sharpen thinking with personalized daily exercises and reflection prompts.',
    color: '#FF6F91',
    image: '/images/feature-tasks.svg'
  },
  {
    icon: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Rich Profiles',
    description: 'Showcase your identity with customizable avatars, achievement badges, and portfolio items.',
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
              POWERFUL FEATURES
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#1a1a2e',
            marginBottom: '1rem'
          }}>
            Everything You Need to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Succeed
            </span>
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Powerful tools designed to boost your productivity, streamline collaboration, 
            and help you achieve real results every day.
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

