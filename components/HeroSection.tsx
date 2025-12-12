'use client';

import Link from 'next/link';
import Image from 'next/image';
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
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {/* Glowing Orbs */}
        <div className="orb orb-1" style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26, 188, 156, 0.4) 0%, transparent 70%)',
          top: '-200px',
          right: '-100px',
          filter: 'blur(60px)',
          animation: 'pulse-slow 4s ease-in-out infinite'
        }} />
        <div className="orb orb-2" style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155, 89, 182, 0.4) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-100px',
          filter: 'blur(60px)',
          animation: 'pulse-slow 4s ease-in-out infinite 2s'
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

        {/* Floating Particles */}
        <div className="particle" style={{
          position: 'absolute',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#1ABC9C',
          top: '20%',
          left: '10%',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div className="particle" style={{
          position: 'absolute',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#9B59B6',
          top: '60%',
          left: '20%',
          animation: 'float 8s ease-in-out infinite 1s'
        }} />
        <div className="particle" style={{
          position: 'absolute',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: '#fff',
          top: '30%',
          right: '15%',
          animation: 'float 5s ease-in-out infinite 0.5s'
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
      }} className="hero-grid">
        {/* Left Content */}
        <div className="hero-content">
          {/* Badge */}
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
              boxShadow: '0 0 10px #1ABC9C'
            }} className="pulse-dot" />
            <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem', fontWeight: 500 }}>
              Productivity Reimagined
            </span>
          </div>

          {/* Headline */}
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

          {/* Description */}
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

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/signup"
              className="btn-primary-hero"
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
                boxShadow: '0 10px 30px rgba(26, 188, 156, 0.4)',
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
              className="btn-secondary-hero"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" />
              </svg>
              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '3rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }} className="hero-stats">
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '50K+', label: 'Tasks Completed' },
              { value: '99.9%', label: 'Uptime' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
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
            ))}
          </div>
        </div>

        {/* Right Visual - Dashboard Image */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }} className="hero-image">
          {/* Main Dashboard Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '550px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <img 
              src="/images/hero-dashboard.svg" 
              alt="NOMA Dashboard Preview"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Floating Badge - Top Right */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
            borderRadius: '16px',
            padding: '1rem 1.5rem',
            boxShadow: '0 10px 40px rgba(26, 188, 156, 0.4)',
            animation: 'float 3s ease-in-out infinite'
          }} className="floating-badge">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600 }}>+45% Productivity</span>
            </div>
          </div>

          {/* Floating Badge - Bottom Left */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '-20px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            animation: 'float 4s ease-in-out infinite 1s'
          }} className="floating-badge-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Task Completed</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1a1a2e' }}>Project Launch</div>
              </div>
            </div>
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
          <div className="scroll-dot" style={{
            width: '4px',
            height: '8px',
            background: '#1ABC9C',
            borderRadius: '2px'
          }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .pulse-dot {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px #1ABC9C; }
          50% { opacity: 0.7; box-shadow: 0 0 20px #1ABC9C; }
        }
        .scroll-dot {
          animation: scroll-bounce 1.5s ease-in-out infinite;
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.5; }
        }
        .btn-primary-hero:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(26, 188, 156, 0.5);
        }
        .btn-secondary-hero:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
        }
        @media (max-width: 968px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-content {
            order: 1;
          }
          .hero-image {
            order: 2;
            margin-top: 2rem;
          }
          .hero-stats {
            justify-content: center;
          }
          .floating-badge, .floating-badge-2 {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

