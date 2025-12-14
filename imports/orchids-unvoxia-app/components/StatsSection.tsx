'use client';

export default function StatsSection() {
  const stats = [
    {
      value: '50,000+',
      label: 'Anonymous Stories Shared',
      description: 'Real people, real healing',
      icon: '💬',
      color: '#1ABC9C'
    },
    {
      value: '9',
      label: 'Healing Circles',
      description: 'Supportive communities for every journey',
      icon: '🌟',
      color: '#9B59B6'
    },
    {
      value: '24/7',
      label: 'Always Available',
      description: 'Support when you need it most',
      icon: '💚',
      color: '#4DA8DA'
    },
    {
      value: '100%',
      label: 'Completely Anonymous',
      description: 'No names, emails, or tracking',
      icon: '🔒',
      color: '#FF6B35'
    }
  ];

  return (
    <section style={{
      padding: '5rem 0',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafb 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(26, 188, 156, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(155, 89, 182, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: '#1a1a2e',
            marginBottom: '1rem'
          }}>
            A Safe Space for{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Real Healing
            </span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Join thousands who have found the courage to share, heal, and grow in our compassionate community
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
              }}
            >
              {/* Background Gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${stat.color}, ${stat.color}dd)`
              }} />

              {/* Icon */}
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
              }}>
                {stat.icon}
              </div>

              {/* Value */}
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#1a1a2e',
                marginBottom: '0.5rem',
                lineHeight: 1
              }}>
                {stat.value}
              </div>

              {/* Label */}
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: stat.color,
                marginBottom: '0.75rem'
              }}>
                {stat.label}
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.9rem',
                color: '#6b7280',
                margin: 0,
                lineHeight: 1.5
              }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div style={{
          marginTop: '4rem',
          padding: '2.5rem',
          background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.05) 0%, rgba(155, 89, 182, 0.05) 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(26, 188, 156, 0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { icon: '🔒', title: 'No Tracking', desc: 'No IP addresses logged' },
              { icon: '🙈', title: 'No Accounts', desc: 'Share instantly without signup' },
              { icon: '🚫', title: 'No Judgement', desc: 'Strictly moderated for safety' },
              { icon: '🇰🇪', title: 'Made in Kenya', desc: 'Built with African values' }
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#1a1a2e',
                  marginBottom: '0.25rem'
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
