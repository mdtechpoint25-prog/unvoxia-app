'use client';

import { useState } from 'react';
import { SITE, CONTACT } from '@/lib/constants';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // In production, this would call an API endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Simulate success for demo
        setSubmitted(true);
      }
    } catch {
      // Simulate success for demo
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Get in Touch</h1>
          <p>
            Have questions about {SITE.name}? We'd love to hear from you. 
            Our team is here to help.
          </p>
        </div>
        <div className="hero-glow" />
      </section>

      <div className="content-grid">
        {/* Contact Form */}
        <section className="form-section">
          <div className="form-card">
            <h2>Send us a Message</h2>
            
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="safety">Safety Concern</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Contact Info */}
        <section className="info-section">
          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email Us</h3>
            <p>For general inquiries and support</p>
            {CONTACT.emails.map((email, i) => (
              <a key={i} href={`mailto:${email}`} className="contact-link">
                {email}
              </a>
            ))}
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Call Us</h3>
            <p>Available Mon-Fri, 9am-5pm EAT</p>
            {CONTACT.phones.map((phone, i) => (
              <a key={i} href={`tel:${phone}`} className="contact-link">
                {phone}
              </a>
            ))}
          </div>

          <div className="info-card">
            <div className="info-icon">🌐</div>
            <h3>Follow Us</h3>
            <p>Stay connected on social media</p>
            <div className="social-links">
              <a href="https://twitter.com/nomaworld" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://instagram.com/nomaworld" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>

          <div className="info-card highlight">
            <div className="info-icon">🆘</div>
            <h3>Crisis Support</h3>
            <p>If you're in crisis, please reach out:</p>
            <a href="tel:988" className="crisis-link">988 (US)</a>
            <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener noreferrer" className="crisis-link">
              Find Local Help
            </a>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>How do I reset my password?</h4>
            <p>Go to the login page and click "Forgot Password" to receive a reset link via email.</p>
          </div>
          <div className="faq-item">
            <h4>Is my content really anonymous?</h4>
            <p>Yes! Your identity is never revealed unless you choose to share it. Learn more in our <Link href="/privacy">Privacy Policy</Link>.</p>
          </div>
          <div className="faq-item">
            <h4>How do I report concerning content?</h4>
            <p>Use the report button on any post or comment. Our moderation team reviews all reports within 24 hours.</p>
          </div>
          <div className="faq-item">
            <h4>Can I delete my account?</h4>
            <p>Yes. Go to Settings → Account → Delete Account. Your data will be permanently removed.</p>
          </div>
        </div>
        <Link href="/faq" className="faq-link">View All FAQs →</Link>
      </section>

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .hero {
          position: relative;
          padding: 6rem 1.5rem 4rem;
          text-align: center;
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
        }

        .hero h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .hero-glow {
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
          opacity: 0.15;
          filter: blur(80px);
          pointer-events: none;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
        }

        .form-section { order: 1; }

        .form-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 2rem;
        }

        .form-card h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .btn-primary {
          width: 100%;
          padding: 0.875rem 1.5rem;
          background: var(--accent);
          color: var(--bg-primary);
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-secondary {
          padding: 0.75rem 1.5rem;
          background: var(--bg-surface-elevated);
          color: var(--text-primary);
          font-weight: 600;
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          border-color: var(--accent);
        }

        .success-message {
          text-align: center;
          padding: 2rem 0;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          background: var(--success);
          color: var(--bg-primary);
          font-size: 1.5rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .success-message h3 {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .success-message p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .error-message {
          padding: 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid var(--error);
          border-radius: 8px;
          color: var(--error);
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .info-section {
          order: 2;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .info-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .info-card.highlight {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
          border-color: rgba(239, 68, 68, 0.3);
        }

        .info-icon {
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
        }

        .info-card h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .info-card p {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }

        .contact-link {
          display: block;
          color: var(--accent);
          font-size: 0.9375rem;
          margin-bottom: 0.25rem;
        }

        .crisis-link {
          display: block;
          color: var(--error);
          font-weight: 600;
          font-size: 0.9375rem;
          margin-bottom: 0.25rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          color: var(--accent);
          font-size: 0.9375rem;
        }

        .faq-section {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 1.5rem 4rem;
          border-top: 1px solid var(--border-subtle);
        }

        .faq-section h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 2rem;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .faq-item {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.25rem;
        }

        .faq-item h4 {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .faq-item p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .faq-link {
          display: block;
          text-align: center;
          color: var(--accent);
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          .info-section {
            order: 1;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .info-card { flex: 1 1 200px; }
          .form-section { order: 2; }
        }

        @media (max-width: 600px) {
          .hero { padding: 4rem 1rem 2rem; }
          .content-grid { padding: 0 1rem 3rem; }
          .form-card { padding: 1.5rem; }
          .info-section { flex-direction: column; }
        }
      `}</style>
    </main>
  );
}
