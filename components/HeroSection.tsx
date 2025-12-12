import Link from 'next/link';
import { SITE } from '@/lib/constants';

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
        {/* Gradient Orbs */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26, 188, 156, 0.3) 0%, transparent 70%)',
          top: '-200px',
          right: '-100px',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155, 89, 182, 0.3) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-100px',
          filter: 'blur(60px)'
        }} />
        
        {/* Grid Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
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
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
              Productivity Reimagined
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '1.5rem'
          }}>
            Work Smarter with{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              No Mask World
            </span>
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '500px'
          }}>
            A modern digital platform built to simplify the way you work, learn, collaborate, 
            and manage your daily tasks. Real productivity. Real results.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.1rem',
                padding: '1rem 2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(26, 188, 156, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              Get Started Free
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.1rem',
                padding: '1rem 2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '3rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/*
              '10K+' | '50K+' | '99%' could be values coming from props or state in a real app
              For this example, they are hardcoded as per the original request
              Similarly, Active Users, Tasks Completed, Uptime are labels that could also be dynamic
            */}
            {/*
              - Using `key` prop in map function to help React identify which items have changed
              - Using `value` and `label` fields to dynamically display stats
            */}
            { [
                { value: '10K+', label: 'Active Users' },
                { value: '50K+', label: 'Tasks Completed' },
                { value: '99%', label: 'Uptime' }
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginTop: '0.25rem'
                  }}>
                    {stat.label}
                  </div>
                </div>
              )) }
          </div>
        </div>

        {/* Right Visual */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Main Dashboard Preview */}
          <div style={{
            width: '100%',
            maxWidth: '500px',
            aspectRatio: '4/3',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            {/* Mock Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF6B6B' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFE66D' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4ECB71' }} />
            </div>
            
            {/* Mock Content */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              {/*
                - Items array contains icons (as paths), labels, and values for mock data
                - Each item is mapped to a grid item showing an icon, label, and value
              */}
              { [
                  { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', label: 'Tasks', value: '24' },
                  { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', label: 'Messages', value: '12' },
                  { icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', label: 'Alerts', value: '5' },
                  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', label: 'Team', value: '8' }
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1ABC9C" strokeWidth="2" style={{ marginBottom: '0.5rem' }}>
                      <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>{item.label}</div>
                    <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{item.value}</div>
                  </div>
                )) }
            </div>
          </div>

          {/* Floating Elements */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
            borderRadius: '16px',
            padding: '1rem 1.5rem',
            boxShadow: '0 10px 40px rgba(26, 188, 156, 0.4)',
            animation: 'float 3s ease-in-out infinite'
          }}>
            <div style={{ color: '#fff', fontSize: '0.75rem', opacity: 0.8 }}>Productivity</div>
            <div style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700 }}>+45%</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>Scroll to explore</span>
        <div style={{
          width: '24px',
          height: '40px',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '8px'
        }}>
          <div style={{
            width: '4px',
            height: '8px',
            background: '#1ABC9C',
            borderRadius: '2px',
            animation: 'scroll 1.5s ease-in-out infinite'
          }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 968px) {
          section > div > div:first-child > div {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
