'use client';

import Link from 'next/link';

// Note: metadata needs to be in a separate server component or layout

export default function AboutPage() {
  const values = [
    { 
      title: 'Authenticity First', 
      desc: 'No filters needed. Share your real thoughts, feelings, and experiences.',
      icon: '🎭'
    },
    { 
      title: 'Real Connection', 
      desc: 'A community built on genuine interactions, not manufactured popularity.',
      icon: '🤝'
    },
    { 
      title: 'No Pressure', 
      desc: 'Express yourself without the stress of likes, algorithms, or going viral.',
      icon: '🕊️'
    },
    { 
      title: 'Personal Growth', 
      desc: 'Daily prompts and reflections to help you understand yourself better.',
      icon: '🌱'
    },
    { 
      title: 'Safe Expression', 
      desc: 'Moderated environment where authenticity is protected and celebrated.',
      icon: '🛡️'
    }
  ];

  return (
    <main className="about-page">
      <div className="container">
        <header className="page-header">
          <h1>About NOMA — No Mask World</h1>
          <p className="tagline">A world where authenticity is celebrated</p>
        </header>

        <section className="intro">
          <p>
            NOMA (No Mask World) is a digital space built for people who want to live authentically—without 
            the pressure to fake perfection or hide behind filters. Unlike traditional social platforms that 
            reward unrealistic standards and curated lifestyles, NOMA encourages users to show their real thoughts, 
            feelings, talents, struggles, and daily life experiences.
          </p>
          <p>
            It is a platform designed around openness, growth, and human connection. Every feature—from daily 
            prompts to the authentic feed—is engineered to allow users to express their true selves without 
            fear of judgment. The platform creates a supportive environment where authenticity is normal and 
            individuality is celebrated.
          </p>
          <p>
            Whether you want to share your creativity, talk about real life, post raw daily realities, or 
            build meaningful conversations, NOMA is built to be the most liberating social space online.
          </p>
        </section>

        <section className="mission-card">
          <h2>Our Mission</h2>
          <p>
            To create a social platform where authenticity is celebrated, individuality is protected, and 
            real human connection happens naturally. No filters, no pressure, no pretending—just real people 
            sharing real life.
          </p>
        </section>

        <section className="values">
          <h2>What We Stand For</h2>
          <div className="values-grid">
            {values.map((item, i) => (
              <div key={i} className="value-card">
                <span className="value-icon">{item.icon}</span>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="why-section">
          <h2>Why NOMA Matters</h2>
          <p>
            In today&apos;s world, traditional social platforms reward perfection, filters, and curated lifestyles. 
            NOMA breaks that cycle by creating a space where real is more valuable than perfect—where you can 
            be yourself without worrying about algorithms or artificial popularity.
          </p>
          <p>
            Here, you&apos;ll find a community of real people sharing real thoughts and real life. Whether you want 
            to share your creativity, talk about your day, explore meaningful conversations, or simply express 
            yourself—NOMA gives you the freedom to be your true self.
          </p>
        </section>

        <section className="cta-section">
          <p className="cta-text">Welcome to NOMA — A World With No Masks.</p>
          <div className="cta-buttons">
            <Link href="/signup" className="btn-primary">Join NOMA</Link>
            <Link href="/blog" className="btn-secondary">Read Our Blog</Link>
          </div>
        </section>

        <nav className="page-nav">
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>

      <style jsx>{`
        .about-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding: 4rem 1.5rem;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .tagline {
          font-size: 1.125rem;
          color: var(--accent);
          font-weight: 500;
        }

        .intro {
          margin-bottom: 3rem;
        }

        .intro p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .mission-card {
          background: var(--accent);
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 3rem;
        }

        .mission-card h2 {
          font-size: 1.5rem;
          color: var(--bg-primary);
          margin-bottom: 1rem;
        }

        .mission-card p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--bg-primary);
          opacity: 0.95;
        }

        .values {
          margin-bottom: 3rem;
        }

        .values h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .values-grid {
          display: grid;
          gap: 1rem;
        }

        .value-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .value-icon {
          font-size: 1.75rem;
        }

        .value-card strong {
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .value-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.6;
        }

        .why-section {
          margin-bottom: 3rem;
        }

        .why-section h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .why-section p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .cta-section {
          text-align: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 3rem 2rem;
          margin-bottom: 2rem;
        }

        .cta-text {
          font-size: 1.375rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 0.875rem 2rem;
          background: var(--accent);
          color: var(--bg-primary);
          font-weight: 600;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
        }

        .btn-secondary {
          padding: 0.875rem 2rem;
          background: var(--bg-surface-elevated);
          color: var(--text-primary);
          font-weight: 600;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          border-color: var(--accent);
        }

        .page-nav {
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .page-nav a {
          color: var(--accent);
          text-decoration: none;
          font-size: 0.9375rem;
        }

        .page-nav a:hover {
          text-decoration: underline;
        }

        @media (min-width: 600px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .about-page {
            padding: 3rem 1rem;
          }
          .mission-card {
            padding: 1.75rem;
          }
          .cta-section {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
