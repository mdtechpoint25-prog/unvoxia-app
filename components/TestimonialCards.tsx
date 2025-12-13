'use client';

const testimonials = [
  {
    quote: 'NOMA gave me the courage to share things I could never say out loud. The anonymity made me feel safe, and the support I received helped me start healing.',
    name: 'Grace W.',
    role: 'NOMA Member',
    avatar: '/images/avatar-1.svg',
    color: '#1ABC9C',
    rating: 5
  },
  {
    quote: 'For the first time, I felt heard without judgement. The compassionate responses from strangers reminded me I\'m not alone in my struggles.',
    name: 'Daniel O.',
    role: 'Finding My Path',
    avatar: '/images/avatar-2.svg',
    color: '#9B59B6',
    rating: 5
  },
  {
    quote: 'NOMA became my safe space when everything else felt overwhelming. Being anonymous let me be vulnerable, and that vulnerability led to genuine healing.',
    name: 'Lydia M.',
    role: 'Healing Journey',
    avatar: '/images/avatar-3.svg',
    color: '#4DA8DA',
    rating: 5
  },
  {
    quote: 'The mentorship and support I found here changed my perspective. Sometimes we just need someone to listen without knowing who we are.',
    name: 'James K.',
    role: 'Grateful Member',
    avatar: '/images/avatar-4.svg',
    color: '#FF6B35',
    rating: 5
  }
];

export default function TestimonialCards() {
  return (
    <section style={{
      padding: '6rem 0',
      background: 'linear-gradient(180deg, #f9fafb 0%, #fff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(26, 188, 156, 0.08) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}>
              TESTIMONIALS
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#1a1a2e',
            marginBottom: '1rem'
          }}>
            Stories of{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Hope & Healing
            </span>
          </h2>
              Thousands
            </span>
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            See what our users are saying about their experience with No Mask World.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card"
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative corner gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: `linear-gradient(135deg, ${testimonial.color}10 0%, transparent 100%)`,
                borderRadius: '0 20px 0 100px'
              }} />

              {/* Quote Icon */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                opacity: 0.15
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill={testimonial.color}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FFD700">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                color: '#4b5563',
                fontSize: '1rem',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 1
              }}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                {/* Avatar Image */}
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: `0 4px 15px ${testimonial.color}30`
                }}>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div>
                  <div style={{
                    fontWeight: 600,
                    color: '#1a1a2e',
                    fontSize: '1rem'
                  }}>
                    {testimonial.name}
                  </div>
                  <div style={{
                    color: testimonial.color,
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
}

