const steps = [
  {
    number: '01',
    title: 'Share Instantly',
    description: 'No signup needed. Just visit and share what you\'re feeling. Your identity stays completely anonymous.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
  },
  {
    number: '02',
    title: 'Express Your Truth',
    description: 'Share your deepest struggles, feelings, or confessions. No judgement. No exposure. No names.',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
  },
  {
    number: '03',
    title: 'Receive Support',
    description: 'Get compassionate responses and emotional support from the community. You are heard.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    number: '04',
    title: 'Begin Healing',
    description: 'Find clarity, join healing circles, and discover your path forward with guidance and community.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
  }
];

export default function HowItWorks() {
  return (
    <section style={{
      padding: '6rem 0',
      background: '#fff',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem'
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
              HOW IT WORKS
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#1a1a2e',
            marginBottom: '1rem'
          }}>
            Your Path to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Healing
            </span>
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Four simple steps to begin your healing journey in a safe, anonymous environment.
          </p>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          position: 'relative'
        }}>
          {/* Connection Line (desktop) */}
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '15%',
            right: '15%',
            height: '2px',
            background: 'linear-gradient(90deg, #1ABC9C 0%, #9B59B6 100%)',
            opacity: 0.3,
            display: 'none' // Show on larger screens via media query
          }} className="connection-line" />

          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                position: 'relative'
              }}
            >
              {/* Step Number with Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(26, 188, 156, 0.3)'
              }}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={step.icon} />
                </svg>
                {/* Step Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: '#1ABC9C'
                }}>
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: '0.75rem'
              }}>
                {step.title}
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                maxWidth: '280px',
                margin: '0 auto'
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
