'use client';

import { SITE, CONTACT } from '@/lib/constants';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="container">
        <header className="page-header">
          <h1>Terms of Service</h1>
          <p className="meta">Last updated: December 2024</p>
        </header>

        <div className="content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By creating an account or using {SITE.name} ({SITE.shortName}), you agree to comply with these Terms of Service. 
              If you do not agree, you may not use the platform.
            </p>
          </section>

          <section>
            <h2>2. User Eligibility</h2>
            <p>
              You must be at least 16 years old to use the platform. Users under 18 should have parental or guardian consent. 
              By using NOMA, you represent that you meet these requirements.
            </p>
          </section>

          <section>
            <h2>3. User Accounts</h2>
            <p>When you create an account, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2>4. Acceptable Use</h2>
            <p>You agree NOT to:</p>
            <ul>
              <li>Post illegal, harmful, or offensive content</li>
              <li>Harass, bully, or threaten other users</li>
              <li>Impersonate others or misrepresent your identity</li>
              <li>Attempt to access accounts or data belonging to others</li>
              <li>Use the platform for spam or commercial solicitation without permission</li>
              <li>Upload malicious software or content</li>
            </ul>
          </section>

          <section>
            <h2>5. Content Ownership</h2>
            <p>
              You retain ownership of content you create. By posting content, you grant {SITE.name} a non-exclusive, 
              worldwide license to use, display, and distribute your content on the platform.
            </p>
          </section>

          <section>
            <h2>6. Termination</h2>
            <p>
              We may suspend or terminate your account if you violate these terms. You may also delete your account at any time. 
              Upon termination, your right to use the platform ceases immediately.
            </p>
          </section>

          <section>
            <h2>7. Disclaimer</h2>
            <p>
              {SITE.name} is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted or error-free service. 
              We are not liable for any damages arising from your use of the platform.
            </p>
          </section>

          <section>
            <h2>8. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance 
              of the new terms.
            </p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>
              For questions about these Terms, contact us at:{' '}
              <a href={`mailto:${CONTACT.emails[1]}`}>{CONTACT.emails[1]}</a>
            </p>
          </section>
        </div>

        <nav className="legal-nav">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
      </div>

      <style jsx>{`
        .legal-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding: 4rem 1.5rem;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .page-header h1 {
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .meta {
          color: var(--text-muted);
          font-size: 0.9375rem;
        }

        .content {
          line-height: 1.8;
          color: var(--text-secondary);
        }

        section {
          margin-bottom: 2rem;
        }

        h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        p {
          margin-bottom: 0.75rem;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
        }

        li {
          margin-bottom: 0.375rem;
        }

        a {
          color: var(--accent);
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        .legal-nav {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        @media (max-width: 600px) {
          .legal-page {
            padding: 3rem 1rem;
          }
        }
      `}</style>
    </main>
  );
}
