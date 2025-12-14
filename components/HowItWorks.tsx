const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Sign up with email or phone. No pressure to use your real name—be yourself, however you want.',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    number: '02',
    title: 'Express Authentically',
    description: 'Share text, images, audio, or videos. Post to the feed or create reels. No filters needed.',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
  },
  {
    number: '03',
    title: 'Connect & Engage',
    description: 'React to posts, leave comments, and connect with others through private messaging.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
  },
  {
    number: '04',
    title: 'Grow & Reflect',
    description: 'Answer daily prompts, track your journey with badges, and build a timeline of personal growth.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
  }
];

export default function HowItWorks() {
  return (
    <section style={{
      padding: '5rem 0',
      background: '#fff',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem'
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
            How It Works
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            Start Being Yourself
          </h2>
          <p style={{
            fontSize: '1.0625rem',
            color: '#64748b',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Four simple steps to join NOMA and start expressing your authentic self.
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
            background: '#0d9488',
            opacity: 0.2,
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
                width: '72px',
                height: '72px',
                margin: '0 auto 1.25rem',
                borderRadius: '16px',
                background: '#0d9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <svg
                  width="28"
                  height="28"
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
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#fff',
                  border: '2px solid #0d9488',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  color: '#0d9488'
                }}>
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#1e293b',
                marginBottom: '0.5rem'
              }}>
                {step.title}
              </h3>
              <p style={{
                color: '#64748b',
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                maxWidth: '260px',
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
