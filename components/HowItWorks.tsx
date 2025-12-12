const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up in seconds with your email. No credit card required. Start with our generous free plan.',
    icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
  },
  {
    number: '02',
    title: 'Set Up Your Workspace',
    description: 'Customize your profile, create projects, and invite team members to collaborate on tasks.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
  },
  {
    number: '03',
    title: 'Collaborate & Create',
    description: 'Share ideas in the feed, message teammates, track progress, and achieve your goals together.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
  },
  {
    number: '04',
    title: 'Achieve Real Results',
    description: 'Track your productivity, celebrate milestones, and watch your projects come to life with NOMA.',
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
            Get Started in{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Minutes
            </span>
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Four simple steps to transform your productivity and start achieving real results.
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
