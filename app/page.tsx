"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Real Conversations",
      description: "Connect with others who understand. Share your story anonymously or openly."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Supportive Community",
      description: "A safe space for healing, growth, and genuine human connection."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Private & Secure",
      description: "Your privacy matters. Share at your own pace with full control."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Daily Prompts",
      description: "Guided prompts to help you reflect, express, and grow each day."
    }
  ];

  const stats = [
    { value: "50K+", label: "Stories Shared" },
    { value: "100K+", label: "Connections Made" },
    { value: "4.9", label: "App Rating" },
    { value: "24/7", label: "Community Support" }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <div className="logo-icon">
              <span>U</span>
            </div>
            <span className="logo-text">Unvoxia</span>
          </Link>
          
          <div className="nav-links">
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            <Link href="/safety" className="nav-link">Safety</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>
          
          <div className="nav-actions">
            <Link href="/login" className="btn-ghost">Sign In</Link>
            <Link href="/signup" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`hero ${isVisible ? 'visible' : ''}`}>
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-pattern" />
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>Trusted by 100,000+ people worldwide</span>
          </div>
          
          <h1 className="hero-title">
            A Space to <span className="highlight">Be Heard</span>,<br />
            <span className="highlight">Heal</span>, and <span className="highlight">Connect</span>
          </h1>
          
          <p className="hero-subtitle">
            Share your authentic story with a community that truly understands. 
            No judgment, just genuine human connection and support.
          </p>
          
          <div className="hero-cta">
            <Link href="/signup" className="btn-primary btn-lg">
              Join the Community
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/about" className="btn-secondary btn-lg">
              Learn More
            </Link>
          </div>
          
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="app-preview">
                <div className="preview-header">
                  <div className="preview-avatar" />
                  <div className="preview-info">
                    <div className="preview-name" />
                    <div className="preview-status" />
                  </div>
                </div>
                <div className="preview-messages">
                  <div className="preview-msg received" />
                  <div className="preview-msg sent" />
                  <div className="preview-msg received long" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2 className="section-title">Everything You Need to Connect</h2>
            <p className="section-subtitle">
              Designed with care for your mental wellness and authentic self-expression
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Share Your Story?</h2>
            <p className="cta-subtitle">
              Join thousands of people finding connection, support, and healing.
            </p>
            <div className="cta-actions">
              <Link href="/signup" className="btn-primary btn-lg">
                Create Free Account
              </Link>
              <Link href="/feed" className="btn-ghost btn-lg">
                Browse Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="logo-icon">
              <span>U</span>
            </div>
            <p className="footer-tagline">A safe space for authentic connection</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <Link href="/feed">Feed</Link>
              <Link href="/messages">Messages</Link>
              <Link href="/daily-prompts">Daily Prompts</Link>
              <Link href="/circles">Circles</Link>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/safety">Safety</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 Unvoxia. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          backdrop-filter: blur(20px);
          background: rgba(26, 26, 26, 0.8);
          border-bottom: 1px solid var(--border-subtle);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: var(--accent);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--bg-primary);
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .btn-ghost {
          padding: 10px 20px;
          background: transparent;
          color: var(--text-secondary);
          border: none;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          background: var(--overlay-low);
        }

        .btn-primary {
          padding: 10px 24px;
          background: var(--accent);
          color: var(--bg-primary);
          border: none;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        .btn-secondary {
          padding: 10px 24px;
          background: var(--overlay-medium);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: var(--overlay-high);
          border-color: var(--accent);
        }

        .btn-lg {
          padding: 14px 32px;
          font-size: 1rem;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
          padding: 120px 60px 60px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-out;
        }

        .hero.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: -1;
        }

        .hero-gradient {
          position: absolute;
          top: -50%;
          right: -20%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(212, 168, 85, 0.15) 0%, transparent 70%);
          border-radius: 50%;
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .hero-content {
          max-width: 600px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--overlay-low);
          border-radius: 100px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .highlight {
          color: var(--accent);
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
        }

        .hero-stats {
          display: flex;
          gap: 40px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent);
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .phone-mockup {
          width: 320px;
          height: 650px;
          background: linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 100%);
          border-radius: 40px;
          padding: 12px;
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .phone-screen {
          width: 100%;
          height: 100%;
          background: var(--bg-surface);
          border-radius: 32px;
          overflow: hidden;
        }

        .app-preview {
          padding: 20px;
        }

        .preview-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .preview-avatar {
          width: 48px;
          height: 48px;
          background: var(--accent);
          border-radius: 50%;
        }

        .preview-info {
          flex: 1;
        }

        .preview-name {
          height: 14px;
          width: 120px;
          background: var(--overlay-medium);
          border-radius: 4px;
          margin-bottom: 6px;
        }

        .preview-status {
          height: 10px;
          width: 80px;
          background: var(--overlay-low);
          border-radius: 4px;
        }

        .preview-messages {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .preview-msg {
          height: 48px;
          border-radius: 16px;
          background: var(--overlay-low);
        }

        .preview-msg.sent {
          width: 70%;
          margin-left: auto;
          background: rgba(212, 168, 85, 0.2);
        }

        .preview-msg.received {
          width: 80%;
        }

        .preview-msg.long {
          height: 72px;
        }

        /* Features Section */
        .features {
          padding: 100px 24px;
          background: var(--bg-surface);
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-tag {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(212, 168, 85, 0.1);
          color: var(--accent);
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .feature-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s;
        }

        .feature-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          background: rgba(212, 168, 85, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          margin-bottom: 20px;
        }

        .feature-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .feature-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* CTA Section */
        .cta-section {
          padding: 100px 24px;
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-title {
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        /* Footer */
        .footer {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-subtle);
          padding: 60px 24px 24px;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 60px;
          margin-bottom: 40px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-tagline {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-col h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .footer-col a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .footer-col a:hover {
          color: var(--accent);
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
        }

        .footer-bottom p {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 120px 24px 60px;
          }

          .hero-content {
            max-width: 100%;
          }

          .hero-cta {
            justify-content: center;
          }

          .hero-stats {
            justify-content: center;
          }

          .hero-visual {
            display: none;
          }

          .nav-links {
            display: none;
          }

          .footer-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .hero-cta {
            flex-direction: column;
          }

          .hero-stats {
            flex-wrap: wrap;
            gap: 24px;
          }

          .cta-actions {
            flex-direction: column;
          }

          .footer-links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
