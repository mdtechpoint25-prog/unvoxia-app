const testimonials = [
  {
    quote: 'NOMA simplified my entire workflow. I no longer switch between apps - everything lives in one place now. The productivity boost has been incredible.',
    name: 'Grace Wanjiku',
    role: 'Freelance Designer',
    avatar: 'GW',
    color: '#1ABC9C',
    rating: 5
  },
  {
    quote: 'The project system is a lifesaver for academic work. Clean, simple, and reliable. I managed to complete my thesis on time thanks to NOMA.',
    name: 'Daniel Ochieng',
    role: 'Graduate Student',
    avatar: 'DO',
    color: '#9B59B6',
    rating: 5
  },
  {
    quote: 'Authentic interactions, meaningful tools, and real productivity. NOMA is different from anything else I have tried. Highly recommended!',
    name: 'Lydia Muthoni',
    role: 'Business Owner',
    avatar: 'LM',
    color: '#4DA8DA',
    rating: 5
  },
  {
    quote: 'The messaging feature with consent flow is exactly what we needed for our team. Professional and secure communication made easy.',
    name: 'James Kariuki',
    role: 'Team Lead',
    avatar: 'JK',
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
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(26, 188, 156, 0.1) 1px, transparent 0)`,
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
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.1) 0%, rgba(155, 89, 182, 0.1) 100%)',
            padding: '0.5rem 1.25rem',
            borderRadius: '50px',
            marginBottom: '1rem'
          }}>
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
            Loved by{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
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
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
              }}
            >
              {/* Quote Icon */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                opacity: 0.1
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill={testimonial.color}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FFD700">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                color: '#4b5563',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                fontStyle: 'italic'
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
                {/* Avatar */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${testimonial.color} 0%, ${testimonial.color}cc 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem'
                }}>
                  {testimonial.avatar}
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
                    color: '#9ca3af',
                    fontSize: '0.875rem'
                  }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

